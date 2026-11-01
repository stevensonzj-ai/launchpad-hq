import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { AUDIT_29_PATCHES, audit29UpdateData, planAudit29 } from "@/data/catalog-audits/audit-29";
import { catalogRedirects, HIDDEN_PAGE_REDIRECTS, RETIRED_GUIDE_SLUGS } from "@/lib/catalog-redirects";
import { hiddenPlatformSlugs, isHiddenPlatform } from "@/lib/catalog-visibility";

type Row = Record<string, string | null> & { slug: string };
const snapshot = JSON.parse(readFileSync(join(process.cwd(), "src/lib/mcp/catalog-snapshot.json"), "utf8")) as { rows: Row[]; hidden_rows: string[] };
const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
const poe = () => snapshot.rows.find((r) => r.slug === "poe")!;

describe("catalog audit 29: Poe unhidden", () => {
  it("has one corrected patch for poe with a dated, price-free replacement", () => {
    assert.equal(AUDIT_29_PATCHES.length, 1);
    const [p] = AUDIT_29_PATCHES;
    assert.equal(p.slug, "poe");
    assert.equal(p.outcome, "corrected");
    assert.equal(p.source, "https://poe.com/");
    for (const [field, { from, to }] of Object.entries(p.fields)) {
      assert.notEqual(from, to, field);
      assert.match(to, /\(as of 2026-11-01\)$/, field);
      assert.doesNotMatch(to, /\$\s?\d|official/i, field);
    }
  });

  it("starts from the audit-27 / seed values", () => {
    const f = AUDIT_29_PATCHES[0].fields;
    assert.equal(f.currentPricing?.from, "Free plan and paid subscriptions; prices not confirmed (pricing needs a login) (as of 2026-10-30)");
    assert.equal(f.freeTierFeatures?.from, "Free for most usage (official); exact daily points unverified as of 2026-10-13");
    assert.equal(f.usageLimits, undefined);
    assert.match(f.description!.from!, /^Quora's multi-model chat app\. About page \(as of 2026-10-13\)/);
    assert.equal(Object.keys(f).length, 3);
  });

  it("is applied to the snapshot and a re-run is a no-op", () => {
    const plans = planAudit29(poe() as never, AUDIT_29_PATCHES[0]);
    assert.ok(plans.every((x) => x.action === "already"));
    assert.deepEqual(audit29UpdateData(plans), {});
    assert.equal(poe().usageLimits, null);
    assert.doesNotMatch(poe().description!, /\$\s?\d/);
    const patch = { slug: "s", outcome: "corrected" as const, source: "https://e.example", fields: { currentPricing: { from: "x", to: "y" } } };
    assert.deepEqual(audit29UpdateData(planAudit29({ currentPricing: "x" }, patch)), { currentPricing: "y" });
    assert.deepEqual(audit29UpdateData(planAudit29({ currentPricing: "z" }, patch)), {});
  });

  it("poe is listed again: not hidden, no redirect, guide registered, lifecycle active", () => {
    assert.equal(isHiddenPlatform("poe"), false);
    assert.equal(hiddenPlatformSlugs().includes("poe"), false);
    assert.equal(snapshot.hidden_rows.includes("poe"), false);
    assert.equal("poe" in HIDDEN_PAGE_REDIRECTS, false);
    assert.equal(catalogRedirects().some((m) => m.source.startsWith("/platform/poe")), false);
    assert.equal(RETIRED_GUIDE_SLUGS.includes("poe"), false);
    const facts = getToolFacts("poe")!;
    assert.equal(facts.lifecycle, "active");
    assert.equal(facts.visibility, undefined);
    assert.match(facts.changelog![0].summary, /^Unhidden \(Zach, 2026-11-01\)/);
    assert.equal(getStaticTutorialForPlatform("poe")?.platformSlug, "poe");
  });

  it("the restored guide states no prices and the retired copy is gone", () => {
    const guide = read("src/data/tutorials/poe-getting-started.ts");
    assert.doesNotMatch(guide, /RETIRED/);
    assert.doesNotMatch(guide, /\$\s?\d/);
  });

  it("the runner defaults to dry-run, uses the prod guard and prints no values", () => {
    const source = read("scripts/update-catalog-audit-29.ts");
    assert.match(source, /checkTargetHost\(host, process\.argv, process\.env\)/);
    assert.match(source, /const dryRun = !apply \|\| process\.argv\.includes\("--dry-run"\)/);
    assert.match(source, /select: \{ currentPricing: true, freeTierFeatures: true, usageLimits: true, description: true \}/);
    assert.doesNotMatch(source, /\.delete(Many)?\(|\.create(Many)?\(/);
    assert.doesNotMatch(source, /console\.log\([^)]*DATABASE_URL/);
  });
});
