# 2026-11-20 — cursor — RA price re-check

**Decided:** Apply the Research Analyst's full Nov 20 re-check (33 confirmed, 47 changed, 0 unreadable). List prices stay separate from sale prices. Promos are recorded only when the page states an end date. Hedra `apiPricing` is removed. Draft PR only. Do not run the SQL. Review follow-up: do not stamp a fact verified when the RA could not confirm the figure.

**Changed:** Fact files under `src/data/facts/`. Guarded SQL: `scripts/sql/catalog-price-ra-recheck-20261120.sql` (not run). 23 `currentPricing` UPDATEs plus 3 `freeTierFeatures` UPDATEs (google-antigravity, antigravity-cli, google-lyria-3). `topaz-labs.plans` and `beatoven-ai.freeTier` are unverified with `checkedAt` 2026-10-29 (expire 2026-11-29 UTC; not allowlisted). `google-lyria-3.freeTier` and `beatoven-ai.freeTier` are `available: false`. Snapshot cost tier for those two slugs is PAID so the label check matches; no costTier SQL. Model: Grok 4.7.

**Open / Zach:** Check every SQL WHERE against production before running it, including the three new free-tier WHEREs. Prod cost tier for Lyria and Beatoven is still FREEMIUM; the script does not change it. The 12 audit-35 unverified price facts still expire 2026-11-14. Next new expiry is 2026-11-29 (`topaz-labs.plans`, `beatoven-ai.freeTier`). Earliest after that, outside the allowlist, is 2026-12-06.

**Tests:** `npm test` — 1610 passed. `npm run typecheck` passed.
