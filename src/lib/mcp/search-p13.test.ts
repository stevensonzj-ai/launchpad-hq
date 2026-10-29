import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { PublicTool, SCHEMA_VERSION } from "@/lib/public-data/schema";
import { buildFeedContext, toPublicTool } from "@/lib/public-data/serialize";
import { compareOutput, findFreeAlternativesOutput, getPricingFactsOutput, searchToolsOutput } from "./schemas";
import { snapshotRows } from "./snapshot";
import { compare, findFreeAlternatives, getPricingFacts, searchTools } from "./tools";

/**
 * Fix plan P1.3 search follow-ups: the labelled writing top-up, the speech /
 * toast intent, and the resolved_from / resolution echo on every tool that
 * resolves a name.
 */

const ROWS = snapshotRows();
const facts = getToolFacts;
const slugs = (out: ReturnType<typeof searchTools>) => out.results.map((r) => r.slug);

/** The query named in the review summary for a live check; also golden G61. */
export const FALLBACK_QUERY = { task: "write a blog post for my bakery", budget: "low" } as const;

describe("labelled top-up for a thin writing search", () => {
  it("low-budget \"write blog posts\" keeps its one match and adds ChatGPT and Claude, labelled and not counted", () => {
    const out = searchTools({ task: "write blog posts", budget: "low" }, ROWS, facts);
    assert.equal(out.fallback, "top_up");
    assert.equal(out.total_matches, 1);
    assert.deepEqual(slugs(out), ["wordpress-ai-jetpack-ai", "chatgpt", "claude"]);
    for (const r of out.results.slice(1)) {
      assert.equal(r.fallback, true, r.slug);
      assert.equal(r.verification, "verified", r.slug);
      assert.ok(r.tasks?.includes("writing"), r.slug);
      assert.equal(r.match_reasons[0], "fallback: popular verified tool for general writing help, not a direct match");
      assert.ok(r.match_reasons.some((m) => /fits a low budget/.test(m)), r.slug);
    }
    assert.match(out.note ?? "", /labelled fallback, not direct matches/);
    searchToolsOutput.parse(out);
  });

  it(`the pinned fallback query (${FALLBACK_QUERY.task}, budget ${FALLBACK_QUERY.budget}) always tops up`, () => {
    const out = searchTools({ ...FALLBACK_QUERY }, ROWS, facts);
    assert.equal(out.fallback, "top_up");
    assert.deepEqual(slugs(out), ["wordpress-ai-jetpack-ai", "chatgpt", "claude"]);
    assert.deepEqual(out.results.map((r) => Boolean(r.fallback)), [false, true, true]);
  });

  it("a top-up item still has to fit the budget filter", () => {
    const out = searchTools({ task: "write blog posts", budget: "free" }, ROWS, facts);
    for (const r of out.results) assert.ok(["FREE", "FREEMIUM"].includes(r.cost_tier), r.slug);
  });

  it("searches with enough direct matches get no top-up", () => {
    assert.equal(searchTools({ task: "write blog posts" }, ROWS, facts).fallback, null);
    assert.equal(searchTools({ task: "write a cover letter" }, ROWS, facts).fallback, null);
  });
});

describe("speech and toast writing", () => {
  it("\"plan my wedding toast\" goes to general assistants, not lesson planners", () => {
    const out = searchTools({ task: "plan my wedding toast" }, ROWS, facts);
    assert.deepEqual(slugs(out).slice(0, 4).sort(), ["chatgpt", "claude", "gemini", "microsoft-copilot"]);
    assert.ok(!slugs(out).includes("magicschool"), slugs(out).join(", "));
    assert.match(out.results[0].match_reasons.join(" "), /speeches and toasts/);
  });

  it("speech-writing never captures speech-to-text or text-to-speech asks", () => {
    assert.ok(!slugs(searchTools({ task: "text to speech voiceover" }, ROWS, facts)).includes("claude"));
    assert.ok(!slugs(searchTools({ task: "speech to text" }, ROWS, facts)).includes("claude"));
    for (const task of ["write a eulogy", "best man speech"]) {
      assert.ok(slugs(searchTools({ task }, ROWS, facts)).includes("chatgpt"), task);
    }
  });
});

describe("tolerant name matches are echoed by every tool", () => {
  it("get_pricing_facts says how it read the name", () => {
    const out = getPricingFacts({ platform: "midjurney" }, ROWS, facts);
    assert.equal(out.platform.slug, "midjourney");
    assert.equal(out.platform.resolved_from, "midjurney");
    assert.equal(out.platform.resolution, "spelling");
    getPricingFactsOutput.parse(out);
    const exact = getPricingFacts({ platform: "Midjourney" }, ROWS, facts);
    assert.equal(exact.platform.resolved_from, undefined);
  });

  it("compare marks each tolerant item, and only those", () => {
    const out = compare({ platforms: ["chat gpt", "zoommate", "Claude"] }, ROWS, facts);
    assert.deepEqual(out.items.map((i) => [i.slug, i.resolution ?? null]), [["chatgpt", "compact"], ["zoom-ai-companion", "alias"], ["claude", null]]);
    assert.equal(out.items[1].resolved_from, "zoommate");
    compareOutput.parse(out);
  });

  it("find_free_alternatives echoes an alias on its target", () => {
    const out = findFreeAlternatives({ platform: "Bard" }, ROWS, facts);
    assert.equal(out.for?.slug, "gemini");
    assert.equal(out.for?.resolution, "alias");
    assert.equal(out.for?.resolved_from, "Bard");
    findFreeAlternativesOutput.parse(out);
  });
});

describe("feed: optional stale flag (schema 1.3)", () => {
  const ctx = buildFeedContext(ROWS, facts, { generatedAt: "2026-10-26T00:00:00.000Z" });
  const tool = (slug: string) => toPublicTool(ROWS.find((r) => r.slug === slug)!, facts(slug), ctx);

  it("marks a record older than 90 days, and not a fresh one", () => {
    assert.equal(SCHEMA_VERSION, "1.3");
    // Leonardo was the example until stale facts batch 2 (2026-10-29) refreshed it; AIVA (batch 3) is still on its May import.
    assert.equal(tool("aiva").data_as_of ?? tool("aiva").record_updated_at, "2026-05-12");
    assert.equal(tool("aiva").stale, true);
    assert.equal(tool("leonardo-ai").stale, false);
    assert.equal(tool("midjourney").stale, false);
    PublicTool.parse(tool("aiva"));
  });

  it("is optional: a 1.2-shaped record without it still validates", () => {
    const { stale, ...older } = tool("chatgpt");
    assert.equal(stale, false);
    PublicTool.parse(older);
  });
});
