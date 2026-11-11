export type MachineIntent = {
  slug: string;
  label: string;
  description: string;
};

export type MachineCategory = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  /** Cover-billede under public/ */
  image: string;
  intents: MachineIntent[];
};

/** Fælles intents der går på tværs af maskintyper */
export const sharedIntents: MachineIntent[] = [
  {
    slug: "foldbar",
    label: "Foldbar",
    description: "Til dig der skal kunne pakke maskinen væk efter træning.",
  },
  {
    slug: "billig",
    label: "Billig",
    description: "God værdi uden at gå på kompromis med det vigtigste.",
  },
  {
    slug: "stoejsvag",
    label: "Støjsvag",
    description: "Til lejlighed, aftentræning og hensyn til naboer.",
  },
  {
    slug: "plads",
    label: "Begrænset plads",
    description: "Kompakte valg når kvadratmeterne er få.",
  },
];

/**
 * Maskiner + Must-haves (tilbehør).
 * Intent-undersider: /maskiner/[slug]/[intent]
 */

/** Path til kategori (alle) eller et intent-filter. */
export function categoryIntentHref(
  categorySlug: string,
  intentSlug?: string,
): string {
  if (!intentSlug) return `/maskiner/${categorySlug}`;
  return `/maskiner/${categorySlug}/${intentSlug}`;
}

export const categories: MachineCategory[] = [
  {
    slug: "loebebaand",
    name: "Løbebånd",
    shortName: "Løbebånd",
    description:
      "Kondition, gåbånd og løb hjemme — fra foldbare modeller til seriøse baner.",
    image: "/images/categories/loebebaand.webp",
    intents: [
      {
        slug: "foldbar",
        label: "Foldbart",
        description: "Sammenklappelige løbebånd til små hjem.",
      },
      {
        slug: "gaabaand",
        label: "Gåbånd",
        description: "Lavere hastighed, ofte under skrivebordet.",
      },
      {
        slug: "stigning",
        label: "Med stigning",
        description: "Hældning til højere intensitet uden mere fart.",
      },
      {
        slug: "stoejsvag",
        label: "Støjsvag",
        description: "Til lejlighed, aftentræning og hensyn til naboer.",
      },
      {
        slug: "plads",
        label: "Kompakt",
        description: "Småt footprint når kvadratmeterne er få.",
      },
      {
        slug: "billig",
        label: "Billigt",
        description: "De bedste valg i den lavere prisklasse.",
      },
    ],
  },
  {
    slug: "motionscykel",
    name: "Motionscykel",
    shortName: "Cykler",
    description:
      "Kondicykel, spinning, smart/Zwift og airbike — skånsom cardio til alle niveauer.",
    image: "/images/categories/motionscykel.webp",
    intents: [
      {
        slug: "siddecykel",
        label: "Siddecykel",
        description:
          "Recumbent med ryglæn og lav indstigning — skånsomt for ryg og led.",
      },
      {
        slug: "spinning",
        label: "Spinning",
        description: "Indoor bike med tungt svinghjul og intensitet.",
      },
      {
        slug: "smart",
        label: "Smart / Zwift",
        description:
          "Bluetooth/app-styret modstand og interaktiv træning (Zwift, Kinomap m.fl.).",
      },
      {
        slug: "hometrainer",
        label: "Hometrainer",
        description:
          "Direct drive og wheel-on til din egen race-/gravelcykel (Zwift m.fl.).",
      },
      {
        slug: "airbike",
        label: "Airbike",
        description: "Assault-style bike med vindmodstand til HIIT.",
      },
      {
        slug: "stoejsvag",
        label: "Støjsvag",
        description: "Magnetmodstand og rolige aftenspas.",
      },
      {
        slug: "billig",
        label: "Billig",
        description: "Solide cykler uden unødvendig elektronik.",
      },
    ],
  },
  {
    slug: "romaskine",
    name: "Romaskine",
    shortName: "Romaskiner",
    description:
      "Helkropstræning med lav led-belastning — luft, vand eller magnet.",
    image: "/images/categories/romaskine.webp",
    intents: [
      {
        slug: "foldbar",
        label: "Foldbar",
        description: "Modeller der kan rejses eller klappes sammen.",
      },
      {
        slug: "stoejsvag",
        label: "Støjsvag",
        description: "Magnetmodstand til stille hjemmetræning.",
      },
      {
        slug: "vand",
        label: "Vandmodstand",
        description: "Vandromaskiner med splash og bådlignende følelse.",
      },
      {
        slug: "plads",
        label: "Kompakt",
        description: "Når skinne-længde og opbevaring er afgørende.",
      },
    ],
  },
  {
    slug: "crosstrainer",
    name: "Crosstrainer",
    shortName: "Crosstrainere",
    description:
      "Ledvenlig helkropscardio med flydende bevægelse — godt til restitution og vægttab.",
    image: "/images/categories/crosstrainer.webp",
    intents: [
      {
        slug: "plads",
        label: "Kompakt",
        description: "Mindre footprint til lejlighed og små rum.",
      },
      {
        slug: "stoejsvag",
        label: "Støjsvag",
        description: "Magnetiske systemer uden larmende remme.",
      },
      {
        slug: "billig",
        label: "Billig",
        description: "Bedste crosstrainere under den høje prisklasse.",
      },
    ],
  },
  {
    slug: "styrkemaskiner",
    name: "Styrkemaskiner",
    shortName: "Styrke",
    description:
      "Multigym, smith, bænk og cable — opbyg styrke uden center-abonnement.",
    image: "/images/categories/styrkemaskiner.webp",
    intents: [
      {
        slug: "multistation",
        label: "Multistation",
        description: "Home gym og kabelstationer med vægtstak.",
      },
      {
        slug: "traeningsbaenk",
        label: "Træningsbænk",
        description: "Flade og justerbare bænke til styrkerummet.",
      },
      {
        slug: "plads",
        label: "Kompakt",
        description: "Setup der passer i et ekstra værelse.",
      },
      {
        slug: "billig",
        label: "Billig",
        description: "Mest træning for pengene til hjemmegymmet.",
      },
      {
        slug: "begynder",
        label: "Begynder",
        description: "Trygge maskiner når du starter styrketræning hjemme.",
      },
      {
        slug: "kabeltaarn",
        label: "Kabeltårn",
        description:
          "Vægmonteret cable — typisk kun 15–20 cm fra væggen.",
      },
    ],
  },
  {
    slug: "tilbehoer",
    name: "Must-haves",
    shortName: "Tilbehør",
    description:
      "Håndvægte, kettlebells, underlagsmåtter, elastikker og slyngetræner — det lille tilbehør, der følger med ethvert maskinkøb.",
    image: "/images/categories/tilbehoer.webp",
    intents: [
      {
        slug: "haandvaegte",
        label: "Håndvægte",
        description: "Justerbare og faste håndvægte til hjemmestyrke.",
      },
      {
        slug: "kettlebells",
        label: "Kettlebells",
        description: "Støbejern, vinyl og konkurrence-kettlebells til hjemmetræning.",
      },
      {
        slug: "gulvmaatter",
        label: "Gulvmåtter",
        description: "Underlag der beskytter gulv og dæmper vibration.",
      },
      {
        slug: "fitnessgulv",
        label: "Fitnessgulv",
        description:
          "Puslespilsmåtter, gummigulv og tyk gulvbeskyttelse til home gym.",
      },
      {
        slug: "pullup",
        label: "Pull-up / dørribbe",
        description:
          "Dørribber uden skruer, vægmonterede barer og loftmonterede pull-up bars.",
      },
      {
        slug: "elastikker",
        label: "Elastikker",
        description: "Booty bands, power bands og elastiksæt.",
      },
      {
        slug: "slyngetraener",
        label: "Slyngetræner",
        description: "TRX-alternativer og suspension trainers.",
      },
      {
        slug: "begynder",
        label: "Begynder",
        description: "De simple ting, der er nok de første 90 dage.",
      },
    ],
  },
];

export function getCategory(slug: string): MachineCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategories(): MachineCategory[] {
  return categories;
}
