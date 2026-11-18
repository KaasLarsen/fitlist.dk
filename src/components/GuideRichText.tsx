import type { ReactNode } from "react";
import Link from "next/link";
import { getAllGuides, guidePathFromSlug, type Guide } from "@/lib/guides";

/** Extra short forms that appear in prose (beyond auto-derived title slices). */
const GUIDE_LINK_ALIASES: Record<string, string[]> = {
  "ascendic-essential-walking-pad-2026": [
    "Ascendic Essential modelguide",
    "Ascendic Essential Walking Pad — modelguide 2026",
  ],
  "ascendic-7021-loebebaand-2026": [
    "Ascendic 7021 modelguide",
    "Ascendic 7021 Løbebånd — modelguide 2026",
  ],
  "velorafit-foldbart-loebebaand-2026": [
    "VeloraFit modelguide",
    "VeloraFit Foldbart Løbebånd — modelguide 2026",
  ],
  "odin-rb-800-siddecykel-2026": [
    "Odin RB-800 modelguide",
    "Odin RB-800 Comfort Siddecykel — modelguide 2026",
  ],
  "reebok-i-run-4-5-loebebaand-2026": [
    "Reebok i-Run modelguide",
    "Reebok i-Run 4.5 Løbebånd — modelguide 2026",
  ],
  "odin-r1800-vandromaskine-2026": [
    "Odin R1800 modelguide",
    "Odin R1800 Vandromaskine — modelguide 2026",
  ],
  "odin-a1000-airbike-2026": [
    "Odin A1000 modelguide",
    "Odin A1000 Airbike — modelguide 2026",
  ],
  "odin-s1000-spinningcykel-2026": [
    "Odin S1000 modelguide",
    "Odin S1000 Spinningcykel — modelguide 2026",
  ],
  "odin-justerbare-haandvaegte-24kg-2026": [
    "Odin 2×24 kg modelguide",
    "Odin Justerbare Håndvægte 2×24 kg — modelguide 2026",
  ],
  "ascendic-6004-romaskine-2026": [
    "Ascendic 6004 modelguide",
    "Ascendic 6004 Romaskine — modelguide 2026",
  ],
  "titan-life-b35-motionscykel-2026": [
    "Titan Life B35 modelguide",
    "Titan Life B35 Motionscykel — modelguide 2026",
  ],
  "ascendic-8001-foldbar-motionscykel-2026": [
    "Ascendic 8001 modelguide",
    "Ascendic 8001 Foldbar Motionscykel — modelguide 2026",
  ],
  "titan-life-s72-spinningcykel-2026": [
    "Titan LIFE S72 modelguide",
    "Titan LIFE S72 Spinningcykel — modelguide 2026",
  ],
  "ascendic-7021-vs-reebok-i-run-4-5-2026": [
    "Ascendic 7021 vs. Reebok i-Run 4.5",
    "Ascendic 7021 vs Reebok i-Run 4.5",
  ],
  "ascendic-6004-vs-odin-r1800-2026": [
    "Ascendic 6004 vs. Odin R1800",
    "Ascendic 6004 vs Odin R1800",
  ],
  "titan-life-b35-vs-ascendic-8001-2026": [
    "Titan Life B35 vs. Ascendic 8001",
    "Titan Life B35 vs Ascendic 8001",
  ],
  "bedste-loebebaand-2026": ["Bedste løbebånd 2026"],
  "bedste-siddecykel-2026": ["Bedste siddecykel 2026"],
  "bedste-romaskine-2026": ["Bedste romaskine 2026"],
  "bedste-airbike-2026": ["Bedste airbike 2026", "Bedste Airbike 2026"],
  "bedste-crosstrainer-2026": ["Bedste crosstrainer 2026"],
  "bedste-gaabaand-2026": ["Bedste gåbånd 2026"],
  "bedste-motionscykel-2026": ["Bedste motionscykel 2026"],
  "bedste-smartcykel-2026": [
    "Bedste smartcykler 2026",
    "Bedste smartcykel 2026",
  ],
  "bedste-spinningcykel-2026": ["Bedste spinningcykel 2026"],
  "bedste-cykel-til-zwift-2026": ["Bedste cykel til Zwift 2026"],
  "bedste-justerbare-haandvaegte-2026": ["Bedste justerbare håndvægte 2026"],
  "bedste-justerbar-traeningsbaenk-2026": [
    "Bedste justerbare træningsbænk 2026",
  ],
  "gaabaand-til-kontoret-2026": [
    "Gåbånd til kontoret",
    "Bedste under-desk walking pads",
  ],
  "ultimative-home-gym-budget-2026": [
    "Det ultimative home gym på budget",
    "home gym på budget",
  ],
  "fase-byggeren-start-for-3000-kr-2026": [
    "Fase-byggeren",
  ],
  "hjemmetraening-under-1000-kr-2026": [
    "Hjemmetræning under 1.000 kr.",
    "Hjemmetræning under 1.000 kr",
    "hjemmetræning under 1000 kr",
  ],
  "komplet-hjemmegym-under-10000-kr-2026": [
    "Komplet hjemmegym under 10.000 kr.",
    "Komplet hjemmegym under 10.000 kr",
    "hjemmegym under 10000 kr",
  ],
  "komplet-hjemmegym-under-15000-kr-2026": [
    "Komplet hjemmegym under 15.000 kr.",
    "Komplet hjemmegym under 15.000 kr",
  ],
  "bedste-loebebaand-under-4000-kr-2026": [
    "Bedste løbebånd under 4.000 kr.",
    "Bedste løbebånd under 4.000 kr",
  ],
  "bedste-gaabaand-under-2500-kr-2026": [
    "Bedste gåbånd under 2.500 kr.",
    "Bedste gåbånd under 2.500 kr",
  ],
  "bedste-motionscykel-under-3000-kr-2026": [
    "Bedste motionscykel under 3.000 kr.",
    "Bedste motionscykel under 3.000 kr",
  ],
  "bedste-romaskine-under-5000-kr-2026": [
    "Bedste romaskine under 5.000 kr.",
    "Bedste romaskine under 5.000 kr",
  ],
  "ultimative-cardio-corner-under-7500-2026": [
    "Det ultimative Cardio-Corner",
    "Cardio-Corner til under 7.500 kr.",
  ],
  "bedste-stoejsvage-traeningsmaskiner-lejlighed-2026": [
    "støjsvag-lejlighedsguiden",
    "Bedste støjsvage træningsmaskiner til lejligheden",
  ],
  "bedste-foldbare-kompakte-traeningsmaskiner-2026": [
    "Bedste foldbare & kompakte træningsmaskiner",
  ],
  "bedste-traeningsudstyr-til-seniorer-2026": [
    "senior-guiden",
    "Bedste træningsudstyr til seniorer",
  ],
  "bedste-stoejsvag-romaskine-2026": ["Bedste støjsvage romaskine 2026"],
  "bedste-foldbar-romaskine-2026": [
    "Bedste foldbare romaskine 2026",
    "Bedste foldbar romaskine 2026",
  ],
  "bedste-kompakt-romaskine-2026": [
    "Bedste kompakt romaskine 2026",
    "Bedste kompakte romaskine 2026",
  ],
  "bedste-stoejsvag-crosstrainer-2026": ["Bedste støjsvage crosstrainer 2026"],
  "bedste-billig-crosstrainer-2026": ["Bedste billige crosstrainer 2026"],
  "bedste-kompakt-crosstrainer-2026": [
    "Bedste kompakt crosstrainer 2026",
    "Bedste kompakte crosstrainer 2026",
  ],
  "romaskine-eller-crosstrainer-2026": [
    "Romaskine eller crosstrainer",
    "Romaskine eller crosstrainer? Sådan vælger du i 2026",
  ],
  "bedste-power-rack-squat-rack-2026": [
    "Bedste power rack & squat rack 2026",
    "bedste squat racks til hjemmetræning",
    "oversigten over bedste squat racks til hjemmetræning",
    "power rack guide",
  ],
  "squat-rack-til-lavt-loft-2026": [
    "Bedste squat rack til lavt loft 2026",
    "Bedste squat rack til lavt loft",
    "squat rack til lavt loft",
    "rack til lav loftshøjde",
  ],
  "loftshoejde-til-squat-rack-2026": [
    "Hvor højt loft skal der være til squat rack?",
    "Hvor højt loft skal der være til squat rack",
    "loftshøjde til squat rack",
    "hvor højt loft til power cage",
  ],
  "bedste-knaevenlig-genoptraening-hjemme-2026": [
    "knæ-/genoptræningsguide",
    "knævenlig genoptræning",
    "Bedste knævenlig genoptræning hjemme",
  ],
  "bedste-stoejsvag-loebebaand-lejlighed-2026": [
    "Bedste støjsvage løbebånd til lejlighed 2026",
  ],
  "bedste-stoejsvag-motionscykel-lejlighed-2026": [
    "Bedste støjsvage motionscykel til lejlighed 2026",
  ],
  "home-gym-til-lille-vaerelse-10m2-2026": [
    "Home gym til lille værelse / ca. 10 m²",
    "Home gym til lille værelse",
  ],
  "bedste-cardio-under-lavt-loft-2026": [
    "Bedste cardio under lavt loft",
    "cardio under lavt loft",
  ],
  "bedste-traeningsudstyr-til-vaegttab-hjemme-2026": [
    "Bedste træningsudstyr til vægttab hjemme 2026",
  ],
  "bedste-traeningsudstyr-til-par-hjemmegym-2026": [
    "Bedste træningsudstyr til par / delt hjemmegym 2026",
  ],
  "bedste-mavebaenk-rygtraener-2026": [
    "Bedste mavebænk og rygtræner 2026",
  ],
  "bedste-sjippetov-traeningsmaatte-lejlighed-2026": [
    "Bedste sjippetov og træningsmåtte til lejligheden",
  ],
  "bedste-vaegtstangssaet-bumper-plates-2026": [
    "Bedste vægtstangssæt og bumper plates 2026",
  ],
  "bedste-traeningselastikker-slyngetraener-2026": [
    "Bedste træningselastikker og slyngetræner 2026",
  ],
  "incline-loebebaand-eller-klassisk-2026": [
    "Incline løbebånd eller klassisk løbebånd",
  ],
  "bedste-kettlebells-hjemmetraening-2026": [
    "Bedste kettlebells til hjemmetræning 2026",
    "Bedste kettlebells",
  ],
  "bedste-traeningsmaatte-gulvbeskyttelse-home-gym-2026": [
    "Bedste træningsmåtte til gulvbeskyttelse / home gym",
    "Bedste træningsmåtte til gulvbeskyttelse / home gym 2026",
  ],
  "bedste-vandromaskine-2026": ["Bedste vandromaskine 2026"],
  "bedste-pull-up-bar-doerribbe-2026": [
    "Bedste pull-up bar og dørribbe 2026",
  ],
  "bedste-hometrainer-2026": [
    "Bedste hometrainer 2026",
    "Bedste hometrainer 2026 — direct drive vs. wheel-on",
  ],
  "bedste-ab-wheel-mavetraener-2026": [
    "Bedste ab wheel / mavetræner 2026",
    "Bedste ab wheel",
  ],
  "bedste-dip-station-parallettes-2026": [
    "Bedste dip station og parallettes 2026",
  ],
  "bedste-vaegtvest-2026": ["Bedste vægtvest 2026"],
  "bedste-stepbaenk-plyoboks-2026": [
    "Bedste stepbænk og plyoboks 2026",
  ],
  "den-store-guide-til-isbad-derhjemme-2026": [
    "Den store guide til isbad derhjemme",
  ],
  "isbad-efter-styrketraening-eller-loeb-2026": [
    "Isbad efter styrketræning eller løb",
  ],
  "restitution-efter-hjemmetraening-2026": [
    "Restitution efter hjemmetræning",
  ],
  "massagepistol-vs-foam-roller-2026": [
    "Massagepistol vs. foam roller",
    "Massagepistol vs foam roller",
  ],
  "er-recovery-boots-pengene-vaerd-2026": [
    "Er recovery boots pengene værd?",
    "Er recovery boots pengene værd",
  ],
  "multistation-til-garage-kaelder-2026": [
    "Multistation til garage og kælder",
    "multistation til garage",
  ],
  "airbike-eller-romaskine-vaegttab-2026": [
    "Airbike eller romaskine til vægttab",
    "Airbike vs. romaskine til vægttab",
    "airbike eller romaskine",
  ],
  "bedste-crosstrainer-til-daarlige-knae-2026": [
    "Bedste crosstrainer til dårlige knæ",
    "crosstrainer til dårlige knæ",
  ],
  "masterfit-170-romaskine-2026": [
    "Masterfit 170 romaskine",
    "Masterfit 170 anmeldelse",
    "Masterfit 170 Rower — modelguide",
  ],
  "bedste-multistation-2026": [
    "Bedste multistation / Home Gym 2026",
    "Bedste multistation",
  ],
  "ultimative-udendoers-home-gym-2026": [
    "Det ultimative udendørs home gym",
  ],
};

function linkLabelsForGuide(guide: Guide): string[] {
  const labels = new Set<string>([guide.title]);
  const beforeEmDash = guide.title.split(" — ")[0]?.trim();
  if (beforeEmDash) labels.add(beforeEmDash);
  const beforeColon = guide.title.split(":")[0]?.trim();
  if (beforeColon && beforeColon.length > 12) labels.add(beforeColon);
  const throughYear = guide.title.match(/^(.*?2026)/u)?.[1]?.trim();
  if (throughYear) labels.add(throughYear);
  for (const label of [...labels]) {
    const withoutParenYear = label.replace(/\s*\(2026\)\s*$/u, "").trim();
    if (withoutParenYear.length > 12) labels.add(withoutParenYear);
  }
  for (const alias of GUIDE_LINK_ALIASES[guide.slug] ?? []) {
    labels.add(alias);
  }
  return [...labels].sort((a, b) => b.length - a.length);
}

type LinkPattern = {
  slug: string;
  label: string;
  regex: RegExp;
};

let cachedPatterns: LinkPattern[] | null = null;

function getGuideLinkPatterns(excludeSlug?: string): LinkPattern[] {
  if (!cachedPatterns) {
    const patterns: LinkPattern[] = [];
    for (const guide of getAllGuides()) {
      for (const label of linkLabelsForGuide(guide)) {
        patterns.push({
          slug: guide.slug,
          label,
          regex: new RegExp(
            label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            "g",
          ),
        });
      }
    }
    patterns.sort((a, b) => b.label.length - a.label.length);
    cachedPatterns = patterns;
  }
  return excludeSlug
    ? cachedPatterns.filter((p) => p.slug !== excludeSlug)
    : cachedPatterns;
}

/**
 * Turns known guide titles in prose into internal links.
 * Skips the current guide so titles don't self-link.
 */
export function GuideRichText({
  text,
  currentSlug,
  className,
}: {
  text: string;
  currentSlug?: string;
  className?: string;
}) {
  const patterns = getGuideLinkPatterns(currentSlug);
  const nodes: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let earliest: { index: number; pattern: LinkPattern } | null = null;
    for (const pattern of patterns) {
      pattern.regex.lastIndex = 0;
      const match = pattern.regex.exec(remaining);
      if (!match || match.index < 0) continue;
      if (!earliest || match.index < earliest.index) {
        earliest = { index: match.index, pattern };
      }
    }

    if (!earliest) {
      nodes.push(remaining);
      break;
    }

    if (earliest.index > 0) {
      nodes.push(remaining.slice(0, earliest.index));
    }
    nodes.push(
      <Link
        key={`g-${key++}`}
        href={guidePathFromSlug(earliest.pattern.slug)}
        className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent-dim hover:decoration-accent"
      >
        {earliest.pattern.label}
      </Link>,
    );
    remaining = remaining.slice(
      earliest.index + earliest.pattern.label.length,
    );
  }

  return <span className={className}>{nodes}</span>;
}
