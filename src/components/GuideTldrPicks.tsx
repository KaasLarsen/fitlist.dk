import Link from "next/link";
import type { FeedProduct } from "@/lib/feeds/types";
import { formatPriceDkk } from "@/lib/format-price";
import {
  getProductAffiliate,
  type Guide,
  type GuideProduct,
} from "@/lib/guides";

type TldrRow = {
  product: GuideProduct;
  label: string;
};

function resolveTldrRows(guide: Guide): TldrRow[] {
  if (guide.tldrPicks && guide.tldrPicks.length > 0) {
    return guide.tldrPicks.flatMap((pick) => {
      const product = guide.products.find((p) => p.id === pick.productId);
      if (!product) return [];
      return [{ product, label: pick.label }];
    });
  }

  return guide.products.slice(0, 3).map((product, index) => ({
    product,
    label: product.badge ?? `Top ${index + 1}`,
  }));
}

function shopLabelFor(
  product: GuideProduct,
  offer: FeedProduct | undefined,
  partnerName: string | undefined,
): string | undefined {
  if (product.ctaLabel) {
    return product.ctaLabel.replaceAll(
      "{partner}",
      partnerName ?? "partneren",
    );
  }
  if (offer) return `Se pris hos ${offer.merchant}`;
  const affiliate = getProductAffiliate(product);
  return affiliate?.label;
}

export function GuideTldrPicks({
  guide,
  offerMap,
  categoryHref,
}: {
  guide: Guide;
  offerMap: Map<string, FeedProduct | undefined>;
  categoryHref: string;
}) {
  const rows = resolveTldrRows(guide);
  if (rows.length === 0) return null;

  return (
    <section
      id="top-valg"
      aria-label="Top valg"
      className="mt-10 border border-border bg-surface/50 px-4 py-6 sm:px-6"
    >
      <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-accent">
        Top {rows.length} valg
      </p>
      <p className="mt-2 text-sm text-muted">
        Hurtigt overblik — spring direkte til pris eller læs kriterierne
        nedenfor.
      </p>

      <ol className="mt-6 divide-y divide-border border-t border-border">
        {rows.map(({ product, label }, index) => {
          const offer = product.feedProductId
            ? offerMap.get(product.feedProductId)
            : undefined;
          const affiliate = getProductAffiliate(product);
          const shopHref = offer?.url ?? affiliate?.url;
          const partnerName = offer?.merchant ?? affiliate?.partner;
          const shopLabel = shopLabelFor(product, offer, partnerName);

          return (
            <li
              key={product.id}
              className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <div className="min-w-0">
                <p className="font-display text-xs font-medium uppercase tracking-[0.14em] text-accent">
                  {index + 1}. {label}
                </p>
                <a
                  href={`#produkt-${product.id}`}
                  className="mt-1 block font-display text-lg font-medium uppercase tracking-wide text-foreground transition-colors hover:text-accent"
                >
                  {product.name}
                </a>
                {offer ? (
                  <p className="mt-1 text-sm tabular-nums text-muted">
                    {formatPriceDkk(offer.price)}
                    <span className="ml-2">· {offer.merchant}</span>
                    {!offer.inStock ? (
                      <span className="ml-2">· Ikke på lager</span>
                    ) : null}
                  </p>
                ) : null}
              </div>

              {shopHref && shopLabel ? (
                <a
                  href={shopHref}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex shrink-0 items-center justify-center bg-accent px-4 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-accent-fg transition-colors hover:bg-accent-dim"
                >
                  {shopLabel}
                </a>
              ) : (
                <Link
                  href={categoryHref}
                  className="inline-flex shrink-0 items-center justify-center border border-border px-4 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:border-accent hover:text-accent-dim"
                >
                  Se tilbud →
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
