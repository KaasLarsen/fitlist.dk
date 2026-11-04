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
      /\bworkwalk\b/,
    ],
    exclude: [
      /\bolie\b/,
      /\bsilikone\b/,
      /\bmatte?\b/,
      /\breservedel\b/,
      /\btilbehoer\b/,
      /\btilbehør\b/,
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
      /\bpedaltraener\b/,
      /\bpedaltræner\b/,
    ],
  },
  {
    slug: "styrkemaskiner",
    include: [
      /\bmultigym\b/,
      /\bhomegym\b/,
      /\bhome\s*gym\b/,
      /\bsmith(?:\s*maskine|\s*machine)?\b/,
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
        /\bunderdesk\b/.test(hay) ||
        /\bworkwalk\b/.test(hay),
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

export function classifyProduct(
  product: FeedProduct,
): FeedProduct | null {
  const hay = haystack(product);
  // Also keep a lightly normalized raw for æ/ø/å patterns in regexes that use Danish chars
  const hayRaw = `${product.title} ${product.category} ${product.brand}`.toLowerCase();
  const combined = `${hay} ${hayRaw}`;

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
