import Link from "next/link";
import { getCategory } from "@/lib/categories";
import type { Guide } from "@/lib/guides";

type Props = {
  guides: Guide[];
};

export function FeaturedGuidesSection({ guides }: Props) {
  if (guides.length === 0) return null;

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Guides
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-wide text-foreground sm:text-4xl">
              Købsguides
            </h2>
            <p className="mt-4 max-w-lg text-muted">
              Detaljerede guides med anbefalinger og live priser — fra løbebånd,
              romaskine og crosstrainer til kontor-gåbånd, budget-pakker og styrke.
            </p>
          </div>
          <Link
            href="/guides"
            className="shrink-0 font-display text-sm font-medium uppercase tracking-[0.14em] text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Alle guides →
          </Link>
        </div>

        <ul className="mt-12 divide-y divide-border border-t border-border">
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
                      {guide.slug === "gaabaand-til-kontoret-2026"
                        ? " · Kontor / under-desk"
                        : guide.slug === "bedste-stoejsvage-traeningsmaskiner-lejlighed-2026"
                          ? " · Støjsvag / lejlighed"
                          : guide.slug === "ultimative-home-gym-budget-2026"
                            ? " · Budget / max 5.000"
                        : guide.slug === "bedste-foldbare-kompakte-traeningsmaskiner-2026"
                          ? " · Foldbar / kompakt"
                          : guide.slug === "bedste-cardio-under-lavt-loft-2026"
                            ? " · Lavt loft / skråvæg"
                              : guide.slug === "bedste-loebebaand-2026"
                                ? " · Løb hjemme"
                                : guide.slug === "bedste-romaskine-2026"
                                  ? " · Luft / magnet / vand"
                                  : guide.intentSlug === "gaabaand"
                                    ? " · Gåbånd"
                                    : guide.intentSlug === "siddecykel"
                                      ? " · Senior / siddecykel"
                                      : guide.intentSlug === "stoejsvag"
                                        ? " · Støjsvag"
                                        : guide.intentSlug === "spinning"
                                          ? " · Spinning"
                                          : guide.intentSlug === "smart"
                                            ? " · Smart / Zwift"
                                            : guide.intentSlug === "airbike"
                                              ? " · Airbike"
                                              : guide.intentSlug === "multistation"
                                                ? " · Multistation"
                                                : guide.intentSlug === "traeningsbaenk"
                                                  ? " · Træningsbænk"
                                                  : guide.intentSlug === "haandvaegte"
                                                    ? " · Håndvægte"
                                                    : guide.intentSlug === "kabeltaarn"
                                                      ? " · Kabeltårn"
                                                      : guide.intentSlug === "begynder"
                                                        ? " · Begynder"
                                                        : guide.intentSlug === "foldbar"
                                                          ? " · Foldbar"
                                                          : ""}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-medium uppercase tracking-wide text-foreground transition-colors group-hover:text-accent">
                      {guide.title}
                    </h3>
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
      </div>
    </section>
  );
}
