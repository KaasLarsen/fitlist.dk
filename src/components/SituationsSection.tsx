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
    label: "Travle børnefamilier",
    short: "Mest på 20 minutter",
    slug: "hjemmetraening-for-travle-boernefamilier-2026",
  },
  {
    label: "Dårlig ryg / knæ",
    short: "Skånsom cardio",
    slug: "traeningsmaskiner-til-daarlig-ryg-eller-knae-2026",
  },
  {
    label: "Vintertræning hjemme",
    short: "Form i mørke måneder",
    slug: "vintertraening-derhjemme-bedste-maskiner-2026",
  },
  {
    label: "Hjemme vs. fitness",
    short: "Hvornår er det tjent hjem?",
    slug: "hjemmegym-vs-fitnesscenter-regnestykke-2026",
  },
  {
    label: "Start for 3.000",
    short: "Udbyg løbende",
    slug: "fase-byggeren-start-for-3000-kr-2026",
  },
  {
    label: "Budget under 5.000",
    short: "Home gym Best Value",
    slug: "ultimative-home-gym-budget-2026",
  },
  {
    label: "Budget under 10.000",
    short: "Komplet hjemmegym",
    slug: "komplet-hjemmegym-under-10000-kr-2026",
  },
  {
    label: "Lille værelse",
    short: "Ca. 10 m² setup",
    slug: "home-gym-til-lille-vaerelse-10m2-2026",
  },
  {
    label: "Garage / kælder",
    short: "Multistation under tag",
    slug: "multistation-til-garage-kaelder-2026",
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
          Støj, plads, knæ, vinter eller budget — start med det, der begrænser
          dig mest.
        </p>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href}
                className="group flex h-full flex-col border border-border bg-surface/40 p-4 transition-colors hover:border-accent/40 hover:bg-surface sm:p-5"
              >
                <span className="font-display text-sm font-semibold uppercase tracking-wide text-foreground transition-colors group-hover:text-accent sm:text-base">
                  {item.label}
                </span>
                <span className="mt-1 text-sm text-muted">{item.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
