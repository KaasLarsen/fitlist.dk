import type { Guide } from "@/lib/guides";

export type GuideBanner = {
  href: string;
  src: string;
  alt: string;
};

const PARTNER_ID = "57983";

function banner(bannerId: string, alt: string): GuideBanner {
  const query = `partnerid=${PARTNER_ID}&bannerid=${bannerId}`;
  return {
    href: `https://www.partner-ads.com/dk/klikbanner.php?${query}`,
    src: `https://www.partner-ads.com/dk/visbanner.php?${query}`,
    alt,
  };
}

/** Partner-Ads kategori-bannere. Styrke har intet banner. */
const bannersByCategory: Record<string, GuideBanner> = {
  motionscykel: banner("38790", "Motionscykler — se aktuelle tilbud"),
  crosstrainer: banner("38783", "Crosstrainere — se aktuelle tilbud"),
  loebebaand: banner("38771", "Løbebånd — se aktuelle tilbud"),
  romaskine: banner("38778", "Romaskiner — se aktuelle tilbud"),
  tilbehoer: banner("38757", "Træningstilbehør — se aktuelle tilbud"),
};

/**
 * Blandede guides, hvor kategori-slugget ikke beskriver emnet.
 * Et cykel- eller løbebånds-banner ville være misvisende.
 */
const skipSlugs = new Set([
  "bedste-stoejsvage-traeningsmaskiner-lejlighed-2026",
  "bedste-foldbare-kompakte-traeningsmaskiner-2026",
  "bedste-traeningsudstyr-til-seniorer-2026",
  "bedste-knaevenlig-genoptraening-hjemme-2026",
  "bedste-traeningsudstyr-til-vaegttab-hjemme-2026",
  "bedste-traeningsudstyr-til-par-hjemmegym-2026",
  "home-gym-til-lille-vaerelse-10m2-2026",
  "bedste-cardio-under-lavt-loft-2026",
  "ultimative-home-gym-budget-2026",
  "ultimative-udendoers-home-gym-2026",
]);

export function getGuideBanner(
  guide: Pick<Guide, "slug" | "categorySlug">,
): GuideBanner | null {
  if (skipSlugs.has(guide.slug)) return null;
  return bannersByCategory[guide.categorySlug] ?? null;
}
