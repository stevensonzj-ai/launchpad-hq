import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { describe, it } from "node:test";
import { listRegisteredToolFacts, overlayPlatformWithFacts } from "@/data/facts";
import { FACT_VALUE_KEYS } from "@/data/facts/types";
import { isPublishedVerified } from "@/data/facts/walk";
import { PLATFORM_REDIRECTS } from "@/lib/catalog-redirects";
import { hiddenPlatformSlugs } from "@/lib/catalog-visibility";
import { compare, getPricingFacts, type CatalogRow } from "@/lib/mcp/tools";
import {
  applyUsageLimitsToFreePlan,
  collectDisplaySources,
  freeTierSummary,
  plansFromFactsOrProse,
  startingPriceLabel,
} from "@/lib/platform-display";
import { FEED_ROWS, GENERATED_AT, HIDDEN_NAME, feedContext, feedFacts } from "./fixtures";
import { tablePriceText } from "./pricing";
import { PublicCatalog, PublicIndex, PublicTool } from "./schema";
import { listedRelatedRows, resolveToolFile, toPublicCatalog, toPublicIndex, toPublicTool } from "./serialize";

const ctx = feedContext();
const tool = (slug: string) => {
  const row = FEED_ROWS.find((r) => r.slug === slug);
  assert.ok(row, slug);
  return toPublicTool(row, feedFacts(slug), ctx);
};
const catalog = () => toPublicCatalog(FEED_ROWS, feedFacts, ctx);

describe("parity with the platform page", () => {
  it("matches the page view-model for every fixture row and every registered fact file", () => {
    assert.ok(FEED_ROWS.length > listRegisteredToolFacts().length);
    for (const row of FEED_ROWS) {
      const facts = feedFacts(row.slug);
      const out = toPublicTool(row, facts, ctx);
      PublicTool.parse(out);
      // Same derivation as PlatformToolOverview.
      const view = overlayPlatformWithFacts(row, facts);
      const plans = applyUsageLimitsToFreePlan(
        plansFromFactsOrProse(facts, view.currentPricing, row.costTier),
        view.usageLimits,
      );
      const { sources, notes } = collectDisplaySources(facts, [
        view.description,
        view.currentPricing,
        view.freeTierFeatures,
        view.usageLimits,
        row.primaryUse,
      ]);
      assert.equal(out.name, view.name, row.slug);
      assert.equal(out.company, view.company, row.slug);
      assert.equal(out.website, view.website, row.slug);
      assert.equal(out.lifecycle, facts?.lifecycle ?? "active", row.slug);
      assert.deepEqual(out.sources.map((s) => [s.url, s.checked_at]), sources.map((s) => [s.url, s.checkedAt ?? null]));
      assert.deepEqual(out.notes, notes);
      if (facts?.lifecycle === "discontinued") {
        assert.deepEqual(out.plans, [], row.slug);
        assert.equal(out.starting_price, null, row.slug);
        assert.equal(out.free_tier.available, false, row.slug);
        continue;
      }
      assert.deepEqual(
        out.plans.map((p) => [p.name, p.price_text, p.limits]),
        plans.map((p) => [p.name, tablePriceText(p), p.limits.trim() || null]),
        row.slug,
      );
      assert.equal(out.starting_price, startingPriceLabel(plans), row.slug);
      assert.equal(out.free_tier.summary ?? "Not listed", freeTierSummary(facts, view.freeTierFeatures), row.slug);
      const shown = facts
        ? FACT_VALUE_KEYS.map((k) => facts[k]).filter(
            (f) => f && (f !== facts.usageLimits || isPublishedVerified(f)),
          )
        : [];
      if (shown.length) {
        assert.equal(out.data_as_of, shown.map((f) => f!.checkedAt).sort().at(-1), row.slug);
      }
    }
  });

  it("gives MCP the same values for the keys they share", () => {
    for (const row of FEED_ROWS) {
      const out = toPublicTool(row, feedFacts(row.slug), ctx);
      const mcp = getPricingFacts({ platform: row.slug }, FEED_ROWS, feedFacts);
      const ref = mcp.platform;
      assert.deepEqual(
        [ref.name, ref.website, ref.company, ref.description, ref.starting_price, ref.free_tier],
        [out.name, out.website, out.company, out.description, out.starting_price, out.free_tier],
        row.slug,
      );
      assert.equal(mcp.lifecycle, out.lifecycle, row.slug);
      if (out.lifecycle !== "discontinued") {
        assert.deepEqual(mcp.usage_limits?.value ?? null, out.usage_limits, row.slug);
        assert.equal(mcp.api_pricing?.value ?? null, out.api_pricing, row.slug);
      }
    }
    const cmp = compare({ platforms: ["chatgpt", "pricey"] }, FEED_ROWS, feedFacts);
    for (const item of cmp.items) {
      const out = tool(item.slug);
      assert.equal(item.starting_price, out.starting_price);
      assert.deepEqual(item.free_tier, out.free_tier);
    }
  });

  it("strips citations, keeps unknown languages null and reports catalog dates honestly", () => {
    const out = tool("pricey");
    assert.equal(out.description, "Image API");
    assert.equal(out.technical.integrations, "Zapier, Slack");
    assert.equal(out.technical.languages, null);
    assert.notEqual(out.starting_price, "Free");
    assert.equal(out.lowest_paid?.amount, 0.01);
    assert.equal(out.lowest_paid?.period, "usage");
    assert.equal(out.verification.status, "catalog_only");
    assert.equal(out.data_as_of, "2026-09-30");
    assert.equal(out.record_updated_at, "2026-10-05");
    assert.equal(out.generated_at, GENERATED_AT);
    assert.equal(tool("freenote").data_as_of, null);
  });

  it("links the guide only where one exists", () => {
    assert.equal(tool("chatgpt").guide_url, "https://www.launchpadhq.io/platform/chatgpt/guide");
    assert.equal(tool("notey").guide_url, null);
  });
});

describe("visibility", () => {
  it("keeps hidden and duplicate slugs out of the catalog", () => {
    const slugs = new Set(catalog().tools.map((t) => t.slug));
    for (const hidden of hiddenPlatformSlugs()) assert.equal(slugs.has(hidden), false, hidden);
    assert.ok(slugs.has("deadnote"), "discontinued tools stay listed");
    assert.deepEqual(catalog().aliases, PLATFORM_REDIRECTS);
  });

  it("drops hidden, discontinued, unknown and self from alternatives", () => {
    const out = tool("pricey");
    assert.deepEqual(out.alternatives, [
      { slug: "notey", name: "Notey" },
      { slug: "freenote", name: "Freenote" },
    ]);
    assert.ok(!JSON.stringify(out.alternatives).includes(HIDDEN_NAME));
    assert.deepEqual(out.works_well_with, [{ slug: "pixelpaint", name: "PixelPaint" }]);
    const dead = tool("deadnote");
    assert.equal(dead.lifecycle, "discontinued");
    for (const t of catalog().tools) {
      for (const alt of t.alternatives) {
        assert.ok(!hiddenPlatformSlugs().includes(alt.slug), `${t.slug} -> ${alt.slug}`);
        assert.notEqual(alt.slug, "deadnote");
      }
    }
  });

  it("page Alternatives / Works Well With cards match the feed", () => {
    // Emulates the page query: case-insensitive name match plus listedPlatformWhere().
    const hidden = new Set(hiddenPlatformSlugs());
    const pageCards = (names: string[], self: string) => {
      const wanted = new Set(names.map((n) => n.toLowerCase()));
      const rows = FEED_ROWS.filter((r) => wanted.has(r.name.toLowerCase()) && !hidden.has(r.slug));
      return listedRelatedRows(rows, self, feedFacts).map((r) => r.slug).sort();
    };
    const slugs = (refs: { slug: string }[]) => refs.map((r) => r.slug).sort();
    assert.deepEqual(pageCards(FEED_ROWS.find((r) => r.slug === "pricey")!.directAlternatives, "pricey"), [
      "freenote",
      "notey",
    ]);
    for (const row of FEED_ROWS) {
      const t = tool(row.slug);
      assert.deepEqual(pageCards(row.directAlternatives, row.slug), slugs(t.alternatives), row.slug);
      assert.deepEqual(pageCards(row.complementaryTools, row.slug), slugs(t.works_well_with), row.slug);
    }
  });

  it("resolves tool files: .json required, hidden 404, aliases redirect", () => {
    assert.equal(resolveToolFile("notey.json", FEED_ROWS).kind, "tool");
    assert.equal(resolveToolFile("notey", FEED_ROWS).kind, "not_found");
    assert.equal(resolveToolFile("nope.json", FEED_ROWS).kind, "not_found");
    assert.equal(resolveToolFile("relay-app.json", FEED_ROWS).kind, "not_found");
    assert.equal(resolveToolFile("kakao-brain-karlo.json", FEED_ROWS).kind, "not_found");
    assert.deepEqual(resolveToolFile("canva-magic-studio.json", FEED_ROWS), {
      kind: "redirect",
      slug: "canva-ai-magic-studio",
    });
  });
});

const DENY = new Set([
  "id", "email", "clerkId", "userId", "gatheredBy", "verifiedBy", "featured", "verified", "accessTier",
  "honestTake", "logoUrl", "qualityRestrictions", "installationType", "privacyAlternativeTo",
  "budgetAlternativeTo", "categoryId", "createdAt",
]);

function deniedKeys(value: unknown, path = "$"): string[] {
  if (Array.isArray(value)) return value.flatMap((v, i) => deniedKeys(v, `${path}[${i}]`));
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, v]) => {
    // `sponsored: false` is the one required sponsor* key.
    const bad = DENY.has(key) || /^stripe/i.test(key) || (/^sponsor/i.test(key) && key !== "sponsored");
    return [...(bad ? [`${path}.${key}`] : []), ...deniedKeys(v, `${path}.${key}`)];
  });
}

describe("denylist", () => {
  it("never emits private or internal keys, or the contact email", () => {
    const cat = catalog();
    PublicCatalog.parse(cat);
    const index = toPublicIndex(cat);
    PublicIndex.parse(index);
    assert.deepEqual(deniedKeys(cat), []);
    assert.deepEqual(deniedKeys(index), []);
    for (const t of cat.tools) assert.equal(t.sponsored, false);
    // Any address at all (x@y.tld), not just the ones we know about.
    assert.doesNotMatch(JSON.stringify([cat, index]), /[\w.+-]+@[\w-]+(?:\.[\w-]+)*\.[a-z]{2,}/i);
  });
});

describe("sponsor isolation", () => {
  it("ignores sponsor fields on rows", () => {
    const tainted = FEED_ROWS.map(
      (r) => ({ ...r, sponsored: true, featured: true, placement: "discover" }) as unknown as CatalogRow,
    );
    assert.equal(
      JSON.stringify(toPublicCatalog(tainted, feedFacts, ctx)),
      JSON.stringify(catalog()),
    );
  });

  it("no feed module imports sponsor data, directly or transitively", () => {
    const roots = [...walk("src/lib/public-data"), ...walk("src/app/data")].filter(
      (f) => /\.tsx?$/.test(f) && !f.endsWith(".test.ts"),
    );
    assert.ok(roots.length >= 8, "found feed source files");
    const seen = new Set<string>();
    const queue = [...roots];
    while (queue.length) {
      const file = queue.pop()!;
      if (seen.has(file)) continue;
      seen.add(file);
      for (const spec of imports(readFileSync(file, "utf8"))) {
        assert.ok(!/sponsor/i.test(spec), `${file} imports ${spec}`);
        const next = resolveImport(file, spec);
        if (next) queue.push(next);
      }
    }
  });
});

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function imports(src: string): string[] {
  return [...src.matchAll(/(?:from|import)\s*\(?\s*["']([^"']+)["']/g)].map((m) => m[1]);
}

function resolveImport(from: string, spec: string): string | null {
  const base = spec.startsWith("@/") ? join("src", spec.slice(2)) : spec.startsWith(".") ? resolve(dirname(from), spec) : null;
  if (!base) return null; // packages
  for (const candidate of [`${base}.ts`, `${base}.tsx`, join(base, "index.ts")]) {
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

describe("cost tier of discontinued tools", () => {
  it("feed, summary and MCP say DISCONTINUED, never the stored FREEMIUM", async () => {
    const { toPlatformRef } = await import("@/lib/mcp/tools");
    const { citedToolSummary, publicCostTier, toPublicToolSummary } = await import("./serialize");
    const row = FEED_ROWS.find((r) => r.slug === "play-ht");
    assert.ok(row);
    assert.equal(row.costTier, "FREEMIUM");
    const out = tool("play-ht");
    assert.equal(out.cost_tier, "DISCONTINUED");
    assert.equal(toPublicToolSummary(out).cost_tier, "DISCONTINUED");
    assert.equal(toPlatformRef(row, feedFacts("play-ht")).cost_tier, "DISCONTINUED");
    // Content records never cite it at all.
    assert.equal(citedToolSummary("play-ht", { rows: FEED_ROWS, facts: feedFacts, ctx }), null);
    // Live tools keep their stored tier.
    assert.equal(publicCostTier("FREEMIUM", feedFacts("chatgpt")), "FREEMIUM");
    assert.equal(tool("chatgpt").cost_tier, FEED_ROWS.find((r) => r.slug === "chatgpt")!.costTier);
  });
});
