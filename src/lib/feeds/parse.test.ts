import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parsePartnerAdsXml } from "./parse";

function produktXml(fields: {
  id: string;
  name: string;
  url: string;
  nypris?: string;
  glpris?: string;
}): string {
  const nypris =
    fields.nypris !== undefined ? `<nypris>${fields.nypris}</nypris>` : "";
  const glpris =
    fields.glpris !== undefined ? `<glpris>${fields.glpris}</glpris>` : "";
  return `<produkt>
    <produktid>${fields.id}</produktid>
    <produktnavn>${fields.name}</produktnavn>
    <vareurl>${fields.url}</vareurl>
    ${nypris}
    ${glpris}
  </produkt>`;
}

describe("parsePartnerAdsXml — prices", () => {
  it("treats missing nypris as null", () => {
    const [p] = parsePartnerAdsXml(
      produktXml({
        id: "1",
        name: "Test produkt",
        url: "https://example.com/p/1",
      }),
      "Test.dk",
    );
    assert.equal(p.price, null);
  });

  it("treats empty nypris as null", () => {
    const [p] = parsePartnerAdsXml(
      produktXml({
        id: "2",
        name: "Test produkt",
        url: "https://example.com/p/2",
        nypris: "",
      }),
      "Test.dk",
    );
    assert.equal(p.price, null);
  });

  it("treats nypris 0 as null", () => {
    const [p] = parsePartnerAdsXml(
      produktXml({
        id: "3",
        name: "Semi Pro Squat Rack",
        url: "https://example.com/p/3",
        nypris: "0",
      }),
      "Billig-fitness.dk",
    );
    assert.equal(p.price, null);
  });

  it("treats nypris 0,00 as null", () => {
    const [p] = parsePartnerAdsXml(
      produktXml({
        id: "4",
        name: "Test produkt",
        url: "https://example.com/p/4",
        nypris: "0,00",
      }),
      "Test.dk",
    );
    assert.equal(p.price, null);
  });

  it("parses positive nypris", () => {
    const [p] = parsePartnerAdsXml(
      produktXml({
        id: "5",
        name: "Test produkt",
        url: "https://example.com/p/5",
        nypris: "1299",
      }),
      "Test.dk",
    );
    assert.equal(p.price, 1299);
  });

  it("parses Danish decimal nypris", () => {
    const [p] = parsePartnerAdsXml(
      produktXml({
        id: "6",
        name: "Test produkt",
        url: "https://example.com/p/6",
        nypris: "2499,00",
      }),
      "Test.dk",
    );
    assert.equal(p.price, 2499);
  });

  it("drops glpris when nypris is zero placeholder", () => {
    const [p] = parsePartnerAdsXml(
      produktXml({
        id: "7",
        name: "Test produkt",
        url: "https://example.com/p/7",
        nypris: "0",
        glpris: "3999",
      }),
      "Test.dk",
    );
    assert.equal(p.price, null);
    assert.equal(p.oldPrice, null);
  });
});
