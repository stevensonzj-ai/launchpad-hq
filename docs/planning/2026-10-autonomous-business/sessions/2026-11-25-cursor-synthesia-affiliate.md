# 2026-11-25 — cursor — Synthesia affiliate

**Decided:** Zach was approved for the Synthesia affiliate program (Rewardful) on 2026-11-25. The tracked link lives only in `src/data/affiliates.ts`. Commission is 25% for the first 12 months, Starter and Creator plans only, and that note stays in the file comment. No promo code. No free access. Disclosure is affiliate only. The catalog website stays the vendor URL.

**Slug:** `synthesia`. Confirmed in `src/data/facts/synthesia.ts`, the guide's `platformSlug`, `scripts/update-catalog-audit-1.ts`, catalog audits 5, 10 and 25, and the MCP catalog snapshot row (website `https://synthesia.io`). No SQL was written.

**Changed:** `src/data/affiliates.ts` (entry), `src/data/tutorials/synthesia-getting-started.ts` and `src/data/compare/pages.ts` (`heygen-vs-synthesia` marker), `src/data/affiliates.test.ts` (entry, comparison wording, MCP output). Quiz defaults, Discover popular order, and the content-tracker fixtures already walk the registry or use their own fake entries, so they needed no new rows.

**Disclosure shows on:** `/platform/synthesia` and `/platform/synthesia/guide` (header, via `getAffiliateLink`), and `/compare/heygen-vs-synthesia` (text-only; the page does not use the tracked link). No workflow names the slug.

**MCP:** `src/lib/mcp/**` does not import affiliates. A new test runs search, compare, pricing, and free-alternatives against the catalog snapshot and asserts the tracked link is absent and Synthesia's website is still `https://synthesia.io`.

**Tests:** `npm test` — 1666 passed. `npx tsc --noEmit` passed. `npm run audit:tutorials` clean. `npm run build` compiled and finished its TypeScript pass, then stopped while prerendering because no database is configured (`ECONNREFUSED` on `prisma.platform.count()`). No dev server was started.

**Open / Zach:** Review and merge when the disclosure copy looks right. Nothing here changes rankings, search, the quiz, sponsor order, the `/data/v1` feed, JSON-LD, or comparison picks.

Model: Grok 4.7.
