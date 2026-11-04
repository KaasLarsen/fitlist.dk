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
  /** Stabilt FeedProduct.id — live pris/URL fra Partner-Ads-kataloget */
  feedProductId?: string;
  /** Id fra lib/affiliates.ts — valgfri fallback */
  affiliateId?: string;
};

export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  /** Meta description — lidt længere end excerpt når det er relevant */
  metaDescription: string;
  /** Matcher MachineCategory.slug */
  categorySlug: string;
  publishedAt: string;
  updatedAt: string;
  intro: string;
  criteria: GuideCriterion[];
  products: GuideProduct[];
  howToChoose: string;
  learningSections: GuideSection[];
  faqs: GuideFaq[];
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
 * Top 3 SEO-guides: løbebånd, romaskine, motionscykel.
 * Anbefalinger kobles til Partner-Ads via feedProductId (live pris + CTA).
 */
export const guides: Guide[] = [
  {
    slug: "bedste-loebebaand-2026",
    title: "Bedste løbebånd 2026",
    excerpt:
      "Sådan vælger du løbebånd til hjemmet — plads, motor, støj og fire konkrete anbefalinger med aktuelle priser.",
    metaDescription:
      "Find det bedste løbebånd til hjemmet i 2026. Guide til motor, plads, støj og budget — plus fire anbefalede modeller med live priser fra danske webshops.",
    categorySlug: "loebebaand",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    intro:
      "Et løbebånd er ofte den mest direkte vej til bedre kondition hjemme: du træner, når vejret, tidspunktet eller børnene ellers ville stoppe dig. Markedet er fyldt med modeller, der ser ens ud på papiret — men føles meget forskellige i stuen. Denne guide giver dig kriterierne først, fire konkrete anbefalinger med shop-links til vores partnere, og svar på de spørgsmål, folk typisk stiller, inden de køber.",
    criteria: [
      {
        title: "Hvor ofte og hvor hårdt?",
        description:
          "Går du mest, eller skal du kunne løbe intervaller flere gange om ugen? Gang og walking pads stiller lavere krav til motor og dæmpning. Jævnligt løb kræver typisk stærkere motor, længere løbeflade og bedre støddæmpning — ellers bliver båndet både støjende og slidt hurtigere.",
      },
      {
        title: "Plads og opbevaring",
        description:
          "Mål længde, bredde og frihøjde i det rum, maskinen skal stå i — og om den skal foldes væk efter brug. Et bånd, der ikke kan pakkes væk, bliver hurtigt en permanent møbeldel. Tjek også vægt og om der er hjul, så du kan flytte det uden at ødelægge gulvet.",
      },
      {
        title: "Motor og løbeflade",
        description:
          "Kontinuerlig motorstyrke (HK/CHP) siger mere om holdbarhed end peak-tal i marketing. Løbefladen skal være bred og lang nok til din skridtlængde: for korte flader tvinger dig til at løbe unaturligt. Til løb prioriterer du typisk længere dæk; til gang under skrivebordet kan et kompakt gåbånd være nok.",
      },
      {
        title: "Støj og naboer",
        description:
          "I lejlighed betyder støddæmpning, gummifødder og en dæmpningsmåtte mindst lige så meget som topfart. Motorstøj, båndets “klap” og dine skridt gennem gulvet er tre forskellige støjkilder. Aftenbrug? Vælg dæmpning og lavere hastighed — og overvej gåbånd frem for fuldt løbebånd.",
      },
      {
        title: "Stigning (incline)",
        description:
          "Elektronisk stigning lader dig simulere bakker uden at øge hastigheden. Det er effektivt til baller og baglår og skåner dig for at skulle løbe hurtigere for at få intensitet. Mange walking pads har manuel eller motoriseret hældning — nyttigt til kontor og gangtræning.",
      },
      {
        title: "Budget vs. levetid",
        description:
          "Billige bånd kan være fine til gang et par gange om ugen. Til jævnligt løb betaler du ofte mindre over tid ved at vælge en mere solid model første gang. Læg også fragt, montering og eventuel måtte ind i det samlede budget.",
      },
      {
        title: "Skærm, apps og motivation",
        description:
          "En simpel skærm med tid, distance og kalorier er nok for de fleste. App-tilslutning og store touchscreens er nice-to-have — de driver ofte prisen op mere end træningskvaliteten. Prioritér maskinen under fødderne, ikke understregningen på skærmen.",
      },
    ],
    products: [
      {
        id: "titan-t56",
        name: "Titan LIFE Treadmill T56",
        badge: "Bedst samlet",
        summary:
          "Et solidt allround-løbebånd til hjemmet, når du både vil gå og løbe uden at gå all-in på premium-priser. God balance mellem build, løbeflade og daglig brugbarhed.",
        pros: [
          "Allround til både gang og løb",
          "Kendte Titan LIFE-linjer med fri fragt hos partner",
          "Bedre holdbarhed end typiske entry-walking pads",
          "Klar anbefaling, hvis du træner flere gange om ugen",
        ],
        cons: [
          "Fylder mere end et rent gåbånd",
          "Ikke det billigste i kategorien",
          "Overkill, hvis du kun går under skrivebordet",
        ],
        specs: [
          { label: "Type", value: "Løbebånd (hjemme)" },
          { label: "Brug", value: "Gang + løb" },
          { label: "Segment", value: "Midrange" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3179",
      },
      {
        id: "workwalk-classic",
        name: "WorkWalk Classic Gåbånd",
        badge: "Bedste billige",
        summary:
          "Kompakt gåbånd til kontor og hjem, når budgettet er stramt, og behovet er gang — ikke sprint. Nem indgang til daglig bevægelse uden et stort fodaftryk.",
        pros: [
          "Lav indgangspris",
          "Kompakt footprint til kontor/hjem",
          "God til daglig gang og standing desk",
          "Lettere at stille væk end fuldt løbebånd",
        ],
        cons: [
          "Ikke bygget til seriøst løb",
          "Lavere max-hastighed end klassiske løbebånd",
          "Færre “gym”-features end dyrere modeller",
        ],
        specs: [
          { label: "Type", value: "Gåbånd / walking pad" },
          { label: "Brug", value: "Gang" },
          { label: "Segment", value: "Budget" },
          { label: "Partner", value: "WorkWalk" },
        ],
        feedProductId: "WorkWalk:52614816366935",
      },
      {
        id: "foldbar-walkingpad-3i1",
        name: "3-i-1 foldbart Walkingpad",
        badge: "Bedste foldbare",
        summary:
          "Foldbart walking pad med justerbar hældning — til dig, der skal kunne pakke træningen væk efter brug, men stadig vil have mere end et fladt bånd.",
        pros: [
          "Foldbart og pladsbesparende",
          "Justerbar hældning til mere intens gang",
          "Fleksibel 3-i-1-brug",
          "God til små lejligheder",
        ],
        cons: [
          "Ikke et fuldt løbebånd til intervaller",
          "Stabilitet ved højere tempo kan være begrænset",
          "Tjek altid opbevaringsmål i din bolig",
        ],
        specs: [
          { label: "Type", value: "Foldbart walking pad" },
          { label: "Feature", value: "Justerbar hældning" },
          { label: "Segment", value: "Kompakt / mid" },
          { label: "Partner", value: "Billig-fitness.dk" },
        ],
        feedProductId: "Billig-fitness.dk:56539723301250",
      },
      {
        id: "titan-t66",
        name: "Titan LIFE Treadmill T66",
        badge: "Bedste til løb",
        summary:
          "Når løb er hovedformålet, og du vil have et stærkere hjemmebånd end midrange-indgangen. Mere maskine under fødderne til dem, der træner ofte og med højere intensitet.",
        pros: [
          "Stærkere valg til løbetræning",
          "Solid Titan LIFE-kvalitet i højere lag",
          "Bedre til jævnlig brug end budgetbånd",
          "Fri fragt hos partner",
        ],
        cons: [
          "Højere pris",
          "Kræver mere plads og vægtkapacitet i gulvet",
          "Unødvendig, hvis du kun går",
        ],
        specs: [
          { label: "Type", value: "Løbebånd (hjemme)" },
          { label: "Brug", value: "Primært løb" },
          { label: "Segment", value: "Øvre midrange" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3180",
      },
    ],
    howToChoose:
      "Start med dit primære brug: kun gang → gåbånd/walking pad (fx WorkWalk Classic eller foldbart pad). Både gang og løb et par gange om ugen → midrange som Titan LIFE T56. Primært løb og høj frekvens → T66-klassen. Prioritér derefter plads (skal det foldes?) og støj (lejlighed = dæmpning + måtte). Skærm og apps kommer sidst. Tjek aktuelle priser via knapperne ovenfor — de går direkte til vores partnere.",
    learningSections: [
      {
        heading: "Løbebånd vs. gåbånd",
        paragraphs: [
          "Et klassisk løbebånd har højere max-hastighed, typisk længere løbeflade og stærkere motor — bygget til at du kan løbe. Et gåbånd (walking pad) er lavere, ofte smallere og designet til gang under eller ved siden af et skrivebord.",
          "Vælger du forkert her, bliver du enten frustreret over manglende fart — eller har betalt for en stor maskine, du aldrig løber på. Match maskintypen til 80 % af din træning, ikke til den ene uge du måske “kommer i gang med løb”.",
        ],
      },
      {
        heading: "Løbebånd vs. romaskine og cykel",
        paragraphs: [
          "Løbebåndet er stærkt til ren kondition og løbespecifik træning, men belaster knæ og ankler mere end romaskine eller cykel. Har du ledudfordringer, så overvej romaskine eller motionscykel — eller kombiner gåbånd med styrketræning.",
          "Romaskinen vinder på helkropsaktivering. Cyklen vinder på skånsomhed og støjsvag aftentræning. Løbebåndet vinder, når målet er at blive bedre til at løbe eller gå mere i hverdagen.",
        ],
      },
      {
        heading: "Hvad betyder incline?",
        paragraphs: [
          "Elektronisk eller manuel stigning øger intensiteten uden at du behøver at løbe hurtigere. Det er effektivt til bagkæde og kondition, især på walking pads, hvor topfarten er begrænset.",
          "Decline (nedad) er nice-to-have og sjældent nødvendigt hjemme. Fokusér på, om stigningen er stabil og nem at justere — ikke på det højeste procenttal i produktteksten.",
        ],
      },
      {
        heading: "Støj, gulv og naboer",
        paragraphs: [
          "Tre støjkilder: motoren, båndet/dækket, og vibration gennem etagen. En god måtte, korrekt opstilling og lavere hastighed om aftenen gør mere end de fleste “stille motor”-claims.",
          "Bor du i lejlighed, så test gerne i butik, læs brugererfaringer om støj, og vær realistisk: sprint på et billigt bånd i et trægulv er en dårlig cocktail — uanset brand.",
        ],
      },
      {
        heading: "Typiske fejl ved køb",
        paragraphs: [
          "At købe efter den største skærm. At ignorere opbevaringsmål. At vælge peak-HK i stedet for reel brug. At glemme fragt og montering. At købe et fuldt løbebånd, når et gåbånd ville dække behovet.",
          "Omvendt fejl: at købe det billigste walking pad og forvente, at det holder til dagligt løb. Match pris og type til frekvens — ikke til ønsketænkning.",
        ],
      },
      {
        heading: "Vedligehold der forlænger levetiden",
        paragraphs: [
          "Hold dækket rent, smør efter producentens anvisning, og undgå at standse abrupt med fuld vægt på båndet. Tjek jævnligt, at båndet løber centreret.",
          "Støvsug under og omkring maskinen — støv i motoren er en klassisk levetidssynder. En simpel rutine hver uge slår de fleste “garanti-dramaer”.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvilket løbebånd er bedst til hjemmet i 2026?",
        answer:
          "Det afhænger af brug. Til allround gang og løb anbefaler vi Titan LIFE T56. Til rent budget/gang: WorkWalk Classic. Til plads: et foldbart walking pad. Til seriøst løb: Titan LIFE T66.",
      },
      {
        question: "Er et gåbånd godt nok, eller skal jeg have et rigtigt løbebånd?",
        answer:
          "Hvis du primært går — også under skrivebordet — er et gåbånd ofte det rigtige valg. Skal du kunne løbe intervaller, vælg et klassisk løbebånd med højere hastighed og længere flade.",
      },
      {
        question: "Hvor meget plads skal jeg regne med?",
        answer:
          "Mål både brugslængde og foldet/opbevaret mål. Læg plads til at træde på og af sikkert. Walking pads fylder markant mindre end fulde løbebånd — tjek altid produktets mål hos forhandleren.",
      },
      {
        question: "Hvilket løbebånd er bedst til lejlighed?",
        answer:
          "Prioritér dæmpning, lavere vægtbelastning på gulvet og gerne walking pad eller foldbar model. Brug måtte, undgå sen aften-sprint, og vælg modeller med godt ry for støjsvag gang.",
      },
      {
        question: "Skal jeg vælge foldbart løbebånd?",
        answer:
          "Ja, hvis maskinen skal væk efter træning. Nej, hvis du har et fast træningsrum og vil maximere stabilitet. Fold er praktisk — men tjek, at mekanikken føles solid, og at den foldede højde passer under dit møbel eller i dit skab.",
      },
      {
        question: "Hvad betyder motorens HK-tal?",
        answer:
          "Marketing nævner ofte peak-HK. Til holdbarhed er kontinuerlig effekt under belastning vigtigere. Til gang kan lavere tal være fint; til løb flere gange om ugen vil du typisk op i en stærkere klasse.",
      },
      {
        question: "Kan jeg stole på priserne i guiden?",
        answer:
          "Priser og lagerstatus hentes live fra vores partneres feeds og kan ændre sig. Klik “Se pris” for den aktuelle pris og tilbud hos webshoppen — Fitlist er ikke selv webshop.",
      },
      {
        question: "Tjener Fitlist penge, når jeg køber?",
        answer:
          "Ja, vi kan få provision via affiliate-links. Det påvirker ikke prisen for dig. Vi vælger anbefalinger ud fra brug og kriterier — ikke kun provision. Læs mere under “Sådan tjener vi penge”.",
      },
    ],
    relatedSlugs: ["bedste-romaskine-2026", "bedste-motionscykel-2026"],
  },
  {
    slug: "bedste-romaskine-2026",
    title: "Bedste romaskine 2026",
    excerpt:
      "Helkropstræning hjemme: vælg mellem luft, vand og magnet — og se fire anbefalede romaskiner med aktuelle priser.",
    metaDescription:
      "Find den bedste romaskine til hjemmet i 2026. Guide til modstand, støj, skinnelængde og plads — plus fire anbefalinger med live priser fra danske partnere.",
    categorySlug: "romaskine",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    intro:
      "En romaskine træner ben, ryg, core og arme i samme bevægelse — med lav stødbelastning. Det er derfor mange kalder den den mest komplette enkeltmaskine til hjemmet. Her får du valg-kriterierne på plads, fire konkrete modeller med shop-links, og praktiske svar om støj, teknik og plads, inden du køber.",
    criteria: [
      {
        title: "Modstandstype",
        description:
          "Luft giver realistisk følelse og stiger med intensitet — men kan fylde lydmæssigt. Vand lyder autentisk og “bådlignende”. Magnet er ofte støjsvagest og nem at justere præcist. Hydraulik er kompakt, men føles mindre som ægte roning. Vælg efter støj, følelse og budget — ikke kun efter, hvad der ser flot ud.",
      },
      {
        title: "Skinnelængde og brugerhøjde",
        description:
          "For korte skinner ødelægger slaglængden for høje brugere og gør teknikken værre. Tjek maks. brugerhøjde og -vægt, før du køber. Sid også i maskinen (eller tjek mål), så sædet og håndtaget passer til din kropsbygning.",
      },
      {
        title: "Støj i hjemmet",
        description:
          "Luft- og vandmodstand kan fylde mere i en lejlighed. Magnet er typisk bedst til aftentræning. Husk også mekanisk klik fra sæde og håndtag — og at gulvets konstruktion forstærker vibration.",
      },
      {
        title: "Fold og footprint",
        description:
          "Mange romaskiner kan rejses vertikalt eller foldes. Mål både brugslængde (ofte 2+ meter) og opbevaringsmål. En “foldbar” model, der stadig fylder en hel væg, er ikke en løsning i et lille værelse.",
      },
      {
        title: "Stabilitet og build",
        description:
          "Ramme, skinner og sædehjul afgør, om maskinen føles billig efter tre måneder. Vip, slør og knirk er klassiske tegn på, at du har sparet for hårdt. Til daglig brug betaler midrange sig ofte.",
      },
      {
        title: "Computer og motivation",
        description:
          "Tid, slag pr. minut, distance og watt/kalorier er nok for de fleste. App-tilslutning og store skærme er et plus — ikke et must. En kedelig skærm på en god maskine slår en flott skærm på en dårlig.",
      },
      {
        title: "Budget og brugsmønster",
        description:
          "Træner du 1–2 gange om ugen for almen form, kan entry være fint. Træner du ofte og vil progressere, så gå op i build og modstandskvalitet. Læg fragt og plads til opbevaring ind i beslutningen.",
      },
    ],
    products: [
      {
        id: "reebok-zjet",
        name: "Reebok ZJET Rower",
        badge: "Bedst samlet",
        summary:
          "Et stærkt allround-valg, når du vil have en kendt brand-romaskine til hjemmet med god træningsfølelse uden at hoppe direkte i pro-priser.",
        pros: [
          "Stærkt allround-valg til hjemmet",
          "Kendte Reebok-linjer",
          "God til regelmæssig helkropstræning",
          "Fri fragt hos partner",
        ],
        cons: [
          "Dyrere end entry Titan-modeller",
          "Fylder i brug — mål pladsen",
          "Tjek støjniveau ift. din bolig",
        ],
        specs: [
          { label: "Type", value: "Romaskine" },
          { label: "Brand", value: "Reebok" },
          { label: "Segment", value: "Mid/øvre mid" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2330",
      },
      {
        id: "titan-r10",
        name: "Titan LIFE Rower R10",
        badge: "Bedste billige",
        summary:
          "Prisvenlig indgang til roning hjemme. Til dig, der vil prøve disciplinen eller træne lettere uden at investere i midrange fra dag ét.",
        pros: [
          "Lav indgangspris",
          "Fin til begyndere og let brug",
          "Titan LIFE-entry med fri fragt",
          "Nem måde at teste, om roning er dig",
        ],
        cons: [
          "Ikke det mest raffinerede valg til intensiv brug",
          "Færre “premium”-detaljer",
          "Høje brugere bør tjekke skinnelængde",
        ],
        specs: [
          { label: "Type", value: "Romaskine" },
          { label: "Brand", value: "Titan LIFE" },
          { label: "Segment", value: "Budget" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2801",
      },
      {
        id: "titan-r65",
        name: "Titan LIFE Rower R65",
        badge: "Bedste midrange",
        summary:
          "Et skridt op fra entry, når du ved, at romaskinen bliver stående — og brugt. Bedre balance mellem pris og daglig træningskvalitet.",
        pros: [
          "Bedre build end ren entry",
          "God til 3+ sessioner om ugen",
          "Solid midrange-pris",
          "Fri fragt hos partner",
        ],
        cons: [
          "Dyrere end R10",
          "Stadig ikke luft/pro-følelse",
          "Pladsbehov som øvrige romaskiner",
        ],
        specs: [
          { label: "Type", value: "Romaskine" },
          { label: "Brand", value: "Titan LIFE" },
          { label: "Segment", value: "Midrange" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2798",
      },
      {
        id: "airrow",
        name: "AirRow romaskine med luftmodstand",
        badge: "Bedste luftmodstand",
        summary:
          "Til dig, der vil have luftmodstandens realistiske følelse, hvor intensiteten stiger, når du trækker hårdere. Mere “roning”, mere lyd — mere engagement for mange.",
        pros: [
          "Luftmodstand med naturlig progression",
          "God træningsfølelse for erfarne",
          "Helkropsintensitet der skalerer med indsats",
          "Klar differentiering fra magnet-entry",
        ],
        cons: [
          "Typisk mere støj end magnet",
          "Højere pris",
          "Kræver plads og accept af “vifte”-lyd",
        ],
        specs: [
          { label: "Type", value: "Luftmodstand" },
          { label: "Brand", value: "Gorilla Sports / AirRow" },
          { label: "Segment", value: "Øvre mid" },
          { label: "Partner", value: "Billig-fitness.dk" },
        ],
        feedProductId: "Billig-fitness.dk:56851290751362",
      },
    ],
    howToChoose:
      "Usikker på roning? Start billigt med Titan LIFE R10 og lær teknikken. Ved du, at maskinen skal bruges ofte? Gå til R65 eller Reebok ZJET. Vil du have luftens følelse og accepterer mere lyd? AirRow. Bekræft skinnelængde til din højde, mål brugslængde i rummet, og vælg magnet, hvis støj er kritisk. Shop via “Se pris” for aktuelle partnerpriser.",
    learningSections: [
      {
        heading: "Romaskine vs. løbebånd og cykel",
        paragraphs: [
          "Romaskinen aktiverer flere muskelgrupper end løbebånd og motionscykel i én bevægelse. Cykel er ofte skånsommere, hvis du har problemer i overkrop eller greb. Løbebånd vinder på løbespecifik kondition.",
          "Til allround hjemmetræning med begrænset plads til flere maskiner er romaskinen svær at slå — forudsat at du har længden til skinnen, når du ror.",
        ],
      },
      {
        heading: "Luft, vand eller magnet?",
        paragraphs: [
          "Luft: realistisk, selvsvalende intensitet, mere lyd. Vand: stemning og jævn følelse, vedligehold af vandniveau. Magnet: stille, præcis, ofte billigere — men mindre “båd”.",
          "Der findes ikke én rigtig type. Der findes den type, der matcher din bolig og din motivation. Mange bliver glade for magnet i lejlighed og luft i hus med træningsrum.",
        ],
      },
      {
        heading: "Teknik betyder mere end watt",
        paragraphs: [
          "Dårlig roteknik belaster lænden. Lær sekvensen: ben → core → arme, og tilbage i omvendt rækkefølge. Undgå at rykke i håndtaget med runden ryg.",
          "En god maskine kan ikke redde dårlig teknik — men en dårlig maskine kan gøre god teknik svær. Start roligt, film dig selv, og byg volumen op over uger.",
        ],
      },
      {
        heading: "Plads: den skjulte dealbreaker",
        paragraphs: [
          "I brug er romaskiner lange. Mål fra væg til væg, og husk plads bag dig til fuldt benspark. Tjek om maskinen kan stilles vertikalt, og om hjulene virker på dit gulv.",
          "Hvis du ikke har længden, er en motionscykel eller et foldbart løbebånd ofte et mere ærligt valg end at presse en romaskine ind i et hjørne.",
        ],
      },
      {
        heading: "Typiske fejl ved køb",
        paragraphs: [
          "At købe efter skærm. At glemme brugerhøjde. At undervurdere støj fra luftmodstand. At købe pro-kommercielt udstyr til et soveværelse.",
          "Omvendt: at blive på det billigste entry-år efter år, selvom du ror fire gange om ugen. Opgrader, når vanen er beviselig — ikke før.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvilken romaskine er bedst til hjemmet?",
        answer:
          "Til allround anbefaler vi Reebok ZJET. Til budget: Titan LIFE R10. Til hyppig brug i midrange: R65. Til luftmodstand: AirRow. Match altid til støj og skinnelængde.",
      },
      {
        question: "Er romaskine godt for begyndere?",
        answer:
          "Ja — med fokus på teknik. Start med korte sessioner, lav intensitet og lær bevægelsen, før du jagter watt. Entry-modeller er fine til at komme i gang.",
      },
      {
        question: "Hvilken romaskine er mest støjsvag?",
        answer:
          "Magnetmodstand er typisk støjsvagest. Luft og vand fylder mere lydmæssigt. I lejlighed bør støj være et hovedkriterium — ikke en eftertanke.",
      },
      {
        question: "Hvor meget plads kræver en romaskine?",
        answer:
          "Ofte over to meter i brugslængde plus plads omkring. Tjek produktmål og om den kan opbevares vertikalt. Mål rummet, før du køber.",
      },
      {
        question: "Kan jeg tabe mig på romaskine?",
        answer:
          "Ja, hvis intensitet og kost hænger sammen. Romaskinen er effektiv, fordi den bruger store muskelgrupper. Konsistens slår enkeltstående hårde pas.",
      },
      {
        question: "Luftmodstand eller magnet — hvad skal jeg vælge?",
        answer:
          "Luft for følelse og selvskalerende modstand. Magnet for stilhed og præcis justering. Har du naboer under dig, start med magnet, medmindre du ved, at du vil have luft.",
      },
      {
        question: "Hvordan ser jeg aktuelle priser?",
        answer:
          "Hver anbefaling har en “Se pris”-knap, der går til partnerens produkt med live feed-pris. Lager og pris kan ændre sig i løbet af dagen.",
      },
    ],
    relatedSlugs: ["bedste-loebebaand-2026", "bedste-motionscykel-2026"],
  },
  {
    slug: "bedste-motionscykel-2026",
    title: "Bedste motionscykel 2026",
    excerpt:
      "Kondicykel, spinning eller airbike? Sådan vælger du — plus fire anbefalinger med aktuelle priser fra danske webshops.",
    metaDescription:
      "Find den bedste motionscykel til hjemmet i 2026. Guide til kondicykel vs. spinning, støj og budget — plus fire anbefalede modeller med live priser.",
    categorySlug: "motionscykel",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-04",
    intro:
      "En motionscykel er en af de mest skånsomme måder at få kondition hjemme — knæene belastes mindre end på løbebånd, og du kan træne med podcast i ørerne uden at vække hele opgangen. Men “motionscykel” dækker over kondicykler, spinningcykler og airbikes med vidt forskellige formål. Denne guide hjælper dig med at vælge type først, og derefter fire konkrete modeller med shop-links til vores partnere.",
    criteria: [
      {
        title: "Kondicykel, spinning eller airbike?",
        description:
          "Kondicykel (ofte siddende med ryglæn eller oprejst) er skånsom og god til længere pas. Spinning/cykel med tung svinghjul føles mere som hold og intervaller. Airbike (arme + ben) er hård helkropscondi. Vælg efter træningsstil — ikke efter, hvad der ligner “mest pro” på billedet.",
      },
      {
        title: "Modstand og svinghjul",
        description:
          "Magnetisk modstand er støjsvag og vedligeholdelsesvenlig. Tungere svinghjul giver typisk mere jævn følelse på spinningcykler. Airbikes skalerer med indsats via luft. Tjek, om modstanden justeres præcist nok til din træning.",
      },
      {
        title: "Pasform: saddel, styr og højde",
        description:
          "En cykel, du ikke kan indstille til din krop, bliver stående. Tjek saddelhøjde, styrjustering og maks. brugerhøjde/-vægt. Prøvesidning er guldet værd — eller mindst grundige mål og returret.",
      },
      {
        title: "Støj og gulv",
        description:
          "Gode magnetcykler er blandt de støjsvageste maskiner til hjemmet. Pedaler, svinghjul og et ustabilt underlag kan stadig larme. Brug måtte, og undgå at cyklen “vandrer” på laminat.",
      },
      {
        title: "Plads og opbevaring",
        description:
          "Cykler fylder mindre i længden end romaskiner, men har bredde og højde. Nogle X-bike/foldbare modeller kan klappes sammen. Mål det hjørne, cyklen skal bo i — også med plads til at stige af.",
      },
      {
        title: "Computer, programmer og motivation",
        description:
          "Puls, tid og modstandsniveauer er nok til at komme langt. Forudindstillede programmer hjælper begyndere. Store skærme og apps er bonus — prioriter biomechanics og stabilitet først.",
      },
      {
        title: "Budget ift. brug",
        description:
          "Til 1–2 rolige pas om ugen er entry fint. Til intervaller og spinning-følelse: gå op i svinghjul og stabilitet. Premium kondicykler betaler sig, når cyklen er din primære cardio i årevis.",
      },
    ],
    products: [
      {
        id: "titan-b56",
        name: "Titan Life Athlete B56",
        badge: "Bedst samlet",
        summary:
          "Allround kondicykel til hjemmet, når du vil have et solidt dagligt redskab uden at gå direkte i premium-Tunturi-laget. God balance mellem pris, stabilitet og brug.",
        pros: [
          "Stærkt allround-valg",
          "Bedre end ren entry til jævnlig brug",
          "Titan Life Athlete-linje",
          "Fri fragt hos partner",
        ],
        cons: [
          "Ikke en tung spinningcykel",
          "Ikke billigste i feedet",
          "Tjek pasform til din højde",
        ],
        specs: [
          { label: "Type", value: "Kondicykel" },
          { label: "Brand", value: "Titan Life" },
          { label: "Segment", value: "Midrange" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3237",
      },
      {
        id: "titan-b35",
        name: "Titan Life B35",
        badge: "Bedste billige",
        summary:
          "Prisbevidst kondicykel til dig, der vil i gang med skånsom cardio hjemme uden stor investering. Fin starter, når vanen skal bygges først.",
        pros: [
          "Lav indgangspris",
          "Stabil motionscykel til begyndere",
          "Fri fragt hos partner",
          "God til rolige kondipas",
        ],
        cons: [
          "Færre features end dyrere modeller",
          "Ikke ideel som eneste cykel til hård spinning",
          "Pasform og justering er mere basale",
        ],
        specs: [
          { label: "Type", value: "Kondicykel" },
          { label: "Brand", value: "Titan Life" },
          { label: "Segment", value: "Budget" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2702",
      },
      {
        id: "titan-s11",
        name: "Titan LIFE Spinning Cykel S11",
        badge: "Bedste spinning",
        summary:
          "Når du vil have spinning-følelse derhjemme: svinghjul, mere aggressiv position og intervaller. Et logisk valg, hvis holdcykling er din reference.",
        pros: [
          "Spinning-orienteret træning",
          "God til intervaller",
          "Skarp pris i spinning-segmentet",
          "Fri fragt hos partner",
        ],
        cons: [
          "Hårdere saddel/position end komfort-kondicykel",
          "Kan fylde mere lyd/vibration end magnet-kondicykel",
          "Kræver tilvænning for rene begyndere",
        ],
        specs: [
          { label: "Type", value: "Spinningcykel" },
          { label: "Brand", value: "Titan LIFE" },
          { label: "Segment", value: "Spin / mid" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:2805",
      },
      {
        id: "tunturi-e50",
        name: "Tunturi Signature E50",
        badge: "Bedste premium",
        summary:
          "Når kondicyklen er din primære maskine i årevis, og du vil op i Tunturi-kvalitet. Mere maskine, mere finish — til dig, der allerede ved, at cykling hjemme virker.",
        pros: [
          "Premium Tunturi Signature-linje",
          "Bedre til langvarig, hyppig brug",
          "Stærkere “færdig”-oplevelse",
          "Fri fragt hos partner",
        ],
        cons: [
          "Markant højere pris",
          "Overkill, hvis du cykler sjældent",
          "Fylder som en “rigtig” maskine — mål pladsen",
        ],
        specs: [
          { label: "Type", value: "Kondicykel" },
          { label: "Brand", value: "Tunturi" },
          { label: "Segment", value: "Premium" },
          { label: "Partner", value: "HomeX.dk" },
        ],
        feedProductId: "HomeX.dk:3387",
      },
    ],
    howToChoose:
      "Vil du bare have skånsom cardio? Start med Titan Life B35 eller gå til B56, hvis du træner ofte. Elsker du hold/spinning? S11. Er cyklen din hovedmaskine i flere år? Tunturi E50. Prioritér pasform og støj før skærm. Brug “Se pris” for live partnerpriser, og sammenlign gerne med flere tilbud under kategorien Motionscykel.",
    learningSections: [
      {
        heading: "Kondicykel vs. spinningcykel",
        paragraphs: [
          "Kondicykler er typisk mere komfortable til længere, jævne pas og er ofte støjsvagere. Spinningcykler efterligner holdcykling med tungere svinghjul og mere sporty position — bedre til intervaller, hårdere for sæde og håndled i starten.",
          "Vælg spinning, hvis du ved, at du vil træne hårdt og “cykelagtigt”. Vælg kondicykel, hvis målet er sundhed, fedtforbrænding og skånsom rutine.",
        ],
      },
      {
        heading: "Hvornår airbike giver mening",
        paragraphs: [
          "Airbikes træner arme og ben samtidigt og er brutalt ærlige i intensitet. De er fantastiske til korte, hårde pas — og mindre oplagte som eneste “rolige aften-cardio”, hvis støj og sved er et issue.",
          "Har du allerede styrketræning og vil have en kondi-finisher, kan airbike være spot on. Til rolige zone-2-pas er en magnetkondicykel ofte mere behagelig.",
        ],
      },
      {
        heading: "Motionscykel vs. løbebånd og romaskine",
        paragraphs: [
          "Cyklen er skånsom og støjsvag — stærk i lejlighed. Løbebåndet er mere belastende, men løbespecifikt. Romaskinen giver mere overkrop og kræver længde i rummet.",
          "Mange hjem ender med cykel som den maskine, der faktisk bliver brugt, fordi barrieren er lav: sæt dig, start, færdig.",
        ],
      },
      {
        heading: "Pasform og skader",
        paragraphs: [
          "For lav saddel belaster knæene. For højt styr eller forkert afstand kan give nakke- og håndledsbesvær. Brug tid på justering første uge — det er en del af købet.",
          "Har du eksisterende skader, så start med lav modstand og korte pas. En dyr cykel løser ikke en dårlig position.",
        ],
      },
      {
        heading: "Typiske fejl ved køb",
        paragraphs: [
          "At købe spinning, når man ville have komfort. At ignorere maks. brugervægt. At glemme, at cyklen skal stå stabilt på gulvet. At betale for touchscreen før en ordentlig ramme.",
          "Omvendt: at blive på den billigste cykel i fem år, selvom den vipper og knirker, hver gang du træner. Opgrader, når udstyret begrænser vanen.",
        ],
      },
      {
        heading: "Vedligehold i praksis",
        paragraphs: [
          "Tør sved af efter brug, hold kedjen/remområdet rent efter producentens vejledning, og efterspænd bolte efter de første uger. Tjek, at cyklen står i vater.",
          "En måtte beskytter gulvet og dæmper vibration. Det er en af de billigste opgraderinger, du kan lave.",
        ],
      },
    ],
    faqs: [
      {
        question: "Hvilken motionscykel er bedst til hjemmet?",
        answer:
          "Til allround: Titan Life Athlete B56. Til budget: B35. Til spinning: Titan LIFE S11. Til premium langtidscykling: Tunturi Signature E50.",
      },
      {
        question: "Er motionscykel bedre end løbebånd?",
        answer:
          "Til skånsomhed og støj: ofte ja. Til løbespecifik træning: nej. Det afhænger af dit mål. Mange bør vælge den maskine, de realistisk bruger tre gange om ugen.",
      },
      {
        question: "Hvad er forskellen på kondicykel og spinningcykel?",
        answer:
          "Kondicykel er typisk mere komfortabel og støjsvag til længere pas. Spinning har tungere svinghjul og mere aggressiv position til intervaller og hold-agtig træning.",
      },
      {
        question: "Kan jeg træne i lejlighed uden at genere naboer?",
        answer:
          "Ja — magnetiske kondicykler er blandt de bedste valg. Brug måtte, undgå at hoppe i pedalerne, og vælg kvalitet, der ikke “klaprer”.",
      },
      {
        question: "Hvor vigtig er sadlen?",
        answer:
          "Meget. En dårlig saddel stopper træningen. Mange opgraderer sadlen eller bruger cykelshorts. Prøv pasformen, og budgetér eventuelt til en bedre saddel.",
      },
      {
        question: "Skal jeg købe en dyr cykel som begynder?",
        answer:
          "Nej. Byg vanen på B35/B56-niveau først. Gå premium, når du ved, at cykling er din grej, og du mangler kvalitet — ikke motivation.",
      },
      {
        question: "Hvordan køber jeg via Fitlist?",
        answer:
          "Klik “Se pris” på en anbefaling, eller se flere tilbud under Motionscykel. Du handler hos partneren; Fitlist kan få provision uden merpris for dig.",
      },
    ],
    relatedSlugs: ["bedste-loebebaand-2026", "bedste-romaskine-2026"],
  },
];
