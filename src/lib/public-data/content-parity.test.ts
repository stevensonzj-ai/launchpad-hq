import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { listRegisteredTutorials } from "@/data/tutorials";
import { WORKFLOWS } from "@/data/workflows";
import { discontinuedPlatformSlugs, hiddenPlatformSlugs } from "@/lib/catalog-visibility";
import { row } from "@/lib/mcp/fixtures";
import type { CatalogRow } from "@/lib/mcp/tools";
import { toPublicGuide, toPublicWorkflow } from "./content";
import { toGuideView, toWorkflowView } from "./content-view";
import { FEED_ROWS, GENERATED_AT, feedFacts } from "./fixtures";
import { NON_PROSE_KEYS, contentStrings, parsePriceTokens, planByName, prosePlanPrice } from "./price-tokens";
import { findPriceText } from "./price-guard";
import { PRICE_GUARD_ALLOWLIST } from "./price-guard-allowlist";
import { lowestPaidPlan, normalizePlans } from "./pricing";
import { hasPriceText } from "./prose";
import { buildFeedContext, pagePlans, toPublicTool, type FeedTools } from "./serialize";

/**
 * Fixtures + fact files, no DB: every tutorial and workflow tool gets a
 * catalog row (FEED_ROWS where one exists, else a synthetic one with typed
 * prose pricing), and the feed context lists a guide for every tutorial.
 */
function parityFeed(): FeedTools {
  const known = new Set(FEED_ROWS.map((r) => r.slug));
  const slugs = new Set<string>([
    ...listRegisteredTutorials().map((t) => t.platformSlug),
    ...WORKFLOWS.flatMap((w) =>
      Object.values(w.tiers).flatMap((tier) => [
        ...tier.tools.map((t) => t.slug),
        ...(tier.steps ?? []).map((s) => s.toolSlug),
      ]),
    ),
  ].filter((s): s is string => Boolean(s)));
  const extra: CatalogRow[] = [...slugs]
    .filter((slug) => !known.has(slug))
    .map((slug) => row({ slug, name: slug, currentPricing: "Free; Plus $12/mo; Team $30/user/mo" }));
  const rows = [...FEED_ROWS, ...extra];
  const guides = new Set(listRegisteredTutorials().map((t) => t.platformSlug));
  const ctx = buildFeedContext(rows, feedFacts, { generatedAt: GENERATED_AT, hasGuide: (s) => guides.has(s) });
  return { rows, facts: feedFacts, ctx };
}

const feed = parityFeed();
const rowFor = (slug: string) => feed.rows.find((r) => r.slug === slug)!;

/** The serializer's own prices for a tool (the /data/v1/tools/{slug}.json values). */
function serializerPrices(slug: string) {
  const tool = toPublicTool(rowFor(slug), feed.facts(slug), feed.ctx);
  return { starting_price: tool.starting_price, lowest_paid: tool.lowest_paid, plans: tool.plans };
}

/** What a token must print: the serializer's plan row, formatted for prose. */
function expectedTokenText(token: ReturnType<typeof parsePriceTokens>[number]): string {
  const plans = pagePlans(rowFor(token.slug), feed.facts(token.slug));
  const plan = token.kind === "price" ? planByName(plans, token.plan) : lowestPaidPlan(plans);
  assert.ok(plan, token.raw);
  // The same row the JSON tool record serves.
  const served = normalizePlans(plans).plans.find((p) => p.name === plan.name);
  assert.ok(served, `${token.raw} plan missing from the tool record`);
  return prosePlanPrice(plan);
}

/**
 * The feed cleaner still drops any sentence with a currency sign (a
 * backstop). After this cleanup the only such sentences left are allowlisted
 * exceptions or company figures ("$650 million"), never a tool price.
 */
function assertOnlyKnownDrops(source: string, value: unknown, removed: number) {
  if (removed === 0) return;
  for (const { text } of contentStrings(value, NON_PROSE_KEYS)) {
    if (!hasPriceText(text)) continue;
    const allowed = PRICE_GUARD_ALLOWLIST.some((e) => e.source === source && text.includes(e.contains));
    assert.ok(allowed || findPriceText(text).length === 0, `${source}: typed price reached the feed: ${text.slice(0, 120)}`);
  }
}

const textOf = (value: unknown) => contentStrings(value, NON_PROSE_KEYS).map((s) => s.text).join("\n");

describe("guide prices: HTML view = JSON = serializer", () => {
  for (const tutorial of listRegisteredTutorials()) {
    it(tutorial.platformSlug, () => {
      const view = toGuideView(tutorial, feed);
      const json = toPublicGuide(tutorial, feed);
      const listed = !hiddenPlatformSlugs().includes(tutorial.platformSlug);
      const live = !discontinuedPlatformSlugs().includes(tutorial.platformSlug);
      if (!listed || !live) {
        assert.equal(view.tool, null);
        assert.equal(json, null);
        return;
      }
      assert.ok(json && view.tool);
      // Header price and JSON tool summary are one object from the serializer.
      assert.deepEqual(json.tool, view.tool);
      const own = serializerPrices(tutorial.platformSlug);
      assert.equal(view.tool.starting_price, own.starting_price);
      assert.deepEqual(view.tool.lowest_paid, own.lowest_paid);

      // Every token prints the catalog's price in both views; nothing typed is dropped.
      const htmlText = textOf(view.tutorial);
      const jsonText = textOf(json);
      for (const token of parsePriceTokens(textOf(tutorial))) {
        const expected = expectedTokenText(token);
        assert.ok(htmlText.includes(expected), `HTML ${token.raw} -> ${expected}`);
        assert.ok(jsonText.includes(expected), `JSON ${token.raw} -> ${expected}`);
      }
      assert.doesNotMatch(htmlText, /\{\{/);
      assert.doesNotMatch(jsonText, /\{\{/);
      assertOnlyKnownDrops(`tutorial:${tutorial.platformSlug}`, tutorial, json.prices_removed);
    });
  }
});

describe("workflow prices: HTML view = JSON = serializer", () => {
  for (const workflow of WORKFLOWS) {
    it(workflow.slug, () => {
      const view = toWorkflowView(workflow, feed);
      const json = toPublicWorkflow(workflow, feed);
      assertOnlyKnownDrops(`workflow:${workflow.slug}`, workflow, json.prices_removed);
      for (const tier of json.tiers) {
        const fromJson = new Map<string, string | null>();
        for (const tool of [...tier.tools.map((t) => t.tool), ...tier.steps.map((s) => s.tool)]) {
          if (tool && !fromJson.has(tool.slug)) fromJson.set(tool.slug, tool.starting_price);
        }
        const fromHtml = view.prices[tier.id as keyof typeof view.prices];
        assert.deepEqual(
          fromHtml.map((p) => [p.slug, p.starting_price]),
          [...fromJson.entries()],
          `${workflow.slug}/${tier.id}`,
        );
        for (const p of fromHtml) assert.equal(p.starting_price, serializerPrices(p.slug).starting_price, p.slug);
      }
      const htmlText = textOf(view.workflow);
      for (const token of parsePriceTokens(textOf(workflow))) {
        assert.ok(htmlText.includes(expectedTokenText(token)), token.raw);
      }
      assert.doesNotMatch(htmlText, /\{\{/);
      assert.doesNotMatch(textOf(json), /\{\{/);
    });
  }

  it("no workflow names a discontinued or hidden tool", () => {
    const excluded = new Set([...discontinuedPlatformSlugs(), ...hiddenPlatformSlugs()]);
    const bad = WORKFLOWS.flatMap((w) =>
      Object.values(w.tiers).flatMap((tier) =>
        [...tier.tools.map((t) => t.slug), ...(tier.steps ?? []).map((s) => s.toolSlug)]
          .filter((slug): slug is string => Boolean(slug && excluded.has(slug)))
          .map((slug) => `${w.slug}/${tier.id}: ${slug}`),
      ),
    );
    assert.deepEqual(bad, []);
  });

  it("the voice workflow recommends Inworld AI, not PlayHT", () => {
    const voice = WORKFLOWS.find((w) => w.slug === "voice-clone")!;
    const slugs = Object.values(voice.tiers).flatMap((t) => t.tools.map((tool) => tool.slug));
    assert.ok(slugs.includes("inworld-ai"));
    assert.ok(!slugs.includes("play-ht"));
    assert.doesNotMatch(JSON.stringify(voice), /PlayHT|play\.ht/i);
  });
});
