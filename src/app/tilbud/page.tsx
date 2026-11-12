import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { ProductDealCard } from "@/components/ProductDealCard";
import { getAllCategories, getCategory } from "@/lib/categories";
import { getAllDiscountedDeals } from "@/lib/feeds/catalog";
import { canonical } from "@/lib/site";

export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Tilbud",
  description:
    "Aktuelle rabatter på hjemmetræningsmaskiner — se de største tilbud på løbebånd, romaskiner, motionscykler, crosstrainere og mere fra danske partnere.",
  alternates: { canonical: canonical("/tilbud") },
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function TilbudPage({ searchParams }: Props) {
  // Undgå tom Full Route Cache efter deploy (feeds hentes først via cron/runtime).
  await connection();
  const { category: categorySlug } = await searchParams;
  const categories = getAllCategories();
  const activeCategory = categorySlug ? getCategory(categorySlug) : undefined;
  const products = await getAllDiscountedDeals({
    limit: 60,
    categorySlug: activeCategory?.slug,
  });

  const chipClass = (active: boolean) =>
    `inline-flex border px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
      active
        ? "border-accent bg-accent text-accent-fg"
        : "border-border text-muted hover:border-foreground hover:text-foreground"
    }`;

  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Tilbud
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          Aktuelle tilbud
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          De største rabatter på hjemmetræningsmaskiner lige nu — sorteret efter
          rabatprocent.
        </p>

        <section className="mt-12">
          <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
            Filtrer efter kategori
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            <li>
              <Link href="/tilbud" className={chipClass(!activeCategory)}>
                Alle
              </Link>
            </li>
            {categories.map((category) => {
              const active = activeCategory?.slug === category.slug;
              return (
                <li key={category.slug}>
                  <Link
                    href={`/tilbud?category=${category.slug}`}
                    className={chipClass(active)}
                  >
                    {category.shortName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {products.length === 0 ? (
          <p className="mt-16 border-t border-border pt-8 text-muted">
            {activeCategory
              ? `Ingen aktuelle tilbud i ${activeCategory.shortName.toLowerCase()} lige nu. Prøv en anden kategori, eller se alle maskiner.`
              : "Ingen aktuelle tilbud lige nu. Prøv igen senere, eller se alle maskiner."}
          </p>
        ) : (
          <ul className="mt-16 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <ProductDealCard product={product} />
              </li>
            ))}
          </ul>
        )}

        <Link
          href="/maskiner"
          className="mt-10 inline-flex font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-dim"
        >
          Se maskinkategorier →
        </Link>
      </div>
    </div>
  );
}
