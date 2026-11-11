import { guides } from "@/lib/guides";

export const CYKELPARTNER_MERCHANT = "Cykelpartner.dk";

/** Alle Cykelpartner feedProductId’er brugt i guides (inkl. bundleItems). */
export function getCykelpartnerGuideFeedProductIds(): string[] {
  const ids = new Set<string>();
  const prefix = `${CYKELPARTNER_MERCHANT}:`;
  for (const guide of guides) {
    for (const product of guide.products) {
      if (product.feedProductId?.startsWith(prefix)) {
        ids.add(product.feedProductId);
      }
      for (const item of product.bundleItems ?? []) {
        if (item.feedProductId.startsWith(prefix)) {
          ids.add(item.feedProductId);
        }
      }
    }
  }
  return [...ids];
}
