/**
 * One-off, tests only: applies catalog audit 15 (guide PR D) to the committed
 * src/lib/mcp/catalog-snapshot.json in place, exactly as step 7 of
 * build-catalog-snapshot.ts does, for when the 2026-10-15 export that a full
 * rebuild needs is not at hand. No database, no network. Idempotent: a
 * second run changes nothing.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-15-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import {
  AUDIT_15_RENAMES,
  audit15RefUpdates,
  audit15UpdateData,
  planAudit15Fields,
} from "../../src/data/catalog-audits/audit-15";
import { REF_FIELDS } from "../../src/data/catalog-audits/audit-3-refs";
import { hiddenPlatformSlugs } from "../../src/lib/catalog-visibility";

type Row = Record<string, unknown> & { slug: string; name: string; website: string | null; updatedAt: string };
type Snapshot = { note: string; built_from: string; db_rows: number; hidden_rows: string[]; rows: Row[] };

const FILE = path.join(process.cwd(), "src/lib/mcp/catalog-snapshot.json");
const AUDIT_15 = "2026-10-29";

const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as Snapshot;
const out = new Map(snap.rows.map((r) => [r.slug, r]));
let changes = 0;

for (const rename of AUDIT_15_RENAMES) {
  const row = out.get(rename.from);
  if (!row || out.has(rename.to)) continue;
  out.delete(rename.from);
  row.slug = rename.to;
  out.set(rename.to, row);
  row.updatedAt = AUDIT_15;
  changes += 1;
}
for (const rename of AUDIT_15_RENAMES) {
  const row = out.get(rename.to);
  if (!row) continue;
  const data = audit15UpdateData(planAudit15Fields(row, rename));
  if (Object.keys(data).length) {
    Object.assign(row, data);
    row.updatedAt = AUDIT_15;
    changes += 1;
  }
}
for (const row of out.values()) {
  // Some replayed rows lack a reference column; treat it as empty.
  const refs = Object.fromEntries(REF_FIELDS.map((k) => [k, ((row as Record<string, unknown>)[k] as string[] | undefined) ?? []]));
  const updates = audit15RefUpdates(refs as never);
  if (updates.length === 0) continue;
  for (const u of updates) row[u.field] = u.to;
  row.updatedAt = AUDIT_15;
  changes += 1;
}

// Rows the code now hides (clarifai) leave the listed rows, as loadCatalog does.
const hidden = new Set(hiddenPlatformSlugs());
const nowHidden = [...out.keys()].filter((s) => hidden.has(s));
const listed = [...out.values()].filter((r) => !hidden.has(r.slug)).sort((a, b) => a.slug.localeCompare(b.slug));
const next: Snapshot = {
  ...snap,
  built_from: "xlsx + seed scripts + catalog audits 1-11 + audit 15 renames + local export 2026-10-15",
  hidden_rows: [...new Set([...snap.hidden_rows, ...nowHidden])].sort(),
  rows: listed,
};
fs.writeFileSync(FILE, `${JSON.stringify(next, null, 1)}\n`);
console.log(`audit15 snapshot: ${changes} changes; listed ${listed.length}; hidden ${next.hidden_rows.join(", ")}`);
