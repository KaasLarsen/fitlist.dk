import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { FeedProduct } from "../feeds/types";
import type { Guide } from "../guides";
import { buildGuideJsonLd, buildProductJsonLd } from "./guide-jsonld";

function baseGuide(overrides: Partial<Guide> = {}): Guide {
  return {
    slug: "test-guide-2026",
    title: "Testguide 2026",
    excerpt: "Kort excerpt",
    metaDescription: "Meta til test",
    categorySlug: "loebebaand",
    publishedAt: "2026-01-01",
    updatedAt: "2026-11-18",
    intro: "Intro",
    criteria: [],
    products: [
      {
        id: "prod-a",
        name: "Test Løbebånd A",
        badge: "Bedst samlet",
        summary: "Solid allround til hjemmet.",
        rating: 4.8,
        pros: ["Stabil"],
        cons: ["Fylder"],
        specs: [{ label: "Motor", value: "2.5 CHP" }],
        feedProductId: "Shop:1",
        imageUrl: "https://example.com/a.jpg",
      },
      {
        id: "prod-b",
        name: "Test Løbebånd B",
        badge: "Bedste billige",
        summary: "Budget uden walking pad.",
        rating: 4.3,
        pros: ["Pris"],
        cons: ["Støj"],
        specs: [],
        feedProductId: "Shop:2",
      },
    ],
    howToChoose: "Vælg A til løb.",
    learningSections: [],
    faqs: [
      {
        question: "Løbebånd eller gåbånd?",
        answer: "Løbebånd hvis du skal løbe.",
      },
    ],
    ...overrides,
  };
}

function mockOffer(partial: Partial<FeedProduct> & Pick<FeedProduct, "id">): FeedProduct {
  return {
    merchant: "Shop",
    title: "Offer",
    desc: "",
    category: "",
    brand: "Ascendic",
    price: 4999,
    oldPrice: null,
    image: "https://example.com/offer.jpg",
    url: "https://shop.example/product",
    inStock: true,
    ...partial,
  };
}

describe("buildGuideJsonLd", () => {
  it("emits Article, FAQPage, ItemList with Product/Review/Offer, and BreadcrumbList", () => {
    const guide = baseGuide();
    const offerMap = new Map<string, FeedProduct | undefined>([
      ["Shop:1", mockOffer({ id: "Shop:1", price: 5999 })],
      ["Shop:2", mockOffer({ id: "Shop:2", price: 3499, inStock: false })],
    ]);

    const doc = buildGuideJsonLd(guide, offerMap);
    assert.equal(doc["@context"], "https://schema.org");

    const types = doc["@graph"].map((n) => n["@type"]);
    assert.ok(types.includes("Article"));
    assert.ok(types.includes("FAQPage"));
    assert.ok(types.includes("ItemList"));
    assert.ok(types.includes("BreadcrumbList"));

    const article = doc["@graph"].find((n) => n["@type"] === "Article")!;
    assert.equal(article.dateModified, "2026-11-18");
    assert.equal(article.datePublished, "2026-01-01");
    const publisher = article.publisher as { logo?: { url?: string } };
    assert.ok(publisher.logo?.url?.includes("/icon"));

    const faq = doc["@graph"].find((n) => n["@type"] === "FAQPage")!;
    const mainEntity = faq.mainEntity as { name: string }[];
    assert.equal(mainEntity[0]?.name, "Løbebånd eller gåbånd?");

    const list = doc["@graph"].find((n) => n["@type"] === "ItemList")!;
    const elements = list.itemListElement as {
      item: {
        "@type": string;
        review?: { reviewRating: { ratingValue: number } };
        offers?: { price: string; availability: string };
      };
    }[];
    assert.equal(elements.length, 2);
    assert.equal(elements[0]?.item["@type"], "Product");
    assert.equal(elements[0]?.item.review?.reviewRating.ratingValue, 4.8);
    assert.equal(elements[0]?.item.offers?.price, "5999");
    assert.equal(
      elements[1]?.item.offers?.availability,
      "https://schema.org/OutOfStock",
    );
  });

  it("emits a single Product node for modelguides", () => {
    const guide = baseGuide({
      kind: "modelguide",
      products: [baseGuide().products[0]!],
    });
    const doc = buildGuideJsonLd(guide, new Map());
    const types = doc["@graph"].map((n) => n["@type"]);
    assert.ok(types.includes("Product"));
    assert.ok(!types.includes("ItemList"));
  });

  it("emits HowTo when howToSteps are set", () => {
    const guide = baseGuide({
      howToSteps: [
        { name: "Trin 1", text: "Gør A." },
        { name: "Trin 2", text: "Gør B." },
      ],
    });
    const doc = buildGuideJsonLd(guide);
    const howTo = doc["@graph"].find((n) => n["@type"] === "HowTo");
    assert.ok(howTo);
    const steps = howTo!.step as { name: string; position: number }[];
    assert.equal(steps.length, 2);
    assert.equal(steps[0]?.name, "Trin 1");
    assert.equal(steps[0]?.position, 1);
  });

  it("omits Review when rating is missing and Offer when feed URL is missing", () => {
    const guide = baseGuide({
      kind: "modelguide",
      products: [
        {
          id: "no-rating",
          name: "Uden score",
          summary: "Kun tekst.",
          pros: [],
          cons: [],
          specs: [],
          feedProductId: "Shop:x",
        },
      ],
    });
    const offerMap = new Map<string, FeedProduct | undefined>([
      [
        "Shop:x",
        mockOffer({ id: "Shop:x", url: "", price: 100 }),
      ],
    ]);
    // empty url should drop Offer
    offerMap.set("Shop:x", {
      ...mockOffer({ id: "Shop:x" }),
      url: "",
    });

    const product = buildProductJsonLd(
      guide,
      guide.products[0]!,
      "https://www.fitlist.dk/guides/modelguides/test",
      offerMap,
    );
    assert.equal(product.review, undefined);
    assert.equal(product.offers, undefined);
  });
});
