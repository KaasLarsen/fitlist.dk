import type { Metadata } from "next";
import Link from "next/link";
import { getCategory } from "@/lib/categories";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Lange købsguides til gåbånd, spinning, løbebånd, romaskiner, motionscykler, crosstrainere og styrkemaskiner — kriterier, anbefalinger og live priser fra danske partnere.",
  alternates: { canonical: "https://fitlist.dk/guides" },
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Guides
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          Købsguides
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Detaljerede købsguides med klare anbefalinger, valg-kriterier og ét
          klik videre til aktuelle priser hos vores partnere.
        </p>

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
