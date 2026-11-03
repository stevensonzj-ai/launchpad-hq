import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { describe, it } from "node:test";
import { PRODUCTION_ENDPOINT_ID } from "../prod-guard";
import { EXIT_BAD_INPUT, EXIT_EXECUTION_FAILED, EXIT_OK, EXIT_REFUSED, runGuardedSql, type RunnerDeps } from "./runner";
import { PRODUCTION_BRANCH_ID, type FetchLike } from "./snapshot";

const FAKE_PROD = "ep-fake-prod-test000";
const FAKE_PROD_BRANCH = "br-fake-prod-000000";
const PROD_URL = `postgresql://u:secretpw@${FAKE_PROD}-pooler.us-east-2.aws.neon.tech/db?sslmode=require`;
const DEV_URL = "postgresql://u:secretpw@ep-dev-branch-123.us-east-2.aws.neon.tech/db";
const API_KEY = "napi_supersecretkey999";
const NOW = new Date("2026-11-03T16:20:00Z");
const SQL = "update t set a = 1;\ninsert into t values ('x;y');\n";

interface Harness {
  deps: RunnerDeps;
  queries: string[];
  logLines: string[];
  out: string[];
  err: string[];
  factoryCalls: number;
  fetchCalls: number;
}

function harness(opts: {
  env?: Record<string, string | undefined>;
  sql?: string;
  failOn?: (sql: string) => Error | null;
  fetchFn?: FetchLike;
  connectError?: Error;
}): Harness {
  const h: Harness = { deps: null as never, queries: [], logLines: [], out: [], err: [], factoryCalls: 0, fetchCalls: 0 };
  const goodSnapshot: FetchLike = async () => ({
    ok: true,
    status: 200,
    json: async () => ({
      branch: { id: "br-snap-111111", parent_id: FAKE_PROD_BRANCH, created_at: "2026-11-03T12:00:00Z" },
    }),
  });
  const inner = opts.fetchFn ?? goodSnapshot;
  h.deps = {
    env: opts.env ?? { GUARDED_DATABASE_URL: DEV_URL },
    readFile: () => Buffer.from(opts.sql ?? SQL, "utf8"),
    fetchFn: (...a) => {
      h.fetchCalls++;
      return inner(...a);
    },
    clientFactory: () => {
      h.factoryCalls++;
      return {
        connect: async () => {
          if (opts.connectError) throw opts.connectError;
        },
        query: async (sql: string) => {
          h.queries.push(sql);
          const e = opts.failOn?.(sql);
          if (e) throw e;
          return {};
        },
        end: async () => undefined,
      };
    },
    now: () => NOW,
    appendLog: (l) => h.logLines.push(l),
    out: (l) => h.out.push(l),
    err: (l) => h.err.push(l),
    productionEndpointId: FAKE_PROD,
    productionBranchId: FAKE_PROD_BRANCH,
  };
  return h;
}

const prodEnv = (extra: Record<string, string | undefined> = {}) => ({
  GUARDED_DATABASE_URL: PROD_URL,
  CONFIRM_PROD_HOST: FAKE_PROD,
  NEON_API_KEY: API_KEY,
  ...extra,
});
const allText = (h: Harness) => [...h.logLines, ...h.out, ...h.err].join("\n");

describe("defaults", () => {
  it("production endpoint default is the real constant", () => {
    assert.equal(PRODUCTION_ENDPOINT_ID, "ep-odd-mud-ajdk8f99");
    assert.equal(PRODUCTION_BRANCH_ID, "br-purple-band-ajks38xk");
  });
});

describe("non-production path", () => {
  it("commits without a snapshot, runs BEGIN..COMMIT, and logs", async () => {
    const h = harness({});
    const r = await runGuardedSql(["change.sql"], h.deps);
    assert.equal(r.exitCode, EXIT_OK);
    assert.equal(h.queries[0], "BEGIN");
    assert.match(h.queries[1]!, /^SET LOCAL statement_timeout = 60000$/);
    assert.deepEqual(h.queries.slice(2), ["update t set a = 1", "insert into t values ('x;y')", "COMMIT"]);
    assert.ok(!h.queries.includes("ROLLBACK"));
    assert.equal(h.fetchCalls, 0);
    assert.equal(h.logLines.length, 1);
    const rec = JSON.parse(h.logLines[0]!);
    assert.deepEqual(Object.keys(rec), [
      "timestamp", "file", "file_sha256", "endpoint_id", "production", "snapshot_id",
      "statement_count", "dry_run", "success", "error", "duration_ms",
    ]);
    assert.equal(rec.timestamp, "2026-11-03T10:20:00-06:00");
    assert.equal(rec.file, "change.sql");
    assert.equal(rec.file_sha256, createHash("sha256").update(SQL).digest("hex"));
    assert.equal(rec.endpoint_id, "ep-dev-branch-123");
    assert.equal(rec.production, false);
    assert.equal(rec.snapshot_id, null);
    assert.equal(rec.statement_count, 2);
    assert.equal(rec.success, true);
    assert.equal(rec.error, null);
  });

  it("falls back to DATABASE_URL and prefers GUARDED_DATABASE_URL", async () => {
    const a = harness({ env: { DATABASE_URL: DEV_URL } });
    assert.equal((await runGuardedSql(["c.sql"], a.deps)).record?.endpoint_id, "ep-dev-branch-123");
    const b = harness({ env: { DATABASE_URL: DEV_URL, GUARDED_DATABASE_URL: "postgresql://u:p@ep-other-9.neon.tech/db" } });
    assert.equal((await runGuardedSql(["c.sql"], b.deps)).record?.endpoint_id, "ep-other-9");
  });

  it("logs only the basename of a path", async () => {
    const h = harness({});
    const r = await runGuardedSql(["C:\\secret-dir\\sub\\change.sql"], h.deps);
    assert.equal(r.record?.file, "change.sql");
  });
});

describe("rollback", () => {
  it("rolls back and exits 1 on a failing statement, never committing", async () => {
    const h = harness({ failOn: (s) => (s.startsWith("insert") ? new Error("duplicate key") : null) });
    const r = await runGuardedSql(["c.sql"], h.deps);
    assert.equal(r.exitCode, EXIT_EXECUTION_FAILED);
    assert.equal(h.queries[0], "BEGIN");
    assert.ok(h.queries.includes("update t set a = 1"));
    assert.equal(h.queries[h.queries.length - 1], "ROLLBACK");
    assert.ok(!h.queries.includes("COMMIT"));
    assert.equal(r.record?.success, false);
    assert.match(r.record!.error!, /statement 2\/2 failed: duplicate key/);
  });

  it("does not send ROLLBACK if connect failed", async () => {
    const h = harness({ connectError: new Error("ECONNREFUSED") });
    const r = await runGuardedSql(["c.sql"], h.deps);
    assert.equal(r.exitCode, EXIT_EXECUTION_FAILED);
    assert.deepEqual(h.queries, []);
  });
});

describe("dry run", () => {
  it("never creates a client, prints numbered statements and endpoint", async () => {
    const h = harness({});
    const r = await runGuardedSql(["c.sql", "--dry-run"], h.deps);
    assert.equal(r.exitCode, EXIT_OK);
    assert.equal(h.factoryCalls, 0);
    assert.deepEqual(h.queries, []);
    const out = h.out.join("\n");
    assert.match(out, /ep-dev-branch-123/);
    assert.match(out, /statement 1\/2/);
    assert.match(out, /statement 2\/2/);
    const rec = JSON.parse(h.logLines[0]!);
    assert.equal(rec.dry_run, true);
    assert.equal(rec.success, true);
  });

  it("still applies guard checks: prod without confirmation reports REFUSED, exit 3, nothing executed", async () => {
    const h = harness({ env: prodEnv() });
    const r = await runGuardedSql(["c.sql", "--dry-run"], h.deps);
    assert.equal(r.exitCode, EXIT_REFUSED);
    assert.equal(h.factoryCalls, 0);
    assert.match(h.out.join("\n"), /Guard: REFUSED/);
  });

  it("dry run on fully-confirmed prod passes the guard and still never connects", async () => {
    const h = harness({ env: prodEnv() });
    const r = await runGuardedSql(["c.sql", "--dry-run", "--confirm-production", "--snapshot", "br-snap-111111"], h.deps);
    assert.equal(r.exitCode, EXIT_OK);
    assert.equal(h.factoryCalls, 0);
    assert.match(h.out.join("\n"), /Guard: PASS/);
  });
});

describe("production refusals", () => {
  const goodArgs = ["c.sql", "--confirm-production", "--snapshot", "br-snap-111111"];
  async function refused(args: string[], env: Record<string, string | undefined>, fetchFn?: FetchLike) {
    const h = harness({ env, fetchFn });
    const r = await runGuardedSql(args, h.deps);
    assert.equal(r.exitCode, EXIT_REFUSED);
    assert.equal(h.factoryCalls, 0, "must not connect");
    assert.equal(r.record?.success, false);
    assert.equal(r.record?.production, true);
    assert.equal(r.record?.endpoint_id, FAKE_PROD);
    return h;
  }

  it("full confirmation + good snapshot succeeds and records the snapshot", async () => {
    const h = harness({ env: prodEnv() });
    const r = await runGuardedSql(goodArgs, h.deps);
    assert.equal(r.exitCode, EXIT_OK);
    assert.equal(r.record?.production, true);
    assert.equal(r.record?.snapshot_id, "br-snap-111111");
    assert.equal(h.queries[h.queries.length - 1], "COMMIT");
  });
  it("missing --confirm-production", async () => {
    const h = await refused(["c.sql", "--snapshot", "br-snap-111111"], prodEnv());
    assert.match(allText(h), /--confirm-production/);
  });
  it("CONFIRM_PROD_HOST mismatch or missing", async () => {
    await refused(goodArgs, prodEnv({ CONFIRM_PROD_HOST: "ep-something-else" }));
    await refused(goodArgs, prodEnv({ CONFIRM_PROD_HOST: undefined }));
  });
  it("missing --snapshot", async () => {
    const h = await refused(["c.sql", "--confirm-production"], prodEnv());
    assert.equal(h.fetchCalls, 0);
    assert.match(allText(h), /--snapshot/);
  });
  it("wrong parent", async () => {
    await refused(goodArgs, prodEnv(), async () => ({
      ok: true, status: 200,
      json: async () => ({ branch: { id: "br-snap-111111", parent_id: "br-not-prod", created_at: "2026-11-03T12:00:00Z" } }),
    }));
  });
  it("stale snapshot (and a custom limit)", async () => {
    const stale: FetchLike = async () => ({
      ok: true, status: 200,
      json: async () => ({ branch: { id: "br-snap-111111", parent_id: FAKE_PROD_BRANCH, created_at: "2026-11-01T12:00:00Z" } }),
    });
    await refused(goodArgs, prodEnv(), stale);
    // 4h old is fine by default but not with --max-snapshot-age-hours 2
    await refused([...goodArgs, "--max-snapshot-age-hours", "2"], prodEnv());
  });
  it("snapshot equals the production branch", async () => {
    const h = await refused(["c.sql", "--confirm-production", "--snapshot", FAKE_PROD_BRANCH], prodEnv());
    assert.equal(h.fetchCalls, 0);
  });
  it("API failure, 404 and missing key", async () => {
    await refused(goodArgs, prodEnv(), async () => { throw new Error("offline"); });
    await refused(goodArgs, prodEnv(), async () => ({ ok: false, status: 404, json: async () => ({}) }));
    await refused(goodArgs, prodEnv({ NEON_API_KEY: undefined }));
  });
});

describe("secrets never reach output or log", () => {
  it("redacts a connection string and the password from a driver error", async () => {
    const h = harness({
      env: { GUARDED_DATABASE_URL: DEV_URL, NEON_API_KEY: API_KEY },
      failOn: (s) =>
        s.startsWith("update")
          ? new Error(`could not connect to ${DEV_URL}; password authentication failed for user u (secretpw) ${API_KEY}`)
          : null,
    });
    const r = await runGuardedSql(["c.sql"], h.deps);
    assert.equal(r.exitCode, EXIT_EXECUTION_FAILED);
    const text = allText(h);
    for (const s of ["secretpw", "postgresql://", "ep-dev-branch-123.us-east-2", API_KEY]) {
      assert.ok(!text.includes(s), `leaked ${s}`);
    }
    assert.ok(r.record!.error!.length <= 200);
  });

  it("refusal text shows the endpoint id only, never the host, user or password", async () => {
    const h = harness({ env: prodEnv() });
    await runGuardedSql(["c.sql"], h.deps);
    const text = allText(h);
    assert.ok(text.includes(FAKE_PROD));
    for (const s of ["secretpw", "us-east-2", "neon.tech", "-pooler", API_KEY]) assert.ok(!text.includes(s), `leaked ${s}`);
  });

  it("a snapshot API error containing the key does not leak it", async () => {
    const h = harness({
      env: prodEnv(),
      fetchFn: async () => { throw new Error(`fail with Bearer ${API_KEY}`); },
    });
    await runGuardedSql(["c.sql", "--confirm-production", "--snapshot", "br-snap-111111"], h.deps);
    assert.ok(!allText(h).includes(API_KEY));
  });
});

describe("input handling", () => {
  it("refuses files with explicit transaction control (and logs it)", async () => {
    const h = harness({ sql: "BEGIN;\nupdate t set a=1;\nCOMMIT;" });
    const r = await runGuardedSql(["c.sql"], h.deps);
    assert.equal(r.exitCode, EXIT_BAD_INPUT);
    assert.equal(h.factoryCalls, 0);
    assert.match(r.record!.error!, /transaction control/);
    assert.equal(h.logLines.length, 1);
  });
  it("rejects empty files and unterminated SQL", async () => {
    assert.equal((await runGuardedSql(["c.sql"], harness({ sql: "-- nothing\n" }).deps)).exitCode, EXIT_BAD_INPUT);
    assert.equal((await runGuardedSql(["c.sql"], harness({ sql: "select 'x" }).deps)).exitCode, EXIT_BAD_INPUT);
  });
  it("rejects missing URL with a logged failure", async () => {
    const h = harness({ env: {} });
    const r = await runGuardedSql(["c.sql"], h.deps);
    assert.equal(r.exitCode, EXIT_BAD_INPUT);
    assert.equal(h.logLines.length, 1);
  });
  it("bad args and unreadable files exit 2 without a log line", async () => {
    const h = harness({});
    assert.equal((await runGuardedSql([], h.deps)).exitCode, EXIT_BAD_INPUT);
    assert.equal((await runGuardedSql(["c.sql", "--bogus"], h.deps)).exitCode, EXIT_BAD_INPUT);
    assert.equal((await runGuardedSql(["c.sql", "--max-snapshot-age-hours", "abc"], h.deps)).exitCode, EXIT_BAD_INPUT);
    h.deps.readFile = () => { throw new Error("ENOENT"); };
    assert.equal((await runGuardedSql(["c.sql"], h.deps)).exitCode, EXIT_BAD_INPUT);
    assert.equal(h.logLines.length, 0);
  });
  it("a log-write failure warns but does not change the exit code", async () => {
    const h = harness({});
    h.deps.appendLog = () => { throw new Error("disk full"); };
    const r = await runGuardedSql(["c.sql"], h.deps);
    assert.equal(r.exitCode, EXIT_OK);
    assert.match(h.err.join("\n"), /could not write run log/);
  });
});

describe("snapshot validation on non-production targets", () => {
  const devEnv = { GUARDED_DATABASE_URL: DEV_URL, NEON_API_KEY: API_KEY };

  it("verifies a given --snapshot via the Neon API and then runs", async () => {
    const h = harness({ env: devEnv });
    const r = await runGuardedSql(["change.sql", "--snapshot", "br-snap-111111"], h.deps);
    assert.equal(r.exitCode, EXIT_OK);
    assert.equal(h.fetchCalls, 1);
    assert.equal(r.record?.production, false);
    assert.equal(r.record?.snapshot_id, "br-snap-111111");
    assert.ok(h.out.some((l) => /verified \(non-production target\)/.test(l)));
    assert.ok(!allText(h).includes(API_KEY));
    assert.ok(!allText(h).includes("secretpw"));
  });

  it("fails closed on a missing API key", async () => {
    const h = harness({ env: { GUARDED_DATABASE_URL: DEV_URL } });
    const r = await runGuardedSql(["change.sql", "--snapshot", "br-snap-111111"], h.deps);
    assert.equal(r.exitCode, EXIT_REFUSED);
    assert.equal(h.factoryCalls, 0);
  });

  it("refuses a snapshot that is not a child of production", async () => {
    const h = harness({
      env: devEnv,
      fetchFn: async () => ({
        ok: true,
        status: 200,
        json: async () => ({ branch: { id: "br-snap-111111", parent_id: "br-other", created_at: "2026-11-03T12:00:00Z" } }),
      }),
    });
    const r = await runGuardedSql(["change.sql", "--snapshot", "br-snap-111111"], h.deps);
    assert.equal(r.exitCode, EXIT_REFUSED);
    assert.equal(h.factoryCalls, 0);
  });

  it("refuses the production branch id itself as a snapshot", async () => {
    const h = harness({
      env: devEnv,
      fetchFn: async () => ({
        ok: true,
        status: 200,
        json: async () => ({ branch: { id: FAKE_PROD_BRANCH, parent_id: null, created_at: "2026-11-03T12:00:00Z" } }),
      }),
    });
    const r = await runGuardedSql(["change.sql", "--snapshot", FAKE_PROD_BRANCH], h.deps);
    assert.equal(r.exitCode, EXIT_REFUSED);
  });

  it("applies the age limit and honors --max-snapshot-age-hours", async () => {
    const old = harness({ env: devEnv });
    // fixture snapshot is 4.3h old at NOW
    const r1 = await runGuardedSql(["change.sql", "--snapshot", "br-snap-111111", "--max-snapshot-age-hours", "2"], old.deps);
    assert.equal(r1.exitCode, EXIT_REFUSED);
    const ok = harness({ env: devEnv });
    const r2 = await runGuardedSql(["change.sql", "--snapshot", "br-snap-111111", "--max-snapshot-age-hours", "6"], ok.deps);
    assert.equal(r2.exitCode, EXIT_OK);
  });

  it("dry run still validates and reports a refused snapshot", async () => {
    const h = harness({ env: { GUARDED_DATABASE_URL: DEV_URL } });
    const r = await runGuardedSql(["change.sql", "--snapshot", "br-x", "--dry-run"], h.deps);
    assert.equal(r.exitCode, EXIT_REFUSED);
    assert.equal(h.factoryCalls, 0);
  });
});

describe("test-only SQL files", () => {
  const SELFTEST = "-- guarded-sql: test-only\ncreate table if not exists x (id int);\nselect 1;\n";

  it("runs on a non-production target", async () => {
    const h = harness({ sql: SELFTEST });
    assert.equal((await runGuardedSql(["selftest.sql"], h.deps)).exitCode, EXIT_OK);
  });

  it("is refused on production even with every production confirmation", async () => {
    const h = harness({ env: prodEnv(), sql: SELFTEST });
    const r = await runGuardedSql(["selftest.sql", "--confirm-production", "--snapshot", "br-snap-111111"], h.deps);
    assert.equal(r.exitCode, EXIT_REFUSED);
    assert.equal(h.factoryCalls, 0);
    assert.match(r.record?.error ?? "", /test-only/);
  });

  it("is refused on production in a dry run too", async () => {
    const h = harness({ env: prodEnv(), sql: SELFTEST });
    const r = await runGuardedSql(["selftest.sql", "--confirm-production", "--snapshot", "br-snap-111111", "--dry-run"], h.deps);
    assert.equal(r.exitCode, EXIT_REFUSED);
  });

  it("the repo self-test file carries the marker", async () => {
    const { readFileSync } = await import("node:fs");
    const { isTestOnlySql } = await import("./runner");
    assert.ok(isTestOnlySql(readFileSync("scripts/sql/guarded-sql-selftest.sql", "utf8")));
    assert.ok(!isTestOnlySql("select 1; -- guarded-sql: test-only is mentioned inline"));
  });
});