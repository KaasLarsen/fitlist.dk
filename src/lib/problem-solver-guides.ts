import type { Guide } from "./guides";

/**
 * Problem-løser SEO-guides: livsfase, sæson, økonomi, fejlfinding.
 * Merge’es ind i guides-arrayet fra guides.ts.
 */
export const problemSolverGuides: Guide[] = [
  // —— B. Sæson & handel (prioritet) ——
  {
    slug: "black-friday-januar-udsalg-traeningsmaskiner-2026",
    title: "Black Friday & januar-udsalg: Sådan finder du de bedste tilbud på træningsmaskiner",
    metaTitle:
      "Black Friday & januar-udsalg 2026 – Tilbud på træningsmaskiner",
    excerpt:
      "Undgå falske rabatter: sådan spotter du reelle Black Friday- og januar-tilbud på løbebånd, cykler og hjemmegym — plus aktuelle deals fra vores partnere.",
    metaDescription:
      "Black Friday og januar-udsalg på træningsmaskiner 2026. Guide til ægte rabatter, fejlkøb at undgå og aktuelle tilbud — med live priser fra danske partnere.",
    categorySlug: "loebebaand",
    alsoCategorySlugs: ["motionscykel", "romaskine", "styrkemaskiner"],
    recommendationsHeading: "Eksempler på maskiner, der ofte er på tilbud",
    tldrPicks: [
      { productId: "bf-t56", label: "Solidt løbebånd" },
      { productId: "bf-s72", label: "Spinning allround" },
      { productId: "bf-valhalla", label: "Hjemmegym" },
    ],
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    intro:
      "Black Friday, Black Days og januar-udsalg er årets største handelsdage for træningsmaskiner — og også dem, hvor flest danskere køber noget, de aldrig får brugt. Denne guide er ikke en blind “køb nu”-liste. Du får et filter til at spotte reelle rabatter, undgå fejlkøb, og lande på en maskine der matcher bolig og vane. Aktuelle nedsatte varer samler vi løbende på Tilbud. Black Days kører også via vores partnere (se banneret øverst på sitet, når kampagnen er aktiv).",
    criteria: [
      {
        title: "Tjek “før-pris” — ikke kun procent",
        description:
          "En “50 % rabat” er meningsløs, hvis før-prisen var oppustet. Sammenlign live pris med det, du har set de seneste uger, og med flere shops. Fitlists tilbudsliste og “Se pris”-knapper viser aktuelle partnerpriser — brug dem som reality check.",
      },
      {
        title: "Køb til vanen, ikke til stemningen",
        description:
          "Kampagner gør det fristende at hoppe to niveauer op i pris. Hold dig til den maskintype, du allerede har besluttet dig for (fx spinning vs. hometrainer). Se Vintertræning derhjemme og Nytårsforsæt-guiden, hvis du stadig er i tvivl om typen.",
      },
      {
        title: "Fragt, montering og retur",
        description:
          "En billig maskine med dyr fragt eller ingen retur på “kampagnevarer” kan blive dyr. Tjek levering, om den kommer færdigsamlet, og hvad der gælder ved fortrydelse — især på store løbebånd og multistationer.",
      },
      {
        title: "Lager vs. “næsten udsolgt”",
        description:
          "Ægte knaphed findes. Kunstig urgency også. Hvis tre shops har samme model på lager, er FOMO sjældent dit bedste rådgiver. Vent hellere 24 timer end at købe den forkerte type.",
      },
      {
        title: "Garanti slår engangsrabat",
        description:
          "Spar ikke 800 kr. på en model uden klar dansk garanti og reservedelsadgang. Det gælder især brugte “kup” midt i udsalgsrusen — se Brugt vs. ny træningsmaskine.",
      },
    ],
    products: [
      {
        id: "bf-t56",
        name: "Titan LIFE Treadmill T56",
        badge: "Løbebånd — allround",
        summary:
          "Typisk kandidat til Black Days/januar: solid midrange til gang, jogging og løb. Tjek live pris mod det, du har set før kampagnen — og sammenlign med Ascendic 7021, hvis budgettet er strammere.",
        rating: 4.8,
        pros: [
          "Allround hjemmeløbebånd",
          "Bedre holdbarhed end billigste 3-i-1",
          "Fri fragt hos partner",
          "Klar kategori at shoppe tilbud i",
        ],
        cons: [
          "Fylder — mål pladsen før “køb”",
          "Overkill hvis du kun går",
          "Kampagnepris skal stadig matches til behov",
        ],
        specs: [
          { label: "Type", value: "Løbebånd" },
          { label: "Segment", value: "Midrange" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3179",
      },
      {
        id: "bf-s72",
        name: "Titan LIFE Spinning Cykel S72",
        badge: "Spinning — allround",
        summary:
          "Spin bikes er klassiske udsalgsvarer. S72 er vores allround-anbefaling, når du vil have intervaller hjemme uden smart-lock-in. Sammenlign med S11/S62, hvis procenten ser for god ud til at være sand.",
        rating: 4.8,
        pros: [
          "Solid mid/øvre mid spinning",
          "God til jævnlig brug",
          "Nem at finde i kampagner",
          "Fri fragt hos partner",
        ],
        cons: [
          "Hård saddel — tilvænning",
          "Ikke hometrainer til egen racercykel",
          "Støj/vibration i lejlighed",
        ],
        specs: [
          { label: "Type", value: "Spinningcykel" },
          { label: "Serie", value: "S72" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2807",
      },
      {
        id: "bf-valhalla",
        name: "Odin Valhalla Home Gym Multistation 100 kg",
        badge: "Styrke — hjemmegym",
        summary:
          "Store stationer får ofte synlige januar-rabatter. 100 kg-stakken er sweet spot for de fleste — men loftshøjde og plads er dealbreakers, uanset hvor grøn prisen er.",
        rating: 4.8,
        pros: [
          "Komplet kabel-station",
          "100 kg holder længere end entry",
          "Ofte på kampagne hos partnere",
          "Én maskine = mange øvelser",
        ],
        cons: [
          "Kræver loftshøjde og gulvplads",
          "Tung at få ind — planlæg fragt",
          "Dyr fejl hvis vanen mangler",
        ],
        specs: [
          { label: "Type", value: "Multistation" },
          { label: "Vægtstak", value: "100 kg" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:15327",
      },
      {
        id: "bf-zjet",
        name: "Reebok ZJET Rower",
        badge: "Romaskine — midrange",
        summary:
          "Romaskiner er populære “nytårs”-køb. ZJET er et stærkt allround-valg — men magnet/vand/luft og støj skal være afklaret før du jager rabatprocenten.",
        rating: 4.8,
        pros: [
          "Stærkt allround hjemmevalg",
          "Helkropscardio på én maskine",
          "Kendt brand i kampagner",
          "Fri fragt hos partner",
        ],
        cons: [
          "Fylder i brug — mål skinnen",
          "Teknik kræves (lænd)",
          "Tjek støj ift. bolig",
        ],
        specs: [
          { label: "Type", value: "Romaskine" },
          { label: "Brand", value: "Reebok" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2330",
      },
    ],
    howToChoose:
      "Har du allerede valgt maskintype? Shop live pris på den type — start på Tilbud og brug “Se pris” her. Usikker på typen? Læs Vintertræning derhjemme (cardio i mørke måneder) eller Nytårsforsæt-guiden (undgå fejlkøb). Vil du have break-even-tal? Se Hjemmegym vs. fitnesscenter. Shop kun det, du har plads og vane til — rabat redder ikke et tørrestativ.",
    learningSections: [
      {
        heading: "Black Friday vs. januar-udsalg",
        paragraphs: [
          "Black Friday/Black Days (november) er volume-dage: mange modeller, højt tempo, mere støj i marketing. Januar-udsalg rammer nytårsforsæt — ofte de samme maskiner, nogle gange med bedre lager på “fornuftige” midrange-modeller, når impulskøbene er ovre.",
          "Strategi: brug november til research og prissammenligning. Køb i november kun hvis typen er klar. Ellers vent til januar med samme checkliste — og undgå at købe to gange.",
        ],
      },
      {
        heading: "Sådan bruger du Fitlist under udsalg",
        paragraphs: [
          "1) Åbn den relevante købsguide (løbebånd, spinning, romaskine, multistation). 2) Notér 1–2 modeller. 3) Tjek Tilbud og “Se pris” for live partnerpris. 4) Bekræft plads, støj og brugerens vægt. 5) Køb først da.",
          "Banneret “Black Days” (når det er aktivt) peger direkte til partnerkampagner. Det er affiliate-links — vi får provision, hvis du køber. Det ændrer ikke rådet: køb kun det rigtige.",
        ],
      },
      {
        heading: "Klassiske fejlkøb i udsalgsugen",
        paragraphs: [
          "Airbike i etagelejlighed. Løbebånd uden måtte og plan for støj. Multistation uden loftmål. “Komplet gym” til 25.000 kr. før du har trænet 90 dage. Brug Hjemmetræning for begyndere og budget-guides, hvis du er ny.",
        ],
        comparison: {
          caption: "Udsalgssignal vs. realitet",
          rowHeaderLabel: "Signal",
          columns: ["Ser godt ud", "Tjek i stedet"],
          rows: [
            {
              label: "−50 %",
              cells: ["Stor rabat", "Før-pris + andre shops"],
            },
            {
              label: "“Kun i dag”",
              cells: ["FOMO", "Samme model andre steder?"],
            },
            {
              label: "Gratis fragt",
              cells: ["Nice", "Retur + montering + loft"],
            },
            {
              label: "Bundle",
              cells: ["Mere for pengene", "Bruger du tilbehøret?"],
            },
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Hvornår er træningsmaskiner billigst — Black Friday eller januar?",
        answer:
          "Begge kan være skarpe. November har bredere kampagner; januar rammer nytårsforsæt. Sammenlign live priser — ikke kalenderen alene.",
      },
      {
        question: "Hvor ser jeg aktuelle tilbud?",
        answer:
          "På Fitlists Tilbud-side og via “Se pris” på anbefalingerne. Under Black Days kan partnerbanneret også pege direkte på kampagnesider.",
      },
      {
        question: "Skal jeg købe den dyreste model, fordi den er “−40 %”?",
        answer:
          "Nej. Køb den model, der matcher bolig, støj og træningsfrekvens. En dyr fejl er dyr — også på udsalg.",
      },
      {
        question: "Er Fitlist en webshop?",
        answer:
          "Nej. Vi guider og linker til danske partnere (affiliate). Priser og lager styres af shoppene.",
      },
      {
        question: "Hvad hvis jeg fortryder?",
        answer:
          "Følg partnerens fortrydelsesret. Store maskiner kan være dyre at returnere — mål plads og læs guiden før køb.",
      },
    ],
    relatedSlugs: [
      "vintertraening-derhjemme-bedste-maskiner-2026",
      "nytaarsforsat-undgaa-fejlkob-hjemmetraening-2026",
      "hjemmegym-vs-fitnesscenter-regnestykke-2026",
      "brugt-vs-ny-traeningsmaskine-garanti-2026",
      "hjemmetraening-for-begyndere-foerste-90-dage",
      "bedste-loebebaand-2026",
      "bedste-spinningcykel-2026",
      "bedste-multistation-2026",
      "ultimative-home-gym-budget-2026",
    ],
  },
  {
    slug: "vintertraening-derhjemme-bedste-maskiner-2026",
    title: "Vintertræning derhjemme: De bedste maskiner til de mørke måneder",
    metaTitle:
      "Vintertræning derhjemme 2026 – Bedste maskiner til mørke måneder",
    excerpt:
      "Hold formen når det blæser og regner: hometrainer, spinningcykel og løbebånd til cyklister og løbere — med live priser.",
    metaDescription:
      "Vintertræning derhjemme 2026. Bedste maskiner til mørke måneder: hometrainer, spinning og løbebånd — guide til cyklister og løbere med live priser.",
    categorySlug: "motionscykel",
    alsoCategorySlugs: ["loebebaand"],
    intentSlug: "hometrainer",
    tldrPicks: [
      { productId: "vin-kickr-core", label: "Til egen cykel" },
      { productId: "vin-s72", label: "Spin uden racercykel" },
      { productId: "vin-t56", label: "Til løbere" },
    ],
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    intro:
      "Fra oktober til februar dropper mange udendørspas — ikke motivationen, men vejret. Regn, slud, mørke cykelstier og glatte veje gør “bare én tur mere” til et nej. Denne guide er til dig, der vil holde aerob form hjemme: cyklister der skal vælge hometrainer vs. spinning, og løbere der overvejer løbebånd. Du får kriterier først, derefter konkrete modeller med live priser. Til udsalgsjagt: Black Friday & januar-udsalg-guiden.",
    criteria: [
      {
        title: "Har du allerede en racercykel?",
        description:
          "Ja → direct drive-hometrainer (fx Wahoo KICKR CORE) bevarer saddel, pasform og watt. Nej → spinningcykel eller dedicated smart bike. Det er det vigtigste vintervalg — ikke skærmstørrelse.",
      },
      {
        title: "Løber eller cyklist?",
        description:
          "Løbere får mest af et ægte løbebånd (ikke walking pad). Cyklister får mest af trainer/spin. “Én maskine til det hele” findes — romaskine/airbike — men den erstatter ikke sportsspecifik træning.",
      },
      {
        title: "Støj og naboer i vintermørket",
        description:
          "Aftenpas er normalen om vinteren. Spinning og løbebånd vibrerer. Brug måtte, og vær ærlig om etagebyggeri. Zwift-sprint kl. 22 er en politisk beslutning.",
      },
      {
        title: "Struktur > hero-pas",
        description:
          "Vinteren vindes på 2–4 faste pas om ugen. Vælg grej, der er klar på 2 minutter. En trainer du skal montere 20 minutter hver gang, bliver brugt mindre — medmindre du elsker ritualet.",
      },
      {
        title: "Varme og ventilation",
        description:
          "Indendørs sveder du mere. Planlæg håndklæde, blæser og gulvbeskyttelse. Elektronik og sved er en dårlig kombination på billige computere.",
      },
    ],
    products: [
      {
        id: "vin-kickr-core",
        name: "Wahoo KICKR CORE 2 — Smart hometrainer",
        badge: "Bedst til egen cykel",
        summary:
          "Vinterens standard for mange landevejs- og gravelryttere: spænd din egen cykel op, kør Zwift/struktur, behold pasformen. Direct drive uden flagship-pris.",
        rating: 4.7,
        pros: [
          "Din saddel og pasform",
          "Zwift-klar direct drive",
          "Skarp pris ift. Neo / KICKR Bike",
          "Klassisk vinter-setup",
        ],
        cons: [
          "Kræver montering (hjul/kassette)",
          "Ikke “sæt dig og kør” for hele husstanden",
          "Kræver egen cykel i god stand",
        ],
        specs: [
          { label: "Type", value: "Direct drive hometrainer" },
          { label: "Brand", value: "Wahoo" },
          { label: "Partner", value: "Cykelpartner.dk" },
        ],
        feedProductId: "Cykelpartner.dk:850048106611",
      },
      {
        id: "vin-s72",
        name: "Titan LIFE Spinning Cykel S72",
        badge: "Bedst uden racercykel",
        summary:
          "Ingen landevejscykel? S72 giver spinning-intervaller og zone-2 hjemme uden smart-lock-in. God vinter-allround, når du vil træde til uden montering.",
        rating: 4.8,
        pros: [
          "Klar på få minutter",
          "Solid til jævnlig vinterbrug",
          "Ingen cykel-montering",
          "Fri fragt hos partner",
        ],
        cons: [
          "Ikke din udecykels pasform",
          "Hårdere saddel end kondicykel",
          "Mindre watt-præcision end KICKR",
        ],
        specs: [
          { label: "Type", value: "Spinningcykel" },
          { label: "Serie", value: "S72" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2807",
      },
      {
        id: "vin-t56",
        name: "Titan LIFE Treadmill T56",
        badge: "Bedst til løbere",
        summary:
          "Når stierne er isglatte: et ægte hjemmeløbebånd til jogging og løb. T56 er allround-valget til vinterens løbevedligehold — ikke et walking pad.",
        rating: 4.8,
        pros: [
          "Gang, jogging og løb",
          "Solid midrange til vinterfrekvens",
          "Bedre end billige kompromis-bånd",
          "Fri fragt hos partner",
        ],
        cons: [
          "Støj og vibration — måtte påkrævet",
          "Fylder mere end en trainer",
          "Strømforbrug — se strøm-guiden",
        ],
        specs: [
          { label: "Type", value: "Løbebånd" },
          { label: "Brug", value: "Gang + løb" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3179",
      },
      {
        id: "vin-odin-s1000",
        name: "Odin S1000 Spinningcykel (Kinomap & Zwift)",
        badge: "Bedst smart spin",
        summary:
          "Vil du have virtuelle bakker og app-motivation uden Wahoo-budget? S1000 er Zwift/Kinomap-klar spinning — stærk vintermotivation, når mørket dræber udendørsløbet.",
        rating: 4.8,
        pros: [
          "Zwift- og Kinomap-klar",
          "Spinning uden racercykel",
          "God balance pris/smart",
          "Tablet-frihed",
        ],
        cons: [
          "Kræver app-abonnement + skærm",
          "Ikke KICKR-bakke-realisme",
          "Støj som spin bike",
        ],
        specs: [
          { label: "Type", value: "Smart spinningcykel" },
          { label: "Apps", value: "Zwift, Kinomap" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:15043",
      },
    ],
    howToChoose:
      "Egen race-/gravelcykel? Wahoo KICKR CORE 2 (eller se Bedste hometrainer 2026). Ingen cykel, men vil spinne? Titan S72 — eller Odin S1000, hvis Zwift er motivationsfaktoren. Løber først? Titan T56. Usikker og ny? Start med Nytårsforsæt-guiden og begynder-90-dage, før du køber vinterens dyreste maskine. Shop via “Se pris”.",
    learningSections: [
      {
        heading: "Hometrainer vs. spinning om vinteren",
        paragraphs: [
          "Hometrainer: maksimal overførsel til forårscykling, watt, din saddel. Trade-off: montering og én cykel ad gangen. Spinning: hele husstanden kan bruge den, hurtig start, mere “fitness”-følelse end landevej.",
          "Triatleter og klubryttere vælger næsten altid trainer. Motionscyklister der bare vil svede 3× om ugen, er ofte gladere for spin.",
        ],
        comparison: {
          caption: "Vinter-cardio til cyklister",
          rowHeaderLabel: "Behov",
          columns: ["Hometrainer", "Spinning", "Smart spin"],
          rows: [
            {
              label: "Pasform",
              cells: ["Din cykel", "Spin-geometri", "Spin + app"],
            },
            {
              label: "Setup-tid",
              cells: ["Længere", "Kort", "Kort"],
            },
            {
              label: "Zwift-dybde",
              cells: ["Høj (direct drive)", "Lav uden smart", "God"],
            },
            {
              label: "Husstand",
              cells: ["Primært dig", "Delbar", "Delbar"],
            },
          ],
        },
      },
      {
        heading: "Løbebånd som vinterplan B",
        paragraphs: [
          "Mange løbere overvurderer, hvor meget de vil løbe inde. Hvis 80 % af dit år er udendørs, kan 1–2 båndpas om ugen + styrke være nok. Køb bånd, fordi du ved du bruger det — ikke fordi Strava-året skal reddes i november.",
          "Stød, støj og strøm er reelle. Crosstrainer eller romaskine kan holde konditionen, hvis knæene eller naboerne protesterer — se ryg/knæ-guiden.",
        ],
      },
      {
        heading: "Sæsonkalender (kort)",
        paragraphs: [
          "Okt–nov: research + evt. Black Days. Dec: hold vanen, undgå impulskøb midt i jul. Jan: nytårsforsæt — brug fejlkøbs-guiden. Feb–mar: evaluér om maskinen bliver brugt, før du opgraderer.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad er bedst til vintertræning derhjemme?",
        answer:
          "Cyklister med egen cykel: hometrainer. Uden cykel: spinningcykel. Løbere: ægte løbebånd. Vælg efter sport — ikke efter den største skærm.",
      },
      {
        question: "Kan jeg klare mig med romaskine om vinteren?",
        answer:
          "Ja til generel kondition. Nej som eneste erstatning, hvis dit mål er specifik cykling eller løb. Romaskine er et stærkt supplement.",
      },
      {
        question: "Er Zwift nødvendigt?",
        answer:
          "Nej. Mange kører struktur på ur/computer uden Zwift. Zwift hjælper motivationen i mørket — regn abonnement med i prisen.",
      },
      {
        question: "Hvornår skal jeg købe?",
        answer:
          "Når typen er valgt. Udsalg hjælper prisen — se Black Friday & januar-udsalg-guiden — men forkert type er stadig forkert.",
      },
      {
        question: "Hvor ser jeg priser?",
        answer:
          "Klik “Se pris” på hver anbefaling. Priser hentes live fra partnerne.",
      },
    ],
    relatedSlugs: [
      "black-friday-januar-udsalg-traeningsmaskiner-2026",
      "nytaarsforsat-undgaa-fejlkob-hjemmetraening-2026",
      "bedste-hometrainer-2026",
      "bedste-spinningcykel-2026",
      "bedste-loebebaand-2026",
      "spinningcykel-motionscykel-eller-hometrainer-2026",
      "stroemforbrug-loebabaand-crosstrainer-2026",
      "hjemmetraening-for-begyndere-foerste-90-dage",
    ],
  },
  {
    slug: "nytaarsforsat-undgaa-fejlkob-hjemmetraening-2026",
    title: "Nytårsforsæt-guiden: Undgå fejlkøb når du starter hjemmetræning",
    metaTitle:
      "Nytårsforsæt 2026 – Undgå fejlkøb i hjemmetræning",
    excerpt:
      "Januar-motivation er høj — fejlkøbsrisikoen også. Sådan vælger du grej, du faktisk får brugt, i stedet for et dyrt tørrestativ.",
    metaDescription:
      "Nytårsforsæt hjemmetræning 2026: undgå fejlkøb. Guide til vane før maskine, realistisk budget og grej du får brugt — med live priser.",
    categorySlug: "tilbehoer",
    intentSlug: "begynder",
    recommendationsHeading: "Start her — før den dyre maskine",
    tldrPicks: [
      { productId: "ny-haandvaegte", label: "Styrke først" },
      { productId: "ny-elastik", label: "Mobilitet" },
      { productId: "ny-maatte", label: "Gulv & vane" },
    ],
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    intro:
      "Hvert januar køber tusindvis af danskere en maskine, der i marts er tøjstativ. Det er ikke fordi maskiner er dårlige — det er fordi købet sker på motivationstoppen, før vanen findes. Denne guide er dit fejlkøbsfilter til nytårsforsættet: hvad du skal købe først, hvornår en maskine giver mening, og hvordan du undgår at betale for skyldfølelse. Dybere 90-dages plan: Hjemmetræning for begyndere. Udsalg: Black Friday & januar-udsalg.",
    criteria: [
      {
        title: "Vane før kvadratmeter",
        description:
          "Kan du træne 3× om ugen i 30 dage med det, du allerede har (gåture, gulv, elastik)? Hvis nej, løser en dyr maskine det sjældent. Hvis ja, ved du bedre, hvilken maskine du mangler.",
      },
      {
        title: "Barrieren skal være under 60 sekunder",
        description:
          "Grej, der kræver 15 minutters setup, taber til sofaen i januar-mørket. Håndvægte og måtte vinder. Store maskiner vinder kun, hvis de står klar — eller foldes væk på 30 sekunder.",
      },
      {
        title: "Én begrænsning først",
        description:
          "Plads, støj, budget eller tid? Vælg grej efter den hårdeste begrænsning. Se situationsguides (lejlighed, foldbar, budget) — ikke “bedste alt”.",
      },
      {
        title: "Budget i to faser",
        description:
          "Fase 1 (januar): under ~2.500 kr. til must-haves. Fase 2 (efter 60–90 dage): maskine eller home gym-pakke. Se også fase-byggeren til 3.000 kr.",
      },
      {
        title: "Skriv “fejl”-kriteriet ned",
        description:
          "Før køb: “Jeg fortryder, hvis jeg ikke bruger det X gange på 30 dage.” Hvis du ikke kan fylde X ærligt ud, vent.",
      },
    ],
    products: [
      {
        id: "ny-haandvaegte",
        name: "Odin Justerbar Håndvægt 20 kg (2×10 kg)",
        badge: "Must-have #1",
        summary:
          "Det mest fortrydelses-resistente styrkekøb til januar: ét sæt dækker mange øvelser, fylder lidt, og kan sælges igen hvis forsættet skifter. Start her — ikke med et 15.000 kr. løbebånd.",
        rating: 4.7,
        pros: [
          "Minimal plads",
          "Høj træningsdækning pr. krone",
          "Nem at starte på 2 minutter",
          "Lav fejlkøbsrisiko",
        ],
        cons: [
          "Ikke cardio alene",
          "20 kg-sæt er entry — opgrader senere",
          "Kræver stadig program/vane",
        ],
        specs: [
          { label: "Type", value: "Justerbare håndvægte" },
          { label: "Sæt", value: "2×10 kg" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:9007",
      },
      {
        id: "ny-elastik",
        name: "Ascendic Elastiktræningssæt",
        badge: "Must-have #2",
        summary:
          "Opvarmning, mobilitet og let styrke uden støj. Perfekt januar-add-on, der faktisk bliver brugt — også på dage hvor “maskine” føles for stort.",
        rating: 4.4,
        pros: [
          "Billig og støjsvag",
          "Fylder næsten intet",
          "God til daglig mini-session",
          "Lav risiko",
        ],
        cons: [
          "Ikke tung styrke alene",
          "Sliddel — udskift ved revner",
          "Kræver lidt øvelsesviden",
        ],
        specs: [
          { label: "Type", value: "Elastiksæt" },
          { label: "Partner", value: "Ascendic.dk" },
        ],
        feedProductId: "Ascendic.dk:43590874824938",
      },
      {
        id: "ny-maatte",
        name: "Odin Yogamåtte 0,4 cm",
        badge: "Must-have #3",
        summary:
          "Måtten er vanens usynlige ven: den definerer “træningszonen”, beskytter gulv og sænker barren for at starte. Køb den før den store maskine.",
        rating: 4.4,
        pros: [
          "Gør gulvet til et gym",
          "Beskytter gulv og led",
          "Billig forsikring",
          "Bruges uanset senere maskine",
        ],
        cons: [
          "Ikke træning i sig selv",
          "Tynd — ikke nok under tungt løbebånd",
          "Kan glide på nogle gulve",
        ],
        specs: [
          { label: "Type", value: "Yogamåtte / underlag" },
          { label: "Tykkelse", value: "0,4 cm" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:5086",
      },
      {
        id: "ny-r10",
        name: "Titan LIFE Rower R10",
        badge: "Første maskine (hvis vane sidder)",
        summary:
          "Når 60–90 dage er overstået, og du savner cardio: en prisvenlig magnet-romaskine er et ærligere “første maskine”-køb end et premium-løbebånd — helkrop, ofte foldbar, lavere støj end airbike.",
        rating: 4.3,
        pros: [
          "Lav indgangspris til maskine",
          "Helkropscardio",
          "Bedre lejligheds-match end airbike",
          "Fri fragt hos partner",
        ],
        cons: [
          "Teknik kræves (lænd)",
          "Fylder i længden i brug",
          "Opgrader senere ved intensiv brug",
        ],
        specs: [
          { label: "Type", value: "Magnet-romaskine" },
          { label: "Segment", value: "Budget" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2801",
      },
    ],
    howToChoose:
      "Helt ny i januar? Håndvægte + elastik + måtte — punktum. Vanen sidder, og du savner kondition? Titan R10 eller se vinter-guiden (spin/løbebånd/hometrainer) efter sport. Vil du bygge hjemmegym billigt? Fase-byggeren / budget under 5–10k. Jagter du udsalg? Black Friday & januar-guiden — men først efter typen er valgt. Shop via “Se pris”.",
    learningSections: [
      {
        heading: "Hvorfor januar-fejlkøb sker",
        paragraphs: [
          "Motivation er høj, identitet skifter (“jeg er en person der træner”), og shops er bygget til at sælge den følelse. Maskinen bliver et symbol — ikke et værktøj. Når hverdagen rammer i uge 3, vinder friktion over symbolik.",
          "Løsningen er kedelig: små grej, kort setup, kalenderblokke. Maskinen kommer, når friktionen allerede er lav.",
        ],
      },
      {
        heading: "Beslutningstræ på 60 sekunder",
        paragraphs: [
          "Ingen vane → must-haves. Vane + savner cardio + lejlighed → magnet-romaskine eller kondicykel. Vane + cyklist → hometrainer/spin (vinter-guide). Vane + løber → løbebånd. Vane + styrke → bænk/håndvægte/multistation efter plads.",
        ],
        comparison: {
          caption: "Januar-køb vs. marts-realitet",
          rowHeaderLabel: "Køb",
          columns: ["Typisk januar", "Bedre januar"],
          rows: [
            {
              label: "Første køb",
              cells: ["Dyr maskine", "Håndvægte + måtte"],
            },
            {
              label: "Setup",
              cells: ["Samling i timevis", "< 1 minut"],
            },
            {
              label: "Risiko",
              cells: ["Tørrestativ", "Kan sælges/gemmes"],
            },
            {
              label: "Næste skridt",
              cells: ["Skyldfølelse", "Maskine efter 90 dage"],
            },
          ],
        },
      },
      {
        heading: "Når maskinen *er* rigtig i januar",
        paragraphs: [
          "Du har trænet konsistent før, holdt pause, og ved præcis hvilken modalitet du mangler. Du har målt plads og støj. Du køber midrange — ikke “billigst på forsiden”. Så kan januar-udsalg være timing, ikke fælde.",
        ],
      },
    ],
    faqs: [
      {
        question: "Skal jeg købe træningsmaskine til nytårsforsættet?",
        answer:
          "Kun hvis vanen allerede findes, eller du genoptager en kendt disciplin. Ellers start med håndvægte, elastik og måtte i 60–90 dage.",
      },
      {
        question: "Hvad er det mest almindelige fejlkøb?",
        answer:
          "For stor/for dyr maskine til forkert bolig (støj/plads) købt på motivations-toppen — især løbebånd og airbike i lejlighed.",
      },
      {
        question: "Kan jeg købe på Black Friday alligevel?",
        answer:
          "Ja, hvis typen er valgt. Brug udsalgsguiden til pris — ikke til at vælge sport.",
      },
      {
        question: "Hvad med fitnesscenter i stedet?",
        answer:
          "Se Hjemmegym vs. fitnesscenter-regnestykket. Mange kombinerer: center til socialt, hjemme til hverdagsvanen.",
      },
      {
        question: "Hvor ser jeg priser?",
        answer:
          "Klik “Se pris” på anbefalingerne. Live priser fra partnerne.",
      },
    ],
    relatedSlugs: [
      "hjemmetraening-for-begyndere-foerste-90-dage",
      "black-friday-januar-udsalg-traeningsmaskiner-2026",
      "vintertraening-derhjemme-bedste-maskiner-2026",
      "hjemmegym-vs-fitnesscenter-regnestykke-2026",
      "fase-byggeren-start-for-3000-kr-2026",
      "hjemmetraening-under-1000-kr-2026",
      "ultimative-home-gym-budget-2026",
      "hjemmetraening-for-travle-boernefamilier-2026",
    ],
  },

  // —— A. Livsfase & målgruppe ——
  {
    slug: "hjemmetraening-for-travle-boernefamilier-2026",
    title: "Hjemmetræning for travle børnefamilier – Maskiner der giver mest på 20 minutter",
    metaTitle:
      "Hjemmetræning for børnefamilier 2026 – Mest på 20 minutter",
    excerpt:
      "Korte HIIT-pas mellem putning og madpakker: airbike, romaskine og foldbart grej der kan pakkes væk — med live priser.",
    metaDescription:
      "Hjemmetræning for travle børnefamilier 2026. Maskiner til 20-minutters pas: airbike, romaskine og foldbart udstyr — guide med live priser.",
    categorySlug: "motionscykel",
    alsoCategorySlugs: ["romaskine", "loebebaand"],
    intentSlug: "airbike",
    tldrPicks: [
      { productId: "fam-a1000", label: "Mest på 20 min" },
      { productId: "fam-r10", label: "Helkrop + stille" },
      { productId: "fam-irun", label: "Fold væk" },
    ],
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    intro:
      "I en børnefamilie er træning ikke et tidsproblem i teorien — det er et vinduesproblem. Du har 15–25 minutter mellem mad, putning og opvask. Denne guide prioriterer maskiner og setup, der giver høj effekt på kort tid, kan stå klar (eller pakkes væk), og ikke bliver en sikkerhedsrisiko midt i stuen. Du får HIIT-venlige valg (airbike/romaskine) og foldbare alternativer. Ikke et fuldt home gym — et realistisk hverdagsvåben.",
    criteria: [
      {
        title: "Setup under 60 sekunder",
        description:
          "Hvis maskinen skal rulles frem, samles eller “lige findes”, vinder Netflix. Vælg grej der står klar, eller foldes væk på under et minut.",
      },
      {
        title: "Høj intensitet pr. minut",
        description:
          "Airbike og romaskine leverer mere work på 20 minutter end de fleste rolige cykelpas. Til forældre er det ofte forskellen på “nåede det” og “nåede det ikke”.",
      },
      {
        title: "Børn, snore og nysgerrighed",
        description:
          "Kabelfri cardio er enklere end kabeltårne midt i legezonen. Sluk, tag sikkerhedsnøgle af løbebånd, og overvej fold/opbevaring når maskinen ikke bruges. Små hænder + svinghjul = nej.",
      },
      {
        title: "Støj vs. putterutine",
        description:
          "Airbike er effektiv — og højrøstet. Magnet-romaskine er venligere ved sen putning. Match maskine til hvornår på dagen du træner.",
      },
      {
        title: "Deling i husstanden",
        description:
          "Kan både dig og partneren bruge den uden 10 minutters justering? Spin/romaskine/airbike er typisk hurtigere at skifte end en finjusteret hometrainer.",
      },
    ],
    products: [
      {
        id: "fam-a1000",
        name: "Odin A1000 Airbike",
        badge: "Mest effekt på 20 min",
        summary:
          "Når vinduet er lille, og du vil have all-out HIIT: arme + ben, ingen “skjult gearing”. A1000 er allround airbike til hjemmet — forudsat støj er OK (kælder, hus, eller dagtimer).",
        rating: 4.8,
        pros: [
          "Ekstremt effektivt på korte pas",
          "Helkrop uden teknik-kurve som roning",
          "Klar midrange til jævnlig HIIT",
          "Nem at “bare sætte sig”",
        ],
        cons: [
          "Støjer — dårligt ved putning",
          "Ikke lejligheds-first",
          "Kræver svedtolerance og gulvplads",
        ],
        specs: [
          { label: "Type", value: "Airbike" },
          { label: "Segment", value: "Midrange" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:12006",
      },
      {
        id: "fam-r10",
        name: "Titan LIFE Rower R10",
        badge: "Bedst stille helkrop",
        summary:
          "20 minutters roning træner hele kroppen med lavere støj end airbike. R10 er budget-magnet — fin til aftener, hvor huset sover, og du stadig vil have effekt.",
        rating: 4.3,
        pros: [
          "Helkrop på kort tid",
          "Støjsvagere end airbike",
          "Lav indgangspris",
          "Ofte nem at pakke/rejse",
        ],
        cons: [
          "Teknik for at skåne lænd",
          "Fylder i længden i brug",
          "Mindre “wow” end airbike-HIIT",
        ],
        specs: [
          { label: "Type", value: "Magnet-romaskine" },
          { label: "Segment", value: "Budget" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2801",
      },
      {
        id: "fam-irun",
        name: "Reebok i-Run 4.5 Løbebånd",
        badge: "Bedst til at pakke væk",
        summary:
          "Når stuen er legeplads om dagen: foldbart løbebånd der kan rulles ind under møbler. Praktisk familie-cardio — husk sikkerhedsnøgle og opsyn.",
        rating: 4.5,
        pros: [
          "Foldes fladt væk",
          "Transporthjul",
          "Færdigsamlet hos partner",
          "Gang/jog når vinduet er der",
        ],
        cons: [
          "Skal faktisk foldes væk",
          "Støj ved løb",
          "Ikke til hård interval hver dag",
        ],
        specs: [
          { label: "Type", value: "Foldbart løbebånd" },
          { label: "Feature", value: "Flad fold" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:15828",
      },
      {
        id: "fam-a800",
        name: "Odin A800 Airbike",
        badge: "Bedst til prisen (HIIT)",
        summary:
          "Vil I teste airbike-vanen uden midrange-pris? A800 er entry til 20-minutters intervaller. Opgrader til A1000, hvis den bliver husets favorit.",
        rating: 4.3,
        pros: [
          "Laveste seriøse airbike-indgang",
          "Samme HIIT-idé som dyrere",
          "God til at afprøve familie-vanen",
          "Skarp pris",
        ],
        cons: [
          "Mindre raffineret end A1000",
          "Stadig støjende",
          "Opgrader ved hård daglig brug",
        ],
        specs: [
          { label: "Type", value: "Airbike" },
          { label: "Segment", value: "Budget" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:15467",
      },
    ],
    howToChoose:
      "Træner du mens børn sover, og støj er hard no? Titan R10 (eller støjsvag romaskine-guide). Har I hus/kælder og vil have max på 20 min? Odin A1000 (A800 på budget). Skal stuen ryddes hver dag? Reebok i-Run 4.5. Ny i træning? Læs Nytårsforsæt-guiden først — køb ikke airbike som symbol. Shop via “Se pris”.",
    learningSections: [
      {
        heading: "20-minutters pas der virker",
        paragraphs: [
          "Eksempel airbike: 5 min let, 10× (40 sek hårdt / 20 sek let), 5 min ned. Eksempel romaskine: 3 min teknik, 12 min jevn zone-2/3, 5 min rolig. Det behøver ikke være fancy — det behøver at ske.",
          "Put træningen i kalenderen som “møde med dig selv” lige efter putning eller før børnene står op.",
        ],
      },
      {
        heading: "Børnesikring uden at overdrive",
        paragraphs: [
          "Fjern sikkerhedsnøgler. Træk stik ud på motoriserede maskiner. Undgå kabler i legelinjer. Lær børn at maskinen ikke er legeredskab. Fold væk, når I kan — synlig maskine midt i gulvet er en invitation.",
        ],
      },
      {
        heading: "Par-træning uden dobbelt maskine",
        paragraphs: [
          "Én airbike/romaskine + stopur: den ene kører intervaller, den anden laver gulvstyrke (se begynder-must-haves), byt. To maskiner er luksus — system er nødvendighed.",
        ],
        comparison: {
          caption: "Familie-maskiner",
          rowHeaderLabel: "Behov",
          columns: ["Airbike", "Romaskine", "Foldbart bånd"],
          rows: [
            {
              label: "Effekt / 20 min",
              cells: ["Meget høj", "Høj", "Mellem–høj"],
            },
            {
              label: "Støj",
              cells: ["Høj", "Lav–middel", "Middel–høj"],
            },
            {
              label: "Pak væk",
              cells: ["Sjældent", "Ofte muligt", "Ja"],
            },
            {
              label: "Putte-venlig",
              cells: ["Nej", "Bedre", "Afhænger af tempo"],
            },
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Hvilken træningsmaskine er bedst til travle forældre?",
        answer:
          "Airbike eller romaskine, hvis du vil have mest på 20 minutter. Vælg romaskine (magnet), hvis støj og putning styrer hverdagen.",
      },
      {
        question: "Er airbike farlig for børn?",
        answer:
          "Svinghjul og bevægelige dele kræver opsyn. Brug den ikke som legeredskab, og overvej placering/opbevaring uden for legezone.",
      },
      {
        question: "Kan jeg klare mig uden maskine?",
        answer:
          "Ja — håndvægte, elastik og måtte (begynder-guiden) kan fylde 20 minutter. Maskinen er til dig, der vil have cardio-effekt hurtigt.",
      },
      {
        question: "Hvad med gåbånd under hjemmearbejde?",
        answer:
          "Godt til skridt — ikke til 20-min HIIT. Se gåbånd til kontoret, hvis det er dit vindue.",
      },
      {
        question: "Hvor ser jeg priser?",
        answer:
          "Klik “Se pris” på hver anbefaling for live partnerpriser.",
      },
    ],
    relatedSlugs: [
      "bedste-airbike-2026",
      "bedste-romaskine-2026",
      "bedste-foldbare-kompakte-traeningsmaskiner-2026",
      "nytaarsforsat-undgaa-fejlkob-hjemmetraening-2026",
      "hjemmetraening-for-begyndere-foerste-90-dage",
      "airbike-eller-romaskine-vaegttab-2026",
      "bedste-stoejsvage-traeningsmaskiner-lejlighed-2026",
      "bedste-traeningsudstyr-til-par-hjemmegym-2026",
    ],
  },
  {
    slug: "traeningsmaskiner-til-daarlig-ryg-eller-knae-2026",
    title: "Træningsmaskiner til dig med dårlig ryg eller dårlige knæ",
    metaTitle:
      "Træningsmaskiner til dårlig ryg eller knæ 2026 – Skånsom cardio",
    excerpt:
      "Stødabsorbering, ergonomi og tryg indstigning: crosstrainer vs. løbebånd, siddecykel og magnet-romaskine — med live priser. Ikke medicinsk rådgivning.",
    metaDescription:
      "Træningsmaskiner til dårlig ryg eller knæ 2026. Crosstrainer vs. løbebånd, siddecykel og skånsom cardio — guide med live priser. Ikke erstatning for fysioterapi.",
    categorySlug: "crosstrainer",
    alsoCategorySlugs: ["motionscykel", "romaskine"],
    tldrPicks: [
      { productId: "ryg-rb800", label: "Bedst rygstøtte" },
      { productId: "ryg-c56", label: "Skånsom stående" },
      { productId: "ryg-r10", label: "Helkrop siddende" },
    ],
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    intro:
      "Når ryggen eller knæene protesterer, er “bare løb dig i form” ofte den dyreste idé. Forskellen på maskiner handler især om stød, støtte og hvor kontrolleret bevægelsen er. Denne guide forklarer crosstrainer vs. løbebånd, hvornår siddecykel vinder, og hvilke modeller der typisk føles tryggere. Det er produktguide — ikke diagnose. Ved akut smerte, udstråling, hævelse eller post-op: følg læge/fysioterapeut. Dybere knæfokus: Bedste knævenlig genoptræning. Senior/tryghed: Bedste træningsudstyr til seniorer.",
    criteria: [
      {
        title: "Stød: løbebånd vs. elliptisk",
        description:
          "Løbebånd (især løb) sender stød op gennem knæ, hofter og ryg. Crosstrainer holder fødderne på pedalerne — typisk langt mindre stød. Gang på bånd kan stadig fungere for nogle; sprint sjældent tidligt.",
      },
      {
        title: "Rygstøtte vs. core-krav",
        description:
          "Siddecykel med ryglæn aflaster lænden. Romaskine træner ryggen — men dårlig teknik belaster lænden. Crosstrainer kræver oprejst holdning med håndstød. Vælg efter hvad din fagperson tillader.",
      },
      {
        title: "Lav indstigning",
        description:
          "Stive knæ hader høje “klatre-op”-maskiner. Prioritér siddecykel med step-through og crosstrainer med lav indstigning (fx C35-klassen).",
      },
      {
        title: "Jævn modstand uden hakken",
        description:
          "Magnetisk modstand i små trin gør det nemmere at holde smertefri zone. Hakken og døde punkter får dig til at kompensere med ryg/knæ.",
      },
      {
        title: "Smertefri zone først",
        description:
          "Træn i det område, der er aftalt som OK. Skarp smerte = stop. Ego og “no pain no gain” hører ikke hjemme her.",
      },
    ],
    products: [
      {
        id: "ryg-rb800",
        name: "Odin RB-800 Comfort Siddecykel",
        badge: "Bedst ved rygbehov",
        summary:
          "Siddende cardio med ryglæn og lav indstigning — vores #1, når lænden skal støttes, og knæene skal bevæges uden stød. Tryghed før “sporty”.",
        rating: 4.7,
        pros: [
          "Ryglæn og comfort-sæde",
          "Skånsom for knæ ift. løb",
          "Lav indstigning",
          "Enkel at bruge dagligt",
        ],
        cons: [
          "Fylder mere end mini-cykel",
          "Ikke HIIT-spinning",
          "Stående styrke mangler",
        ],
        specs: [
          { label: "Type", value: "Siddecykel / recumbent" },
          { label: "Brand", value: "Odin" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:15031",
      },
      {
        id: "ryg-c56",
        name: "Titan Life Crosstrainer C56",
        badge: "Bedst skånsom stående",
        summary:
          "Elliptisk midrange uden løbestød. C56 er til dig, der må stå op, vil have helkrop og har brug for stabil, jævn bevægelse — ofte venligere for knæ end bånd.",
        rating: 4.8,
        pros: [
          "Meget lavt stød",
          "Stabil midrange",
          "Helkropscardio",
          "Fri fragt hos partner",
        ],
        cons: [
          "Kræver balance",
          "Ingen ryglæn",
          "Fylder mere end cykel",
        ],
        specs: [
          { label: "Type", value: "Crosstrainer" },
          { label: "Segment", value: "Midrange" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3176",
      },
      {
        id: "ryg-r10",
        name: "Titan LIFE Rower R10",
        badge: "Helkrop med forbehold",
        summary:
          "Magnet-romaskine kan være skånsom for knæ — men lænden kræver teknik (ben → core → arme). Kun hvis fagperson ikke fraråder roning. Ellers vælg siddecykel først.",
        rating: 4.3,
        pros: [
          "Lavt stød for knæ",
          "Helkrop siddende",
          "Støjsvag magnet",
          "Lav indgangspris",
        ],
        cons: [
          "Teknik kritisk for lænd",
          "Ikke hvis roning er frarådet",
          "Fylder i længden",
        ],
        specs: [
          { label: "Type", value: "Magnet-romaskine" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2801",
      },
      {
        id: "ryg-c35",
        name: "Titan Life C35 Crosstrainer",
        badge: "Lav indstigning / budget",
        summary:
          "Når budgettet er stramt, men du vil undgå løbestød: C35 med lav indstigning. Fin starter — opgrader til C56, hvis den bliver daglig hovedmaskine.",
        rating: 4.4,
        pros: [
          "Lav indstigning",
          "Skånsom elliptisk",
          "Prisvenlig",
          "Magnetmodstand",
        ],
        cons: [
          "Mindre stabil end C56",
          "Høje brugere: tjek skridtlængde",
          "Stadig balancekrav",
        ],
        specs: [
          { label: "Type", value: "Crosstrainer" },
          { label: "Feature", value: "Lav indstigning" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2792",
      },
    ],
    howToChoose:
      "Primært rygstøtte og tryghed? Odin RB-800 Comfort. Knæ + stående cardio OK? Titan C56 (C35 på budget/lav indstigning). Helkrop og god teknik? R10 — ellers vent. Dedikeret knæ-genoptræning? Se knævenlig-guiden. Crosstrainer kun til knæ? Bedste crosstrainer til dårlige knæ. Løbebånd først når du er klareret. Shop via “Se pris”.",
    learningSections: [
      {
        heading: "Crosstrainer vs. løbebånd (stød)",
        paragraphs: [
          "På løbebånd lander du (ved løb) med kraft gennem led. Dæmpning hjælper — men fjerner ikke biomekanikken. På crosstrainer glider du i en ellipse; fødderne forlader ikke pedalerne. Derfor søger mange med knæproblemer specifikt elliptisk træning.",
          "Gang på bånd med lav hastighed kan stadig være OK for nogle. Behandl løb som progression, ikke default.",
        ],
        comparison: {
          caption: "Belastningsprofil (typisk)",
          rowHeaderLabel: "Faktor",
          columns: ["Løbebånd (løb)", "Crosstrainer", "Siddecykel"],
          rows: [
            {
              label: "Stød",
              cells: ["Højt", "Meget lavt", "Meget lavt"],
            },
            {
              label: "Rygstøtte",
              cells: ["Nej", "Nej", "Ja"],
            },
            {
              label: "Balancekrav",
              cells: ["Mellem", "Mellem", "Lavt"],
            },
            {
              label: "Typisk start",
              cells: ["Senere", "Ofte tidligt", "Ofte tidligt"],
            },
          ],
        },
      },
      {
        heading: "Romaskine og lænd — ærlig tale",
        paragraphs: [
          "Roning er skånsom for knæ for mange, men lænden betaler for dårlig sekvens (arme først, rund ryg). Lær teknik, hold slaglængde fornuftig, og stop ved snurren/udstråling.",
          "Usikker? Siddecykel først. Få et OK fra fagperson, før romaskine bliver hverdag.",
        ],
      },
      {
        heading: "Ikke medicinsk rådgivning",
        paragraphs: [
          "Fitlist anbefaler produkttyper ud fra typiske behov. Vi diagnosticerer ikke diskus, artrose eller post-op-forløb. Brug guiden til at stille bedre spørgsmål til din behandler — og til at undgå åbenlyst stødende førstevalg.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er crosstrainer bedre end løbebånd for knæene?",
        answer:
          "For mange ja, fordi stødet er lavere. Individuelt — følg smertereaktion og faglig vejledning.",
      },
      {
        question: "Hvad er bedst ved dårlig lænd?",
        answer:
          "Ofte siddecykel med ryglæn. Undgå tung roning med dårlig teknik. Spørg fysioterapeut før du vælger.",
      },
      {
        question: "Kan jeg styrketræne alligevel?",
        answer:
          "Ofte ja med elastikker og kontrollerede bevægelser — se senior- og knævenlig-guides. Tunge frie vægte kan vente.",
      },
      {
        question: "Er det her lægeråd?",
        answer:
          "Nej. Det er en produkt- og købsguide. Ved smerte eller skade: sundhedsfaglig vurdering.",
      },
      {
        question: "Hvor ser jeg priser?",
        answer:
          "Klik “Se pris” på anbefalingerne for live priser fra partnerne.",
      },
    ],
    relatedSlugs: [
      "bedste-knaevenlig-genoptraening-hjemme-2026",
      "bedste-crosstrainer-til-daarlige-knae-2026",
      "bedste-traeningsudstyr-til-seniorer-2026",
      "bedste-siddecykel-2026",
      "bedste-crosstrainer-2026",
      "loebebaand-eller-crosstrainer-2026",
      "bedste-romaskine-2026",
      "hjemmetraening-for-begyndere-foerste-90-dage",
    ],
  },

  // —— C. Økonomi ——
  {
    slug: "hjemmegym-vs-fitnesscenter-regnestykke-2026",
    title: "Hjemmegym vs. fitnesscenter: Hvornår har din træningsmaskine tjent sig hjem?",
    metaTitle:
      "Hjemmegym vs. fitnesscenter 2026 – Hvornår er maskinen tjent hjem?",
    excerpt:
      "Konkret regnestykke: 2× medlemskab vs. romaskine, løbebånd eller squat-rack — break-even og hvornår hjemmetræning kan betale sig.",
    metaDescription:
      "Hjemmegym vs. fitnesscenter 2026. Regnestykke: hvornår træningsmaskinen er tjent hjem — plus anbefalinger med live priser.",
    categorySlug: "styrkemaskiner",
    alsoCategorySlugs: ["romaskine", "loebebaand"],
    recommendationsHeading: "Maskiner der ofte tjener sig hjem",
    tldrPicks: [
      { productId: "ok-valhalla", label: "Styrke-station" },
      { productId: "ok-zjet", label: "Cardio allround" },
      { productId: "ok-s72", label: "Spin hjemme" },
    ],
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    intro:
      "8.000–15.000 kr. for en maskine føles dyrt — indtil du lægger fitnesskontingent ind i Excel. Denne guide laver det simple regnestykke: hvad koster center for én eller to voksne, hvornår break-even rammer, og hvilke maskiner der typisk “tjener sig hjem” hurtigst. Tallene er illustrative (brug dine egne satser). Derefter får du konkrete modeller med live priser. Til fejlkøb: Nytårsforsæt-guiden. Til strøm: Strømforbrug-guiden.",
    criteria: [
      {
        title: "Tæl alle center-omkostninger",
        description:
          "Kontingent + startgebyr + parkering + ekstra hold/PT + tid til transport. “349 kr./md.” er ofte gulvet — ikke loftet — for en husstand.",
      },
      {
        title: "Hvor mange bruger grejet?",
        description:
          "Én person: længere break-even. To voksne: hjemmemaskinen vinder hurtigere. Børn/unge der også træner: endnu skarpere.",
      },
      {
        title: "Brugsfrekvens slår listepris",
        description:
          "En romaskine til 7.000 kr. brugt 4×/uge i 18 måneder er billig. Samme maskine brugt 4× i januar er dyr. Køb til realistisk frekvens.",
      },
      {
        title: "Center + hjemme kan sameksistere",
        description:
          "Mange beholder et billigere center til tung styrke/socialt og har cardio hjemme. Regnestykket skal matche *din* hybrid — ikke enten/eller-ideologi.",
      },
      {
        title: "Restværdi og garanti",
        description:
          "Ny maskine med garanti kan sælges brugt senere. Medlemskab har restværdi = 0. Se også brugt vs. ny.",
      },
    ],
    products: [
      {
        id: "ok-valhalla",
        name: "Odin Valhalla Home Gym Multistation 100 kg",
        badge: "Styrke — break-even",
        summary:
          "Når to voksne ellers betaler center for styrke: én 100 kg-station kan erstatte mange kabel-/maskinøvelser hjemme. Tjek loft og plads — ellers er “besparelsen” teoretisk.",
        rating: 4.8,
        pros: [
          "Høj dækning af styrkeøvelser",
          "Delbar i husstanden",
          "Ingen månedligt kontingent",
          "100 kg sweet spot",
        ],
        cons: [
          "Stor engangsinvestering",
          "Kræver rum/loft",
          "Ikke social center-energi",
        ],
        specs: [
          { label: "Type", value: "Multistation" },
          { label: "Vægtstak", value: "100 kg" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:15327",
      },
      {
        id: "ok-zjet",
        name: "Reebok ZJET Rower",
        badge: "Cardio — hurtig break-even",
        summary:
          "Én helkropsmaskine kan erstatte mange “cardio-dage” i center. Midrange-romaskine er ofte blandt de hurtigste til at tjene sig hjem ved 3–4 pas/uge.",
        rating: 4.8,
        pros: [
          "Helkrop på én maskine",
          "Lavere plads end fuldt gym",
          "Stærk midrange",
          "Fri fragt hos partner",
        ],
        cons: [
          "Teknik kræves",
          "Fylder i brug",
          "Erstatter ikke al styrketræning",
        ],
        specs: [
          { label: "Type", value: "Romaskine" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2330",
      },
      {
        id: "ok-s72",
        name: "Titan LIFE Spinning Cykel S72",
        badge: "Spin uden holdpris",
        summary:
          "Spinninghold summer hurtigt. En solid hjemme-spin kan break-even’e på under et år for én flittig bruger — og hurtigere for to.",
        rating: 4.8,
        pros: [
          "Ubegrænsede pas hjemme",
          "Ingen holdbooking",
          "Solid allround",
          "Fri fragt",
        ],
        cons: [
          "Mangler hold-energi",
          "Sadeltilvænning",
          "Støj i lejlighed",
        ],
        specs: [
          { label: "Type", value: "Spinningcykel" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2807",
      },
      {
        id: "ok-t56",
        name: "Titan LIFE Treadmill T56",
        badge: "Løb hjemme",
        summary:
          "Løbebånd er dyrere i indkøb og strøm — men sparer center + udendørs-afhængighed om vinteren. Regn strøm med (se strøm-guiden) i totalen.",
        rating: 4.8,
        pros: [
          "Løbespecifik træning",
          "Vejruafhængig",
          "Allround midrange",
          "Delbar i husstanden",
        ],
        cons: [
          "Højere pris + strøm",
          "Støj/vibration",
          "Fylder",
        ],
        specs: [
          { label: "Type", value: "Løbebånd" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3179",
      },
    ],
    howToChoose:
      "Primært styrke for to? Valhalla 100 kg (mål loft). Primært cardio allround? ZJET-romaskine. Spin-vane? S72. Løb? T56 + strøm-realisme. Usikker om du overhovedet skal købe maskine? Nytårsforsæt + begynder-90-dage. Budget-pakker: ultimative home gym / under 10k. Shop via “Se pris”.",
    learningSections: [
      {
        heading: "Basisregnestykket (eksempel)",
        paragraphs: [
          "Antag 2 voksne × 349 kr./md. = 698 kr./md. = 8.376 kr./år (uden startgebyr). En romaskine til ca. 7–9.000 kr. er teoretisk “tjent hjem” på under 1,5 år, hvis den erstatter begge medlemskaber — eller hurtigere, hvis I kun dropper ét og beholder det andet.",
          "Én person til 349 kr./md. = 4.188 kr./år. Så tager samme maskine tættere på 2 år. Justér med dine tal.",
        ],
        comparison: {
          caption: "Illustrativ break-even",
          rowHeaderLabel: "Scenarie",
          columns: ["Årlig centerpris", "Maskine 8.000 kr.", "Break-even"],
          rows: [
            {
              label: "2×349 kr./md.",
              cells: ["8.376 kr.", "Engang", "~11–12 mdr."],
            },
            {
              label: "1×349 kr./md.",
              cells: ["4.188 kr.", "Engang", "~23 mdr."],
            },
            {
              label: "2×449 kr./md.",
              cells: ["10.776 kr.", "Engang", "~9 mdr."],
            },
            {
              label: "Hybrid (behold 1)",
              cells: ["~4.200 kr. sparet", "Engang", "~2 år"],
            },
          ],
        },
      },
      {
        heading: "Hvad regnestykket *ikke* fanger",
        paragraphs: [
          "Social motivation, PT, sauna, variation i maskinpark. Omvendt: transporttid, lukketider, “jeg nåede det ikke i dag”. Sæt kroneværdi på tid, hvis du vil være ærlig.",
          "Efter break-even er hjemmemaskinen “gratis” i den forstand, at kontingentet er væk — vedligehold og strøm er dog ikke nul.",
        ],
      },
      {
        heading: "Billigste vej til positiv ROI",
        paragraphs: [
          "Start billigere (R10, S11, must-haves) hvis vanen er usikker. Opgrader når frekvensen er bevis. Det maksimerer sandsynligheden for at regnestykket holder i virkeligheden.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvornår har en træningsmaskine tjent sig hjem?",
        answer:
          "Når den erstattede centerpris (og evt. transport) overstiger købspris + strøm/vedligehold. For to medlemmer til ~349 kr./md. sker det ofte inden for 1–1,5 år på midrange-cardio.",
      },
      {
        question: "Er hjemmegym altid billigere?",
        answer:
          "Nej — ikke hvis maskinen ikke bruges, eller hvis du stadig betaler fuldt kontingent oveni uden at bruge centeret mindre.",
      },
      {
        question: "Skal jeg opsige fitness med det samme?",
        answer:
          "Ofte nej. Test hjemmevanen 60–90 dage, mens opsigelsesvarslet løber. Undgå dobbelt betaling i årevis “just in case”.",
      },
      {
        question: "Hvad med brugt maskine?",
        answer:
          "Lavere indkøb → hurtigere break-even, men højere risiko. Se brugt vs. ny-guiden.",
      },
      {
        question: "Hvor ser jeg priser?",
        answer:
          "“Se pris” på anbefalingerne viser live partnerpriser.",
      },
    ],
    relatedSlugs: [
      "stroemforbrug-loebabaand-crosstrainer-2026",
      "brugt-vs-ny-traeningsmaskine-garanti-2026",
      "nytaarsforsat-undgaa-fejlkob-hjemmetraening-2026",
      "ultimative-home-gym-budget-2026",
      "komplet-hjemmegym-under-10000-kr-2026",
      "bedste-multistation-2026",
      "bedste-romaskine-2026",
      "black-friday-januar-udsalg-traeningsmaskiner-2026",
    ],
  },
  {
    slug: "stroemforbrug-loebabaand-crosstrainer-2026",
    title: "Strømforbrug på løbebånd og crosstrainere – Hvad koster det at træne hjemme?",
    metaTitle:
      "Strømforbrug løbebånd & crosstrainer 2026 – Pris pr. træning",
    excerpt:
      "kWh-estimater for en times løb eller elliptisk træning, elpris-regnestykke og anbefaling af energivenlige (eller strømløse) maskiner.",
    metaDescription:
      "Strømforbrug på løbebånd og crosstrainer 2026. Hvad koster en times hjemmetræning i el — plus energivenlige og strømløse alternativer med live priser.",
    categorySlug: "loebebaand",
    alsoCategorySlugs: ["crosstrainer", "romaskine"],
    recommendationsHeading: "Lav-/nul-strøm og effektive valg",
    tldrPicks: [
      { productId: "el-r10", label: "Næsten ingen strøm" },
      { productId: "el-a1000", label: "Nul vægstrøm til modstand" },
      { productId: "el-c56", label: "Lavt ift. løbebånd" },
    ],
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    intro:
      "Danskere er elpris-bevidste — og motoriserede løbebånd er blandt de mest strømkrævende hjemmemaskiner. Denne guide giver grove kWh-estimater, omsætter dem til kroner ved typiske elpriser, og viser alternativer der næsten ikke trækker strøm (magnet-romaskine, airbike). Tallene er vejledende: din motor, hastighed, stigning og brugerens vægt ændrer forbruget. Brug dem til beslutning — ikke til bogholderi.",
    criteria: [
      {
        title: "Motoriseret vs. selvgenererende",
        description:
          "Løbebånd: motor trækker båndet = kontinuerligt forbrug. Mange crosstrainere/motionscykler: elektronik til computer, men magnetmodstand er lav. Airbike/mange romaskiner: din indsats er energien — computeren bruger minimalt eller batteri.",
      },
      {
        title: "Hastighed og stigning spiser watt",
        description:
          "Hurtigt løb + stigning på bånd øger motorbelastning markant ift. gang. “En time på bånd” er ikke én værdi — det er et interval.",
      },
      {
        title: "Regn elpris ind i ROI",
        description:
          "Ved 2,5 kr./kWh er 1 kWh/time ≈ 2,5 kr. pr. pas. 200 pas/år ≈ 500 kr. — småpenge ift. kontingent, men ikke nul. Se hjemmegym vs. fitness-guiden.",
      },
      {
        title: "Standby og skærme",
        description:
          "Store touchscreens og Wi-Fi kan trække, når maskinen “sover”. Træk stikket, hvis du er hårdfør — eller vælg enklere computere.",
      },
      {
        title: "Vælg sport først, strøm derefter",
        description:
          "Er du løber, kan bånd stadig være rigtigt. Er du ambivalent, er lav-/nul-strøm et godt tie-break.",
      },
    ],
    products: [
      {
        id: "el-r10",
        name: "Titan LIFE Rower R10",
        badge: "Næsten ingen strøm",
        summary:
          "Magnet-romaskine: din trækkraft er “motoren”. Computer bruger typisk meget lidt (eller batteri). Et af de bedste svar, hvis elpris er et hårdt kriterium — plus helkrop.",
        rating: 4.3,
        pros: [
          "Minimal elregning",
          "Helkropscardio",
          "Støjsvag magnet",
          "Lav indgangspris",
        ],
        cons: [
          "Teknik kræves",
          "Fylder i længden",
          "Ikke løbespecifik",
        ],
        specs: [
          { label: "Type", value: "Magnet-romaskine" },
          { label: "Strøm", value: "Minimal / batteri" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2801",
      },
      {
        id: "el-a1000",
        name: "Odin A1000 Airbike",
        badge: "Nul vægstrøm til modstand",
        summary:
          "Vindmodstand drives af dig — ingen vægstrøm til at skabe load. Computer kan bruge lidt. HIIT-effekt uden løbebånd-motor. Støj er trade-off’et.",
        rating: 4.8,
        pros: [
          "Modstand uden elmotor",
          "Høj effekt på kort tid",
          "Ingen “løbebånd-watt”",
          "Solid midrange",
        ],
        cons: [
          "Støjer",
          "Ikke lejligheds-first",
          "Computer kan stadig bruge lidt strøm",
        ],
        specs: [
          { label: "Type", value: "Airbike" },
          { label: "Strøm", value: "Primært selvgenererende" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:12006",
      },
      {
        id: "el-c56",
        name: "Titan Life Crosstrainer C56",
        badge: "Lavt ift. løbebånd",
        summary:
          "Elliptisk med magnetmodstand trækker typisk langt mindre end et motoriseret løbebånd. God mellemvej: skånsom cardio med beskeden elprofil.",
        rating: 4.8,
        pros: [
          "Lavere forbrug end bånd",
          "Skånsom for led",
          "Stabil midrange",
          "Fri fragt",
        ],
        cons: [
          "Ikke nul-strøm",
          "Fylder",
          "Elektronik stadig til stede",
        ],
        specs: [
          { label: "Type", value: "Crosstrainer" },
          { label: "Strøm", value: "Lav–middel" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3176",
      },
      {
        id: "el-t56",
        name: "Titan LIFE Treadmill T56",
        badge: "Når løb kræver motor",
        summary:
          "Ægte løbebånd *vil* bruge strøm. Vælg det for løbespecifik træning — og accepter el som driftsomkostning. Hold vedligehold i orden (se fejlfindingsguiden); en sliten motor kan trække mere.",
        rating: 4.8,
        pros: [
          "Løbespecifik",
          "Allround midrange",
          "Værdien kan stadig slå center",
          "Fri fragt",
        ],
        cons: [
          "Højest strøm blandt vores picks",
          "Støj + varme",
          "Kræver måtte og plads",
        ],
        specs: [
          { label: "Type", value: "Løbebånd" },
          { label: "Strøm", value: "Motoriseret" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3179",
      },
    ],
    howToChoose:
      "Elpris er hard constraint? R10 eller airbike (hvis støj OK). Vil have skånsom cardio med lavt forbrug? C56. Skal løbe specifikt? T56 — og budgetter el. Usikker på center vs. hjemme? Regnestykke-guiden. Shop via “Se pris”.",
    learningSections: [
      {
        heading: "Grove kWh-estimater (vejledende)",
        paragraphs: [
          "Gang på løbebånd: ofte i omegnen af 0,5–1,0 kWh/time. Jog/løb med stigning: ofte 1,0–2,0+ kWh/time afhængig af motor og belastning. Crosstrainer/motionscykel med magnet: typisk langt under — ofte i tier med “lille elektronik” plus lidt mere under belastning.",
          "Omregnet: ved 2,5 kr./kWh koster 1,2 kWh ≈ 3 kr. for en times løb. Ved 4 kr./kWh ≈ 4,8 kr. Det er ikke kontingent-niveau — men det summer, og det er et argument for strømløse alternativer hvis du er ambivalent.",
        ],
        comparison: {
          caption: "Strømprofil (typisk)",
          rowHeaderLabel: "Maskine",
          columns: ["Strøm til modstand", "Typisk profil", "El-sensitiv?"],
          rows: [
            {
              label: "Løbebånd",
              cells: ["Ja (motor)", "Højest", "Mest"],
            },
            {
              label: "Crosstrainer",
              cells: ["Nej/minimalt", "Lav–middel", "Mindre"],
            },
            {
              label: "Magnet-romaskine",
              cells: ["Nej", "Minimal", "Nej"],
            },
            {
              label: "Airbike",
              cells: ["Nej (vind)", "Minimal", "Nej"],
            },
          ],
        },
      },
      {
        heading: "Sådan regner du selv",
        paragraphs: [
          "1) Find watt/kW i manualen eller mål med en elmåler i stikkontakten. 2) kWh = kW × timer. 3) Gang med din kWh-pris (inkl. tariffer, hvis du vil være præcis). 4) Gang med pas pr. år.",
          "En elmåler til 100–200 kr. afslører mere end marketing.",
        ],
      },
      {
        heading: "Vedligehold påvirker forbrug",
        paragraphs: [
          "Et tørt, skævt eller slidt løbebånd får motoren til at arbejde hårdere. Smøring og justering (fejlfindingsguiden) er både levetid og strøm.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad koster det i strøm at løbe en time på løbebånd?",
        answer:
          "Ofte få kroner pr. time ved typiske danske elpriser — afhængig af tempo, stigning og motor. Brug 1–2 kWh som grov tommelfinger for løb, mindre for gang.",
      },
      {
        question: "Hvilke maskiner bruger mindst strøm?",
        answer:
          "Airbike og mange romaskiner/magnetcykler, hvor du selv skaber modstanden. Løbebånd bruger mest.",
      },
      {
        question: "Er crosstrainer dyr i strøm?",
        answer:
          "Typisk nej sammenlignet med løbebånd. Den er ofte et godt kompromis mellem skånsomhed og lavt forbrug.",
      },
      {
        question: "Kan jeg træne helt uden strøm?",
        answer:
          "Ja — airbike, mange romaskiner og frie vægte. Computeren kan dog stadig kræve batteri/usb på nogle modeller.",
      },
      {
        question: "Hvor ser jeg priser på maskinerne?",
        answer:
          "Klik “Se pris” — live partnerpriser.",
      },
    ],
    relatedSlugs: [
      "hjemmegym-vs-fitnesscenter-regnestykke-2026",
      "loebebaand-glider-eller-hakker-fejlfinding-2026",
      "bedste-loebebaand-2026",
      "bedste-crosstrainer-2026",
      "bedste-romaskine-2026",
      "bedste-airbike-2026",
      "vintertraening-derhjemme-bedste-maskiner-2026",
      "brugt-vs-ny-traeningsmaskine-garanti-2026",
    ],
  },

  // —— D. Fejlfinding ——
  {
    slug: "loebebaand-glider-eller-hakker-fejlfinding-2026",
    title: "Løbebåndet glider eller hakker? Sådan løser du det (og hvornår køb nyt)",
    metaTitle:
      "Løbebånd glider eller hakker 2026 – Fejlfinding & hvornår køb nyt",
    excerpt:
      "Praktisk fejlfinding: smøring med silikoneolie, båndjustering, hvornår motoren er opbrugt — og anbefaling af nye, mere vedligeholdelsesvenlige modeller.",
    metaDescription:
      "Løbebånd glider eller hakker? Fejlfindingsguide 2026: silikoneolie, båndjustering og hvornår det kan betale sig at købe nyt — plus anbefalinger med live priser.",
    categorySlug: "loebebaand",
    recommendationsHeading: "Når det bedre kan betale sig at købe nyt",
    tldrPicks: [
      { productId: "fix-t56", label: "Solid midrange" },
      { productId: "fix-7021", label: "Budget ægte bånd" },
      { productId: "fix-t66", label: "Seriøst løb" },
    ],
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    intro:
      "Glider båndet, hakker motoren, eller lugter der brændt plastik? De fleste hjemmeløbebånd kan reddes med smøring, justering og fornuftig brug — indtil de ikke kan. Denne guide er praktisk fejlfinding først, og derefter et ærligt “køb nyt”-punkt, når reservedel og tid overstiger værdien. Følg altid din models manual; træk stikket før du arbejder på maskinen. Nye anbefalinger nedenfor har live priser, hvis opgraderingen er den kloge vej.",
    criteria: [
      {
        title: "Sikkerhed først",
        description:
          "Sluk, træk stikket, og vent til alt står stille. Fingre, langt hår og løse snore hører ikke hjemme nær ruller. Brug kun smøremiddel beregnet til løbebånd (typisk 100 % silikone).",
      },
      {
        title: "Smøring før panik",
        description:
          "Tørt bånd øger friktion → motoren kæmper → hakken, overophedning, fejl. Mange “døde” bånd manglede olie. Interval står i manualen (ofte hver X timer eller måneder).",
      },
      {
        title: "Centrering og spænding",
        description:
          "Bånd der vandrer til siden eller slår folder, skal justeres med bageste bolte i små trin. For stramt = slid og motorbelastning. For løst = slip.",
      },
      {
        title: "Hvornår det er slut",
        description:
          "Brændt lugt, gentagne fejl-koder, synligt slidt dæk, lejer der larmer grovt, eller reservedelspris tæt på ny midrange → stop med at hælde penge i den.",
      },
      {
        title: "Brugt vs. ny i nød",
        description:
          "Et billigt brugt bånd uden servicehistorik kan arve samme problemer. Se brugt vs. ny-guiden, før du “redder” situationen med DBA-kup.",
      },
    ],
    products: [
      {
        id: "fix-t56",
        name: "Titan LIFE Treadmill T56",
        badge: "Bedst samlet opgradering",
        summary:
          "Når det gamle bånd er opbrugt: T56 er allround midrange til gang og løb med bedre forudsætning for jævnlig brug end mange entry-“3-i-1”. Husk måtte og smøreplan fra dag ét.",
        rating: 4.8,
        pros: [
          "Solid til jævnlig brug",
          "Allround hjemmeløbebånd",
          "Fri fragt hos partner",
          "Klar erstatning for slidt entry",
        ],
        cons: [
          "Engangsudgift",
          "Fylder",
          "Kræver stadig vedligehold",
        ],
        specs: [
          { label: "Type", value: "Løbebånd" },
          { label: "Segment", value: "Midrange" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3179",
      },
      {
        id: "fix-7021",
        name: "Ascendic 7021 Løbebånd",
        badge: "Bedst til budget-udskiftning",
        summary:
          "Skal der et ægte bånd ind uden midrange-pris? 7021 er kompakt med hældning — fornuftig “køb nyt”-indgang, når det gamle hakker terminalt, og budgettet er stramt.",
        rating: 4.3,
        pros: [
          "Lavere pris end T56/T66",
          "Automatisk hældning",
          "Kompakt",
          "Ægte løbebånd (ikke kun walking pad)",
        ],
        cons: [
          "Ikke til daglig hård interval i årevis",
          "Tjek max-hastighed/vægt",
          "Vedligehold stadig dit ansvar",
        ],
        specs: [
          { label: "Type", value: "Løbebånd" },
          { label: "Segment", value: "Budget" },
          { label: "Partner", value: "Ascendic.dk" },
        ],
        feedProductId: "Ascendic.dk:56336394781016",
      },
      {
        id: "fix-t66",
        name: "Titan LIFE Treadmill T66",
        badge: "Bedst til seriøst løb",
        summary:
          "Brændte du et underdimensioneret bånd af med intervaller? Gå et niveau op. T66 er til dig, der løber ofte og hårdt — og ikke vil gentage underkøbet.",
        rating: 4.3,
        pros: [
          "Stærkere til løbefrekvens",
          "Bedre end entry til intensitet",
          "Fri fragt",
          "Længere levetidspotentiale",
        ],
        cons: [
          "Dyrere",
          "Mere plads/vægt",
          "Overkill til ren gang",
        ],
        specs: [
          { label: "Type", value: "Løbebånd" },
          { label: "Segment", value: "Øvre mid" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3180",
      },
      {
        id: "fix-irun",
        name: "Reebok i-Run 4.5 Løbebånd",
        badge: "Når plads er problemet",
        summary:
          "Udskifter du et bånd der aldrig blev pakket væk? i-Run 4.5 foldes fladt — praktisk, hvis vedligehold og pladsrod var halvdelen af frustrationen.",
        rating: 4.5,
        pros: [
          "Foldes væk",
          "Transporthjul",
          "Færdigsamlet levering",
          "God til stue-setup",
        ],
        cons: [
          "Ikke hårdeste interval-maskine",
          "Foldmekanik skal bruges",
          "Stadig smøring nødvendig",
        ],
        specs: [
          { label: "Type", value: "Foldbart løbebånd" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:15828",
      },
    ],
    howToChoose:
      "Kan smøring + justering fikse det? Gør det først (how-to nedenfor). Motor/dæk dødt og reservedel dyr? Opgrader: T56 til allround, 7021 til budget, T66 til seriøst løb, i-Run til fold. Overvej crosstrainer/romaskine, hvis stød/støj var halvdelen af problemet (ryg/knæ-guide). Shop via “Se pris”.",
    howToSteps: [
      {
        name: "Sluk og træk stikket",
        text: "Sørg for at løbebåndet er slukket, og stikket er trukket ud, før du rører bånd, motorafdækning eller justeringsbolte.",
      },
      {
        name: "Kontrollér båndets tørhed",
        text: "Løft forsigtigt båndets kant midt på dækket. Føles undersiden tør, er smøring ofte første skridt. Brug kun silikoneolie beregnet til løbebånd — ikke WD-40.",
      },
      {
        name: "Smør efter manualen",
        text: "Påfør den anbefalede mængde under båndet i et tyndt lag (typisk langs midten), og kør maskinen i gangtempo et par minutter, så olien fordeles. Tør overskud op.",
      },
      {
        name: "Centrér båndet",
        text: "Start i lav hastighed. Vandrer båndet til én side, justér bageste bolte i små ¼-omdrejninger efter manualens retning, indtil båndet løber midt.",
      },
      {
        name: "Justér spænding",
        text: "Hvis båndet slipper eller folder, spænd let. Hvis motoren kæmper, eller båndet er svært at løfte en anelse midt på, kan det være for stramt — løsn i små trin.",
      },
      {
        name: "Evaluér om det er nok",
        text: "Persisterer hakken, fejl-koder, brændt lugt eller synligt slid efter korrekt smøring/justering, så stop. Indhent reservedelspris — eller planlæg nyt køb.",
      },
    ],
    learningSections: [
      {
        heading: "Typiske symptomer og årsager",
        paragraphs: [
          "Glider/slip: ofte for løst bånd eller slidt underside. Hakken: tørt bånd, skæv justering, svag motor under belastning. Snurren/rumlen: lejer eller dæk. Fejl-kode: se manual — kan være overophedning eller hastighedssensor.",
          "Løs én ting ad gangen, så du ved, hvad der virkede.",
        ],
      },
      {
        heading: "Hvornår køb nyt kan betale sig",
        paragraphs: [
          "Tommelfinger: hvis reparation + dit tidsforbrug > 40–50 % af prisen på et fornuftigt nyt midrange-bånd — og båndet er 5+ år / tungt brugt — så er opgradering ofte renere. Især uden reservedelsgaranti.",
          "Sammenlign med break-even i hjemmegym vs. fitness-guiden, hvis du ellers overvejer center igen.",
        ],
        comparison: {
          caption: "Reparér vs. erstat",
          rowHeaderLabel: "Situation",
          columns: ["Prøv fix", "Overvej nyt"],
          rows: [
            {
              label: "Tørt bånd",
              cells: ["Smøring", "Hvis dæk er krakeleret"],
            },
            {
              label: "Vandrer til siden",
              cells: ["Centrering", "Hvis ruller er skæve/slidte"],
            },
            {
              label: "Brændt lugt",
              cells: ["Stop med det samme", "Ofte motor/elektronik"],
            },
            {
              label: "Reservedel ≈ ny pris",
              cells: ["—", "Køb nyt midrange"],
            },
          ],
        },
      },
      {
        heading: "Forebyg næste gang",
        paragraphs: [
          "Måtte under maskinen, smøreinterval i kalenderen, undgå at stande på sidelisterne i start, og køb bånd dimensioneret til din vægt og intensitet. Underkøb er den dyreste vedligeholdelse.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvilken olie skal jeg bruge til løbebånd?",
        answer:
          "Typisk 100 % silikoneolie beregnet til løbebånd. Undgå universalspray der angriber materialer. Følg mængde i manualen.",
      },
      {
        question: "Hvor ofte skal løbebånd smøres?",
        answer:
          "Følg producenten — ofte efter et antal timer eller hver 1–3 måneder ved jævnlig brug. Tørt bånd = smør før det hakker.",
      },
      {
        question: "Kan jeg reparere motoren selv?",
        answer:
          "Kun hvis du har kompetence og manualen tillader det. El og motor er risiko. Ved tvivl: autoriseret service eller erstatning.",
      },
      {
        question: "Hvornår skal jeg købe nyt løbebånd?",
        answer:
          "Når smøring/justering ikke hjælper, reservedel er dyr, eller sikkerheden er i tvivl. Se anbefalingerne ovenfor.",
      },
      {
        question: "Hvor ser jeg priser på nye modeller?",
        answer:
          "Klik “Se pris” på anbefalingerne for live partnerpriser.",
      },
    ],
    relatedSlugs: [
      "brugt-vs-ny-traeningsmaskine-garanti-2026",
      "bedste-loebebaand-2026",
      "stroemforbrug-loebabaand-crosstrainer-2026",
      "hjemmegym-vs-fitnesscenter-regnestykke-2026",
      "reebok-i-run-4-5-loebebaand-2026",
      "ascendic-7021-loebebaand-2026",
      "loebebaand-eller-crosstrainer-2026",
      "black-friday-januar-udsalg-traeningsmaskiner-2026",
    ],
  },
  {
    slug: "brugt-vs-ny-traeningsmaskine-garanti-2026",
    title: "Brugt træningsmaskine vs. ny med garanti – Hvad skal du passe på?",
    metaTitle:
      "Brugt vs. ny træningsmaskine 2026 – Garanti, DBA & faldgruber",
    excerpt:
      "Risici ved DBA og Facebook Marketplace: manglende garanti, slidte wirer, dyr fragt — vs. fordele ved ny maskine med levering fra partner.",
    metaDescription:
      "Brugt vs. ny træningsmaskine 2026. Guide til DBA/Marketplace-risici, garanti og fragt — plus hvornår nyt køb kan betale sig, med live priser.",
    categorySlug: "styrkemaskiner",
    alsoCategorySlugs: ["loebebaand", "romaskine"],
    recommendationsHeading: "Når nyt med garanti er det sikre valg",
    tldrPicks: [
      { productId: "br-valhalla", label: "Ny multistation" },
      { productId: "br-t56", label: "Nyt løbebånd" },
      { productId: "br-zjet", label: "Ny romaskine" },
    ],
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    intro:
      "Et “kup” på DBA kan være 40 % billigere — eller en maskine uden garanti, med slidte wirer, døende motor og fragt der æder rabatten. Denne guide vægter risici ved brugt marked op mod ny køb med dansk partnerlevering og retur/garanti. Den er til dig, der overvejer brugt for at spare, eller står med et døende bånd og skal vælge vej. Til fejlfinding af bånd du allerede ejer: Løbebåndet glider eller hakker.",
    criteria: [
      {
        title: "Garanti og reservedel",
        description:
          "Ny: typisk 1–2+ års garanti og reservedelsvej. Brugt: ofte solgt “som beset”. Spørg til købsdato, kvittering og om garantien kan overdrages (sjældent).",
      },
      {
        title: "Sliddele du skal inspicere",
        description:
          "Løbebånd: dæk, dæk, motorstøj, fejl-koder. Kabler/wirer på stationer: flosser, rust. Romaskine: skinne, snor/kæde, sædehjul. Cykel: lejer, bremse/modstand.",
      },
      {
        title: "Fragt er ikke gratis",
        description:
          "En “billig” multistation 120 km væk + leje af trailer + to hjælpende venner kan koste mere end prisforskellen til ny med fri fragt.",
      },
      {
        title: "Hygiejne og historik",
        description:
          "Sved, kælderfugt, rust, cigaretrøg, manglende smøring. Bed om video af maskinen i drift — ikke kun stillbilleder.",
      },
      {
        title: "Pris vs. midrange ny",
        description:
          "Hvis brugt kun er 15–20 % under ny midrange med garanti, er ny ofte bedre. Store “kup” kræver større due diligence.",
      },
    ],
    products: [
      {
        id: "br-valhalla",
        name: "Odin Valhalla Home Gym Multistation 100 kg",
        badge: "Ny — styrke med klarhed",
        summary:
          "Brugte stationer skjuler ofte kabel- og slidproblemer. Ny Valhalla 100 kg med partnerlevering fjerner gætteriet — især når fri fragt slår DBA-logistik.",
        rating: 4.8,
        pros: [
          "Garanti og reservedelsvej",
          "Kendte 100 kg sweet spot",
          "Levering uden trailer-kaos",
          "Forudsigelig stand",
        ],
        cons: [
          "Højere pris end brugt",
          "Kræver loft/plads",
          "Samling stadig et projekt",
        ],
        specs: [
          { label: "Type", value: "Multistation" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:15327",
      },
      {
        id: "br-t56",
        name: "Titan LIFE Treadmill T56",
        badge: "Ny — løbebånd",
        summary:
          "Brugte løbebånd er blandt de mest risikable DBA-køb (motor, dæk, elektronik). T56 som ny midrange er det sikre alternativ, når det gamle hakker terminalt.",
        rating: 4.8,
        pros: [
          "Ny motor/dæk",
          "Garanti",
          "Allround til hjemmet",
          "Fri fragt hos partner",
        ],
        cons: [
          "Dyrere end brugt entry",
          "Stadig vedligehold",
          "Fylder",
        ],
        specs: [
          { label: "Type", value: "Løbebånd" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3179",
      },
      {
        id: "br-zjet",
        name: "Reebok ZJET Rower",
        badge: "Ny — romaskine",
        summary:
          "Brugte romaskiner kan være OK, hvis skinne og snor er friske — men ny ZJET fjerner tvivl om tidligere overbelastning og manglende dele.",
        rating: 4.8,
        pros: [
          "Kendt midrange",
          "Garanti",
          "Helkropscardio",
          "Fri fragt",
        ],
        cons: [
          "Dyrere end brugt budget",
          "Fylder i brug",
          "Teknik kræves",
        ],
        specs: [
          { label: "Type", value: "Romaskine" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2330",
      },
      {
        id: "br-s72",
        name: "Titan LIFE Spinning Cykel S72",
        badge: "Ny — spinning",
        summary:
          "Brugte spin bikes med løse lejer og slidte sadler er almindelige. S72 ny er forudsigelig til jævnlig brug — og undgår “næsten gratis” maskiner uden reservedel.",
        rating: 4.8,
        pros: [
          "Solid allround",
          "Garanti",
          "Nem levering ift. station",
          "Fri fragt",
        ],
        cons: [
          "Højere pris end brugt S11-class",
          "Sadeltilvænning",
          "Støj",
        ],
        specs: [
          { label: "Type", value: "Spinningcykel" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2807",
      },
    ],
    howToChoose:
      "Brugt kun hvis du kan se den i drift, inspicere sliddele, og totalpris inkl. fragt stadig er markant under ny. Ellers: køb ny midrange med garanti — T56/ZJET/S72/Valhalla efter behov. Fejlfinder du et bånd du ejer? Smør/justér først. Udsalg på ny? Black Friday & januar-guiden. Shop via “Se pris”.",
    learningSections: [
      {
        heading: "DBA/Marketplace-checkliste",
        paragraphs: [
          "Bed om: købsår, mærke/model, video i drift, hvorfor sælges, om røg/kælder, om original manual, om afhentning/hjælp til bil. Mød dagslys. Test alle niveauer. Ryst ikke i at gå.",
          "Betaling: undgå mærkelige depositum-scams. Store beløb = ekstra forsigtighed.",
        ],
      },
      {
        heading: "Hvornår brugt *kan* give mening",
        paragraphs: [
          "Simple styrke-redskaber (håndvægte, stativ uden komplekse kabler), næsten nye maskiner med kvittering, lokal afhentning, og synligt velholdt grej. Undgå komplekse elektronik-bånd “til halv pris” uden test.",
        ],
        comparison: {
          caption: "Brugt vs. ny",
          rowHeaderLabel: "Faktor",
          columns: ["Brugt", "Ny (partner)"],
          rows: [
            {
              label: "Pris",
              cells: ["Lavere", "Højere"],
            },
            {
              label: "Garanti",
              cells: ["Sjældent", "Ja"],
            },
            {
              label: "Fragt",
              cells: ["Dit problem", "Ofte fri/klar"],
            },
            {
              label: "Risiko",
              cells: ["Højere", "Lavere"],
            },
            {
              label: "Retur",
              cells: ["Nej", "Fortrydelsesret*"],
            },
          ],
        },
      },
      {
        heading: "Affiliate-ærlighed",
        paragraphs: [
          "Fitlist linker til danske partnere og kan tjene provision på nye køb. Derfor er guiden eksplicit om, hvornår brugt stadig kan være rationelt — så du ikke kun hører “køb nyt”.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kan man købe brugt træningsmaskine på DBA?",
        answer:
          "Ja, men inspicér i drift, regn fragt med, og accepter manglende garanti. Ved tvivl: køb ny midrange.",
      },
      {
        question: "Hvad skal jeg passe ekstra på ved brugt løbebånd?",
        answer:
          "Motorstøj, båndslid, fejl-koder, manglende smøring og om det overhovedet kan transporteres uden at dø undervejs.",
      },
      {
        question: "Er ny altid bedre?",
        answer:
          "Ikke hvis prisforskellen er enorm, og brugt er dokumenteret velholdt. Ved små prisforskelle vinder ny typisk på garanti og fragt.",
      },
      {
        question: "Hvad med garanti på brugt?",
        answer:
          "Privat salg er normalt uden. Selv om original garanti findes, kan den være personlig/ikke-overdragelig — spørg sælger og producent.",
      },
      {
        question: "Hvor ser jeg priser på nye maskiner?",
        answer:
          "Klik “Se pris” på anbefalingerne. Tjek også Tilbud under udsalg.",
      },
    ],
    relatedSlugs: [
      "loebebaand-glider-eller-hakker-fejlfinding-2026",
      "hjemmegym-vs-fitnesscenter-regnestykke-2026",
      "black-friday-januar-udsalg-traeningsmaskiner-2026",
      "nytaarsforsat-undgaa-fejlkob-hjemmetraening-2026",
      "bedste-loebebaand-2026",
      "bedste-multistation-2026",
      "bedste-romaskine-2026",
      "stroemforbrug-loebabaand-crosstrainer-2026",
    ],
  },
];
