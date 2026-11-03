/**
 * Copy preview -> the separate launchpad-test Neon project (Option C).
 *   - reads preview ONLY as launchpad_ro (read-only role, read-only transactions)
 *   - schema for everything in public; data only for catalog tables; user tables get fake rows
 *   - refuses any target in the production project (static list + Neon API proof)
 * Inputs (env only): PREVIEW_RO_URL, TEST_PROJECT_URL, TEST_PROJECT_ID, NEON_API_KEY, RESET_TARGET=true|false.
 * Meant to run in the "guarded-sql-test" GitHub environment (see .github/workflows/test-project-copy.yml).
 * Never prints a URL, password or key.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  CATALOG_TABLES, checkInputs, classifyTables, GuardError, isUserTable, redact, verifyTargetProject,
} from "../../src/lib/test-project/guard";

const env = process.env;
const SECRETS = [env.PREVIEW_RO_URL, env.TEST_PROJECT_URL, env.NEON_API_KEY];
const say = (m: string) => console.log(redact(m, SECRETS));

function run(cmd: string, args: string[], extraEnv: Record<string, string> = {}): string {
  try {
    return execFileSync(cmd, args, { env: { ...env, ...extraEnv }, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 256 * 1024 * 1024 });
  } catch (e) {
    const err = e as { stderr?: string; message?: string };
    throw new Error(redact(`${cmd} failed: ${err.stderr || err.message || "unknown error"}`, SECRETS));
  }
}
const psql = (url: string, sql: string) => run("psql", ["--no-psqlrc", "-v", "ON_ERROR_STOP=1", "-At", "-d", url, "-c", sql]);
const psqlFile = (url: string, file: string) => run("psql", ["--no-psqlrc", "-v", "ON_ERROR_STOP=1", "-q", "-d", url, "-f", file]);

async function main() {
  const checked = checkInputs({ previewUrl: env.PREVIEW_RO_URL, testUrl: env.TEST_PROJECT_URL, testProjectId: env.TEST_PROJECT_ID });
  await verifyTargetProject(checked, env.NEON_API_KEY, fetch as never);
  say(`Source: preview ${checked.source.endpointId} as ${checked.source.user}. Target: ${checked.target.endpointId} in project ${checked.testProjectId}.`);
  const src = env.PREVIEW_RO_URL!.trim();
  const dst = env.TEST_PROJECT_URL!.trim();

  // Source must really be read-only.
  const ro = psql(src, "SHOW transaction_read_only").trim();
  if (ro !== "on") throw new GuardError("source session is not read-only; refusing");

  const tables = psql(src, "SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY 1").split("\n").filter(Boolean);
  const { catalog, structureOnly } = classifyTables(tables);
  say(`Tables: ${tables.length} (data: ${catalog.join(", ")}; structure only: ${structureOnly.length}).`);
  const unknown = structureOnly.filter((t) => !isUserTable(t));
  if (unknown.length) say(`Note: new tables copied structure-only (no fake rows): ${unknown.join(", ")}`);

  const existing = Number(psql(dst, "SELECT count(*) FROM pg_tables WHERE schemaname='public'").trim());
  if (existing > 0) {
    if (env.RESET_TARGET !== "true") throw new GuardError(`target already has ${existing} tables; re-run with reset_target=true to replace them`);
    say(`Resetting target schema public (${existing} tables).`);
    psql(dst, "DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
  }

  const dir = mkdtempSync(join(tmpdir(), "lp-copy-"));
  try {
    const schemaFile = join(dir, "schema.sql");
    const dataFile = join(dir, "data.sql");
    run("pg_dump", ["--schema-only", "--no-owner", "--no-acl", "--schema=public", "-f", schemaFile, "-d", src]);
    // pg_dump emits CREATE SCHEMA public; the target already has it.
    writeFileSync(schemaFile, readFileSync(schemaFile, "utf8").replace(/^CREATE SCHEMA public;$/m, "-- CREATE SCHEMA public; (exists)"));
    const tArgs = catalog.flatMap((t) => ["--table", `public.${JSON.stringify(t)}`]);
    run("pg_dump", ["--data-only", "--no-owner", "--no-acl", ...tArgs, "-f", dataFile, "-d", src]);
    psqlFile(dst, schemaFile);
    psqlFile(dst, dataFile);
    psqlFile(dst, join(process.cwd(), "scripts", "test-project", "fake-rows.sql"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }

  const counts = psql(dst, `SELECT string_agg(t || '=' || n, ', ') FROM (VALUES ${[...CATALOG_TABLES, "users"].map((t) => `('${t}', (SELECT count(*) FROM public.${JSON.stringify(t)}))`).join(", ")}) v(t, n)`);
  say(`Done. Row counts in target: ${counts.trim()}`);
  say("Next: run Guarded SQL (target=test) with scripts/sql/prod-readonly-role-20261103.sql to (re)create launchpad_ro grants here.");
}

main().catch((e) => {
  console.error(redact(`Refused/failed: ${(e as Error).message}`, SECRETS));
  process.exit(e instanceof GuardError ? 3 : 1);
});
