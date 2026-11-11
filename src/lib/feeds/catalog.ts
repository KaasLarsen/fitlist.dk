import { unstable_cache } from "next/cache";
import { CATALOG_FEEDS } from "@/lib/feeds/config";
import { refineBilligIntent } from "@/lib/feeds/classify";
import { CYKELPARTNER_MERCHANT } from "@/lib/feeds/cykelpartner-guide-ids";
import {
  FEED_FETCH_CONCURRENCY,
  FEED_REVALIDATE_SECONDS,
  getCachedCykelpartnerGuideProducts,
  getCachedFeedProducts,
  mapWithConcurrency,
} from "@/lib/feeds/fetch";
import type { FeedProduct, MachineCategorySlug } from "@/lib/feeds/types";

const CATALOG_CACHE_VERSION = "v18";

async function buildMachineCatalog(): Promise<FeedProduct[]> {
  // getCachedFeedProducts springer tunge feeds (Cykelpartner) over automatisk.
  const batches = await mapWithConcurrency(
    CATALOG_FEEDS,
    FEED_FETCH_CONCURRENCY,
    (feed) => getCachedFeedProducts(feed),
  );
  // Feeds caches allerede klassificerede varer (categorySlug sat).
  // classifyProducts igen ville mangle feed-category-tekst (slimmet væk).
  const classified = batches.flat().filter((p) => p.categorySlug != null);
  return refineBilligIntent(classified);
}

/**
 * Samlet maskinekatalog (kun klassificerede produkter).
 * Caches IKKE som ét blob — det samlede katalog er >2 MB og Next.js Data Cache
 * afviser det, hvilket tidligere efterlod sider uden produkter. Per-feed-cache
 * (slimmet + klassificeret) er kilden; merge er billigt ved cache-hit.
 */
export async function getMachineCatalog(): Promise<FeedProduct[]> {
  try {
    return await buildMachineCatalog();
  } catch (err) {
    console.error("[catalog] failed:", err);
    return [];
  }
}

function sortOffers(a: FeedProduct, b: FeedProduct): number {
  // In stock first
  if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
  // Then price ascending (nulls last)
  if (a.price == null && b.price == null) return a.title.localeCompare(b.title, "da");
  if (a.price == null) return 1;
  if (b.price == null) return -1;
  if (a.price !== b.price) return a.price - b.price;
  return a.title.localeCompare(b.title, "da");
}

/**
 * Opslag af et enkelt feed-produkt via stabilt id (`merchant:produktid`).
 * Finder først i maskinekataloget; falder tilbage til den rå merchant-feed,
 * så guides kan linke accessories (fx underlagsmåtter) uden at de dukker op
 * på /maskiner.
 * Cykelpartner er ikke i kataloget (~46 MB) — guides bruger targeteret cache
 * (kortsluttes før katalog-build, så parallel guide-opslag ikke OOM’er).
 */
export async function getFeedProductById(
  id: string,
): Promise<FeedProduct | undefined> {
  const merchant = id.split(":")[0];
  if (!merchant) return undefined;

  if (merchant === CYKELPARTNER_MERCHANT) {
    const guideProducts = await getCachedCykelpartnerGuideProducts();
    return guideProducts.find((p) => p.id === id);
  }

  const catalog = await getMachineCatalog();
  const fromCatalog = catalog.find((p) => p.id === id);
  if (fromCatalog) return fromCatalog;

  const feed = CATALOG_FEEDS.find((f) => f.merchant === merchant);
  if (!feed) return undefined;

  const raw = await getCachedFeedProducts(feed);
  return raw.find((p) => p.id === id);
}

async function buildCategoryProducts(
  categorySlug: MachineCategorySlug,
  intentSlug: string,
  limit: number,
  inStockOnly: boolean,
): Promise<FeedProduct[]> {
  const catalog = await getMachineCatalog();
  let list = catalog.filter((p) => p.categorySlug === categorySlug);

  if (intentSlug) {
    list = list.filter((p) => p.intentSlugs?.includes(intentSlug));
  }

  if (inStockOnly) {
    list = list.filter((p) => p.inStock);
  }

  list = [...list].sort(sortOffers);

  if (limit > 0) {
    return list.slice(0, limit);
  }
  return list;
}

export async function getProductsByCategory(
  categorySlug: MachineCategorySlug,
  opts?: { intentSlug?: string; limit?: number; inStockOnly?: boolean },
): Promise<FeedProduct[]> {
  const intentSlug = opts?.intentSlug ?? "";
  const limit = opts?.limit ?? 0;
  const inStockOnly = opts?.inStockOnly ?? false;

  const cached = unstable_cache(
    () =>
      buildCategoryProducts(categorySlug, intentSlug, limit, inStockOnly),
    [
      "fitlist-category-products",
      CATALOG_CACHE_VERSION,
      categorySlug,
      intentSlug,
      String(limit),
      String(inStockOnly),
    ],
    { revalidate: FEED_REVALIDATE_SECONDS, tags: ["fitlist-feeds"] },
  );

  try {
    return await cached();
  } catch (err) {
    console.error(`[catalog] category slice failed (${categorySlug}):`, err);
    return [];
  }
}

/** Warm: sørg for at per-feed-cache er varm, og rapportér katalog-størrelse. */
export async function warmCatalog(): Promise<{
  total: number;
  byCategory: Record<string, number>;
}> {
  const catalog = await getMachineCatalog();
  if (catalog.length === 0) {
    throw new Error("[catalog] empty after feed warm");
  }

  const byCategory: Record<string, number> = {};
  for (const p of catalog) {
    if (!p.categorySlug) continue;
    byCategory[p.categorySlug] = (byCategory[p.categorySlug] ?? 0) + 1;
  }

  return { total: catalog.length, byCategory };
}

export function formatPriceDkk(price: number | null): string {
  if (price == null || !Number.isFinite(price)) return "Se pris";
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    maximumFractionDigits: 0,
  }).format(price);
}

/** Rabat i procent (0–100), eller null hvis ingen gyldig rabat. */
export function discountPercent(product: FeedProduct): number | null {
  if (
    product.oldPrice == null ||
    product.price == null ||
    !Number.isFinite(product.oldPrice) ||
    !Number.isFinite(product.price) ||
    product.oldPrice <= product.price
  ) {
    return null;
  }
  return Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100,
  );
}

/** Simpel dato-seedet PRNG (mulberry32) — samme rækkefølge hele dagen. */
function mulberry32(seed: number): () => number {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dateSeedCopenhagen(date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Copenhagen",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const y = parts.find((p) => p.type === "year")?.value ?? "0";
  const m = parts.find((p) => p.type === "month")?.value ?? "0";
  const d = parts.find((p) => p.type === "day")?.value ?? "0";
  // YYYYMMDD as integer
  return Number(`${y}${m}${d}`);
}

function shuffleSeeded<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  const rand = mulberry32(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** På lager, med billede, kategori og gyldig rabat — sorteret efter størst rabat. */
function getDiscountedProducts(catalog: FeedProduct[]): FeedProduct[] {
  return catalog
    .filter(
      (p) =>
        p.inStock &&
        Boolean(p.image) &&
        p.categorySlug != null &&
        discountPercent(p) != null,
    )
    .sort((a, b) => {
      const da = discountPercent(a)!;
      const db = discountPercent(b)!;
      if (db !== da) return db - da;
      return a.title.localeCompare(b.title, "da");
    });
}

/**
 * Alle aktuelle rabatter (browse): samme filter som dagens tilbud,
 * sorteret efter størst rabat — uden daglig shuffle/merchant-cap.
 */
export async function getAllDiscountedDeals(opts?: {
  limit?: number;
}): Promise<FeedProduct[]> {
  const limit = opts?.limit ?? 60;
  const catalog = await getMachineCatalog();
  return getDiscountedProducts(catalog).slice(0, limit);
}

/**
 * Dagens tilbud: på lager, med billede og rabat.
 * Sorteret efter størst rabat, derefter dato-seedet mix blandt topkandidater
 * så udvalget er stabilt hele dagen og skifter ved midnat (Europe/Copenhagen).
 */
export async function getDailyDeals(opts?: {
  limit?: number;
}): Promise<FeedProduct[]> {
  const limit = opts?.limit ?? 8;
  const catalog = await getMachineCatalog();
  const discounted = getDiscountedProducts(catalog);

  if (discounted.length === 0) return [];

  // Tag top-pool (største rabatter), så mix blandt dem for variation pr. dag
  const poolSize = Math.min(Math.max(limit * 3, limit), discounted.length);
  const pool = discounted.slice(0, poolSize);
  const seeded = shuffleSeeded(pool, dateSeedCopenhagen());

  // Diversificér merchants lidt: undgå at samme merchant fylder alt
  const picked: FeedProduct[] = [];
  const merchantCount = new Map<string, number>();
  for (const p of seeded) {
    if (picked.length >= limit) break;
    const count = merchantCount.get(p.merchant) ?? 0;
    if (count >= 3 && picked.length + (limit - picked.length) > 1) {
      // tillad flere senere hvis vi mangler
      continue;
    }
    picked.push(p);
    merchantCount.set(p.merchant, count + 1);
  }

  // Fyld op hvis merchant-cap var for streng
  if (picked.length < limit) {
    for (const p of seeded) {
      if (picked.length >= limit) break;
      if (!picked.some((x) => x.id === p.id)) picked.push(p);
    }
  }

  return picked;
}
