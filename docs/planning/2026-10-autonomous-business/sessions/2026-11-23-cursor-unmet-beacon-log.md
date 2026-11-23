# 2026-11-23 — cursor — unmet search beacon log

**Decided:** `POST /api/search/unmet` still always answers 204 and still stores the same row. Each request now writes one JSON line, `evt: "unmet_search_beacon"`, with the outcome and no query text. The results-above-cutoff outcome stays the existing name `above_threshold` (result count greater than `UNMET_RESULT_THRESHOLD`). `ineligible` covers DNT, GPC, blocked country, unknown country, and Tor together, so the line does not record which header caused the skip. `store_error` is stderr and carries only an error class plus a Prisma `P` + four-digit code, never the thrown text.

**Changed:**
- `src/lib/search/unmet-log.ts` — the line builder and logger
- `src/lib/search/unmet-record.ts` — one log call on every return path
- `src/app/api/search/unmet/route.ts` — comment only; still 204, still the same upsert
- `src/lib/search/unmet.test.ts` — one case per outcome; the query never appears in the line
- `docs/unmet-searches.md` — outcome names and the exact line shape

**Checks:** `npm test` 1656 pass, 0 fail. `npm run typecheck` passed (test files included). No database, no migration, no new env var.

**Open / Zach:** Do not merge until you review. PR #187 (https://github.com/stevensonzj-ai/launchpad-hq/pull/187). Confirm a preview runtime log shows one `unmet_search_beacon` line and that the query is not in it. Nothing else to decide.
