import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseAdtractionGoogleRss, parsePartnerAdsXml } from "./parse";

const XML = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <item>
      <g:id>10-250-0125</g:id>
      <title>Vægtplade metal 25 mm</title>
      <description>Jernvægtskive.</description>
      <g:product_type>Styrke &amp;gt; Vægtskiver &amp;amp; låse</g:product_type>
      <link>https://in.sportgymbutikken.dk/t/t?a=1954033535&amp;as=2127168443&amp;t=2&amp;tk=1&amp;url=https://www.sportgymbutikken.dk/dk/artiklar/plade.html</link>
      <g:image_link>https://www.sportgymbutikken.dk/bilder/artiklar/10-250-0125.jpg</g:image_link>
      <g:availability>out_of_stock</g:availability>
      <g:sale_price>26 DKK</g:sale_price>
      <g:price>78 DKK</g:price>
      <g:brand>JTC POWER</g:brand>
    </item>
    <item>
      <g:id>10-500-0500</g:id>
      <title>Bumper Vægtskiver, 2 x 5 kg</title>
      <description>Et par skiver.</description>
      <g:product_type>Styrke &amp;gt; Vægtskiver</g:product_type>
      <link>https://in.sportgymbutikken.dk/t/t?a=1&amp;as=2</link>
      <g:image_link>https://www.sportgymbutikken.dk/bilder/artiklar/10-500-0500.jpg</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:sale_price></g:sale_price>
      <g:price>669 DKK</g:price>
      <g:brand>JTC POWER</g:brand>
    </item>
  </channel>
</rss>`;

describe("parseAdtractionGoogleRss", () => {
  const products = parseAdtractionGoogleRss(XML, "Sportgymbutikken");

  it("parses a discounted, out-of-stock item and stamps epi", () => {
    const sale = products.find((p) => p.id === "Sportgymbutikken:10-250-0125");
    assert.ok(sale);
    assert.equal(sale.title, "Vægtplade metal 25 mm");
    assert.equal(sale.price, 26);
    assert.equal(sale.oldPrice, 78);
    assert.equal(sale.inStock, false);
    assert.equal(sale.brand, "JTC POWER");
    assert.equal(sale.category, "Styrke > Vægtskiver & låse");
    assert.equal(sale.merchant, "Sportgymbutikken");
    const url = new URL(sale.url);
    assert.equal(url.hostname, "in.sportgymbutikken.dk");
    assert.equal(url.searchParams.get("epi"), "fitlist");
    assert.equal(url.searchParams.get("a"), "1954033535");
    assert.equal(
      url.searchParams.get("url"),
      "https://www.sportgymbutikken.dk/dk/artiklar/plade.html",
    );
  });

  it("keeps list price when sale_price is empty and marks in stock", () => {
    const regular = products.find((p) => p.id === "Sportgymbutikken:10-500-0500");
    assert.ok(regular);
    assert.equal(regular.price, 669);
    assert.equal(regular.oldPrice, null);
    assert.equal(regular.inStock, true);
    assert.equal(new URL(regular.url).searchParams.get("epi"), "fitlist");
  });
});

const PARTNER_ADS_XML = `<?xml version="1.0" encoding="ISO-8859-1"?>
<produkter>
  <produkt>
    <produktid>111</produktid>
    <produktnavn>Wahoo KICKR CORE</produktnavn>
    <vareurl>https://www.partner-ads.com/dk/klikbanner.php?bannerid=1&amp;partnerid=1&amp;htmlurl=https://example.com/a</vareurl>
    <nypris>3999</nypris>
    <glpris>4499</glpris>
    <billedurl>https://example.com/a.jpg</billedurl>
    <kategorinavn>Hometrainere</kategorinavn>
    <brand>Wahoo</brand>
    <lagerantal>1</lagerantal>
  </produkt>
  <produkt>
    <produktid>222</produktid>
    <produktnavn>Outdoor cykel</produktnavn>
    <vareurl>https://www.partner-ads.com/dk/klikbanner.php?bannerid=1&amp;partnerid=1&amp;htmlurl=https://example.com/b</vareurl>
    <nypris>9999</nypris>
    <billedurl>https://example.com/b.jpg</billedurl>
    <kategorinavn>Racercykler</kategorinavn>
    <brand>Specialized</brand>
    <lagerantal>1</lagerantal>
  </produkt>
</produkter>`;

describe("parsePartnerAdsXml onlyIds", () => {
  it("returns only matching guide product ids", () => {
    const products = parsePartnerAdsXml(PARTNER_ADS_XML, "Cykelpartner.dk", {
      onlyIds: new Set(["Cykelpartner.dk:111"]),
    });
    assert.equal(products.length, 1);
    assert.equal(products[0].id, "Cykelpartner.dk:111");
    assert.equal(products[0].title, "Wahoo KICKR CORE");
    assert.equal(products[0].price, 3999);
    assert.equal(products[0].oldPrice, 4499);
  });
});
