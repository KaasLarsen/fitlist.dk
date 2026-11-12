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
  {
    id: "ascendic-7021-loebebaand",
    partner: "Ascendic.dk",
    label: "Se pris hos Ascendic.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?bannerid=94094&partnerid=57983&htmlurl=https://ascendic.dk/products/ascendic-7021-lobeband?variant=56336394781016",
  },
  {
    id: "velorafit-foldbart-loebebaand",
    partner: "iHero",
    label: "Se pris hos iHero",
    url: "https://do.ihero.dk/t/t?a=1980284371&as=2127168443&t=2&tk=1&cupa_sku=57220268130686&fid=2971&epi=fitlist&url=https://shop.ihero.dk/products/lobeband?variant=57220268130686",
  },
  {
    id: "odin-rb-800-siddecykel",
    partner: "Apuls.dk",
    label: "Se pris hos Apuls.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?bannerid=46187&partnerid=57983&htmlurl=https://apuls.dk/odin-rb-800-comfort-siddecykel",
  },
  {
    id: "reebok-i-run-4-5-loebebaand",
    partner: "Apuls.dk",
    label: "Se pris hos Apuls.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?bannerid=46187&partnerid=57983&htmlurl=https://apuls.dk/reebok-i-run-4-5-lobeband",
  },
  {
    id: "odin-r1800-vandromaskine",
    partner: "Apuls.dk",
    label: "Se pris hos Apuls.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?bannerid=46187&partnerid=57983&htmlurl=https://apuls.dk/odin-r1800-vand-romaskine",
  },
  {
    id: "odin-a1000-airbike",
    partner: "Apuls.dk",
    label: "Se pris hos Apuls.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?bannerid=46187&partnerid=57983&htmlurl=https://apuls.dk/odin-a10-airbike-motionscykel",
  },
  {
    id: "odin-s1000-spinningcykel",
    partner: "Apuls.dk",
    label: "Se pris hos Apuls.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?bannerid=46187&partnerid=57983&htmlurl=https://apuls.dk/odin-s1000-spinningcykel-kinomap-zwift-bike",
  },
  {
    id: "odin-justerbare-haandvaegte-24kg",
    partner: "Apuls.dk",
    label: "Se pris hos Apuls.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?bannerid=46187&partnerid=57983&htmlurl=https://apuls.dk/odin-justerbar-handvaegte-2-stk-24kg",
  },
  {
    id: "ascendic-6004-romaskine",
    partner: "Ascendic.dk",
    label: "Se pris hos Ascendic.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?bannerid=94094&partnerid=57983&htmlurl=https://ascendic.dk/products/ascendic-6004-romaskine?variant=55357722100056",
  },
  {
    id: "titan-life-b35-motionscykel",
    partner: "HomeX.dk",
    label: "Se pris hos HomeX.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?bannerid=92127&partnerid=57983&htmlurl=https://www.homex.dk/shop/68-motionscykler--kondicykler/2702-titan-life-b35---fri-fragt---stabil-motionscykel---her-faar-du-rigtig-meget-for-pengene-hurtig-levering/",
  },
  {
    id: "ascendic-8001-foldbar-motionscykel",
    partner: "Ascendic.dk",
    label: "Se pris hos Ascendic.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?bannerid=94094&partnerid=57983&htmlurl=https://ascendic.dk/products/ascendic-8001-foldbar-motionscykel?variant=39480045797550",
  },
  {
    id: "titan-life-s72-spinningcykel",
    partner: "HomeX.dk",
    label: "Se pris hos HomeX.dk",
    url: "https://www.partner-ads.com/dk/klikbanner.php?bannerid=92127&partnerid=57983&htmlurl=https://www.homex.dk/shop/85-spinningcykler/2807-titan-life-spinning-cykel-s72---fri-fragt---spin-bike-i-god-kvalitet---hurtig-levering/",
  },
];

export function getAffiliate(id: string): AffiliateLink | undefined {
  return affiliates.find((a) => a.id === id);
}
