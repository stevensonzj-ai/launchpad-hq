import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { FIXTURE_ROWS, fixtureFacts } from "./fixtures";
import {
  ATTRIBUTION,
  compare,
  findFreeAlternatives,
  getPricingFacts,
  searchTools,
  ToolInputError,
  type CatalogRow,
} from "./tools";

const SITE = "https://www.launchpadhq.io";

function allUrls(value: unknown): string[] {
  const json = JSON.stringify(value);
  return [...json.matchAll(/https?:\/\/[^"]+/g)].map((m) => m[0]);
}

function everyItemUnsponsored(items: { sponsored: boolean }[]) {
  for (const item of items) assert.equal(item.sponsored, false);
}

describe("search_tools", () => {
  it("matches the task and respects the budget filter", () => {
    const out = searchTools({ task: "meeting transcription", budget: "free" }, FIXTURE_ROWS, fixtureFacts);
    const slugs = out.results.map((r) => r.slug);
    assert.ok(slugs.includes("freenote"));
    assert.ok(slugs.includes("budgetscribe"));
    for (const r of out.results) assert.ok(["FREE", "FREEMIUM"].includes(r.cost_tier), r.slug);
    assert.equal(out.attribution, ATTRIBUTION);
  });

  it("ranks tools above the user's skill level lower", () => {
    const out = searchTools(
      { task: "meeting transcription", budget: "any", skill_level: "beginner", limit: 10 },
      FIXTURE_ROWS,
      fixtureFacts,
    );
    const slugs = out.results.map((r) => r.slug);
    assert.ok(slugs.indexOf("freenote") < slugs.indexOf("proscribe"));
    assert.ok(slugs.indexOf("freenote") < slugs.indexOf("paidnote"));
  });

  it("excludes discontinued tools", () => {
    const out = searchTools({ task: "meeting transcription", limit: 10 }, FIXTURE_ROWS, fixtureFacts);
    assert.ok(!out.results.some((r) => r.slug === "deadnote"));
  });

  it("filters by platform type", () => {
    const out = searchTools({ task: "generate images", platform_type: "desktop" }, FIXTURE_ROWS, fixtureFacts);
    assert.deepEqual(out.results.map((r) => r.slug), ["desktopdraw"]);
  });

  it("labels catalog-only items and never invents a source", () => {
    const out = searchTools({ task: "meeting transcription", limit: 10 }, FIXTURE_ROWS, fixtureFacts);
    const free = out.results.find((r) => r.slug === "freenote");
    assert.ok(free);
    assert.equal(free.verification, "catalog_only");
    assert.equal(free.source_url, null);
    assert.equal(free.as_of, "2026-10-01");
  });

  it("says so plainly when nothing matches, without padding", () => {
    const out = searchTools({ task: "quantum knitting" }, FIXTURE_ROWS, fixtureFacts);
    assert.equal(out.results.length, 0);
    assert.equal(out.total_matches, 0);
    assert.match(out.note ?? "", /No Launchpad HQ tools matched/);
  });

  it("caps the limit at 10", () => {
    const out = searchTools({ task: "meeting", limit: 10 }, FIXTURE_ROWS, fixtureFacts);
    assert.ok(out.results.length <= 10);
  });
});

describe("compare", () => {
  it("rejects fewer than 2 or more than 4 platforms", () => {
    assert.throws(() => compare({ platforms: ["notey"] }, FIXTURE_ROWS, fixtureFacts), ToolInputError);
    assert.throws(
      () => compare({ platforms: ["a", "b", "c", "d", "e"] }, FIXTURE_ROWS, fixtureFacts),
      ToolInputError,
    );
  });

  it("reports not_found and carries per-fact provenance", () => {
    const out = compare({ platforms: ["notey", "FREENOTE", "nope"] }, FIXTURE_ROWS, fixtureFacts);
    assert.deepEqual(out.not_found, ["nope"]);
    assert.deepEqual(out.items.map((i) => i.slug), ["notey", "freenote"]);
    const notey = out.items[0];
    assert.equal(notey.plans?.source_url, "https://notey.example.com/pricing");
    assert.equal(notey.plans?.as_of, "2026-10-20");
    assert.equal(out.items[1].plans, null);
    everyItemUnsponsored(out.items);
  });
});

describe("get_pricing_facts", () => {
  it("returns verified facts first and no catalog text when facts exist", () => {
    const out = getPricingFacts({ platform: "notey" }, FIXTURE_ROWS, fixtureFacts);
    assert.equal(out.verification, "verified");
    assert.equal(out.catalog_pricing_text, null);
    assert.equal(out.plans?.value[0].price, "$20");
  });

  it("falls back to labeled catalog text when there are no facts", () => {
    const out = getPricingFacts({ platform: "Paidnote" }, FIXTURE_ROWS, fixtureFacts);
    assert.equal(out.verification, "catalog_only");
    assert.equal(out.plans, null);
    assert.equal(out.platform.source_url, null);
  });

  it("errors for platforms not in the catalog", () => {
    assert.throws(
      () => getPricingFacts({ platform: "not-a-tool" }, FIXTURE_ROWS, fixtureFacts),
      /Not in the Launchpad HQ catalog/,
    );
  });

  it("still answers for discontinued tools, with the status shown", () => {
    const out = getPricingFacts({ platform: "deadnote" }, FIXTURE_ROWS, fixtureFacts);
    assert.equal(out.lifecycle, "discontinued");
  });
});

describe("find_free_alternatives", () => {
  it("matches names case-insensitively, uses budgetAlternativeTo in reverse, and skips paid-only tools", () => {
    const out = findFreeAlternatives({ platform: "NOTEY", limit: 10 }, FIXTURE_ROWS, fixtureFacts);
    const slugs = out.alternatives.map((a) => a.slug);
    assert.ok(slugs.includes("freenote"), "direct alternative by name");
    assert.ok(slugs.includes("budgetscribe"), "reverse budgetAlternativeTo");
    assert.ok(!slugs.includes("paidnote"), "enterprise-only is not free");
    assert.ok(!slugs.includes("proscribe"), "paid-only");
    assert.ok(!slugs.includes("deadnote"), "discontinued");
    assert.equal(slugs[0], "verifiedfree", "verified free tier ranks first");
    for (const alt of out.alternatives) {
      assert.ok(alt.free_tier.available, alt.slug);
      assert.equal(alt.tradeoff, null);
    }
    everyItemUnsponsored(out.alternatives);
  });

  it("errors for unknown platforms", () => {
    assert.throws(() => findFreeAlternatives({ platform: "zzz" }, FIXTURE_ROWS, fixtureFacts), ToolInputError);
  });
});

describe("links and attribution", () => {
  it("uses https://www.launchpadhq.io for every Launchpad link and sets data_as_of", () => {
    const outputs = [
      searchTools({ task: "meeting", limit: 10 }, FIXTURE_ROWS, fixtureFacts),
      compare({ platforms: ["notey", "freenote"] }, FIXTURE_ROWS, fixtureFacts),
      getPricingFacts({ platform: "notey" }, FIXTURE_ROWS, fixtureFacts),
      findFreeAlternatives({ platform: "notey" }, FIXTURE_ROWS, fixtureFacts),
    ];
    for (const out of outputs) {
      assert.equal(out.attribution, ATTRIBUTION);
      assert.ok(out.data_as_of);
      for (const url of allUrls(out)) {
        if (url.includes("launchpadhq")) assert.ok(url.startsWith(SITE), url);
        assert.ok(!url.includes("vercel.app"), url);
      }
    }
  });
});

describe("sponsorship never affects results", () => {
  it("returns identical results whether or not tools are marked sponsored", () => {
    const sponsoredSlugs = new Set(["proscribe", "paidnote", "pixelpaint"]);
    // Simulate sponsor data leaking onto rows: extra fields a placement might add.
    const sponsoredRows = FIXTURE_ROWS.map((r) =>
      sponsoredSlugs.has(r.slug)
        ? ({ ...r, sponsored: true, featured: true, placement: "discover" } as unknown as CatalogRow)
        : r,
    );
    const runs = (rows: CatalogRow[]) => [
      searchTools({ task: "meeting transcription", budget: "any", limit: 10 }, rows, fixtureFacts),
      searchTools({ task: "generate images", limit: 10 }, rows, fixtureFacts),
      compare({ platforms: ["proscribe", "freenote", "pixelpaint"] }, rows, fixtureFacts),
      findFreeAlternatives({ platform: "notey", limit: 10 }, rows, fixtureFacts),
    ];
    assert.deepEqual(runs(sponsoredRows), runs(FIXTURE_ROWS));
    for (const out of runs(sponsoredRows)) {
      const items = "results" in out ? out.results : "items" in out ? out.items : out.alternatives;
      everyItemUnsponsored(items);
    }
  });

  it("no MCP file imports sponsor data", () => {
    for (const file of mcpSourceFiles()) {
      const src = readFileSync(file, "utf8");
      assert.ok(!/from\s+["'][^"']*sponsor/i.test(src), `${file} imports sponsor data`);
      assert.ok(!/require\(\s*["'][^"']*sponsor/i.test(src), `${file} requires sponsor data`);
    }
  });
});

describe("read-only guard", () => {
  it("no MCP file calls a Prisma write", () => {
    const writes = /\b(create|createMany|update|updateMany|upsert|delete|deleteMany)\(|\$executeRaw|\$queryRaw|\$transaction/;
    for (const file of mcpSourceFiles()) {
      if (file.endsWith(".test.ts")) continue; // this file names the patterns
      const src = readFileSync(file, "utf8");
      assert.ok(!writes.test(src), `${file} contains a write call`);
    }
  });
});

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function mcpSourceFiles(): string[] {
  const files = [...walk("src/lib/mcp"), ...walk("src/app/mcp")].filter((f) => /\.tsx?$/.test(f));
  assert.ok(files.length >= 6, "found MCP source files");
  return files;
}
