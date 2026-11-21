# 2026-11-20 — cursor — RA price re-check

**Decided:** Apply the Research Analyst's full Nov 20 re-check (33 confirmed, 47 changed, 0 unreadable). List prices stay separate from sale prices. Promos are recorded only when the page states an end date. Hedra `apiPricing` is removed. Draft PR only. Do not run the SQL. Review follow-up: do not stamp a fact verified when the RA could not confirm the figure.

**Changed:** Fact files under `src/data/facts/`. Guarded SQL: `scripts/sql/catalog-price-ra-recheck-20261120.sql` (not run). 24 `currentPricing` UPDATEs (the last is topaz-labs, replacing the seeded Studio $399 sentence), 3 `freeTierFeatures` UPDATEs, and 2 `costTier` UPDATEs (beatoven-ai and google-lyria-3, FREEMIUM to PAID). Wave 6 verifies `topaz-labs.plans` and `beatoven-ai.freeTier` at 2026-11-20. The fact schema has no per-fact ttl, so both use the 30-day price clock and expire 2026-12-21. Beatoven `currentPricing` does not contain the free-generations sentence, so no extra statement was added for it. Leonardo's free-tier summary keeps the $0 / 150 Fast Tokens line and cites the privacy policy. Model: Grok 4.7.

**Open / Zach:** Check every SQL WHERE against production before running it. The 12 audit-35 unverified price facts still expire 2026-11-14. No other price fact expires before 2026-12-04. The next expiry outside that allowlist is 2026-12-06.

**Tests:** `npm test` — 1610 passed. `npm run typecheck` passed.
