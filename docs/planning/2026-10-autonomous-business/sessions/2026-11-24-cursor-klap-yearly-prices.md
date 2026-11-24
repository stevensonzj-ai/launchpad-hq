# 2026-11-24 — cursor — Klap yearly prices

**Decided:** Draft only. Do not merge. Do not run the SQL. Yearly billing on https://klap.app/pricing (page says prices last updated Nov 4, 2026; checked by Zach's team this morning) is $14.50 / $39.50 / $94.50 a month, which is $174 / $474 / $1,134 a year. Month-to-month stays $29 / $79 / $189. The 2026-10-29 audit-13 create sentence stays as history because that script only creates a missing row and the test locks the old fact pack. Opus Clip's $14.50, the Klap guide, and the guide's 4K export line were not changed.

**Changed:** Fact file `src/data/facts/klap.ts` (plans limits, note, checkedAt/verifiedAt 2026-11-24, changelog). Guarded SQL `scripts/sql/catalog-klap-yearly-20261124.sql` (2 UPDATEs, not run). A read-only look at production `platforms.currentPricing` for slug `klap` matched the audit-13 sentence. Platform and compare pages render the fact file, which overlays that column; the SQL keeps the stored sentence aligned. Model: Grok 4.7.

**Open / Zach:** Apply the SQL through the Guarded SQL workflow. On the sentence read today, statement 1 updates 1 row and statement 2 updates 0. A second run updates 0. Fields changed are `currentPricing` and `updatedAt` only.

**Tests:** `npm test` — 1661 passed. `npm run typecheck` passed.
