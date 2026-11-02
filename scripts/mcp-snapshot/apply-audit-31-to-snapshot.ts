/**
 * One-off, tests only: applies catalog audit 31 (2026-11-02) to the committed
 * src/lib/mcp/catalog-snapshot.json in place: rewrites the patched text fields
 * on the listed rows. No database, no network. Idempotent.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-31-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import { audit31PatchesFor, audit31Slugs, audit31UpdateData, planAudit31 } from "../../src/data/catalog-audits/audit-31";

type Row = Record<string, unknown> & { slug: string; updatedAt: string };
const FILE = path.join(process.cwd(), "src/lib/mcp/catalog-snapshot.json");
const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as { built_from: string; db_rows: number; hidden_rows: string[]; rows: Row[] };

let changes = 0;
for (const slug of audit31Slugs()) {
  const row = snap.rows.find((r) => r.slug === slug);
  if (!row) {
    // antigravity-cli is a production row that the committed snapshot never had; adding a
    // listing to the snapshot is out of scope for this audit.
    console.warn(`snapshot has no row for ${slug}; skipped`);
    continue;
  }
  const plans = planAudit31(row as never, audit31PatchesFor(slug));
  const bad = plans.filter((p) => p.action === "differs");
  if (bad.length) throw new Error(`${slug}: ${bad.map((p) => p.field).join(", ")} differs from the expected old value`);
  const data = audit31UpdateData(plans);
  if (Object.keys(data).length === 0) continue;
  Object.assign(row, data);
  row.updatedAt = "2026-11-02";
  changes += 1;
}
if (!snap.built_from.includes("audit 31")) snap.built_from += " + audit 31 (Claude Max/Ultra, Pika H3 Flex, Antigravity plugins, Kimi 3D Make)";
fs.writeFileSync(FILE, `${JSON.stringify(snap, null, 1)}\n`);
console.log(`audit31 snapshot: ${changes} rows changed`);
