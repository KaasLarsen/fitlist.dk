export type CampaignBannerConfig = {
  id: string;
  enabled: boolean;
  href: string;
  label: string;
  ariaLabel: string;
};

/**
 * Sæsonkampagner (sticky top-bar).
 * Sæt `enabled: false` for at skjule banneret efter kampagnen.
 */
export const blackDaysCampaign: CampaignBannerConfig = {
  id: "black-days-2026",
  enabled: true,
  href: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=57983&bannerid=116577&uid=BF&htmlurl=https://sportgym.dk/collections/black-days",
  label: "Black Days er i gang — spar op til 62% på træningsmaskiner her »",
  ariaLabel: "Black Days hos SportGym — se tilbud (affiliate-link)",
};

/** Aktiv kampagne til sticky banner, eller null hvis ingen. */
export function getActiveCampaignBanner(): CampaignBannerConfig | null {
  if (!blackDaysCampaign.enabled) return null;
  return blackDaysCampaign;
}
