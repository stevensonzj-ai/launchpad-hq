import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";
import { PlatformCard } from "./platform-card";

const platform = {
  slug: "fixture-tool",
  name: "Fixture Tool",
  company: "Fixture Co",
  primaryUse: "A fixture for checking card behavior",
  costTier: "FREEMIUM",
  difficultyLevel: "BEGINNER",
  category: { name: "Text & Conversational AI", slug: "text-conversational-ai" },
  freeTierFeatures: "Free: legacy catalog limits",
};

test("Cards prefer sourced fact-file limits over legacy catalog copy", () => {
  const html = renderToStaticMarkup(createElement(PlatformCard, {
    ...platform,
    facts: { freeTier: { value: { available: true, summary: "10 fixture credits per month" }, sourceUrl: "https://example.com/plans", checkedAt: "2026-10-15", gatheredBy: "test fixture", status: "verified" } },
    isSignedIn: false,
  }));
  assert.ok(html.includes("10 fixture credits per month"));
  assert.ok(!html.includes("legacy catalog limits"));
  assert.ok(html.includes('href="https://example.com/plans"'));
  assert.ok(html.includes("Good for writing &amp; conversation"));
  assert.doesNotMatch(html, /<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<a\b/);
});

test("Cards retain real catalog details and quiz difficulty signals without fact files", () => {
  const html = renderToStaticMarkup(createElement(PlatformCard, { ...platform, aboveDifficulty: true, matchScore: 82 }));
  assert.ok(html.includes("legacy catalog limits"));
  assert.ok(!html.includes("Free: Free:"));
  assert.ok(html.includes("82% match"));
  assert.ok(html.includes("Above the difficulty level you selected in the quiz"));
  assert.ok(html.includes("Advanced"));
});

test("Missing plan details do not imply that a guide contains available pricing", () => {
  const html = renderToStaticMarkup(createElement(PlatformCard, { ...platform, freeTierFeatures: null }));
  assert.ok(!html.includes("See the platform guide"));
  assert.ok(!html.includes("Free-plan details"));
  assert.ok(html.includes("Freemium"));
  assert.ok(html.includes('href="/platform/fixture-tool"'));
});

test("Paid options keep their own citation when no free-tier fact is available", () => {
  const html = renderToStaticMarkup(createElement(PlatformCard, {
    ...platform,
    freeTierFeatures: null,
    facts: { plans: { value: [{ name: "Pro", price: "$20", period: "month", limits: "" }], sourceUrl: "https://example.com/pricing", checkedAt: "2026-10-15", gatheredBy: "test fixture", status: "verified" } },
  }));
  assert.ok(html.includes("Paid options:"));
  assert.ok(html.includes('href="https://example.com/pricing"'));
  assert.ok(html.includes("Pricing source · checked 2026-10-15"));
});
