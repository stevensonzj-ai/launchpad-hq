/**
 * One-off, tests only: applies catalog audit 24 (leftover strings, 2026-10-30)
 * to the committed src/lib/mcp/catalog-snapshot.json in place. No database,
 * no network. Idempotent.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-24-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import { AUDIT_24_PATCHES, audit24UpdateData, planAudit24 } from "../../src/data/catalog-audits/audit-24";

type Row = Record<string, unknown> & { slug: string; updatedAt: string };
const FILE = path.join(process.cwd(), "src/lib/mcp/catalog-snapshot.json");
const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as { built_from: string; rows: Row[] };
let changes = 0;
for (const patch of AUDIT_24_PATCHES) {
  const row = snap.rows.find((r) => r.slug === patch.slug);
  if (!row) continue;
  const data = audit24UpdateData(planAudit24(row as never, patch));
  if (Object.keys(data).length === 0) continue;
  Object.assign(row, data);
  row.updatedAt = "2026-10-30";
  changes += 1;
}
if (!snap.built_from.includes("audit 24")) snap.built_from += " + audit 24";
fs.writeFileSync(FILE, `${JSON.stringify(snap, null, 1)}\n`);
console.log(`audit24 snapshot: ${changes} rows changed`);
