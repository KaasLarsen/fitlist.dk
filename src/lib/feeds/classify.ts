import type { FeedProduct, MachineCategorySlug } from "@/lib/feeds/types";

type CategoryRule = {
  slug: MachineCategorySlug;
  /** Whole-word / phrase matches against title + category + brand (normalized) */
  include: RegExp[];
  exclude?: RegExp[];
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa");
}

/**
 * Non-catalog noise — spare parts, oil, warranties, mini trainers.
 * Training mats / dumbbells / bands are classified as tilbehoer instead.
 */
const HARD_EXCLUDES: RegExp[] = [
  /silikone/,
  /olie/,
  /reservedel/,
  /garanti/,
  /warranty/,
  /pedaltraener/,
  /pedal\s*trainer/,
  /circulation\s*trainer/,
  /bevaegelses?traener/,
  /mini\s*motionscykel/,
  /mini[\s-]*bike/,
  /tilbehoerspakke/,
  /komplet\s+tilbehoer/,
];

/** Machine categories — matched before tilbehoer. */
const MACHINE_RULES: CategoryRule[] = [
  {
    slug: "loebebaand",
    include: [
      /\bloebebaand\b/,
      /\bløbebånd\b/,
      /\bgaabaand\b/,
      /\bgåbånd\b/,
      /\bwalking\s*pad\b/,
      /\bwalkingpad\b/,
      /\btreadmill\b/,
      /\bunderdesk\b/,
    ],
  },
  {
    slug: "romaskine",
    include: [
      /\bromaskine\b/,
      /\bairrow\b/,
      /\browing\s*machine\b/,
      /\brower\b/,
    ],
    exclude: [
      /\bhaandbold\b/,
      /\bhåndbold\b/,
      /\bboldmaal\b/,
      /\bboldmål\b/,
      /\bnet\s+til\b/,
      /\bchin\s*up\b/,
      /\bpulldown\b/,
      /\bovertraek\b/,
      /\bovertræk\b/,
      /\bcover\b/,
    ],
  },
  {
    slug: "motionscykel",
    include: [
      /\bmotionscykel\b/,
      /\bkondicykel\b/,
      /\bsiddecykel\b/,
      /\brecumbent\b/,
      /\bspinning(?:cykel|bike)?\b/,
      /\bindoor\s*bike\b/,
      /\bexercise\s*bike\b/,
      /\bair\s*bike\b/,
      /\bairbike\b/,
      /\bassault(?:\s*)?bike\b/,
      /\bspinbike\b/,
    ],
    exclude: [
      /\bbiker\s*shorts?\b/,
      /\bcykelshorts?\b/,
      /\bshorts\b/,
      /\bgymball\b/,
      /\bbold\b/,
      /\beasy\s*rider\b/,
    ],
  },
  {
    slug: "crosstrainer",
    include: [/\bcrosstrainer\b/, /\belliptisk\b/, /\belliptical\b/],
    exclude: [
      /\bhaandbold\b/,
      /\bhåndbold\b/,
      /\blegeplads\b/,
      /\bmaal\b/,
      /\bmål\b/,
      /\bnet\s+til\b/,
    ],
  },
  {
    slug: "styrkemaskiner",
    include: [
      /\bmultigym\b/,
      /\bmultistation\b/,
      /\bhomegym\b/,
      /\bhome\s*gym\b/,
      /\bsmith(?:\s*maskine|\s*machine|\s*rack)?\b/,
      /\bpower\s*rack\b/,
      /\bsquat\s*rack\b/,
      /\bsquatrack\b/,
      /\bcable\s*(?:cross|machine|station|tower)?\b/,
      /\bkabeltaarn\b/,
      /\bkabeltårn\b/,
      /\bkabelstation\b/,
      /\btraekstation\b/,
      /\btrækstation\b/,
      /\btraeningsbaenk\b/,
      /\btræningsbænk\b/,
      /\bfitness\s*baenk\b/,
      /\bfitness\s*bænk\b/,
      /\bjusterbar(?:e)?\s*baenk\b/,
      /\bjusterbaenk\b/,
      /\bmultibaenk\b/,
      /\bbenpres\b/,
      /\bhack\s*squat\b/,
      /\bpower\s*station\b/,
      /\bpull[\s-]*up\s*bar\b/,
      /\bchin[\s-]*up\s*bar\b/,
      /\bpullup\s*bar\b/,
    ],
    exclude: [
      /\bkabel\b(?!\s*(?:cross|machine|station|taarn|tårn))/,
      /\bparacord\b/,
      /\busb\b/,
      /\bshorts\b/,
      /\btaske\b/,
      /\bsko\b/,
    ],
  },
];

/**
 * True accessory signals — when present, skip machine rules even if the
 * title mentions “walking pad” / “motionscykel” (common on floor mats).
 */
const ACCESSORY_PRIORITY: RegExp[] = [
  /maatte/,
  /matte/,
  /floor\s*guard/,
  /underlag/,
  /gulvbeskytt/,
  /puslespil/,
  /\bpuzzle\b/,
  /gummigulv/,
  /fitnessgulv/,
  /elastik/,
  /resistance\s*band/,
  /booty\s*band/,
  /power\s*band/,
  /\btrx\b/,
  /slyngetraener/,
  /slyngetræner/,
  /suspension\s*trainer/,
  /\bhaandvaegt/,
  /\bhåndvægt/,
  /\bdumbbell/,
  /\bkettlebell/,
  /overtraek\s*(?:til|til\s+roma|til\s+loebe|til\s+cykel)/,
  /overtræk\s*(?:til|til\s+roma|til\s+løbe|til\s+cykel)/,
];

/** Must-haves / accessories — only if no machine rule matched (or accessory-priority). */
const TILBEHOER_RULE: CategoryRule = {
  slug: "tilbehoer",
  include: [
    /\bhaandvaegt/,
    /\bhåndvægt/,
    /\bdumbbell/,
    /\bkettlebell/,
    /\bjusterbar(?:e)?\s*(?:haand|hånd)?vaegt/,
    /\bjusterbar(?:e)?\s*(?:haand|hånd)?vægt/,
    /maatte/,
    /matte/,
    /yogamaatte/,
    /yogamåtte/,
    /floor\s*guard/,
    /underlag/,
    /gulvbeskytt/,
    /puslespil/,
    /\bpuzzle\b/,
    /gummigulv/,
    /fitnessgulv/,
    /elastik/,
    /resistance\s*band/,
    /booty\s*band/,
    /power\s*band/,
    /\btrx\b/,
    /slyngetraener/,
    /slyngetræner/,
    /suspension\s*trainer/,
    /overtraek\s*(?:til|roma|loebe|cykel|maskine)/,
    /overtræk\s*(?:til|roma|løbe|cykel|maskine)/,
    /(?:roma|loebe|cykel|maskine|rower|treadmill).{0,24}(?:overtraek|overtræk|cover)/,
    /(?:overtraek|overtræk|cover).{0,24}(?:roma|loebe|cykel|maskine|rower|treadmill)/,
  ],
  exclude: [
    /\bsilikone/,
    /\bolie\b/,
    /\breservedel/,
    /\bgaranti/,
    /\bwarranty/,
    /\bvest\b/,
    /\bshorts?\b/,
    /\btaske\b/,
    /\bsko\b/,
    /\bsadel\b/,
    /\bbind\b/,
  ],
};

const INTENT_RULES: { slug: string; test: (hay: string, price: number | null) => boolean }[] =
  [
    {
      slug: "foldbar",
      test: (hay) =>
        /\bfoldbar\b/.test(hay) ||
        /\bsammenklapp/.test(hay) ||
        /\bfoldable\b/.test(hay) ||
        /\bcollapsible\b/.test(hay),
    },
    {
      slug: "gaabaand",
      test: (hay) =>
        /\bgaabaand\b/.test(hay) ||
        /\bgåbånd\b/.test(hay) ||
        /\bwalking\s*pad\b/.test(hay) ||
        /\bwalkingpad\b/.test(hay) ||
        /\bunderdesk\b/.test(hay),
    },
    {
      slug: "stoejsvag",
      test: (hay) =>
        /\bstoejsvag\b/.test(hay) ||
        /\bstøjsvag\b/.test(hay) ||
        /\bstille\b/.test(hay) ||
        /\bquiet\b/.test(hay) ||
        /\bmagnet(?:modstand)?\b/.test(hay),
    },
    {
      slug: "plads",
      test: (hay) =>
        /\bkompakt\b/.test(hay) ||
        /\bpladsbespar/.test(hay) ||
        /\bsmall\s*footprint\b/.test(hay) ||
        /\bcompact\b/.test(hay) ||
        /\bvaegmonter/.test(hay) ||
        /\bvægmonter/.test(hay) ||
        /\bwall[\s-]*mount/.test(hay),
    },
    {
      slug: "siddecykel",
      test: (hay) =>
        /\bsiddecykel\b/.test(hay) ||
        /\brecumbent\b/.test(hay) ||
        (/\bryglaen\b/.test(hay) &&
          /\b(motionscykel|kondicykel|cykel|bike)\b/.test(hay)),
    },
    {
      slug: "spinning",
      test: (hay) =>
        /\bspinning\b/.test(hay) ||
        /\bspinbike\b/.test(hay) ||
        /\bindoor\s*bike\b/.test(hay),
    },
    {
      slug: "smart",
      test: (hay) => {
        // Undgå pulsbælter og andet tilbehør, der kun nævner Bluetooth
        if (
          /\bpulsm[aå]ler/.test(hay) ||
          /\bheart\s*rate\s*(?:belt|monitor|strap)\b/.test(hay) ||
          (/\bbælte\b/.test(hay) && !/\b(cykel|bike|spinning)/.test(hay))
        ) {
          return false;
        }
        return (
          /\bzwift\b/.test(hay) ||
          /\bkinomap\b/.test(hay) ||
          /\bsmart\s*bike\b/.test(hay) ||
          /\bftms\b/.test(hay) ||
          /\bexercycle\b/.test(hay) ||
          /\bant\+/.test(hay) ||
          /\binteraktiv\b/.test(hay) ||
          (/\bbluetooth\b/.test(hay) &&
            /\b(motionscykel|kondicykel|spinning|indoor\s*bike|exercise\s*bike|smart\s*bike)\b/.test(
              hay,
            ))
        );
      },
    },
    {
      slug: "airbike",
      test: (hay) =>
        /\bairbike\b/.test(hay) ||
        /\bair\s*bike\b/.test(hay) ||
        /\bassault(?:\s*)?bike\b/.test(hay),
    },
    {
      slug: "multistation",
      test: (hay) => {
        // Undgå tilbehør og rene bænke, der blot nævner "home gym"
        if (
          /\bhaandvaegt\b/.test(hay) ||
          /\bhåndvægt\b/.test(hay) ||
          /\bdumbbell\b/.test(hay) ||
          /\bvaegtskive\b/.test(hay) ||
          /\bvægtskive\b/.test(hay) ||
          /\bvaegtsaet\b/.test(hay) ||
          /\bvægtsæt\b/.test(hay) ||
          /\bdisc\b/.test(hay) ||
          /\bbumper\b/.test(hay) ||
          /\bchin\s*up\b/.test(hay) ||
          /\bpull\s*up\s*bar\b/.test(hay) ||
          /\bloebebaand\b/.test(hay) ||
          /\bgaabaand\b/.test(hay) ||
          /\bkabeltaarn\b/.test(hay) ||
          /\bkabeltårn\b/.test(hay) ||
          ((/\btraeningsbaenk\b/.test(hay) ||
            /\bweight\s*bench\b/.test(hay) ||
            /\bjusterbaenk\b/.test(hay)) &&
            !/\bmultistation\b/.test(hay) &&
            !/\bmultigym\b/.test(hay) &&
            !/\bsmith\b/.test(hay) &&
            !/\bhomegym\b/.test(hay) &&
            !/\bhome\s*gym\b/.test(hay))
        ) {
          return false;
        }
        return (
          /\bmultistation\b/.test(hay) ||
          /\bmultigym\b/.test(hay) ||
          /\bhomegym\b/.test(hay) ||
          /\bhome\s*gym\b/.test(hay) ||
          /\bsmith(?:\s*maskine|\s*machine|\s*rack)\b/.test(hay) ||
          /\bvaegtstak\b/.test(hay) ||
          /\bvægtstak\b/.test(hay) ||
          /\bcable\s*(?:cross|machine|station)\b/.test(hay) ||
          /\bpower\s*station\b/.test(hay)
        );
      },
    },
    {
      slug: "traeningsbaenk",
      test: (hay) => {
        // Tilbehør der nævner bænk i titlen (benlås, curlpult, trækstation til bænk)
        if (
          /\bbenlaas\b/.test(hay) ||
          /\bbenlås\b/.test(hay) ||
          /\bcurlpult\b/.test(hay) ||
          /\bvaegophaeng\b/.test(hay) ||
          /\bvægophæng\b/.test(hay) ||
          /\btil\s+(?:home|semi\s*pro|multibaenk)/.test(hay) ||
          /\btraekstation\b/.test(hay) ||
          /\btrækstation\b/.test(hay) ||
          /\bbentraener\b/.test(hay) ||
          /\bbentræner\b/.test(hay)
        ) {
          return false;
        }
        return (
          /\btraeningsbaenk\b/.test(hay) ||
          /\btræningsbænk\b/.test(hay) ||
          /\bfitness\s*baenk\b/.test(hay) ||
          /\bfitness\s*bænk\b/.test(hay) ||
          /\bjusterbar(?:e)?\s*baenk\b/.test(hay) ||
          /\bjusterbaenk\b/.test(hay) ||
          /\bmultibaenk\b/.test(hay) ||
          /\bweight\s*bench\b/.test(hay) ||
          /\bworkout\s*bench\b/.test(hay) ||
          /\bmavebaenk\b/.test(hay) ||
          /\bmavebænk\b/.test(hay)
        );
      },
    },
    {
      slug: "kabeltaarn",
      test: (hay) => {
        if (
          /\bmultistation\b/.test(hay) ||
          /\bmultigym\b/.test(hay) ||
          /\bsmith\b/.test(hay) ||
          (/\bhome\s*gym\b/.test(hay) &&
            !/\bvaegmonter|vægmonter|wall[\s-]*mount|\btil\s+vaeg|\btil\s+væg/.test(
              hay,
            ))
        ) {
          return false;
        }
        const wallish =
          /\bvaegmonter/.test(hay) ||
          /\bvægmonter/.test(hay) ||
          /\bwall[\s-]*mount/.test(hay) ||
          /\btil\s+vaeg\b/.test(hay) ||
          /\btil\s+væg\b/.test(hay);
        const cableish =
          /\bcable\b/.test(hay) ||
          /\bkabel\b/.test(hay) ||
          /\btraekstation\b/.test(hay) ||
          /\btrækstation\b/.test(hay) ||
          /\bpulley\b/.test(hay) ||
          /\bfunctional\s*trainer\b/.test(hay);
        return (
          /\bkabeltaarn\b/.test(hay) ||
          /\bkabeltårn\b/.test(hay) ||
          /\bkabeltraektaarn\b/.test(hay) ||
          /\bkabeltræktårn\b/.test(hay) ||
          /\bcable\s*tower\b/.test(hay) ||
          (wallish && cableish)
        );
      },
    },
    {
      slug: "haandvaegte",
      test: (hay) =>
        /\bhaandvaegt/.test(hay) ||
        /\bhåndvægt/.test(hay) ||
        /\bdumbbell/.test(hay) ||
        /\bkettlebell/.test(hay),
    },
    {
      slug: "gulvmaatter",
      test: (hay) =>
        /maatte/.test(hay) ||
        /matte/.test(hay) ||
        /floor\s*guard/.test(hay) ||
        /underlag/.test(hay) ||
        /gulvbeskytt/.test(hay) ||
        /puslespil/.test(hay) ||
        /\bpuzzle\b/.test(hay) ||
        /gummigulv/.test(hay) ||
        /fitnessgulv/.test(hay),
    },
    {
      slug: "elastikker",
      test: (hay) =>
        /elastik/.test(hay) ||
        /resistance\s*band/.test(hay) ||
        /booty\s*band/.test(hay) ||
        /power\s*band/.test(hay),
    },
    {
      slug: "slyngetraener",
      test: (hay) =>
        /\btrx\b/.test(hay) ||
        /slyngetraener/.test(hay) ||
        /slyngetræner/.test(hay) ||
        /suspension\s*trainer/.test(hay),
    },
    {
      slug: "begynder",
      test: (hay) =>
        /\bbegynder\b/.test(hay) ||
        /\bbeginner\b/.test(hay) ||
        /\bentry\s*level\b/.test(hay),
    },
    {
      slug: "billig",
      test: (hay, price) => {
        if (/\bbillig\b/.test(hay) || /\bbudget\b/.test(hay) || /\bvalue\b/.test(hay)) {
          return true;
        }
        // Soft price cue — refined with median in catalog
        return price != null && price > 0 && price < 3000;
      },
    },
  ];

function haystack(p: FeedProduct): string {
  return normalize(`${p.title} ${p.category} ${p.brand}`);
}

function isHardExcluded(combined: string): boolean {
  return HARD_EXCLUDES.some((re) => re.test(combined));
}

function matchRule(
  rule: CategoryRule,
  combined: string,
): boolean {
  const excluded = rule.exclude?.some((re) => re.test(combined));
  if (excluded) return false;
  return rule.include.some((re) => re.test(combined));
}

export function classifyProduct(
  product: FeedProduct,
): FeedProduct | null {
  const hay = haystack(product);
  // Also keep a lightly normalized raw for æ/ø/å patterns in regexes that use Danish chars
  const hayRaw = `${product.title} ${product.category} ${product.brand}`.toLowerCase();
  const combined = `${hay} ${hayRaw}`;

  if (isHardExcluded(combined)) return null;

  const accessoryPriority = ACCESSORY_PRIORITY.some((re) => re.test(combined));

  let matched: MachineCategorySlug | undefined;
  if (!accessoryPriority) {
    for (const rule of MACHINE_RULES) {
      if (matchRule(rule, combined)) {
        matched = rule.slug;
        break;
      }
    }
  }

  if (!matched && matchRule(TILBEHOER_RULE, combined)) {
    matched = "tilbehoer";
  }

  if (!matched) return null;

  const intentSlugs = INTENT_RULES.filter((r) =>
    r.test(combined, product.price),
  ).map((r) => r.slug);

  // gaabaand only meaningful for løbebånd
  let filteredIntents =
    matched === "loebebaand"
      ? intentSlugs
      : intentSlugs.filter((s) => s !== "gaabaand");

  // Accessory intents only on tilbehoer
  if (matched !== "tilbehoer") {
    filteredIntents = filteredIntents.filter(
      (s) =>
        s !== "haandvaegte" &&
        s !== "gulvmaatter" &&
        s !== "elastikker" &&
        s !== "slyngetraener",
    );
  }

  // kabeltaarn only on styrkemaskiner
  if (matched !== "styrkemaskiner") {
    filteredIntents = filteredIntents.filter((s) => s !== "kabeltaarn");
  }

  return {
    ...product,
    categorySlug: matched,
    intentSlugs: filteredIntents,
  };
}

export function classifyProducts(products: FeedProduct[]): FeedProduct[] {
  const out: FeedProduct[] = [];
  for (const p of products) {
    const c = classifyProduct(p);
    if (c) out.push(c);
  }
  return out;
}

/**
 * Efter median-pris pr. kategori: markér billig hvis under median
 * (eller allerede tagged via titel).
 */
export function refineBilligIntent(products: FeedProduct[]): FeedProduct[] {
  const byCat = new Map<string, number[]>();
  for (const p of products) {
    if (!p.categorySlug || p.price == null || p.price <= 0) continue;
    const list = byCat.get(p.categorySlug) ?? [];
    list.push(p.price);
    byCat.set(p.categorySlug, list);
  }

  const medians = new Map<string, number>();
  for (const [slug, prices] of byCat) {
    const sorted = [...prices].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
    medians.set(slug, median);
  }

  return products.map((p) => {
    if (!p.categorySlug || p.price == null) return p;
    const median = medians.get(p.categorySlug);
    if (median == null) return p;
    const intents = new Set(p.intentSlugs ?? []);
    if (p.price < median) intents.add("billig");
    else if (p.price >= median * 1.05) intents.delete("billig");
    return { ...p, intentSlugs: [...intents] };
  });
}
