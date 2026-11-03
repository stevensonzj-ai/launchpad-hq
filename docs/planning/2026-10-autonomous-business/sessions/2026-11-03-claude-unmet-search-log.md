# 2026-11-03 claude: unmet website search log (branch feat/unmet-search-log-1103)

**Decided:** log website searches with 2 or fewer results (`UNMET_RESULT_THRESHOLD`) as aggregate counters in `unmet_searches`. Hooks only the header search box and Discover `?q=` (no other filters). `/mcp`, its tools and logging are untouched; a test enforces it.

**Changed (uncommitted):** `src/lib/search/{unmet,unmet-record,unmet-client,unmet-report}.ts` and `unmet.test.ts`; `src/app/api/search/unmet/route.ts`; `src/components/search/unmet-search-beacon.tsx`; header and Discover hooks; Prisma model + migration `20261103130000_add_unmet_searches`; `scripts/sql/search-unmet-*.sql`; `scripts/search-unmet-weekly.ts` (`npm run report:unmet-searches`); `scripts/attr-retention-cleanup.ts` now also deletes unmet rows; privacy page; `docs/unmet-searches.md`.

**Verified:** typecheck, lint (0 errors), `npm test` (1365 pass). `npm run audit:tutorials` was blocked on a permission prompt and NOT run.

**Open / Zach decides:**
- Apply the migration (Neon branch first, then production). Until then the route swallows the error and answers 204.
- Run `npm run audit:tutorials` (no tutorial files changed).
- Combining marks are kept in normalization (deviation from letters/digits only, so Devanagari/Thai survive). Digit-only queries are dropped.
- No browser click-through done (no dev server by instruction): check header box and Discover on a preview, including DNT on.
