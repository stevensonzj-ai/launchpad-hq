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
const clean = raw.length > 0 && !needles.some((n) => n && n.length >= 4 && raw.includes(n));
setOut("log_clean", clean ? "true" : "false");

const lines = raw.trim().split("\n").filter(Boolean);
let rec = null;
try {
  rec = lines.length ? JSON.parse(lines[lines.length - 1]) : null;
} catch {
  rec = null;
}
const esc = (s) => String(s ?? "").replace(/[|<>`\r\n]/g, "");
const md = rec
  ? [
      "## Guarded SQL",
      "",
      "| Field | Value |",
      "|---|---|",
      `| Endpoint ID | ${esc(rec.endpoint_id)} |`,
      `| File | ${esc(rec.file)} |`,
      `| SHA-256 | ${esc(rec.file_sha256)} |`,
      `| Statements | ${esc(rec.statement_count)} |`,
      `| Result | ${rec.success ? (rec.dry_run ? "PASS (dry run)" : "PASS") : "FAILED / REFUSED"} |`,
      "",
      clean ? "Run log uploaded as a 3-day artifact." : "Run log NOT uploaded (missing or failed the secret check).",
    ].join("\n")
  : "## Guarded SQL\n\nNo run record was written (run did not reach the runner).";
if (summary) appendFileSync(summary, md + "\n");
console.log(clean ? "log secret check: clean" : "log secret check: not uploaded");