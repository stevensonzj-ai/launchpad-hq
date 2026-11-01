/**
 * One-off, tests only: applies catalog audit 29 (Poe unhidden, 2026-11-01) to
 * the committed src/lib/mcp/catalog-snapshot.json in place: poe moves from
 * hidden_rows back to rows (taken from the pre-audit-28 snapshot, then patched)
 * and its pricing text is rewritten. No database, no network. Idempotent.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-29-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import { execFileSync } from "child_process";
import { AUDIT_29_PATCHES, audit29UpdateData, planAudit29 } from "../../src/data/catalog-audits/audit-29";

type Row = Record<string, unknown> & { slug: string; updatedAt: string };
const REL = "src/lib/mcp/catalog-snapshot.json";
const FILE = path.join(process.cwd(), REL);
const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as { built_from: string; db_rows: number; hidden_rows: string[]; rows: Row[] };

let restored = 0;
if (!snap.rows.some((r) => r.slug === "poe")) {
  // The row as it stood before audit 28 moved it out (git history, no network).
  const before = JSON.parse(execFileSync("git", ["show", `2a521eb8^:${REL}`], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })) as { rows: Row[] };
  const row = before.rows.find((r) => r.slug === "poe");
  if (!row) throw new Error("poe not found in the pre-audit-28 snapshot");
  snap.rows.push(row);
  snap.rows.sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
  restored += 1;
}
snap.hidden_rows = snap.hidden_rows.filter((s) => s !== "poe");

let changes = 0;
for (const patch of AUDIT_29_PATCHES) {
  const row = snap.rows.find((r) => r.slug === patch.slug);
  if (!row) continue;
  const data = audit29UpdateData(planAudit29(row as never, patch));
  if (Object.keys(data).length === 0) continue;
  Object.assign(row, data);
  row.updatedAt = "2026-11-01";
  changes += 1;
}
if (!snap.built_from.includes("audit 29")) snap.built_from += " + audit 29 (poe unhidden)";
fs.writeFileSync(FILE, `${JSON.stringify(snap, null, 1)}\n`);
console.log(`audit29 snapshot: ${restored} restored, ${changes} rows changed`);
