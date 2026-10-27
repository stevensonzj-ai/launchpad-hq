import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import type { ToolFacts } from "@/data/facts/types";
import { buildFeedContext, toPublicTool } from "@/lib/public-data/serialize";
import { snapshotRows } from "./snapshot";
import { compare, findFreeAlternatives, getPricingFacts, pricingVerification, searchTools } from "./tools";

/**
 * Fix P1.3c, from the 2026-10-26 stress rerun: B10 (QuillBot's card said
 * verified while its plans were unverified), A11/D04 (Krisp, a 7-day trial,
 * offered as free) and B11 (GitHub Copilot's AI credits).
 */
const rows = snapshotRows();

describe("P1.3c: one pricing label for card and response (B10)", () => {
  it("QuillBot: card, response, search and compare all say unverified", () => {
    const out = getPricingFacts({ platform: "QuillBot" }, rows, getToolFacts);
    assert.equal(out.plans?.status, "unverified");
    assert.equal(out.free_tier?.status, "verified");
    assert.equal(out.verification, "unverified");
    assert.equal(out.platform.verification, "unverified");
    const cmp = compare({ platforms: ["Grammarly", "QuillBot"] }, rows, getToolFacts);
    assert.equal(cmp.items.find((i) => i.slug === "quillbot")?.verification, "unverified");
    const hit = searchTools({ task: "paraphrase an essay", limit: 10 }, rows, getToolFacts).results.find((r) => r.slug === "quillbot");
    assert.equal(hit?.verification, "unverified");
  });

  it("card label equals the response label on every listed tool", () => {
    for (const row of rows) {
      if (getToolFacts(row.slug)?.lifecycle === "discontinued") continue;
      const out = getPricingFacts({ platform: row.slug }, rows, getToolFacts);
      assert.equal(out.platform.verification, out.verification, row.slug);
    }
  });

  it("pricingVerification: all verified -> verified; any unverified -> unverified; none -> catalog_only", () => {
    const fact = (status: "verified" | "unverified") => ({
      value: [],
      sourceUrl: "https://sample.example/pricing",
      checkedAt: "2026-10-26",
      gatheredBy: "test",
      verifiedBy: "test-recheck",
      verifiedAt: "2026-10-26",
      status,
    });
    const free = (status: "verified" | "unverified") => ({ ...fact(status), value: { available: true, summary: "Free." } });
    const f = (over: Partial<ToolFacts>): ToolFacts => ({ slug: "s", lifecycle: "active", ...over });
    assert.equal(pricingVerification(undefined), "catalog_only");
    assert.equal(pricingVerification(f({})), "catalog_only");
    assert.equal(pricingVerification(f({ freeTier: free("verified"), plans: fact("verified") })), "verified");
    assert.equal(pricingVerification(f({ freeTier: free("verified"), plans: fact("unverified") })), "unverified");
    assert.equal(pricingVerification(f({ plans: fact("verified") })), "verified");
  });

  it("the /data/v1 feed agrees: QuillBot is unverified there too", () => {
    const ctx = buildFeedContext(rows, getToolFacts, { generatedAt: "2026-10-26T00:00:00.000Z" });
    const row = rows.find((r) => r.slug === "quillbot")!;
    assert.equal(toPublicTool(row, getToolFacts("quillbot"), ctx).verification.status, "unverified");
  });
});

describe("P1.3c: Krisp is never offered as free (A11, D04)", () => {
  it("get_pricing_facts: PAID, no free tier, verified plans from the official page", () => {
    const out = getPricingFacts({ platform: "Krisp" }, rows, getToolFacts);
    assert.equal(out.platform.cost_tier, "PAID");
    assert.deepEqual(out.platform.free_tier, { available: false, summary: "No permanent free plan; 7-day free trial, no credit card required" });
    assert.equal(out.verification, "verified");
    assert.equal(out.platform.verification, "verified");
    assert.equal(out.plans?.source_url, "https://krisp.ai/pricing/");
    assert.equal(out.plans?.as_of, "2026-10-26");
    assert.doesNotMatch(out.platform.starting_price ?? "", /free/i);
  });

  it("find_free_alternatives to Otter leaves Krisp out", () => {
    const out = findFreeAlternatives({ platform: "Otter.ai", limit: 10 }, rows, getToolFacts);
    assert.ok(out.alternatives.length >= 3);
    assert.equal(out.alternatives.some((a) => a.slug === "krisp"), false);
  });

  it("budget:free search leaves Krisp out, even on a row still marked FREEMIUM", () => {
    const task = { task: "take meeting notes automatically", budget: "free" as const, limit: 10 };
    assert.equal(searchTools(task, rows, getToolFacts).results.some((r) => r.slug === "krisp"), false);
    const stale = rows.map((r) => (r.slug === "krisp" ? { ...r, costTier: "FREEMIUM" } : r));
    assert.equal(searchTools(task, stale, getToolFacts).results.some((r) => r.slug === "krisp"), false);
    assert.equal(findFreeAlternatives({ platform: "Otter.ai", limit: 10 }, stale, getToolFacts).alternatives.some((a) => a.slug === "krisp"), false);
  });

  it("an unfiltered meeting-notes search still lists Krisp, labelled PAID", () => {
    const hit = searchTools({ task: "take meeting notes automatically", limit: 10 }, rows, getToolFacts).results.find((r) => r.slug === "krisp");
    assert.equal(hit?.cost_tier, "PAID");
    assert.equal(hit?.free_tier.available, false);
  });
});

describe("P1.3c: GitHub Copilot credits (B11)", () => {
  it("verified plans state total credits as base + flex", () => {
    const out = getPricingFacts({ platform: "GitHub Copilot" }, rows, getToolFacts);
    assert.equal(out.verification, "verified");
    assert.equal(out.platform.verification, "verified");
    assert.equal(out.plans?.source_url, "https://github.com/features/copilot/plans");
    const limits = Object.fromEntries((out.plans?.value ?? []).map((p) => [p.name, p.limits]));
    assert.match(limits.Pro, /\$15 total AI credits\/month \(\$10 base \+ \$5 flex; flex may change over time\)/);
    assert.match(limits["Pro+"], /\$70 total AI credits\/month \(\$39 base \+ \$31 flex; flex may change over time\)/);
    assert.match(limits.Max, /\$200 total AI credits\/month/);
    assert.equal(out.platform.starting_price, "Free, from $10/month");
  });
});
