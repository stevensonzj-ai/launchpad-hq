import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, it } from "node:test";
import { catalogRedirects, HIDDEN_PAGE_REDIRECTS } from "@/lib/catalog-redirects";
import { isHiddenPlatform } from "@/lib/catalog-visibility";
import {
  REMOVED_PLATFORM_SLUGS,
  assertNoRemovedSlugs,
  assertNotRemovedForWrite,
  assertPlatformOperationAllowed,
  guardPlatformWrites,
} from "@/lib/catalog/removed-slugs";
import { audit32Sql } from "@/data/catalog-audits/audit-32";
import { audit33Sql } from "@/data/catalog-audits/audit-33";

const root = process.cwd();
const read = (p: string) => readFileSync(join(root, p), "utf8");

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(join(root, dir))) {
    const rel = `${dir}/${name}`;
    if (statSync(join(root, rel)).isDirectory()) walk(rel, out);
    else out.push(rel);
  }
  return out;
}

describe("removed-platform denylist: helpers", () => {
  it("lists hedra", () => {
    assert.deepEqual([...REMOVED_PLATFORM_SLUGS], ["hedra"]);
  });

  it("assertNotRemovedForWrite throws for a hedra insert, a rename to or from hedra, and an unhide", () => {
    assert.throws(() => assertNotRemovedForWrite("hedra", { name: "Hedra" }, "create"), /denylist/);
    assert.throws(() => assertNotRemovedForWrite("Hedra ", {}, "create"), /denylist/);
    assert.throws(() => assertNotRemovedForWrite("other", { slug: "hedra" }, "update"), /denylist/);
    assert.throws(() => assertNotRemovedForWrite("hedra", { slug: "hedra-2" }, "update"), /rename/);
    assert.throws(() => assertNotRemovedForWrite("hedra", { visibility: "listed" }, "update"), /unhide/);
    assert.throws(() => assertNotRemovedForWrite("hedra", { isHidden: false }, "update"), /unhide/);
  });

  it("assertNotRemovedForWrite allows other slugs and non-unhiding edits", () => {
    assert.doesNotThrow(() => assertNotRemovedForWrite("pipecat", { name: "Pipecat" }, "create"));
    assert.doesNotThrow(() => assertNotRemovedForWrite("pipecat", { slug: "pipecat-ai", visibility: "listed" }, "update"));
    assert.doesNotThrow(() => assertNotRemovedForWrite("hedra", { description: "x", visibility: "hidden" }, "update"));
  });

  it("assertPlatformOperationAllowed covers create, createMany, upsert, update and rename", () => {
    assert.throws(() => assertPlatformOperationAllowed("create", { data: { slug: "hedra" } }), /denylist/);
    assert.throws(() => assertPlatformOperationAllowed("createMany", { data: [{ slug: "ok" }, { slug: "hedra" }] }), /denylist/);
    assert.throws(() => assertPlatformOperationAllowed("createManyAndReturn", { data: [{ slug: "hedra" }] }), /denylist/);
    assert.throws(
      () => assertPlatformOperationAllowed("upsert", { where: { slug: "hedra" }, create: { slug: "hedra" }, update: {} }),
      /denylist/,
    );
    assert.throws(() => assertPlatformOperationAllowed("update", { where: { slug: "x" }, data: { slug: "hedra" } }), /denylist/);
    assert.throws(
      () => assertPlatformOperationAllowed("update", { where: { slug: "hedra" }, data: { visibility: "listed" } }),
      /unhide/,
    );
    assert.throws(() => assertPlatformOperationAllowed("updateMany", { where: { slug: "hedra" }, data: { hidden: false } }), /unhide/);

    assert.doesNotThrow(() => assertPlatformOperationAllowed("create", { data: { slug: "pipecat" } }));
    assert.doesNotThrow(() => assertPlatformOperationAllowed("upsert", { where: { slug: "x" }, create: { slug: "x" }, update: { name: "y" } }));
    assert.doesNotThrow(() => assertPlatformOperationAllowed("update", { where: { slug: "x" }, data: { description: "d" } }));
    assert.doesNotThrow(() => assertPlatformOperationAllowed("findMany", { where: { slug: "hedra" } }));
  });

  it("assertNoRemovedSlugs throws for hedra and passes other slugs", () => {
    assert.throws(() => assertNoRemovedSlugs(["a", "hedra"], "seed"), /seed/);
    assert.doesNotThrow(() => assertNoRemovedSlugs(["a", "b", null]));
  });

  it("guardPlatformWrites wraps the client and blocks hedra writes before the query runs", async () => {
    let ext: { query: { platform: { $allOperations: (a: unknown) => Promise<unknown> } } } | undefined;
    const fake = {
      $extends(e: unknown) {
        ext = e as typeof ext;
        return { guarded: true };
      },
    };
    const guarded = guardPlatformWrites(fake);
    assert.deepEqual(guarded, { guarded: true });
    const run = ext!.query.platform.$allOperations;
    let ran = 0;
    const query = async () => {
      ran += 1;
      return "ok";
    };
    await assert.rejects(run({ operation: "create", args: { data: { slug: "hedra" } }, query }), /denylist/);
    await assert.rejects(run({ operation: "upsert", args: { where: { slug: "hedra" }, create: { slug: "hedra" }, update: {} }, query }), /denylist/);
    assert.equal(ran, 0);
    assert.equal(await run({ operation: "create", args: { data: { slug: "pipecat" } }, query }), "ok");
    assert.equal(await run({ operation: "findUnique", args: { where: { slug: "hedra" } }, query }), "ok");
    assert.equal(ran, 2);
  });

  it("generated SQL inputs carry no removed slug", () => {
    for (const stmt of [...audit32Sql(), ...audit33Sql()]) {
      for (const slug of REMOVED_PLATFORM_SLUGS) assert.equal(new RegExp(`\\b${slug}\\b`, "i").test(stmt), false, slug);
    }
    for (const f of walk("scripts/sql")) {
      for (const slug of REMOVED_PLATFORM_SLUGS) assert.equal(new RegExp(`\\b${slug}\\b`, "i").test(read(f)), false, `${f}: ${slug}`);
    }
  });
});

describe("removed-platform denylist: no script bypasses the guard", () => {
  const GUARD = /guarded-prisma|guardPlatformWrites\(|assertNotRemovedForWrite\(|assertNoRemovedSlugs\(|assertPlatformOperationAllowed\(/;
  const WRITES = /\.platform\s*\.\s*(create|createMany|createManyAndReturn|upsert|update|updateMany|updateManyAndReturn)\s*\(|INSERT\s+INTO\s+"?platforms\b|UPDATE\s+"?platforms\b/i;
  const files = [
    ...walk("scripts").filter((f) => /\.(ts|mts|mjs|js|sql)$/.test(f) && !/\.test\./.test(f)),
    ...walk("src/data/catalog-audits").filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts")),
  ];

  it("finds the known writers (sanity)", () => {
    const writers = files.filter((f) => WRITES.test(read(f)));
    assert.ok(writers.length >= 30, `only ${writers.length} writers found`);
    assert.ok(writers.includes("scripts/seed-phase1-batch1-platforms.ts"));
  });

  it("every file that writes to platforms imports or calls the guard", () => {
    const unguarded = files.filter((f) => {
      const src = read(f);
      // .sql files are generated from the guarded audit-32/33 modules and are checked above.
      return !f.endsWith(".sql") && WRITES.test(src) && !GUARD.test(src);
    });
    assert.deepEqual(unguarded, []);
  });

  it("no writer builds a raw PrismaClient from @prisma/client", () => {
    const raw = files.filter((f) => {
      const src = read(f);
      if (f.endsWith(".sql") || !WRITES.test(src)) return false;
      const rawImport = /import\s*\{[^}]*\bPrismaClient\b[^}]*\}\s*from\s*"@prisma\/client"/.test(src);
      return rawImport && !/guardPlatformWrites\(/.test(src);
    });
    assert.deepEqual(raw.map((f) => relative(".", f)), []);
  });

  it("no script writes platforms through raw SQL helpers", () => {
    const rawSql = files.filter((f) => !f.endsWith(".sql") && /\$(executeRaw|queryRaw)(Unsafe)?/.test(read(f)) && /platforms/i.test(read(f)));
    assert.deepEqual(rawSql, []);
  });
});

describe("removed-platform denylist: hedra stays hidden", () => {
  const snapshot = JSON.parse(read("src/lib/mcp/catalog-snapshot.json")) as { rows: { slug: string }[]; hidden_rows: string[] };

  it("catalog-snapshot.json has no public hedra row and lists it as hidden", () => {
    for (const slug of REMOVED_PLATFORM_SLUGS) {
      assert.equal(snapshot.rows.some((r) => r.slug === slug), false, slug);
      assert.ok(snapshot.hidden_rows.includes(slug), slug);
    }
  });

  it("the /platform/hedra 301 redirect is still configured", () => {
    for (const slug of REMOVED_PLATFORM_SLUGS) {
      assert.equal(isHiddenPlatform(slug), true, slug);
      assert.ok(HIDDEN_PAGE_REDIRECTS[slug], slug);
      const hits = catalogRedirects().filter((m) => m.source === `/platform/${slug}`);
      assert.equal(hits.length, 1, slug);
      assert.equal(hits[0].statusCode, 301);
      assert.equal(hits[0].destination, HIDDEN_PAGE_REDIRECTS[slug]);
    }
  });
});
