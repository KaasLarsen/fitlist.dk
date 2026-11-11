import { unstable_cache } from "next/cache";
import {
  CATALOG_FEEDS,
  isAdtractionFeed,
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
import type { FeedProduct } from "@/lib/feeds/types";

const FEED_CACHE_VERSION = "v7";
const FEED_REVALIDATE_SECONDS = 21_600; // 6 timer
/** Partner-Ads XML er ofte langsom; for lav timeout tømmer hele kataloget. */
const DEFAULT_TIMEOUT_MS = 90_000;
/** Cykelpartner-feedet er ~46 MB XML — kræver længere timeout. */
const CYKELPARTNER_TIMEOUT_MS = 120_000;
const CYKELPARTNER_MERCHANT = "Cykelpartner.dk";
/**
 * Max samtidige feed-hentninger (cron + katalog-build).
 * 2 er kompromis: Adtraction 429’er ved høj parallelitet, men 1 er for langsomt
 * til cold catalog-build inden for serverless-timeout.
 */
const FEED_FETCH_CONCURRENCY = 2;

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
    title: (p.title || "").slice(0, 140),
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
    intentSlugs: p.intentSlugs,
  }));
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
  return slimFeedProducts(products);
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

function warmFeedPriority(feed: CatalogFeed): number {
  // Små Partner-Ads først — Cykelpartner + Adtraction til sidst (timeout/429).
  if (isAdtractionFeed(feed)) return 2;
  if (feed.merchant === CYKELPARTNER_MERCHANT) return 2;
  return 0;
}

/** Opvarm Data Cache (cron). Prioritér maskine-feeds før tunge/ustabile feeds. */
export async function warmAllFeeds(): Promise<{
  merchant: string;
  count: number;
  ok: boolean;
  error?: string;
}[]> {
  const ordered = [...CATALOG_FEEDS].sort(
    (a, b) => warmFeedPriority(a) - warmFeedPriority(b),
  );
  return mapWithConcurrency(ordered, FEED_FETCH_CONCURRENCY, async (feed) => {
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
  });
}

export { FEED_REVALIDATE_SECONDS, mapWithConcurrency, FEED_FETCH_CONCURRENCY };
