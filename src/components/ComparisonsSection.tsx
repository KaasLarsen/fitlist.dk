import Link from "next/link";
import { getGuide, guidePath } from "@/lib/guides";

const COMPARISONS = [
  {
    label: "Romaskine vs. crosstrainer",
    short: "Helkrop eller skånsom ellipse",
    slug: "romaskine-eller-crosstrainer-2026",
  },
  {
    label: "Løbebånd vs. crosstrainer",
    short: "Kalorier, støj og led",
    slug: "loebebaand-eller-crosstrainer-2026",
  },
  {
    label: "Spinning vs. motionscykel vs. hometrainer",
    short: "Kondicykel, spin eller Zwift",
    slug: "spinningcykel-motionscykel-eller-hometrainer-2026",
  },
  {
    label: "Gåbånd vs. løbebånd",
    short: "Walking pad eller rigtigt løb",
    slug: "loebebaand-eller-gaabaand-2026",
  },
  {
    label: "Motionscykel vs. spinning",
    short: "Rolig cardio eller intervaller",
    slug: "motionscykel-eller-spinningcykel-2026",
  },
  {
    label: "Incline vs. klassisk løbebånd",
    short: "Stigning eller fart",
    slug: "incline-loebebaand-eller-klassisk-2026",
  },
] as const;

export function ComparisonsSection() {
  const items = COMPARISONS.flatMap((comparison) => {
    const guide = getGuide(comparison.slug);
    if (!guide) return [];
    return [{ ...comparison, href: guidePath(guide) }];
  });

  if (items.length === 0) return null;

  return (
    <section className="border-t border-border bg-surface/40">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Sammenligning
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold uppercase tracking-wide text-foreground sm:text-4xl">
          Hvilken maskintype passer dig?
        </h2>
        <p className="mt-4 max-w-lg text-muted">
          Usikker mellem to typer? Start med en vs-guide — så undgår du det
          forkerte køb.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href}
                className="group flex h-full flex-col justify-between gap-4 border border-border bg-background px-4 py-6 transition-colors hover:border-accent/40 sm:gap-6 sm:px-6 sm:py-10"
              >
                <div>
                  <p className="font-display text-xl font-medium uppercase tracking-wide text-foreground transition-colors group-hover:text-accent sm:text-2xl">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.short}</p>
                </div>
                <span className="font-display text-xs uppercase tracking-[0.16em] text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Sammenlign →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
