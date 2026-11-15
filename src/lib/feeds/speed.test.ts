import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseMaxSpeedKmh } from "./speed";

describe("parseMaxSpeedKmh", () => {
  it("parses range like 1–12 km/t", () => {
    assert.equal(parseMaxSpeedKmh("VeloraFit foldbart 1–12 km/t"), 12);
    assert.equal(parseMaxSpeedKmh("Hastighed 1-16 km/t med app"), 16);
  });

  it("parses max / op til patterns", () => {
    assert.equal(parseMaxSpeedKmh("Max hastighed 14 km/t"), 14);
    assert.equal(parseMaxSpeedKmh("Op til 6 km/t gangtempo"), 6);
    assert.equal(parseMaxSpeedKmh("Topfart: 18 km/h"), 18);
  });

  it("takes the highest plain km/t mention", () => {
    assert.equal(
      parseMaxSpeedKmh("Start 2 km/t, max 12 km/t på LED-display"),
      12,
    );
  });

  it("returns null without speed or for outliers", () => {
    assert.equal(parseMaxSpeedKmh("Foldbart løbebånd til hjemmet"), null);
    assert.equal(parseMaxSpeedKmh(""), null);
    assert.equal(parseMaxSpeedKmh("Max 80 km/t på landevej"), null);
  });
});
