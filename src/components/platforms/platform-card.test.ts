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

// ---------------------------------------------------------------------------
// Default card tidy-up (Package 2b, 2026-11-19)
// ---------------------------------------------------------------------------

test("Default card shows difficulty as a pill matching the cost badge, in a centred row", () => {
  for (const [level, colour] of [["BEGINNER", "green"], ["INTERMEDIATE", "blue"], ["ADVANCED", "amber"], ["EXPERT", "red"]] as const) {
    const html = renderToStaticMarkup(createElement(PlatformCard, { ...platform, difficultyLevel: level, hasMobileApp: true }));
    const pills = [...html.matchAll(/<span class="([^"]*rounded-md border px-2 py-0\.5 text-xs font-medium leading-5[^"]*)"/g)].map((m) => m[1]);
    // Cost badge, difficulty, App: all on the one shared pill class.
    assert.equal(pills.length, 3, level);
    assert.ok(pills[1].includes(`text-${colour}-400`) && pills[1].includes(`border-${colour}-500/20`), level);
    assert.ok(html.includes("mb-3 flex flex-wrap items-center gap-2"), level);
  }
});

test("A default card given a why sentence, chips and links renders them inside its article", () => {
  const html = renderToStaticMarkup(createElement(PlatformCard, {
    ...platform,
    why: "Fixture why sentence.",
    matchReasons: ["Matches goal", "Free tier"],
    extraLinks: [
      { href: "/platform/fixture-tool/guide", label: "Getting-started tutorial" },
      { href: "/workflows/fixture-flow", label: "Workflow: Fixture flow" },
    ],
    className: "sm:col-span-2",
  }));
  const article = html.match(/^<article\b[^>]*>[\s\S]*<\/article>$/);
  assert.ok(article, "card output is one article element");
  assert.ok(html.startsWith('<article class="group relative flex min-w-0 flex-col') && html.includes("sm:col-span-2"));
  for (const text of ["Fixture why sentence.", "Matches goal", "Free tier", "Getting-started tutorial", "Workflow: Fixture flow"]) {
    assert.ok(html.includes(text), text);
  }
  // The why sentence sits directly under the description, at the same contrast as before.
  assert.ok(html.indexOf("A fixture for checking card behavior") < html.indexOf("Fixture why sentence."));
  assert.ok(html.includes('<p class="mb-3 text-sm text-gray-300">Fixture why sentence.</p>'));
  // Chips and links sit in the footer, before "Meet the tool".
  assert.ok(html.indexOf("Matches goal") > html.indexOf("border-t border-gray-700/60"));
  assert.ok(html.indexOf("Workflow: Fixture flow") < html.indexOf("Meet the tool"));
  // Inner links are lifted above the title link's overlay and never nested in another link.
  assert.match(html, /<a class="relative z-10 text-orange-400 hover:underline" href="\/platform\/fixture-tool\/guide">/);
  assert.match(html, /<a class="relative z-10 text-orange-400 hover:underline" href="\/workflows\/fixture-flow">/);
  assert.doesNotMatch(html, /<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<a\b/);
});

test("Without the new props the default card renders no why, chips or extra links", () => {
  const html = renderToStaticMarkup(createElement(PlatformCard, platform));
  assert.ok(!html.includes("rounded-full border border-gray-700 bg-gray-900"));
  assert.ok(!html.includes("relative z-10 text-orange-400"));
});

test("Quiz match sections render every extra inside a card, with cards as the grid items", async () => {
  const { QuizMatchSections } = await import("@/components/quiz/quiz-match-sections");
  const rec = (id: string, why?: string) => ({
    ...platform,
    id,
    slug: id,
    name: id,
    matchScore: 1,
    matchReasons: ["Matches goal" as const],
    why: why ?? null,
  });
  const html = renderToStaticMarkup(createElement(QuizMatchSections, {
    recs: [rec("chatgpt", "Default pick reason."), rec("claude"), rec("gemini")],
    goals: [],
  }));
  // Every grid's direct children are cards: nothing renders between or below them.
  const grids = [...html.matchAll(/<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">([\s\S]*?)<\/section>/g)];
  assert.equal(grids.length, 2, "Best first pick and Also good grids");
  for (const grid of grids) {
    const inner = grid[1].replace(/<\/div>$/, "");
    const withoutArticles = inner.replace(/<article\b[\s\S]*?<\/article>/g, "");
    assert.equal(withoutArticles.trim(), "", "only cards inside the grid");
  }
  const best = html.match(/<article\b[^>]*sm:col-span-2 lg:col-span-3[^>]*>[\s\S]*?<\/article>/)?.[0] ?? "";
  assert.ok(best.includes("Default pick reason."), "why sits inside the Best first pick card");
  assert.ok(best.includes("Matches goal"));
  assert.ok(best.includes("Getting-started tutorial"), "tutorial link sits inside the card");
});
