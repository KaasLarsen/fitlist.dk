import { unstable_cache } from "next/cache";
import { CATALOG_FEEDS } from "@/lib/feeds/config";
import {
  classifyProducts,
  refineBilligIntent,
} from "@/lib/feeds/classify";
import {
  FEED_REVALIDATE_SECONDS,
  getCachedFeedProducts,
} from "@/lib/feeds/fetch";
import type { FeedProduct, MachineCategorySlug } from "@/lib/feeds/types";

const CATALOG_CACHE_VERSION = "v12";

async function buildMachineCatalog(): Promise<FeedProduct[]> {
  const batches = await Promise.all(
    CATALOG_FEEDS.map((feed) => getCachedFeedProducts(feed)),
  );
  const all = batches.flat();
  const classified = classifyProducts(all);
  return refineBilligIntent(classified);
}

/** Samlet maskinekatalog (kun klassificerede produkter). */
export async function getMachineCatalog(): Promise<FeedProduct[]> {
  const cached = unstable_cache(
    () => buildMachineCatalog(),
    ["fitlist-machine-catalog", CATALOG_CACHE_VERSION],
    { revalidate: FEED_REVALIDATE_SECONDS, tags: ["fitlist-feeds"] },
  );

  try {
    return await cached();
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
 */
export async function getFeedProductById(
  id: string,
): Promise<FeedProduct | undefined> {
  const catalog = await getMachineCatalog();
  const fromCatalog = catalog.find((p) => p.id === id);
  if (fromCatalog) return fromCatalog;

  const merchant = id.split(":")[0];
  if (!merchant) return undefined;
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

/** Warm katalog-cache efter feed-revalidate. */
export async function warmCatalog(): Promise<{
  total: number;
  byCategory: Record<string, number>;
}> {
  const catalog = await buildMachineCatalog();
  // Touch unstable_cache path
  await getMachineCatalog();

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

  const discounted = catalog
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
