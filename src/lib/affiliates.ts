export type AffiliateLink = {
  id: string;
  partner: string;
  label: string;
  url: string;
};

/**
 * Partner-/affiliate-links.
 * Wire produktets `affiliateId` i lib/guides.ts, når URL’erne er klar.
 *
 * Eksempel:
 * { id: "loebebaand-virtufit-tr500i", partner: "Partner", label: "Se pris", url: "https://..." }
 */
export const affiliates: AffiliateLink[] = [];

export function getAffiliate(id: string): AffiliateLink | undefined {
  return affiliates.find((a) => a.id === id);
}
