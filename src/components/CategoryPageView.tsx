import Link from "next/link";
import { Suspense } from "react";
import { CategoryOffers } from "@/components/CategoryOffers";
import { CategoryOffersSkeleton } from "@/components/CategoryOffersSkeleton";
import type { MachineCategory, MachineIntent } from "@/lib/categories";
import { categoryIntentHref } from "@/lib/categories";
import type { MachineCategorySlug } from "@/lib/feeds/types";
import type { Guide } from "@/lib/guides";

type Props = {
  category: MachineCategory;
  activeIntent?: MachineIntent;
  guides: Guide[];
  intentGuide?: Guide;
};

export function CategoryPageView({
  category,
  activeIntent,
  guides,
  intentGuide,
}: Props) {
  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <Link
          href="/maskiner"
          className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent transition-colors hover:text-accent-dim"
        >
          ← Maskiner
        </Link>
        <h1 className="mt-4 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          {category.name}
        </h1>
        <p className="mt-4 max-w-2xl text-muted">{category.description}</p>

        <section className="mt-12">
          <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
            Filtrer efter behov
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            <li>
              <Link
                href={`/maskiner/${category.slug}`}
                className={`inline-flex border px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                  !activeIntent
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border text-muted hover:border-foreground hover:text-foreground"
                }`}
              >
                Alle
              </Link>
            </li>
            {category.intents.map((intent) => {
              const active = activeIntent?.slug === intent.slug;
              return (
                <li key={intent.slug}>
                  <Link
                    href={categoryIntentHref(category.slug, intent.slug)}
                    className={`inline-flex border px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? "border-accent bg-accent text-accent-fg"
                        : "border-border text-muted hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {intent.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {activeIntent ? (
            <div className="mt-5 max-w-xl space-y-3">
              <p className="text-sm text-muted">{activeIntent.description}</p>
              {intentGuide ? (
                <p className="text-sm text-foreground/90">
                  <span className="text-muted">Købsguide: </span>
                  <Link
                    href={`/guides/${intentGuide.slug}`}
                    className="font-display uppercase tracking-wide text-accent transition-colors hover:text-accent-dim"
                  >
                    {intentGuide.title} →
                  </Link>
                </p>
              ) : null}
            </div>
          ) : null}
        </section>

        <Suspense
          key={activeIntent?.slug ?? "alle"}
          fallback={<CategoryOffersSkeleton />}
        >
          <CategoryOffers
            categorySlug={category.slug as MachineCategorySlug}
            categoryName={category.name}
            intentSlug={activeIntent?.slug}
            intentLabel={activeIntent?.label}
          />
        </Suspense>

        <section className="mt-16 border-t border-border pt-10">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
            Guides
          </h2>
          {guides.length === 0 ? (
            <p className="mt-4 text-muted">
              Guides til {category.name.toLowerCase()} er på vej.
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-border">
              {[
                ...guides.filter((g) => g.slug === intentGuide?.slug),
                ...guides.filter((g) => g.slug !== intentGuide?.slug),
              ].map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="group block py-8"
                  >
                    {intentGuide?.slug === guide.slug ? (
                      <p className="font-display text-xs font-medium uppercase tracking-[0.16em] text-accent">
                        Matcher dit filter
                      </p>
                    ) : null}
                    <h3
                      className={`font-display text-xl font-medium uppercase tracking-wide text-foreground transition-colors group-hover:text-accent ${
                        intentGuide?.slug === guide.slug ? "mt-1" : ""
                      }`}
                    >
                      {guide.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{guide.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-14 border-t border-border pt-10">
          <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-foreground">
            Use cases
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {category.intents.map((intent) => (
              <li key={intent.slug}>
                <Link
                  href={categoryIntentHref(category.slug, intent.slug)}
                  className="block border border-border p-4 transition-colors hover:border-accent"
                >
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                    {intent.label}
                  </p>
                  <p className="mt-2 text-sm text-muted">{intent.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
