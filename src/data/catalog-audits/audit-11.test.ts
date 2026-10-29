import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { saysTrialOnly } from "@/lib/mcp/label-consistency";
import { snapshotRows } from "@/lib/mcp/snapshot";
import {
  AUDIT_11_PATCHES,
  CHECKED_AT,
  audit11KeepsUpdatedAt,
  audit11Slugs,
  audit11UpdateData,
  diffAudit11,
  diffAudit11Row,
  type Audit11Row,
} from "./audit-11";
import { AUDIT_10_WORDING, diffAudit10Row } from "./audit-10";

const snap = (slug: string) => snapshotRows().find((r) => r.slug === slug)!;
const patchFor = (slug: string) => AUDIT_11_PATCHES.find((p) => p.slug === slug)!;
const baseRow: Audit11Row = { description: "Old", currentPricing: "Old", freeTierFeatures: "Old", usageLimits: null, costTier: "FREEMIUM" };

describe("catalog audit 11: owner-checked Krisp and GitHub Copilot", () => {
  it("dates every change 2026-10-26, cites https pages, no tracking or sponsor links", () => {
    for (const patch of AUDIT_11_PATCHES) {
      assert.equal(patch.checkedAt, CHECKED_AT, patch.slug);
      assert.ok(patch.sources.length > 0, patch.slug);
      for (const url of patch.sources) assert.match(url, /^https:\/\//);
      assert.doesNotMatch(JSON.stringify(patch), /sponsor|affiliate|referral|utm_|@/i);
    }
  });

  it("every price in the owner-checked row text is in the tool's verified plans fact", () => {
    for (const patch of AUDIT_11_PATCHES.filter((p) => p.verified)) {
      const f = getToolFacts(patch.slug)!;
      assert.equal(f.plans?.status, "verified", patch.slug);
      // Dated by this audit, or re-checked since (Canva: guide PR D, 2026-10-29).
      assert.ok((f.plans?.checkedAt ?? "") >= CHECKED_AT, patch.slug);
      const planText = (f.plans?.value ?? []).map((p) => `${p.price} ${p.limits}`).join(" ");
      for (const field of ["currentPricing", "freeTierFeatures", "usageLimits", "description"] as const) {
        for (const price of patch.fields?.[field]?.match(/\$\d[\d,]*(\.\d+)?/g) ?? []) {
          assert.ok(planText.includes(price) || f.plans?.note?.includes(price), `${patch.slug}.${field} ${price}`);
        }
      }
    }
  });

  it("Krisp: PAID only while FREEMIUM, no free tier, trial-only text, no call-center plan", () => {
    const patch = patchFor("krisp");
    assert.deepEqual(patch.guarded?.costTier, { from: "FREEMIUM", to: "PAID" });
    assert.equal(audit11UpdateData(diffAudit11(baseRow, patch)).costTier, "PAID");
    assert.equal(diffAudit11({ ...baseRow, costTier: "ENTERPRISE" }, patch).some((d) => d.field === "costTier"), false);
    assert.equal(snap("krisp").costTier, "PAID");
    const f = getToolFacts("krisp")!;
    assert.equal(f.freeTier?.value.available, false);
    assert.equal(f.freeTier?.value.summary, "No permanent free plan; 7-day free trial, no credit card required");
    assert.equal(f.freeTier?.sourceUrl, "https://krisp.ai/pricing/");
    assert.deepEqual(f.plans?.value.map((p) => p.name), ["Free Trial", "Core", "Advanced", "Enterprise"]);
    for (const text of [snap("krisp").freeTierFeatures, snap("krisp").currentPricing]) assert.ok(saysTrialOnly(text ?? ""), text ?? "");
    assert.doesNotMatch(snap("krisp").description ?? "", /unverified|call-center/i);
  });

  it("GitHub Copilot: total credits stated as base + flex, never base alone", () => {
    const pricing = snap("github-copilot").currentPricing ?? "";
    assert.match(pricing, /Pro \$15 \(\$10 base \+ \$5 flex\)/);
    assert.match(pricing, /Pro\+ \$70 \(\$39 base \+ \$31 flex\)/);
    assert.match(pricing, /Max \$200 \(\$100 base \+ flex\)/);
    assert.match(pricing, /flex may change/);
    assert.match(snap("github-copilot").freeTierFeatures ?? "", /2,000 inline suggestions/);
    const plans = getToolFacts("github-copilot")!.plans!;
    assert.equal(plans.sourceUrl, "https://github.com/features/copilot/plans");
    assert.deepEqual(plans.value.map((p) => [p.name, p.price]), [["Free", "$0"], ["Pro", "$10"], ["Pro+", "$39"], ["Max", "$100"]]);
    assert.match(plans.value[1].limits, /^\$15 total AI credits\/month \(\$10 base \+ \$5 flex/);
    assert.match(plans.value[2].limits, /^\$70 total AI credits\/month \(\$39 base \+ \$31 flex/);
    assert.match(plans.value[3].limits, /^\$200 total AI credits\/month/);
  });

  it("Canva: Pro $18/month or $144/year, Business $25/month or $250/year per person; Enterprise unchanged", () => {
    const pricing = snap("canva-ai-magic-studio").currentPricing ?? "";
    assert.match(pricing, /Pro \$18\/mo or \$144\/yr/);
    assert.match(pricing, /Business \$25\/person\/mo or \$250\/person\/yr/);
    assert.match(pricing, /Enterprise: contact sales/);
    const f = getToolFacts("canva-ai-magic-studio")!;
    assert.equal(f.plans?.sourceUrl, "https://www.canva.com/pricing/");
    assert.equal(f.plans?.status, "verified");
    const plan = (name: string) => f.plans!.value.find((p) => p.name === name)!;
    assert.deepEqual([plan("Pro").price, plan("Pro").period], ["$18", "month"]);
    assert.match(plan("Pro").limits, /\$144\/year billed yearly; 1 person/);
    assert.deepEqual([plan("Business").price, plan("Business").period], ["$25", "person/month"]);
    assert.match(plan("Business").limits, /\$250\/year per person/);
    assert.equal(plan("Enterprise").price, "Contact sales");
    assert.equal(snap("canva-ai-magic-studio").costTier, "FREEMIUM");
  });

  it("trial-only rows become PAID with no text change and keep their updatedAt", () => {
    for (const patch of AUDIT_11_PATCHES.filter((p) => !p.verified)) {
      assert.equal(patch.fields, undefined, patch.slug);
      assert.deepEqual(patch.guarded?.costTier, { from: "FREEMIUM", to: "PAID" }, patch.slug);
      assert.equal(audit11KeepsUpdatedAt(patch.slug), true, patch.slug);
      assert.equal(snap(patch.slug).costTier, "PAID", patch.slug);
      const f = getToolFacts(patch.slug);
      const text = f?.freeTier ? "" : (snap(patch.slug).freeTierFeatures ?? "");
      assert.ok(f?.freeTier?.value.available === false || saysTrialOnly(text), `${patch.slug} says it has no free plan`);
    }
    // Audit 11 kept this row's updatedAt; audit 18 (stale facts batch 2) later rewrote its text, which bumps it.
    assert.equal(snap("squarespace-ai").updatedAt, "2026-10-29");
    assert.equal(audit11KeepsUpdatedAt("krisp"), false);
  });
});

describe("catalog audit 11: idempotent, guarded, independent of audit 10", () => {
  it("applies once, then reports 0 on the post-audit snapshot", () => {
    for (const slug of audit11Slugs()) assert.deepEqual(diffAudit11Row(slug, snap(slug)), [], slug);
  });

  it("audit 10 re-run leaves audit 11's text alone (no \"official\" in Copilot's pricing)", () => {
    for (const { slug } of AUDIT_10_WORDING.filter((w) => audit11Slugs().includes(w.slug))) {
      assert.deepEqual(diffAudit10Row(slug, snap(slug) as never), [], slug);
    }
  });

  it("9 rows / 14 field changes on the pre-audit rows", () => {
    // Pre-audit 11 values for the changed fields (catalog snapshot after audit 10).
    const before: Record<string, Partial<Audit11Row>> = {
      krisp: { description: "x", currentPricing: "x", freeTierFeatures: "x", costTier: "FREEMIUM" },
      "github-copilot": { currentPricing: "x", freeTierFeatures: "x", usageLimits: "x" },
      "canva-ai-magic-studio": { currentPricing: "x" },
    };
    let rows = 0;
    let fields = 0;
    for (const slug of audit11Slugs()) {
      const row = { ...snap(slug), ...(before[slug] ?? { costTier: "FREEMIUM" }) } as Audit11Row;
      const diffs = diffAudit11Row(slug, row);
      if (diffs.length) rows++;
      fields += diffs.length;
    }
    assert.deepEqual([rows, fields], [9, 14]);
  });

  it("the runner defaults to dry-run, uses the prod guard, never deletes and prints no values", () => {
    const source = readFileSync(join(process.cwd(), "scripts/update-catalog-audit-11.ts"), "utf8");
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /--confirm-production/);
    assert.match(source, /await countdown\(5\)/);
    assert.match(source, /if \(dryRun\) continue;/);
    assert.match(source, /`audit11: \$\{rows\} rows \/ \$\{fieldChanges\} field changes/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
    assert.doesNotMatch(source, /console\.(log|warn)\([^)]*\.(to|description|currentPricing|freeTierFeatures|usageLimits)\b/);
    assert.doesNotMatch(source, /\.(create|createMany|delete|deleteMany|upsert)\(/);
    const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
    assert.equal(pkg.scripts["db:update-catalog-audit-11"], "tsx scripts/update-catalog-audit-11.ts");
  });
});
