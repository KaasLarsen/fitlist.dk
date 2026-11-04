import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/lib/categories";

export function CategorySection() {
  const categories = getAllCategories();

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
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

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <li
              key={category.slug}
              className={
                category.slug === "styrkemaskiner"
                  ? "sm:col-span-2 lg:col-span-1"
                  : undefined
              }
            >
              <Link
                href={`/maskiner/${category.slug}`}
                className="group relative block aspect-[16/10] overflow-hidden border border-border bg-surface"
              >
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/25 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span className="font-display text-xl font-medium uppercase tracking-wide text-white sm:text-2xl">
                    {category.shortName}
                  </span>
                  <span className="mt-1.5 block text-sm text-white/70">
                    {category.intents.map((i) => i.label).join(" · ")}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
