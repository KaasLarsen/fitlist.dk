import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { matchesQuery, normalizeQuery, searchSite } from "./search";
import type { FeedProduct } from "./feeds/types";

describe("matchesQuery", () => {
  it("matches contiguous substring for single token", () => {
    assert.equal(matchesQuery("Odin T620 Løbebånd", normalizeQuery("t620")), true);
  });

  it("AND-matches multi-word queries", () => {
    const needle = normalizeQuery("odin t620");
    assert.equal(matchesQuery("Odin T620 Løbebånd", needle), true);
    assert.equal(matchesQuery("Odin C200 Crosstrainer", needle), false);
  });
});

describe("searchSite", () => {
  it("finds Odin T620 with multi-word query", () => {
    const catalog: FeedProduct[] = [
      {
        id: "Apuls.dk:15337",
        merchant: "Apuls.dk",
        title: "Odin T620 Løbebånd",
        desc: "",
        category: "",
        brand: "Odin",
        price: 5999,
        oldPrice: 8400,
        image: "https://example.com/t620.jpg",
        url: "https://example.com/t620",
        inStock: true,
        categorySlug: "loebebaand",
      },
      {
        id: "Apuls.dk:1",
        merchant: "Apuls.dk",
        title: "Odin Træningselastik",
        desc: "",
        category: "",
        brand: "Odin",
        price: 9,
        oldPrice: null,
        image: "https://example.com/e.jpg",
        url: "https://example.com/e",
        inStock: true,
        categorySlug: "tilbehoer",
      },
    ];

    const results = searchSite("odin t620", catalog);
    assert.equal(results.products.length, 1);
    assert.equal(results.products[0]?.id, "Apuls.dk:15337");
  });
});
