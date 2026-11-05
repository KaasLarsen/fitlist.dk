import { ProductOfferList } from "@/components/ProductOfferList";
import { getProductsByCategory } from "@/lib/feeds/catalog";
import type { MachineCategorySlug } from "@/lib/feeds/types";

const CATEGORY_OFFER_LIMIT = 24;

type Props = {
  categorySlug: MachineCategorySlug;
  categoryName: string;
  intentSlug?: string;
  intentLabel?: string;
};

export async function CategoryOffers({
  categorySlug,
  categoryName,
  intentSlug,
  intentLabel,
}: Props) {
  const products = await getProductsByCategory(categorySlug, {
    intentSlug,
    limit: CATEGORY_OFFER_LIMIT,
  });

  return (
    <section className="mt-16 border-t border-border pt-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
          Tilbud
        </h2>
        {products.length > 0 ? (
          <p className="font-display text-xs uppercase tracking-[0.14em] text-muted">
            {products.length} produkt{products.length === 1 ? "" : "er"}
            {intentLabel ? ` · ${intentLabel}` : ""}
          </p>
        ) : null}
      </div>
      <ProductOfferList
        products={products}
        emptyMessage={
          intentLabel
            ? `Ingen tilbud matcher “${intentLabel}” lige nu. Prøv et andet filter.`
            : `Vi har endnu ikke fundet ${categoryName.toLowerCase()} i partnerfeeds. Tjek igen snart.`
        }
      />
    </section>
  );
}
