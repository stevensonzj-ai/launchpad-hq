/**
 * One-off, tests only: applies catalog audit 22 (held renames, 2026-10-30)
 * to the committed src/lib/mcp/catalog-snapshot.json in place, the same way
 * apply-audit-15-to-snapshot.ts does. Changes only slug / name / website on
 * the five renamed rows and the name references in other rows. No database,
 * no network. Idempotent: a second run changes nothing.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-22-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import {
  AUDIT_22_RENAMES,
  audit22RefUpdates,
  audit22UpdateData,
  planAudit22Fields,
} from "../../src/data/catalog-audits/audit-22";
import { REF_FIELDS } from "../../src/data/catalog-audits/audit-3-refs";

type Row = Record<string, unknown> & { slug: string; name: string; website: string | null; updatedAt: string };
type Snapshot = { note: string; built_from: string; db_rows: number; hidden_rows: string[]; rows: Row[] };

const FILE = path.join(process.cwd(), "src/lib/mcp/catalog-snapshot.json");
const AUDIT_22 = "2026-10-30";

const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as Snapshot;
const out = new Map(snap.rows.map((r) => [r.slug, r]));
let changes = 0;

for (const rename of AUDIT_22_RENAMES) {
  if (rename.from === rename.to) continue;
  const row = out.get(rename.from);
  if (!row || out.has(rename.to)) continue;
  out.delete(rename.from);
  row.slug = rename.to;
  out.set(rename.to, row);
  row.updatedAt = AUDIT_22;
  changes += 1;
}
for (const rename of AUDIT_22_RENAMES) {
  const row = out.get(rename.to);
  if (!row) continue;
  const data = audit22UpdateData(planAudit22Fields(row, rename));
  if (Object.keys(data).length) {
    Object.assign(row, data);
    row.updatedAt = AUDIT_22;
    changes += 1;
  }
}
for (const row of out.values()) {
  const refs = Object.fromEntries(REF_FIELDS.map((k) => [k, ((row as Record<string, unknown>)[k] as string[] | undefined) ?? []]));
  const updates = audit22RefUpdates(refs as never);
  if (updates.length === 0) continue;
  for (const u of updates) row[u.field] = u.to;
  row.updatedAt = AUDIT_22;
  changes += 1;
}

const rows = [...out.values()].sort((a, b) => a.slug.localeCompare(b.slug));
const builtFrom = snap.built_from.includes("audit 22") ? snap.built_from : `${snap.built_from} + audit 22`;
fs.writeFileSync(FILE, `${JSON.stringify({ ...snap, built_from: builtFrom, rows }, null, 1)}\n`);
console.log(`audit22 snapshot: ${changes} changes; listed ${rows.length}`);
