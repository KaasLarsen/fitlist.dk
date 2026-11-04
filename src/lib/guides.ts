import { getAffiliate } from "@/lib/affiliates";

export type GuideCriterion = {
  title: string;
  description: string;
};

export type GuideSpec = {
  label: string;
  value: string;
};

export type GuideProduct = {
  id: string;
  name: string;
  /** Fx "Bedst samlet", "Bedste billige" */
  badge?: string;
  summary: string;
  pros: string[];
  cons: string[];
  specs: GuideSpec[];
  /** Id fra lib/affiliates.ts — udfyldes når partnerlinks er klar */
  affiliateId?: string;
};

export type GuideSection = {
  heading: string;
  body: string;
};

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  /** Matcher MachineCategory.slug */
  categorySlug: string;
  publishedAt: string;
  updatedAt: string;
  intro: string;
  criteria: GuideCriterion[];
  products: GuideProduct[];
  howToChoose: string;
  learningSections: GuideSection[];
  relatedSlugs?: string[];
};

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuides(): Guide[] {
  return [...guides].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getGuidesByCategory(categorySlug: string): Guide[] {
  return getAllGuides().filter((g) => g.categorySlug === categorySlug);
}

export function getRelatedGuides(guide: Guide): Guide[] {
  return (guide.relatedSlugs ?? [])
    .map((slug) => getGuide(slug))
    .filter((g): g is Guide => Boolean(g));
}

export function getProductAffiliate(product: GuideProduct) {
  if (!product.affiliateId) return undefined;
  return getAffiliate(product.affiliateId);
}

/**
 * Første guides: løbebånd + romaskine (højest søgeintent hos konkurrenterne).
 * Produktanbefalinger og affiliate-CTA’er tilføjes når partnerlinks er klar.
 */
export const guides: Guide[] = [
  {
    slug: "bedste-loebebaand-2026",
    title: "Bedste løbebånd 2026",
    excerpt:
      "Sådan vælger du løbebånd til hjemmet — plads, motor, støj og hvad der faktisk betyder noget.",
    categorySlug: "loebebaand",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    intro:
      "Et løbebånd er ofte den mest direkte vej til bedre kondition hjemme. Men markedet er fuldt af modeller, der ser ens ud på papiret og føles meget forskellige i stuen. Denne guide giver dig kriterierne først — produktanbefalingerne følger, når vores partneraftaler er på plads.",
    criteria: [
      {
        title: "Hvor ofte og hvor hårdt?",
        description:
          "Går du mest, eller skal du kunne løbe intervaller? Behovet styrer motor, løbeflade og holdbarhed mere end brandnavnet.",
      },
      {
        title: "Plads og opbevaring",
        description:
          "Mål længde, bredde og højde — og om maskinen skal være foldbar med transporthjul. Et bånd der ikke kan pakkes væk, bliver hurtigt en reol.",
      },
      {
        title: "Motor og løbeflade",
        description:
          "Stærkere motor holder typisk længere og larmer mindre under belastning. Løbefladen skal være bred og lang nok til din skridtlængde.",
      },
      {
        title: "Støj og naboer",
        description:
          "I lejlighed betyder støddæmpning og dæmpningsmåtte mindst lige så meget som topfart. Test gerne i butik eller læs støj-erfaringer.",
      },
      {
        title: "Budget vs. levetid",
        description:
          "Billige bånd kan være fine til gang. Til jævnligt løb betaler du ofte mindre over tid ved at vælge en mere solid model første gang.",
      },
    ],
    products: [],
    howToChoose:
      "Start med dit primære brug (gang, løb eller begge). Prioritér derefter plads: skal det foldes? Sæt et realistisk budget, og vælg derefter efter motor, løbeflade og støjdæmpning — ikke efter den største skærm. Når Fitlists konkrete anbefalinger er live, matcher vi dem til de samme kriterier.",
    learningSections: [
      {
        heading: "Løbebånd vs. andre maskiner",
        body: "Løbebåndet er stærkt til ren kondition og kalorieforbrænding, men belaster knæ og ankler mere end romaskine eller cykel. Har du ledudfordringer, så overvej crosstrainer eller romaskine som alternativ — eller kombiner gåbånd med styrketræning.",
      },
      {
        heading: "Hvad betyder incline?",
        body: "Elektronisk stigning lader dig simulere bakker uden at øge hastigheden. Det er effektivt til baller og baglår og skåner dig for at skulle løbe hurtigere for at få intensitet. Decline er nice-to-have — de fleste har sjældent brug for det.",
      },
    ],
    relatedSlugs: ["bedste-romaskine-2026"],
  },
  {
    slug: "bedste-romaskine-2026",
    title: "Bedste romaskine 2026",
    excerpt:
      "Helkropstræning hjemme: sådan vælger du mellem luft, vand og magnet — og hvad du skal måle inden køb.",
    categorySlug: "romaskine",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    intro:
      "En romaskine træner ben, ryg, core og arme i samme bevægelse — med lav stødbelastning. Det er derfor mange kalder den den mest komplette enkeltmaskine til hjemmet. Her får du valg-kriterierne på plads, før vi publicerer konkrete modeller med affiliate-links.",
    criteria: [
      {
        title: "Modstandstype",
        description:
          "Luft giver realistisk følelse og stiger med intensitet. Vand lyder autentisk. Magnet er ofte støjsvagest og billigere. Hydraulik er kompakt, men mindre “ægte” roning.",
      },
      {
        title: "Skinnelængde og brugerhøjde",
        description:
          "For korte skinner ødelægger slaglængden for høje brugere. Tjek maks. brugerhøjde og -vægt, før du køber.",
      },
      {
        title: "Støj i hjemmet",
        description:
          "Luft- og vandmodstand kan fylde mere lydmæssigt. Magnet er typisk bedst til aftentræning i lejlighed.",
      },
      {
        title: "Fold og footprint",
        description:
          "Mange romaskiner kan rejses vertikalt eller foldes. Mål både brugslængde og opbevaringsmål.",
      },
      {
        title: "Computer og motivation",
        description:
          "En simpel skærm med tid, slag og distance er nok for de fleste. App-tilslutning er et plus — ikke et must.",
      },
    ],
    products: [],
    howToChoose:
      "Vælg modstand efter støj- og realistiskhedsbehov (magnet vs. luft/vand). Bekræft at skinnen passer til din højde, og at maskinen kan opbevares, som du har plads til. Derefter: budget og build-kvalitet. Konkrete anbefalinger lander her, når partnerlinks er klar.",
    learningSections: [
      {
        heading: "Romaskine vs. løbebånd og cykel",
        body: "Romaskinen aktiverer flere muskelgrupper end løbebånd og motionscykel. Cykel er ofte skånsommere, hvis du har problemer i overkroppen. Løbebånd vinder på ren løbespecifik kondition. Til allround hjemmetræning er romaskinen svær at slå.",
      },
      {
        heading: "Teknik betyder mere end watt",
        body: "Dårlig roteknik belaster lænden. Start roligt, lær sekvensen (ben → core → arme), og undgå at rykke i håndtaget. En god maskine kan ikke redde dårlig teknik — men en dårlig maskine kan gøre god teknik svær.",
      },
    ],
    relatedSlugs: ["bedste-loebebaand-2026"],
  },
];
