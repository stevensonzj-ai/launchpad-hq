/**
 * One-off, tests only: applies catalog audit 21 (batch-4 browser corrections)
 * to the committed src/lib/mcp/catalog-snapshot.json in place, with the same
 * diff function the DB runner uses, so the label and MCP tests see the
 * patched rows next to the new fact files. No database, no network.
 * Idempotent: a second run changes nothing. antigravity-cli is not in the
 * snapshot (audit 19 creates it), so it is skipped here.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-21-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import { AUDIT_21_PATCHES, CHECKED_AT, audit21PatchData } from "../../src/data/catalog-audits/audit-21";

type Row = Record<string, unknown> & { slug: string; updatedAt: string };
type Snapshot = { note: string; built_from: string; db_rows: number; hidden_rows: string[]; rows: Row[] };

const FILE = path.join(process.cwd(), "src/lib/mcp/catalog-snapshot.json");

const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as Snapshot;
let changes = 0;
for (const patch of AUDIT_21_PATCHES) {
  const row = snap.rows.find((r) => r.slug === patch.slug);
  if (!row) continue;
  const data = audit21PatchData(row as never, patch);
  if (Object.keys(data).length === 0) continue;
  Object.assign(row, data);
  row.updatedAt = CHECKED_AT;
  changes += 1;
}
const builtFrom = snap.built_from.includes("19, 20 and 21") ? snap.built_from : snap.built_from.replace(" + audits 15, 17, 18, 19 and 20", " + audits 15, 17, 18, 19, 20 and 21");
fs.writeFileSync(FILE, `${JSON.stringify({ ...snap, built_from: builtFrom }, null, 1)}\n`);
console.log(`audit21 snapshot: ${changes} rows changed`);
