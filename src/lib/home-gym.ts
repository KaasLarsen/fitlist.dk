import { categoryIntentHref, getCategory } from "@/lib/categories";
import type { MachineCategorySlug } from "@/lib/feeds/types";

/**
 * Hjemme-gym bygger.
 * Produkt-id'er er de samme feedProductId'er som i guides.ts, så pris,
 * billede, lager og affiliate-URL kommer fra partnerkataloget.
 */

export const HOME_GYM_PATH = "/hjemme-gym";

export const SPACES = [
  {
    id: "under-5",
    label: "Under 5 m²",
    description: "Et hjørne, en alkove eller udstyr der kan pakkes væk.",
  },
  {
    id: "vaerelse",
    label: "Et værelse",
    description: "Et fast rum på cirka 8–15 m² til maskiner, der må stå fremme.",
  },
  {
    id: "garage",
    label: "Garage eller stort rum",
    description: "Loftshøjde og gulv til rack, stang eller flere maskiner.",
  },
] as const;

export const FOCUSES = [
  {
    id: "styrke",
    label: "Styrketræning / bodybuilding",
    description: "Bænk, vægte og kabel, når muskelopbygning er målet.",
  },
  {
    id: "kondition",
    label: "Kondition / vægttab",
    description: "Puls og forbrænding på bånd, cykel, romaskine eller crosstrainer.",
  },
  {
    id: "funktionel",
    label: "Funktionel træning",
    description: "Kettlebells, kropsvægt, slynge og bevægelse i hele kroppen.",
  },
] as const;

export const BUDGETS = [
  {
    id: "under-5k",
    label: "Under 5.000 kr.",
    description: "En startpakke, der kan bruges med det samme.",
    min: 0,
    max: 5000,
  },
  {
    id: "mid",
    label: "5.000–15.000 kr.",
    description: "Et komplet setup til fast træning.",
    min: 5000,
    max: 15000,
  },
  {
    id: "over-15k",
    label: "Over 15.000 kr.",
    description: "Seriøst udstyr, der holder i årevis.",
    min: 15000,
    max: null,
  },
] as const;

export type SpaceId = (typeof SPACES)[number]["id"];
export type FocusId = (typeof FOCUSES)[number]["id"];
export type BudgetId = (typeof BUDGETS)[number]["id"];

export type HomeGymOffer = {
  id: string;
  merchant: string;
  title: string;
  price: number | null;
  oldPrice: number | null;
  image: string;
  url: string;
  inStock: boolean;
};

export type GymSlot = {
  role: string;
  why: string;
  feedProductId: string;
  categorySlug: MachineCategorySlug;
  intentSlug?: string;
};

export type GymTier = {
  title: string;
  summary: string;
  slots: GymSlot[];
};

type GymRecipe = {
  space: SpaceId;
  focus: FocusId;
  tiers: Record<BudgetId, GymTier>;
};

const walkingPad = "Ascendic.dk:56388648173912";
const elastik = "Ascendic.dk:43590874824938";
const mat = "Apuls.dk:5086";
const floor = "Billig-fitness.dk:55147327881602";
const foldBench = "Apuls.dk:15420";
const flatBench = "FITNESSFREE.DK:150";
const valhallaBench = "Apuls.dk:15594";
const proBench = "Apuls.dk:12765";
const db20 = "Billig-fitness.dk:42422998696107";
const db24 = "HomeX.dk:2791";
const db40 = "FITNESSFREE.DK:11";
const wallCable = "Billig-fitness.dk:55196267118978";
const cableStation = "Billig-fitness.dk:42569767354539";
const functionalTrainer = "Fitnessgruppen.dk:1142";
const functionalTrainerPro = "Træningspartner:019dfd1ca2267385b339a754db53b775";
const cableCross = "Apuls.dk:12759";
const halfRack = "Apuls.dk:12792";
const homeSet = "Apuls.dk:11888";
const asgard = "Apuls.dk:15968";
const foldBike = "Ascendic.dk:39480045797550";
const bikeB35 = "HomeX.dk:2702";
const bikeB56 = "Apuls.dk:15653";
const treadT56 = "HomeX.dk:3179";
const treadT66 = "Apuls.dk:15650";
const treadFold = "Apuls.dk:15828";
const rowerR10 = "HomeX.dk:2801";
const rowerZjet = "HomeX.dk:2330";
const rowerWater = "Apuls.dk:15386";
const crosstrainer = "Apuls.dk:12748";
const kbVinyl = "Den Intelligente Krop:068-121410";
const kbIron = "Billig-fitness.dk:13935893638";
const kbComp = "Fitnessgruppen.dk:1087";
const kbAdj = "Den Intelligente Krop:068-121100";
const sling = "Billig-fitness.dk:30761765772";
const trx = "Den Intelligente Krop:074-150204";
const doorBar = "Apuls.dk:6882";
const wallBar = "Apuls.dk:16032";
const airA1000 = "Apuls.dk:12006";
const assault = "Fitnessgruppen.dk:144";
const plyoM = "Fitnessgruppen.dk:990";
const plyoL = "Træningspartner:018a929b415571f9a8f022ae2390eea4";

function slot(
  role: string,
  why: string,
  feedProductId: string,
  categorySlug: MachineCategorySlug,
  intentSlug?: string,
): GymSlot {
  return { role, why, feedProductId, categorySlug, intentSlug };
}

const recipes: GymRecipe[] = [
  {
    space: "under-5",
    focus: "styrke",
    tiers: {
      "under-5k": {
        title: "Styrke i et hjørne",
        summary:
          "Foldbar bænk, et justerbart sæt håndvægte og en måtte. Det kan stå i et hjørne og pakkes væk, når rummet skal bruges til noget andet.",
        slots: [
          slot(
            "Bænk",
            "Kan klappes sammen, så hjørnet er frit efter træning.",
            foldBench,
            "styrkemaskiner",
            "traeningsbaenk",
          ),
          slot(
            "Håndvægte",
            "Ét sæt erstatter en reol af faste vægte.",
            db20,
            "tilbehoer",
            "haandvaegte",
          ),
          slot(
            "Gulv",
            "Beskytter gulvet under bænk og gulvarbejde.",
            mat,
            "tilbehoer",
            "gulvmaatter",
          ),
        ],
      },
      mid: {
        title: "Vægkabel og håndvægte",
        summary:
          "En trækstation giver ryg og arme uden et gulvtårn. Foldbar bænk og justerbare håndvægte dækker presset.",
        slots: [
          slot(
            "Kabel",
            "Sidder på væggen, så gulvet stadig er frit til bænken.",
            wallCable,
            "styrkemaskiner",
            "kabeltaarn",
          ),
          slot(
            "Håndvægte",
            "To justerbare håndvægte til press, rows og lunges.",
            db24,
            "tilbehoer",
            "haandvaegte",
          ),
          slot(
            "Bænk",
            "Foldes væk, når kablet er brugt.",
            foldBench,
            "styrkemaskiner",
            "traeningsbaenk",
          ),
        ],
      },
      "over-15k": {
        title: "Functional trainer og bænk",
        summary:
          "En functional trainer til kabelarbejde, justerbare håndvægte op til 40 kg og en stabil, justerbar bænk.",
        slots: [
          slot(
            "Kabel",
            "Functional trainer til lat, rows og face pulls.",
            functionalTrainer,
            "styrkemaskiner",
            "kabeltaarn",
          ),
          slot(
            "Håndvægte",
            "Justerbart sæt op til 40 kg, så vægten kan følge med.",
            db40,
            "tilbehoer",
            "haandvaegte",
          ),
          slot(
            "Bænk",
            "Justerbar bænk til incline, flad og skulderpres.",
            valhallaBench,
            "styrkemaskiner",
            "traeningsbaenk",
          ),
        ],
      },
    },
  },
  {
    space: "under-5",
    focus: "kondition",
    tiers: {
      "under-5k": {
        title: "Gang og elastik",
        summary:
          "Et walking pad til daglig puls, elastikker til styrke, og en måtte. Hele sættet kan ligge under en seng eller langs væggen.",
        slots: [
          slot(
            "Cardio",
            "Gangtempo der kan skubbes væk efter brug.",
            walkingPad,
            "loebebaand",
            "gaabaand",
          ),
          slot(
            "Styrke",
            "Elastikker med håndtag til de dage, pulsen skal kombineres med modstand.",
            elastik,
            "tilbehoer",
            "elastikker",
          ),
          slot(
            "Gulv",
            "Underlag til gulvarbejde ved siden af båndet.",
            mat,
            "tilbehoer",
            "gulvmaatter",
          ),
        ],
      },
      mid: {
        title: "Foldbar cykel og gåbånd",
        summary:
          "Siddende kondition på en cykel der foldes, plus et gåbånd til de lette dage. Håndvægte holder styrken ved lige uden et rack.",
        slots: [
          slot(
            "Cykel",
            "Foldes sammen, når passet er færdigt.",
            foldBike,
            "motionscykel",
          ),
          slot(
            "Gang",
            "Lavt gåbånd til hverdags-skridt i samme hjørne.",
            walkingPad,
            "loebebaand",
            "gaabaand",
          ),
          slot(
            "Håndvægte",
            "Let styrke ved siden af cardio, uden pladestabel.",
            db20,
            "tilbehoer",
            "haandvaegte",
          ),
        ],
      },
      "over-15k": {
        title: "Foldbart løbebånd",
        summary:
          "Et løbebånd der kan foldes fladt, en foldbar cykel til skånsomme dage, og justerbare håndvægte så vægttabet også har styrke med.",
        slots: [
          slot(
            "Løbebånd",
            "Foldes fladt og kan rulles væk, når der skal løbes på rigtig fart.",
            treadFold,
            "loebebaand",
            "foldbar",
          ),
          slot(
            "Cykel",
            "Siddende pas de dage knæene skal skånes.",
            foldBike,
            "motionscykel",
          ),
          slot(
            "Håndvægte",
            "Styrke i samme rum, uden at cardioen skal vige pladsen.",
            db24,
            "tilbehoer",
            "haandvaegte",
          ),
        ],
      },
    },
  },
  {
    space: "under-5",
    focus: "funktionel",
    tiers: {
      "under-5k": {
        title: "Én klokke og elastik",
        summary:
          "En justerbar kettlebell sparer en række klokker. Elastik og måtte dækker core, mobilitet og de øvelser, klokken ikke rammer.",
        slots: [
          slot(
            "Kettlebell",
            "Én justerbar klokke i stedet for fire, der skal stå fremme.",
            kbAdj,
            "tilbehoer",
            "kettlebells",
          ),
          slot(
            "Elastik",
            "Opvarmning, pull-aparts og de øvelser en enkelt klokke ikke dækker.",
            elastik,
            "tilbehoer",
            "elastikker",
          ),
          slot(
            "Gulv",
            "Måtte under swings og gulvarbejde.",
            mat,
            "tilbehoer",
            "gulvmaatter",
          ),
        ],
      },
      mid: {
        title: "Vægkabel, klokker og slynge",
        summary:
          "Trækstation på væggen, et støbejernssæt til swings og en TRX til kropsvægt. Gulvet bruges på skift, ikke til tre maskiner på én gang.",
        slots: [
          slot(
            "Kabel",
            "Vægmontering holder gulvet frit til kettlebells.",
            wallCable,
            "styrkemaskiner",
            "kabeltaarn",
          ),
          slot(
            "Kettlebells",
            "Støbejernsklokke til swings, goblet og pres.",
            kbIron,
            "tilbehoer",
            "kettlebells",
          ),
          slot(
            "Slynge",
            "TRX med døranker til core og rækker, når kablet er optaget.",
            trx,
            "tilbehoer",
            "slyngetraener",
          ),
        ],
      },
      "over-15k": {
        title: "Functional trainer og klokker",
        summary:
          "En functional trainer som kernen, en støbejerns-kettlebell til swings og TRX til kropsvægt.",
        slots: [
          slot(
            "Kabel",
            "Functional trainer til træk, pres og rotationer.",
            functionalTrainerPro,
            "styrkemaskiner",
            "kabeltaarn",
          ),
          slot(
            "Kettlebells",
            "Støbejernsklokke til swings ved siden af kablet.",
            kbIron,
            "tilbehoer",
            "kettlebells",
          ),
          slot(
            "Slynge",
            "Kropsvægt og core, pakket væk i en pose mellem pas.",
            trx,
            "tilbehoer",
            "slyngetraener",
          ),
        ],
      },
    },
  },
  {
    space: "vaerelse",
    focus: "styrke",
    tiers: {
      "under-5k": {
        title: "Bænk og håndvægte",
        summary:
          "En flad bænk med høj kapacitet og justerbare håndvægte. Nok til at træne styrke i et værelse, før rack og kabel kommer til.",
        slots: [
          slot(
            "Bænk",
            "Flad bænk til press, rows og step-ups i et fast rum.",
            flatBench,
            "styrkemaskiner",
            "traeningsbaenk",
          ),
          slot(
            "Håndvægte",
            "Startvægte der kan stå i et hjørne af værelset.",
            db20,
            "tilbehoer",
            "haandvaegte",
          ),
          slot(
            "Gulv",
            "Måtte under bænken, så gulvet holder.",
            mat,
            "tilbehoer",
            "gulvmaatter",
          ),
        ],
      },
      mid: {
        title: "Trækstation til værelset",
        summary:
          "En trækstation med fod- og rygstøtte, en justerbar bænk og et sæt håndvægte. Det er styrkerummet, de fleste værelser kan bære.",
        slots: [
          slot(
            "Kabeltårn",
            "Lat pulldown og rows uden et helt center.",
            cableStation,
            "styrkemaskiner",
            "kabeltaarn",
          ),
          slot(
            "Bænk",
            "Justerbar bænk foran tårnet til press og variation.",
            valhallaBench,
            "styrkemaskiner",
            "traeningsbaenk",
          ),
          slot(
            "Håndvægte",
            "Frivægte til de øvelser kablet ikke rammer.",
            db24,
            "tilbehoer",
            "haandvaegte",
          ),
        ],
      },
      "over-15k": {
        title: "Half-rack i værelset",
        summary:
          "Et half-rack, en justerbar bænk og håndvægte op til 40 kg. Squat og bænk med stang, når værelset er træningsrum.",
        slots: [
          slot(
            "Rack",
            "Half-rack til squat og bænk med stang.",
            halfRack,
            "styrkemaskiner",
          ),
          slot(
            "Bænk",
            "Justerbar bænk der kan ind i racket.",
            valhallaBench,
            "styrkemaskiner",
            "traeningsbaenk",
          ),
          slot(
            "Håndvægte",
            "Tunge justerbare håndvægte til isolation ved siden af stangen.",
            db40,
            "tilbehoer",
            "haandvaegte",
          ),
        ],
      },
    },
  },
  {
    space: "vaerelse",
    focus: "kondition",
    tiers: {
      "under-5k": {
        title: "Kondicykel til værelset",
        summary:
          "En prisvenlig motionscykel som den vane, der faktisk bliver brugt, plus elastik og måtte til styrke bagefter.",
        slots: [
          slot(
            "Cykel",
            "Skånsom kondition, der kan stå fast i værelset.",
            bikeB35,
            "motionscykel",
          ),
          slot(
            "Styrke",
            "Elastiksæt til de minutter, pulsen skal kombineres med modstand.",
            elastik,
            "tilbehoer",
            "elastikker",
          ),
          slot(
            "Gulv",
            "Måtte ved siden af cyklen til gulvarbejde.",
            mat,
            "tilbehoer",
            "gulvmaatter",
          ),
        ],
      },
      mid: {
        title: "Crosstrainer og romaskine",
        summary:
          "Ledvenlig cardio på crosstrainer og helkrop på en vandromaskine. To maskiner, et værelse, og en måtte under dem.",
        slots: [
          slot(
            "Crosstrainer",
            "Jævn puls med lav led-belastning, flere gange om ugen.",
            crosstrainer,
            "crosstrainer",
          ),
          slot(
            "Romaskine",
            "Vandmodstand til de pas, der skal bruge hele kroppen.",
            rowerWater,
            "romaskine",
            "vand",
          ),
          slot(
            "Gulv",
            "Måtte der dæmper maskinerne mod gulvet.",
            mat,
            "tilbehoer",
            "gulvmaatter",
          ),
        ],
      },
      "over-15k": {
        title: "Løbebånd og romaskine",
        summary:
          "Et løbebånd til seriøst løb, en romaskine til helkrop og en kondicykel til de rolige pas.",
        slots: [
          slot(
            "Løbebånd",
            "Til løb flere gange om ugen, når værelset er dedikeret til det.",
            treadT66,
            "loebebaand",
          ),
          slot(
            "Romaskine",
            "Helkropspas de dage løb skal veksles ud.",
            rowerZjet,
            "romaskine",
          ),
          slot(
            "Cykel",
            "Skånsom kondition de dage løb og roning skal veksles ud.",
            bikeB56,
            "motionscykel",
          ),
        ],
      },
    },
  },
  {
    space: "vaerelse",
    focus: "funktionel",
    tiers: {
      "under-5k": {
        title: "Klokker, slynge og dørribbe",
        summary:
          "Vinylkettlebells der skåner gulvet, en slyngetræner og en dørribbe. Funktionel træning i et værelse uden maskinpark.",
        slots: [
          slot(
            "Kettlebells",
            "Vinylklokke på 10 kg til goblet, swings og teknik.",
            kbVinyl,
            "tilbehoer",
            "kettlebells",
          ),
          slot(
            "Slynge",
            "Hænges i dør eller loft og pakkes væk bagefter.",
            sling,
            "tilbehoer",
            "slyngetraener",
          ),
          slot(
            "Pull-up",
            "Skruefri dørribbe, når karmen er solid.",
            doorBar,
            "tilbehoer",
            "pullup",
          ),
        ],
      },
      mid: {
        title: "Airbike og kettlebells",
        summary:
          "Korte, hårde intervaller på airbike, støbejernsklokker til styrken og TRX til kropsvægt. Et værelse der må lyde af træning.",
        slots: [
          slot(
            "Airbike",
            "Vindmodstand til intervaller, hvor arme og ben arbejder sammen.",
            airA1000,
            "motionscykel",
            "airbike",
          ),
          slot(
            "Kettlebells",
            "Støbejernsklokke til swings og pres mellem intervallerne.",
            kbIron,
            "tilbehoer",
            "kettlebells",
          ),
          slot(
            "Slynge",
            "TRX til core og rækker, når airbiken har haft pulsen.",
            trx,
            "tilbehoer",
            "slyngetraener",
          ),
        ],
      },
      "over-15k": {
        title: "Kabeltårn og klokker",
        summary:
          "En functional trainer, en konkurrence-kettlebell, plyoboks og TRX. Værelset bliver et funktionelt rum.",
        slots: [
          slot(
            "Kabeltårn",
            "Functional trainer til træk, pres og rotationer.",
            functionalTrainerPro,
            "styrkemaskiner",
            "kabeltaarn",
          ),
          slot(
            "Kettlebell",
            "Competition-klokke på 20 kg med ens greb til snatch og swing.",
            kbComp,
            "tilbehoer",
            "kettlebells",
          ),
          slot(
            "Plyo",
            "Plyoboks til box jumps og step-ups i flere højder.",
            plyoM,
            "tilbehoer",
            "stepbaenk",
          ),
          slot(
            "Slynge",
            "TRX til de øvelser, kablet og klokken ikke dækker.",
            trx,
            "tilbehoer",
            "slyngetraener",
          ),
        ],
      },
    },
  },
  {
    space: "garage",
    focus: "styrke",
    tiers: {
      "under-5k": {
        title: "Hjemmesæt med rack og vægte",
        summary:
          "Squat rack, vægtstang og vægte i ét køb, plus fitnessgulv under zonen. Garagen er i gang uden at samle delene selv.",
        slots: [
          slot(
            "Hjemmesæt",
            "Rack, stang og vægte i ét køb, så stangen kan bruges fra dag ét.",
            homeSet,
            "styrkemaskiner",
          ),
          slot(
            "Gulv",
            "Puslespilsgulv under racket, så beton og plader holder.",
            floor,
            "tilbehoer",
            "fitnessgulv",
          ),
        ],
      },
      mid: {
        title: "Multistation og bænk",
        summary:
          "En multistation med 100 kg vægtstak, en justerbar bænk og gulv under det hele. Kabel og pres i garagen, uden at samle et rack selv.",
        slots: [
          slot(
            "Multistation",
            "100 kg vægtstak til de fleste kabel- og maskinøvelser.",
            asgard,
            "styrkemaskiner",
            "multistation",
          ),
          slot(
            "Bænk",
            "Justerbar bænk til press ved siden af stationen.",
            proBench,
            "styrkemaskiner",
            "traeningsbaenk",
          ),
          slot(
            "Gulv",
            "Gulvbeskyttelse under plader og rack.",
            floor,
            "tilbehoer",
            "fitnessgulv",
          ),
        ],
      },
      "over-15k": {
        title: "Half-rack og cable cross",
        summary:
          "Half-rack til stangen, Odin PRO Cable Cross og en justerbar bænk. Garage-gymmet dækker både frivægt og kabel.",
        slots: [
          slot(
            "Rack",
            "Half-rack til squat og bænk med stang.",
            halfRack,
            "styrkemaskiner",
          ),
          slot(
            "Kabel",
            "Fritstående cable cross med to stakke, når væggen ikke skal bære det.",
            cableCross,
            "styrkemaskiner",
            "kabeltaarn",
          ),
          slot(
            "Bænk",
            "Justerbar bænk til både rack og kabel.",
            valhallaBench,
            "styrkemaskiner",
            "traeningsbaenk",
          ),
        ],
      },
    },
  },
  {
    space: "garage",
    focus: "kondition",
    tiers: {
      "under-5k": {
        title: "Cykel og gåbånd",
        summary:
          "En kondicykel og et walking pad. Garagen kan rumme mere senere. Her er pulsen dækket inden for et lavt budget.",
        slots: [
          slot(
            "Cykel",
            "Siddende kondition, der må stå fast.",
            bikeB35,
            "motionscykel",
          ),
          slot(
            "Gang",
            "Gåbånd til de lette dage og lange ture i gangtempo.",
            walkingPad,
            "loebebaand",
            "gaabaand",
          ),
          slot(
            "Gulv",
            "Måtte under cyklen.",
            mat,
            "tilbehoer",
            "gulvmaatter",
          ),
        ],
      },
      mid: {
        title: "Løbebånd, cykel og romaskine",
        summary:
          "Titan LIFE T56 til løb, en kondicykel til de stille pas og en magnet-romaskine til helkrop. Tre redskaber, ét rum.",
        slots: [
          slot(
            "Løbebånd",
            "Allround-bånd til gang, jogging og løb.",
            treadT56,
            "loebebaand",
          ),
          slot(
            "Cykel",
            "Skånsom cardio de dage båndet skal hvile.",
            bikeB35,
            "motionscykel",
          ),
          slot(
            "Romaskine",
            "Magnet-romaskine til helkrop uden vand-stænk.",
            rowerR10,
            "romaskine",
          ),
        ],
      },
      "over-15k": {
        title: "Løb, roning og assault",
        summary:
          "T66 til seriøst løb, romaskine til helkrop og en airbike til korte intervaller. Konditionsrummet i garagen.",
        slots: [
          slot(
            "Løbebånd",
            "Det stærkere hjemmebånd, når løb er hovedformen.",
            treadT66,
            "loebebaand",
          ),
          slot(
            "Romaskine",
            "Helkropsroning ved siden af båndet.",
            rowerZjet,
            "romaskine",
          ),
          slot(
            "Airbike",
            "Airbike til de korte, hårde pas.",
            assault,
            "motionscykel",
            "airbike",
          ),
        ],
      },
    },
  },
  {
    space: "garage",
    focus: "funktionel",
    tiers: {
      "under-5k": {
        title: "Klokker og pull-up bar",
        summary:
          "En støbejerns-kettlebell, en power tower til pull-ups og en slynge. Garagen er i gang, før de store maskiner købes.",
        slots: [
          slot(
            "Kettlebells",
            "Støbejernsklokke til swings, clean og pres.",
            kbIron,
            "tilbehoer",
            "kettlebells",
          ),
          slot(
            "Pull-up",
            "Power tower til pull-ups, når garagen har loftshøjden.",
            wallBar,
            "styrkemaskiner",
            "dipstation",
          ),
          slot(
            "Slynge",
            "Kropsvægt i barren eller i loftet.",
            sling,
            "tilbehoer",
            "slyngetraener",
          ),
        ],
      },
      mid: {
        title: "Airbike, klokker og plyo",
        summary:
          "Airbike til konditionen, støbejern til styrken, en plyoboks og en power tower. Funktionelt garage-setup i mellemklassen.",
        slots: [
          slot(
            "Airbike",
            "Intervaller med vindmodstand, hvor støj er i orden.",
            airA1000,
            "motionscykel",
            "airbike",
          ),
          slot(
            "Kettlebells",
            "Klokker til styrkedelen mellem intervallerne.",
            kbIron,
            "tilbehoer",
            "kettlebells",
          ),
          slot(
            "Plyo",
            "Plyoboks til jumps og step-ups.",
            plyoM,
            "tilbehoer",
            "stepbaenk",
          ),
          slot(
            "Pull-up",
            "Power tower til pull-ups ved siden af airbiken.",
            wallBar,
            "styrkemaskiner",
            "dipstation",
          ),
        ],
      },
      "over-15k": {
        title: "Cable cross og assault",
        summary:
          "Fritstående cable cross, airbike, støbejernsklokke og en soft plyoboks. Det er garagens funktionelle center.",
        slots: [
          slot(
            "Kabel",
            "Fritstående cable cross til træk og pres.",
            cableCross,
            "styrkemaskiner",
            "kabeltaarn",
          ),
          slot(
            "Airbike",
            "Airbike til finishers og korte, hårde pas.",
            assault,
            "motionscykel",
            "airbike",
          ),
          slot(
            "Kettlebells",
            "Støbejernsklokke til swings ved siden af maskinerne.",
            kbIron,
            "tilbehoer",
            "kettlebells",
          ),
          slot(
            "Plyo",
            "Soft plyoboks i flere højder til jumps og step-ups.",
            plyoL,
            "tilbehoer",
            "stepbaenk",
          ),
        ],
      },
    },
  },
];

const recipeByKey = new Map(
  recipes.map((recipe) => [`${recipe.space}:${recipe.focus}`, recipe]),
);

export function parseSpace(value: string | undefined): SpaceId | null {
  return SPACES.some((space) => space.id === value) ? (value as SpaceId) : null;
}

export function parseFocus(value: string | undefined): FocusId | null {
  return FOCUSES.some((focus) => focus.id === value) ? (value as FocusId) : null;
}

export function parseBudget(value: string | undefined): BudgetId | null {
  return BUDGETS.some((budget) => budget.id === value)
    ? (value as BudgetId)
    : null;
}

export function getSetup(
  space: SpaceId,
  focus: FocusId,
  budget: BudgetId,
): GymTier {
  const recipe = recipeByKey.get(`${space}:${focus}`);
  if (!recipe) {
    throw new Error(`Mangler hjemme-gym-opskrift ${space}/${focus}`);
  }
  return recipe.tiers[budget];
}

export function allFeedProductIds(): string[] {
  const ids = new Set<string>();
  for (const recipe of recipes) {
    for (const tier of Object.values(recipe.tiers)) {
      for (const item of tier.slots) ids.add(item.feedProductId);
    }
  }
  return [...ids];
}

export function isOutsideBudget(budget: BudgetId, total: number): boolean {
  const band = BUDGETS.find((item) => item.id === budget);
  if (!band) return false;
  if (budget === "under-5k") return total > band.max!;
  if (budget === "mid") return total <= band.min || total > band.max!;
  return total <= band.min;
}

export function builderHref(selection: {
  space?: SpaceId | null;
  focus?: FocusId | null;
  budget?: BudgetId | null;
}): string {
  const params = new URLSearchParams();
  if (selection.space) params.set("plads", selection.space);
  if (selection.focus) params.set("fokus", selection.focus);
  if (selection.budget) params.set("budget", selection.budget);
  const query = params.toString();
  return query ? `${HOME_GYM_PATH}?${query}` : HOME_GYM_PATH;
}

export type ResolvedGymSlot = {
  role: string;
  why: string;
  categoryHref: string;
  categoryName: string;
  product: HomeGymOffer | null;
};

export type ResolvedGymSetup = {
  title: string;
  summary: string;
  slots: ResolvedGymSlot[];
  /** Sum af de produkter, der har en pris. */
  total: number | null;
  /** Alle slots fandtes i feedet og havde en pris. */
  complete: boolean;
  outsideBand: boolean;
};

export function resolveSetup(
  space: SpaceId,
  focus: FocusId,
  budget: BudgetId,
  productsById: ReadonlyMap<string, HomeGymOffer>,
): ResolvedGymSetup {
  const tier = getSetup(space, focus, budget);
  const slots = tier.slots.map((item) => {
    const category = getCategory(item.categorySlug);
    return {
      role: item.role,
      why: item.why,
      categoryHref: categoryIntentHref(item.categorySlug, item.intentSlug),
      categoryName: category?.name ?? "Maskiner",
      product: productsById.get(item.feedProductId) ?? null,
    };
  });

  const priced = slots.filter(
    (item) => item.product?.price != null && Number.isFinite(item.product.price),
  );
  const complete =
    slots.length > 0 &&
    slots.every(
      (item) =>
        item.product != null &&
        item.product.price != null &&
        Number.isFinite(item.product.price),
    );
  const total =
    priced.length > 0
      ? priced.reduce((sum, item) => sum + (item.product?.price ?? 0), 0)
      : null;

  return {
    title: tier.title,
    summary: tier.summary,
    slots,
    total,
    complete,
    outsideBand: complete && total != null && isOutsideBudget(budget, total),
  };
}
