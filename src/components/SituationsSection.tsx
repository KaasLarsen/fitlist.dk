import Link from "next/link";
import { getGuide, guidePath } from "@/lib/guides";

const SITUATIONS = [
  {
    label: "Lejlighed / støjsvag",
    short: "Undgå sure naboer",
    slug: "bedste-stoejsvage-traeningsmaskiner-lejlighed-2026",
  },
  {
    label: "Foldbar / kompakt",
    short: "Pak væk efter brug",
    slug: "bedste-foldbare-kompakte-traeningsmaskiner-2026",
  },
  {
    label: "Kontor / gåbånd",
    short: "Skridt under desk",
    slug: "gaabaand-til-kontoret-2026",
  },
  {
    label: "Budget",
    short: "Home gym under 5.000",
    slug: "ultimative-home-gym-budget-2026",
  },
  {
    label: "Lille værelse",
    short: "Ca. 10 m² setup",
    slug: "home-gym-til-lille-vaerelse-10m2-2026",
  },
  {
    label: "Seniorer",
    short: "Skånsomt og stabilt",
    slug: "bedste-traeningsudstyr-til-seniorer-2026",
  },
] as const;

export function SituationsSection() {
  const items = SITUATIONS.flatMap((situation) => {
    const guide = getGuide(situation.slug);
    if (!guide) return [];
    return [{ ...situation, href: guidePath(guide) }];
  });

  if (items.length === 0) return null;

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Situation
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold uppercase tracking-wide text-foreground sm:text-4xl">
          Find udstyr efter din situation
        </h2>
        <p className="mt-4 max-w-lg text-muted">
          Støj, plads, budget eller kontor — start med det, der begrænser dig
          mest.
        </p>

        <ul className="mt-12 grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug} className="bg-background">
              <Link
                href={item.href}
                className="group flex h-full flex-col justify-between gap-4 px-4 py-6 transition-colors sm:gap-6 sm:px-6 sm:py-10"
              >
                <div>
                  <p className="font-display text-xl font-medium uppercase tracking-wide text-foreground transition-colors group-hover:text-accent sm:text-2xl">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.short}</p>
                </div>
                <span className="font-display text-xs uppercase tracking-[0.16em] text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Læs guide →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
