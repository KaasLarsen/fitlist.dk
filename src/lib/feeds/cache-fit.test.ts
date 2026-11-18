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
    categorySlug: index % 5 === 0 ? "tilbehoer" : "motionscykel",
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
    assert.ok(fitted.length <= 300);
    assert.ok(bytes <= 1_400_000, `payload ${bytes} bytes exceeds budget`);
    assert.equal(fitted[0]?.desc, "");
    assert.equal(fitted[0]?.category, "");
  });

  it("keeps maxSpeedKmh through slim for løbebånd", () => {
    const products = [
      makeProduct(1, {
        categorySlug: "loebebaand",
        title: "Foldbart løbebånd 1-12 km/t",
        maxSpeedKmh: 12,
        inStock: true,
      }),
    ];
    const fitted = fitFeedProductsForCache(products, {
      maxProducts: 10,
      maxBytes: 1_400_000,
    });
    assert.equal(fitted[0]?.maxSpeedKmh, 12);
  });

  it("prefers in-stock machine products over tilbehoer", () => {
    const products = [
      makeProduct(1, {
        inStock: false,
        categorySlug: "motionscykel",
        price: 500,
      }),
      makeProduct(2, {
        inStock: true,
        categorySlug: "tilbehoer",
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

  it("keeps mid-range machines when cheap tilbehoer would otherwise fill the cap", () => {
    const cheapAccessories = Array.from({ length: 80 }, (_, i) =>
      makeProduct(i, {
        id: `Apuls.dk:acc-${i}`,
        merchant: "Apuls.dk",
        title: `Odin Træningselastik Niveau ${i}`,
        brand: "Odin",
        categorySlug: "tilbehoer",
        price: 9 + i,
        inStock: true,
      }),
    );

    const cheapTreadmills = Array.from({ length: 30 }, (_, i) =>
      makeProduct(1000 + i, {
        id: `Apuls.dk:tb-${i}`,
        merchant: "Apuls.dk",
        title: `Budget Løbebånd ${i}`,
        brand: "Budget",
        categorySlug: "loebebaand",
        price: 1500 + i * 50,
        inStock: true,
      }),
    );

    const t620 = makeProduct(2000, {
      id: "Apuls.dk:15337",
      merchant: "Apuls.dk",
      title: "Odin T620 Løbebånd",
      brand: "Odin",
      categorySlug: "loebebaand",
      price: 5999,
      inStock: true,
    });

    const fitted = fitFeedProductsForCache(
      [...cheapAccessories, ...cheapTreadmills, t620],
      { maxProducts: 40, maxBytes: 1_400_000 },
    );

    assert.ok(
      fitted.some((p) => p.id === "Apuls.dk:15337"),
      "Odin T620 should survive cache trim via price-diverse machine slots",
    );
    assert.ok(
      fitted.filter((p) => p.categorySlug === "loebebaand").length >
        fitted.filter((p) => p.categorySlug === "tilbehoer").length,
      "machines should outnumber accessories in the trimmed cache",
    );
  });

  it("keeps isbad accessories when cheap elastikker would otherwise dominate", () => {
    const cheapBands = Array.from({ length: 60 }, (_, i) =>
      makeProduct(i, {
        id: `Apuls.dk:band-${i}`,
        merchant: "Apuls.dk",
        title: `Odin Elastik ${i}`,
        categorySlug: "tilbehoer",
        intentSlugs: ["elastikker"],
        price: 9 + i,
        inStock: true,
      }),
    );

    const isbad = makeProduct(900, {
      id: "SportGym:52737086194001",
      merchant: "SportGym",
      title: "VirtuFit Isbad XXL - 375 liter",
      categorySlug: "isbad",
      intentSlugs: ["billig"],
      price: 495,
      inStock: true,
    });

    const machine = makeProduct(901, {
      id: "HomeX.dk:bike-1",
      merchant: "HomeX.dk",
      title: "Test motionscykel",
      categorySlug: "motionscykel",
      intentSlugs: ["billig"],
      price: 2999,
      inStock: true,
    });

    const fitted = fitFeedProductsForCache([...cheapBands, isbad, machine], {
      maxProducts: 20,
      maxBytes: 1_400_000,
    });

    assert.ok(
      fitted.some((p) => p.id === "SportGym:52737086194001"),
      "isbad should survive via intent round-robin among accessories",
    );
  });
});
