import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { FeedProduct } from "./types";
import { classifyProduct } from "./classify";

function product(
  partial: Partial<FeedProduct> & Pick<FeedProduct, "title">,
): FeedProduct {
  return {
    id: "test",
    merchant: "Test",
    desc: "",
    category: "",
    brand: "",
    price: null,
    oldPrice: null,
    image: "",
    url: "https://example.com",
    inStock: true,
    ...partial,
  };
}

describe("classifyProduct — accessories excluded", () => {
  it("drops silikoneolie mentioning walking pad", () => {
    const r = classifyProduct(
      product({
        title: "Silikoneolie til løbebånd / walking pad 60 ml",
        brand: "Wohlstand",
      }),
    );
    assert.equal(r, null);
  });

  it("drops gulvbeskyttelsesmåtte with walking pad in title", () => {
    const r = classifyProduct(
      product({
        title: "Gulvbeskyttelsesmåtte (walking pad underlag) (200 x 90 x 0,6 cm)",
        brand: "Wohlstand",
      }),
    );
    assert.equal(r, null);
  });

  it("drops WorkWalk warranty (brand-only match)", () => {
    const r = classifyProduct(
      product({
        title: "EKSTRA: Udvidet garanti 2 år",
        brand: "WorkWalk",
        merchant: "WorkWalk",
      }),
    );
    assert.equal(r, null);
  });

  it("drops tilbehørspakke even with WorkWalk brand", () => {
    const r = classifyProduct(
      product({
        title: "Komplet tilbehørspakke",
        brand: "WorkWalk",
        merchant: "WorkWalk",
      }),
    );
    assert.equal(r, null);
  });

  it("drops pedaltræner with WorkWalk brand", () => {
    const r = classifyProduct(
      product({
        title: "Pedaltræner - forudbestilling",
        brand: "WorkWalk",
        merchant: "WorkWalk",
      }),
    );
    assert.equal(r, null);
  });

  it("drops floor guard mat mentioning motionscykel", () => {
    const r = classifyProduct(
      product({
        title:
          "Titan Life Floor Guard Mat - Til crosstrainer/motionscykel - 155 (L) x 65 (B) x 0,6 (T)",
      }),
    );
    assert.equal(r, null);
  });

  it("drops mini motionscykel / bevægelsestræner", () => {
    assert.equal(
      classifyProduct(
        product({ title: "Mini motionscykel (bevægelsetræner)", brand: "Maxy" }),
      ),
      null,
    );
    assert.equal(
      classifyProduct(
        product({ title: "Bevægelsestræner til arme og ben (uden sæde)" }),
      ),
      null,
    );
  });

  it("drops beskyttelsesmåtte with WorkWalk brand", () => {
    const r = classifyProduct(
      product({ title: "Beskyttelsesmåtte", brand: "WorkWalk" }),
    );
    assert.equal(r, null);
  });
});

describe("classifyProduct — real machines kept", () => {
  it("classifies WorkWalk Classic Gåbånd as loebebaand + gaabaand", () => {
    const r = classifyProduct(
      product({
        title: "WorkWalk Classic Gåbånd - Sort",
        brand: "WorkWalk DK",
        merchant: "WorkWalk",
        price: 1699,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "loebebaand");
    assert.ok(r!.intentSlugs?.includes("gaabaand"));
  });

  it("classifies Titan Life Treadmill as loebebaand", () => {
    const r = classifyProduct(
      product({
        title:
          "Titan Life Treadmill T36 - FRI FRAGT - Kvalitets løbebånd - HURTIG LEVERING!",
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "loebebaand");
  });

  it("classifies spinning cykel as motionscykel", () => {
    const r = classifyProduct(
      product({
        title:
          "Titan LIFE Spinning Cykel S11 - FRI FRAGT - Spin bike i god kvalitet - HURTIG LEVERING",
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "motionscykel");
    assert.ok(r!.intentSlugs?.includes("spinning"));
  });

  it("classifies walking pad as loebebaand + gaabaand", () => {
    const r = classifyProduct(
      product({
        title: "Sammenklappelig 3-i-1 Walking Pad med 10% stigning",
        price: 2299,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "loebebaand");
    assert.ok(r!.intentSlugs?.includes("gaabaand"));
    assert.ok(r!.intentSlugs?.includes("foldbar"));
  });

  it("classifies AssaultBike without airbike keyword as motionscykel + airbike", () => {
    const r = classifyProduct(
      product({
        title: "Assault Fitness AssaultBike Pro X",
        brand: "Assault Fitness",
        price: 8999,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "motionscykel");
    assert.ok(r!.intentSlugs?.includes("airbike"));
  });

  it("classifies airbike as motionscykel + airbike", () => {
    const r = classifyProduct(
      product({
        title: "Odin A800 Airbike",
        brand: "Odin",
        price: 4999,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "motionscykel");
    assert.ok(r!.intentSlugs?.includes("airbike"));
  });

  it("classifies multistation / home gym as styrkemaskiner + multistation", () => {
    const r = classifyProduct(
      product({
        title: "Odin Valhalla Home Gym Multistation 145 kg",
        brand: "Odin",
        price: 12999,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "styrkemaskiner");
    assert.ok(r!.intentSlugs?.includes("multistation"));
  });

  it("classifies Multistation-only title as styrkemaskiner", () => {
    const r = classifyProduct(
      product({
        title: "Multistation 100kg vægtstak",
        price: 7999,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "styrkemaskiner");
    assert.ok(r!.intentSlugs?.includes("multistation"));
  });

  it("classifies justerbar træningsbænk as styrkemaskiner + traeningsbaenk", () => {
    const r = classifyProduct(
      product({
        title: "TITAN LIFE BENCH 500 Justerbar træningsbænk",
        brand: "Titan Life",
        price: 1999,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "styrkemaskiner");
    assert.ok(r!.intentSlugs?.includes("traeningsbaenk"));
  });
});
