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

const MODEL_VS = [
  {
    label: "Ascendic 7021 vs. Reebok i-Run 4.5",
    short: "Hældning på budget eller fold under møbel",
    slug: "ascendic-7021-vs-reebok-i-run-4-5-2026",
  },
  {
    label: "Ascendic 6004 vs. Odin R1800",
    short: "Stille magnet eller vand-splash",
    slug: "ascendic-6004-vs-odin-r1800-2026",
  },
  {
    label: "Titan Life B35 vs. Ascendic 8001",
    short: "Fast kondicykel eller fold + ryglæn",
    slug: "titan-life-b35-vs-ascendic-8001-2026",
  },
] as const;

function resolveLinks<T extends { slug: string }>(items: readonly T[]) {
  return items.flatMap((item) => {
    const guide = getGuide(item.slug);
    if (!guide) return [];
    return [{ ...item, href: guidePath(guide) }];
  });
}

export function ComparisonsSection() {
  const typeItems = resolveLinks(COMPARISONS);
  const modelItems = resolveLinks(MODEL_VS);

  if (typeItems.length === 0 && modelItems.length === 0) return null;

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

        {typeItems.length > 0 ? (
          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {typeItems.map((item) => (
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
        ) : null}

        {modelItems.length > 0 ? (
          <div className="mt-16 border-t border-border pt-12">
            <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Model mod model
            </p>
            <h3 className="mt-3 max-w-xl font-display text-2xl font-semibold uppercase tracking-wide text-foreground sm:text-3xl">
              To konkrete maskiner — side om side
            </h3>
            <p className="mt-4 max-w-lg text-muted">
              Klar på typen, men i tvivl mellem to modeller? Spec-tabel, verdict
              og live priser.
            </p>
            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {modelItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col justify-between gap-4 border border-border bg-background px-4 py-6 transition-colors hover:border-accent/40 sm:gap-6 sm:px-6 sm:py-8"
                  >
                    <div>
                      <p className="font-display text-lg font-medium uppercase tracking-wide text-foreground transition-colors group-hover:text-accent sm:text-xl">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm text-muted">{item.short}</p>
                    </div>
                    <span className="font-display text-xs uppercase tracking-[0.16em] text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      Se sammenligning →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
