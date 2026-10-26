import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PlatformToolOverview } from "@/components/platforms/platform-tool-overview";
import { getToolFacts, overlayPlatformWithFacts } from "@/data/facts";
import { FACT_VALUE_KEYS, type Fact, type ToolFacts } from "@/data/facts/types";
import { isPublishedVerified } from "@/data/facts/walk";
import { renderToolMarkdown } from "@/lib/markdown/render";
import { CAREER_FIXTURE_ROWS, SEARCH_FIXTURE_ROWS } from "@/lib/mcp/search-fixtures";
import { getPricingFacts } from "@/lib/mcp/tools";
import { FEED_CHANGELOG } from "./changelog";
import { renderLlmsFull } from "./llms-full";
import { PublicTool } from "./schema";
import { buildFeedContext, toPublicCatalog, toPublicTool } from "./serialize";

/**
 * Search-relevance second-check pass, 2026-10-26: facts gathered from each
 * tool's own pages for the most-queried catalog_only tools and the new career
 * rows. Every one is unverified (a separate session verifies), and every
 * surface reads it from the one fact file. Fixtures only (no database).
 */

const DATE = "2026-10-26";

/** slug -> the vendor's own domains (sources must be on one of them). */
const OFFICIAL: Record<string, string[]> = {
  grammarly: ["grammarly.com"],
  "notion-ai": ["notion.com"],
  "perplexity-ai": ["perplexity.ai"],
  gemini: ["gemini.google"],
  "microsoft-copilot": ["microsoft.com"],
  "canva-ai-magic-studio": ["canva.com"],
  recraft: ["recraft.ai"],
  claude: ["claude.com"],
  ideogram: ["ideogram.ai"],
  teal: ["tealhq.com"],
  kickresume: ["kickresume.com"],
  rezi: ["rezi.ai"],
};
const NEW_FILES = ["grammarly", "notion-ai", "perplexity-ai", "gemini", "microsoft-copilot", "canva-ai-magic-studio", "recraft", "teal", "kickresume", "rezi"];

const ROWS = [...SEARCH_FIXTURE_ROWS, ...CAREER_FIXTURE_ROWS];
const ctx = buildFeedContext(ROWS, getToolFacts, { generatedAt: `${DATE}T00:00:00.000Z` });
const rowOf = (slug: string) => {
  const r = ROWS.find((x) => x.slug === slug);
  assert.ok(r, `fixture row for ${slug}`);
  return r;
};
const facts = (slug: string): ToolFacts => {
  const f = getToolFacts(slug);
  assert.ok(f, `fact file for ${slug}`);
  return f;
};
const feedTool = (slug: string) => PublicTool.parse(JSON.parse(JSON.stringify(toPublicTool(rowOf(slug), facts(slug), ctx))));
const gathered = (f: ToolFacts) =>
  FACT_VALUE_KEYS.map((k) => f[k] as Fact<unknown> | undefined).filter(
    (x): x is Fact<unknown> => Boolean(x && x.checkedAt === DATE && x.gatheredBy === "claude"),
  );
const html = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");

function pageHtml(slug: string): string {
  const r = rowOf(slug);
  const f = facts(slug);
  const view = overlayPlatformWithFacts(r as Parameters<typeof overlayPlatformWithFacts>[0], f);
  return renderToStaticMarkup(
    h(PlatformToolOverview, {
      platform: { ...r, ...view, mobileWebFriendly: true } as Parameters<typeof PlatformToolOverview>[0]["platform"],
      facts: f,
      hasModelFamily: false,
    }),
  );
}

describe("search-relevance fact pass (2026-10-26)", () => {
  it("every gathered fact passed the separate second check, from the vendor's own domain", () => {
    for (const [slug, domains] of Object.entries(OFFICIAL)) {
      const list = gathered(facts(slug));
      assert.ok(list.length > 0, slug);
      for (const fact of list) {
        // Gathered by "claude", re-checked against the live page by a different
        // session ("claude-recheck") on the same day.
        assert.deepEqual([fact.status, fact.verifiedBy, fact.verifiedAt], ["verified", "claude-recheck", DATE], slug);
        assert.ok(isPublishedVerified(fact), slug);
        const host = new URL(fact.sourceUrl).hostname;
        assert.ok(domains.some((d) => host === d || host.endsWith(`.${d}`)), `${slug}: ${fact.sourceUrl}`);
      }
      assert.ok(facts(slug).changelog?.some((c) => c.date === DATE), `${slug} changelog`);
    }
    // Every fact in the new files passed the second check; none is still pending.
    for (const slug of NEW_FILES) {
      const f = facts(slug);
      for (const k of FACT_VALUE_KEYS) {
        const fact = f[k] as Fact<unknown> | undefined;
        if (fact) assert.ok(isPublishedVerified(fact), `${slug}.${k}`);
      }
      assert.equal(feedTool(slug).verification.status, "verified", slug);
    }
  });

  it("Claude now has a sourced free-tier fact", () => {
    const free = facts("claude").freeTier;
    assert.equal(free?.value.available, true);
    assert.equal(free?.sourceUrl, "https://claude.com/pricing");
    assert.notEqual(getPricingFacts({ platform: "claude" }, ROWS, getToolFacts).platform.verification, "catalog_only");
  });

  it("no fact file prices a plan the page did not show (JavaScript-rendered pricing pages)", () => {
    assert.equal(facts("canva-ai-magic-studio").plans, undefined);
    assert.equal(facts("recraft").plans, undefined);
    // Notion's monthly-billing prices were not in the rendered page; only the yearly view is recorded.
    assert.match(facts("notion-ai").plans?.note ?? "", /not recorded/);
  });

  it("feed, MCP, page HTML, Markdown and llms-full agree", () => {
    const slugs = Object.keys(OFFICIAL);
    const full = renderLlmsFull({
      generatedAt: ctx.generatedAt,
      catalog: toPublicCatalog(ROWS.filter((r) => slugs.includes(r.slug)), getToolFacts, ctx),
      compare: [],
      guides: [],
      workflows: [],
      models: [],
      modelCompare: null,
    });
    for (const slug of slugs) {
      const f = facts(slug);
      const out = feedTool(slug);
      const mcp = getPricingFacts({ platform: slug }, ROWS, getToolFacts);
      const page = pageHtml(slug);
      const md = renderToolMarkdown(out);

      assert.notEqual(out.verification.status, "catalog_only", slug);
      assert.equal(mcp.platform.verification, out.verification.status, slug);
      assert.deepEqual(mcp.platform.free_tier, out.free_tier, slug);
      assert.equal(mcp.platform.starting_price, out.starting_price, slug);
      assert.deepEqual(mcp.platform.tasks ?? null, out.tasks, slug);
      if (f.freeTier) {
        assert.equal(out.free_tier.summary, f.freeTier.value.summary, slug);
        assert.ok(page.includes(html(f.freeTier.value.summary)), `${slug} page free tier`);
        assert.ok(md.includes(f.freeTier.value.summary), `${slug} markdown free tier`);
      }
      if (f.plans) {
        assert.deepEqual(mcp.plans?.value.map((p) => [p.name, p.price]), f.plans.value.map((p) => [p.name, p.price]), slug);
        assert.deepEqual(out.plans.map((p) => p.name), f.plans.value.map((p) => p.name), slug);
        for (const plan of out.plans) assert.ok(page.includes(html(plan.price_text)), `${slug} page plan ${plan.name}`);
      }
      for (const item of out.features ?? []) {
        assert.ok(page.includes(html(item)), `${slug} page feature`);
        assert.ok(md.includes(item), `${slug} markdown feature`);
        assert.ok(full.includes(item), `${slug} llms-full feature`);
      }
      for (const fact of gathered(f)) {
        assert.ok(out.sources.some((s) => s.url === fact.sourceUrl && s.checked_at === DATE && s.status === "verified"), `${slug} cites ${fact.sourceUrl}`);
      }
      assert.equal(out.sponsored, false, slug);
    }
  });

  it("no reviewer identities, emails or postal addresses reach the feed", () => {
    for (const slug of Object.keys(OFFICIAL)) {
      const text = JSON.stringify(feedTool(slug));
      assert.doesNotMatch(text, /gatheredBy|verifiedBy|gathered_by|verified_by|accessTier/, slug);
      assert.doesNotMatch(text, /[\w.]+@[\w-]+\.[a-z]{2,}/i, slug);
      assert.doesNotMatch(text, /PostalAddress|Miami|57th Ave/i, slug);
    }
  });

  it("the facts files cite no social media, blogs-by-others or aggregators", () => {
    for (const slug of Object.keys(OFFICIAL)) {
      const text = readFileSync(join(process.cwd(), `src/data/facts/${slug}.ts`), "utf8");
      assert.doesNotMatch(text, /https:\/\/(www\.)?(x|twitter|reddit|medium|youtube|g2|capterra|producthunt)\.com/i, slug);
    }
  });

  it("the feed changelog's 1.2 entry describes the career tools and the new sourced facts", () => {
    const entry = FEED_CHANGELOG.find((c) => c.date === DATE && /schema_version 1\.2/.test(c.summary));
    assert.ok(entry);
    assert.match(entry.summary, /Career & Job Search/);
    assert.match(entry.summary, /Teal, Kickresume and Rezi/);
    assert.match(entry.summary, /second check/);
    assert.doesNotMatch(entry.summary, /marked unverified until/);
  });
});
