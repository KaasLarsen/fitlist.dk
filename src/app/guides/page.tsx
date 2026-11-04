import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description: "Guides til træningsmaskiner til hjemmet — kommer snart.",
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Guides
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          Kommer snart
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Vi bygger guides til løbebånd, cykler, romaskiner og mere. Indhold
          dukker op her, når det er klar.
        </p>

        {guides.length === 0 ? (
          <div className="mt-16 border-t border-border pt-10">
            <p className="text-sm text-muted">Ingen guides endnu.</p>
            <Link
              href="/"
              className="mt-6 inline-flex font-display text-sm font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:text-accent-dim"
            >
              Til forsiden
            </Link>
          </div>
        ) : (
          <ul className="mt-16 divide-y divide-border border-t border-border">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="group flex flex-col gap-2 py-8 transition-colors sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">
                      {guide.category}
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
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
