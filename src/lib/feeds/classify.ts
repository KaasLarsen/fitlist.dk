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
 * Accessories / non-machines — substring matches so Danish compounds
 * (silikoneolie, beskyttelsesmaatte, tilbehoerspakke) are caught.
 * Applied before category rules.
 */
const ACCESSORY_EXCLUDES: RegExp[] = [
  /silikone/,
  /olie/,
  /maatte/,
  /\bmatte?\b/,
  /floor\s*guard/,
  /underlag/,
  /tilbehoer/,
  /reservedel/,
  /garanti/,
  /warranty/,
  /pedaltraener/,
  /bevaegelses?traener/,
  /mini\s*motionscykel/,
];

/** Word-boundary helpers — Danish compound words often lack spaces. */
const CATEGORY_RULES: CategoryRule[] = [
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
    ],
  },
  {
    slug: "motionscykel",
    include: [
      /\bmotionscykel\b/,
      /\bkondicykel\b/,
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
      /\bcable\s*(?:cross|machine|station)?\b/,
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
    ],
    exclude: [
      /\bkabel\b(?!\s*(?:cross|machine|station))/,
      /\bparacord\b/,
      /\busb\b/,
      /\bshorts\b/,
      /\btaske\b/,
      /\bsko\b/,
    ],
  },
];

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
        /\bcompact\b/.test(hay),
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

function isAccessory(combined: string): boolean {
  return ACCESSORY_EXCLUDES.some((re) => re.test(combined));
}

export function classifyProduct(
  product: FeedProduct,
): FeedProduct | null {
  const hay = haystack(product);
  // Also keep a lightly normalized raw for æ/ø/å patterns in regexes that use Danish chars
  const hayRaw = `${product.title} ${product.category} ${product.brand}`.toLowerCase();
  const combined = `${hay} ${hayRaw}`;

  if (isAccessory(combined)) return null;

  let matched: MachineCategorySlug | undefined;
  for (const rule of CATEGORY_RULES) {
    const excluded = rule.exclude?.some((re) => re.test(combined));
    if (excluded) continue;
    if (rule.include.some((re) => re.test(combined))) {
      matched = rule.slug;
      break;
    }
  }

  if (!matched) return null;

  const intentSlugs = INTENT_RULES.filter((r) =>
    r.test(combined, product.price),
  ).map((r) => r.slug);

  // gaabaand only meaningful for løbebånd
  const filteredIntents =
    matched === "loebebaand"
      ? intentSlugs
      : intentSlugs.filter((s) => s !== "gaabaand");

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
