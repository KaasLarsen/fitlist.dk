import { unstable_cache } from "next/cache";
import { PARTNER_ADS_FEEDS } from "@/lib/feeds/config";
import {
  classifyProducts,
  refineBilligIntent,
} from "@/lib/feeds/classify";
import {
  FEED_REVALIDATE_SECONDS,
  getCachedFeedProducts,
} from "@/lib/feeds/fetch";
import type { FeedProduct, MachineCategorySlug } from "@/lib/feeds/types";

const CATALOG_CACHE_VERSION = "v1";

async function buildMachineCatalog(): Promise<FeedProduct[]> {
  const batches = await Promise.all(
    PARTNER_ADS_FEEDS.map((feed) => getCachedFeedProducts(feed)),
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

export async function getProductsByCategory(
  categorySlug: MachineCategorySlug,
  opts?: { intentSlug?: string; limit?: number; inStockOnly?: boolean },
): Promise<FeedProduct[]> {
  const catalog = await getMachineCatalog();
  let list = catalog.filter((p) => p.categorySlug === categorySlug);

  if (opts?.intentSlug) {
    list = list.filter((p) => p.intentSlugs?.includes(opts.intentSlug!));
  }

  if (opts?.inStockOnly) {
    list = list.filter((p) => p.inStock);
  }

  list = [...list].sort(sortOffers);

  if (opts?.limit != null && opts.limit > 0) {
    return list.slice(0, opts.limit);
  }
  return list;
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
