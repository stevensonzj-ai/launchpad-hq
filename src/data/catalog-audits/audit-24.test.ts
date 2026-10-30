import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { AUDIT_24_PATCHES, audit24UpdateData, planAudit24 } from "./audit-24";

const OLD = /first[- ]month|% off|limited[- ]time|promo|until |equivalent|discounted|list\/discounted|unverified|\$9\/\$5|audio-hour|25s/i;

describe("catalog audit 24: leftover old strings on the audit-23 rows", () => {
  it("new text drops the old strings, has no official claim, and carries a 2026-10-30 stamp", () => {
    for (const p of AUDIT_24_PATCHES) {
      assert.match(p.source, /^https:\/\//, p.slug);
      for (const [field, v] of Object.entries(p.fields)) {
        assert.doesNotMatch(v!.to, OLD, `${p.slug}.${field}`);
        assert.doesNotMatch(v!.to, /official/i, `${p.slug}.${field}`);
        assert.match(v!.to, /as of 2026-10-30/, `${p.slug}.${field}`);
        assert.notEqual(v!.from, v!.to);
      }
    }
  });

  it("Krea's description no longer has the garbled price pairs", () => {
    const k = AUDIT_24_PATCHES.find((x) => x.slug === "krea")!;
    assert.match(k.fields.description!.from, /\$9\/\$5/);
    assert.doesNotMatch(k.fields.description!.to, /\$\d+\/\$/);
  });

  it("writes only from the expected old value; a re-run is a no-op", () => {
    for (const p of AUDIT_24_PATCHES) {
      const old = Object.fromEntries(Object.entries(p.fields).map(([f, v]) => [f, v!.from]));
      const done = Object.fromEntries(Object.entries(p.fields).map(([f, v]) => [f, v!.to]));
      assert.equal(Object.keys(audit24UpdateData(planAudit24(old, p))).length, Object.keys(p.fields).length, p.slug);
      assert.deepEqual(audit24UpdateData(planAudit24(done, p)), {}, p.slug);
      assert.ok(planAudit24({}, p).every((x) => x.action === "differs"), p.slug);
    }
  });
});
