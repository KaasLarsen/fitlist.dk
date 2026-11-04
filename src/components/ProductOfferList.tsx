import { ProductOfferCard } from "@/components/ProductOfferCard";
import type { FeedProduct } from "@/lib/feeds/types";

type Props = {
  products: FeedProduct[];
  emptyMessage?: string;
  compact?: boolean;
};

export function ProductOfferList({
  products,
  emptyMessage = "Ingen aktuelle tilbud i denne kategori lige nu.",
  compact = false,
}: Props) {
  if (products.length === 0) {
    return <p className="mt-4 text-muted">{emptyMessage}</p>;
  }

  return (
    <div className="mt-2">
      {products.map((product) => (
        <ProductOfferCard
          key={product.id}
          product={product}
          compact={compact}
        />
      ))}
    </div>
  );
}
