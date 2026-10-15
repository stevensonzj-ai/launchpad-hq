import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applyUsageLimitsToFreePlan,
  collectDisplaySources,
  extractUrls,
  freeTierSummary,
  parsePricingProse,
  resolvePlatformTab,
  startingPriceLabel,
  staticTutorialCount,
  stripInlineCitations,
} from "./platform-display";
import { validExampleFacts } from "@/data/facts/fixtures/valid-example";

describe("platform display helpers", () => {
  it("strips as-of stamps and URLs from catalog prose", () => {
    const raw =
      "Free $0; Plus $8/mo (official docs.x.ai/x-subscription/pricing, as of 2026-10-14). Exact pool unverified.";
    const cleaned = stripInlineCitations(raw);
    assert.equal(cleaned.includes("as of"), false);
    assert.equal(cleaned.includes("http"), false);
    assert.match(cleaned, /Plus \$8\/mo/);
  });

  it("extracts URLs from prose", () => {
    const urls = extractUrls("See https://x.ai/bot and https://x.ai/bot");
    assert.deepEqual(urls, ["https://x.ai/bot"]);
  });

  it("parses semicolon pricing into table rows", () => {
    const rows = parsePricingProse("Free $0; Plus $8/mo; Premium $30/mo");
    assert.equal(rows.length, 3);
    assert.equal(rows[1]?.name, "Plus");
    assert.match(rows[1]?.price ?? "", /\$8/);
  });

  it("picks a starting price from the free plan and the lowest paid price", () => {
    assert.equal(
      startingPriceLabel([
        { name: "Free", price: "$0", period: "month", limits: "" },
        { name: "Plus", price: "$8", period: "month", limits: "" },
      ]),
      "Free, from $8/month",
    );
  });

  it("reads plan names out of catalog pricing prose", () => {
    const rows = parsePricingProse("Free tier; $20/mo Pro");
    assert.deepEqual(
      rows.map((row) => [row.name, row.price]),
      [
        ["Free", "Free"],
        ["Pro", "$20/mo"],
      ],
    );
    assert.equal(startingPriceLabel(rows), "Free, from $20/mo");
  });

  it("prefers fact-file free-tier copy", () => {
    assert.equal(freeTierSummary(validExampleFacts, "GPT-4o mini leftover"), validExampleFacts.freeTier?.value.summary);
    assert.equal(freeTierSummary(undefined, "Free: 20 prompts (as of 2026-01-01)"), "Free: 20 prompts");
  });

  it("collects unique fact-file sources plus catalog URLs", () => {
    const { sources, notes } = collectDisplaySources(validExampleFacts, [
      "See https://help.openai.com/pricing as of 2026-10-14 (unverified)",
    ]);
    assert.ok(sources.some((s) => s.url.includes("example.com")));
    assert.ok(sources.some((s) => s.url.includes("help.openai.com")));
    assert.ok(notes.some((n) => n.toLowerCase().includes("unverified")));
  });

  it("fills empty Free-plan limits from leftover usageLimits", () => {
    const plans = applyUsageLimitsToFreePlan(
      [
        { name: "Free", price: "$0", period: "month", limits: "" },
        { name: "Plus", price: "$8", period: "month", limits: "higher" },
      ],
      "20 prompts/day (as of 2026-01-01)",
    );
    assert.equal(plans[0]?.limits, "20 prompts/day");
    assert.equal(plans[1]?.limits, "higher");
  });

  it("hides the tutorials tab when there is no static file", () => {
    assert.equal(staticTutorialCount(false), 0);
    assert.equal(resolvePlatformTab("tutorials", false), "overview");
    assert.equal(resolvePlatformTab("tutorials", true), "tutorials");
  });
});
