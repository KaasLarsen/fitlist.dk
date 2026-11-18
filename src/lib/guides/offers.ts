import {
  getFeedProductById,
} from "@/lib/feeds/catalog";
import { CYKELPARTNER_MERCHANT } from "@/lib/feeds/cykelpartner-guide-ids";
import { getCachedCykelpartnerGuideProducts } from "@/lib/feeds/fetch";
import type { FeedProduct } from "@/lib/feeds/types";
import type { GuideProduct } from "@/lib/guides";

/** Resolve live Partner-Ads offers for guide products (+ bundle lines). */
export async function resolveGuideOffers(
  products: GuideProduct[],
): Promise<Map<string, FeedProduct | undefined>> {
  const ids = new Set<string>();
  for (const product of products) {
    if (product.feedProductId) ids.add(product.feedProductId);
    for (const item of product.bundleItems ?? []) {
      ids.add(item.feedProductId);
    }
  }

  // Én Cykelpartner-hentning før parallelle id-opslag (stort feed).
  if ([...ids].some((id) => id.startsWith(`${CYKELPARTNER_MERCHANT}:`))) {
    await getCachedCykelpartnerGuideProducts();
  }

  const entries = await Promise.all(
    [...ids].map(async (id) => {
      const offer = await getFeedProductById(id);
      return [id, offer] as const;
    }),
  );
  return new Map(entries);
}
