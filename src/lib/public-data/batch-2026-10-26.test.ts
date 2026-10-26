import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PlatformToolOverview } from "@/components/platforms/platform-tool-overview";
import { getToolFacts, overlayPlatformWithFacts } from "@/data/facts";
import type { Fact, ToolFacts } from "@/data/facts/types";
import { renderToolMarkdown } from "@/lib/markdown/render";
import { getPricingFacts } from "@/lib/mcp/tools";
import { FEED_CHANGELOG } from "./changelog";
import { FEED_ROWS, feedContext, feedFacts } from "./fixtures";
import { renderLlmsFull } from "./llms-full";
import { PublicTool } from "./schema";
import { toPublicCatalog, toPublicTool } from "./serialize";

/**
 * Catalog batch 2026-10-26: every touched slug says the same thing on the
 * page, in /data/v1, over MCP, in the Markdown view and in llms-full.txt,
 * because all of them read the one fact file. Fixtures only (no database).
 */

const TOUCHED = ["kimi", "minimax", "ideogram", "claude", "claude-code", "anthropic-api", "openai-api"] as const;
const BATCH_DATE = "2026-10-26";

const ctx = feedContext();
const rowOf = (slug: string) => {
  const row = FEED_ROWS.find((r) => r.slug === slug);
  assert.ok(row, `fixture row for ${slug}`);
  return row;
};
const facts = (slug: string): ToolFacts => {
  const f = getToolFacts(slug);
  assert.ok(f, `fact file for ${slug}`);
  return f;
};
const feedTool = (slug: string) => PublicTool.parse(toPublicTool(rowOf(slug), feedFacts(slug), ctx));

/** React's text escaping, so fact text can be found in rendered HTML. */
const html = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");

function pageHtml(slug: string): string {
  const row = rowOf(slug);
  const f = feedFacts(slug);
  const view = overlayPlatformWithFacts(row, f);
  return renderToStaticMarkup(
    h(PlatformToolOverview, {
      platform: { ...row, ...view, mobileWebFriendly: true } as Parameters<typeof PlatformToolOverview>[0]["platform"],
      facts: f,
      hasModelFamily: false,
    }),
  );
}

/** Facts this batch added or changed (checkedAt is the batch date). */
function batchFacts(f: ToolFacts): Fact<unknown>[] {
  return (["freeTier", "plans", "apiPricing", "models", "features", "company"] as const)
    .map((k) => f[k] as Fact<unknown> | undefined)
    .filter((x): x is Fact<unknown> => Boolean(x && x.checkedAt === BATCH_DATE));
}

describe("catalog batch 2026-10-26: one source for every surface", () => {
  it("every touched slug has batch facts with an official https source and the batch date", () => {
    for (const slug of TOUCHED) {
      const changed = batchFacts(facts(slug));
      assert.ok(changed.length > 0, slug);
      for (const fact of changed) {
        assert.match(fact.sourceUrl, /^https:\/\//, slug);
        assert.doesNotMatch(fact.sourceUrl, /(twitter|x)\.com\//, slug);
        // Same-day facts gathered by the search-relevance pass wait for a
        // separate second check: unverified, with no verifier recorded.
        if (fact.status === "verified") assert.equal(fact.verifiedAt, BATCH_DATE, slug);
        else assert.deepEqual([fact.status, fact.gatheredBy, fact.verifiedBy, fact.verifiedAt], ["unverified", "claude", undefined, undefined], slug);
      }
      assert.ok(facts(slug).changelog?.some((c) => c.date === BATCH_DATE), `${slug} changelog`);
    }
  });

  it("feed, page HTML and MCP agree on prices, plans, free tier and features", () => {
    for (const slug of TOUCHED) {
      const f = facts(slug);
      const out = feedTool(slug);
      const page = pageHtml(slug);
      const mcp = getPricingFacts({ platform: slug }, FEED_ROWS, feedFacts);

      assert.equal(out.api_pricing, f.apiPricing?.value ?? null, slug);
      assert.equal(mcp.api_pricing?.value ?? null, out.api_pricing, slug);
      if (f.apiPricing) assert.ok(page.includes(html(f.apiPricing.value)), `${slug} page api pricing`);

      assert.deepEqual(out.features, f.features?.value ?? null, slug);
      for (const item of f.features?.value ?? []) assert.ok(page.includes(html(item)), `${slug} page feature`);

      assert.deepEqual(mcp.platform.free_tier, out.free_tier, slug);
      assert.equal(mcp.platform.starting_price, out.starting_price, slug);
      if (f.plans) {
        assert.deepEqual(
          mcp.plans?.value.map((p) => [p.name, p.price]),
          f.plans.value.map((p) => [p.name, p.price]),
          slug,
        );
        assert.deepEqual(
          out.plans.map((p) => p.name),
          f.plans.value.map((p) => p.name),
          slug,
        );
        for (const plan of out.plans) assert.ok(page.includes(html(plan.price_text)), `${slug} page plan ${plan.name}`);
      }
      for (const fact of batchFacts(f)) {
        assert.ok(
          out.sources.some((s) => s.url === fact.sourceUrl && s.checked_at === BATCH_DATE),
          `${slug} cites ${fact.sourceUrl}`,
        );
      }
    }
  });

  it("Markdown and llms-full carry the same API prices and features", () => {
    const catalog = toPublicCatalog(FEED_ROWS, feedFacts, ctx);
    const full = renderLlmsFull({
      generatedAt: ctx.generatedAt,
      catalog,
      compare: [],
      guides: [],
      workflows: [],
      models: [],
      modelCompare: null,
    });
    for (const slug of TOUCHED) {
      const out = feedTool(slug);
      const md = renderToolMarkdown(out);
      for (const item of out.features ?? []) {
        assert.ok(md.includes(item), `${slug} markdown feature`);
        assert.ok(full.includes(item), `${slug} llms-full feature`);
      }
      if (out.api_pricing) assert.ok(full.includes(`API pricing: ${out.api_pricing}`), `${slug} llms-full api`);
    }
  });

  it("Kimi plans are annual-billing prices, read as monthly amounts", () => {
    const out = feedTool("kimi");
    const paid = out.plans.filter((p) => !p.is_free);
    assert.deepEqual(
      paid.map((p) => [p.name, p.amount, p.period]),
      [
        ["Plus", 15, "month"],
        ["Pro", 31, "month"],
        ["Max", 79, "month"],
        ["Ultra", 159, "month"],
      ],
    );
    for (const plan of paid) assert.match(plan.price_text, /billed annually/);
    assert.match(out.api_pricing ?? "", /kimi-k3\.1-pro: \$2 \/ \$10/);
    assert.match(out.api_pricing ?? "", /kimi-k3\.1-pro-highspeed: \$4 \/ \$20/);
    assert.match(out.api_pricing ?? "", /2026-10-31/);
    assert.match(out.api_pricing ?? "", /end of December 2026 \(stated plan, as of 2026-10-26\)/);
  });

  it("OpenAI Decisions API: GA date, GPT-6 Luna, input-only prices, never 'only' Luna", () => {
    const out = feedTool("openai-api");
    assert.match(out.api_pricing ?? "", /\$0\.10 input, \$0\.01 cached input/);
    assert.match(out.api_pricing ?? "", /no output-token charges/);
    const feature = (out.features ?? []).join(" ");
    assert.match(feature, /generally available 2026-10-22, runs on GPT-6 Luna via its own Decisions endpoint/);
    assert.doesNotMatch(JSON.stringify(facts("openai-api")), /\bonly (on|with|runs)|Luna only/i);
    assert.equal(facts("openai-api").apiPricing?.sourceUrl, "https://openai.com/index/decisions-api");
  });

  it("MiniMax weights are open weights under a custom license, never open source", () => {
    const text = JSON.stringify(facts("minimax"));
    assert.doesNotMatch(text, /open[- ]source(?! one)/i);
    assert.match(text, /open weights under the MiniMax Community License/);
  });

  it("the feed changelog dates this batch and mentions the new features field", () => {
    // Two 2026-10-26 entries exist (this batch, then the 1.2 search entry); pick this batch's.
    const entry = FEED_CHANGELOG.find((c) => c.date === BATCH_DATE && /schema_version 1.1/.test(c.summary));
    assert.ok(entry);
    assert.match(entry.summary, /features/);
    assert.match(entry.summary, /Decisions API/);
    assert.doesNotMatch(entry.summary, /once its catalog row/);
  });

  it("excluded watch items and unverifiable claims stay out of the batch files", () => {
    const files = [
      "src/data/facts/kimi.ts",
      "src/data/facts/minimax.ts",
      "src/data/facts/ideogram.ts",
      "src/data/facts/claude.ts",
      "src/data/facts/claude-code.ts",
      "src/data/facts/anthropic-api.ts",
      "src/data/facts/openai-api.ts",
      "src/data/catalog-audits/audit-8.ts",
      "src/data/tutorials/kimi-getting-started.ts",
      "src/lib/public-data/changelog.ts",
    ];
    for (const file of files) {
      const text = readFileSync(join(process.cwd(), file), "utf8");
      for (const banned of [/Nemotron 3\.5/i, /Model Vault/i, /quota reset/i, /\bIPO\b/, /AI (Pro|Ultra)[^.]*Cloud credits/i]) {
        assert.doesNotMatch(text, banned, `${file}: ${banned}`);
      }
    }
  });
});
