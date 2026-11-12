import { connection } from "next/server";
import { CategoryOffersFilterable } from "@/components/CategoryOffersFilterable";
import { getProductsByCategory } from "@/lib/feeds/catalog";
import type { MachineCategorySlug } from "@/lib/feeds/types";

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
  // Undgå at build-time tomme tilbud låses i Full Route Cache efter deploy.
  await connection();

  const [products, categoryAll] = await Promise.all([
    getProductsByCategory(categorySlug, {
      intentSlug,
    }),
    intentSlug
      ? getProductsByCategory(categorySlug, { limit: 1 })
      : Promise.resolve(null),
  ]);

  const catalogEmpty = intentSlug
    ? (categoryAll?.length ?? 0) === 0
    : products.length === 0;

  const emptyMessage =
    intentLabel && !catalogEmpty
      ? `Ingen tilbud matcher “${intentLabel}” lige nu. Prøv et andet filter.`
      : `Vi har endnu ikke fundet ${categoryName.toLowerCase()} i partnerfeeds. Tjek igen snart.`;

  return (
    <CategoryOffersFilterable
      products={products}
      emptyMessage={emptyMessage}
      intentLabel={intentLabel}
    />
  );
}
