import type { Metadata } from "next";
import Link from "next/link";
import { ProductDealCard } from "@/components/ProductDealCard";
import { getAllDiscountedDeals } from "@/lib/feeds/catalog";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tilbud",
  description:
    "Aktuelle rabatter på hjemmetræningsmaskiner — se de største tilbud på løbebånd, romaskiner, motionscykler, crosstrainere og mere fra danske partnere.",
  alternates: { canonical: canonical("/tilbud") },
};

export default async function TilbudPage() {
  const products = await getAllDiscountedDeals({ limit: 60 });

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

        {products.length === 0 ? (
          <p className="mt-16 border-t border-border pt-8 text-muted">
            Ingen aktuelle tilbud lige nu. Prøv igen senere, eller se alle
            maskiner.
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
