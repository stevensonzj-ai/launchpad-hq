/**
 * One-off, tests only: applies catalog audit 32 (2026-11-02) to the committed
 * src/lib/mcp/catalog-snapshot.json in place: adds the new pipecat row (same
 * fields an existing row carries, in slug order), appends "Pipecat" to
 * deepgram's complementaryTools, and counts the row in db_rows. No database,
 * no network. Idempotent: a second run changes nothing.
 *
 * Usage: npx tsx scripts/mcp-snapshot/apply-audit-32-to-snapshot.ts
 */
import * as fs from "fs";
import * as path from "path";
import {
  CHECKED_AT,
  DEEPGRAM_SLUG,
  PIPECAT_CATEGORY_SLUG,
  PIPECAT_ROW,
  PIPECAT_SLUG,
  deepgramComplementaryAfter,
} from "../../src/data/catalog-audits/audit-32";

type Row = Record<string, unknown> & { slug: string; updatedAt: string };
const FILE = path.join(process.cwd(), "src/lib/mcp/catalog-snapshot.json");
const snap = JSON.parse(fs.readFileSync(FILE, "utf8")) as { built_from: string; db_rows: number; hidden_rows: string[]; rows: Row[] };

let changes = 0;

const deepgram = snap.rows.find((r) => r.slug === DEEPGRAM_SLUG);
if (!deepgram) throw new Error("snapshot has no deepgram row");
const next = deepgramComplementaryAfter(deepgram.complementaryTools as string[]);
if (next) {
  deepgram.complementaryTools = next;
  deepgram.updatedAt = CHECKED_AT;
  changes += 1;
}

if (!snap.rows.some((r) => r.slug === PIPECAT_SLUG)) {
  // Same keys as an existing row of the same category (the export drops columns the feed never reads).
  const keys = Object.keys(deepgram).filter((k) => k !== "category" && k !== "updatedAt");
  const row: Record<string, unknown> = {};
  for (const key of keys) row[key] = (PIPECAT_ROW as Record<string, unknown>)[key] ?? null;
  const categoryName = (deepgram.category as { name: string }).name;
  row.updatedAt = CHECKED_AT;
  row.category = { slug: PIPECAT_CATEGORY_SLUG, name: categoryName };
  const at = snap.rows.findIndex((r) => r.slug > PIPECAT_SLUG);
  snap.rows.splice(at < 0 ? snap.rows.length : at, 0, row as Row);
  snap.db_rows += 1;
  changes += 1;
}

if (!snap.built_from.includes("audit 32")) snap.built_from += " + audit 32 (pipecat added, deepgram complementaryTools)";
fs.writeFileSync(FILE, `${JSON.stringify(snap, null, 1)}\n`);
console.log(`audit32 snapshot: ${changes} changes`);
