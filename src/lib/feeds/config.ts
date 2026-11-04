/**
 * Partner-Ads produktfeeds (XML med billedurl + tracked vareurl).
 * Publisher partnerid: 57983
 */
export const PARTNER_ADS_PARTNER_ID = "57983";

/** Click-ref i Partner-Ads (må ikke indeholde `/`). */
export const PARTNER_ADS_UID = "fitlist";

export type PartnerAdsFeed = {
  /** Kort id til cache-nøgler / logs */
  id: string;
  bannerId: string;
  feedId: string;
  merchant: string;
};

export const PARTNER_ADS_FEEDS: readonly PartnerAdsFeed[] = [
  {
    id: "apuls",
    bannerId: "46187",
    feedId: "637",
    merchant: "Apuls.dk",
  },
  {
    id: "billig-fitness",
    bannerId: "90815",
    feedId: "2352",
    merchant: "Billig-fitness.dk",
  },
  {
    id: "cbl-fitness",
    bannerId: "87318",
    feedId: "2171",
    merchant: "CBL-Fitness.dk",
  },
  {
    id: "fitnessengros",
    bannerId: "89036",
    feedId: "2245",
    merchant: "Fitnessengros.dk",
  },
  {
    id: "fitnessfree",
    bannerId: "118836",
    feedId: "4509",
    merchant: "FITNESSFREE.DK",
  },
  {
    id: "homex",
    bannerId: "92127",
    feedId: "2425",
    merchant: "HomeX.dk",
  },
  {
    id: "jt-sport",
    bannerId: "117077",
    feedId: "4333",
    merchant: "JT Sport",
  },
  {
    id: "workwalk",
    bannerId: "111924",
    feedId: "3772",
    merchant: "WorkWalk",
  },
] as const;

export function partnerAdsFeedUrl(
  feed: Pick<PartnerAdsFeed, "bannerId" | "feedId">,
  partnerId: string = PARTNER_ADS_PARTNER_ID,
): string {
  const params = new URLSearchParams({
    partnerid: partnerId,
    bannerid: feed.bannerId,
    feedid: feed.feedId,
  });
  return `https://www.partner-ads.com/dk/feed_udlaes.php?${params.toString()}`;
}

/** Tilføj uid på Partner-Ads klikbanner-URL'er fra feeds. */
export function ensurePartnerAdsKlikUid(
  href: string,
  uid: string = PARTNER_ADS_UID,
): string {
  const trimmed = href.trim();
  if (!trimmed.includes("partner-ads.com/dk/klikbanner.php")) return trimmed;
  try {
    const u = new URL(trimmed);
    u.searchParams.set("uid", uid.trim() || PARTNER_ADS_UID);
    return u.toString();
  } catch {
    return trimmed;
  }
}
