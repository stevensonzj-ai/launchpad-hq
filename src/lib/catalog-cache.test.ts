import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import {
  CATALOG_REVALIDATE_SECONDS,
  CATALOG_TAG,
  cacheGeneration,
  cachedCatalogRead,
  catalogTags,
  platformTag,
  reviveDates,
  withMemoryLayer,
} from "./catalog-cache";
import { TOOL_SPECS, runTool } from "./mcp/server";
import type { CatalogRow } from "./mcp/tools";
import { FEED_ROWS, GENERATED_AT, feedFacts } from "./public-data/fixtures";
import { buildFeedContext, toPublicCatalog } from "./public-data/serialize";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");

describe("catalog cache config", () => {
  it("tags every entry `catalog`, per-platform reads add platform:<slug>, 24 hour TTL", () => {
    assert.equal(CATALOG_TAG, "catalog");
    assert.equal(CATALOG_REVALIDATE_SECONDS, 86400);
    assert.equal(platformTag("chatgpt"), "platform:chatgpt");
    assert.deepEqual(catalogTags(), ["catalog"]);
    assert.deepEqual(catalogTags(["a", "b", "a"]), ["catalog", "platform:a", "platform:b"]);
  });

  it("keys entries by deployment so a deploy never reads the previous build's rows", () => {
    assert.equal(cacheGeneration({ VERCEL_DEPLOYMENT_ID: "dpl_1", VERCEL_GIT_COMMIT_SHA: "abc" }), "dpl_1");
    assert.equal(cacheGeneration({ VERCEL_GIT_COMMIT_SHA: "abc" }), "abc");
    assert.equal(cacheGeneration({}), "local");
    assert.match(read("src/lib/catalog-cache.ts"), /\["catalog", name, cacheGeneration\(\)\]/);
  });

  it("wraps reads in unstable_cache with the tags and revalidate above", () => {
    const src = read("src/lib/catalog-cache.ts");
    assert.match(src, /import \{ unstable_cache \} from "next\/cache"/);
    assert.match(src, /tags: catalogTags\(slugTags\(\.\.\.args\)\)/);
    assert.match(src, /revalidate: CATALOG_REVALIDATE_SECONDS/);
  });
});

describe("reviveDates", () => {
  it("restores createdAt/updatedAt anywhere in the tree and leaves other strings alone", () => {
    const original = {
      slug: "x",
      createdAt: new Date("2026-01-02T03:04:05.000Z"),
      category: { name: "C", createdAt: new Date("2025-05-05T00:00:00.000Z") },
      list: [{ updatedAt: new Date("2026-10-01T00:00:00.000Z"), note: "2026-10-01T00:00:00.000Z" }],
      _count: { prompts: 2 },
      empty: null,
    };
    const revived = reviveDates(JSON.parse(JSON.stringify(original)));
    assert.deepEqual(revived, original);
    assert.ok(revived.createdAt instanceof Date);
    assert.equal(typeof revived.list[0].note, "string");
  });

  it("keeps an unparseable date string as-is and passes primitives through", () => {
    assert.deepEqual(reviveDates({ updatedAt: "nope" }), { updatedAt: "nope" });
    assert.equal(reviveDates(5), 5);
    assert.equal(reviveDates(null), null);
  });
});

describe("cachedCatalogRead outside a Next server", () => {
  it("falls back to the plain read (tests, scripts) and still revives dates", async () => {
    let calls = 0;
    const cached = cachedCatalogRead("test-fallback", async (slug: string) => {
      calls += 1;
      return { slug, updatedAt: "2026-10-26T00:00:00.000Z" };
    });
    const row = await cached("abc");
    assert.equal(calls, 1);
    assert.equal(row.slug, "abc");
    assert.ok((row.updatedAt as unknown) instanceof Date);
  });

  it("does not swallow real errors from the read", async () => {
    const cached = cachedCatalogRead("test-throws", async () => {
      throw new Error("db down");
    });
    await assert.rejects(cached(), /db down/);
  });
});

describe("withMemoryLayer", () => {
  it("serves from memory within the TTL, reloads after, and never stores a failure", async () => {
    let t = 0;
    let loads = 0;
    let fail = false;
    const load = withMemoryLayer(
      async () => {
        loads += 1;
        if (fail) throw new Error("boom");
        return loads;
      },
      1000,
      () => t,
    );
    assert.equal(await load(), 1);
    t = 999;
    assert.equal(await load(), 1);
    t = 1000;
    fail = true;
    await assert.rejects(load(), /boom/);
    fail = false;
    assert.equal(await load(), 3);
    assert.equal(loads, 3);
  });
});

describe("/mcp and /data/v1 read one cached catalog", () => {
  it("both import the same loadCatalog, which is the memory layer over the shared cache", () => {
    assert.match(read("src/lib/public-data/load.ts"), /import \{ loadCatalog \} from "@\/lib\/mcp\/catalog"/);
    const route = read("src/app/mcp/route.ts");
    assert.match(route, /import \{ loadCatalog \} from "@\/lib\/mcp\/catalog"/);
    assert.match(route, /registerLaunchpadTools\(server, \{ loadCatalog \}\)/);
    const catalog = read("src/lib/mcp/catalog.ts");
    assert.match(catalog, /cachedCatalogRead\("mcp-catalog"/);
    assert.match(catalog, /export const loadCatalog.*= withMemoryLayer\(readCatalog, CATALOG_MEMORY_TTL_MS\)/);
    assert.match(catalog, /CATALOG_MEMORY_TTL_MS = 5 \* 60 \* 1000/);
  });

  it("no /data/v1 route or /mcp queries Prisma directly", () => {
    for (const rel of [
      "src/app/mcp/route.ts",
      "src/app/data/v1/catalog.json/route.ts",
      "src/app/data/v1/index.json/route.ts",
      "src/app/data/v1/tools/[file]/route.ts",
      "src/app/data/v1/compare/index.json/route.ts",
      "src/app/data/v1/compare/[file]/route.ts",
      "src/app/data/v1/guides/index.json/route.ts",
      "src/app/data/v1/guides/[file]/route.ts",
      "src/app/llms-full.txt/route.ts",
    ]) {
      assert.doesNotMatch(read(rel), /@\/lib\/db|prisma\./, rel);
    }
  });

  // What the data cache does to rows: Date -> ISO string -> reviveDates.
  const withDates: CatalogRow[] = FEED_ROWS.map((r) => ({ ...r, updatedAt: new Date(r.updatedAt) }));
  const fromCache: CatalogRow[] = reviveDates(JSON.parse(JSON.stringify(withDates)));

  it("the feed is identical whether rows came from Postgres or from the cache", () => {
    const build = (rows: CatalogRow[]) =>
      toPublicCatalog(rows, feedFacts, buildFeedContext(rows, feedFacts, { generatedAt: GENERATED_AT }));
    assert.deepEqual(build(fromCache), build(withDates));
  });

  it("MCP tool output is identical whether rows came from Postgres or from the cache", async () => {
    const deps = (rows: CatalogRow[]) => ({ loadCatalog: async () => rows, facts: feedFacts, log: () => {}, now: () => 0 });
    for (const [name, args] of [
      ["get_pricing_facts", { platform: FEED_ROWS[0].slug }],
      ["search_tools", { task: "meeting transcription" }],
      ["compare", { platforms: [FEED_ROWS[0].slug, FEED_ROWS[1].slug] }],
    ] as const) {
      const spec = TOOL_SPECS.find((t) => t.name === name)!;
      assert.deepEqual(await runTool(spec, args, deps(fromCache)), await runTool(spec, args, deps(withDates)), name);
    }
  });
});
