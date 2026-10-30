import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getToolFacts } from "@/data/facts";
import { AUDIT_25_FACT_SLUGS, AUDIT_25_PATCHES, audit25UpdateData, planAudit25 } from "./audit-25";

describe("catalog audit 25: source verification", () => {
  it("new text has no official claim, no promo wording and a 2026-10-30 stamp", () => {
    for (const p of AUDIT_25_PATCHES) {
      assert.match(p.source, /^https:\/\//, p.slug);
      for (const [field, v] of Object.entries(p.fields)) {
        assert.doesNotMatch(v!.to, /official|first[- ]month|limited[- ]time|promo/i, `${p.slug}.${field}`);
        assert.match(v!.to, /\(as of 2026-10-30\)$/, `${p.slug}.${field}`);
        assert.notEqual(v!.from, v!.to);
      }
    }
  });

  it("every fact slug has a verified, sourced plans fact checked 2026-10-30", () => {
    for (const slug of AUDIT_25_FACT_SLUGS) {
      const plans = getToolFacts(slug)?.plans;
      assert.ok(plans, slug);
      assert.equal(plans.status, "verified", slug);
      assert.equal(plans.checkedAt, "2026-10-30", slug);
      assert.match(plans.sourceUrl, /^https:\/\//, slug);
      assert.notEqual(plans.gatheredBy, plans.verifiedBy, slug);
      assert.ok(plans.value.length > 0, slug);
      const patch = AUDIT_25_PATCHES.find((p) => p.slug === slug);
      assert.equal(patch?.source, plans.sourceUrl, slug);
    }
  });

  it("writes only from the expected old value; a re-run is a no-op", () => {
    for (const p of AUDIT_25_PATCHES) {
      const old = Object.fromEntries(Object.entries(p.fields).map(([f, v]) => [f, v!.from]));
      const done = Object.fromEntries(Object.entries(p.fields).map(([f, v]) => [f, v!.to]));
      assert.equal(Object.keys(audit25UpdateData(planAudit25(old, p))).length, Object.keys(p.fields).length, p.slug);
      assert.deepEqual(audit25UpdateData(planAudit25(done, p)), {}, p.slug);
      assert.ok(planAudit25({}, p).every((x) => x.action === "differs"), p.slug);
    }
  });
});
