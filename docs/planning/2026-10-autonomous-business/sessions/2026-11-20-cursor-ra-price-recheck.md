# 2026-11-20 — cursor — RA price re-check

**Decided:** Apply the Research Analyst's full Nov 20 re-check (33 confirmed, 47 changed, 0 unreadable). List prices stay separate from sale prices. Promos are recorded only when the page states an end date. Hedra `apiPricing` is removed. Draft PR only. Do not run the SQL.

**Changed:** Fact files under `src/data/facts/`. Guarded SQL: `scripts/sql/catalog-price-ra-recheck-20261120.sql` (not run). Every re-checked price fact is `checkedAt` / `verifiedAt` 2026-11-20, `verifiedBy` `ra-recheck`, and expires 2026-12-21 UTC. Model: Grok 4.7.

**Open / Zach:** Check every SQL WHERE against production before running it. The 12 audit-35 unverified price facts still expire 2026-11-14; this pass did not re-read them, and the catalog test requires them to stay stale. Earliest expiry outside that allowlist is 2026-12-06 (`tencent-hy4`, `longcat-2-5`, `gpt-image-1-5-dall-e-successor`).

**Tests:** `npm test` — 1610 passed. `npm run typecheck` passed.
