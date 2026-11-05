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

describe("classifyProduct — hard excludes", () => {
  it("drops silikoneolie mentioning walking pad", () => {
    const r = classifyProduct(
      product({
        title: "Silikoneolie til løbebånd / walking pad 60 ml",
        brand: "Wohlstand",
      }),
    );
    assert.equal(r, null);
  });

  it("drops English silicone product even with løbebånd feed category", () => {
    const r = classifyProduct(
      product({
        title: "Kema - Silicone GM12",
        brand: "Kema",
        category: "Løbebånd",
        price: 125,
      }),
    );
    assert.equal(r, null);
  });

  it("drops tablet holder kit in løbebånd feed category", () => {
    const r = classifyProduct(
      product({
        title: "Star Trac Tablet Holder Kit.",
        brand: "Star Trac",
        category: "Løbebånd",
        price: 1454,
      }),
    );
    assert.equal(r, null);
  });

  it("drops OEM løbebælte spare part", () => {
    const r = classifyProduct(
      product({
        title: "Life Fitness løbebælte OEM - Classic voks",
        brand: "Life Fitness",
        category: "Løbebånd",
        price: 2995,
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
});

describe("classifyProduct — tilbehoer (must-haves)", () => {
  it("classifies gulvbeskyttelsesmåtte as tilbehoer + gulvmaatter", () => {
    const r = classifyProduct(
      product({
        title: "Gulvbeskyttelsesmåtte (walking pad underlag) (200 x 90 x 0,6 cm)",
        brand: "Wohlstand",
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "tilbehoer");
    assert.ok(r!.intentSlugs?.includes("gulvmaatter"));
  });

  it("classifies floor guard mat as tilbehoer", () => {
    const r = classifyProduct(
      product({
        title:
          "Titan Life Floor Guard Mat - Til crosstrainer/motionscykel - 155 (L) x 65 (B) x 0,6 (T)",
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "tilbehoer");
    assert.ok(r!.intentSlugs?.includes("gulvmaatter"));
  });

  it("classifies beskyttelsesmåtte as tilbehoer", () => {
    const r = classifyProduct(
      product({ title: "Beskyttelsesmåtte", brand: "WorkWalk" }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "tilbehoer");
  });

  it("classifies justerbare håndvægte as tilbehoer + haandvaegte", () => {
    const r = classifyProduct(
      product({
        title: "Odin Justerbar Håndvægt 20 kg (2×10 kg)",
        brand: "Odin",
        price: 1499,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "tilbehoer");
    assert.ok(r!.intentSlugs?.includes("haandvaegte"));
  });

  it("classifies elastiksæt as tilbehoer + elastikker", () => {
    const r = classifyProduct(
      product({
        title: "Ascendic Elastik træningssæt (med håndtag)",
        brand: "Ascendic",
        price: 149,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "tilbehoer");
    assert.ok(r!.intentSlugs?.includes("elastikker"));
  });

  it("classifies slyngetræner as tilbehoer + slyngetraener", () => {
    const r = classifyProduct(
      product({
        title: "Odin Suspension Trainer / Slyngetræner",
        brand: "Odin",
        price: 399,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "tilbehoer");
    assert.ok(r!.intentSlugs?.includes("slyngetraener"));
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

  it("classifies siddecykel as motionscykel + siddecykel intent", () => {
    const r = classifyProduct(
      product({
        title: "Odin RB-800 Comfort Siddecykel",
        brand: "Odin",
        price: 5499,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "motionscykel");
    assert.ok(r!.intentSlugs?.includes("siddecykel"));
  });

  it("drops circulation trainer mini bikes", () => {
    const r = classifyProduct(
      product({
        title: "Titan Life Circulation Trainer Motionscykel / Siddecykel",
        brand: "Titan Fitness",
        price: 453,
      }),
    );
    assert.equal(r, null);
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

  it("classifies Zwift/Kinomap spinningcykel as motionscykel + smart", () => {
    const r = classifyProduct(
      product({
        title: "Odin S1000 Spinningcykel - Kinomap & Zwift Bike",
        brand: "Odin",
        price: 6999,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "motionscykel");
    assert.ok(r!.intentSlugs?.includes("smart"));
  });

  it("classifies Bluetooth motionscykel as smart", () => {
    const r = classifyProduct(
      product({
        title: "Odin B800 Bluetooth Motionscykel",
        brand: "Odin",
        price: 4999,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "motionscykel");
    assert.ok(r!.intentSlugs?.includes("smart"));
  });

  it("does not tag pulse belt as smart even with Bluetooth", () => {
    const r = classifyProduct(
      product({
        title: "VirtuFit Universelt Bluetooth Pulsmålerbælte",
        brand: "VirtuFit",
        category: "Spinningcykel",
        price: 360,
      }),
    );
    // Category may match via feed category text; smart intent must stay off
    if (r) {
      assert.ok(!r.intentSlugs?.includes("smart"));
    }
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
    assert.ok(r!.intentSlugs?.includes("stigning"));
    assert.ok(r!.intentSlugs?.includes("plads"));
  });

  it("does not tag siddecykel indstigning as stigning intent", () => {
    const r = classifyProduct(
      product({
        title: "Odin RB-800 Comfort Siddecykel med lav indstigning",
        brand: "Odin",
        price: 4999,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "motionscykel");
    assert.ok(!r!.intentSlugs?.includes("stigning"));
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

  it("classifies vægmonteret kabeltårn as styrkemaskiner + kabeltaarn", () => {
    const r = classifyProduct(
      product({
        title: "Odin Vægmonteret Kabeltårn Single",
        brand: "Odin",
        price: 3999,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "styrkemaskiner");
    assert.ok(r!.intentSlugs?.includes("kabeltaarn"));
    assert.ok(!r!.intentSlugs?.includes("multistation"));
  });

  it("keeps cable cross machine as styrkemaskiner not tilbehoer", () => {
    const r = classifyProduct(
      product({
        title: "Titanium Fitness Cable Cross Machine",
        brand: "Titanium Fitness",
        price: 8999,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "styrkemaskiner");
  });
});
