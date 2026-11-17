import { unstable_cache } from "next/cache";
import {
  ADTRACTION_FEEDS,
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
  getGuideFeedProductIds,
} from "@/lib/feeds/cykelpartner-guide-ids";
import type { FeedProduct } from "@/lib/feeds/types";

/** Bump når classify/intent-regler ændrer hvilke varer der skal caches. */
const FEED_CACHE_VERSION = "v15";
const FEED_REVALIDATE_SECONDS = 21_600; // 6 timer
/** Partner-Ads XML er ofte langsom; for lav timeout tømmer hele kataloget. */
const DEFAULT_TIMEOUT_MS = 90_000;
/** Cykelpartner-feedet er ~46 MB XML — kræver længere timeout (hvis det en dag genaktiveres). */
const CYKELPARTNER_TIMEOUT_MS = 120_000;

export { getCykelpartnerGuideFeedProductIds } from "@/lib/feeds/cykelpartner-guide-ids";
/**
 * Max samtidige Partner-Ads-hentninger (cron + katalog).
 * Adtraction kører altid bagefter, én shop ad gangen.
 */
const FEED_FETCH_CONCURRENCY = 2;
/**
 * Sidevisninger venter højst så længe på Adtraction. Feeds der ikke er
 * færdige, hentes færdigt i baggrunden — Partner-Ads er allerede med.
 */
const ADTRACTION_CATALOG_BUDGET_MS = 4_000;
/** Pause efter et rigtigt Adtraction-download, så næste shop ikke rammer 429. */
const ADTRACTION_GAP_MS = 1_500;
const ADTRACTION_RATE_LIMIT_BACKOFF_MS = [10_000, 25_000] as const;
/**
 * Hård cap pr. merchant-feed efter classify — Next.js Data Cache max 2 MB/entry.
 * Slimmet payload er ~0.5–1.2 KB/vare, så 300 ligger langt under 1.4 MB-budgettet
 * (ældre 120-cap skar mid-range maskiner som Odin T620 væk fra Apuls).
 * Selection: maskiner før tilbehør, per-kategori round-robin + pris-spredning.
 */
const FEED_CACHE_PRODUCT_LIMIT = 300;
/** Soft ceiling under Next.js’ 2 MB Data Cache-loft (UTF-8 JSON). */
const FEED_CACHE_MAX_BYTES = 1_400_000;
/** Andel af cache-slots reserveret til maskiner (resten til tilbehør). */
const FEED_CACHE_MACHINE_RATIO = 0.85;

/**
 * Cykelpartner (~46 MB) springes over i warm + katalog.
 * Guides henter et lille subset via getCachedCykelpartnerGuideProducts.
 */
function isSkippedHeavyFeed(feed: CatalogFeed): boolean {
  return feed.merchant === CYKELPARTNER_MERCHANT;
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
    ...(p.maxSpeedKmh != null ? { maxSpeedKmh: p.maxSpeedKmh } : {}),
  }));
}

/** Tilbehør må ikke fylde maskin-slots (slug er `tilbehoer`, ikke `must-haves`). */
function isAccessoryProduct(product: FeedProduct): boolean {
  const slug = product.categorySlug;
  return !slug || slug === "tilbehoer" || slug === "must-haves";
}

/**
 * Primær tilbehør-intent til cache-diversitet.
 * Recovery-intents først, så isbad/massage/foam/boots ikke drukner i elastikker.
 */
const ACCESSORY_INTENT_PRIORITY = [
  "isbad",
  "massagepistol",
  "foamroller",
  "recoveryboots",
  "haandvaegte",
  "kettlebells",
  "gulvmaatter",
  "fitnessgulv",
  "pullup",
  "abwheel",
  "vaegtvest",
  "stepbaenk",
  "elastikker",
  "slyngetraener",
  "begynder",
] as const;

function primaryAccessoryIntent(product: FeedProduct): string {
  const intents = product.intentSlugs ?? [];
  for (const slug of ACCESSORY_INTENT_PRIORITY) {
    if (intents.includes(slug)) return slug;
  }
  return intents[0] ?? "other";
}

function compareStockImagePrice(a: FeedProduct, b: FeedProduct): number {
  if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
  const aImg = Boolean(a.image);
  const bImg = Boolean(b.image);
  if (aImg !== bImg) return aImg ? -1 : 1;
  if (a.price == null && b.price == null) return 0;
  if (a.price == null) return 1;
  if (b.price == null) return -1;
  return a.price - b.price;
}

/**
 * Vælg jævnt hen over en pris-sorteret liste, så mid-range (fx Odin T620)
 * overlever cap’en — ikke kun de billigste.
 */
function pickPriceDiverse(
  sorted: readonly FeedProduct[],
  limit: number,
): FeedProduct[] {
  if (limit <= 0 || sorted.length === 0) return [];
  if (sorted.length <= limit) return sorted.slice();

  const out: FeedProduct[] = [];
  const used = new Set<number>();
  for (let i = 0; i < limit; i++) {
    const target =
      limit === 1
        ? 0
        : Math.round((i / (limit - 1)) * (sorted.length - 1));
    let idx = target;
    while (used.has(idx) && idx + 1 < sorted.length) idx += 1;
    while (used.has(idx) && idx > 0) idx -= 1;
    if (used.has(idx)) continue;
    used.add(idx);
    out.push(sorted[idx]!);
  }
  return out;
}

function utf8JsonBytes(value: unknown): number {
  return Buffer.byteLength(JSON.stringify(value), "utf8");
}

function pushWithinBudget(
  out: FeedProduct[],
  product: FeedProduct,
  maxProducts: number,
  maxBytes: number,
  bytes: number,
): number | null {
  if (out.length >= maxProducts) return null;
  const itemBytes = utf8JsonBytes(product) + (out.length > 0 ? 1 : 0);
  if (bytes + itemBytes > maxBytes) return null;
  out.push(product);
  return bytes + itemBytes;
}

/**
 * Hold hver feed-cache under 2 MB: slim + cap + byte-budget.
 * Next.js afviser unstable_cache-entries >2 MB — uden cache bliver sider
 * ved med at cold-fetche og ender tomme efter deploy.
 *
 * Selection: maskiner før tilbehør; round-robin pr. kategori/intent med
 * pris-spredning (undgår at billige elastikker skubber T620 eller isbad ud).
 */
export function fitFeedProductsForCache(
  products: FeedProduct[],
  opts?: { maxProducts?: number; maxBytes?: number },
): FeedProduct[] {
  const maxProducts = opts?.maxProducts ?? FEED_CACHE_PRODUCT_LIMIT;
  const maxBytes = opts?.maxBytes ?? FEED_CACHE_MAX_BYTES;
  const slimmed = slimFeedProducts(products);
  const pinnedIds = new Set(getGuideFeedProductIds());
  const pinned: FeedProduct[] = [];
  const rest: FeedProduct[] = [];
  for (const product of slimmed) {
    if (pinnedIds.has(product.id)) pinned.push(product);
    else rest.push(product);
  }

  const machinesByCategory = new Map<string, FeedProduct[]>();
  const accessoriesByIntent = new Map<string, FeedProduct[]>();

  for (const product of rest) {
    if (isAccessoryProduct(product)) {
      const intent = primaryAccessoryIntent(product);
      const list = accessoriesByIntent.get(intent);
      if (list) list.push(product);
      else accessoriesByIntent.set(intent, [product]);
      continue;
    }
    const slug = product.categorySlug!;
    const list = machinesByCategory.get(slug);
    if (list) list.push(product);
    else machinesByCategory.set(slug, [product]);
  }

  for (const list of machinesByCategory.values()) {
    list.sort(compareStockImagePrice);
  }
  for (const list of accessoriesByIntent.values()) {
    list.sort(compareStockImagePrice);
  }

  const machineBudget = Math.max(
    1,
    Math.min(maxProducts, Math.floor(maxProducts * FEED_CACHE_MACHINE_RATIO)),
  );
  const categoryCount = Math.max(1, machinesByCategory.size);
  const perCategory = Math.max(1, Math.ceil(machineBudget / categoryCount));

  const queues = [...machinesByCategory.values()].map((list) =>
    pickPriceDiverse(list, Math.min(list.length, perCategory)),
  );
  const queueOffsets = queues.map(() => 0);

  const out: FeedProduct[] = [];
  let bytes = 2; // []

  for (const product of pinned) {
    const nextBytes = pushWithinBudget(
      out,
      product,
      maxProducts,
      maxBytes,
      bytes,
    );
    if (nextBytes == null) break;
    bytes = nextBytes;
  }

  let added = true;
  while (out.length < machineBudget && added) {
    added = false;
    for (let q = 0; q < queues.length; q++) {
      if (out.length >= machineBudget) break;
      const queue = queues[q]!;
      const offset = queueOffsets[q]!;
      if (offset >= queue.length) continue;
      const nextBytes = pushWithinBudget(
        out,
        queue[offset]!,
        maxProducts,
        maxBytes,
        bytes,
      );
      if (nextBytes == null) {
        added = false;
        break;
      }
      queueOffsets[q] = offset + 1;
      bytes = nextBytes;
      added = true;
    }
  }

  const accessoryBudget = maxProducts - out.length;
  const intentCount = Math.max(1, accessoriesByIntent.size);
  const perIntent = Math.max(1, Math.ceil(accessoryBudget / intentCount));
  const accessoryQueues = [...accessoriesByIntent.values()].map((list) =>
    pickPriceDiverse(list, Math.min(list.length, perIntent)),
  );
  const accessoryOffsets = accessoryQueues.map(() => 0);

  let accessoryAdded = true;
  while (out.length < maxProducts && accessoryAdded) {
    accessoryAdded = false;
    for (let q = 0; q < accessoryQueues.length; q++) {
      if (out.length >= maxProducts) break;
      const queue = accessoryQueues[q]!;
      const offset = accessoryOffsets[q]!;
      if (offset >= queue.length) continue;
      const nextBytes = pushWithinBudget(
        out,
        queue[offset]!,
        maxProducts,
        maxBytes,
        bytes,
      );
      if (nextBytes == null) {
        accessoryAdded = false;
        break;
      }
      accessoryOffsets[q] = offset + 1;
      bytes = nextBytes;
      accessoryAdded = true;
    }
  }

  if (out.length < slimmed.length) {
    console.warn(
      `[feed] cache trim ${slimmed.length} → ${out.length} products (~${bytes} bytes)`,
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
  rateLimitBackoffMs: readonly number[] = [2_500, 5_000],
): Promise<string> {
  // 429: ét forsøg pr. backoff-trin. Timeout: max 1 retry — ellers æder cron-budgettet.
  let lastError: Error | null = null;
  const maxAttempts = rateLimitBackoffMs.length + 1;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
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

      if (res.status === 429) {
        const backoffMs = rateLimitBackoffMs[attempt - 1];
        if (backoffMs != null) {
          console.warn(
            `[feed] ${merchant} HTTP 429 — retry ${attempt}/${rateLimitBackoffMs.length} in ${backoffMs}ms`,
          );
          await sleep(backoffMs);
          continue;
        }
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
  const text = await fetchFeedText(
    feed.feedUrl,
    feed.merchant,
    timeoutMs,
    ADTRACTION_RATE_LIMIT_BACKOFF_MS,
  );
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

/**
 * Én Adtraction-shop ad gangen. Delt af katalog og cron, så to requests
 * ikke downloader de samme feeds parallelt og udløser 429.
 */
let adtractionChain: Promise<void> | null = null;
const adtractionReady = new Map<string, FeedProduct[]>();

function runAdtractionChain(): Promise<void> {
  if (!adtractionChain) {
    adtractionChain = (async () => {
      for (const feed of ADTRACTION_FEEDS) {
        const started = Date.now();
        try {
          const products = await getCachedFeedProducts(feed);
          adtractionReady.set(feed.id, products);
        } catch (err) {
          console.error(`[feed] Adtraction failed ${feed.merchant}:`, err);
          adtractionReady.set(feed.id, []);
        }
        // Cache-hit er hurtigt og skal ikke pauses. Et rigtigt download
        // får et hul, før næste shop starter.
        if (Date.now() - started > 2_000) await sleep(ADTRACTION_GAP_MS);
      }
    })().finally(() => {
      adtractionChain = null;
    });
  }
  return adtractionChain;
}

function adtractionMemoryIsComplete(): boolean {
  return ADTRACTION_FEEDS.every((feed) => adtractionReady.has(feed.id));
}

function adtractionProductsFromMemory(): FeedProduct[] {
  return ADTRACTION_FEEDS.flatMap((feed) => adtractionReady.get(feed.id) ?? []);
}

/**
 * Adtraction-varer til kataloget.
 * Har denne instans allerede alle shops, returneres de med det samme.
 * Ellers ventes højst et par sekunder. Resten af kæden kører videre efter
 * response, så en 429 eller et tungt feed ikke holder Partner-Ads tilbage.
 */
export async function getAdtractionCatalogProducts(): Promise<{
  products: FeedProduct[];
  complete: boolean;
}> {
  if (isProductionBuild()) return { products: [], complete: true };

  const chain = runAdtractionChain();
  if (adtractionMemoryIsComplete()) {
    return { products: adtractionProductsFromMemory(), complete: true };
  }

  let timer: ReturnType<typeof setTimeout> | undefined;
  const budget = new Promise<"budget">((resolve) => {
    timer = setTimeout(() => resolve("budget"), ADTRACTION_CATALOG_BUDGET_MS);
  });
  const winner = await Promise.race([
    chain.then(() => "done" as const),
    budget,
  ]);
  if (timer) clearTimeout(timer);

  if (winner !== "done") {
    try {
      const { after } = await import("next/server");
      after(() => chain);
    } catch (err) {
      console.warn("[feed] Adtraction fortsætter uden after():", err);
    }
  }

  return {
    products: adtractionProductsFromMemory(),
    complete: winner === "done" || adtractionMemoryIsComplete(),
  };
}

/** Opvarm Data Cache (cron). Partner-Ads først, derefter Adtraction én ad gangen. */
export async function warmAllFeeds(): Promise<{
  merchant: string;
  count: number;
  ok: boolean;
  error?: string;
  skipped?: boolean;
}[]> {
  const active = CATALOG_FEEDS.filter(
    (feed) => !isSkippedHeavyFeed(feed) && !isAdtractionFeed(feed),
  );

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

  await runAdtractionChain();
  const adtraction = ADTRACTION_FEEDS.map((feed) => {
    const count = adtractionReady.get(feed.id)?.length ?? 0;
    return {
      merchant: feed.merchant,
      count,
      ok: count > 0,
      ...(count === 0 ? { error: "no products" } : {}),
    };
  });

  const skipped = CATALOG_FEEDS.filter(isSkippedHeavyFeed).map((feed) => ({
    merchant: feed.merchant,
    count: 0,
    ok: true as const,
    skipped: true as const,
  }));

  return [...warmed, ...adtraction, ...skipped];
}

export { FEED_REVALIDATE_SECONDS, mapWithConcurrency, FEED_FETCH_CONCURRENCY };
