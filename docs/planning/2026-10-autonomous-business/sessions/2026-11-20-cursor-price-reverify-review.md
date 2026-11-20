# 2026-11-20 — cursor — price re-verification review

**Decided:** Stay on draft PR #180. Do not merge. Do not run the SQL. Production Krea and Gemini wording differs from the test-branch text the first SQL targeted, so each statement now matches one of those texts and does not match its own replacement. Qwen's production description already has the Nov 16 rate note, so the SQL replaces the preview and free-quota sentences instead of appending another note.

**Changed:** `scripts/sql/catalog-price-reverify-20261120.sql`. Fact files: `verifiedBy` is `cursor-recheck` where `verifiedAt` moved to 2026-11-20. 91 price facts were confirmed on 2026-11-20 (88 date-only, plus Hugging Face Enterprise at $500 per user per month, Windsurf Teams without the $40 seat line, and Pabbly's free plan at 100 tasks a month). 81 facts stay on their old dates for the Research Analyst. Hedra was not edited. Model: Grok 4.7.

**Open / Zach:** Run the SQL on a Neon branch, then production, if the notes look right. The PR's remaining list is the set still expiring between 2026-11-25 and 2026-12-03.

**Follow-up:** Re-read https://otter.ai/pricing. Annual Pro is still $8.33/user/month. $8.49* is only on the India monthly Pro card. Business $24 is the monthly "20% off for 3 months" first-time offer; annual Business is still $19.99. No calendar end date. Facts and SQL were not changed. Otter stays on the PR's Research Analyst list.

**SQL add:** Guarded updates for Windsurf `currentPricing` and the description Plans sentence (Teams $80/mo for up to 100 users, no $40 seat line) and Hugging Face `currentPricing` (Enterprise $500/user/mo). Both stamp `(as of 2026-11-20)`. Not run.

**Tests:** `npm test` — 1610 passed. `npm run typecheck` passed.
