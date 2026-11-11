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
  /silicone/,
  /olie/,
  /\boil\b/,
  /lubricant/,
  /loebebaelte/,
  /løbebælte/,
  /treadmill\s*belt/,
  /running\s*belt/,
  /\bvoks\b/,
  /\bwax\b/,
  /tablet\s*holder/,
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
  // Cykel-tøj og reservedel der ellers matcher via feed-kategori / "spinning"
  /t[\s-]*shirt/,
  /\bjersey\b/,
  /\btroeje\b/,
  /\btrøje\b/,
  /bremseklods/,
  /stroemforsyning/,
  /strømforsyning/,
  /stroemadapter/,
  /strømadapter/,
  /power\s*supply/,
  /racerstyr/,
  /justerings?\s*haandtag/,
  /justerings?\s*håndtag/,
  /pulsm[aå]ler/,
  /pulsbaelte/,
  /pulsbælte/,
  /heart\s*rate\s*(?:belt|monitor|strap)/,
  /flaskeholder/,
  /bottle\s*(?:holder|cage)/,
  /klikpedaler/,
  // Romaskine-kemi og kits der matcher via feed-kategori / "rower"
  /puritabs/,
  /klortabletter/,
  /tabletter/,
  /chlorine/,
  /vandrens/,
  /water\s*purif/,
  /elevate\s*kit/,
  // Crosstrainer / generelt elektronik-tilbehør
  /brystsender/,
  /chest\s*(?:strap|transmitter|sender)/,
  // Styrke-støj: sjippetov, briller, greb, sadler, dekoration
  /sjippetov/,
  /jump\s*rope/,
  /speed\s*rope/,
  /svoemmebriller/,
  /svømmebriller/,
  /goggles/,
  /grip\s*tape/,
  /\bsadel\b/,
  /cable\s*d[\s-]*handle/,
  /cable\s*handle/,
  /\bd[\s-]*handle\b/,
  /fodstrop/,
  /benlaas/,
  /benlås/,
  /forhoejer/,
  /forhøjer/,
  /rope\s*anchor/,
  /squat\s*wedge/,
  /vaegophaeng/,
  /vægophæng/,
  /\bplakat\b/,
  /\bposter\b/,
  /vaegtskive/,
  /vægtskive/,
  /olympic\s*disc/,
  // Dørribber / pull-up bars klassificeres som tilbehoer (pullup) —
  // behold kun greb/handles og kabeltræk som støj
  /dip\s*(?:haandtag|håndtag)/,
  /chin\s*up\s*greb/,
  /kabeltraek/,
  /kabeltræk/,
  // Badeværelse og sauna matcher ellers "måtte" / "underlag"
  /bademaatte/,
  /bademåtte/,
  /badevaerelse/,
  /badeværelse/,
  /sauna/,
  // "Ellipse"-produktlinjer (camping/sko) matcher ellers crosstrainer via ellipse
  /camping/,
  /foldeskaal/,
  /foldeskål/,
  /foldetallerken/,
  /campingservice/,
  /koekkenredskab/,
  /køkkenredskab/,
  /loebe\s*sko/,
  /løbesko/,
  /running\s*shoe/,
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
      /\bvandromaskine\b/,
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
      /\btabletter\b/,
      /\bpuritabs\b/,
      /\bklortabletter\b/,
      /\belevate\s*kit\b/,
    ],
  },
  {
    slug: "motionscykel",
    include: [
      /\bmotionscykel\b/,
      /\bkondicykel\b/,
      /\bsiddecykel\b/,
      /\brecumbent\b/,
      // Kræv cykel/bike — bare "spinning" matcher tøj og trøjer
      /\bspinning[\s-]*(?:cykel|bike)\b/,
      /\bspinningcykel\b/,
      /\bindoor\s*bike\b/,
      /\bexercise\s*bike\b/,
      /\bair\s*bike\b/,
      /\bairbike\b/,
      /\bassault(?:\s*)?bike\b/,
      /\bspinbike\b/,
      /\bspin\s*bike\b/,
      /\boffice\s*bike\b/,
      /\bhometrainer\b/,
      /\bhome\s*trainer\b/,
      /\bsmart\s*trainer\b/,
      /\bdirect\s*drive\b/,
      /\bwheel[\s-]*on\b/,
      /\bcykelrulle\b/,
      /\btræningsrulle\b/,
      /\btrainingsrulle\b/,
      /\bkickr\b/,
      /\btacx\b/,
    ],
    exclude: [
      /\bbiker\s*shorts?\b/,
      /\bcykelshorts?\b/,
      /\bshorts\b/,
      /\bgymball\b/,
      /\bbold\b/,
      /\beasy\s*rider\b/,
      /\bt[\s-]*shirt\b/,
      /\bjersey\b/,
      /\btroeje\b/,
      /\btrøje\b/,
      /\btil\s+(?:indoor\s*bike|motionscykel|spinning)/,
      /\bstrømforsyning\b/,
      /\bstroemforsyning\b/,
      /\bracerstyr\b/,
      /\bhaandtag\b/,
      /\bhåndtag\b/,
      /\bmini\s*(?:bike|motionscykel)\b/,
      /pedaltraener/,
      /pedal\s*trainer/,
    ],
  },
  {
    slug: "crosstrainer",
    include: [
      /\bcrosstrainer\b/,
      /\belliptisk\b/,
      /\belliptical\b/,
      /\bellipsetraener\b/,
      /\bellipsetræner\b/,
      // Kræv maskine-kontekst — bare "ellipse" matcher campinggrej og sko
      /\bellipse[\s-]?(?:traener|træner|trainer|maskine)\b/,
      /\bellipse\b(?=.*\b(?:crosstrainer|elliptisk|elliptical|traener|træner|trainer|maskine)\b)/,
    ],
    exclude: [
      /\bhaandbold\b/,
      /\bhåndbold\b/,
      /\blegeplads\b/,
      /\bmaal\b/,
      /\bmål\b/,
      /\bnet\s+til\b/,
      /\bstroemforsyning\b/,
      /\bstrømforsyning\b/,
      /\bbrystsender\b/,
      /\bsko\b/,
      /\bcamping\b/,
    ],
  },
  {
    slug: "styrkemaskiner",
    include: [
      /\bmultigym\b/,
      /\bmultistation\b/,
      /\bhomegym\b/,
      /\bhome\s*gym\b/,
      /\bsmith(?:\s*maskine|\s*machine|\s*rack)\b/,
      /\bpower\s*rack\b/,
      /\bsquat\s*rack\b/,
      /\bsquatrack\b/,
      // Kræv machine-type — bare "cable" matcher sjippetov / handles
      /\bcable\s*(?:cross|machine|station|tower)\b/,
      /\bcablecross\b/,
      /\bkabeltaarn\b/,
      /\bkabeltårn\b/,
      /\bkabelstation\b/,
      /\bkabelcross\b/,
      /\btraekstation\b/,
      /\btrækstation\b/,
      /\btraeningsbaenk\b/,
      /\btræningsbænk\b/,
      /\bfitness\s*baenk\b/,
      /\bfitness\s*bænk\b/,
      /\bjusterbar(?:e)?\s*baenk\b/,
      /\bjusterbaenk\b/,
      /\bmultibaenk\b/,
      /\bflad\s*traeningsbaenk\b/,
      /\bflad\s*træningsbænk\b/,
      /\bbenpres\b/,
      /\bhack\s*squat\b/,
      /\bpower\s*station\b/,
      /\bpower\s*tower\b/,
      /\bsquat\s*stand\b/,
      /\bpull[\s-]*up\s*(?:og|&|\/)\s*dip/,
      /\bchin[\s-]*up\s*(?:og|&|\/)\s*dip/,
      /\bpullup[\s-]*(?:og|&|\/)\s*dip/,
      /\bdip\s*station\b/,
      /\bdipstation\b/,
      /\bdipstativ\b/,
      /\bdip\s*stativ\b/,
      /\bdip\s*bars?\b/,
      /\bparallettes?\b/,
      /\bparallette[rs]?\b/,
      /\bequalizer\b/,
      /\bkraftstation\b/,
      /\bfunctional\s*trainer\b/,
      /\bhyperextension\b/,
      /\broman\s*chair\b/,
      /\bromanchair\b/,
      /\bback\s*extension\b/,
      /\brygtraener\b/,
      /\brygtræner\b/,
      /\bskraabaenk\b/,
      /\bskråbænk\b/,
      /\bmavebaenk\b/,
      /\bmavebænk\b/,
    ],
    exclude: [
      /\bkabel\b(?!\s*(?:cross|machine|station|taarn|tårn))/,
      /\bcable\b(?!\s*(?:cross|machine|station|tower))/,
      /\bparacord\b/,
      /\busb\b/,
      /\bshorts\b/,
      /\btaske\b/,
      /\bsko\b/,
      /\bsjippetov\b/,
      /\bsadel\b/,
      /\bplakat\b/,
      /\bvaegtskive\b/,
      /\bvægtskive\b/,
      /\bhandle\b/,
      /\bhaandtag\b/,
      /\bhåndtag\b/,
      /\bbenlaas\b/,
      /\bbenlås\b/,
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
  /doerribbe/,
  /dørribbe/,
  /chin\s*up\s*bar/,
  /pull[\s-]*up\s*bar/,
  /pullup\s*bar/,
  /ab[\s-]*wheel/,
  /abwheel/,
  /abs?\s*roller/,
  /vaegtvest/,
  /vægtvest/,
  /weighted\s*vest/,
  /stepbaenk/,
  /stepbænk/,
  /stepbraet/,
  /stepbræt/,
  /aerobic\s*step/,
  /plyo(?:metrisk)?\s*boks/,
  /plyobox/,
  /plyo[\s-]*box/,
  /jump\s*box/,
  /springboks/,
  /overtraek\s*(?:til|til\s+roma|til\s+loebe|til\s+cykel)/,
  /overtræk\s*(?:til|til\s+roma|til\s+løbe|til\s+cykel)/,
  /cover\s*til/,
  /(?:overtraek|overtræk|cover).{0,24}(?:roma|loebe|løbe|cykel|maskine|rower|treadmill|crosstrainer)/,
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
    /doerribbe/,
    /dørribbe/,
    /chin\s*up\s*bar/,
    /pull[\s-]*up\s*bar/,
    /pullup\s*bar/,
    /ab[\s-]*wheel/,
    /abwheel/,
    /abs?\s*roller/,
    /mavehjul/,
    /(?:mave|abs?)\s*(?:hjul|wheel|roller)/,
    /vaegtvest/,
    /vægtvest/,
    /weighted\s*vest/,
    /stepbaenk/,
    /stepbænk/,
    /stepbraet/,
    /stepbræt/,
    /aerobic\s*step/,
    /plyo(?:metrisk)?\s*boks/,
    /plyobox/,
    /plyo[\s-]*box/,
    /jump\s*box/,
    /springboks/,
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
    /cover\s*til/,
    /(?:roma|loebe|løbe|cykel|maskine|rower|treadmill|crosstrainer).{0,24}(?:overtraek|overtræk|cover)/,
    /(?:overtraek|overtræk|cover).{0,24}(?:roma|loebe|løbe|cykel|maskine|rower|treadmill|crosstrainer)/,
  ],
  exclude: [
    /\bsilikone/,
    /\bolie\b/,
    /\breservedel/,
    /\bgaranti/,
    /\bwarranty/,
    // Tøj-/sikkerhedsveste — ikke vægtveste
    /refleksvest/,
    /loebevest/,
    /løbevest/,
    /safety\s*vest/,
    /hi[\s-]*viz/,
    /\bshorts?\b/,
    /\btaske\b/,
    /\bsko\b/,
    /\bsadel\b/,
    /\bbind\b/,
    // Presse-/træningsbænk uden step/plyo
    /\b(?:justerbar(?:e)?|flad|incline)\s*(?:traenings|trænings)?baenk\b/,
    /\b(?:justerbar(?:e)?|flad|incline)\s*(?:traenings|trænings)?bænk\b/,
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
      slug: "stigning",
      test: (hay) =>
        /\bstigning\b/.test(hay) ||
        /\bincline\b/.test(hay) ||
        /\bhaeldning\b/.test(hay),
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
        /\bwall[\s-]*mount/.test(hay) ||
        // Walking pads / gåbånd er typisk det pladsbesparende valg på løbebånd
        /\bunderdesk\b/.test(hay) ||
        /\bunder[\s-]*desk\b/.test(hay) ||
        /\bwalking\s*pad\b/.test(hay) ||
        /\bwalkingpad\b/.test(hay) ||
        /\bgaabaand\b/.test(hay) ||
        /\bgåbånd\b/.test(hay),
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
          /\bmavebænk\b/.test(hay) ||
          /\bhyperextension\b/.test(hay) ||
          /\broman\s*chair\b/.test(hay) ||
          /\bromanchair\b/.test(hay) ||
          /\bback\s*extension\b/.test(hay) ||
          /\brygtraener\b/.test(hay) ||
          /\brygtræner\b/.test(hay) ||
          /\bskraabaenk\b/.test(hay) ||
          /\bskråbænk\b/.test(hay)
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
        /\bdumbbell/.test(hay),
    },
    {
      slug: "kettlebells",
      test: (hay) => {
        // 3-i-1 håndvægt+kettlebell-sæt hører under haandvaegte
        if (
          /\bhaandvaegt/.test(hay) ||
          /\bhåndvægt/.test(hay) ||
          /\bdumbbell/.test(hay)
        ) {
          return false;
        }
        return (
          /\bkettlebell/.test(hay) ||
          /\bkettle\s*bell/.test(hay) ||
          /\bybell\b/.test(hay)
        );
      },
    },
    {
      slug: "gulvmaatter",
      test: (hay) => {
        // Tykke puzzle-/gummigulve går til fitnessgulv
        if (
          /puslespil/.test(hay) ||
          /\bpuzzle\b/.test(hay) ||
          /gummigulv/.test(hay) ||
          /fitnessgulv/.test(hay) ||
          /floor\s*guards\b/.test(hay) ||
          /\b(?:15|20|25|30|40)\s*mm\b/.test(hay)
        ) {
          return false;
        }
        return (
          /maatte/.test(hay) ||
          /matte/.test(hay) ||
          /floor\s*guard/.test(hay) ||
          /underlag/.test(hay) ||
          /gulvbeskytt/.test(hay)
        );
      },
    },
    {
      slug: "fitnessgulv",
      test: (hay) =>
        /puslespil/.test(hay) ||
        /\bpuzzle\b/.test(hay) ||
        /gummigulv/.test(hay) ||
        /fitnessgulv/.test(hay) ||
        /floor\s*guards\b/.test(hay) ||
        (/\b(?:15|20|25|30|40)\s*mm\b/.test(hay) &&
          (/maatte/.test(hay) ||
            /matte/.test(hay) ||
            /gulv/.test(hay) ||
            /floor/.test(hay) ||
            /underlag/.test(hay) ||
            /guard/.test(hay))),
    },
    {
      slug: "vand",
      test: (hay) =>
        /\bvandromaskine\b/.test(hay) ||
        /\bwater\s*rower\b/.test(hay) ||
        /\bwaterrower\b/.test(hay) ||
        (/\bvand(?:modstand|tank)?\b/.test(hay) &&
          (/\bromaskine\b/.test(hay) || /\brower\b/.test(hay))),
    },
    {
      slug: "pullup",
      test: (hay) => {
        // Power tower / dip-stationer er styrkemaskiner — ikke tilbehør
        if (
          /\bpower\s*tower\b/.test(hay) ||
          /\bpower\s*rack\b/.test(hay) ||
          /\bsquat\s*(?:rack|stand)\b/.test(hay) ||
          /\bmultistation\b/.test(hay) ||
          /\bpull[\s-]*up\s*(?:og|&|\/)\s*dip/.test(hay) ||
          /\bchin[\s-]*up\s*(?:og|&|\/)\s*dip/.test(hay)
        ) {
          return false;
        }
        return (
          /doerribbe/.test(hay) ||
          /dørribbe/.test(hay) ||
          /chin\s*up/.test(hay) ||
          /pull[\s-]*up/.test(hay) ||
          /pullup/.test(hay)
        );
      },
    },
    {
      slug: "hometrainer",
      test: (hay) => {
        // Dedikerede smartbikes / spin bikes er ikke hometrainere
        if (
          /\bsmart\s*bike\b/.test(hay) ||
          /\bspinning\b/.test(hay) ||
          /\bspinbike\b/.test(hay) ||
          /\bindoor\s*bike\b/.test(hay) ||
          /\bkickr\s*bike\b/.test(hay) ||
          /\bneo\s*bike\b/.test(hay) ||
          /\bmotionscykel\b/.test(hay) ||
          /\bmini\s*(?:bike|motionscykel)\b/.test(hay) ||
          /pedaltraener/.test(hay) ||
          /pedal\s*trainer/.test(hay)
        ) {
          return false;
        }
        return (
          /\bhometrainer\b/.test(hay) ||
          /\bhome\s*trainer\b/.test(hay) ||
          /\bsmart\s*trainer\b/.test(hay) ||
          /\bdirect\s*drive\b/.test(hay) ||
          /\bwheel[\s-]*on\b/.test(hay) ||
          /\bcykelrulle\b/.test(hay) ||
          /\btrainingsrulle\b/.test(hay) ||
          /\btræningsrulle\b/.test(hay) ||
          (/\bkickr\b/.test(hay) && !/\bbike\b/.test(hay)) ||
          (/\btacx\b/.test(hay) && !/\bbike\b/.test(hay)) ||
          (/\btrainer\b/.test(hay) &&
            (/\bzwift\b/.test(hay) ||
              /\bwahoo\b/.test(hay) ||
              /\belite\b/.test(hay) ||
              /\bsaris\b/.test(hay)))
        );
      },
    },
    {
      slug: "abwheel",
      test: (hay) =>
        /ab[\s-]*wheel/.test(hay) ||
        /abwheel/.test(hay) ||
        /abs?\s*roller/.test(hay) ||
        /mavehjul/.test(hay) ||
        /(?:mave|abs?)\s*(?:hjul|wheel|roller)/.test(hay),
    },
    {
      slug: "vaegtvest",
      test: (hay) =>
        /vaegtvest/.test(hay) ||
        /vægtvest/.test(hay) ||
        /weighted\s*vest/.test(hay) ||
        (/\bvest\b/.test(hay) &&
          (/\bvaegt/.test(hay) ||
            /\bvægt/.test(hay) ||
            /\bweight/.test(hay) ||
            /\bjusterbar/.test(hay))),
    },
    {
      slug: "stepbaenk",
      test: (hay) => {
        // Undgå squat-/læggblokke og stair steppers
        if (
          /squat\s*(?:stand\s*)?block/.test(hay) ||
          /knaeboejning/.test(hay) ||
          /knæbøjning/.test(hay) ||
          /calf\s*block/.test(hay) ||
          /laeg\s*blok/.test(hay) ||
          /læg\s*blok/.test(hay) ||
          /stair\s*stepper/.test(hay) ||
          /trappemaskine/.test(hay)
        ) {
          return false;
        }
        return (
          /stepbaenk/.test(hay) ||
          /stepbænk/.test(hay) ||
          /stepbraet/.test(hay) ||
          /stepbræt/.test(hay) ||
          /aerobic\s*step/.test(hay) ||
          /plyo(?:metrisk)?\s*boks/.test(hay) ||
          /plyobox/.test(hay) ||
          /plyo[\s-]*box/.test(hay) ||
          /jump\s*box/.test(hay) ||
          /springboks/.test(hay) ||
          (/\bstep\b/.test(hay) &&
            (/\bbaenk/.test(hay) ||
              /\bbænk/.test(hay) ||
              /\baerobic/.test(hay)))
        );
      },
    },
    {
      slug: "dipstation",
      test: (hay) =>
        /\bdip\s*station\b/.test(hay) ||
        /\bdipstation\b/.test(hay) ||
        /\bdipstativ\b/.test(hay) ||
        /\bdip\s*stativ\b/.test(hay) ||
        /\bparallettes?\b/.test(hay) ||
        /\bparallette[rs]?\b/.test(hay) ||
        /\bequalizer\b/.test(hay) ||
        /\bpower\s*tower\b/.test(hay) ||
        /\bpull[\s-]*up\s*(?:og|&|\/)\s*dip/.test(hay) ||
        /\bchin[\s-]*up\s*(?:og|&|\/)\s*dip/.test(hay) ||
        /\bpullup[\s-]*(?:og|&|\/)\s*dip/.test(hay) ||
        (/\bdip\b/.test(hay) &&
          (/\bstation\b/.test(hay) ||
            /\bstativ\b/.test(hay) ||
            /\btower\b/.test(hay) ||
            /\bbars?\b/.test(hay))),
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
      test: (hay) => {
        if (/\bkettlebell/.test(hay)) return false;
        return (
          /\btrx\b/.test(hay) ||
          /slyngetraener/.test(hay) ||
          /slyngetræner/.test(hay) ||
          /suspension\s*trainer/.test(hay)
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

function isHardExcluded(combined: string): boolean {
  return HARD_EXCLUDES.some((re) => re.test(combined));
}

const DIK_MERCHANT = "Den Intelligente Krop";

/**
 * Den Intelligente Krop er mest yoga, pilates og massage.
 * Kun romaskiner, siddecykel, håndvægte, kettlebells, vægtveste og TRX-sæt.
 */
function denIntelligenteKropKeep(product: FeedProduct): boolean {
  const hay = normalize(`${product.title} ${product.category}`);
  const raw = `${product.title} ${product.category}`.toLowerCase();
  const text = `${hay} ${raw}`;

  if (/romaskine|\brower\b/.test(text) && !/maatte|måtte/.test(text)) return true;
  if (/siddecykel/.test(text)) return true;
  if (
    /\bmotionscykel\b/.test(text) &&
    !/maatte|måtte|elastik|reformer/.test(text)
  ) {
    return true;
  }

  if (/\btrx\b/.test(text)) {
    if (/elastik|maatte|måtte|\bmat\b|extender|anker|xmount|doer|dør/.test(text)) {
      return false;
    }
    return /suspension|\btrainer\b|\bkit\b/.test(text);
  }

  if (/vaegtvest|vægtvest|weighted\s*vest/.test(text)) return true;
  if (/\brack\b|\bstativ\b/.test(text)) return false;
  return /haandvaegt|håndvægt|dumbbell|kettlebell|\bybell\b/.test(text);
}

/** Shop-specifikt filter før den generelle klassificering. */
export function passesMerchantGate(product: FeedProduct): boolean {
  if (product.merchant !== DIK_MERCHANT) return true;
  return denIntelligenteKropKeep(product);
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
  if (!passesMerchantGate(product)) return null;

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
        s !== "kettlebells" &&
        s !== "gulvmaatter" &&
        s !== "fitnessgulv" &&
        s !== "elastikker" &&
        s !== "slyngetraener" &&
        s !== "pullup" &&
        s !== "abwheel" &&
        s !== "vaegtvest" &&
        s !== "stepbaenk",
    );
  }

  // vand only on romaskine
  if (matched !== "romaskine") {
    filteredIntents = filteredIntents.filter((s) => s !== "vand");
  }

  // hometrainer only on motionscykel
  if (matched !== "motionscykel") {
    filteredIntents = filteredIntents.filter((s) => s !== "hometrainer");
  }

  // kabeltaarn + dipstation only on styrkemaskiner
  if (matched !== "styrkemaskiner") {
    filteredIntents = filteredIntents.filter(
      (s) => s !== "kabeltaarn" && s !== "dipstation",
    );
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
