import Link from "next/link";
import { guidePath, type Guide } from "@/lib/guides";
import {
  getClusterForGuide,
  getClusterGuides,
  getPillarGuide,
  getSiblingGuides,
  isPillarGuide,
  type TopicCluster,
} from "@/lib/topic-clusters";

function ClusterLink({ guide }: { guide: Guide }) {
  return (
    <Link
      href={guidePath(guide)}
      className="text-accent transition-colors hover:text-accent-dim"
    >
      {guide.title}
    </Link>
  );
}

function PillarClusterNav({
  cluster,
  guides,
}: {
  cluster: TopicCluster;
  guides: Guide[];
}) {
  if (guides.length === 0) return null;

  return (
    <nav
      aria-label={`Emneklynge: ${cluster.title}`}
      className="mt-10 border-t border-border pt-8"
    >
      <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
        I denne emneklynge
      </p>
      <p className="mt-2 text-sm text-muted">{cluster.description}</p>
      <ul className="mt-4 space-y-2 text-base leading-relaxed text-foreground/90">
        {guides.map((g) => (
          <li key={g.slug}>
            <ClusterLink guide={g} />
            {g.excerpt ? (
              <span className="text-muted"> — {g.excerpt}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MemberClusterNav({
  cluster,
  pillar,
  siblings,
}: {
  cluster: TopicCluster;
  pillar: Guide;
  siblings: Guide[];
}) {
  const shown = siblings.slice(0, 3);

  return (
    <nav
      aria-label={`Emneklynge: ${cluster.title}`}
      className="mt-10 border-t border-border pt-8"
    >
      <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-muted">
        Del af emneklyngen
      </p>
      <p className="mt-3 text-base leading-relaxed text-foreground/90">
        Se hele oversigten over{" "}
        <ClusterLink guide={pillar} /> for det store billede.
      </p>
      {shown.length > 0 ? (
        <>
          <p className="mt-4 font-display text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Relateret i klyngen
          </p>
          <ul className="mt-2 space-y-2 text-base leading-relaxed text-foreground/90">
            {shown.map((g) => (
              <li key={g.slug}>
                <ClusterLink guide={g} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </nav>
  );
}

export function TopicClusterSection({ guide }: { guide: Guide }) {
  const cluster = getClusterForGuide(guide.slug);
  if (!cluster) return null;

  if (isPillarGuide(guide.slug, cluster)) {
    return (
      <PillarClusterNav
        cluster={cluster}
        guides={getClusterGuides(cluster)}
      />
    );
  }

  const pillar = getPillarGuide(cluster);
  if (!pillar) return null;

  return (
    <MemberClusterNav
      cluster={cluster}
      pillar={pillar}
      siblings={getSiblingGuides(guide.slug, cluster)}
    />
  );
}
