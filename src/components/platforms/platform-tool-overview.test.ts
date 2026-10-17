import assert from "node:assert/strict";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, it } from "node:test";
import { overlayPlatformWithFacts } from "@/data/facts/overlay";
import { validExampleFacts } from "@/data/facts/fixtures/valid-example";
import type { Fact, ToolUsageLimits } from "@/data/facts/types";
import { PlatformPricingTable } from "./platform-pricing-table";
import { buildTechnicalDetailRows } from "./platform-technical-details";
import { PlatformToolOverview } from "./platform-tool-overview";

const verifiedUsageLimits: Fact<ToolUsageLimits> = {
  value: {
    creditsExpire: "Plan credits expire at renewal",
    watermark: "Free plan keeps the vendor badge",
    commercialUse: "Paid plans include commercial use",
    rollover: "No rollover",
    other: ["Daily refresh on the free plan"],
  },
  sourceUrl: "https://example.com/fixture-valid/usage",
  checkedAt: "2026-10-17",
  gatheredBy: "research-analyst",
  verifiedBy: "ra",
  verifiedAt: "2026-10-17",
  status: "verified",
  note: "Both official sources, same date (2026-10-17).",
};

function renderOverview(facts: typeof validExampleFacts | (typeof validExampleFacts & { usageLimits?: Fact<ToolUsageLimits> })) {
  const view = overlayPlatformWithFacts(basePlatform, facts);
  return renderToStaticMarkup(
    h(PlatformToolOverview, {
      platform: { ...view, name: "Fixture Tool" },
      facts,
      hasModelFamily: false,
    }),
  );
}

function countOccurrences(html: string, needle: string): number {
  let count = 0;
  let from = 0;
  while (from < html.length) {
    const at = html.indexOf(needle, from);
    if (at === -1) return count;
    count += 1;
    from = at + needle.length;
  }
  return count;
}

const basePlatform = {
  name: "Fixture Tool",
  company: "Fixture Co",
  description: "db description leftover",
  primaryUse: "db primary use",
  primaryUseCases: "Drafting; research notes",
  currentPricing: "db pricing",
  freeTierFeatures: "GPT-4o mini leftover",
  usageLimits: "leftover usage",
  platformType: ["Web"],
  hasMobileApp: false,
  iosAppUrl: null,
  androidAppUrl: null,
  idealUserTypes: ["students"],
  contentTypes: ["Text"],
  outputFormats: ["Markdown"],
  difficultyLevel: "BEGINNER",
  privacyLevel: "MEDIUM",
  timeToProductivity: "5 min",
  learningCurve: "Instant",
  offlineCapable: false,
  apiAvailable: true,
  languageSupport: "English",
  keyIntegrations: "Slack, Notion, Zapier, Google Drive, Dropbox, HubSpot",
  upgradeTriggers: "Need higher limits",
  costTier: "FREEMIUM",
  mobileWebFriendly: true,
};

describe("platform overview field uniqueness", () => {
  it("renders each fact label once when a model family section exists", () => {
    const view = overlayPlatformWithFacts(basePlatform, validExampleFacts);
    const html = renderToStaticMarkup(
      h(PlatformToolOverview, {
        platform: { ...view, name: "Fixture Tool" },
        facts: validExampleFacts,
        hasModelFamily: true,
        modelsSection: h("section", null, h("h2", null, "Models")),
      }),
    );

    // Collapsed Sources & notes repeats field names as source captions; uniqueness
    // is about visible overview labels, so ignore <details> (sources + "more").
    const visible = html.replace(/<details[\s\S]*?<\/details>/g, "");
    const once = [
      "Free tier",
      "Platforms",
      "Company",
      "Starting price",
      "Verdict",
      "Quick facts",
      "Pricing",
      "Technical details",
      "Best for",
      "Offline",
      "API",
      "Languages",
      "Difficulty",
      "Privacy",
      "Integrations",
      "Models",
    ];
    for (const label of once) {
      assert.equal(
        countOccurrences(visible, label),
        1,
        `${label} should appear once, got ${countOccurrences(visible, label)}\n${visible}`,
      );
    }

    assert.equal(html.includes("Free Tier"), false);
    assert.equal(html.includes("At a glance"), false);
    assert.equal(html.includes(">Type<") || html.includes("Type:"), false);
    assert.equal(html.includes("GPT-4o mini leftover"), false);
    assert.ok(html.includes("more"));
    assert.ok(html.includes("<details"));
  });

  it("shows the models list in Technical details only when there is no Models section", () => {
    const view = overlayPlatformWithFacts(basePlatform, validExampleFacts);
    const html = renderToStaticMarkup(
      h(PlatformToolOverview, {
        platform: { ...view, name: "Fixture Tool" },
        facts: validExampleFacts,
        hasModelFamily: false,
      }),
    );
    const visible = html.replace(/<details[\s\S]*?<\/details>/g, "");
    assert.equal(countOccurrences(visible, "Models"), 1);
    assert.ok(html.includes("flagship chat model"));
  });

  it("shows a models Fact note under the Technical details models row", () => {
    const facts = {
      ...validExampleFacts,
      models: {
        ...validExampleFacts.models,
        note: "Muse Spark Open is Meta's downloadable open-weight model (also via hosted APIs) — it is not a model of the consumer Meta AI assistant app.",
      },
    };
    const view = overlayPlatformWithFacts(basePlatform, facts);
    const html = renderToStaticMarkup(
      h(PlatformToolOverview, {
        platform: { ...view, name: "Fixture Tool" },
        facts,
        hasModelFamily: false,
      }),
    );
    assert.ok(html.includes("downloadable open-weight model"));
    assert.ok(html.includes("not a model of the consumer Meta AI assistant app"));
  });

  it("renders API pricing as its own section, not inside the plans table", () => {
    const facts = {
      ...validExampleFacts,
      apiPricing: {
        value: "Flash $0.30 / 1M input",
        sourceUrl: "https://example.com/fixture-valid/api",
        checkedAt: "2026-10-14",
        gatheredBy: "research-analyst",
        verifiedBy: "pending",
        status: "unverified" as const,
      },
    };
    const view = overlayPlatformWithFacts(basePlatform, facts);
    const html = renderToStaticMarkup(
      h(PlatformToolOverview, {
        platform: { ...view, name: "Fixture Tool" },
        facts,
        hasModelFamily: false,
      }),
    );
    assert.ok(html.includes("API pricing"));
    assert.ok(html.includes("Flash $0.30 / 1M input"));
    assert.ok(html.includes("Plus"));
  });

  it("renders a verified usageLimits fact as stored", () => {
    const html = renderOverview({ ...validExampleFacts, usageLimits: verifiedUsageLimits });
    const visible = html.replace(/<details[\s\S]*?<\/details>/g, "");
    assert.ok(visible.includes("Usage limits"));
    assert.ok(visible.includes("Credits expire"));
    assert.ok(visible.includes("Plan credits expire at renewal"));
    assert.ok(visible.includes("Watermark"));
    assert.ok(visible.includes("Free plan keeps the vendor badge"));
    assert.ok(visible.includes("Commercial use"));
    assert.ok(visible.includes("Paid plans include commercial use"));
    assert.ok(visible.includes("Rollover"));
    assert.ok(visible.includes("No rollover"));
    assert.ok(visible.includes("Other"));
    assert.ok(visible.includes("Daily refresh on the free plan"));
    assert.equal(visible.includes("Both official sources, same date (2026-10-17)."), false);
    assert.equal(html.includes("Both official sources, same date (2026-10-17)."), false);
    assert.ok(html.includes("https://example.com/fixture-valid/usage"));
    assert.ok(html.includes("2026-10-17"));
  });

  it("never renders a usageLimits editorial note containing FLAG:", () => {
    const html = renderOverview({
      ...validExampleFacts,
      usageLimits: {
        ...verifiedUsageLimits,
        note: "FLAG: vendor self-conflict on Free commercial license. Do not state Free commercial terms.",
      },
    });
    assert.ok(html.includes("Usage limits"));
    assert.ok(html.includes("Plan credits expire at renewal"));
    assert.equal(html.includes("FLAG:"), false);
    assert.equal(html.includes("vendor self-conflict"), false);
  });

  it("does not render unverified or pending usageLimits", () => {
    const unpublished: Fact<ToolUsageLimits>[] = [
      { ...verifiedUsageLimits, status: "unverified", verifiedBy: "ra" },
      { ...verifiedUsageLimits, status: "verified", verifiedBy: "pending" },
      {
        ...verifiedUsageLimits,
        status: "verified",
        verifiedBy: "ra",
        verifiedAt: undefined,
      },
    ];
    for (const usageLimits of unpublished) {
      const html = renderOverview({ ...validExampleFacts, usageLimits });
      const visible = html.replace(/<details[\s\S]*?<\/details>/g, "");
      assert.equal(visible.includes("Usage limits"), false, `published unpublished fact: ${JSON.stringify(usageLimits.status)}`);
      assert.equal(visible.includes("Plan credits expire at renewal"), false);
      assert.equal(html.includes("https://example.com/fixture-valid/usage"), false);
    }
  });

  it("does not render usageLimits when verifiedBy equals gatheredBy", () => {
    const html = renderOverview({
      ...validExampleFacts,
      usageLimits: {
        ...verifiedUsageLimits,
        gatheredBy: "research-analyst",
        verifiedBy: "research-analyst",
        verifiedAt: "2026-10-17",
        status: "verified",
      },
    });
    const visible = html.replace(/<details[\s\S]*?<\/details>/g, "");
    assert.equal(visible.includes("Usage limits"), false);
    assert.equal(visible.includes("Plan credits expire at renewal"), false);
    assert.equal(html.includes("https://example.com/fixture-valid/usage"), false);
  });

  it("shows nothing extra when a tool has no usageLimits fact", () => {
    const without = renderOverview(validExampleFacts);
    const withVerified = renderOverview({ ...validExampleFacts, usageLimits: verifiedUsageLimits });
    assert.equal(without.includes("Usage limits"), false);
    assert.equal(without.includes("Credits expire"), false);
    assert.equal(without.includes("Commercial use"), false);
    assert.ok(withVerified.includes("Usage limits"));
    const leftover = without.includes("leftover usage");
    const leftoverWith = withVerified.includes("leftover usage");
    assert.equal(leftover, leftoverWith);
  });
});

describe("pricing table and ramp-up labels", () => {
  it("hides an empty key-limits column and keeps plan names", () => {
    const html = renderToStaticMarkup(
      h(PlatformPricingTable, {
        plans: [
          { name: "Free", price: "Free", period: "", limits: "" },
          { name: "Pro", price: "$20/mo", period: "", limits: "" },
        ],
      }),
    );
    assert.equal(html.includes("Key limits"), false);
    assert.equal(html.includes("Listed"), false);
    assert.ok(html.includes("Free"));
    assert.ok(html.includes("Pro"));
  });

  it("shows key limits only for rows that have them", () => {
    const html = renderToStaticMarkup(
      h(PlatformPricingTable, {
        plans: [
          { name: "Free", price: "Free", period: "", limits: "20 messages/day" },
          { name: "Pro", price: "$20/mo", period: "", limits: "" },
        ],
      }),
    );
    assert.ok(html.includes("Key limits"));
    assert.ok(html.includes("20 messages/day"));
    assert.equal(html.includes("—"), false);
  });

  it("does not show a learning-curve speed word beside difficulty when a time is known", () => {
    const rows = buildTechnicalDetailRows({
      difficultyLevel: "INTERMEDIATE",
      privacyLevel: "MEDIUM",
      timeToProductivity: "5 min",
      learningCurve: "Instant",
      offlineCapable: false,
      apiAvailable: true,
      languageSupport: "English",
      keyIntegrations: null,
      upgradeTriggers: null,
    });
    const labels = rows.map((row) => row.label);
    assert.ok(labels.includes("Difficulty"));
    assert.ok(labels.includes("Time to productivity"));
    assert.equal(labels.includes("Learning curve"), false);
    assert.equal(rows.some((row) => row.value === "Instant"), false);
    assert.equal(rows.find((row) => row.label === "Difficulty")?.value, "Intermediate");
  });
});
