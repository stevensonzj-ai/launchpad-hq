import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";
import { getToolFacts } from "@/data/facts";
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
  const html = renderToStaticMarkup(createElement(PlatformCard, { ...platform, aboveDifficulty: true }));
  assert.ok(html.includes("legacy catalog limits"));
  assert.ok(!html.includes("Free: Free:"));
  // The quiz score is a raw sum, not a percentage, so no card shows "% match".
  assert.doesNotMatch(html, /% match/);
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

test("Discontinued cards never show a free or Freemium badge, free-plan copy or prices", () => {
  const html = renderToStaticMarkup(createElement(PlatformCard, {
    ...platform,
    slug: "play-ht",
    name: "PlayHT",
    facts: getToolFacts("play-ht"),
    isSignedIn: false,
  }));
  assert.ok(html.includes("Discontinued"));
  assert.ok(!/Freemium|Free plan|legacy catalog limits|Paid options/.test(html));
});

const factFixture = {
  freeTier: { value: { available: true, summary: "10 fixture credits per month" }, sourceUrl: "https://example.com/plans", checkedAt: "2026-10-15", gatheredBy: "test fixture", status: "verified" as const },
  plans: { value: [{ name: "Pro", price: "$20", period: "month", limits: "" }], sourceUrl: "https://example.com/pricing", checkedAt: "2026-10-01", gatheredBy: "test fixture", status: "verified" as const },
};

test("Compact cards omit the free-plan paragraph, prices, source links, App/Web badge and Good-for chip", () => {
  const html = renderToStaticMarkup(createElement(PlatformCard, {
    ...platform,
    facts: factFixture,
    hasMobileApp: true,
    isSignedIn: false,
    variant: "compact",
  }));
  assert.ok(!html.includes("Free-plan details"));
  assert.ok(!html.includes("10 fixture credits per month"));
  assert.ok(!html.includes("legacy catalog limits"));
  assert.ok(!html.includes("Paid options"));
  assert.ok(!html.includes("example.com"));
  assert.ok(!html.includes("Good for"));
  assert.ok(!/>App</.test(html) && !/>Web</.test(html));
  // What it keeps: one link to the tool page, maker, description, cost and difficulty pills, oldest checked date.
  // The Save control (a sign-in link when signed out) is the only other link.
  assert.equal(html.match(/<a\b[^>]*href="\/platform\//g)?.length, 1);
  assert.ok(!/<a\b[^>]*href="https?:/.test(html));
  assert.ok(html.includes('href="/platform/fixture-tool"'));
  assert.ok(html.includes("by Fixture Co"));
  assert.ok(html.includes("line-clamp-2"));
  assert.ok(html.includes("Free plan"));
  assert.ok(html.includes("Beginner-friendly"));
  assert.ok(html.includes("checked 2026-10-01"));
});

test("Compact difficulty is a pill matching the cost badge, and the row is centred", () => {
  for (const [level, colour] of [["BEGINNER", "green"], ["INTERMEDIATE", "blue"], ["ADVANCED", "amber"], ["EXPERT", "red"]] as const) {
    const html = renderToStaticMarkup(createElement(PlatformCard, { ...platform, difficultyLevel: level, variant: "compact" }));
    const pills = [...html.matchAll(/<span class="([^"]*rounded-md border px-2 py-0\.5 text-xs font-medium leading-5[^"]*)"/g)].map((m) => m[1]);
    assert.equal(pills.length, 2, level);
    assert.ok(pills[1].includes(`text-${colour}-400`) && pills[1].includes(`border-${colour}-500/20`), level);
    assert.ok(html.includes("flex flex-wrap items-center gap-2"));
  }
});

test("Compact cards show no checked date without a dated fact", () => {
  const html = renderToStaticMarkup(createElement(PlatformCard, { ...platform, variant: "compact" }));
  assert.ok(!html.includes("checked "));
  assert.ok(html.includes("Freemium"));
});

test("Discontinued compact cards keep the discontinued rules", () => {
  const html = renderToStaticMarkup(createElement(PlatformCard, {
    ...platform,
    slug: "play-ht",
    name: "PlayHT",
    facts: getToolFacts("play-ht"),
    isSignedIn: false,
    variant: "compact",
  }));
  assert.ok(html.includes("Discontinued"));
  assert.ok(!/Freemium|Free plan|legacy catalog limits|Paid options/.test(html));
  assert.ok(!html.includes("checked "));
});
