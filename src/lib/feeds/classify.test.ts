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

  it("drops bademåtte and sauna-underlag", () => {
    assert.equal(
      classifyProduct(
        product({
          title: "AquaMat Superabsorberende bademåtte",
          category: "Hjem og have > Badeværelse tilbehør > Badeværelse måtter",
          brand: "AVA Beauty",
          merchant: "AVA Beauty",
        }),
      ),
      null,
    );
    assert.equal(
      classifyProduct(
        product({
          title: "Cobblestone Badeværelsesmåtte",
          brand: "AVA Beauty",
          merchant: "AVA Beauty",
        }),
      ),
      null,
    );
    assert.equal(
      classifyProduct(
        product({
          title: "Brandfast Underlag til Saunatæppe",
          category: "Hjem og have > Pool og spa > Saunatilbehør",
          brand: "AVA Beauty",
          merchant: "AVA Beauty",
        }),
      ),
      null,
    );
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

  it("drops spinning t-shirt even with Motionscykel feed category", () => {
    assert.equal(
      classifyProduct(
        product({
          title:
            "Body Bike Weisshorn T-shirt str. M spinning t shirt sort, Comfort Collection",
          brand: "Body Bike",
          category: "Motionscykel",
          price: 85,
        }),
      ),
      null,
    );
  });

  it("drops spinning jersey / trøje", () => {
    assert.equal(
      classifyProduct(
        product({
          title:
            "Body Bike Dinara Jersey Women str. 36 - spinning trøje til kvinder",
          brand: "Body Bike",
          category: "Motionscykel",
          price: 285,
        }),
      ),
      null,
    );
  });

  it("drops bike spare parts and accessories from motionscykel feeds", () => {
    const noise = [
      "Odin S800 Bremseklods",
      "Justerings håndtag Indoor Bike 20 mm.",
      "Peak Fitness - Strømforsyning - B2.0i motionscykel",
      "Odin Strømadapter",
      "Peak Fitness - Racerstyr til Indoor Bike",
      "VirtuFit Universel Pulsmåler 5 kHz",
      "VirtuFit Universelt Bluetooth Pulsmålerbælte",
      "Universal Flaskeholder",
      "Klikpedaler LOOK",
    ];
    for (const title of noise) {
      assert.equal(
        classifyProduct(
          product({ title, category: "Motionscykel", brand: "Odin" }),
        ),
        null,
        title,
      );
    }
  });

  it("drops water rower chemicals and elevate kits from romaskine feeds", () => {
    const noise = [
      "VirtuFit Universelle WaterRower Puritabs - Klortabletter",
      "Fluid Rower - Tabletter 4 stk.",
      "VirtuFit Elevate Kit",
    ];
    for (const title of noise) {
      assert.equal(
        classifyProduct(
          product({ title, category: "Romaskine", brand: "VirtuFit" }),
        ),
        null,
        title,
      );
    }
  });

  it("drops crosstrainer power supplies and chest transmitters", () => {
    assert.equal(
      classifyProduct(
        product({
          title: "Peak Fitness - Strømforsyning - 9V-2.000ma",
          category: "Crosstrainer",
        }),
      ),
      null,
    );
    assert.equal(
      classifyProduct(
        product({
          title: "Polar - T34 brystsender - Ukodet",
          category: "Crosstrainer",
        }),
      ),
      null,
    );
  });

  it("drops LifeVenture Ellipse camping gear that matched bare ellipse", () => {
    const noise = [
      "LifeVenture - Ellipse foldeskål - Antracit",
      "LifeVenture - Ellipse foldetallerken - Antracit",
      "LifeVenture - Ellipse krus - Antracit",
      "LifeVenture - Ellipse campingbestik - Antracit",
      "LifeVenture - Ellipse campingservice, 4 dele - Marineblå",
      "LifeVenture - Ellipse køkkenredskabssæt - Standard",
    ];
    for (const title of noise) {
      assert.equal(
        classifyProduct(
          product({ title, brand: "LifeVenture", merchant: "JT Sport", price: 40 }),
        ),
        null,
        title,
      );
    }
  });

  it("drops New Balance Ellipse løbesko that matched bare ellipse", () => {
    assert.equal(
      classifyProduct(
        product({
          title: "New Balance Fresh Foam Ellipse Løbesko Dame",
          brand: "New Balance",
          merchant: "Billigsport24.dk",
          price: 699,
        }),
      ),
      null,
    );
  });

  it("drops strength accessories that matched via bare cable / home gym", () => {
    const noise = [
      "Odin Cable Crossfit Sjippetov Blå Long Handle 300cm",
      "Cruz Cable Beach Svømmebriller",
      "Odin Mjolnir Grip Tape Sort",
      "VirtuFit Cable D Handle",
      "Body Bike Racer Sadel m. Beslag - sort sadel til spinningcykler og home gym",
      "LMX PU Olympisk Disc 50mm 2,50kg - Brugt vægtskive til home gym",
      "Plakat Bold 70 x 50 cm - sporty vægdekoration til home gym",
      "Home Benlås til Home Træningsbænke",
      "Crossmaxx T-shirt XL trænings T-shirt til styrketræning",
      "Chin up greb med gummihåndtag",
    ];
    for (const title of noise) {
      assert.equal(
        classifyProduct(
          product({ title, category: "Styrkemaskiner", brand: "Odin" }),
        ),
        null,
        title,
      );
    }
  });
});

describe("classifyProduct — tilbehoer (must-haves)", () => {
  it("classifies AVA Beauty træningsmåtte, håndvægt og elastik", () => {
    const mat = classifyProduct(
      product({
        title: "Gulvbeskyttende træningsmåtte",
        category: "Sportsartikler > Fitness og konditionstræning > Måtter til træningsmaskiner",
        brand: "AVA Beauty",
        merchant: "AVA Beauty",
        price: 199,
      }),
    );
    assert.ok(mat);
    assert.equal(mat!.categorySlug, "tilbehoer");
    assert.ok(mat!.intentSlugs?.includes("gulvmaatter"));

    const dumbbell = classifyProduct(
      product({
        title: "Justerbar Håndvægt til hjemmetræning",
        brand: "AVA Beauty",
        merchant: "AVA Beauty",
        price: 799,
      }),
    );
    assert.ok(dumbbell);
    assert.equal(dumbbell!.categorySlug, "tilbehoer");
    assert.ok(dumbbell!.intentSlugs?.includes("haandvaegte"));

    const bands = classifyProduct(
      product({
        title: "5 træningselastikker",
        category: "Sportsartikler > Fitness og konditionstræning > Træningselastikker",
        brand: "AVA Beauty",
        merchant: "AVA Beauty",
        price: 99,
      }),
    );
    assert.ok(bands);
    assert.equal(bands!.categorySlug, "tilbehoer");
    assert.ok(bands!.intentSlugs?.includes("elastikker"));
  });

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
    assert.ok(!r!.intentSlugs?.includes("fitnessgulv"));
  });

  it("classifies puzzle fitnessgulv as tilbehoer + fitnessgulv", () => {
    const r = classifyProduct(
      product({
        title: "Nordic Fighter Gummi Floor Guards Fitnessgulv All Black 25mm",
        brand: "Nordic Fighter",
        price: 428,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "tilbehoer");
    assert.ok(r!.intentSlugs?.includes("fitnessgulv"));
    assert.ok(!r!.intentSlugs?.includes("gulvmaatter"));
  });

  it("classifies kettlebell as tilbehoer + kettlebells (not haandvaegte)", () => {
    const r = classifyProduct(
      product({
        title: "Odin Støbejern Kettlebell 16kg",
        brand: "Odin",
        price: 589,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "tilbehoer");
    assert.ok(r!.intentSlugs?.includes("kettlebells"));
    assert.ok(!r!.intentSlugs?.includes("haandvaegte"));
  });

  it("classifies vandromaskine as romaskine + vand", () => {
    const r = classifyProduct(
      product({
        title: "Odin R1800 Vandromaskine",
        brand: "Odin",
        price: 4499,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "romaskine");
    assert.ok(r!.intentSlugs?.includes("vand"));
  });

  it("classifies dørribbe as tilbehoer + pullup", () => {
    const r = classifyProduct(
      product({
        title: "Odin Pull Up Bar Dørribbe",
        brand: "Odin",
        price: 124,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "tilbehoer");
    assert.ok(r!.intentSlugs?.includes("pullup"));
  });

  it("classifies vægmonteret pull-up bar as tilbehoer + pullup", () => {
    const r = classifyProduct(
      product({
        title: "Odin Elite Heavy Pull Up Bar",
        brand: "Odin",
        price: 899,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "tilbehoer");
    assert.ok(r!.intentSlugs?.includes("pullup"));
  });

  it("classifies power tower as styrkemaskiner (not pullup accessory)", () => {
    const r = classifyProduct(
      product({
        title: "Odin Ragnarok Power Tower Pull Up Station",
        brand: "Odin",
        price: 3400,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "styrkemaskiner");
    assert.ok(!r!.intentSlugs?.includes("pullup"));
  });

  it("classifies hometrainer intent on trainer titles", () => {
    const r = classifyProduct(
      product({
        title: "Wahoo KICKR Core Direct Drive Smart Trainer",
        brand: "Wahoo",
        category: "Hometrainer",
        price: 7999,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "motionscykel");
    assert.ok(r!.intentSlugs?.includes("hometrainer"));
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

  it("classifies cover til løbebånd as tilbehoer, not loebebaand", () => {
    const r = classifyProduct(
      product({
        title: "Cover til Løbebånd Hold det støvfrit under sengen og sofaen",
        merchant: "AVA Beauty",
        price: 70,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "tilbehoer");
  });
});

describe("classifyProduct — real machines kept", () => {
  it("classifies AVA Beauty løbebånd", () => {
    const r = classifyProduct(
      product({
        title: "TrueNordic Luksus Løbebånd",
        category:
          "Sportsartikler > Fitness og konditionstræning > Cardio > Cardio-maskiner > Løbebånd",
        brand: "AVA Beauty",
        merchant: "AVA Beauty",
        price: 1399,
      }),
    );
    assert.ok(r);
    assert.equal(r!.categorySlug, "loebebaand");
  });

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

  it("classifies real crosstrainer titles as crosstrainer", () => {
    const titles = [
      "Odin C200 Crosstrainer",
      "VirtuFit Elliptisk Crosstrainer CTR 3.0i",
      "Abilica Ellipsetræner Premium",
      "Titan Life Elliptical Trainer E55",
    ];
    for (const title of titles) {
      const r = classifyProduct(product({ title, price: 4999 }));
      assert.ok(r, title);
      assert.equal(r!.categorySlug, "crosstrainer", title);
    }
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

  it("classifies hyperextension, roman chair, rygtræner and skråbænk as træningsbænk", () => {
    for (const title of [
      "Odin Semi Pro Hyperextension Rygtræner",
      "Premium RomanChair 90 Back Extension",
      "Finnlo Tricon rygtræner",
      "Peak Fitness Foldbar Skråbænk",
      "Odin SitUp Mavebænk",
    ]) {
      const r = classifyProduct(product({ title, price: 999 }));
      assert.ok(r, title);
      assert.equal(r!.categorySlug, "styrkemaskiner", title);
      assert.ok(r!.intentSlugs?.includes("traeningsbaenk"), title);
    }
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

describe("classifyProduct — Den Intelligente Krop", () => {
  const dik = { merchant: "Den Intelligente Krop", brand: "Den Intelligente Krop" };

  it("keeps rowers, siddecykel, weights and TRX sets", () => {
    const rower = classifyProduct(
      product({
        ...dik,
        title: "TITAN LIFE Rower R65",
        category: "Træningsudstyr",
        price: 4999,
      }),
    );
    assert.equal(rower?.categorySlug, "romaskine");

    const bike = classifyProduct(
      product({
        ...dik,
        title: "Titan Life siddecykel / motionscykel",
        category: "Ergonomi",
        price: 599,
      }),
    );
    assert.equal(bike?.categorySlug, "motionscykel");
    assert.ok(bike?.intentSlugs?.includes("siddecykel"));

    const dumbbell = classifyProduct(
      product({
        ...dik,
        title: "NU-BEL Justerbar håndvægte 2 - 20 KG",
        price: 5599,
      }),
    );
    assert.equal(dumbbell?.categorySlug, "tilbehoer");
    assert.ok(dumbbell?.intentSlugs?.includes("haandvaegte"));

    const bell = classifyProduct(
      product({
        ...dik,
        title: "Titan LIFE Kettlebell 16 kg. (Støbejern)",
        price: 659,
      }),
    );
    assert.equal(bell?.categorySlug, "tilbehoer");
    assert.ok(bell?.intentSlugs?.includes("kettlebells"));
    assert.ok(!bell?.intentSlugs?.includes("haandvaegte"));

    const trx = classifyProduct(
      product({
        ...dik,
        title: "TRX MOVE Suspension Trainer",
        price: 1129,
      }),
    );
    assert.equal(trx?.categorySlug, "tilbehoer");
    assert.ok(trx?.intentSlugs?.includes("slyngetraener"));
  });

  it("drops yoga, bands, reformers and TRX accessories", () => {
    for (const title of [
      "Yogamåtte Kurma Geco Lite (Lagoon)",
      "Thera-Band træningselastik 2,5 m. (Gul)",
      "Balanced Body Reformer 1",
      "TRX Rip Trainer Elastik - Light",
      "TRX Suspension Training Mat",
      "AYA&IDA Låg (Matte Black)",
      "TITAN LIFE PRO Rack til 10 sæt håndvægte",
      "POWR.4 PRO Justerbar Vægtvest (30 kg)",
    ]) {
      assert.equal(classifyProduct(product({ ...dik, title })), null, title);
    }
  });

  it("still classifies elastik from other merchants", () => {
    const r = classifyProduct(
      product({
        title: "Thera-Band træningselastik 2,5 m. (Gul)",
        merchant: "Apuls.dk",
      }),
    );
    assert.equal(r?.categorySlug, "tilbehoer");
    assert.ok(r?.intentSlugs?.includes("elastikker"));
  });
});
