/**
 * One-off, tests only: applies catalog audit 20 (stale facts batch 4, the
 * batch-3 leftovers, Zach's decisions and the batch-3 browser check) to the committed src/lib/mcp/catalog-snapshot.json
 * in place, with the same diff function the DB runner uses, so the label
 * and MCP tests see the patched rows next to the new fact files. No
 * database, no network. Idempotent: a second run changes nothing.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-20-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import { AUDIT_20_PATCHES, CHECKED_AT, audit20PatchData } from "../../src/data/catalog-audits/audit-20";

type Row = Record<string, unknown> & { slug: string; updatedAt: string };
type Snapshot = { note: string; built_from: string; db_rows: number; hidden_rows: string[]; rows: Row[] };

const FILE = path.join(process.cwd(), "src/lib/mcp/catalog-snapshot.json");

const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as Snapshot;
let changes = 0;
for (const patch of AUDIT_20_PATCHES) {
  const row = snap.rows.find((r) => r.slug === patch.slug);
  if (!row) continue;
  const data = audit20PatchData(row as never, patch);
  if (Object.keys(data).length === 0) continue;
  Object.assign(row, data);
  row.updatedAt = CHECKED_AT;
  changes += 1;
}
const builtFrom = snap.built_from.includes("18, 19 and 20") ? snap.built_from : snap.built_from.replace(" + audits 15, 17, 18 and 19", " + audits 15, 17, 18, 19 and 20");
fs.writeFileSync(FILE, `${JSON.stringify({ ...snap, built_from: builtFrom }, null, 1)}\n`);
console.log(`audit20 snapshot: ${changes} rows changed`);
