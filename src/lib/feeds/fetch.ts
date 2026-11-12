import { unstable_cache } from "next/cache";
import {
  CATALOG_FEEDS,
  isAdtractionFeed,
  PARTNER_ADS_FEEDS,
  partnerAdsFeedUrl,
  type AdtractionFeed,
  type CatalogFeed,
  type PartnerAdsFeed,
} from "@/lib/feeds/config";
import { classifyProduct, passesMerchantGate } from "@/lib/feeds/classify";
import {
  decodeFeedText,
  parseAdtractionGoogleRss,
  parsePartnerAdsXml,
  UA,
} from "@/lib/feeds/parse";
import {
  CYKELPARTNER_MERCHANT,
  getCykelpartnerGuideFeedProductIds,
} from "@/lib/feeds/cykelpartner-guide-ids";
import type { FeedProduct } from "@/lib/feeds/types";

const FEED_CACHE_VERSION = "v11";
const FEED_REVALIDATE_SECONDS = 21_600; // 6 timer
/** Partner-Ads XML er ofte langsom; for lav timeout tømmer hele kataloget. */
const DEFAULT_TIMEOUT_MS = 90_000;
/** Cykelpartner-feedet er ~46 MB XML — kræver længere timeout (hvis det en dag genaktiveres). */
const CYKELPARTNER_TIMEOUT_MS = 120_000;

export { getCykelpartnerGuideFeedProductIds } from "@/lib/feeds/cykelpartner-guide-ids";
/**
 * Max samtidige feed-hentninger (cron + katalog-build).
 * 2 er kompromis: Adtraction 429’er ved høj parallelitet, men 1 er for langsomt
 * til cold catalog-build inden for serverless-timeout.
 */
const FEED_FETCH_CONCURRENCY = 2;
/**
 * Hård cap pr. merchant-feed efter classify — Next.js Data Cache max 2 MB/entry.
 * Prioritér på lager + billede, derefter lavest pris.
 * Holdes lavt: lange Partner-Ads-URL’er gør 300 varer let >2 MB.
 */
const FEED_CACHE_PRODUCT_LIMIT = 120;
/** Soft ceiling under Next.js’ 2 MB Data Cache-loft (UTF-8 JSON). */
const FEED_CACHE_MAX_BYTES = 1_400_000;

/**
 * Springes over i warm + katalog:
 * - Cykelpartner: ~46 MB XML (guides hentes targeteret via getCachedCykelpartnerGuideProducts)
 * - Adtraction: hyppige HTTP 429 der trækker hele katalog-build ned
 * Guides bruger imageUrl/affiliate-fallback når feed mangler.
 */
function isSkippedHeavyFeed(feed: CatalogFeed): boolean {
  return feed.merchant === CYKELPARTNER_MERCHANT || isAdtractionFeed(feed);
}

function cykelpartnerFeed(): PartnerAdsFeed | undefined {
  return PARTNER_ADS_FEEDS.find((f) => f.merchant === CYKELPARTNER_MERCHANT);
}

/**
 * Hent kun de Cykelpartner-varer guides linker til — ikke hele outdoor-kataloget.
 * Fuldt XML downloades stadig (~46 MB), men kun matching produkter caches.
 */
async function fetchCykelpartnerGuideProductsInner(): Promise<FeedProduct[]> {
  const feed = cykelpartnerFeed();
  if (!feed) return [];

  const onlyIds = new Set(getCykelpartnerGuideFeedProductIds());
  if (onlyIds.size === 0) return [];

  const url = partnerAdsFeedUrl(feed);
  const text = await fetchFeedText(url, feed.merchant, CYKELPARTNER_TIMEOUT_MS);
  const matched = parsePartnerAdsXml(text, feed.merchant, { onlyIds });

  return fitFeedProductsForCache(
    matched.map((product) => {
      const classified = classifyProduct(product);
      return classified ?? product;
    }),
  );
}

async function mapWithConcurrency<T, R>(
  items: readonly T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => worker(),
  );
  await Promise.all(workers);
  return results;
}

/** Undgå OOM: hent ikke alle partnerfeeds under `next build` (SSG). */
function isProductionBuild(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build";
}

/**
 * Fjern tunge felter så Data Cache holder sig under Next.js 2MB-grænsen.
 * Apuls (~3300 varer) lå lige over 2MB med desc trunceret til 180 tegn.
 */
function slimFeedProducts(products: FeedProduct[]): FeedProduct[] {
  return products.map((p) => ({
    id: p.id,
    merchant: p.merchant,
    title: (p.title || "").slice(0, 120),
    desc: "",
    // category-tekst bruges kun til classify (allerede sket); drop for cache-størrelse
    category: "",
    brand: (p.brand || "").slice(0, 40),
    price: p.price,
    oldPrice: p.oldPrice,
    image: p.image || "",
    url: p.url || "",
    inStock: p.inStock,
    categorySlug: p.categorySlug,
    intentSlugs: p.intentSlugs?.slice(0, 12),
  }));
}

function sortFeedProductsForCache(a: FeedProduct, b: FeedProduct): number {
  if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
  const aImg = Boolean(a.image);
  const bImg = Boolean(b.image);
  if (aImg !== bImg) return aImg ? -1 : 1;
  // Bevar category-diversitet: maskiner før “must-haves”-tunge feeds
  const aMachine = a.categorySlug && a.categorySlug !== "must-haves" ? 0 : 1;
  const bMachine = b.categorySlug && b.categorySlug !== "must-haves" ? 0 : 1;
  if (aMachine !== bMachine) return aMachine - bMachine;
  if (a.price == null && b.price == null) return 0;
  if (a.price == null) return 1;
  if (b.price == null) return -1;
  return a.price - b.price;
}

function utf8JsonBytes(value: unknown): number {
  return Buffer.byteLength(JSON.stringify(value), "utf8");
}

/**
 * Hold hver feed-cache under 2 MB: slim + cap + byte-budget.
 * Next.js afviser unstable_cache-entries >2 MB — uden cache bliver sider
 * ved med at cold-fetche og ender tomme efter deploy.
 */
export function fitFeedProductsForCache(
  products: FeedProduct[],
  opts?: { maxProducts?: number; maxBytes?: number },
): FeedProduct[] {
  const maxProducts = opts?.maxProducts ?? FEED_CACHE_PRODUCT_LIMIT;
  const maxBytes = opts?.maxBytes ?? FEED_CACHE_MAX_BYTES;
  const sorted = slimFeedProducts([...products].sort(sortFeedProductsForCache));

  const out: FeedProduct[] = [];
  let bytes = 2; // []
  for (const product of sorted) {
    if (out.length >= maxProducts) break;
    const itemBytes = utf8JsonBytes(product) + (out.length > 0 ? 1 : 0);
    if (bytes + itemBytes > maxBytes) break;
    out.push(product);
    bytes += itemBytes;
  }

  if (out.length < sorted.length) {
    console.warn(
      `[feed] cache trim ${sorted.length} → ${out.length} products (~${bytes} bytes)`,
    );
  }

  return out;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchFeedText(
  url: string,
  merchant: string,
  timeoutMs: number,
): Promise<string> {
  // 429: op til 3 forsøg. Timeout: max 1 retry — ellers æder Cykelpartner cron-budgettet.
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          "user-agent": UA,
          accept: "text/xml,application/xml,text/plain,*/*",
        },
        redirect: "follow",
        cache: "no-store",
        signal: AbortSignal.timeout(timeoutMs),
      });

      if (res.status === 429 && attempt < 3) {
        const backoffMs = attempt * 2_500;
        console.warn(
          `[feed] ${merchant} HTTP 429 — retry ${attempt}/2 in ${backoffMs}ms`,
        );
        await sleep(backoffMs);
        continue;
      }

      if (!res.ok) {
        throw new Error(`[feed] ${merchant} HTTP ${res.status} for ${url}`);
      }

      const buf = await res.arrayBuffer();
      return decodeFeedText(buf);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      const isTimeout =
        lastError.name === "TimeoutError" ||
        /aborted|timeout/i.test(lastError.message);
      // Cykelpartner er for stor til retry inden for cron/page-budget.
      if (
        isTimeout &&
        attempt === 1 &&
        merchant !== CYKELPARTNER_MERCHANT
      ) {
        console.warn(`[feed] ${merchant} timeout — retry once`);
        continue;
      }
      throw lastError;
    }
  }

  throw lastError ?? new Error(`[feed] ${merchant} failed`);
}

export async function fetchFeedProductsInner(
  feed: PartnerAdsFeed,
  opts?: { timeoutMs?: number },
): Promise<FeedProduct[]> {
  const url = partnerAdsFeedUrl(feed);
  const isCykelpartner = feed.merchant === CYKELPARTNER_MERCHANT;
  const timeoutMs =
    opts?.timeoutMs ??
    (isCykelpartner ? CYKELPARTNER_TIMEOUT_MS : DEFAULT_TIMEOUT_MS);
  const text = await fetchFeedText(url, feed.merchant, timeoutMs);
  const products = parsePartnerAdsXml(text, feed.merchant).filter(
    passesMerchantGate,
  );
  // Cache kun klassificerede varer — fulde Partner-Ads-feeds (Apuls m.fl.)
  // ligger over Next.js’ 2 MB Data Cache-loft og kan ellers ikke warm’es.
  // Guide-accessories uden klasse bruger imageUrl/affiliate-fallback.
  return products
    .map((product) => classifyProduct(product))
    .filter((product): product is FeedProduct => product != null);
}

/**
 * Adtraction-kataloget er stort (tøj, tilskud, kampsport).
 * Kun varer som klassificeringen accepterer caches — ellers rammer
 * Next.js’ 2 MB-grænse pr. cache-entry.
 */
export async function fetchAdtractionProductsInner(
  feed: AdtractionFeed,
  opts?: { timeoutMs?: number },
): Promise<FeedProduct[]> {
  const timeoutMs = opts?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const text = await fetchFeedText(feed.feedUrl, feed.merchant, timeoutMs);
  return parseAdtractionGoogleRss(text, feed.merchant)
    .map((product) => classifyProduct(product))
    .filter((product): product is FeedProduct => product != null);
}

export async function fetchCatalogFeedInner(
  feed: CatalogFeed,
  opts?: { timeoutMs?: number },
): Promise<FeedProduct[]> {
  if (isAdtractionFeed(feed)) return fetchAdtractionProductsInner(feed, opts);
  return fetchFeedProductsInner(feed, opts);
}

async function fetchFeedProductsForCache(
  feed: CatalogFeed,
): Promise<FeedProduct[]> {
  const products = await fetchCatalogFeedInner(feed);
  return fitFeedProductsForCache(products);
}

function feedCacheKey(feed: CatalogFeed): string[] {
  if (isAdtractionFeed(feed)) {
    return [
      "fitlist-feed",
      FEED_CACHE_VERSION,
      "adtraction",
      feed.id,
      feed.feedUrl,
    ];
  }
  return [
    "fitlist-feed",
    FEED_CACHE_VERSION,
    feed.id,
    feed.bannerId,
    feed.feedId,
  ];
}

export async function getCachedFeedProducts(
  feed: CatalogFeed,
): Promise<FeedProduct[]> {
  // Build SSG’er alle guides/maskiner parallelt — fuld feed-hentning OOM’er Vercel.
  // Priser fyldes via ISR + cron efter deploy.
  if (isProductionBuild()) {
    return [];
  }

  // Cykelpartner (~46 MB XML) — for tungt til fuldt katalog; guides: se getCachedCykelpartnerGuideProducts.
  if (isSkippedHeavyFeed(feed)) {
    return [];
  }

  const cached = unstable_cache(
    () => fetchFeedProductsForCache(feed),
    feedCacheKey(feed),
    { revalidate: FEED_REVALIDATE_SECONDS, tags: ["fitlist-feeds"] },
  );

  try {
    return await cached();
  } catch (err) {
    console.error(`[feed] cache FAILED for ${feed.merchant}:`, err);
    return [];
  }
}

const CYKELPARTNER_GUIDE_CACHE_KEY = [
  "fitlist-feed",
  FEED_CACHE_VERSION,
  "cykelpartner-guides",
] as const;

/** Dedupér samtidige guide-opslag (Promise.all pr. produkt) — undgå 4× 46 MB fetch. */
let cykelpartnerGuideInflight: Promise<FeedProduct[]> | null = null;

/**
 * Targeteret Cykelpartner-cache til guide feedProductId’er.
 * Fuldt feed springes stadig over i maskinekataloget.
 */
export async function getCachedCykelpartnerGuideProducts(): Promise<
  FeedProduct[]
> {
  if (isProductionBuild()) {
    return [];
  }

  if (!cykelpartnerGuideInflight) {
    cykelpartnerGuideInflight = (async () => {
      const cached = unstable_cache(
        () => fetchCykelpartnerGuideProductsInner(),
        [...CYKELPARTNER_GUIDE_CACHE_KEY],
        { revalidate: FEED_REVALIDATE_SECONDS, tags: ["fitlist-feeds"] },
      );

      try {
        return await cached();
      } catch (err) {
        console.error(`[feed] Cykelpartner guide cache FAILED:`, err);
        return [];
      }
    })().finally(() => {
      cykelpartnerGuideInflight = null;
    });
  }

  return cykelpartnerGuideInflight;
}

/** Opvarm den targeterede Cykelpartner-guide-cache (cron). */
export async function warmCykelpartnerGuideProducts(): Promise<{
  merchant: string;
  count: number;
  ok: boolean;
  error?: string;
  guideOnly: true;
}> {
  try {
    const products = await getCachedCykelpartnerGuideProducts();
    return {
      merchant: CYKELPARTNER_MERCHANT,
      count: products.length,
      ok: true,
      guideOnly: true,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[feed] Cykelpartner guide warm failed:`, message);
    return {
      merchant: CYKELPARTNER_MERCHANT,
      count: 0,
      ok: false,
      error: message,
      guideOnly: true,
    };
  }
}

/** Opvarm Data Cache (cron). Kun Partner-Ads (uden Cykelpartner/Adtraction). */
export async function warmAllFeeds(): Promise<{
  merchant: string;
  count: number;
  ok: boolean;
  error?: string;
  skipped?: boolean;
}[]> {
  const active = CATALOG_FEEDS.filter((f) => !isSkippedHeavyFeed(f));

  const warmed = await mapWithConcurrency(
    active,
    FEED_FETCH_CONCURRENCY,
    async (feed) => {
      try {
        const products = await getCachedFeedProducts(feed);
        return {
          merchant: feed.merchant,
          count: products.length,
          ok: true as const,
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`[feed] warm failed ${feed.merchant}:`, message);
        return {
          merchant: feed.merchant,
          count: 0,
          ok: false as const,
          error: message,
        };
      }
    },
  );

  const skipped = CATALOG_FEEDS.filter(isSkippedHeavyFeed).map((feed) => ({
    merchant: feed.merchant,
    count: 0,
    ok: true as const,
    skipped: true as const,
  }));

  return [...warmed, ...skipped];
}

export { FEED_REVALIDATE_SECONDS, mapWithConcurrency, FEED_FETCH_CONCURRENCY };
