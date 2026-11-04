import Image from "next/image";
import { formatPriceDkk } from "@/lib/feeds/catalog";
import type { FeedProduct } from "@/lib/feeds/types";

type Props = {
  product: FeedProduct;
  /** Kompakt variant til guides (uden lager-linje) */
  compact?: boolean;
};

export function ProductOfferCard({ product, compact = false }: Props) {
  const hasDiscount =
    product.oldPrice != null &&
    product.price != null &&
    product.oldPrice > product.price;

  return (
    <article className="flex flex-col gap-4 border-t border-border py-8 sm:flex-row sm:items-center sm:gap-6">
      <div className="relative h-28 w-full shrink-0 overflow-hidden border border-border bg-surface sm:h-24 sm:w-32">
        {product.image ? (
          <Image
            src={product.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 128px"
            className="object-contain p-2"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-xs uppercase tracking-[0.14em] text-muted">
            Intet billede
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-display text-xs uppercase tracking-[0.14em] text-muted">
          {product.merchant}
          {!product.inStock ? (
            <span className="ml-2 text-muted/80">· Ikke på lager</span>
          ) : null}
        </p>
        <h3 className="mt-1 font-display text-lg font-medium uppercase tracking-wide text-foreground">
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="transition-colors hover:text-accent"
          >
            {product.title}
          </a>
        </h3>
        {!compact && product.brand && product.brand !== product.merchant ? (
          <p className="mt-1 text-sm text-muted">{product.brand}</p>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-row items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
        <div className="text-right">
          {hasDiscount ? (
            <p className="text-xs text-muted line-through">
              {formatPriceDkk(product.oldPrice)}
            </p>
          ) : null}
          <p className="font-display text-xl font-semibold tabular-nums text-foreground">
            {formatPriceDkk(product.price)}
          </p>
        </div>
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex bg-accent px-4 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-accent-fg transition-colors hover:bg-accent-dim"
        >
          Se pris
        </a>
      </div>
    </article>
  );
}
