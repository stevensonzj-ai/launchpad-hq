/**
 * One-off, tests only: applies catalog audit 33 (2026-11-02) to the committed
 * src/lib/mcp/catalog-snapshot.json in place: rewrites pipecat's description.
 * No database, no network. Idempotent.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-33-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import { audit33PatchesFor, audit33Slugs, audit33UpdateData, planAudit33 } from "../../src/data/catalog-audits/audit-33";

type Row = Record<string, unknown> & { slug: string; updatedAt: string };
const FILE = path.join(process.cwd(), "src/lib/mcp/catalog-snapshot.json");
const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as { built_from: string; db_rows: number; hidden_rows: string[]; rows: Row[] };

let changes = 0;
for (const slug of audit33Slugs()) {
  const row = snap.rows.find((r) => r.slug === slug);
  if (!row) throw new Error(`snapshot has no row for ${slug}`);
  const plans = planAudit33(row as never, audit33PatchesFor(slug));
  const bad = plans.filter((p) => p.action === "differs");
  if (bad.length) throw new Error(`${slug}: ${bad.map((p) => p.field).join(", ")} differs from the expected old value`);
  const data = audit33UpdateData(plans);
  if (Object.keys(data).length === 0) continue;
  Object.assign(row, data);
  row.updatedAt = "2026-11-02";
  changes += 1;
}
if (!snap.built_from.includes("audit 33")) snap.built_from += " + audit 33 (Pipecat description)";
fs.writeFileSync(FILE, `${JSON.stringify(snap, null, 1)}\n`);
console.log(`audit33 snapshot: ${changes} rows changed`);
