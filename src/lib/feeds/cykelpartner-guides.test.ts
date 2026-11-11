import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getCykelpartnerGuideFeedProductIds } from "./cykelpartner-guide-ids";

describe("getCykelpartnerGuideFeedProductIds", () => {
  it("includes hometrainer guide products", () => {
    const ids = getCykelpartnerGuideFeedProductIds();
    assert.ok(ids.includes("Cykelpartner.dk:850048106611"));
    assert.ok(ids.includes("Cykelpartner.dk:8714895058405"));
    assert.ok(ids.includes("Cykelpartner.dk:8020775039281"));
    assert.ok(ids.includes("Cykelpartner.dk:5712934017454"));
  });

  it("dedupes ids used across multiple guides", () => {
    const ids = getCykelpartnerGuideFeedProductIds();
    assert.equal(ids.length, new Set(ids).size);
    assert.ok(ids.length >= 4);
  });
});
