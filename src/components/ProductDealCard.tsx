import Image from "next/image";
import { discountPercent, formatPriceDkk } from "@/lib/feeds/catalog";
import type { FeedProduct } from "@/lib/feeds/types";

type Props = {
  product: FeedProduct;
};

export function ProductDealCard({ product }: Props) {
  const pct = discountPercent(product);

  return (
    <article className="group flex flex-col border border-border bg-surface transition-colors hover:border-accent/40">
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="relative block aspect-[4/3] overflow-hidden bg-background"
      >
        {pct != null && pct > 0 ? (
          <span className="absolute left-0 top-0 z-10 bg-accent px-2.5 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-accent-fg">
            −{pct}&nbsp;%
          </span>
        ) : null}
        {product.image ? (
          <Image
            src={product.image}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 240px"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-xs uppercase tracking-[0.14em] text-muted">
            Intet billede
          </div>
        )}
      </a>

      <div className="flex flex-1 flex-col gap-3 border-t border-border p-4">
        <div className="min-w-0 flex-1">
          <p className="font-display text-[11px] uppercase tracking-[0.14em] text-muted">
            {product.merchant}
          </p>
          <h3 className="mt-1.5 line-clamp-2 font-display text-base font-medium uppercase leading-snug tracking-wide text-foreground">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="transition-colors hover:text-accent"
            >
              {product.title}
            </a>
          </h3>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            {pct != null && product.oldPrice != null ? (
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
            className="inline-flex shrink-0 bg-accent px-3 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-fg transition-colors hover:bg-accent-dim"
          >
            Se pris
          </a>
        </div>
      </div>
    </article>
  );
}
