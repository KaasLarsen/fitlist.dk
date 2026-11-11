import Link from "next/link";
import { ProductDealCard } from "@/components/ProductDealCard";
import type { FeedProduct } from "@/lib/feeds/types";

type Props = {
  products: FeedProduct[];
};

export function DailyDealsSection({ products }: Props) {
  if (products.length === 0) return null;

  return (
    <section
      id="dagens-tilbud"
      className="scroll-mt-20 border-t border-border bg-background"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Tilbud
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-wide text-foreground sm:text-4xl">
              Dagens tilbud
            </h2>
            <p className="mt-4 max-w-lg text-muted">
              Et udvalg af de største rabatter på hjemmetræningsmaskiner lige nu.
              Det skifter hver dag.
            </p>
          </div>
          <Link
            href="/tilbud"
            className="shrink-0 font-display text-sm font-medium uppercase tracking-[0.14em] text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Se flere tilbud →
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductDealCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
