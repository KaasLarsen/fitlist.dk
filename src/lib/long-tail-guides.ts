import type { Guide } from "./guides";

/**
 * Long-tail købsguides: situation, type-vs, bedste-til-behov + modelanmeldelse.
 * Merge’es ind i guides-arrayet fra guides.ts.
 */
export const longTailGuides: Guide[] = [
  {
    slug: "multistation-til-garage-kaelder-2026",
    title: "Multistation til garage og kælder (2026)",
    metaTitle:
      "Multistation til garage & kælder (2026) – Kulde, loftshøjde & rust",
    excerpt:
      "Home gym der kan stå i uopvarmet garage eller kælder: loftshøjde, temperatur, rust og fire multistationer med live priser.",
    metaDescription:
      "Bedste multistation til garage og kælder 2026. Guide til loftshøjde, kulde, rust og støj — plus Valhalla, TITAN og Ragnarok med live priser.",
    categorySlug: "styrkemaskiner",
    intentSlug: "multistation",
    tldrPicks: [
      { productId: "odin-valhalla-100", label: "Bedst samlet" },
      { productId: "odin-valhalla-67", label: "Bedst til prisen" },
      { productId: "odin-ragnarok-smith-144", label: "Mest seriøs" },
    ],
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    intro:
      "En multistation i stuen er ét projekt. En multistation i garage eller kælder er et andet: loftshøjde, kulde, fugt og “må den egentlig stå her hele året?”. Denne guide er til dig, der har et uopvarmet eller delvist opvarmet rum og vil have home gym-følelse uden at fylde boligen. Du får købskriterier til garage/kælder først — derefter fire konkrete stationer med live partnerpriser. Vil du have den generelle oversigt uden boligvinkel, se Bedste multistation / Home Gym 2026. Skal du måle loft til squat rack i stedet, start med Hvor højt loft skal der være til squat rack.",
    criteria: [
      {
        title: "Mål loftshøjden — før du forelsker dig i Smith",
        description:
          "Kælder og garage har ofte bjælker, skråvæg eller rør. Mål gulv til laveste punkt, og træk stationens oplyste højde fra med margin. Smith-racks og høje lat-arme er de hyppigste dealbreakers — ikke prisen. Har du under ca. 220 cm, prioriter lavere home gym uden Smith, eller se Bedste squat rack til lavt loft 2026.",
      },
      {
        title: "Temperatur og fugt er ikke marketing",
        description:
          "Uopvarmet garage svinger mellem kulde og kondens. Kabler, puder og metal tåler det bedre end elektronik på cardio-maskiner, men rust og stive kabler er reelle risici. Hold stationen væk fra direkte vandindtrængning, brug måtte/gulvbeskyttelse, og tør sved af efter pas. Se også Det ultimative udendørs home gym, hvis grejet skal stå mere “ude” end “under tag”.",
      },
      {
        title: "Støj er okay — vibration er stadig politik",
        description:
          "I garage/kælder er airbike-niveau støj ofte acceptabelt. Vægtdrop, cables der smækker og en station der “vandrer” på beton kan stadig irritere ovenpå eller naboen. Gummilag eller Floor Guards under fødderne er billig forsikring — se Bedste træningsmåtte til gulvbeskyttelse / home gym.",
      },
      {
        title: "Vægtstak efter progression, ikke ego",
        description:
          "67 kg er fin til at lære kabler. 100 kg er sweet spot for de fleste, der træner jævnligt i flere år. 144 kg + Smith er til dig, der vil have guidede squat/bænk og tungere stak — og har loft + budget. Garage-plads frister til “for stor maskine”; køb det, du realistisk bruger 3× om ugen.",
      },
      {
        title: "Bolt, niveau og adgangsvej",
        description:
          "Tjek om stationen skal boltes, om gulvet er plant, og om du kan få emballagen ind ad porten. En 300+ kg station midt i en smal kældertrappe er et dyrt problem. Planlæg samling, værktøj og en hjælper — ikke kun checkout.",
      },
    ],
    products: [
      {
        id: "odin-valhalla-100",
        name: "Odin Valhalla Home Gym Multistation 100 kg",
        badge: "Bedst samlet til garage",
        summary:
          "Sweet spot til de fleste garage-/kælder-setups: 100 kg stak, bred øvelsespalette og uden Smith-højdekrav. Det valg, vi peaker, når rummet tåler støj, men loftshøjden stadig er usikker.",
        rating: 4.8,
        pros: [
          "100 kg — holder længere end entry-stak",
          "Klassisk home gym uden Smith-kompleksitet",
          "God balance pris/øvelser/plads",
          "Nem at finde hos dansk partner",
        ],
        cons: [
          "Kræver stadig loftshøjde — mål før køb",
          "Fylder som et stort møbel",
          "Ikke guidet barbell/Smith",
        ],
        specs: [
          { label: "Vægtstak", value: "100 kg" },
          { label: "Brand", value: "Odin Valhalla" },
          { label: "Type", value: "Home gym / multistation" },
          { label: "Rum", value: "Garage / kælder / ekstra rum" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:15327",
      },
      {
        id: "odin-valhalla-67",
        name: "Odin Valhalla Home Gym Multistation 67 kg",
        badge: "Bedst til prisen",
        summary:
          "Den skarpeste indgang, når du vil teste home gym i kælderen uden at allokere Smith-budget. 67 kg er nok til vane og isolation — opgrader stak, når du vokser fra den.",
        rating: 4.3,
        pros: [
          "Laveste Valhalla-multistation-pris",
          "Samme øvelsesidé som større søskende",
          "Fin til begyndere og let/moderat brug",
          "Hurtigt skift uden skiver",
        ],
        cons: [
          "67 kg begrænser presses/rows for stærke",
          "Stadig høj — tjek loft",
          "Du kan vokse fra den på 6–18 måneder",
        ],
        specs: [
          { label: "Vægtstak", value: "67 kg" },
          { label: "Brand", value: "Odin Valhalla" },
          { label: "Type", value: "Home gym / multistation" },
          { label: "Rum", value: "Garage / kælder" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:15325",
      },
      {
        id: "titan-homegym-ii",
        name: "TITAN LIFE Home Gym II (75 kg)",
        badge: "Bedste midrange-alternativ",
        summary:
          "Når du vil have home gym med vægtstak i garage, men ikke nødvendigvis Odin-navnet. 75 kg, fri fragt hos partner og et solidt “én station”-valg til jævnlig brug.",
        rating: 4.4,
        pros: [
          "75 kg stak — midt mellem 67 og 100",
          "TITAN LIFE med fri fragt",
          "Klar home gym uden Smith",
          "God til kabel-fokuseret træning",
        ],
        cons: [
          "Stadig loft- og pladskrævende",
          "Ikke 100+ kg til tung progression",
          "Tjek øvelsesliste vs. dine mål",
        ],
        specs: [
          { label: "Vægtstak", value: "75 kg" },
          { label: "Brand", value: "TITAN LIFE" },
          { label: "Type", value: "Home gym" },
          { label: "Rum", value: "Garage / kælder" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2759",
      },
      {
        id: "odin-ragnarok-smith-144",
        name: "Odin Ragnarok Smith Rack Multistation 144 kg",
        badge: "Mest seriøs / Smith",
        summary:
          "Når garagen er høj nok, og du vil have multistation + Smith med 144 kg stak. Til dig, der træner seriøst hjemme og allerede har målt loft og adgangsvej.",
        rating: 4.3,
        pros: [
          "144 kg vægtstak — lang levetid",
          "Smith + kabel i én station",
          "Bredere øvelsesfrihed end ren home gym",
          "Odin Ragnarok-platform",
        ],
        cons: [
          "Dyr og tung at få på plads",
          "Kræver mere loft og gulvplads",
          "Overkill for rene begyndere",
        ],
        specs: [
          { label: "Vægtstak", value: "144 kg" },
          { label: "Brand", value: "Odin Ragnarok" },
          { label: "Type", value: "Smith rack multistation" },
          { label: "Rum", value: "Høj garage / kælder" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:15331",
      },
    ],
    howToChoose:
      "Usikker loftshøjde eller budget? Start med Valhalla 67 kg. Vil du have stakken til at holde i flere år uden Smith? Valhalla 100 kg. Vil du have TITAN midt imellem? Home Gym II 75 kg. Har du høj garage og vil have Smith + tung stak? Ragnarok 144 kg. Mål altid loft og planlæg gulvbeskyttelse først. Shop via “Se pris”. Mere generelt: Bedste multistation / Home Gym 2026.",
    learningSections: [
      {
        heading: "Garage vs. kælder vs. ekstra værelse",
        paragraphs: [
          "Garage: ofte bedre loft, men mere temperatur-sving og støv. Kælder: mere stabil temperatur, men bjælker og fugt. Ekstra værelse inde: bedst for elektronik og puder — men støj og vibration bliver nabopolitik igen.",
          "Vælg rum efter det, der begrænser dig mest: centimetre i højden, eller hensyn til mennesker ovenpå. Maskinen er sekundær.",
        ],
      },
      {
        heading: "Multistation eller squat rack i garagen?",
        paragraphs: [
          "Multistation vinder, når du vil have guidede kabler uden at læsse skiver. Squat rack / power cage vinder, når fri vægt og progression med stang er målet — se Bedste power rack & squat rack 2026.",
          "Mange garage-gyms ender med begge over tid. Start med den vane, du faktisk holder: kabler tre gange ugentligt slår et tomt rack.",
        ],
      },
      {
        heading: "Vedligehold i kulde",
        paragraphs: [
          "Tør sved og kondens af metal og puder. Hold kabler fri for knæk. Undgå at lade stationen stå i direkte vand eller sne ind ad porten. En billig overtræk/presenning mellem sæsoner kan forlænge levetiden mere end endnu et tilbehør.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kan en multistation stå i uopvarmet garage?",
        answer:
          "Ja — mange gør det. Prioritér tørt underlag, måtte, og undgå direkte vand. Forvent mere vedligehold end i stuen, og mål loftshøjden før køb.",
      },
      {
        question: "Hvilken loftshøjde skal jeg have?",
        answer:
          "Det afhænger af modellen. Mål gulv til laveste punkt, træk stationens højde fra, og læg margin. Smith-racks kræver typisk mere end en ren home gym. Er loft lavt, se også squat rack til lavt loft.",
      },
      {
        question: "Valhalla 67 eller 100 kg til garage?",
        answer:
          "67 kg hvis du vil starte billigt og bygge vane. 100 kg hvis du træner jævnligt og ikke vil vokse fra stakken inden for et år. Garage-plads undskylder ikke at købe for lille stak “fordi der er plads til en større senere”.",
      },
      {
        question: "Skal jeg bolte stationen fast?",
        answer:
          "Følg producentens anvisning. På ujævn beton eller ved tung Smith-brug er bolt/ankre ofte det sikre valg. Plant underlag + måtte hjælper uanset.",
      },
      {
        question: "Hvor ser jeg aktuelle priser?",
        answer:
          "Klik “Se pris” på hver model. Pris og lager hentes live fra partner-feeds.",
      },
    ],
    relatedSlugs: [
      "bedste-multistation-2026",
      "bedste-power-rack-squat-rack-2026",
      "squat-rack-til-lavt-loft-2026",
      "loftshoejde-til-squat-rack-2026",
      "komplet-hjemmegym-under-15000-kr-2026",
      "ultimative-udendoers-home-gym-2026",
      "bedste-traeningsmaatte-gulvbeskyttelse-home-gym-2026",
      "heavy-lifter-pakken-under-25000-kr-2026",
    ],
  },
  {
    slug: "airbike-eller-romaskine-vaegttab-2026",
    title: "Airbike eller romaskine til vægttab? (2026)",
    metaTitle:
      "Airbike vs. romaskine til vægttab (2026) – Hvad skal du vælge?",
    excerpt:
      "Airbike eller romaskine, når målet er fedttab: kalorier, led, støj, plads — og konkrete modeller med live priser.",
    metaDescription:
      "Airbike vs. romaskine til vægttab 2026. Sammenlign kalorier, HIIT, ledvenlighed og støj — plus anbefalinger med live priser fra danske partnere.",
    categorySlug: "romaskine",
    alsoCategorySlugs: ["motionscykel"],
    intentSlug: "airbike",
    recommendationsHeading: "Vores anbefalinger til vægttab",
    tldrPicks: [
      { productId: "odin-a1000", label: "Bedst til HIIT-tab" },
      { productId: "reebok-zjet", label: "Bedst allround roning" },
      { productId: "masterfit-170-rower", label: "Bedst til lejlighed" },
    ],
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    intro:
      "Når folk søger “airbike eller romaskine til vægttab”, er de sjældent i research-mode længere — de vil have den maskine, der får dem til at svede konsekvent uden at ødelægge knæ eller naboer. Begge brænder kalorier. Forskellen er intensitetstype, støj, plads og om du holder vanen. Denne guide skærer beslutningen ned: hvornår airbike vinder, hvornår romaskine er det klogere køb, og tre–fire konkrete modeller med live priser. Vil du dykke ned i hver kategori alene, se Bedste airbike 2026 og Bedste romaskine 2026.",
    criteria: [
      {
        title: "Kalorier følger intensitet — ikke maskinlogoet",
        description:
          "Airbike kan skubbe meget høje kalorietal i korte intervaller, fordi arme + ben + vindmodstand skalerer med indsats. Romaskine brænder også hårdt ved seriøs roning, men mange bruger den mere zone-2. Til vægttab vinder den maskine, du faktisk træner på 3–5× ugentligt — ikke den med højest marketing-kcal.",
      },
      {
        title: "HIIT vs. lav-intensitet volumen",
        description:
          "Vil du have 10–20 minutters hårde blokke? Airbike er bygget til det. Vil du have længere, jævnere pas med mindre “jeg dør”-følelse? Romaskine (især magnet) er ofte lettere at holde. Begge kan gøre begge dele — men designet trækker dig i hver sin retning.",
      },
      {
        title: "Led, ryg og teknik",
        description:
          "Romaskine belaster knæ mindre end løb, men kræver fornuftig teknik (hæng ikke i lænden). Airbike er skånsom ift. løbestød, men sadle + høje watt kan irritere skuldre/nakke, hvis du “hæver dig” i hver sprint. Har du knæproblemer ved løb, er begge bedre end løbebånd — se også Bedste knævenlig genoptræning hjemme.",
      },
      {
        title: "Støj afgør boligen",
        description:
          "Airbike er en vifte. I lejlighed om aftenen er det ofte et hard no. Magnet-romaskine er langt mere lejlighedsvenlig; vand og luft larmer mere. Garage/kælder? Airbike får pludselig mening. Se Bedste støjsvage træningsmaskiner til lejligheden, hvis naboer er dealbreakeren.",
      },
      {
        title: "Plads: footprint vs. skinnelængde",
        description:
          "Airbike fylder som en cykel med arme. Romaskine kræver længde i brug (ofte 2+ m) — medmindre den kan rejses lodret efter pas (fx Masterfit 170). Mål rummet, før du køber “den der brænder flest kcal”.",
      },
    ],
    products: [
      {
        id: "odin-a1000",
        name: "Odin A1000 Airbike",
        badge: "Bedst til HIIT-vægtab",
        summary:
          "Når målet er korte, hårde pas der får pulsen i vejret: A1000 er vores allround airbike til hjemme-HIIT uden Assault-premium. Bedst i hus, garage eller rum der tåler vifte-lyd.",
        rating: 4.8,
        pros: [
          "Høj intensitet på kort tid",
          "Arme + ben i samme pas",
          "Selvskalerende vindmodstand",
          "Skarp midrange-pris ift. Assault",
        ],
        cons: [
          "Støjer — ikke lejligheds-first",
          "Kræver accept af “jeg dør”-intervaller",
          "Ikke ideel til stille zone-2 aften",
        ],
        specs: [
          { label: "Type", value: "Airbike / vindmodstand" },
          { label: "Brand", value: "Odin" },
          { label: "Bedst til", value: "HIIT / fedttab-intervaller" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:12006",
      },
      {
        id: "reebok-zjet",
        name: "Reebok ZJET Rower",
        badge: "Bedst allround roning",
        summary:
          "Når du vil have helkropscardio til vægttab uden airbike-støj: ZJET er et stærkt midrange-valg til regelmæssig roning — længere pas, mere muskelarbejde, mere bæredygtig vane for mange.",
        rating: 4.8,
        pros: [
          "Helkrop uden løbestød",
          "God til både steady og intervaller",
          "Kendte Reebok-linjer",
          "Fri fragt hos partner",
        ],
        cons: [
          "Fylder i brug — mål skinnen",
          "Dyrere end entry Titan",
          "Tjek støjniveau ift. bolig",
        ],
        specs: [
          { label: "Type", value: "Romaskine" },
          { label: "Brand", value: "Reebok" },
          { label: "Bedst til", value: "Allround vægttab / helkrop" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2330",
      },
      {
        id: "masterfit-170-rower",
        name: "Masterfit 170 Rower",
        badge: "Bedst til lejlighed",
        summary:
          "Magnet-romaskine der kan rejses lodret — vores pick, når vægttab skal ske i etagebyggeri uden airbike-vifte. Mindre støj, fold efter pas, skarp pris. Modelguide: Masterfit 170 romaskine.",
        rating: 4.5,
        pros: [
          "Magnet — langt stillere end airbike",
          "Lodret stuvning sparer gulv",
          "Helkrop til fedttab uden nabo-krig",
          "Skarp pris i segmentet",
        ],
        cons: [
          "Ikke samme “max HIIT”-følelse som airbike",
          "Sæde på skinne kan rumle — brug måtte",
          "Tjek skinnelængde hvis du er høj",
        ],
        specs: [
          { label: "Type", value: "Romaskine / magnet" },
          { label: "Brand", value: "Masterfit" },
          { label: "Bedst til", value: "Lejlighed / støjsvag vægttab" },
          { label: "Partner", value: "Træningspartner" },
        ],
        feedProductId: "Træningspartner:01904a5eaad7714fb5635179812010a9",
      },
      {
        id: "odin-a800",
        name: "Odin A800 Airbike",
        badge: "Billigste airbike-test",
        summary:
          "Vil du teste, om airbike-HIIT er din vægttabs-motor, før du køber A1000/Assault? A800 er den skarpeste indgang — stadig støjende, stadig effektiv i korte blokke.",
        rating: 4.3,
        pros: [
          "Laveste seriøse airbike-indgang",
          "Fuld vindmodstand-oplevelse",
          "Fin til 1–2 HIIT-pas ugentligt",
          "Skarp pris hos partner",
        ],
        cons: [
          "Mindre raffineret end A1000",
          "Stadig for støjende til mange lejligheder",
          "Opgrader ved daglig hård brug",
        ],
        specs: [
          { label: "Type", value: "Airbike / vindmodstand" },
          { label: "Brand", value: "Odin" },
          { label: "Segment", value: "Budget / entry" },
          { label: "Partner", value: "Apuls.dk" },
        ],
        feedProductId: "Apuls.dk:15467",
      },
    ],
    howToChoose:
      "Har du hus/garage og elsker intervaller? Odin A1000 (eller A800 som test). Vil du have allround helkrop til vægttab uden vifte-lyd? Reebok ZJET. Bor du i lejlighed? Masterfit 170. Kalorieforbrænding følger vanen — vælg den maskine, du tænder tre gange om ugen. Shop via “Se pris”. Mere om hver kategori: Bedste airbike 2026 og Bedste romaskine 2026.",
    learningSections: [
      {
        heading: "Hvad “til vægttab” egentlig betyder",
        paragraphs: [
          "Fedttab kræver energiunderskud. Maskinen er et værktøj til at øge forbruget og holde muskelmasse med helkropsarbejde — ikke en genvej uden kost. Airbike og romaskine er begge stærke, fordi de er svære at “snyde” på: du mærker indsatsen.",
          "Prioritér ugentlig volumen du kan holde i 8–12 uger. Tre moderate romaskine-pas slår én heroisk airbike-WOD, du aldrig gentager.",
        ],
      },
      {
        heading: "Sammenligning: airbike vs. romaskine",
        paragraphs: [
          "Airbike: højere topintensitet, mere støj, mindre gulvlængde, stærk til HIIT. Romaskine: mere muskelkæde i ét træk, ofte bedre til længere pas, kræver skinnelængde, magnet er støjsvagere.",
        ],
        comparison: {
          caption: "Airbike vs. romaskine til vægttab",
          rowHeaderLabel: "Faktor",
          columns: ["Airbike", "Romaskine"],
          rows: [
            {
              label: "Kalorie-top",
              cells: ["Meget høj i korte blokke", "Høj ved seriøs roning"],
            },
            {
              label: "Vane-venlighed",
              cells: ["Kræver HIIT-motivation", "Ofte lettere lange pas"],
            },
            {
              label: "Støj",
              cells: ["Høj (vifte)", "Lav–middel (magnet bedst)"],
            },
            {
              label: "Plads",
              cells: ["Cykel-footprint", "Lang i brug / fold muligt"],
            },
            {
              label: "Lejlighed",
              cells: ["Sjældent ideel", "Magnet = stærkt match"],
            },
          ],
        },
      },
      {
        heading: "Kan du eje begge?",
        paragraphs: [
          "Ja, hvis budget og plads tillader det: airbike til HIIT-finisher, romaskine til zone-2. De fleste skal starte med én. Vælg efter bolig først — ellers bliver den “forkerte” maskine til tøjstativ.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvad brænder flest kalorier — airbike eller romaskine?",
        answer:
          "Ved maximal indsats kan airbike ofte presse højere tal på kort tid. Over en uge vinder den maskine, du bruger mest. Teknik, vægt og intensitet betyder mere end brandet.",
      },
      {
        question: "Er airbike god til vægttab i lejlighed?",
        answer:
          "Træningsmæssigt ja — praktisk ofte nej pga. støj. Vælg magnet-romaskine eller kondicykel, hvis naboer er et hard constraint.",
      },
      {
        question: "Hvad er bedst for knæene?",
        answer:
          "Begge er skånsommere end løb for mange. Romaskine kræver god teknik; airbike belaster knæ mindre end løbestød, men lyt til kroppen. Se også knævenlig genoptræning-guiden.",
      },
      {
        question: "Skal jeg vælge vand- eller magnet-romaskine til vægttab?",
        answer:
          "Til vægttab er vanen vigtigst. Magnet er stillere (lejlighed). Vand giver motivation via lyd/følelse, men mere støj. Se Bedste vandromaskine 2026 hvis du er solgt på vand.",
      },
      {
        question: "Hvor ser jeg priser?",
        answer:
          "Klik “Se pris” på hver anbefaling. Priser hentes live fra partnerne.",
      },
    ],
    relatedSlugs: [
      "bedste-airbike-2026",
      "bedste-romaskine-2026",
      "odin-a1000-airbike-2026",
      "masterfit-170-romaskine-2026",
      "bedste-traeningsudstyr-til-vaegttab-hjemme-2026",
      "romaskine-eller-crosstrainer-2026",
      "bedste-stoejsvag-romaskine-2026",
      "bedste-stoejsvage-traeningsmaskiner-lejlighed-2026",
    ],
  },
  {
    slug: "bedste-crosstrainer-til-daarlige-knae-2026",
    title: "Bedste crosstrainer til dårlige knæ (2026)",
    metaTitle:
      "Bedste crosstrainer til dårlige knæ (2026) – Skånsom cardio",
    excerpt:
      "Elliptisk træning når knæene protesterer: lav indstigning, skridtlængde, stabilitet — og fire anbefalinger med live priser.",
    metaDescription:
      "Bedste crosstrainer til dårlige knæ 2026. Guide til ledvenlig elliptisk træning: lav indstigning, skridtlængde og stabilitet — plus anbefalinger med live priser.",
    categorySlug: "crosstrainer",
    intentSlug: "stoejsvag",
    tldrPicks: [
      { productId: "titan-c56", label: "Bedst samlet" },
      { productId: "titan-c35", label: "Bedst lav indstigning" },
      { productId: "tunturi-c60", label: "Bedst premium" },
    ],
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    intro:
      "Dårlige knæ og løbebånd er ofte en dårlig kombination: stød, acceleration og “jeg prøver lige at løbe alligevel”. Crosstraineren (elliptisk) holder fødderne i kontakt med pedalerne og fjerner meget af stødbelastningen — derfor søger mange specifikt “crosstrainer til dårlige knæ”. Denne guide fokuserer på det, der faktisk hjælper: lav indstigning, jævn skridtlængde, stabil ramme og ærlig forventningsafstemning. Du får kriterier først, derefter fire modeller med live priser. Generel kategori: Bedste crosstrainer 2026. Bredere genoptræningsvinkel: Bedste knævenlig genoptræning hjemme.",
    criteria: [
      {
        title: "Lav indstigning — ikke kun “skånsom” i overskriften",
        description:
          "Jo lavere du skal løfte benet for at komme på maskinen, jo lettere er det med stive eller ømme knæ. Titan Life C35 fremhæver lav indstigning af en grund. Tjek også, om du kan støtte dig sikkert ved påstigning.",
      },
      {
        title: "Skridtlængde der matcher din krop",
        description:
          "For kort skridtlængde giver hakket bevægelse og irriterede knæ/hofter. For høj brugere: prioriter midrange/premium (C56/C60-klassen) frem for den billigste kompakt-model. Prøv bevægelsen i hovedet: jævn ellipse > “mini-step”.",
      },
      {
        title: "Stabilitet slår blinkende skærme",
        description:
          "En vaklende ramme får dig til at spænde unaturligt i knæ og ankler. Vægt, fodplader og solid stander er vigtigere end tablet-holder. Til knæproblemer er “kedelig og stabil” et feature.",
      },
      {
        title: "Modstand du kan dosere",
        description:
          "Start let. Magnetmodstand med mange niveauer gør det nemmere at holde zone 2 uden at presse gennem smerte. Intervall-jagd er ikke målet i genoptræningsfasen — konsistens er.",
      },
      {
        title: "Smertskala og lægefaglig fornuft",
        description:
          "Fitlist er ikke din fysioterapeut. Skarp smerte, hævelse eller ustabilitet = stop og få faglig vurdering. Crosstraineren er et værktøj til skånsom cardio — ikke en erstatning for diagnose.",
      },
    ],
    products: [
      {
        id: "titan-c56",
        name: "Titan Life Crosstrainer C56",
        badge: "Bedst samlet",
        summary:
          "Solid midrange til dig, der vil have jævn elliptisk træning flere gange om ugen uden at hoppe i premium-Tunturi. Stabilitet og daglig brugbarhed — vores hovedanbefaling til de fleste med knæhensyn.",
        rating: 4.8,
        pros: [
          "Stabil Titan Life midrange",
          "God til jævnlig skånsom cardio",
          "Klar anbefaling til de fleste hjem",
          "Fri fragt hos partner",
        ],
        cons: [
          "Fylder mere end en cykel",
          "Ikke det billigste i kategorien",
          "Høje brugere bør tjekke skridtlængde",
        ],
        specs: [
          { label: "Drive", value: "Baghjul (typisk hjemme)" },
          { label: "Brand", value: "Titan Life" },
          { label: "Segment", value: "Midrange" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3176",
      },
      {
        id: "titan-c35",
        name: "Titan Life C35 Crosstrainer",
        badge: "Bedst lav indstigning",
        summary:
          "Prisvenlig indgang med lav indstigning — relevant, når knæene gør det besværligt at “klatre” op på maskinen. Fin starter til at bygge vane uden stor investering.",
        rating: 4.3,
        pros: [
          "Lav indstigning — nemmere at komme på",
          "Lav indgangspris",
          "Stabil entry til hjemmet",
          "Fri fragt hos partner",
        ],
        cons: [
          "Færre premium-detaljer end C56/C60",
          "Ikke ideel til hård interval hvert pas",
          "Tjek skridtlængde hvis du er høj",
        ],
        specs: [
          { label: "Drive", value: "Baghjul (typisk)" },
          { label: "Brand", value: "Titan Life" },
          { label: "Feature", value: "Lav indstigning" },
          { label: "Segment", value: "Budget" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2792",
      },
      {
        id: "crosstrainer-2i1",
        name: "Crosstrainer billig (2 i 1)",
        badge: "Bedst til trang plads",
        summary:
          "Når plads og pris vejer tungt, og du stadig vil have elliptisk bevægelse frem for løb. Kompromis på stabilitet — gevinst på footprint. Opgrader til C56, når vanen er beviselig.",
        rating: 4.4,
        pros: [
          "Skarp pris",
          "2-i-1-fleksibilitet",
          "Relevant i små hjem",
          "Nem indgang til elliptisk træning",
        ],
        cons: [
          "Mindre stabilitet end dedikerede midrange",
          "Færre finjusteringer",
          "Ikke førstevalg ved alvorlige knæproblemer",
        ],
        specs: [
          { label: "Type", value: "2-i-1 / kompakt" },
          { label: "Segment", value: "Budget / plads" },
          { label: "Partner", value: "Billig-fitness.dk" },
        ],
        feedProductId: "Billig-fitness.dk:42506598514859",
      },
      {
        id: "tunturi-c60",
        name: "Tunturi C60 Signature Crosstrainer",
        badge: "Bedst premium",
        summary:
          "Når crosstraineren er din primære cardio i årevis, og knæene kræver den jævneste følelse, du kan få. Mere maskine, mere stabilitet — til dig, der allerede ved, at elliptisk træning virker.",
        rating: 4.9,
        pros: [
          "Premium Tunturi Signature-linje",
          "Bedre til hyppig, langvarig brug",
          "Jævnere træningsfølelse",
          "Fri fragt hos partner",
        ],
        cons: [
          "Markant højere pris",
          "Overkill, hvis du træner sjældent",
          "Kræver plads og et fast “hjem”",
        ],
        specs: [
          { label: "Drive", value: "Baghjul / premium build" },
          { label: "Brand", value: "Tunturi" },
          { label: "Segment", value: "Premium" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3249",
      },
    ],
    howToChoose:
      "Usikker og vil have lav indstigning billigt? Titan Life C35. Træner du flere gange om ugen med knæhensyn? C56. Trang plads? 2-i-1 — men opgrader, hvis maskinen vakler. Er elliptisk din hovedcardio i årevis? Tunturi C60. Start altid let på modstanden. Shop via “Se pris”. Se også Bedste crosstrainer 2026 og Bedste knævenlig genoptræning hjemme.",
    learningSections: [
      {
        heading: "Hvorfor crosstrainer ofte er venligere end løbebånd",
        paragraphs: [
          "På løbebånd lander du med stød. På crosstrainer glider foden i en ellipse — mindre peak-belastning for mange knæ. Det er derfor fys-afdelinger og genoptræning ofte peger på elliptisk eller cykel før løb.",
          "Det betyder ikke “træn gennem smerte”. Det betyder: du har et værktøj til at holde konditionen, mens knæene får ro fra impact.",
        ],
      },
      {
        heading: "Crosstrainer vs. motionscykel vs. romaskine",
        paragraphs: [
          "Cykel er ofte endnu mere knævenlig for nogle, især med korrekt saddelhøjde — se Bedste motionscykel 2026. Romaskine er helkrop og skånsom ift. løb, men kræver teknik. Crosstrainer vinder, når du vil stå oprejst og have arme med i bevægelsen uden stød.",
        ],
      },
      {
        heading: "Sådan starter du de første 2 uger",
        paragraphs: [
          "8–15 minutter, lav modstand, fokus på glidende bevægelse. Øg tid før intensitet. Stop ved skarp smerte. Kombinér gerne med mobilitet og styrke omkring hofte/lår — maskinen er kun én brik.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er crosstrainer godt for dårlige knæ?",
        answer:
          "For mange ja — mindre stød end løb. Individuelt: lyt til smerte og få faglig vurdering ved usikkerhed. Start med lav modstand og kort varighed.",
      },
      {
        question: "Hvad er vigtigst: lav indstigning eller skridtlængde?",
        answer:
          "Begge. Lav indstigning hjælper dig på maskinen. Skridtlængde afgør, om bevægelsen føles jævn. Er du høj, prioriter skridtlængde/stabilitet (C56/C60) frem for den billigste kompakt.",
      },
      {
        question: "Crosstrainer eller motionscykel til knæ?",
        answer:
          "Cykel er ofte det sikreste valg ved meget irriterede knæ. Crosstrainer, hvis du vil stå og have mere helkropsfølelse uden løbestød. Prøv den bevægelse, der føles mildest.",
      },
      {
        question: "Kan jeg lave intervaller med dårlige knæ?",
        answer:
          "Først byg base med let, jævn cardio. Intervall kun hvis det ikke øger smerte næste dag. Genoptræning er ikke CrossFit-WOD.",
      },
      {
        question: "Hvor ser jeg priser?",
        answer:
          "Klik “Se pris” på hver model. Pris og lager hentes live fra partnerne.",
      },
    ],
    relatedSlugs: [
      "bedste-crosstrainer-2026",
      "bedste-knaevenlig-genoptraening-hjemme-2026",
      "bedste-motionscykel-2026",
      "bedste-siddecykel-2026",
      "loebebaand-eller-crosstrainer-2026",
      "romaskine-eller-crosstrainer-2026",
      "bedste-stoejsvag-crosstrainer-2026",
      "bedste-traeningsudstyr-til-seniorer-2026",
    ],
  },
  {
    slug: "masterfit-170-romaskine-2026",
    title: "Masterfit 170 romaskine — anmeldelse (2026)",
    metaTitle:
      "Masterfit 170 romaskine anmeldelse (2026) – Er den pengene værd?",
    excerpt:
      "Uafhængig modelguide til Masterfit 170 Rower: magnet, fold, støj, hvem den passer til — og live pris hos partner.",
    metaDescription:
      "Masterfit 170 romaskine anmeldelse 2026. Er den pengene værd? Magnetmodstand, lodret fold, støj og lejlighedsbrug — live pris hos Træningspartner.",
    categorySlug: "romaskine",
    intentSlug: "foldbar",
    kind: "modelguide",
    recommendationsHeading: "Modellen",
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    intro:
      "Masterfit 170 Rower dukker op igen og igen i vores lejligheds-, fold- og støjguides — fordi den løser et konkret job: magnet-roning der kan rejses lodret efter pas, uden Concept2-pris eller airbike-vifte. Denne modelguide handler kun om 170’eren: hvem den er pengene værd for, hvor den kompromitterer, og hvornår du skal op i Reebok ZJET, Ascendic 6004 eller Odin R1800 i stedet. Vil du sammenligne flere foldbare romaskiner, se Bedste foldbare romaskine 2026.",
    criteria: [
      {
        title: "Ja — hvis du bor i lejlighed og vil have helkrop",
        description:
          "Magnetmodstand er langt stillere end luft-romaskine og airbike. Du får roning uden at erklære krig mod underboen — især med måtte under skinnen.",
      },
      {
        title: "Ja — hvis skinnen ikke må eje stuen",
        description:
          "170’eren rejses lodret efter brug. Det er halvdelen af værdien: maskinen skal kunne forsvinde, ellers dør vanen. Tjek greb, hjul og loft til lodret stuvning.",
      },
      {
        title: "Ja — hvis budgettet er stramt, men disciplinen er roning",
        description:
          "Du vil ikke betale midrange-Reebok eller træ-vand før du ved, at roning er din grej. Masterfit 170 er en ærlig indgang med fold.",
      },
      {
        title: "Nej — hvis du vil have vand- eller luft-følelse",
        description:
          "Magnet er jævn og stille — ikke “båd” eller “vifte”. Vil du have vandlyd, se Odin R1800 vandromaskine. Vil du have luft, se AirRow / luftmodstand i Bedste romaskine 2026 — og accepter mere støj.",
      },
      {
        title: "Nej — hvis du er meget høj og skinnen føles kort",
        description:
          "Kompakte/foldbare modeller kan begrænse benudstræk. Er du høj, prioriter skinnelængde og brugermål før den billigste fold. Tjek specs hos partner før køb.",
      },
    ],
    products: [
      {
        id: "masterfit-170-rower",
        name: "Masterfit 170 Rower",
        badge: "Modelguide",
        summary:
          "Magnet-romaskine med lodret stuvning — Fitlists go-to, når fold + støjsvag helkrop skal mødes til skarp pris. Ærligt budget-/lejlighedsvalg: godt til vane og plads, ikke til pro-vandstemning eller CrossFit-luft. Live pris hos Træningspartner.",
        rating: 4.5,
        pros: [
          "Magnetmodstand — lejlighedsvenlig",
          "Lodret fold / stuvning sparer gulv",
          "Helkrop uden løbestød",
          "Skarp pris i fold-segmentet",
          "Hyppigt anbefalet i vores støj- og pladsguides",
        ],
        cons: [
          "Ikke vand- eller luft-følelse",
          "Sæde på skinne kan give let rumlen — brug måtte",
          "Brugslængde kræver stadig plads under pas",
          "Høje brugere skal tjekke skinnelængde",
        ],
        specs: [
          { label: "Type", value: "Romaskine / magnet" },
          { label: "Brand", value: "Masterfit" },
          { label: "Opbevaring", value: "Lodret / fold" },
          { label: "Segment", value: "Budget / stille / fold" },
          { label: "Partner", value: "Træningspartner" },
        ],
        feedProductId: "Træningspartner:01904a5eaad7714fb5635179812010a9",
      },
    ],
    howToChoose:
      "Er Masterfit 170 pengene værd? Ja, hvis du vil have stille, foldbar roning til lejlighed eller lille stue uden at betale midrange. Nej, hvis du allerede ved, at du vil have vandstemning (Odin R1800), merkevare-midrange (Reebok ZJET) eller magnet-allround uden fold-fokus (Ascendic 6004). Shop via “Se pris”. Sammenlign fold: Bedste foldbare romaskine 2026. Støj: Bedste støjsvag romaskine 2026.",
    learningSections: [
      {
        heading: "Hvad 170’eren egentlig er",
        paragraphs: [
          "Masterfit 170 er en magnet-romaskine med fokus på hjemmebrug: modstand uden ventilator, og en fold/lodret stuvning der giver stuen tilbage. Den er ikke positioneret som Concept2-erstatning til club-roning — den er positioneret som “jeg vil ror hjemme uden at fylde rummet”.",
          "På Fitlist bruger vi den som kompakt- og støjpick, fordi jobbet er klart: helkrop, stille nok til etagebyggeri, pak væk efter pas.",
        ],
      },
      {
        heading: "Er den pengene værd?",
        paragraphs: [
          "Pengene er værd, når alternativet er enten (a) ingen maskine pga. plads/støj, eller (b) en dyrere romaskine du ikke har plads til at lade stå. Så er 170’eren et værktøj der faktisk bliver brugt.",
          "Pengene er mindre værd, hvis du allerede træner roning seriøst flere gange ugentligt og savner finere modstands-/monitor-oplevelse — så er midrange (ZJET) eller specialiseret vand/luft det næste skridt, ikke flere features på entry-fold.",
        ],
      },
      {
        heading: "Støj, måtte og lejlighed",
        paragraphs: [
          "Magnet fjerner vifte-lyden. Sædehjul på skinnen kan stadig sende strukturel lyd ned i gulvet. Brug underlagsmåtte, og undgå sen aften-sprint hvis underboen er sensitiv. Mere kontekst: Bedste støjsvage træningsmaskiner til lejligheden.",
        ],
      },
      {
        heading: "Masterfit 170 vs. typiske alternativer",
        paragraphs: [
          "Vs. Ascendic 6004: begge magnet; 6004 er ofte “allround magnet”, 170 vinder på fold-narrativet i vores guides. Vs. Odin R1800: vandfølelse og mere lyd — anden kategori. Vs. Reebok ZJET: dyrere midrange, mere “brand allround”. Vs. airbike: helt anden støj- og HIIT-profil — se Airbike eller romaskine til vægttab.",
        ],
      },
    ],
    faqs: [
      {
        question: "Er Masterfit 170 pengene værd?",
        answer:
          "Ja til lejlighed, fold og budget-helkrop. Nej hvis du vil have vand/luft-følelse eller allerede ved, at du vil betale for midrange brand-roning.",
      },
      {
        question: "Er den støjsvag nok til lejlighed?",
        answer:
          "Magnet er blandt de stilleste romaskine-typer. Brug måtte, og vær realistisk med sæde på skinne. Den er langt mere lejlighedsvenlig end airbike eller luft-romaskine.",
      },
      {
        question: "Kan den foldes helt væk?",
        answer:
          "Den rejses lodret / foldes til opbevaring — tjek den konkrete mekanisme og dit loft. Brugslængden under pas er stadig “romaskine-lang”.",
      },
      {
        question: "Masterfit 170 eller Reebok ZJET?",
        answer:
          "170 hvis fold + pris + støj er #1. ZJET hvis du vil have et stærkere allround midrange-valg og har plads/budget. Sammenlign i Bedste romaskine 2026.",
      },
      {
        question: "Hvor ser jeg den aktuelle pris?",
        answer:
          "Klik “Se pris hos Træningspartner” på denne side. Pris og lager hentes live fra partner-feedet.",
      },
    ],
    relatedSlugs: [
      "bedste-foldbar-romaskine-2026",
      "bedste-stoejsvag-romaskine-2026",
      "bedste-romaskine-2026",
      "bedste-kompakt-romaskine-2026",
      "ascendic-6004-romaskine-2026",
      "odin-r1800-vandromaskine-2026",
      "airbike-eller-romaskine-vaegttab-2026",
      "bedste-stoejsvage-traeningsmaskiner-lejlighed-2026",
      "bedste-foldbare-kompakte-traeningsmaskiner-2026",
    ],
  },
];
