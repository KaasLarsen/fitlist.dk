import { categories } from "@/lib/categories";
import { formatPriceDkk } from "@/lib/feeds/catalog";
import type { FeedProduct } from "@/lib/feeds/types";
import { getAllGuides } from "@/lib/guides";

export type SearchCategoryHit = {
  type: "category";
  slug: string;
  name: string;
  description: string;
};

export type SearchGuideHit = {
  type: "guide";
  slug: string;
  title: string;
  excerpt: string;
};

export type SearchProductHit = {
  type: "product";
  id: string;
  title: string;
  brand: string;
  merchant: string;
  price: number | null;
  priceLabel: string;
  url: string;
  image: string;
};

export type SearchResults = {
  categories: SearchCategoryHit[];
  guides: SearchGuideHit[];
  products: SearchProductHit[];
};

const LIMITS = {
  categories: 4,
  guides: 4,
  products: 6,
} as const;

/** Lowercase + strip diacritics for Danish-friendly matching. */
export function normalizeQuery(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

export function matchesQuery(haystack: string, needle: string): boolean {
  if (!needle) return false;
  return normalizeQuery(haystack).includes(needle);
}

function sortProducts(a: FeedProduct, b: FeedProduct): number {
  if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
  if (a.price == null && b.price == null) {
    return a.title.localeCompare(b.title, "da");
  }
  if (a.price == null) return 1;
  if (b.price == null) return -1;
  if (a.price !== b.price) return a.price - b.price;
  return a.title.localeCompare(b.title, "da");
}

export function searchSite(
  rawQuery: string,
  catalog: FeedProduct[],
): SearchResults {
  const q = normalizeQuery(rawQuery);
  if (q.length < 2) {
    return { categories: [], guides: [], products: [] };
  }

  const categoryHits: SearchCategoryHit[] = [];
  for (const cat of categories) {
    if (
      matchesQuery(cat.name, q) ||
      matchesQuery(cat.shortName, q) ||
      matchesQuery(cat.description, q)
    ) {
      categoryHits.push({
        type: "category",
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
      });
      if (categoryHits.length >= LIMITS.categories) break;
    }
  }

  const guideHits: SearchGuideHit[] = [];
  for (const guide of getAllGuides()) {
    if (matchesQuery(guide.title, q) || matchesQuery(guide.excerpt, q)) {
      guideHits.push({
        type: "guide",
        slug: guide.slug,
        title: guide.title,
        excerpt: guide.excerpt,
      });
      if (guideHits.length >= LIMITS.guides) break;
    }
  }

  const productHits = catalog
    .filter(
      (p) =>
        p.categorySlug != null &&
        (matchesQuery(p.title, q) ||
          matchesQuery(p.brand, q) ||
          matchesQuery(p.merchant, q)),
    )
    .sort(sortProducts)
    .slice(0, LIMITS.products)
    .map(
      (p): SearchProductHit => ({
        type: "product",
        id: p.id,
        title: p.title,
        brand: p.brand,
        merchant: p.merchant,
        price: p.price,
        priceLabel: formatPriceDkk(p.price),
        url: p.url,
        image: p.image,
      }),
    );

  return {
    categories: categoryHits,
    guides: guideHits,
    products: productHits,
  };
}
