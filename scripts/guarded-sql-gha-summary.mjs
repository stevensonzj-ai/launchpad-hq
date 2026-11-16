// Writes the GitHub job summary for the guarded-sql workflow and decides whether
// the run log is safe to upload. Prints nothing secret: only endpoint id, file,
// sha256, statement count and result. Secret values are read from env solely to
// verify the log does NOT contain them; they are never printed.
import { appendFileSync, existsSync, readFileSync } from "node:fs";

const logPath = process.env.GUARDED_SQL_LOG;
const out = process.env.GITHUB_OUTPUT;
const summary = process.env.GITHUB_STEP_SUMMARY;
const setOut = (k, v) => out && appendFileSync(out, `${k}=${v}\n`);

const raw = logPath && existsSync(logPath) ? readFileSync(logPath, "utf8") : "";
const needles = [];
const url = process.env.GUARDED_DATABASE_URL || "";
if (url) {
  needles.push(url);
  try {
    const u = new URL(url);
    if (u.password) needles.push(decodeURIComponent(u.password), u.password);
    if (u.username) needles.push(`${u.username}:`);
  } catch {
    /* unparsable: whole-string check only */
  }
}
if (process.env.NEON_API_KEY) needles.push(process.env.NEON_API_KEY);
if (process.env.NEON_PROD_API_KEY) needles.push(process.env.NEON_PROD_API_KEY);
const jwt = /eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/;
const clean = raw.length > 0 && !needles.some((n) => n && n.length >= 4 && raw.includes(n)) && !jwt.test(raw);
setOut("log_clean", clean ? "true" : "false");

const lines = raw.trim().split("\n").filter(Boolean);
let rec = null;
try {
  rec = lines.length ? JSON.parse(lines[lines.length - 1]) : null;
} catch {
  rec = null;
}
const esc = (s) => String(s ?? "").replace(/[|<>`\r\n]/g, "");
const snapName = process.env.GUARDED_SQL_SNAPSHOT_NAME || "";
const snapId = process.env.GUARDED_SQL_SNAPSHOT_ID || (rec && rec.snapshot_id) || "";
const snapLabel = snapName || (snapId ? "(supplied)" : "(none)");
const override = process.env.GUARDED_SQL_SCHEMA_OVERRIDE === "true";
const warning = override
  ? [
      "## WARNING: allow_schema_change is true",
      "",
      "The catalog statement guard was **skipped**. This production run may include DROP, TRUNCATE, DELETE, ALTER, CREATE, GRANT, REVOKE, or tables other than platforms and categories.",
      "Reviewer approval on `guarded-sql-production` is still required.",
      "",
    ].join("\n")
  : "";
const snapRows = [
  `| Snapshot name | ${esc(snapLabel)} |`,
  `| Snapshot branch ID | ${esc(snapId) || "(none)"} |`,
];
const md = rec
  ? [
      (warning ? warning + "\n" : "") + "## Guarded SQL",
      "",
      "| Field | Value |",
      "|---|---|",
      `| Endpoint ID | ${esc(rec.endpoint_id)} |`,
      `| File | ${esc(rec.file)} |`,
      `| SHA-256 | ${esc(rec.file_sha256)} |`,
      `| Statements | ${esc(rec.statement_count)} |`,
      ...snapRows,
      `| Result | ${rec.success ? (rec.dry_run ? "PASS (dry run)" : "PASS") : "FAILED / REFUSED"} |`,
      "",
      clean ? "Run log uploaded as a 3-day artifact." : "Run log NOT uploaded (missing or failed the secret check).",
    ].join("\n")
  : [
      (warning ? warning + "\n" : "") + "## Guarded SQL",
      "",
      "No run record was written (run did not reach the runner).",
      "",
      "| Field | Value |",
      "|---|---|",
      ...snapRows,
    ].join("\n");
console.log(`snapshot name: ${snapLabel}`);
console.log(`snapshot branch id: ${snapId || "(none)"}`);
if (summary) appendFileSync(summary, md + "\n");
console.log(clean ? "log secret check: clean" : "log secret check: not uploaded");