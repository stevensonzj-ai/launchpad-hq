import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type { ToolFacts } from "@/data/facts/types";
import type { PlatformTutorialData } from "@/data/tutorials/types";
import type { ComparePage } from "@/data/compare/pages";
import type { WorkflowTemplate, WorkflowTier } from "@/data/workflows/types";
import type { AffiliateEntry } from "@/data/affiliates";
import {
  STALE_DAYS,
  buildContentItems,
  buildContentRows,
  buildPlatformRows,
  buildSummary,
  chicagoTimestamp,
  daysSince,
  dataGaps,
  isContentStale,
  isPlatformStale,
  normalizePath,
  parseAuditFile,
  parseCsv,
  parseIsoDate,
  parseSitemapLocs,
  summarizeFacts,
  disclosureGaps,
  type PlatformRecord,
  type TrackerInput,
} from "./content-tracker";

const NOW = new Date("2026-10-29T17:00:00Z");
const daysAgo = (n: number) => new Date(NOW.getTime() - n * 86_400_000);
const isoDaysAgo = (n: number) => daysAgo(n).toISOString().slice(0, 10);

function platform(over: Partial<PlatformRecord> & { slug: string }): PlatformRecord {
  return {
    name: over.slug.toUpperCase(),
    website: `https://${over.slug}.example`,
    description: "A description.",
    categoryName: "Writing",
    categorySlug: "writing",
    costTier: "FREEMIUM",
    currentPricing: "Free; Pro monthly",
    apiAvailable: false,
    verified: true,
    updatedAt: daysAgo(10),
    approvedPrompts: 0,
    pendingPrompts: 0,
    approvedDiscussions: 0,
    pendingDiscussions: 0,
    ...over,
  };
}

function facts(slug: string, checkedDaysAgo: number, status: "verified" | "unverified" = "verified"): ToolFacts {
  return {
    slug,
    lifecycle: "active",
    verdict: {
      value: "Good.",
      sourceUrl: `https://${slug}.example/about`,
      checkedAt: isoDaysAgo(checkedDaysAgo),
      gatheredBy: "test",
      status,
    },
  };
}

function tutorial(platformSlug: string, reviewedDaysAgo: number): PlatformTutorialData {
  return {
    slug: `${platformSlug}-getting-started`,
    platformSlug,
    title: `${platformSlug} guide`,
    tagline: "",
    archetype: "prompts",
    lastReviewedAt: isoDaysAgo(reviewedDaysAgo),
    accessTier: "FREE",
    howItWorks: "",
    whatItIs: [],
    beforeYouStart: [],
    security: [],
    triad: { bestAt: [], okayAt: [], avoid: [] },
    starterActions: [],
    pitfalls: [],
    whereToNext: [],
  };
}

const tier = (slugs: string[]): WorkflowTier => ({
  id: "budget",
  name: "t",
  tagline: "",
  tools: slugs.map((slug) => ({ name: slug, slug, rationale: "" })),
});

const workflow: WorkflowTemplate = {
  slug: "blog",
  title: "Blog workflow",
  description: "",
  tags: [],
  tiers: { optimal: tier(["alpha"]), hybrid: tier(["alpha", "beta"]), budget: { ...tier([]), steps: [{ order: 1, label: "x", toolSlug: "beta", action: "" }] } },
};

const pages: ComparePage[] = [
  { kind: "head-to-head", slug: "alpha-vs-beta", a: "alpha", b: "beta", title: "Alpha vs Beta", description: "", intro: [], picks: [], hitFirst: [], faq: [] },
  { kind: "free-alternatives", slug: "free-alpha-alternatives", baseline: "alpha", alternatives: [{ slug: "gamma" }], title: "Free Alpha alternatives", description: "", intro: [], picks: [], hitFirst: [], faq: [] },
];

function input(over: Partial<TrackerInput> = {}): TrackerInput {
  return {
    platforms: [
      platform({ slug: "alpha", approvedPrompts: 3, pendingPrompts: 1 }),
      platform({ slug: "beta", updatedAt: daysAgo(200), description: "  " }),
      platform({ slug: "gamma", updatedAt: daysAgo(70), costTier: "PAID" }),
      platform({ slug: "delta", updatedAt: daysAgo(5), categoryName: "Image" }),
    ],
    facts: new Map([
      ["alpha", facts("alpha", 3)],
      ["beta", facts("beta", 150, "unverified")],
      ["gamma", facts("gamma", 70)],
    ]),
    tutorials: [tutorial("alpha", 20), tutorial("ghost", 1)],
    comparePages: pages,
    workflows: [workflow],
    hiddenSlugs: new Set(["delta"]),
    sitemapPaths: new Set(["/platform/alpha", "/platform/beta", "/platform/alpha/guide", "/compare/alpha-vs-beta"]),
    audit: null,
    now: NOW,
    ...over,
  };
}

function run(over: Partial<TrackerInput> = {}) {
  const i = input(over);
  const items = buildContentItems(i);
  const platforms = buildPlatformRows(i, items);
  const content = buildContentRows(i, items);
  return { items, platforms, content, summary: buildSummary(platforms, content, NOW, i.affiliates) };
}

const bySlug = (rows: ReturnType<typeof run>["platforms"], slug: string) => {
  const r = rows.find((p) => p.slug === slug);
  assert.ok(r, slug);
  return r;
};

describe("stale rules", () => {
  it("platform is stale over the threshold, with no date, or with no sources", () => {
    assert.equal(isPlatformStale(STALE_DAYS, true), false);
    assert.equal(isPlatformStale(STALE_DAYS + 1, true), true);
    assert.equal(isPlatformStale(null, true), true);
    assert.equal(isPlatformStale(1, false), true);
  });

  it("content is stale only over the threshold; undated is unknown", () => {
    assert.equal(isContentStale(STALE_DAYS), false);
    assert.equal(isContentStale(STALE_DAYS + 1), true);
    assert.equal(isContentStale(null), null);
  });

  it("daysSince floors and never goes negative", () => {
    assert.equal(daysSince(new Date(NOW.getTime() - 1.9 * 86_400_000), NOW), 1);
    assert.equal(daysSince(new Date(NOW.getTime() + 86_400_000), NOW), 0);
    assert.equal(daysSince(null, NOW), null);
  });
});

describe("helpers", () => {
  it("parseIsoDate reads YYYY-MM-DD as UTC midnight and rejects junk", () => {
    assert.equal(parseIsoDate("2026-10-24")?.toISOString(), "2026-10-24T00:00:00.000Z");
    assert.equal(parseIsoDate("soon"), null);
    assert.equal(parseIsoDate(undefined), null);
  });

  it("normalizePath strips origin, query and trailing slash", () => {
    assert.equal(normalizePath("https://launchpadhq.io/Platform/Alpha/?x=1"), "/platform/alpha");
    assert.equal(normalizePath("platform/alpha"), "/platform/alpha");
    assert.equal(normalizePath("https://launchpadhq.io/"), "/");
  });

  it("parseSitemapLocs reads loc entries", () => {
    const xml = "<urlset><url><loc> https://launchpadhq.io/a </loc></url><url><loc>https://launchpadhq.io/b?x=1&amp;y=2</loc></url></urlset>";
    assert.deepEqual(parseSitemapLocs(xml), ["https://launchpadhq.io/a", "https://launchpadhq.io/b?x=1&y=2"]);
  });

  it("chicagoTimestamp renders Chicago local time with zone", () => {
    assert.equal(chicagoTimestamp(NOW), "2026-10-29 12:00 CDT");
    assert.equal(chicagoTimestamp(new Date("2026-12-01T18:30:00Z")), "2026-12-01 12:30 CST");
  });

  it("summarizeFacts counts sources and statuses and dates verification", () => {
    const s = summarizeFacts(facts("x", 4));
    assert.equal(s.sourceCount, 1);
    assert.equal(s.lastVerified?.toISOString().slice(0, 10), isoDaysAgo(4));
    const u = summarizeFacts(facts("x", 4, "unverified"));
    assert.equal(u.unverified, 1);
    assert.equal(u.lastVerified, null);
    assert.equal(summarizeFacts(undefined).sourceCount, 0);
  });
});

describe("platform rows", () => {
  const { platforms } = run();

  it("counts content per platform from the registries", () => {
    const a = bySlug(platforms, "alpha").row;
    assert.equal(a.tutorials, 1);
    assert.equal(a.guides, 1);
    assert.equal(a.comparisons, 1);
    assert.equal(a.alternatives, 1);
    assert.equal(a.prompts, 3);
    const g = bySlug(platforms, "gamma").row;
    assert.equal(g.alternatives, 1);
    assert.equal(g.comparisons, 0);
  });

  it("uses the newest of updatedAt, tutorial review and fact check", () => {
    const a = bySlug(platforms, "alpha");
    assert.equal(a.days, 3);
    assert.equal(a.stale, false);
    assert.equal(a.row.stale, "N");
  });

  it("flags stale by age and by missing sources", () => {
    assert.equal(bySlug(platforms, "beta").stale, true); // 150 days
    assert.equal(bySlug(platforms, "gamma").stale, false); // 70 days, sourced
    const d = bySlug(platforms, "delta");
    assert.equal(d.days, 5);
    assert.equal(d.stale, true); // no fact file → no sources
    assert.equal(d.row.sourcesPresent, "N");
  });

  it("never invents unknown columns", () => {
    for (const p of platforms) {
      // No fixture slug is in the real affiliate registry: N, not blank.
      assert.equal(p.row.affiliate, "N");
      assert.equal(p.row.sponsor, "N");
      assert.equal(p.row.hasMcp, null);
      assert.equal(p.row.pageViews, null);
    }
  });

  it("derives free plan, description and notes", () => {
    assert.equal(bySlug(platforms, "gamma").row.freePlan, "N");
    const b = bySlug(platforms, "beta").row;
    assert.equal(b.descriptionPresent, "N");
    assert.equal(b.descriptionLength, 0);
    assert.match(String(b.notes), /empty description/);
    assert.match(String(b.notes), /1 unverified fact\b/);
    assert.match(String(bySlug(platforms, "delta").row.notes), /hidden; no fact file/);
    assert.match(String(bySlug(platforms, "alpha").row.notes), /1 pending prompt\b/);
    assert.match(String(bySlug(platforms, "gamma").row.notes), /not in sitemap/);
    // Hidden platforms are expected to be absent from the sitemap.
    assert.doesNotMatch(String(bySlug(platforms, "delta").row.notes), /not in sitemap/);
  });

  it("leaves sitemap column blank when the sitemap was not fetched", () => {
    const { platforms: rows } = run({ sitemapPaths: null });
    assert.equal(bySlug(rows, "alpha").row.liveInSitemap, null);
  });
});

describe("content rows", () => {
  it("builds one row per tutorial, workflow and compare page", () => {
    const { content } = run();
    assert.deepEqual(
      content.map((c) => [c.row.type, c.row.url]),
      [
        ["tutorial", "https://launchpadhq.io/platform/alpha/guide"],
        ["tutorial", "https://launchpadhq.io/platform/ghost/guide"],
        ["workflow", "https://launchpadhq.io/workflows/blog"],
        ["comparison", "https://launchpadhq.io/compare/alpha-vs-beta"],
        ["alternatives", "https://launchpadhq.io/alternatives/free-alpha-alternatives"],
      ],
    );
    assert.equal(content[2].row.platforms, "alpha, beta");
    assert.equal(content[4].row.platforms, "alpha, gamma");
  });

  it("marks live from the sitemap and drafts tutorials without a platform row", () => {
    const { content } = run();
    assert.deepEqual(content.map((c) => c.row.status), ["live", "draft", "draft", "live", "draft"]);
    const { content: noMap } = run({ sitemapPaths: null });
    assert.deepEqual(noMap.map((c) => c.row.status), [null, "draft", null, null, null]);
  });

  it("dates only tutorials and leaves undated stale blank", () => {
    const { content } = run();
    assert.equal(content[0].row.daysSinceUpdate, 20);
    assert.equal(content[0].row.stale, "N");
    assert.equal(content[2].row.daysSinceUpdate, null);
    assert.equal(content[2].row.stale, null);
    assert.equal(content[0].row.published, null);
    assert.equal(content[0].row.disclosure, null);
  });

  it("fills audit results by path, URL or slug", () => {
    const audit = parseAuditFile(
      JSON.stringify([
        { url: "https://launchpadhq.io/platform/alpha/guide/", result: "pass" },
        { slug: "alpha-vs-beta", status: "fail: stale price" },
        { slug: "blog", result: { score: 3 } },
      ]),
      "json",
    );
    const { content } = run({ audit });
    assert.equal(content[0].row.auditResult, "pass");
    assert.equal(content[3].row.auditResult, "fail: stale price");
    assert.equal(content[2].row.auditResult, '{"score":3}');
    assert.equal(content[1].row.auditResult, null);
  });
});

describe("audit file parsing", () => {
  it("accepts a JSON object map", () => {
    const m = parseAuditFile(JSON.stringify({ "Alpha-Getting-Started": "pass", "/compare/x": { verdict: "ok" } }), "json");
    assert.equal(m.get("alpha-getting-started"), "pass");
    assert.equal(m.get("/compare/x"), "ok");
  });

  it("accepts CSV with quoted fields", () => {
    const csv = 'Slug,Result\r\nalpha-getting-started,"pass, minor ""nits"""\n/compare/x,fail\n';
    assert.deepEqual(parseCsv(csv)[1], ["alpha-getting-started", 'pass, minor "nits"']);
    const m = parseAuditFile(csv, "csv");
    assert.equal(m.get("alpha-getting-started"), 'pass, minor "nits"');
    assert.equal(m.get("/compare/x"), "fail");
  });

  it("rejects CSV without key/result columns", () => {
    assert.throws(() => parseAuditFile("a,b\n1,2\n", "csv"), /key column/);
  });
});

describe("summary", () => {
  const { summary } = run();

  it("computes headline numbers", () => {
    assert.equal(summary.platformCount, 4);
    assert.equal(summary.hiddenPlatformCount, 1);
    assert.equal(summary.contentCount, 5);
    assert.equal(summary.stalePlatforms, 2);
    assert.equal(summary.stalePlatformPct, 50);
    assert.equal(summary.datedContent, 2);
    assert.equal(summary.staleContent, 0);
    assert.equal(summary.staleContentPct, 0);
    assert.equal(summary.undatedContent, 3);
  });

  it("orders most-stale first and lists gaps", () => {
    assert.deepEqual(summary.topStale.map((t) => t.slug), ["beta", "delta"]);
    assert.deepEqual(summary.noContentPlatforms.map((p) => p.slug), ["delta"]);
    assert.deepEqual(summary.emptyDescriptions.map((p) => p.slug), ["beta"]);
    assert.deepEqual(summary.platformsByCategory[0], ["Writing", 3, 1]);
  });

  it("reports blank columns and missing inputs as data gaps", () => {
    const gaps = dataGaps({ auditProvided: false, sitemapError: "HTTP 503", sitemapSkipped: false }).map((g) => g.item);
    assert.equal(gaps.includes("Platforms: Affiliate"), false);
    assert.equal(gaps.includes("Content: Disclosure present"), false);
    for (const col of ["Platforms: Has MCP", "Platforms: Page views", "Content: Published", "Content: Audit result"]) {
      assert.ok(gaps.includes(col), col);
    }
    assert.ok(gaps.includes("Status / In sitemap"));
  });
});

describe("affiliate, free access and disclosure columns", () => {
  const entry = (slug: string, granted: boolean, disclosure: AffiliateEntry["disclosure"]): AffiliateEntry => ({
    slug,
    href: `https://${slug}.example/?via=test`,
    freeAccess: { granted, source: "test" },
    disclosure,
  });
  const affiliates = {
    beta: entry("beta", false, ["affiliate"]),
    gamma: entry("gamma", true, ["affiliate"]), // free access given but not disclosed
  };
  const disclosedPages: ComparePage[] = [
    { ...pages[0], disclosure: [{ slug: "beta", kinds: ["affiliate"] }] } as ComparePage,
    pages[1],
  ];

  it("fills Affiliate and Sponsor / free access from the registry", () => {
    const { platforms } = run({ affiliates });
    assert.equal(bySlug(platforms, "alpha").row.affiliate, "N");
    assert.equal(bySlug(platforms, "beta").row.affiliate, "Y");
    assert.equal(bySlug(platforms, "beta").row.sponsor, "N");
    assert.equal(bySlug(platforms, "gamma").row.sponsor, "Y");
  });

  it("flags an affiliate link with no disclosure on the platform and on pages that render it", () => {
    const { platforms, content, summary } = run({ affiliates });
    // gamma's own entry lacks free-access; the alternatives page renders gamma without a marker;
    // the head-to-head and the workflow render beta without a marker.
    assert.deepEqual(
      summary.disclosureGaps.map((g) => `${g.where} ${g.slug} ${g.missing.join("+")}`).sort(),
      [
        "/alternatives/free-alpha-alternatives gamma affiliate+free-access",
        "/compare/alpha-vs-beta beta affiliate",
        "/platform/gamma gamma free-access",
        "/workflows/blog beta affiliate",
      ],
    );
    assert.match(String(bySlug(platforms, "beta").row.notes), /affiliate link but no disclosure: \/workflows\/blog, \/compare\/alpha-vs-beta/);
    const disclosure = (path: string) => content.find((c) => c.item.path === path)!.row.disclosure;
    assert.equal(disclosure("/compare/alpha-vs-beta"), "N");
    assert.equal(disclosure("/platform/alpha/guide"), null); // renders no affiliate platform
  });

  it("is clean once every page carries the marker", () => {
    const fixed = { beta: affiliates.beta, gamma: entry("gamma", true, ["affiliate", "free-access"]) };
    const i = input({ affiliates: fixed, comparePages: disclosedPages, workflows: [] });
    const items = buildContentItems(i);
    const remaining = disclosureGaps(fixed, items).map((g) => g.where);
    assert.deepEqual(remaining, ["/alternatives/free-alpha-alternatives"]);
    const content = buildContentRows(i, items);
    assert.equal(content.find((c) => c.item.path === "/compare/alpha-vs-beta")!.row.disclosure, "Y");
  });
});
