# 2026-11-23 — cursor — catalog price re-verification

**Decided:** Draft only. Do not merge. Do not run the SQL on production. Re-date a price fact only when the vendor page was read that day. LongCat chat access to 2.5 stays unverified. Gemini apiPricing stays dated 2026-11-16 because Hydrogen was not re-read. Qwen apiPricing stays dated 2026-11-20.

**Changed:** PR #188 (https://github.com/stevensonzj-ai/launchpad-hq/pull/188) on `cursor/catalog-price-reverify-20261123-6379`. Fact files: gpt-image, longcat-2-5, tencent-hy4, squarespace-ai, qwen, gemini, sakana-ai, ideogram. Guarded SQL: `scripts/sql/catalog-price-reverify-20261123.sql` (13 UPDATE statements). Not run. Model: Grok 4.7.

**Open / Zach:** Apply the SQL through the Guarded SQL workflow after checking each WHERE against production. The Ideogram getting-started guide still says Microsoft sign-in gets free credits. The Gemini free-tier fact still says Flash-Lite; the subscriptions Free card now says Gemini 4 Hydrogen and was not changed. Tencent costTier was not changed.

**Tests:** `npm test` — 1650 passed. `npm run typecheck` passed.
