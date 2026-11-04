import Link from "next/link";
import { getAllCategories } from "@/lib/categories";

export function CategorySection() {
  const categories = getAllCategories();

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Maskiner
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold uppercase tracking-wide text-foreground sm:text-4xl">
          Vælg efter type og behov
        </h2>
        <p className="mt-4 max-w-lg text-muted">
          Løbebånd, cykel, romaskine, crosstrainer eller styrke — og filtrér på
          plads, støj og budget.
        </p>

        <ul className="mt-14 divide-y divide-border border-t border-border">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/maskiner/${category.slug}`}
                className="group flex flex-col gap-1 py-8 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-display text-xl font-medium uppercase tracking-wide text-foreground transition-colors group-hover:text-accent sm:text-2xl">
                  {category.shortName}
                </span>
                <span className="text-sm text-muted">
                  {category.intents.map((i) => i.label).join(" · ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
