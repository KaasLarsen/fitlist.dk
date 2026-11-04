export type AffiliateLink = {
  id: string;
  partner: string;
  label: string;
  url: string;
};

/**
 * Valgfri manuelle affiliate-URL’er (fallback).
 * Primær shop-CTA i guides bruger `feedProductId` → Partner-Ads-kataloget.
 *
 * Eksempel:
 * { id: "loebebaand-virtufit-tr500i", partner: "Partner", label: "Se pris", url: "https://..." }
 */
export const affiliates: AffiliateLink[] = [];

export function getAffiliate(id: string): AffiliateLink | undefined {
  return affiliates.find((a) => a.id === id);
}
