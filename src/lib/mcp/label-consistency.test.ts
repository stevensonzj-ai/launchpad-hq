import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import type { ToolFacts } from "@/data/facts/types";
import { checkLabels, claimsOfficial, isPricingSourceUrl, summarizeOffenders } from "./label-consistency";
import { snapshotRows } from "./snapshot";
import type { CatalogRow } from "./tools";

/**
 * Fix plan P1.3 (weak spot 3): labels never contradict the text they sit
 * next to, and price facts cite pricing pages. Runs on the catalog snapshot
 * (post audit 10) plus the fact files; `npm run check:labels` is the same
 * check from the command line.
 */

const base = (): CatalogRow => ({ ...snapshotRows().find((r) => r.slug === "activepieces")! });
const row = (over: Partial<CatalogRow>): CatalogRow => ({ ...base(), slug: "sample-tool", name: "Sample Tool", ...over });
const fact = <T,>(value: T, over: Partial<{ sourceUrl: string; status: "verified" | "unverified"; sourceKind: "product-page" }> = {}) => ({
  value,
  sourceUrl: "https://sample.example/pricing",
  checkedAt: "2026-10-26",
  gatheredBy: "test",
  verifiedBy: "test-recheck",
  verifiedAt: "2026-10-26",
  status: "verified" as const,
  ...over,
});
const verifiedFacts: ToolFacts = {
  slug: "sample-tool",
  lifecycle: "active",
  freeTier: fact({ available: true, summary: "Free plan with 10 uses a day." }),
  plans: fact([{ name: "Pro", price: "$10", period: "month", limits: "" }]),
};
const lookup = (f: ToolFacts | undefined) => (slug: string) => (slug === "sample-tool" ? f : getToolFacts(slug));
const rules = (r: CatalogRow, f: ToolFacts | undefined) => checkLabels([r], lookup(f)).map((o) => `${o.rule} ${o.field}`);

describe("label consistency on the catalog snapshot", () => {
  it("has 0 offenders after audit 10", () => {
    const offenders = checkLabels(snapshotRows(), getToolFacts);
    assert.equal(offenders.length, 0, summarizeOffenders(offenders));
  });

  it("covers the stress-test records it was written for", () => {
    const rows = snapshotRows();
    const at = (slug: string) => rows.find((r) => r.slug === slug)!;
    // QuillBot: prices unverified (RA, 2026-10-26), free tier verified; the description no longer says otherwise.
    assert.equal(getToolFacts("quillbot")?.plans?.status, "unverified");
    assert.doesNotMatch(at("quillbot").description ?? "", /unverified|unpublished/i);
    // Otter and GitHub Copilot: no catalog-only text claims "official".
    assert.ok(getToolFacts("otter-ai")?.plans);
    assert.doesNotMatch(at("github-copilot").currentPricing ?? "", /official/i);
    // Perplexity: plans cite the pricing hub, not a Slack-connector article.
    assert.equal(getToolFacts("perplexity-ai")?.plans?.sourceUrl, "https://www.perplexity.ai/hub/pricing");
  });
});

describe("rule: verified-says-unverified", () => {
  it("flags a blanket 'pricing is unverified' next to verified prices", () => {
    const r = row({ description: "Video tool. Official pricing as of 2026-10-14 is unverified (JavaScript-only)." });
    assert.deepEqual(rules(r, verifiedFacts), ["verified-says-unverified description", "verified-says-unverified feed.description"]);
  });

  it("passes a dated note that one detail is unconfirmed", () => {
    const r = row({ description: "Video tool. The billing basis behind the two numbers is unverified." });
    assert.deepEqual(rules(r, verifiedFacts), []);
  });

  it("passes 'pricing is unverified' when the prices really are unverified", () => {
    const r = row({ description: "Writing tool. Official pricing is unverified (official page blocked)." });
    const f: ToolFacts = { ...verifiedFacts, plans: fact([{ name: "Pro", price: "$10", period: "month", limits: "" }], { status: "unverified" }) };
    assert.deepEqual(rules(r, f), []);
  });
});

describe("rule: catalog-only-says-official", () => {
  it("flags catalog-only pricing that calls itself official", () => {
    const r = row({ currentPricing: "Free $0; Pro $20/mo (official, as of 2026-10-25)" });
    assert.deepEqual(rules(r, undefined), ["catalog-only-says-official catalog_pricing_text"]);
  });

  it("passes the same text once a price fact backs it, and a 'could not read the official page' note", () => {
    assert.deepEqual(rules(row({ currentPricing: "Pro $20/mo (official, as of 2026-10-25)" }), verifiedFacts), []);
    assert.deepEqual(rules(row({ currentPricing: "Paid prices did not render on the official page", freeTierFeatures: null }), undefined), []);
    assert.equal(claimsOfficial("Plan prices unverified as of 2026-10-14 (official page JavaScript-only)"), false);
    assert.equal(claimsOfficial("Plans from $4.99/mo (official); higher tiers"), true);
  });
});

describe("rule: pricing-source-path", () => {
  it("accepts pricing, plans and billing pages and pricing help articles", () => {
    for (const url of [
      "https://otter.ai/pricing",
      "https://www.perplexity.ai/hub/pricing",
      "https://www.canva.com/pricing/",
      "https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans",
      "https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you",
      "https://support.microsoft.com/en-us/Microsoft-365-Copilot/ai-credits-and-limits-for-microsoft-365-subscriptions",
      "https://character.ai/subscribe",
    ]) {
      assert.ok(isPricingSourceUrl(url), url);
    }
  });

  it("rejects help articles about something else, home pages and blog posts", () => {
    for (const url of [
      "https://www.perplexity.ai/help-center/en/articles/12167980-using-the-connector-for-slack",
      "https://www.comfy.org/",
      "https://www.minimax.io/blog/minimax-m31f",
    ]) {
      assert.equal(isPricingSourceUrl(url), false, url);
    }
  });

  it("a fact citing another kind of page must say so with sourceKind", () => {
    const slack = "https://www.perplexity.ai/help-center/en/articles/12167980-using-the-connector-for-slack";
    const bad: ToolFacts = { ...verifiedFacts, plans: fact([{ name: "Pro", price: "$10", period: "month", limits: "" }], { sourceUrl: slack }) };
    assert.deepEqual(rules(row({}), bad), ["pricing-source-path plans.sourceUrl"]);
    const labelled: ToolFacts = { ...verifiedFacts, freeTier: fact({ available: true, summary: "Free." }, { sourceUrl: "https://sample.example/", sourceKind: "product-page" }) };
    assert.deepEqual(rules(row({}), labelled), []);
  });
});
