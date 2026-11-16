# 2026-11-16 cursor: Guarded SQL self-snapshot

**Decided:** When `snapshot_id` is empty, the Guarded SQL workflow creates the pre-run Neon branch itself and passes that id into the existing snapshot check. A supplied id still works. Production creation uses a new environment secret `NEON_PROD_API_KEY` (Zach adds it to `guarded-sql-production` only) and the existing production project id. Test creation keeps `NEON_API_KEY` and `TEST_PROJECT_ID`. Automated production runs refuse `DROP`, `TRUNCATE`, `DELETE`, `ALTER`, `CREATE`, `GRANT`, `REVOKE`, and any table other than `platforms` and `categories`, unless `allow_schema_change` is true. That flag skips only the statement guard and still needs the reviewer gate.

**Changed:** branch `ci/guarded-sql-self-snapshot`, draft PR #174 (https://github.com/stevensonzj-ai/launchpad-hq/pull/174), not merged. Workflow not run. Neon API not called.

- `.github/workflows/guarded-sql.yml` — empty snapshot id creates the branch; production ref must be `refs/heads/main`; missing `NEON_PROD_API_KEY` fails before any call.
- `src/lib/guarded-sql/branch-name.ts`, `self-snapshot.ts`, `statement-guard.ts`, plus the runner hook `GUARDED_SQL_CATALOG_GUARD` / `GUARDED_SQL_SNAPSHOT_PARENT`.
- `scripts/guarded-sql-self-snapshot.ts`, `scripts/guarded-sql-statement-guard.ts`, summary script.
- `docs/guarded-sql.md` — checklist: chat yes names the file, bot triggers from `main`, Zach approves `guarded-sql-production` before any step (including the Neon call), the job then creates `pre-*`, rollback is that branch, deleting a `pre-*` branch needs Zach's OK naming the branch id.

**Open:** Zach adds `NEON_PROD_API_KEY` (project-scoped, production project only) to the `guarded-sql-production` environment. Do not mark the PR ready or run the workflow until that secret exists. `pre-*` branches are not deleted from here.
