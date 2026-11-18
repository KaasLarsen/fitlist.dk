import {
  getGuide,
  guidePath,
  type Guide,
} from "@/lib/guides";

export type TopicCluster = {
  slug: string;
  title: string;
  description: string;
  pillarSlug: string;
  clusterSlugs: string[];
  categorySlug?: string;
};

export const topicClusters: TopicCluster[] = [
  {
    slug: "squat-racks-power-cages",
    title: "Squat racks & power cages",
    description:
      "Fra loftshøjde og gulvmåtter til rack-valg og komplet garage-gym under 10.000 kr. — hele klyngen omkring squat racks og power cages.",
    pillarSlug: "bedste-power-rack-squat-rack-2026",
    clusterSlugs: [
      "squat-rack-til-lavt-loft-2026",
      "loftshoejde-til-squat-rack-2026",
      "komplet-hjemmegym-under-10000-kr-2026",
      "bedste-traeningsmaatte-gulvbeskyttelse-home-gym-2026",
    ],
    categorySlug: "styrkemaskiner",
  },
  {
    slug: "skaansom-hjemmetraening",
    title: "Skånsom hjemmetræning",
    description:
      "Dårlig ryg, knæ eller behov for tryg indstigning: stødabsorbering, siddecykel, crosstrainer og senior-venligt grej — bundet sammen omkring skånsom cardio hjemme.",
    pillarSlug: "traeningsmaskiner-til-daarlig-ryg-eller-knae-2026",
    clusterSlugs: [
      "bedste-traeningsudstyr-til-seniorer-2026",
      "bedste-knaevenlig-genoptraening-hjemme-2026",
      "bedste-crosstrainer-til-daarlige-knae-2026",
      "bedste-siddecykel-2026",
    ],
    categorySlug: "crosstrainer",
  },
  {
    slug: "saeson-og-start",
    title: "Sæson & opstart",
    description:
      "Vintertræning, nytårsforsæt og udsalg: hold formen i mørke måneder, undgå fejlkøb i januar, og shop Black Friday / januar-tilbud med åbne øjne.",
    pillarSlug: "vintertraening-derhjemme-bedste-maskiner-2026",
    clusterSlugs: [
      "nytaarsforsat-undgaa-fejlkob-hjemmetraening-2026",
      "black-friday-januar-udsalg-traeningsmaskiner-2026",
      "hjemmetraening-for-begyndere-foerste-90-dage",
      "hjemmetraening-for-travle-boernefamilier-2026",
    ],
    categorySlug: "motionscykel",
  },
  {
    slug: "oekonomi-og-ejerskab",
    title: "Økonomi & ejerskab",
    description:
      "Kan det betale sig? Hjemmegym vs. fitnesscenter, strømforbrug, brugt vs. ny — plus fejlfinding når løbebåndet hakker, før du køber igen.",
    pillarSlug: "hjemmegym-vs-fitnesscenter-regnestykke-2026",
    clusterSlugs: [
      "stroemforbrug-loebabaand-crosstrainer-2026",
      "brugt-vs-ny-traeningsmaskine-garanti-2026",
      "loebebaand-glider-eller-hakker-fejlfinding-2026",
      "ultimative-home-gym-budget-2026",
    ],
    categorySlug: "styrkemaskiner",
  },
];

export function getAllTopicClusters(): TopicCluster[] {
  return topicClusters;
}

export function getTopicCluster(slug: string): TopicCluster | undefined {
  return topicClusters.find((c) => c.slug === slug);
}

/** Finder den klynge en guide tilhører (som pillar eller cluster). */
export function getClusterForGuide(guideSlug: string): TopicCluster | undefined {
  return topicClusters.find(
    (c) =>
      c.pillarSlug === guideSlug || c.clusterSlugs.includes(guideSlug),
  );
}

export function isPillarGuide(guideSlug: string, cluster?: TopicCluster): boolean {
  const c = cluster ?? getClusterForGuide(guideSlug);
  return Boolean(c && c.pillarSlug === guideSlug);
}

export function getPillarGuide(cluster: TopicCluster): Guide | undefined {
  return getGuide(cluster.pillarSlug);
}

export function getClusterGuides(cluster: TopicCluster): Guide[] {
  return cluster.clusterSlugs
    .map((slug) => getGuide(slug))
    .filter((g): g is Guide => Boolean(g));
}

/** Søskende i samme klynge — ekskluderer den aktuelle guide. */
export function getSiblingGuides(
  guideSlug: string,
  cluster?: TopicCluster,
): Guide[] {
  const c = cluster ?? getClusterForGuide(guideSlug);
  if (!c) return [];
  return c.clusterSlugs
    .filter((slug) => slug !== guideSlug)
    .map((slug) => getGuide(slug))
    .filter((g): g is Guide => Boolean(g));
}

/** Descriptive link label til en cluster-guide i UI. */
export function clusterLinkLabel(guide: Guide): string {
  return guide.title;
}

export function pillarHref(cluster: TopicCluster): string {
  const pillar = getPillarGuide(cluster);
  return pillar ? guidePath(pillar) : `/guides/${cluster.pillarSlug}`;
}
