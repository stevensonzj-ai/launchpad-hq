import assert from "node:assert/strict";
import * as fs from "fs";
import * as path from "path";
import { describe, it } from "node:test";
import { getToolFacts } from "@/data/facts";
import { hiddenPlatformSlugs } from "@/lib/catalog-visibility";
import { loadSnapshot } from "./snapshot";
import { toPlatformRef } from "./tools";

/**
 * The snapshot is an offline rebuild, so it has to earn its place: it must
 * hold exactly the listed catalog and reproduce, field for field, every tool
 * the 2026-10-26 live stress test returned (stress-1026/observed-tools.json,
 * public fields copied from results.jsonl).
 */
describe("catalog snapshot", () => {
  const snap = loadSnapshot();

  it("holds the listed catalog: unique slugs, no hidden rows", () => {
    const slugs = snap.rows.map((r) => r.slug);
    assert.equal(new Set(slugs).size, slugs.length);
    const hidden = new Set(hiddenPlatformSlugs());
    assert.deepEqual(slugs.filter((s) => hidden.has(s)), []);
    assert.equal(snap.rows.length + snap.hidden_rows.length, snap.db_rows);
    assert.equal(snap.rows.length, 221);
  });

  it("reproduces every tool the live stress test returned", () => {
    const observed = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "src", "lib", "mcp", "stress-1026", "observed-tools.json"), "utf8"),
    ) as Record<string, unknown>[];
    assert.ok(observed.length >= 75);
    const bySlug = new Map(snap.rows.map((r) => [r.slug, r]));
    const diffs: string[] = [];
    for (const o of observed) {
      const row = bySlug.get(o.slug as string);
      if (!row) {
        diffs.push(`${o.slug}: missing`);
        continue;
      }
      const ref = toPlatformRef(row, getToolFacts(row.slug)) as unknown as Record<string, unknown>;
      for (const key of Object.keys(o)) {
        if (JSON.stringify(ref[key]) !== JSON.stringify(o[key])) diffs.push(`${o.slug}.${key}: ${JSON.stringify(ref[key])} != ${JSON.stringify(o[key])}`);
      }
    }
    assert.deepEqual(diffs, []);
  });
});
