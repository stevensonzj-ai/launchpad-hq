import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { COMPARE_PAGES, findFreeAlternatives, findHeadToHead } from "@/data/compare/pages";
import { comparePageLoadSlugs } from "@/data/compare/view";
import { listModelFamilies } from "@/data/models";
import { getStaticTutorialForPlatform, listRegisteredTutorials } from "@/data/tutorials";
import { WORKFLOWS } from "@/data/workflows";
import { RETIRED_GUIDE_SLUGS } from "@/lib/catalog-redirects";
import { row } from "@/lib/mcp/fixtures";
import type { CatalogRow } from "@/lib/mcp/tools";
import { toPublicComparePage } from "@/lib/public-data/compare";
import { feedGuides, toPublicGuide } from "@/lib/public-data/content";
import { FEED_ROWS, GENERATED_AT, feedFacts } from "@/lib/public-data/fixtures";
import { buildFeedContext, toPublicCatalog, toPublicTool, type FeedTools } from "@/lib/public-data/serialize";
import { CONTACT_EMAIL } from "@/lib/site-copy";
import { markdownForPath } from "./pages";
import {
  renderAboutMarkdown,
  renderComparePageMarkdown,
  renderContactMarkdown,
  renderDevelopersMarkdown,
  renderDiscoverMarkdown,
  renderGuideMarkdown,
  renderHomeMarkdown,
  renderNotFoundMarkdown,
  renderToolMarkdown,
} from "./render";

/** Feed fixture rows plus a synthetic row for every slug the content cites (as content.test.ts does). */
function contentRows(): CatalogRow[] {
  const have = new Set(FEED_ROWS.map((r) => r.slug));
  const cited = new Set<string>([
    ...COMPARE_PAGES.flatMap(comparePageLoadSlugs),
    ...listRegisteredTutorials().map((t) => t.platformSlug),
    ...WORKFLOWS.flatMap((w) => Object.values(w.tiers).flatMap((tier) => tier.tools.flatMap((t) => (t.slug ? [t.slug] : [])))),
    ...listModelFamilies().flatMap((f) => f.platformSlugs),
  ]);
  const extra = [...cited]
    .filter((slug) => !have.has(slug))
    .sort()
    .map((slug) =>
      row({
        slug,
        name: slug.replace(/-/g, " "),
        costTier: "FREEMIUM",
        currentPricing: "Free; Pro $12/mo (official, as of 2026-10-25)",
        freeTierFeatures: "Free plan with daily limits (official, as of 2026-10-25)",
        category: { slug: "chat-assistants", name: "Chat assistants" },
      }),
    );
  return [...FEED_ROWS, ...extra];
}

const ROWS = contentRows();
const ctx = buildFeedContext(ROWS, feedFacts, {
  generatedAt: GENERATED_AT,
  hasGuide: (slug) => Boolean(getStaticTutorialForPlatform(slug)) && !RETIRED_GUIDE_SLUGS.includes(slug),
});
const tools: FeedTools = { rows: ROWS, facts: feedFacts, ctx };
const catalog = toPublicCatalog(ROWS, feedFacts, ctx);
const toolRecord = (slug: string) => toPublicTool(ROWS.find((r) => r.slug === slug)!, feedFacts(slug), ctx);
/** What loadFeed() returns, built from fixtures. */
const fakeLoad = async () => ({ rows: ROWS, ctx, tools, catalog: () => catalog }) as Awaited<ReturnType<typeof import("@/lib/public-data/load").loadFeed>>;

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

function assertWellFormed(md: string) {
  assert.match(md, /^# \S/, "starts with an H1");
  assert.ok(md.endsWith("\n") && !md.endsWith("\n\n"), "ends with exactly one newline");
  assert.doesNotMatch(md, /\n{3,}/, "no blank-line runs");
  assert.doesNotMatch(md, /undefined|\[object Object\]|NaN/);
  // No address-like content anywhere.
  assert.doesNotMatch(md, /PostalAddress|streetAddress|postalCode|addressLocality/);
}

describe("markdown renderers", () => {
  it("home: copy, counts, categories and the agent links", () => {
    const md = renderHomeMarkdown({
      toolCount: catalog.count,
      categories: catalog.categories,
      guideCount: 3,
      workflowCount: WORKFLOWS.length,
      comparePageCount: 2,
      featuredWorkflows: [{ title: "Blog post", url: "https://www.launchpadhq.io/workflows/blog-post-generator", description: "Write one." }],
    });
    assertWellFormed(md);
    assert.match(md, new RegExp(`${catalog.count} tools across ${catalog.categories.length} categories`));
    assert.match(md, /## What Launchpad HQ is/);
    assert.match(md, /## How tools are checked/);
    assert.match(md, /\[Developer docs\]\(https:\/\/www\.launchpadhq\.io\/developers\)/);
    assert.match(md, /\/data\/v1\/index\.json/);
    for (const c of catalog.categories) assert.ok(md.includes(`/discover?category=${c.slug})`), c.slug);
    assert.doesNotMatch(md, EMAIL_RE);
  });

  it("platform: prices are exactly the feed record's", () => {
    const tool = toolRecord("notey");
    const md = renderToolMarkdown(tool);
    assertWellFormed(md);
    assert.ok(md.startsWith(`# ${tool.name}\n`));
    assert.ok(md.includes(`Canonical: ${tool.url}`));
    assert.ok(md.includes(`JSON: https://www.launchpadhq.io/data/v1/tools/${tool.slug}.json`));
    for (const plan of tool.plans) assert.ok(md.includes(plan.price_text.replace(/\|/g, "\\|")), plan.name);
    if (tool.starting_price) assert.ok(md.includes(tool.starting_price));
    assert.match(md, /## Pricing/);
    assert.match(md, /## Sources/);
    assert.match(md, /Sponsorship never changes this data/);
  });

  it("compare: every tool section and FAQ, with feed prices", () => {
    const pair = findHeadToHead(COMPARE_PAGES.find((p) => p.kind === "head-to-head")!.slug)!;
    const page = toPublicComparePage(pair, tools)!;
    assert.ok(page, "fixture builds the page");
    const md = renderComparePageMarkdown(page);
    assertWellFormed(md);
    assert.ok(md.startsWith(`# ${page.title}\n`));
    for (const entry of page.tools) {
      assert.ok(md.includes(`## ${entry.tool.name} (${entry.role})`), entry.tool.slug);
      if (entry.tool.starting_price) assert.ok(md.includes(entry.tool.starting_price));
    }
    for (const item of page.faq) assert.ok(md.includes(`### ${item.question}`));
    const alternatives = toPublicComparePage(findFreeAlternatives(COMPARE_PAGES.find((p) => p.kind === "free-alternatives")!.slug)!, tools)!;
    assertWellFormed(renderComparePageMarkdown(alternatives));
  });

  it("guide: prompts are fenced so Markdown in them stays literal", () => {
    const tutorial = feedGuides(tools).find((t) => t.platformSlug === "chatgpt")!;
    const guide = toPublicGuide(tutorial, tools)!;
    const md = renderGuideMarkdown(guide);
    assertWellFormed(md);
    const prompts = guide.starter_actions.flatMap((a) => (a.prompt ? [a.prompt] : []));
    assert.ok(prompts.length > 0);
    for (const prompt of prompts) assert.ok(md.includes(`\n${prompt}\n`), "prompt kept verbatim");
    assert.match(md, /```text\n/);
  });

  it("discover: groups by category and filters by ?category", () => {
    const all = renderDiscoverMarkdown(catalog);
    assertWellFormed(all);
    for (const tool of catalog.tools) assert.ok(all.includes(`[${tool.name}](${tool.url})`), tool.slug);
    const first = catalog.categories[0];
    const one = renderDiscoverMarkdown(catalog, first.slug);
    assert.ok(one.startsWith(`# ${first.name} AI tools\n`));
    assert.match(renderDiscoverMarkdown(catalog, "no-such-category"), /No category "no-such-category"; showing every tool/);
  });

  it("about, contact and developers have real content; only contact and about may carry the email", () => {
    const about = renderAboutMarkdown();
    const contact = renderContactMarkdown();
    const developers = renderDevelopersMarkdown();
    for (const md of [about, contact, developers]) {
      assertWellFormed(md);
      assert.ok(md.length > 1500);
    }
    assert.ok(contact.includes(CONTACT_EMAIL));
    for (const md of [about, developers]) {
      for (const match of md.match(new RegExp(EMAIL_RE, "gi")) ?? []) assert.equal(match, CONTACT_EMAIL);
    }
    assert.doesNotMatch(developers, EMAIL_RE);
    assert.match(developers, /operationId|OpenAPI/);
    assert.match(developers, /Accept: text\/markdown/);
    assert.match(developers, /DISCONTINUED/);
  });

  it("404 links llms.txt, the sitemap and search", () => {
    const md = renderNotFoundMarkdown("/__probe");
    assertWellFormed(md);
    assert.ok(md.length >= 20);
    assert.match(md, /https:\/\/www\.launchpadhq\.io\/llms\.txt/);
    assert.match(md, /https:\/\/www\.launchpadhq\.io\/sitemap\.xml/);
    assert.match(md, /\/discover/);
  });
});

describe("markdownForPath", () => {
  const go = (path: string, search = "") =>
    markdownForPath(path.split("/").filter(Boolean), new URLSearchParams(search), fakeLoad);

  it("serves the pages the proxy rewrites, from fixture data", async () => {
    for (const path of ["/", "/discover", "/platform/notey", "/platform/chatgpt/guide", "/tutorials", "/compare", "/workflows", "/workflows/blog-post-generator", "/models", "/about", "/contact", "/developers"]) {
      const res = await go(path);
      assert.equal(res.status, 200, path);
      if (res.status === 200) {
        assertWellFormed(res.body);
        assert.equal(res.canonical, `https://www.launchpadhq.io${path === "/" ? "" : path}`);
      }
    }
    const pair = COMPARE_PAGES.find((p) => p.kind === "head-to-head")!;
    assert.equal((await go(`/compare/${pair.slug}`)).status, 200);
    const alt = COMPARE_PAGES.find((p) => p.kind === "free-alternatives")!;
    assert.equal((await go(`/alternatives/${alt.slug}`)).status, 200);
    // A free-alternatives slug is not a head-to-head page.
    assert.equal((await go(`/compare/${alt.slug}`)).status, 404);
  });

  it("404s what the feed 404s, in Markdown", async () => {
    for (const path of ["/platform/nope", "/platform/relay-app", "/workflows/nope", "/models/nope", "/compare/a-vs-b", "/__ora-404-probe", "/models/compare/nope"]) {
      const res = await go(path);
      assert.equal(res.status, 404, path);
      if (res.status === 404) assert.match(res.body, /llms\.txt/);
    }
  });

  it("redirects retired slugs to the current HTML URL", async () => {
    const res = await go("/platform/mistral-ai-le-chat");
    assert.deepEqual(res, { status: 301, location: "https://www.launchpadhq.io/platform/mistral-vibe" });
  });
});
