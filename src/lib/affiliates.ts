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
export const affiliates: AffiliateLink[] = [
  {
    id: "ascendic-essential-walking-pad",
    partner: "Ascendic.dk",
    label: "Se pris hos Ascendic.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?bannerid=94094&partnerid=57983&htmlurl=https://ascendic.dk/products/ascendic-7023-walking-pad-essential?variant=56388648173912",
  },
];

export function getAffiliate(id: string): AffiliateLink | undefined {
  return affiliates.find((a) => a.id === id);
}
