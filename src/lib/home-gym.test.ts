import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getCategory } from "./categories";
import {
  BUDGETS,
  FOCUSES,
  SPACES,
  getSetup,
  isOutsideBudget,
} from "./home-gym";

describe("home gym matrix", () => {
  it("covers every combination with unique products and real categories", () => {
    assert.equal(SPACES.length * FOCUSES.length * BUDGETS.length, 27);

    for (const space of SPACES) {
      for (const focus of FOCUSES) {
        for (const budget of BUDGETS) {
          const setup = getSetup(space.id, focus.id, budget.id);
          assert.ok(setup.title.length > 0, `${space.id}/${focus.id}/${budget.id} title`);
          assert.ok(setup.summary.length > 0);
          assert.ok(setup.slots.length >= 2 && setup.slots.length <= 4);

          const ids = setup.slots.map((slot) => slot.feedProductId);
          assert.equal(
            new Set(ids).size,
            ids.length,
            `duplicate product in ${space.id}/${focus.id}/${budget.id}`,
          );

          for (const slot of setup.slots) {
            assert.ok(slot.role.length > 0);
            assert.ok(slot.why.length > 0);
            assert.ok(slot.feedProductId.includes(":"));
            const category = getCategory(slot.categorySlug);
            assert.ok(category, slot.categorySlug);
            if (slot.intentSlug) {
              assert.ok(
                category.intents.some((intent) => intent.slug === slot.intentSlug),
                `${slot.categorySlug}/${slot.intentSlug}`,
              );
            }
          }
        }
      }
    }
  });
});

describe("isOutsideBudget", () => {
  it("keeps totals inside the chosen band", () => {
    assert.equal(isOutsideBudget("under-5k", 5000), false);
    assert.equal(isOutsideBudget("under-5k", 5001), true);
    assert.equal(isOutsideBudget("mid", 5000), true);
    assert.equal(isOutsideBudget("mid", 5001), false);
    assert.equal(isOutsideBudget("mid", 15000), false);
    assert.equal(isOutsideBudget("mid", 15001), true);
    assert.equal(isOutsideBudget("over-15k", 15000), true);
    assert.equal(isOutsideBudget("over-15k", 15001), false);
  });
});
