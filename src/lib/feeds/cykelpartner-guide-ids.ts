import { guides } from "@/lib/guides";

export const CYKELPARTNER_MERCHANT = "Cykelpartner.dk";

function collectGuideFeedProductIds(): Set<string> {
  const ids = new Set<string>();
  for (const guide of guides) {
    for (const product of guide.products) {
      if (product.feedProductId) ids.add(product.feedProductId);
      for (const item of product.bundleItems ?? []) {
        if (item.feedProductId) ids.add(item.feedProductId);
      }
    }
  }
  return ids;
}

/** Alle feedProductId’er brugt i guides (inkl. bundleItems). */
export function getGuideFeedProductIds(): string[] {
  return [...collectGuideFeedProductIds()];
}

/** Alle Cykelpartner feedProductId’er brugt i guides (inkl. bundleItems). */
export function getCykelpartnerGuideFeedProductIds(): string[] {
  const prefix = `${CYKELPARTNER_MERCHANT}:`;
  return getGuideFeedProductIds().filter((id) => id.startsWith(prefix));
}
