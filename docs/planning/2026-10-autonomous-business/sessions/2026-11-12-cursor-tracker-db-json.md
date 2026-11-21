# 2026-11-12 — cursor — content tracker --db-json

**Decided:** The content tracker export can take catalog rows from a JSON file instead of connecting. `--db-json` skips `DATABASE_URL` and the prod-guard host check. Without the flag, the database path is the same read-only transaction and the same three SELECTs. Both paths share `mapContentTrackerRows`. The SQL file lives under `scripts/sql/readonly/` so the Guarded SQL workflow (which only accepts `scripts/sql/<name>.sql`) will not run it. The file is labeled as documentation, not a Guarded SQL input.

**Changed:** PR #167 (https://github.com/stevensonzj-ai/launchpad-hq/pull/167). Commit `ce0ef4f`.

- `scripts/export-content-tracker.ts` — optional `--db-json <file>`.
- `src/lib/content-tracker-db.ts` — shared mapping, JSON coercion, SQL loader.
- `src/lib/content-tracker-db.test.ts` — parsing, coercion, mapping parity with the database mapper, bad input.
- `scripts/sql/readonly/content-tracker-queries.sql` — the three SELECTs the script copies.
- `docs/content-tracker.md` — run them as `launchpad_ro`, then `npm run export:content-tracker -- --db-json file.json --out ...`.
- `package.json` — the new test file is on `npm test`.

**Checks:** `npm test` 1472 pass, 0 fail. `npm run typecheck` pass. CLI smoke, no real database: the JSON path succeeded with a fake production-looking `DATABASE_URL` set; without the flag, a missing `DATABASE_URL` still aborts and a production hostname is still refused before connect; a JSON array fails with a clear message.

**Open / Zach:** Nothing to decide. Do not merge until you review.
