/**
 * One-off, tests only: applies catalog audit 28 (rows audit 27 left open,
 * 2026-11-01) and moves naver-hyperclova-x-cue, genspark and poe (hidden in
 * this audit) to hidden_rows in the committed src/lib/mcp/catalog-snapshot.json
 * in place. No database, no network. Idempotent.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-28-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import { AUDIT_28_HIDDEN, AUDIT_28_PATCHES, audit28UpdateData, planAudit28 } from "../../src/data/catalog-audits/audit-28";

type Row = Record<string, unknown> & { slug: string; updatedAt: string };
const FILE = path.join(process.cwd(), "src/lib/mcp/catalog-snapshot.json");
const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as { built_from: string; hidden_rows: string[]; rows: Row[] };
let changes = 0;
for (const patch of AUDIT_28_PATCHES) {
  const row = snap.rows.find((r) => r.slug === patch.slug);
  if (!row) continue;
  const data = audit28UpdateData(planAudit28(row as never, patch));
  if (Object.keys(data).length === 0) continue;
  Object.assign(row, data);
  row.updatedAt = "2026-11-01";
  changes += 1;
}
let hidden = 0;
for (const slug of Object.keys(AUDIT_28_HIDDEN)) {
  const i = snap.rows.findIndex((r) => r.slug === slug);
  if (i >= 0) {
    snap.rows.splice(i, 1);
    hidden += 1;
  }
  if (!snap.hidden_rows.includes(slug)) snap.hidden_rows = [...snap.hidden_rows, slug].sort();
}
if (!snap.built_from.includes("audit 28")) snap.built_from += " + audit 28 (naver-hyperclova-x-cue, genspark, poe hidden)";
fs.writeFileSync(FILE, `${JSON.stringify(snap, null, 1)}\n`);
console.log(`audit28 snapshot: ${changes} rows changed, ${hidden} moved to hidden_rows`);
