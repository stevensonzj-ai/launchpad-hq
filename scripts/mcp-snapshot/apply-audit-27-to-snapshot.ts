/**
 * One-off, tests only: applies catalog audit 27 (rows audit 25 left catalog_only, 2026-10-30)
 * and moves sora-2 (hidden in this audit) to hidden_rows
 * to the committed src/lib/mcp/catalog-snapshot.json in place. No database,
 * no network. Idempotent.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-27-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import { AUDIT_27_PATCHES, audit27UpdateData, planAudit27 } from "../../src/data/catalog-audits/audit-27";

type Row = Record<string, unknown> & { slug: string; updatedAt: string };
const FILE = path.join(process.cwd(), "src/lib/mcp/catalog-snapshot.json");
const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as { built_from: string; hidden_rows: string[]; rows: Row[] };
let changes = 0;
for (const patch of AUDIT_27_PATCHES) {
  const row = snap.rows.find((r) => r.slug === patch.slug);
  if (!row) continue;
  const data = audit27UpdateData(planAudit27(row as never, patch));
  if (Object.keys(data).length === 0) continue;
  Object.assign(row, data);
  row.updatedAt = "2026-10-30";
  changes += 1;
}
const sora = snap.rows.findIndex((r) => r.slug === "sora-2");
if (sora >= 0) snap.rows.splice(sora, 1);
if (!snap.hidden_rows.includes("sora-2")) snap.hidden_rows = [...snap.hidden_rows, "sora-2"].sort();
if (!snap.built_from.includes("audit 27")) snap.built_from += " + audit 27 (sora-2 hidden)";
fs.writeFileSync(FILE, `${JSON.stringify(snap, null, 1)}\n`);
console.log(`audit27 snapshot: ${changes} rows changed`);
