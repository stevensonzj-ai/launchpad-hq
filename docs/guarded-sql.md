# Guarded SQL runner

## Purpose

`npm run db:guarded-sql` applies a reviewed `.sql` file to a Neon database as **one transaction**, with guard rails that make accidental production writes hard:

- production is refused unless three independent confirmations are present, one of which is a **verified, recent Neon branch of production** (a restore point);
- every run, including refusals, appends one JSON line to a run log;
- no credential is ever printed, logged, or loaded from a file.

**It does not replace Zach's per-change approval.** It enforces process; it does not judge whether the SQL is correct or wanted. Every production change still needs Zach's explicit go-ahead first.

Code: `scripts/run-guarded-sql.ts` (CLI wiring) and `src/lib/guarded-sql/` (pure, injectable modules with tests). The production-host check is the existing `src/lib/prod-guard.ts`.

## Usage (PowerShell)

```powershell
# Preview only: prints numbered statements and the target endpoint ID; never connects
$env:GUARDED_DATABASE_URL = "<set in your own session>"
npm run db:guarded-sql -- .\sql\change.sql --dry-run

# Non-production branch: runs without a snapshot
npm run db:guarded-sql -- .\sql\change.sql

# Production: all three confirmations plus a snapshot
$env:CONFIRM_PROD_HOST = "<production endpoint ID>"
$env:NEON_API_KEY      = "<set in your own session>"
npm run db:guarded-sql -- .\sql\change.sql --confirm-production --snapshot br-xxxx-xxxxxxxx

# Clear secrets afterwards
Remove-Item Env:GUARDED_DATABASE_URL, Env:NEON_API_KEY, Env:CONFIRM_PROD_HOST
```

## Flags

| Flag | Meaning |
|---|---|
| `<file.sql>` | Required. One file. |
| `--dry-run` | Print the guard result, target endpoint ID and numbered statements. Executes nothing and makes **no database connection**. |
| `--confirm-production` | First of the three production confirmations. Harmless (noted and ignored) on non-production hosts. |
| `--snapshot <branch-id>` | Neon branch used as the restore point. Required for production. |
| `--max-snapshot-age-hours N` | Snapshot freshness limit. Default 24. |

## Environment variables

| Variable | Use |
|---|---|
| `GUARDED_DATABASE_URL` | Target connection string. Falls back to `DATABASE_URL`. |
| `CONFIRM_PROD_HOST` | Must equal the production endpoint ID for production runs. |
| `NEON_API_KEY` | Needed only to verify a production snapshot. Never printed. |
| `NEON_PROJECT_ID` | Neon project; default `billowing-river-00654156`. |
| `GUARDED_SQL_LOG` | Run-log path; default `logs/guarded-sql-runs.jsonl` (`logs/` is gitignored). |

The runner reads the process environment only. It never loads `.env*` files (no dotenv, no `--env-file`).

## What is checked

1. **Arguments and file.** Unknown flags, a missing file, an unterminated quote/comment, or an empty file stop the run (exit 2).
2. **No explicit transaction control.** Files containing `BEGIN`, `COMMIT`, `ROLLBACK`, `END`, `ABORT`, `START TRANSACTION`, `SAVEPOINT` or `RELEASE` as statements are refused; the runner supplies its own transaction. (`DO $$ BEGIN ... END $$` blocks are fine.)
3. **Target.** The endpoint ID is the first hostname label minus any `-pooler` suffix. Only that ID is ever shown.
4. **Production = all of:** `--confirm-production`, `CONFIRM_PROD_HOST` equal to the endpoint ID, and `--snapshot <branch-id>`.
5. **Snapshot** (production only), via `GET https://console.neon.tech/api/v2/projects/{project}/branches/{snapshot}`:
   - the branch exists (HTTP 200, valid JSON);
   - `parent_id` is the production branch `br-purple-band-ajks38xk`;
   - `created_at` is within `--max-snapshot-age-hours`;
   - the snapshot ID is not the production branch itself.

   A missing `NEON_API_KEY`, network error, non-200 response or malformed body is a refusal.
6. Non-production hosts need no snapshot (a given --snapshot is still verified).

## Dry run

`--dry-run` applies the same guard checks and prints `Guard: PASS` or `Guard: REFUSED`, so you can rehearse a production command. For production this includes the **read-only** Neon API snapshot lookup (the only network call). It never connects to the database or executes SQL. Exit code is 0 if the guard would pass, 3 if it would refuse.

## Execution

`BEGIN` â†’ `SET LOCAL statement_timeout = 60000` â†’ each statement in order â†’ `COMMIT`. Any error triggers `ROLLBACK` and a non-zero exit. The connection uses TLS (certificate verified) and `application_name = guarded-sql`. The timeout is set with `SET LOCAL` rather than a startup parameter so it also works through Neon's pooler.

SQL splitting handles semicolons inside single-quoted strings (including `E''`), double-quoted identifiers, `--` and nested `/* */` comments, and dollar-quoted bodies (`$$` and `$tag$`).

## Run log

One JSON line is appended to the log and printed for every run once the file has been read, including refusals and failures:

```json
{"timestamp":"2026-11-03T10:20:00-06:00","file":"change.sql","file_sha256":"â€¦","endpoint_id":"ep-â€¦","production":false,"snapshot_id":null,"statement_count":2,"dry_run":false,"success":true,"error":null,"duration_ms":412}
```

- `timestamp` is America/Chicago with a numeric offset (DST-aware).
- `file` is the base name only. `error` is redacted and capped at 200 characters.
- Connection strings, user, password and the API key are scrubbed from every error. They are never logged.
- No log line is written for bad arguments or an unreadable file.

## Exit codes

| Code | Meaning |
|---|---|
| 0 | Success (or dry run whose guard would pass) |
| 1 | Execution failed (connect or SQL error); transaction rolled back |
| 2 | Bad input: arguments, unreadable/empty/unparseable file, transaction control, missing or unparseable database URL |
| 3 | Refused by the production guard or snapshot check |

## Credential source options (undecided â€” Zach to choose)

Listed without a recommendation. In every option the runner itself only reads `process.env`.

1. **Zach sets the variables in his own PowerShell session.** `GUARDED_DATABASE_URL` and `NEON_API_KEY` via `$env:...`, then clears them after the run.
2. **A dedicated env file that agents never read.** It lives outside the repo and is loaded by Zach's shell (for example a dot-sourced PowerShell file). The runner still never loads files.
3. **A manually triggered GitHub Action** (`workflow_dispatch`) using a protected environment with required reviewers and secrets. This needs a workflow file that is **not included in this PR**.

## GitHub Actions route (`.github/workflows/guarded-sql.yml`)

For running from a phone: trigger **Guarded SQL** from the Actions tab (web or GitHub Mobile), then approve the pending deployment from the GitHub Mobile notification.

- Trigger: `workflow_dispatch` only. Inputs: `sql_file` (must match `scripts/sql/<name>.sql`, no `..`), `target` (`test` | `production`), `snapshot_id` (required for production; verified on test if given), `dry_run` (default true), `max_snapshot_age_hours` (default 24).
- Each target runs in its own protected environment: `guarded-sql-test` or `guarded-sql-production`. Both require Zach's review. Secrets exist only there: `GUARDED_DATABASE_URL`, `NEON_API_KEY`, and `CONFIRM_PROD_HOST` (production only; secret or environment variable). No repo-level secrets; no other workflow references these environments.
- Hardening: `permissions: contents: read`, actions pinned by SHA, `persist-credentials: false`, one concurrency group, 15-minute timeout, inputs passed through `env` (never interpolated into `run:`), no `set -x`.
- Production passes `--confirm-production --snapshot <id>`; every runner guard still applies.
- The job summary shows only endpoint ID, file, SHA-256, statement count and result. The redacted JSONL run log is uploaded as a 3-day artifact only after a check confirms it contains neither the database URL/password nor the Neon API key.
- `workflow_dispatch` only appears once the workflow file is on the default branch (`main`).

### Snapshot check on non-production targets

If `--snapshot` is given on a non-production target, the runner performs the same Neon API validation as on production (exists, direct child of production, not production itself, within the age limit) and refuses if it fails. This lets the snapshot check be exercised against a test branch.

### Test-only files

A file containing a line `-- guarded-sql: test-only` is refused on production (dry run included). `scripts/sql/guarded-sql-selftest.sql` is such a file: it creates `guarded_sql_selftest`, inserts one row and selects the count.