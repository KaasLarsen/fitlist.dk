export type AffiliateLink = {
  id: string;
  partner: string;
  label: string;
  url: string;
};

/**
 * Partner-/affiliate-links. Udfyld når partneraftaler er på plads.
 */
export const affiliates: AffiliateLink[] = [];

export function getAffiliate(id: string): AffiliateLink | undefined {
  return affiliates.find((a) => a.id === id);
}
