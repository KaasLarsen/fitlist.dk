import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllTopicClusters,
  getClusterGuides,
  getPillarGuide,
  pillarHref,
} from "@/lib/topic-clusters";
import { guidePath } from "@/lib/guides";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Emneklynger",
  description:
    "Fitlists emneklynger: dybe guides bundet sammen omkring squat racks, hjemmegym og træningsmaskiner — så du finder det rigtige svar hurtigt.",
  alternates: { canonical: canonical("/emner") },
};

export default function EmnerPage() {
  const clusters = getAllTopicClusters();

  return (
    <div className="noise hero-glow flex flex-1 flex-col">
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32">
        <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Emneklynger
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold uppercase tracking-wide text-foreground sm:text-5xl">
          Emner vi dækker i dybden
        </h1>
        <p className="mt-4 text-lg text-muted">
          Hver klynge har én hovedguide (pillar) og flere specialiserede guides,
          der linker logisk sammen — så du kan gå fra overblik til det præcise
          svar.
        </p>

        <ul className="mt-14 space-y-14">
          {clusters.map((cluster) => {
            const pillar = getPillarGuide(cluster);
            const members = getClusterGuides(cluster);
            return (
              <li key={cluster.slug}>
                <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
                  <Link
                    href={pillarHref(cluster)}
                    className="transition-colors hover:text-accent"
                  >
                    {cluster.title}
                  </Link>
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {cluster.description}
                </p>
                {pillar ? (
                  <p className="mt-4 text-base text-foreground/90">
                    Hovedguide:{" "}
                    <Link
                      href={guidePath(pillar)}
                      className="text-accent transition-colors hover:text-accent-dim"
                    >
                      {pillar.title}
                    </Link>
                  </p>
                ) : null}
                {members.length > 0 ? (
                  <ul className="mt-4 space-y-2 text-base text-foreground/90">
                    {members.map((g) => (
                      <li key={g.slug}>
                        <Link
                          href={guidePath(g)}
                          className="text-accent transition-colors hover:text-accent-dim"
                        >
                          {g.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>

        <p className="mt-16 text-sm text-muted">
          Se alle købsguides under{" "}
          <Link
            href="/guides"
            className="text-accent transition-colors hover:text-accent-dim"
          >
            Guides
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
