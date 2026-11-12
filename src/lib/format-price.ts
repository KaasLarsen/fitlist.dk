import type { FeedProduct } from "@/lib/feeds/types";

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
