/**
 * Export the content tracker workbook: one row per platform, one row per
 * tutorial / workflow / comparison page, plus Summary and Notes sheets.
 *
 * Usage:
 *   npm run export:content-tracker -- [--out <path>] [--audit <file.json|file.csv>]
 *                                     [--sitemap-url <url>] [--no-sitemap]
 *                                     [--confirm-production]
 *
 * Read-only. Opens one transaction with SET TRANSACTION READ ONLY and runs
 * SELECTs only. Gate G1 (src/lib/prod-guard.ts) still applies: production
 * needs --confirm-production plus CONFIRM_PROD_HOST, same as the write
 * scripts. DATABASE_URL is never printed.
 *
 * Default output: ../launchpadhq/docs/planning/launchpad-content-tracker-YYYY-MM-DD.xlsx
 * (relative to the repo root) when that folder exists, else ./docs/planning/.
 * See docs/content-tracker.md.
 */
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

import ExcelJS from "exceljs";
import { Client } from "pg";

import { checkTargetHost } from "../src/lib/prod-guard";
import { listRegisteredToolFacts } from "../src/data/facts";
import type { ToolFacts } from "../src/data/facts/types";
import { listRegisteredTutorials } from "../src/data/tutorials";
import { COMPARE_PAGES } from "../src/data/compare/pages";
import { getAllWorkflows } from "../src/data/workflows";
import { hiddenPlatformSlugs } from "../src/lib/catalog-visibility";
import {
  AMBER_DAYS,
  CONTENT_COLUMNS,
  DEFAULT_SITEMAP_URL,
  PLATFORM_COLUMNS,
  STALE_DAYS,
  buildContentItems,
  buildContentRows,
  buildPlatformRows,
  buildSummary,
  chicagoDate,
  dataGaps,
  fieldDefinitions,
  isSitemapIndex,
  normalizePath,
  parseAuditFile,
  parseSitemapLocs,
  type CellValue,
  type ColumnDef,
  type PlatformRecord,
  type TrackerSummary,
} from "../src/lib/content-tracker";

const REPO_ROOT = path.resolve(__dirname, "..");
const FILE_PREFIX = "launchpad-content-tracker-";

// ── Args ────────────────────────────────────────────────────

type Args = { out: string | null; audit: string | null; sitemapUrl: string; noSitemap: boolean };

function argValue(argv: readonly string[], flag: string): string | null {
  const i = argv.indexOf(flag);
  if (i < 0) return null;
  const v = argv[i + 1];
  if (!v || v.startsWith("--")) fail(`${flag} needs a value.`);
  return v;
}

function parseArgs(argv: readonly string[]): Args {
  return {
    out: argValue(argv, "--out"),
    audit: argValue(argv, "--audit"),
    sitemapUrl: argValue(argv, "--sitemap-url") ?? DEFAULT_SITEMAP_URL,
    noSitemap: argv.includes("--no-sitemap"),
  };
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function defaultOutPath(now: Date): string {
  const sibling = path.resolve(REPO_ROOT, "..", "launchpadhq", "docs", "planning");
  const dir = fs.existsSync(sibling) ? sibling : path.join(REPO_ROOT, "docs", "planning");
  return path.join(dir, `${FILE_PREFIX}${chicagoDate(now)}.xlsx`);
}

// ── Database (read-only) ────────────────────────────────────

function getDirectUrl(): string {
  const raw = process.env.DATABASE_URL || "";
  if (raw.startsWith("prisma+postgres://")) {
    try {
      const url = new URL(raw);
      const key = url.searchParams.get("api_key") || "";
      const padded = key + "=".repeat((4 - (key.length % 4)) % 4);
      const decoded = JSON.parse(Buffer.from(padded, "base64url").toString());
      return decoded.databaseUrl;
    } catch {
      /* fall through */
    }
  }
  return raw;
}

function hostnameOnly(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname || null;
  } catch {
    return null;
  }
}

type PlatformSql = Omit<
  PlatformRecord,
  "approvedPrompts" | "pendingPrompts" | "approvedDiscussions" | "pendingDiscussions"
> & { id: string };

type CountSql = { platformId: string; status: string; n: number };

async function readDatabase(connectionString: string): Promise<PlatformRecord[]> {
  const client = new Client({ connectionString });
  await client.connect();
  try {
    await client.query("BEGIN");
    await client.query("SET TRANSACTION READ ONLY");
    await client.query("SET LOCAL statement_timeout = '60s'");

    const platforms = await client.query<PlatformSql>(`
      SELECT p.id, p.slug, p.name, p.website, p.description,
             c.name AS "categoryName", c.slug AS "categorySlug",
             p."costTier"::text AS "costTier", p."currentPricing",
             p."apiAvailable", p.verified, p."updatedAt"
      FROM platforms p
      JOIN categories c ON c.id = p."categoryId"
      ORDER BY p.name`);
    const prompts = await client.query<CountSql>(
      `SELECT "platformId", status::text AS status, count(*)::int AS n FROM prompts GROUP BY 1, 2`,
    );
    const discussions = await client.query<CountSql>(
      `SELECT "platformId", status::text AS status, count(*)::int AS n FROM discussions GROUP BY 1, 2`,
    );
    await client.query("ROLLBACK");

    const count = (rows: CountSql[], id: string, status: string) =>
      rows.find((r) => r.platformId === id && r.status === status)?.n ?? 0;

    return platforms.rows.map(({ id, ...p }) => ({
      ...p,
      approvedPrompts: count(prompts.rows, id, "APPROVED"),
      pendingPrompts: count(prompts.rows, id, "PENDING"),
      approvedDiscussions: count(discussions.rows, id, "APPROVED"),
      pendingDiscussions: count(discussions.rows, id, "PENDING"),
    }));
  } catch (err) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw err;
  } finally {
    await client.end();
  }
}

// ── Sitemap ─────────────────────────────────────────────────

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.text();
}

async function fetchSitemapPaths(url: string): Promise<Set<string>> {
  const xml = await fetchText(url);
  const locs = isSitemapIndex(xml)
    ? (await Promise.all(parseSitemapLocs(xml).map(async (child) => parseSitemapLocs(await fetchText(child))))).flat()
    : parseSitemapLocs(xml);
  return new Set(locs.map(normalizePath));
}

// ── Workbook ────────────────────────────────────────────────

const FILL_AMBER = "FFFFE699";
const FILL_RED = "FFF4B6B6";
const HEADER_FILL = "FFD9E1F2";

function fill(argb: string): ExcelJS.Fill {
  return { type: "pattern", pattern: "solid", fgColor: { argb }, bgColor: { argb } };
}

function colLetter(index1: number): string {
  let n = index1;
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function styleHeader(row: ExcelJS.Row): void {
  row.font = { bold: true };
  row.alignment = { vertical: "middle", wrapText: true };
  row.eachCell((cell) => {
    cell.fill = fill(HEADER_FILL);
  });
}

export function addTableSheet<K extends string>(
  wb: ExcelJS.Workbook,
  name: string,
  columns: readonly ColumnDef<K>[],
  rows: readonly Record<K, CellValue>[],
): ExcelJS.Worksheet {
  const ws = wb.addWorksheet(name, { views: [{ state: "frozen", ySplit: 1 }] });
  ws.columns = columns.map((c) => ({
    header: c.header,
    key: c.key,
    width: c.width,
    style: c.kind === "date" ? { numFmt: "yyyy-mm-dd" } : c.kind === "text" ? { alignment: { wrapText: false } } : {},
  }));
  for (const r of rows) {
    const values: Record<string, CellValue | { text: string; hyperlink: string }> = { ...r };
    for (const c of columns) {
      const v = r[c.key];
      if (c.kind === "url" && typeof v === "string" && /^https?:\/\//.test(v)) values[c.key] = { text: v, hyperlink: v };
    }
    ws.addRow(values);
  }
  styleHeader(ws.getRow(1));
  columns.forEach((c, i) => {
    if (c.blankReason) ws.getRow(1).getCell(i + 1).note = `Always blank: ${c.blankReason}`;
  });
  ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: columns.length } };

  const last = Math.max(rows.length + 1, 2);
  const daysIdx = columns.findIndex((c) => c.key === "daysSinceUpdate");
  if (daysIdx >= 0) {
    const col = colLetter(daysIdx + 1);
    ws.addConditionalFormatting({
      ref: `${col}2:${col}${last}`,
      rules: [
        { type: "cellIs", operator: "greaterThan", formulae: [String(STALE_DAYS)], priority: 1, style: { fill: fill(FILL_RED) } },
        { type: "cellIs", operator: "greaterThan", formulae: [String(AMBER_DAYS)], priority: 2, style: { fill: fill(FILL_AMBER) } },
      ],
    });
  }
  const staleIdx = columns.findIndex((c) => c.key === "stale");
  if (staleIdx >= 0) {
    const col = colLetter(staleIdx + 1);
    ws.addConditionalFormatting({
      ref: `${col}2:${col}${last}`,
      rules: [{ type: "cellIs", operator: "equal", formulae: ['"Y"'], priority: 3, style: { fill: fill(FILL_RED) } }],
    });
  }
  return ws;
}

export function addSummarySheet(wb: ExcelJS.Workbook, s: TrackerSummary): ExcelJS.Worksheet {
  const ws = wb.addWorksheet("Summary", { views: [{ state: "frozen", ySplit: 1 }] });
  ws.columns = [{ width: 44 }, { width: 22 }, { width: 14 }, { width: 60 }];
  const section = (title: string, headers?: string[]) => {
    ws.addRow([]);
    ws.addRow([title]).font = { bold: true, size: 12 };
    if (headers) styleHeader(ws.addRow(headers));
  };

  styleHeader(ws.addRow(["Metric", "Value"]));
  const metrics: [string, string | number][] = [
    ["Generated (America/Chicago)", s.generatedAt],
    ["Platforms", s.platformCount],
    ["Listed platforms", s.listedPlatformCount],
    ["Hidden platforms", s.hiddenPlatformCount],
    ["Content items", s.contentCount],
    ...s.contentByType.map(([t, n]) => [`Content: ${t}`, n] as [string, number]),
    ["Stale platforms", s.stalePlatforms],
    ["% platforms stale", `${s.stalePlatformPct}%`],
    ["Dated content items", s.datedContent],
    ["Stale content items", s.staleContent],
    ["% content stale (of dated items)", s.staleContentPct === null ? "n/a (no dated content)" : `${s.staleContentPct}%`],
    ["Undated content items (excluded from %)", s.undatedContent],
    ["Platforms with no content beyond overview", s.noContentPlatforms.length],
    ["Platforms with empty description", s.emptyDescriptions.length],
    ["Affiliate but no disclosure", s.disclosureGaps.length],
    ["Stale threshold (days)", STALE_DAYS],
  ];
  for (const m of metrics) ws.addRow(m);

  section("Platforms by category", ["Category", "Platforms", "Stale"]);
  for (const r of s.platformsByCategory) ws.addRow(r);

  section(`Top ${s.topStale.length} most-stale platforms`, ["Platform", "Slug", "Days since update", "Notes"]);
  for (const t of s.topStale) ws.addRow([t.name, t.slug, t.days ?? "no date", t.notes ?? ""]);

  section("Platforms with no content beyond overview", ["Platform", "Slug", "", "Category"]);
  for (const p of s.noContentPlatforms) ws.addRow([p.name, p.slug, "", p.category]);

  section("Platforms with empty description", ["Platform", "Slug"]);
  for (const p of s.emptyDescriptions) ws.addRow([p.name, p.slug]);

  section("Affiliate link but no disclosure", ["Page", "Slug", "", "Missing"]);
  for (const g of s.disclosureGaps) ws.addRow([g.where, g.slug, "", g.missing.join(", ")]);

  return ws;
}

export function addNotesSheet(wb: ExcelJS.Workbook, gaps: ReturnType<typeof dataGaps>): ExcelJS.Worksheet {
  const ws = wb.addWorksheet("Notes", { views: [{ state: "frozen", ySplit: 1 }] });
  ws.columns = [{ width: 14 }, { width: 44 }, { width: 100 }];
  styleHeader(ws.addRow(["Sheet", "Column", "Source / definition"]));
  for (const d of fieldDefinitions()) ws.addRow([d.sheet, d.column, d.source]);
  ws.addRow([]);
  ws.addRow(["Data gaps"]).font = { bold: true, size: 12 };
  styleHeader(ws.addRow(["", "Item", "Detail"]));
  for (const g of gaps) ws.addRow(["", g.item, g.detail]);
  ws.addRow([]);
  ws.addRow(["", "Stale rule", `Platforms: stale when the newest dated change is over ${STALE_DAYS} days old, there is no dated change, or the platform has no sourced facts. Content: stale when over ${STALE_DAYS} days old. Days-since cells are amber over ${AMBER_DAYS} and red over ${STALE_DAYS}.`]);
  ws.getColumn(3).alignment = { wrapText: true, vertical: "top" };
  return ws;
}

// ── Main ────────────────────────────────────────────────────

async function main() {
  const argv = process.argv.slice(2);
  const args = parseArgs(argv);
  const now = new Date();

  if (!process.env.DATABASE_URL) fail("DATABASE_URL is not set. Aborting.");
  const directUrl = getDirectUrl();
  const host = hostnameOnly(directUrl) ?? hostnameOnly(process.env.DATABASE_URL);
  const target = checkTargetHost(host, process.argv, process.env);
  if (!target.ok) fail(target.reason);

  let audit: Map<string, string> | null = null;
  if (args.audit) {
    const file = path.resolve(args.audit);
    if (!fs.existsSync(file)) fail(`Audit file not found: ${file}`);
    const format = /\.csv$/i.test(file) ? "csv" : "json";
    try {
      audit = parseAuditFile(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""), format);
    } catch (err) {
      fail(`Could not parse audit file: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  let sitemapPaths: Set<string> | null = null;
  let sitemapError: string | null = null;
  if (!args.noSitemap) {
    try {
      sitemapPaths = await fetchSitemapPaths(args.sitemapUrl);
    } catch (err) {
      sitemapError = err instanceof Error ? err.message : String(err);
    }
  }

  let platforms: PlatformRecord[];
  try {
    platforms = await readDatabase(directUrl);
  } catch (err) {
    // pg error messages do not include the connection string.
    fail(`Database read failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  const input = {
    platforms,
    facts: new Map<string, ToolFacts>(listRegisteredToolFacts().map((f) => [f.slug, f])),
    tutorials: listRegisteredTutorials(),
    comparePages: COMPARE_PAGES,
    workflows: getAllWorkflows(),
    hiddenSlugs: new Set(hiddenPlatformSlugs()),
    sitemapPaths,
    audit,
    now,
  };
  const items = buildContentItems(input);
  const platformRows = buildPlatformRows(input, items);
  const contentRows = buildContentRows(input, items);
  const summary = buildSummary(platformRows, contentRows, now);
  const gaps = dataGaps({ auditProvided: audit !== null, sitemapError, sitemapSkipped: args.noSitemap });

  const wb = new ExcelJS.Workbook();
  wb.creator = "Launchpad HQ export:content-tracker";
  wb.created = now;
  const platformSheet = addTableSheet(wb, "Platforms", PLATFORM_COLUMNS, platformRows.map((p) => p.row));
  const contentSheet = addTableSheet(wb, "Content", CONTENT_COLUMNS, contentRows.map((c) => c.row));
  const summarySheet = addSummarySheet(wb, summary);
  const notesSheet = addNotesSheet(wb, gaps);

  const out = path.resolve(args.out ?? defaultOutPath(now));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await wb.xlsx.writeFile(out);

  const dataRows = (ws: ExcelJS.Worksheet) => Math.max(ws.rowCount - 1, 0);
  console.log("Rows per sheet:");
  console.log(`  Platforms: ${dataRows(platformSheet)}`);
  console.log(`  Content:   ${dataRows(contentSheet)}`);
  console.log(`  Summary:   ${dataRows(summarySheet)}`);
  console.log(`  Notes:     ${dataRows(notesSheet)}`);
  console.log(`Platforms: ${summary.platformCount}`);
  console.log(`Content items: ${summary.contentCount}`);
  console.log(`% platforms stale: ${summary.stalePlatformPct}%`);
  console.log(`% content stale: ${summary.staleContentPct === null ? "n/a" : `${summary.staleContentPct}%`} (of ${summary.datedContent} dated)`);
  console.log("Top 5 stale:");
  for (const t of summary.topStale.slice(0, 5)) console.log(`  ${t.name} (${t.slug}): ${t.days ?? "no date"}`);
  console.log(`Platforms with no content beyond overview: ${summary.noContentPlatforms.length}`);
  console.log(`Output: ${out}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  });
}
