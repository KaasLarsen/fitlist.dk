import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { fitFeedProductsForCache } from "./fetch";
import type { FeedProduct } from "./types";

function makeProduct(
  index: number,
  overrides?: Partial<FeedProduct>,
): FeedProduct {
  const longUrl = `https://www.partner-ads.com/dk/klikbanner.php?bannerid=1&partnerid=1&htmlurl=${"x".repeat(800)}&id=${index}`;
  return {
    id: `HomeX.dk:${index}`,
    merchant: "HomeX.dk",
    title: `Test motionscykel model ${index} med ekstra marketingtekst`,
    desc: "should be stripped",
    category: "should be stripped",
    brand: "Titan Life",
    price: 1000 + index,
    oldPrice: 2000 + index,
    image: `https://cdn.example.com/images/product-${index}.jpg`,
    url: longUrl,
    inStock: index % 2 === 0,
    categorySlug: index % 5 === 0 ? "must-haves" : "motionscykel",
    intentSlugs: ["spinning", "billig", "stoejsvag"],
    ...overrides,
  };
}

describe("fitFeedProductsForCache", () => {
  it("keeps payload under the Next.js 2MB Data Cache limit", () => {
    const products = Array.from({ length: 500 }, (_, i) => makeProduct(i));
    const fitted = fitFeedProductsForCache(products);
    const bytes = Buffer.byteLength(JSON.stringify(fitted), "utf8");

    assert.ok(fitted.length > 0);
    assert.ok(fitted.length <= 120);
    assert.ok(bytes <= 1_400_000, `payload ${bytes} bytes exceeds budget`);
    assert.equal(fitted[0]?.desc, "");
    assert.equal(fitted[0]?.category, "");
  });

  it("prefers in-stock machine products over must-haves", () => {
    const products = [
      makeProduct(1, {
        inStock: false,
        categorySlug: "motionscykel",
        price: 500,
      }),
      makeProduct(2, {
        inStock: true,
        categorySlug: "must-haves",
        price: 100,
      }),
      makeProduct(3, {
        inStock: true,
        categorySlug: "motionscykel",
        price: 900,
      }),
    ];
    const fitted = fitFeedProductsForCache(products, {
      maxProducts: 2,
      maxBytes: 1_400_000,
    });

    assert.equal(fitted.length, 2);
    assert.equal(fitted[0]?.id, "HomeX.dk:3");
    assert.equal(fitted[1]?.id, "HomeX.dk:2");
  });
});
