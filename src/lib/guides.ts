export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  /** Affiliate-link ids fra lib/affiliates.ts */
  affiliateIds?: string[];
  body?: string;
};

/**
 * Guides til hjemmetræningsmaskiner. Tom indtil indhold er klar.
 */
export const guides: Guide[] = [];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuides(): Guide[] {
  return [...guides].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
