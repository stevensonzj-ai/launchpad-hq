import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { AUDIT_7_PATCHES, CHECKED_AT, COST_TIERS, planAudit7 } from "./audit-7";

const vibe = () => {
  const patch = AUDIT_7_PATCHES.find((p) => p.slug === "mistral-vibe");
  assert.ok(patch);
  return patch;
};

describe("catalog audit 7 data", () => {
  it("dates and sources every patch, using real CostTier values", () => {
    assert.equal(CHECKED_AT, "2026-10-25");
    const schema = readFileSync(join(process.cwd(), "prisma/schema.prisma"), "utf8");
    const enumBody = /enum CostTier \{([^}]*)\}/.exec(schema)?.[1] ?? "";
    assert.deepEqual(enumBody.split(/\s+/).filter(Boolean), [...COST_TIERS]);
    for (const patch of AUDIT_7_PATCHES) {
      assert.equal(patch.checkedAt, CHECKED_AT);
      assert.ok(patch.sources.length > 0);
      for (const url of patch.sources) assert.match(url, /^https:\/\//);
      assert.notEqual(patch.costTier.from, patch.costTier.to);
    }
  });

  it("mistral-vibe goes FREE -> FREEMIUM because its fact file has free and paid plans", () => {
    assert.deepEqual(vibe().costTier, { from: "FREE", to: "FREEMIUM" });
    const plans = getToolFacts("mistral-vibe")?.plans;
    const prices = (plans?.value ?? []).map((p) => p.price);
    assert.ok(prices.includes("$0"), "has a free plan");
    assert.ok(prices.some((p) => /^\$[1-9]/.test(p)), "has a paid plan");
    assert.ok(vibe().sources.includes(plans?.sourceUrl ?? ""), "cites the fact file's pricing source");
  });
});

describe("catalog audit 7 diff logic", () => {
  it("updates only from the expected value, and is a no-op on re-run", () => {
    const patch = vibe();
    assert.equal(planAudit7("FREE", patch), "update");
    assert.equal(planAudit7("FREEMIUM", patch), "done");
    assert.equal(planAudit7("PAID", patch), "skip");
    assert.equal(planAudit7("ENTERPRISE", patch), "skip");
  });

  it("the runner defaults to dry-run, uses the prod guard and prints no values", () => {
    const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-7.ts"), "utf8");
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.doesNotMatch(source, /console\.(log|warn)\([^)]*costTier\.(from|to)/);
    assert.doesNotMatch(source, /\.(create|createMany|delete|deleteMany|upsert)\(/);
  });
});
