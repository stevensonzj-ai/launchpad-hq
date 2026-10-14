import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { dirname } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { auditToolFacts, auditToolFactsList } from "./audit";
import { diffToolFacts, renderFactsDiffMarkdown } from "./diff";
import { FACT_PAGE_SKIP_FILES } from "./filenames";
import { missingSourceFacts } from "./fixtures/missing-source";
import { retiredTermFacts } from "./fixtures/retired-term";
import { staleFacts } from "./fixtures/stale";
import { validExampleFacts } from "./fixtures/valid-example";
import { overlayPlatformWithFacts } from "./overlay";
import { REGISTERED_TOOL_FACTS, listRegisteredToolFacts } from "./registry";

const NOW = new Date("2026-10-14T12:00:00.000Z");

describe("fact-file audit", () => {
  it("fails when a fact has no source", () => {
    const issues = auditToolFacts(missingSourceFacts, NOW);
    assert.ok(
      issues.some((issue) => issue.kind === "missing-source" && issue.field === "freeTier"),
      `expected missing-source, got ${JSON.stringify(issues)}`,
    );
  });

  it("fails when a non-price fact is older than 60 days", () => {
    const issues = auditToolFacts(staleFacts, NOW);
    assert.ok(
      issues.some(
        (issue) =>
          issue.kind === "stale" &&
          issue.field === "verdict" &&
          issue.message.includes("limit 60"),
      ),
      `expected stale verdict, got ${JSON.stringify(issues)}`,
    );
  });

  it("fails when a price fact is older than 30 days", () => {
    const issues = auditToolFacts(staleFacts, NOW);
    assert.ok(
      issues.some(
        (issue) =>
          issue.kind === "stale" &&
          issue.field === "plans" &&
          issue.message.includes("limit 30"),
      ),
      `expected stale plans, got ${JSON.stringify(issues)}`,
    );
  });

  it("fails when a retired term appears", () => {
    const issues = auditToolFacts(retiredTermFacts, NOW);
    assert.ok(
      issues.some(
        (issue) =>
          issue.kind === "retired-term" &&
          issue.message.includes("GPT-4o mini"),
      ),
      `expected retired-term, got ${JSON.stringify(issues)}`,
    );
  });

  it("accepts a complete, fresh, sourced fixture", () => {
    const issues = auditToolFacts(validExampleFacts, NOW);
    assert.deepEqual(issues, []);
  });

  it("reports a free-tier / $0 plan contradiction", () => {
    const issues = auditToolFacts(
      {
        slug: "fixture-contradiction",
        lifecycle: "active",
        freeTier: {
          value: { available: false, summary: "None" },
          sourceUrl: "https://example.com/contradiction",
          checkedAt: "2026-10-01",
          gatheredBy: "research-analyst",
          status: "unverified",
        },
        plans: {
          value: [{ name: "Free", price: "$0", period: "month", limits: "none" }],
          sourceUrl: "https://example.com/contradiction",
          checkedAt: "2026-10-01",
          gatheredBy: "research-analyst",
          status: "unverified",
        },
      },
      NOW,
    );
    assert.ok(issues.some((issue) => issue.kind === "contradiction"));
  });

  it("keeps the registered catalog clean against the real current date", () => {
    const issues = auditToolFactsList(listRegisteredToolFacts(), new Date());
    assert.deepEqual(issues, []);
  });

  it("fails if a fact file is not registered", () => {
    const dir = dirname(fileURLToPath(import.meta.url));
    const skip = new Set<string>(FACT_PAGE_SKIP_FILES);
    const slugs = readdirSync(dir)
      .filter((name) => name.endsWith(".ts") && !skip.has(name))
      .map((name) => name.replace(/\.ts$/, ""));
    const missing = slugs.filter((slug) => !REGISTERED_TOOL_FACTS[slug]);
    assert.deepEqual(
      missing,
      [],
      `unregistered fact files: ${missing.join(", ")}`,
    );
    for (const slug of slugs) {
      assert.equal(REGISTERED_TOOL_FACTS[slug]?.slug, slug);
    }
  });
});

describe("overlayPlatformWithFacts", () => {
  it("returns the DB row unchanged when no fact file exists", () => {
    const platform = {
      description: "db description",
      currentPricing: "db pricing",
      freeTierFeatures: "db free",
      platformType: ["Web"],
      hasMobileApp: false,
      iosAppUrl: null,
      androidAppUrl: null,
    };
    assert.deepEqual(overlayPlatformWithFacts(platform, undefined), {
      ...platform,
      macosAppUrl: null,
      usageLimits: null,
    });
  });

  it("overlays priced and free-tier fields from a fact file", () => {
    const platform = {
      description: "db description",
      currentPricing: "db pricing",
      freeTierFeatures: "GPT-4o mini leftover",
      platformType: ["Web"],
      hasMobileApp: false,
      iosAppUrl: null,
      androidAppUrl: null,
    };
    const view = overlayPlatformWithFacts(platform, validExampleFacts);
    assert.equal(view.description, validExampleFacts.verdict?.value);
    assert.equal(view.freeTierFeatures, validExampleFacts.freeTier?.value.summary);
    assert.match(view.currentPricing ?? "", /Plus: \$20\/month/);
    assert.deepEqual(view.platformType, ["Web", "iOS", "Android"]);
    assert.equal(view.hasMobileApp, true);
    assert.equal(view.iosAppUrl, "https://apps.example.com/fixture-valid");
  });

  it("clears leftover store URLs when apps facts omit them", () => {
    const platform = {
      description: null,
      currentPricing: null,
      freeTierFeatures: null,
      usageLimits: "higher limits with a leftover paid label",
      platformType: ["Web"],
      hasMobileApp: true,
      iosAppUrl: "https://apps.apple.com/app/apple-store/id6670324846",
      androidAppUrl: "https://play.google.com/store/apps/details?id=ai.x.grok",
    };
    const view = overlayPlatformWithFacts(platform, {
      slug: "fixture-apps",
      lifecycle: "active",
      freeTier: {
        value: { available: true, summary: "limited, exact limit not published" },
        sourceUrl: "https://example.com/apps",
        checkedAt: "2026-10-14",
        gatheredBy: "research-analyst",
        status: "unverified",
      },
      apps: {
        value: { macos: "https://x.ai/bot#download" },
        sourceUrl: "https://x.ai/bot#download",
        checkedAt: "2026-10-14",
        gatheredBy: "research-analyst",
        status: "unverified",
      },
    });
    assert.equal(view.iosAppUrl, null);
    assert.equal(view.androidAppUrl, null);
    assert.equal(view.macosAppUrl, "https://x.ai/bot#download");
    assert.equal(view.hasMobileApp, false);
    assert.equal(view.usageLimits, null);
  });
});

describe("facts-diff", () => {
  it("renders a markdown table for changed fields", () => {
    const updated = {
      ...validExampleFacts,
      freeTier: {
        ...validExampleFacts.freeTier!,
        value: { available: true, summary: "Updated free-tier summary." },
      },
    };
    const rows = diffToolFacts(validExampleFacts, updated);
    const markdown = renderFactsDiffMarkdown(rows);
    assert.match(markdown, /fixture-valid/);
    assert.match(markdown, /freeTier/);
    assert.match(markdown, /Updated free-tier summary/);
    assert.match(markdown, /example.com\/fixture-valid\/pricing/);
  });
});
