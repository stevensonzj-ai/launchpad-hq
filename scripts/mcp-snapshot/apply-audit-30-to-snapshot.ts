/**
 * One-off, tests only: applies catalog audit 30 (hedra hidden at the vendor's
 * request, 2026-11-01) to the committed src/lib/mcp/catalog-snapshot.json in
 * place: hedra moves from rows to hidden_rows. No database, no network.
 * Idempotent.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-30-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import { AUDIT_30_HIDDEN } from "../../src/data/catalog-audits/audit-30";

type Row = Record<string, unknown> & { slug: string };
const FILE = path.join(process.cwd(), "src/lib/mcp/catalog-snapshot.json");
const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as { built_from: string; hidden_rows: string[]; rows: Row[] };
let hidden = 0;
for (const slug of Object.keys(AUDIT_30_HIDDEN)) {
  const i = snap.rows.findIndex((r) => r.slug === slug);
  if (i >= 0) {
    snap.rows.splice(i, 1);
    hidden += 1;
  }
  if (!snap.hidden_rows.includes(slug)) snap.hidden_rows = [...snap.hidden_rows, slug].sort();
}
if (!snap.built_from.includes("audit 30")) snap.built_from += " + audit 30 (hedra hidden)";
fs.writeFileSync(FILE, `${JSON.stringify(snap, null, 1)}\n`);
console.log(`audit30 snapshot: ${hidden} moved to hidden_rows`);
