import type { Metadata } from "next";
import Link from "next/link";
import { getCategory } from "@/lib/categories";
import { getModelGuides } from "@/lib/guides";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Modelguides",
  description:
    "Modelguides til udvalgte træningsmaskiner — én side pr. model med fordele, ulemper, hvem den passer til, og live priser fra danske partnere.",
  alternates: { canonical: canonical("/guides/modelguides") },
};

const chipClass = (active: boolean) =>
  `inline-flex border px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
    active
      ? "border-accent bg-accent text-accent-fg"
      : "border-border text-muted hover:border-foreground hover:text-foreground"
  }`;

export default function ModelGuidesPage() {
  const guides = getModelGuides();

  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Guides
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          Modelguides
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Én side pr. maskine — til dig der allerede kigger på en konkret model.
          Fordele, ulemper, hvem den passer til, og live pris hos partneren.
        </p>

        <section className="mt-12">
          <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
            Filtrer
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            <li>
              <Link href="/guides" className={chipClass(false)}>
                Alle købsguides
              </Link>
            </li>
            <li>
              <Link href="/guides/modelguides" className={chipClass(true)}>
                Modelguides
              </Link>
            </li>
          </ul>
        </section>

        {guides.length === 0 ? (
          <p className="mt-16 border-t border-border pt-8 text-muted">
            Ingen modelguides endnu.
          </p>
        ) : (
          <ul className="mt-16 divide-y divide-border border-t border-border">
            {guides.map((guide) => {
              const category = getCategory(guide.categorySlug);
              return (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="group flex flex-col gap-2 py-8 transition-colors sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted">
                        <span className="text-accent">Modelguide</span>
                        <span className="mx-2 text-border">·</span>
                        {category?.name ?? guide.categorySlug}
                      </p>
                      <h2 className="mt-1 font-display text-2xl font-medium uppercase tracking-wide text-foreground transition-colors group-hover:text-accent">
                        {guide.title}
                      </h2>
                      <p className="mt-2 max-w-xl text-sm text-muted">
                        {guide.excerpt}
                      </p>
                    </div>
                    <span className="shrink-0 font-display text-xs uppercase tracking-[0.16em] text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      Læs →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <Link
          href="/guides"
          className="mt-10 inline-flex font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-dim"
        >
          ← Alle købsguides
        </Link>
      </div>
    </div>
  );
}
