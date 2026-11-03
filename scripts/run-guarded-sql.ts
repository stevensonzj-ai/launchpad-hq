/**
 * Guarded SQL runner CLI. See docs/guarded-sql.md.
 *
 * Credentials come ONLY from the process environment (GUARDED_DATABASE_URL,
 * falling back to DATABASE_URL; NEON_API_KEY for production snapshot checks).
 * This script deliberately never loads any .env file.
 */
import { appendFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { Client } from "pg";
import { runGuardedSql, type ClientFactory, type FetchLike } from "../src/lib/guarded-sql";

const clientFactory: ClientFactory = (cfg) => {
  const client = new Client({
    connectionString: cfg.connectionString,
    ssl: { rejectUnauthorized: true }, // Neon requires TLS
    application_name: cfg.applicationName,
  });
  return {
    connect: () => client.connect(),
    query: (sql) => client.query(sql),
    end: () => client.end(),
  };
};

const logPath = resolve(process.env.GUARDED_SQL_LOG || "logs/guarded-sql-runs.jsonl");

runGuardedSql(process.argv.slice(2), {
  env: process.env,
  readFile: (p) => readFileSync(p),
  fetchFn: fetch as unknown as FetchLike,
  clientFactory,
  now: () => new Date(),
  appendLog: (line) => {
    mkdirSync(dirname(logPath), { recursive: true });
    appendFileSync(logPath, line + "\n", "utf8");
  },
  out: (l) => console.log(l),
  err: (l) => console.error(l),
}).then(
  (r) => {
    process.exitCode = r.exitCode;
  },
  (e) => {
    console.error(`guarded-sql crashed: ${e instanceof Error ? e.constructor.name : "error"}`);
    process.exitCode = 1;
  },
);
