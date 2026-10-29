import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getToolFacts, overlayPlatformWithFacts } from "@/data/facts";
import type { ToolFacts } from "@/data/facts/types";
import { AUDIT_5_PATCHES } from "@/data/catalog-audits/audit-5";
import { stripInlineCitations } from "@/lib/platform-display";
import { SITE_URL } from "@/lib/site";
import {
  COMPARE_HUB,
  COMPARE_HUB_PATH,
  COMPARE_PAGES,
  FREE_OPTION_LABEL,
  comparePageCopyStrings,
  comparePagePath,
  comparePageToolSlugs,
  compareRedirects,
  findFreeAlternatives,
  findHeadToHead,
  headToHeadSlug,
  type ComparePage,
  type HeadToHeadPage,
} from "./pages";
import {
  asOfFromText,
  buildCompareView,
  compareLinksForSlug,
  compareLlmsLines,
  compareSitemapPaths,
  comparePageLoadSlugs,
  defaultCompareContext,
  displayCatalogText,
  listedComparePages,
  toolSources,
  type CompareContext,
  type CompareRow,
} from "./view";

function row(slug: string, overrides: Partial<CompareRow> = {}): CompareRow {
  return {
    slug,
    name: `Name of ${slug}`,
    website: `https://example.com/${slug}`,
    company: null,
    description: null,
    currentPricing: `Free; Pro ${slug} plan (official, as of 2026-10-14)`,
    freeTierFeatures: `Free plan for ${slug} (official, as of 2026-10-12)`,
    usageLimits: null,
    platformType: ["web"],
    hasMobileApp: false,
    iosAppUrl: null,
    androidAppUrl: null,
    ...overrides,
  };
}

function rowsFor(page: ComparePage): CompareRow[] {
  return comparePageLoadSlugs(page).map((slug) => row(slug));
}

const realCtx = defaultCompareContext();

const FACT_FIXTURE: ToolFacts = {
  slug: "fixture-tool",
  lifecycle: "active",
  freeTier: {
    value: { available: true, summary: "Fact-file free plan summary" },
    sourceUrl: "https://fixture.example/pricing",
    checkedAt: "2026-10-20",
    gatheredBy: "test",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "" },
      { name: "Pro", price: "$12", period: "month", limits: "more" },
    ],
    sourceUrl: "https://fixture.example/plans",
    checkedAt: "2026-10-18",
    gatheredBy: "test",
    status: "verified",
  },
};

const HEAD_FIXTURE: HeadToHeadPage = {
  kind: "head-to-head",
  slug: "fixture-tool-vs-other-tool",
  title: "Fixture",
  description: "Fixture page",
  a: "fixture-tool",
  b: "other-tool",
  intro: ["Registry intro copy"],
  picks: [{ slug: "fixture-tool", text: "Registry pick copy" }],
  hitFirst: ["Registry hit-first copy"],
  faq: [],
};

describe("compare registry", () => {
  it("uses alphabetical slugs for every head-to-head", () => {
    for (const page of COMPARE_PAGES) {
      if (page.kind !== "head-to-head") continue;
      assert.ok(page.a < page.b, `${page.a} should sort before ${page.b}`);
      assert.equal(page.slug, headToHeadSlug(page.a, page.b));
    }
  });

  it("has the seven approved pages at their approved paths", () => {
    assert.deepEqual(COMPARE_PAGES.map(comparePagePath).sort(), [
      "/alternatives/free-chatgpt-alternatives",
      "/alternatives/free-otter-ai-alternatives",
      "/alternatives/free-zapier-alternatives",
      "/compare/bolt-new-vs-lovable",
      "/compare/cursor-vs-github-copilot",
      "/compare/heygen-vs-synthesia",
      "/compare/klap-vs-opus-clip",
    ]);
    for (const page of COMPARE_PAGES) {
      if (page.kind === "free-alternatives") {
        assert.equal(page.slug, `free-${page.baseline}-alternatives`);
      }
    }
  });

  it("never includes relay-app or pabbly on the Zapier page", () => {
    const zapier = findFreeAlternatives("free-zapier-alternatives");
    assert.ok(zapier);
    const slugs = comparePageToolSlugs(zapier);
    assert.equal(slugs.includes("relay-app"), false);
    assert.equal(slugs.some((slug) => slug.includes("pabbly")), false);
  });

  it("keeps numbers, currency signs and question marks out of every copy string", () => {
    const strings = [
      ...COMPARE_PAGES.flatMap(comparePageCopyStrings),
      ...Object.values(FREE_OPTION_LABEL),
      COMPARE_HUB.description,
      ...COMPARE_HUB.intro,
    ];
    assert.ok(strings.length > 50);
    for (const text of strings) {
      assert.doesNotMatch(text, /[$?€£\d]/, text);
    }
  });

  it("gives every pick a tool that the page renders", () => {
    for (const page of COMPARE_PAGES) {
      const slugs = comparePageToolSlugs(page);
      for (const pick of page.picks) assert.ok(slugs.includes(pick.slug), `${page.slug}: ${pick.slug}`);
    }
  });
});

describe("compare redirects", () => {
  const redirects = compareRedirects();

  it("301s the reverse order of every head-to-head to the alphabetical page", () => {
    const heads = COMPARE_PAGES.filter((p): p is HeadToHeadPage => p.kind === "head-to-head");
    assert.equal(redirects.length, heads.length);
    for (const page of heads) {
      const hit = redirects.find((r) => r.source === `/compare/${page.b}-vs-${page.a}`);
      assert.ok(hit, page.slug);
      assert.equal(hit.destination, `/compare/${page.slug}`);
      assert.equal(hit.statusCode, 301);
    }
  });

  it("never redirects a canonical URL or chains into another redirect", () => {
    const sources = new Set(redirects.map((r) => r.source));
    for (const r of redirects) {
      assert.notEqual(r.source, r.destination);
      assert.equal(sources.has(r.destination), false, r.destination);
      assert.ok(findHeadToHead(r.destination.replace("/compare/", "")), r.destination);
      assert.equal(findHeadToHead(r.source.replace("/compare/", "")), undefined, r.source);
    }
  });
});

describe("compare view model", () => {
  const ctx: CompareContext = {
    hidden: new Set(),
    facts: (slug) => (slug === "fixture-tool" ? FACT_FIXTURE : undefined),
  };

  it("shows the overlay strings with notes stripped as on the platform page, not registry text", () => {
    const fixtureRow = row("fixture-tool", {
      currentPricing: "Row pricing that the fact file overrides",
      freeTierFeatures: "Row free plan that the fact file overrides",
      usageLimits: "Row limits that the overlay clears",
    });
    const otherRow = row("other-tool", { usageLimits: "Ten exports a day (official, as of 2026-10-01)" });
    const view = buildCompareView(HEAD_FIXTURE, [fixtureRow, otherRow], ctx);
    assert.ok(view);

    for (const [tool, source] of [
      [view.tools[0], overlayPlatformWithFacts(fixtureRow, FACT_FIXTURE)],
      [view.tools[1], overlayPlatformWithFacts(otherRow, undefined)],
    ] as const) {
      assert.equal(tool.currentPricing, displayCatalogText(source.currentPricing));
      assert.equal(tool.freeTierFeatures, displayCatalogText(source.freeTierFeatures));
      assert.equal(tool.usageLimits, displayCatalogText(source.usageLimits));
    }
    assert.equal(view.tools[0].freeTierFeatures, "Fact-file free plan summary");
    assert.equal(view.tools[0].currentPricing, "Free: $0/month; Pro: $12/month (more)");
    assert.equal(view.tools[0].usageLimits, null);
    assert.equal(view.tools[1].usageLimits, "Ten exports a day");
    assert.equal(view.tools[1].currentPricing, "Free; Pro other-tool plan");
    for (const tool of view.tools) {
      for (const value of [tool.currentPricing, tool.freeTierFeatures, tool.usageLimits]) {
        if (value) assert.doesNotMatch(value, /as of|official|https?:/i, value);
      }
    }

    const registryCopy = new Set(comparePageCopyStrings(HEAD_FIXTURE));
    for (const tool of view.tools) {
      for (const value of [tool.currentPricing, tool.freeTierFeatures, tool.usageLimits]) {
        if (value) assert.equal(registryCopy.has(value), false, value);
      }
    }
  });

  it("cites fact files when they supply a field and dated catalog text otherwise", () => {
    const view = buildCompareView(HEAD_FIXTURE, [row("fixture-tool"), row("other-tool")], ctx);
    assert.ok(view);
    assert.deepEqual(view.tools[0].sources, [
      { field: "Pricing", url: "https://fixture.example/plans", asOf: "2026-10-18", origin: "fact-file" },
      { field: "Free plan", url: "https://fixture.example/pricing", asOf: "2026-10-20", origin: "fact-file" },
    ]);
    assert.deepEqual(view.tools[1].sources, [
      { field: "Pricing", url: "https://example.com/other-tool", asOf: "2026-10-14", origin: "catalog" },
      { field: "Free plan", url: "https://example.com/other-tool", asOf: "2026-10-12", origin: "catalog" },
    ]);
    assert.equal(view.tools[0].asOf, "2026-10-18");
    assert.equal(view.tools[1].asOf, "2026-10-12");
    // Page-level as-of is the oldest per-tool date.
    assert.equal(view.asOf, "2026-10-12");
    assert.deepEqual(view.undatedTools, []);
  });

  it("strips with the platform page's helper and keeps the date for Sources", () => {
    const text = "Free $0; Pro $9/mo (official, as of 2026-10-25) https://vendor.example/pricing";
    assert.equal(displayCatalogText(text), stripInlineCitations(text));
    assert.equal(displayCatalogText(text), "Free $0; Pro $9/mo");
    assert.equal(displayCatalogText("(official, as of 2026-10-25)"), null);
    assert.equal(displayCatalogText("   "), null);
    const view = buildCompareView(
      HEAD_FIXTURE,
      [row("fixture-tool"), row("other-tool", { usageLimits: text })],
      ctx,
    );
    const limits = view?.tools[1].sources.find((s) => s.field === "Usage limits");
    assert.deepEqual(limits, {
      field: "Usage limits",
      url: "https://vendor.example/pricing",
      asOf: "2026-10-25",
      origin: "catalog",
    });
  });

  it("cites the audit-5 official source for text that audit wrote", () => {
    const patch = AUDIT_5_PATCHES.find((p) => p.slug === "cursor")!;
    const auditCtx: CompareContext = { ...ctx, audit: (slug) => (slug === "other-tool" ? patch : undefined) };
    const audited = row("other-tool", {
      currentPricing: patch.fields.currentPricing!,
      freeTierFeatures: "Older free text https://guess.example/free (official, as of 2026-09-01)",
      usageLimits: patch.fields.usageLimits!,
    });
    const view = buildCompareView(HEAD_FIXTURE, [row("fixture-tool"), audited], auditCtx);
    assert.ok(view);
    assert.deepEqual(view.tools[1].sources, [
      { field: "Pricing", url: patch.sources[0], asOf: patch.checkedAt, origin: "catalog-audit" },
      // Text without the audit's date keeps its own date but cites the audit's official page.
      { field: "Free plan", url: patch.sources[0], asOf: "2026-09-01", origin: "catalog" },
      { field: "Usage limits", url: patch.sources[0], asOf: patch.checkedAt, origin: "catalog-audit" },
    ]);
    // Fact files still win over the audit.
    const factView = buildCompareView(
      HEAD_FIXTURE,
      [row("fixture-tool"), row("other-tool")],
      { ...ctx, audit: () => patch },
    );
    assert.equal(factView?.tools[0].sources[0].origin, "fact-file");
  });

  it("uses audit-5 sources for every audit-5 tool on the real pages", () => {
    for (const page of COMPARE_PAGES) {
      const byAudit = new Map(AUDIT_5_PATCHES.map((p) => [p.slug, p]));
      const rows = comparePageLoadSlugs(page).map((slug) => {
        const fields = byAudit.get(slug)?.fields ?? {};
        return row(slug, {
          ...(fields.currentPricing ? { currentPricing: fields.currentPricing } : {}),
          ...(fields.freeTierFeatures ? { freeTierFeatures: fields.freeTierFeatures } : {}),
          ...(fields.usageLimits ? { usageLimits: fields.usageLimits } : {}),
        });
      });
      const view = buildCompareView(page, rows, realCtx);
      assert.ok(view, page.slug);
      for (const tool of view.tools) {
        const patch = byAudit.get(tool.slug);
        if (!patch) continue;
        for (const source of tool.sources) {
          if (source.origin === "fact-file") continue;
          assert.equal(source.url, patch.sources[0], `${tool.slug} ${source.field}`);
          const field = { Pricing: "currentPricing", "Free plan": "freeTierFeatures", "Usage limits": "usageLimits" } as const;
          if (patch.fields[field[source.field]] === undefined) continue;
          assert.equal(source.origin, "catalog-audit", `${tool.slug} ${source.field}`);
          assert.equal(source.asOf, patch.checkedAt);
        }
      }
    }
  });

  it("parses catalog dates and URLs, and reports undated text", () => {
    assert.equal(asOfFromText("Free (official, as of 2026-10-14); Pro (as of 2026-09-30)"), "2026-09-30");
    assert.equal(asOfFromText("No date here"), null);
    assert.equal(asOfFromText("as of 2026-13-45"), null);
    const sources = toolSources(
      { currentPricing: "See https://vendor.example/pricing", freeTierFeatures: null, usageLimits: null },
      undefined,
      "https://vendor.example",
    );
    assert.deepEqual(sources, [
      { field: "Pricing", url: "https://vendor.example/pricing", asOf: null, origin: "catalog" },
    ]);
    const view = buildCompareView(
      HEAD_FIXTURE,
      [row("fixture-tool"), row("other-tool", { currentPricing: "Undated pricing" })],
      ctx,
    );
    assert.deepEqual(view?.undatedTools, ["Name of other-tool"]);
  });

  it("uses the overlay display name and keeps registry order", () => {
    const view = buildCompareView(
      findFreeAlternatives("free-zapier-alternatives")!,
      rowsFor(findFreeAlternatives("free-zapier-alternatives")!),
      realCtx,
    );
    assert.ok(view);
    assert.deepEqual(
      view.tools.map((t) => [t.slug, t.role]),
      [
        ["zapier", "baseline"],
        ["make-integromat", "alternative"],
        ["activepieces", "alternative"],
        ["n8n", "alternative"],
      ],
    );
  });

  it("labels n8n as self-hosted on the Zapier page", () => {
    const page = findFreeAlternatives("free-zapier-alternatives")!;
    const view = buildCompareView(page, rowsFor(page), realCtx);
    const n8n = view?.tools.find((t) => t.slug === "n8n");
    assert.ok(n8n);
    assert.equal(n8n.freeOptionLabel, FREE_OPTION_LABEL["self-hosted"]);
    assert.match(n8n.freeOptionLabel!, /self-hosted/);
    assert.match(n8n.freeOptionLabel!, /your own server/);
    assert.match(n8n.freeOptionLabel!, /cloud plans are paid/);
    for (const tool of view!.tools.filter((t) => t.slug !== "n8n")) {
      assert.equal(tool.freeOptionLabel, undefined, tool.slug);
    }
  });
});

describe("compare exclusions", () => {
  it("drops hidden (relay-app) and discontinued (sora-2) alternatives", () => {
    assert.equal(realCtx.hidden.has("relay-app"), true);
    assert.equal(getToolFacts("sora-2")?.lifecycle, "discontinued");
    const page: ComparePage = {
      ...findFreeAlternatives("free-zapier-alternatives")!,
      alternatives: [{ slug: "relay-app" }, { slug: "sora-2" }, { slug: "activepieces" }],
    };
    const view = buildCompareView(page, rowsFor(page), realCtx);
    assert.deepEqual(view?.tools.map((t) => t.slug), ["zapier", "activepieces"]);
  });

  it("404s when the baseline or a head-to-head tool is excluded or missing", () => {
    const hiddenBaseline: ComparePage = { ...findFreeAlternatives("free-zapier-alternatives")!, baseline: "relay-app" };
    assert.equal(buildCompareView(hiddenBaseline, rowsFor(hiddenBaseline), realCtx), null);

    const deadHead: ComparePage = { ...HEAD_FIXTURE, a: "other-tool", b: "sora-2" };
    assert.equal(buildCompareView(deadHead, rowsFor(deadHead), realCtx), null);

    const heygen = findHeadToHead("heygen-vs-synthesia")!;
    assert.equal(buildCompareView(heygen, [row("heygen")], realCtx), null);
    assert.ok(buildCompareView(heygen, rowsFor(heygen), realCtx));
  });

  it("404s an alternatives page when every alternative is excluded", () => {
    const page: ComparePage = {
      ...findFreeAlternatives("free-zapier-alternatives")!,
      alternatives: [{ slug: "relay-app" }, { slug: "sora-2" }],
    };
    assert.equal(buildCompareView(page, rowsFor(page), realCtx), null);
    assert.equal(listedComparePages(realCtx, undefined, [page]).length, 0);
  });

  it("shows also-consider links only for visible rows", () => {
    const cursor = findHeadToHead("cursor-vs-github-copilot")!;
    const all = buildCompareView(cursor, rowsFor(cursor), realCtx);
    assert.deepEqual(all?.alsoConsider.map((l) => l.slug), ["claude-code", "windsurf"]);
    // windsurf's fact file renames it; the link uses the overlay name.
    assert.equal(all?.alsoConsider[1].name, getToolFacts("windsurf")?.displayName?.value);
    const noRow = buildCompareView(
      cursor,
      rowsFor(cursor).filter((r) => r.slug !== "claude-code"),
      realCtx,
    );
    assert.deepEqual(noRow?.alsoConsider.map((l) => l.slug), ["windsurf"]);
    const hidden = buildCompareView(cursor, rowsFor(cursor), {
      ...realCtx,
      hidden: new Set([...realCtx.hidden, "windsurf"]),
    });
    assert.deepEqual(hidden?.alsoConsider.map((l) => l.slug), ["claude-code"]);
  });
});

describe("compare listing (hub, sitemap, llms.txt, platform links)", () => {
  const listed = listedComparePages(realCtx);

  it("lists all seven pages plus the hub in the sitemap", () => {
    assert.equal(listed.length, 7);
    const paths = compareSitemapPaths(listed);
    assert.equal(paths.length, 8);
    assert.ok(paths.includes(COMPARE_HUB_PATH));
    for (const page of COMPARE_PAGES) assert.ok(paths.includes(comparePagePath(page)), page.slug);
  });

  it("lists all seven pages plus the hub in llms.txt", () => {
    const lines = compareLlmsLines(SITE_URL, listed);
    assert.equal(lines.length, 8);
    assert.ok(lines.some((l) => l.includes(`${SITE_URL}${COMPARE_HUB_PATH})`)));
    for (const page of COMPARE_PAGES) {
      assert.ok(lines.some((l) => l.includes(`${SITE_URL}${comparePagePath(page)})`)), page.slug);
    }
  });

  it("drops pages whose required rows are missing when rows are known", () => {
    const existing = new Set(COMPARE_PAGES.flatMap(comparePageLoadSlugs));
    existing.delete("synthesia");
    const paths = listedComparePages(realCtx, existing).map(comparePagePath);
    assert.equal(paths.includes("/compare/heygen-vs-synthesia"), false);
    assert.equal(paths.length, 6);
  });

  it("keeps Klap vs OpusClip out of the sitemap until the klap row exists (audit 13 creates it)", () => {
    const existing = new Set(COMPARE_PAGES.flatMap(comparePageLoadSlugs));
    existing.delete("klap");
    const paths = listedComparePages(realCtx, existing).map(comparePagePath);
    assert.equal(paths.includes("/compare/klap-vs-opus-clip"), false);
    existing.add("klap");
    assert.ok(listedComparePages(realCtx, existing).map(comparePagePath).includes("/compare/klap-vs-opus-clip"));
    assert.deepEqual(compareLinksForSlug("klap", realCtx).map((l) => l.href), ["/compare/klap-vs-opus-clip"]);
  });

  it("links each involved platform page to the pages that render it", () => {
    assert.deepEqual(compareLinksForSlug("cursor", realCtx), [
      { href: "/compare/cursor-vs-github-copilot", label: findHeadToHead("cursor-vs-github-copilot")!.title },
    ]);
    assert.deepEqual(
      compareLinksForSlug("n8n", realCtx).map((l) => l.href),
      ["/alternatives/free-zapier-alternatives"],
    );
    for (const page of COMPARE_PAGES) {
      for (const slug of comparePageToolSlugs(page)) {
        assert.ok(
          compareLinksForSlug(slug, realCtx).some((l) => l.href === comparePagePath(page)),
          `${slug} -> ${page.slug}`,
        );
      }
    }
    // Also-consider tools are links only; they get no Compare section.
    assert.deepEqual(compareLinksForSlug("v0", realCtx), []);
    assert.deepEqual(compareLinksForSlug("relay-app", realCtx), []);
  });
});
