import assert from "node:assert/strict";
import * as fs from "fs";
import * as path from "path";
import { describe, it } from "node:test";
import { audit10Slugs } from "@/data/catalog-audits/audit-10";
import { getToolFacts } from "@/data/facts";
import { AUDIT_15_PATCHES, AUDIT_15_RENAMES } from "@/data/catalog-audits/audit-15";
import { AUDIT_17_BATCH } from "@/data/catalog-audits/audit-17";
import { AUDIT_18_BATCH } from "@/data/catalog-audits/audit-18";
import { AUDIT_19_BATCH } from "@/data/catalog-audits/audit-19";
import { AUDIT_20_BATCH } from "@/data/catalog-audits/audit-20";
import { AUDIT_22_RENAMES } from "@/data/catalog-audits/audit-22";
import { AUDIT_25_FACT_SLUGS } from "@/data/catalog-audits/audit-25";
import { hiddenPlatformSlugs } from "@/lib/catalog-visibility";
import { loadSnapshot } from "./snapshot";
import { toPlatformRef } from "./tools";

/**
 * The snapshot is an offline rebuild, so it has to earn its place: it must
 * hold exactly the listed catalog and reproduce, field for field, every tool
 * the 2026-10-26 live stress test returned (stress-1026/observed-tools.json,
 * public fields copied from results.jsonl).
 *
 * Fix plan P1.3 changed some of those tools on purpose after the live run
 * (catalog audit 10 and the RA's fact files). For them, only the fields that
 * change can differ; everything else must still match.
 */
const P13_FACT_FILES = [
  "otter-ai", "midjourney", "github-copilot", "zoom-ai-companion", "julius-ai", "elicit", "opus-clip", "suno",
  "canva-ai-magic-studio", "perplexity-ai", "quillbot", "gemini", "read-ai", "microsoft-copilot",
];
/**
 * Fix P1.3c (2026-10-26): Krisp's owner-checked facts and audit 11, and the
 * card label now taken from every price fact (pricingVerification), which
 * turns plans- or API-only fact files from catalog_only into verified.
 */
const P13C_CHANGED = ["krisp", "deepseek", "invideo-ai", "jasper", "openai-api"];
const P13_FIELDS = new Set([
  "name", "description", "cost_tier", "free_tier", "starting_price", "tasks", "verification", "as_of", "source_url", "stale", "freshness_note",
]);
/**
 * Catalog audit 15 (guide PR D, 2026-10-29) moved some observed tools to new
 * slugs and names. They are looked up under the new slug, and only the
 * fields a rename changes may differ.
 */
const AUDIT_15_MOVES = new Map(AUDIT_15_RENAMES.map((r) => [r.from, r.to]));
/**
 * Audit 15 also patches pricing rows (Tabnine, Scite, Lindy, Activepieces)
 * and Scite gained a fact file; those tools may differ on the same
 * fields fix P1.3 changed.
 */
/**
 * Catalog audit 22 (2026-10-30): two slug moves and five renamed listings;
 * only slug, name and the reference columns may differ for them.
 */
const AUDIT_22_MOVES = new Map(AUDIT_22_RENAMES.filter((r) => r.from !== r.to).map((r) => [r.from, r.to]));
const AUDIT_22_RENAMED = new Set(AUDIT_22_RENAMES.map((r) => r.to));
const AUDIT_22_FIELDS = new Set(["slug", "name"]);
const AUDIT_15_PATCHED = AUDIT_15_PATCHES.map((p) => p.slug);
const AUDIT_15_FIELDS = new Set(["slug", "name", "verification", "as_of", "source_url", "stale", "freshness_note"]);
/**
 * Stale facts batch 1 (catalog audit 17, 2026-10-29): 28 rows gained fact
 * files and pricing patches, so they may differ on the same fields fix P1.3
 * changed. Batch 2 (catalog audit 18, 2026-10-29) does the same for 23 more
 * rows, batch 3 (catalog audit 19, 2026-10-29) for 22 more, and batch 4 (catalog audit 20,
 * 2026-10-29) for 19 more.
 */
describe("catalog snapshot", () => {
  const snap = loadSnapshot();

  it("holds the listed catalog: unique slugs, no hidden rows", () => {
    const slugs = snap.rows.map((r) => r.slug);
    assert.equal(new Set(slugs).size, slugs.length);
    const hidden = new Set(hiddenPlatformSlugs());
    assert.deepEqual(slugs.filter((s) => hidden.has(s)), []);
    assert.equal(snap.rows.length + snap.hidden_rows.length, snap.db_rows);
    // 221 until guide PR D hid clarifai (2026-10-29); 220 until audit 26 hid tabnine (2026-10-30).
    assert.equal(snap.rows.length, 219);
  });

  it("reproduces every tool the live stress test returned", () => {
    const observed = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "src", "lib", "mcp", "stress-1026", "observed-tools.json"), "utf8"),
    ) as Record<string, unknown>[];
    assert.ok(observed.length >= 75);
    const bySlug = new Map(snap.rows.map((r) => [r.slug, r]));
    const changedByP13 = new Set([...audit10Slugs(), ...P13_FACT_FILES, ...P13C_CHANGED, ...AUDIT_15_PATCHED, ...AUDIT_17_BATCH, ...AUDIT_18_BATCH, ...AUDIT_19_BATCH, ...AUDIT_20_BATCH, ...AUDIT_25_FACT_SLUGS]);
    const diffs: string[] = [];
    for (const o of observed) {
      const moved = AUDIT_15_MOVES.get(o.slug as string) ?? AUDIT_22_MOVES.get(o.slug as string);
      const row = bySlug.get(moved ?? (o.slug as string));
      if (!row) {
        diffs.push(`${o.slug}: missing`);
        continue;
      }
      const ref = toPlatformRef(row, getToolFacts(row.slug)) as unknown as Record<string, unknown>;
      for (const key of Object.keys(o)) {
        if (changedByP13.has(row.slug) && P13_FIELDS.has(key)) continue;
        if (moved && AUDIT_15_FIELDS.has(key)) continue;
        if (AUDIT_22_RENAMED.has(row.slug) && AUDIT_22_FIELDS.has(key)) continue;
        if (JSON.stringify(ref[key]) !== JSON.stringify(o[key])) diffs.push(`${o.slug}.${key}: ${JSON.stringify(ref[key])} != ${JSON.stringify(o[key])}`);
      }
    }
    assert.deepEqual(diffs, []);
  });
});
