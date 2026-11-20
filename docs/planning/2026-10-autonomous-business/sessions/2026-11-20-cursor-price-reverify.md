# 2026-11-20 — cursor — price re-verification

**Decided:** Draft only. Do not merge. Do not run the SQL on production. Re-date a price fact to 2026-11-20 only when the fetched vendor page still showed the recorded price. Pages that did not render the price stay on their old date.

**Changed:** Draft PR on `cursor/price-reverify-20261120-84d7`. Fact files under `src/data/facts/` (106 price facts re-dated with the same price; Krea plan prices changed). Qwen preview copy, Gemini 4 Carbon price order, and MiniMax H3-Image rates. Guarded SQL: `scripts/sql/catalog-price-reverify-20261120.sql`. Model name on the PR: Grok 4.7.

**SQL test:** Neon test project `plain-sky-27225329`, throwaway branch `br-rapid-wind-beq18vtk`, then deleted. First run updated krea pricing and description, the Gemini Carbon sentence, and appended the Qwen and MiniMax notes. A second pass matched 0 rows. Production and the read-only connector were not used.

**Open / Zach:** Run the SQL on the test target, then production, if the notes look right. The Needs Research Analyst list on the PR is the set whose pages were blocked or did not show the recorded price. Krea's yearly prices are the lower figure on each card. MiniMax still shows a limited-time 4K discount with no end date.

**Tests:** `npm test` — 1610 passed. `npm run typecheck` passed.
