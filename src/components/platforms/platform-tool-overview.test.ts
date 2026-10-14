import assert from "node:assert/strict";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, it } from "node:test";
import { overlayPlatformWithFacts } from "@/data/facts/overlay";
import { validExampleFacts } from "@/data/facts/fixtures/valid-example";
import { PlatformToolOverview } from "./platform-tool-overview";

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
});
