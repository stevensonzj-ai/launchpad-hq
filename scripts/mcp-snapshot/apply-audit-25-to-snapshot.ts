/**
 * One-off, tests only: applies catalog audit 25 (source verification, 2026-10-30)
 * to the committed src/lib/mcp/catalog-snapshot.json in place. No database,
 * no network. Idempotent.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-25-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import { AUDIT_25_PATCHES, audit25UpdateData, planAudit25 } from "../../src/data/catalog-audits/audit-25";

type Row = Record<string, unknown> & { slug: string; updatedAt: string };
const FILE = path.join(process.cwd(), "src/lib/mcp/catalog-snapshot.json");
const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as { built_from: string; rows: Row[] };
let changes = 0;
for (const patch of AUDIT_25_PATCHES) {
  const row = snap.rows.find((r) => r.slug === patch.slug);
  if (!row) continue;
  const data = audit25UpdateData(planAudit25(row as never, patch));
  if (Object.keys(data).length === 0) continue;
  Object.assign(row, data);
  row.updatedAt = "2026-10-30";
  changes += 1;
}
if (!snap.built_from.includes("audit 25")) snap.built_from += " + audit 25";
fs.writeFileSync(FILE, `${JSON.stringify(snap, null, 1)}\n`);
console.log(`audit25 snapshot: ${changes} rows changed`);
