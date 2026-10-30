import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { AUDIT_23_PATCHES, audit23UpdateData, planAudit23 } from "./audit-23";
import { getToolFacts } from "../facts";

const PROMO = /first[- ]month|% off|limited[- ]time|promo|until |equivalent|discounted/i;

function balanced(s: string): boolean {
  let d = 0;
  for (const c of s) {
    if (c === "(") d++;
    if (c === ")" && --d < 0) return false;
  }
  return d === 0;
}

describe("catalog audit 23: expired promos and garbled prices", () => {
  it("new text has no promo wording, balanced parentheses, no doubled currency, and a 2026-10-30 stamp", () => {
    for (const p of AUDIT_23_PATCHES) {
      assert.match(p.source, /^https:\/\//, p.slug);
      for (const [field, v] of Object.entries(p.fields)) {
        assert.doesNotMatch(v!.to, PROMO, `${p.slug}.${field}`);
        assert.ok(balanced(v!.to), `${p.slug}.${field} parentheses`);
        assert.doesNotMatch(v!.to, /\$\s*\$|NaN|undefined/, `${p.slug}.${field}`);
        assert.match(v!.to, /as of 2026-10-30/, `${p.slug}.${field}`);
        assert.notEqual(v!.from, v!.to);
      }
    }
  });

  it("ElevenLabs, Deepgram and Mubert now have sourced, verified price facts", () => {
    for (const [slug, url] of [
      ["elevenlabs", "https://elevenlabs.io/pricing"],
      ["deepgram", "https://deepgram.com/pricing"],
      ["mubert", "https://mubert.com/render/pricing"],
    ]) {
      const f = getToolFacts(slug)!;
      assert.equal(f.plans?.sourceUrl, url, slug);
      assert.equal(f.plans?.status, "verified");
      assert.equal(f.plans?.checkedAt, "2026-10-30");
      assert.doesNotMatch(JSON.stringify(f.plans?.value), /first month|\$1\b|\$11\b/);
    }
    assert.deepEqual(
      getToolFacts("elevenlabs")!.plans!.value.map((x) => [x.name, x.price]),
      [["Free", "$0"], ["Starter", "$6"], ["Creator", "$22"], ["Pro", "$99"], ["Scale", "$299"], ["Business", "$990"], ["Enterprise", "Custom"]],
    );
  });

  it("writes only from the expected old value; a re-run is a no-op", () => {
    const p = AUDIT_23_PATCHES.find((x) => x.slug === "elevenlabs")!;
    const old = { currentPricing: p.fields.currentPricing!.from, freeTierFeatures: p.fields.freeTierFeatures!.from, usageLimits: p.fields.usageLimits!.from };
    assert.equal(Object.keys(audit23UpdateData(planAudit23(old, p))).length, 3);
    const done = { currentPricing: p.fields.currentPricing!.to, freeTierFeatures: p.fields.freeTierFeatures!.to, usageLimits: p.fields.usageLimits!.to };
    assert.deepEqual(audit23UpdateData(planAudit23(done, p)), {});
    assert.deepEqual(planAudit23({ currentPricing: "hand edit" }, AUDIT_23_PATCHES.find((x) => x.slug === "krea")!).map((x) => x.action), ["differs"]);
  });
});
