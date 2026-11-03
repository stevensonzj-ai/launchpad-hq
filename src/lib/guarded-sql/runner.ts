import { createHash } from "node:crypto";
import { win32 } from "node:path";
/** Basename that strips both / and \ separators on every OS, so no directory path ever reaches the log. */
const basename = (p: string): string => win32.basename(p);
import { PRODUCTION_ENDPOINT_ID } from "../prod-guard";
import { parseArgs, USAGE } from "./args";
import { parseEndpointId } from "./endpoint";
import { evaluateGuard } from "./guard";
import { errorMessage, redactAndCap, redactSecrets, secretsFromConnectionString } from "./redact";
import { DEFAULT_NEON_PROJECT_ID, PRODUCTION_BRANCH_ID, type FetchLike } from "./snapshot";
import { findTransactionControl, splitSql } from "./split";
import { formatChicagoTimestamp } from "./time";

/** A line `-- guarded-sql: test-only` anywhere in the file marks it as never-on-production. */
export const TEST_ONLY_MARKER = /^\s*--\s*guarded-sql:\s*test-only\s*$/im;
export const isTestOnlySql = (sql: string): boolean => TEST_ONLY_MARKER.test(sql);

export const EXIT_OK = 0;
export const EXIT_EXECUTION_FAILED = 1;
export const EXIT_BAD_INPUT = 2;
export const EXIT_REFUSED = 3;

export const STATEMENT_TIMEOUT_MS = 60_000;
export const APPLICATION_NAME = "guarded-sql";

export interface SqlClient {
  connect(): Promise<void>;
  query(sql: string): Promise<unknown>;
  end(): Promise<void>;
}
export interface ClientConfig {
  connectionString: string;
  applicationName: string;
  statementTimeoutMs: number;
}
export type ClientFactory = (config: ClientConfig) => SqlClient;

export interface RunRecord {
  timestamp: string;
  file: string;
  file_sha256: string;
  endpoint_id: string | null;
  production: boolean;
  snapshot_id: string | null;
  statement_count: number;
  dry_run: boolean;
  success: boolean;
  error: string | null;
  duration_ms: number;
}

export interface RunnerDeps {
  env: Record<string, string | undefined>;
  readFile(path: string): Buffer;
  fetchFn: FetchLike;
  clientFactory: ClientFactory;
  now(): Date;
  appendLog(line: string): void;
  out(line: string): void;
  err(line: string): void;
  productionEndpointId?: string;
  productionBranchId?: string;
}

export interface RunResult {
  exitCode: number;
  record?: RunRecord;
}

export async function runGuardedSql(argv: readonly string[], deps: RunnerDeps): Promise<RunResult> {
  const parsed = parseArgs(argv);
  if (!parsed.ok) {
    deps.err(`${parsed.error}\n${USAGE}`);
    return { exitCode: EXIT_BAD_INPUT };
  }
  const { args } = parsed;

  let bytes: Buffer;
  try {
    bytes = deps.readFile(args.file);
  } catch {
    deps.err(`Cannot read SQL file: ${basename(args.file)}`);
    return { exitCode: EXIT_BAD_INPUT };
  }

  const startedAt = deps.now();
  const dbUrl = deps.env.GUARDED_DATABASE_URL || deps.env.DATABASE_URL || undefined;
  const secrets: string[] = [
    ...(dbUrl ? secretsFromConnectionString(dbUrl) : []),
    ...(deps.env.NEON_API_KEY ? [deps.env.NEON_API_KEY] : []),
  ];
  const endpointId = dbUrl ? parseEndpointId(dbUrl) : null;
  const productionEndpointId = deps.productionEndpointId ?? PRODUCTION_ENDPOINT_ID;

  const state = { statementCount: 0, production: false, snapshotId: null as string | null };
  const finish = (exitCode: number, error: string | null): RunResult => {
    const end = deps.now();
    const record: RunRecord = {
      timestamp: formatChicagoTimestamp(end),
      file: basename(args.file),
      file_sha256: createHash("sha256").update(bytes).digest("hex"),
      endpoint_id: endpointId,
      production: state.production,
      snapshot_id: state.snapshotId,
      statement_count: state.statementCount,
      dry_run: args.dryRun,
      success: exitCode === EXIT_OK,
      error: error === null ? null : redactAndCap(error, secrets, 200),
      duration_ms: Math.max(0, end.getTime() - startedAt.getTime()),
    };
    const line = JSON.stringify(record);
    try {
      deps.appendLog(line);
    } catch (e) {
      deps.err(`WARNING: could not write run log: ${redactAndCap(errorMessage(e), secrets, 200)}`);
    }
    deps.out(line);
    // Full (uncapped) redacted text for the operator; only the log line is capped.
    if (error) deps.err(redactSecrets(error, secrets));
    return { exitCode, record };
  };

  // --- split + sanity ------------------------------------------------------
  let statements: string[];
  try {
    statements = splitSql(bytes.toString("utf8"));
  } catch (e) {
    return finish(EXIT_BAD_INPUT, `Could not parse SQL file: ${errorMessage(e)}`);
  }
  state.statementCount = statements.length;
  if (statements.length === 0) return finish(EXIT_BAD_INPUT, "SQL file contains no statements");
  const txn = findTransactionControl(statements);
  if (txn.length > 0) {
    const where = txn.map((t) => `#${t.index} ${t.keyword}`).join(", ");
    return finish(
      EXIT_BAD_INPUT,
      `Refusing file with explicit transaction control (${where}). The runner wraps everything in one transaction.`,
    );
  }

  // --- target + guard ------------------------------------------------------
  if (!dbUrl) return finish(EXIT_BAD_INPUT, "Neither GUARDED_DATABASE_URL nor DATABASE_URL is set");
  if (!endpointId) return finish(EXIT_BAD_INPUT, "Could not parse a hostname from the database URL");

  const guard = await evaluateGuard({
    endpointId,
    confirmProduction: args.confirmProduction,
    snapshotId: args.snapshot,
    maxSnapshotAgeHours: args.maxSnapshotAgeHours,
    env: deps.env,
    now: deps.now(),
    fetchFn: deps.fetchFn,
    productionEndpointId,
    productionBranchId: deps.productionBranchId ?? PRODUCTION_BRANCH_ID,
    neonProjectId: deps.env.NEON_PROJECT_ID || DEFAULT_NEON_PROJECT_ID,
  });
  state.production = guard.production;
  if (args.snapshot && (guard.production || guard.ok)) state.snapshotId = args.snapshot;
  const testOnlyRefusal =
    guard.production && isTestOnlySql(bytes.toString("utf8"))
      ? "Refusing: this file is marked '-- guarded-sql: test-only' and the target is production."
      : null;

  deps.out(`Target endpoint: ${endpointId} (${guard.production ? "PRODUCTION" : "non-production"})`);
  if (guard.ok) for (const n of guard.notes) deps.out(n);

  if (args.dryRun) {
    deps.out(`Guard: ${guard.ok ? "PASS" : "REFUSED"}`);
    statements.forEach((s, i) => deps.out(`--- statement ${i + 1}/${statements.length} ---\n${s}`));
    deps.out("Dry run: nothing was executed and no database connection was made.");
    if (!guard.ok) return finish(EXIT_REFUSED, guard.reason);
    return testOnlyRefusal ? finish(EXIT_REFUSED, testOnlyRefusal) : finish(EXIT_OK, null);
  }
  if (!guard.ok) return finish(EXIT_REFUSED, guard.reason);
  if (testOnlyRefusal) return finish(EXIT_REFUSED, testOnlyRefusal);

  // --- execute -------------------------------------------------------------
  const client = deps.clientFactory({
    connectionString: dbUrl,
    applicationName: APPLICATION_NAME,
    statementTimeoutMs: STATEMENT_TIMEOUT_MS,
  });
  let began = false;
  try {
    await client.connect();
    await client.query("BEGIN");
    began = true;
    // SET LOCAL (not a startup parameter) so it also works through Neon's pooler.
    await client.query(`SET LOCAL statement_timeout = ${STATEMENT_TIMEOUT_MS}`);
    for (let i = 0; i < statements.length; i++) {
      try {
        await client.query(statements[i]!);
      } catch (e) {
        throw new Error(`statement ${i + 1}/${statements.length} failed: ${errorMessage(e)}`);
      }
    }
    await client.query("COMMIT");
  } catch (e) {
    if (began) {
      try {
        await client.query("ROLLBACK");
      } catch {
        /* connection may be gone; the server rolls back on disconnect */
      }
    }
    await client.end().catch(() => undefined);
    return finish(EXIT_EXECUTION_FAILED, errorMessage(e));
  }
  await client.end().catch(() => undefined);
  return finish(EXIT_OK, null);
}
