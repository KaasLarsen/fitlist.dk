import type { ReactNode } from "react";
import Link from "next/link";
import { getAllGuides, guidePathFromSlug, type Guide } from "@/lib/guides";

/** Extra short forms that appear in prose (beyond auto-derived title slices). */
const GUIDE_LINK_ALIASES: Record<string, string[]> = {
  "ascendic-essential-walking-pad-2026": [
    "Ascendic Essential modelguide",
    "Ascendic Essential Walking Pad — modelguide 2026",
  ],
  "bedste-loebebaand-2026": ["Bedste løbebånd 2026"],
  "bedste-romaskine-2026": ["Bedste romaskine 2026"],
  "bedste-crosstrainer-2026": ["Bedste crosstrainer 2026"],
  "bedste-gaabaand-2026": ["Bedste gåbånd 2026"],
  "bedste-motionscykel-2026": ["Bedste motionscykel 2026"],
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
  "bedste-stoejsvag-crosstrainer-2026": ["Bedste støjsvage crosstrainer 2026"],
  "bedste-power-rack-squat-rack-2026": [
    "Bedste power rack & squat rack 2026",
  ],
  "bedste-knaevenlig-genoptraening-hjemme-2026": [
    "knæ-/genoptræningsguide",
    "knævenlig genoptræning",
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
