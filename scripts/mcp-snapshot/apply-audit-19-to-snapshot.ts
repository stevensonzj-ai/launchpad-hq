/**
 * One-off, tests only: applies catalog audit 19 (stale facts batch 3 and the
 * batch-2 browser checks) to the committed src/lib/mcp/catalog-snapshot.json
 * in place, with the same diff function the DB runner uses, so the label
 * and MCP tests see the patched rows next to the new fact files. The new
 * antigravity-cli row is not added (the snapshot mirrors rows that existed
 * at export, as with audit 16's hermes-agent). No database, no network.
 * Idempotent: a second run changes nothing.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-19-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import { AUDIT_19_PATCHES, CHECKED_AT, audit19PatchData } from "../../src/data/catalog-audits/audit-19";

type Row = Record<string, unknown> & { slug: string; updatedAt: string };
type Snapshot = { note: string; built_from: string; db_rows: number; hidden_rows: string[]; rows: Row[] };

const FILE = path.join(process.cwd(), "src/lib/mcp/catalog-snapshot.json");

const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as Snapshot;
let changes = 0;
for (const patch of AUDIT_19_PATCHES) {
  const row = snap.rows.find((r) => r.slug === patch.slug);
  if (!row) continue;
  const data = audit19PatchData(row as never, patch);
  if (Object.keys(data).length === 0) continue;
  Object.assign(row, data);
  row.updatedAt = CHECKED_AT;
  changes += 1;
}
const builtFrom = snap.built_from.includes("17, 18 and 19") ? snap.built_from : snap.built_from.replace(" + audits 15, 17 and 18", " + audits 15, 17, 18 and 19");
fs.writeFileSync(FILE, `${JSON.stringify({ ...snap, built_from: builtFrom }, null, 1)}\n`);
console.log(`audit19 snapshot: ${changes} rows changed`);
