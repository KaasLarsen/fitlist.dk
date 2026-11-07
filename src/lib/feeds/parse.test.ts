import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseAdtractionGoogleRss } from "./parse";

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
