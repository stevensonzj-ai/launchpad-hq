# 2026-11-12 cursor: X-watch catalog update

**Decided:** Two new rows only: `muse-ember` and `gemini-decisions-api` (AI APIs & Developer Services). Qwen4-Max-Preview, MiniMax H3-Image, and Canva Craft are notes on `qwen`, `minimax`, and `canva-ai-magic-studio` because those rows exist and the first is a short preview. Extractions API is a note on `openrouter`, not a row. There is no price-fact expiry field; end dates live in the copy and, for Gemini 4 Carbon, in the model price note (same place Argon's intro price already uses).

**Changed (branch `catalog/xwatch-20261112`, draft PR, not merged):**
- `scripts/sql/catalog-xwatch-20261112.sql` — idempotent create/update only.
- Fact overlays and the Claude and Gemini model registries. Fable 5.2 and Mythos 5.2 are $8 / $40 per 1M. Carbon intro price ends 2026-11-30. Qwen4-Max-Preview ends 24:00 2026-11-25 (UTC+8).
- `src/data/catalog-audits/xwatch-20261112.test.ts` (added to `npm test`).

**Left out (pages did not confirm):** Stripe deal closed / owned on Nov 10 (the 2026-08-19 post still says closing conditions). MiniMax half-price end date of Nov 17 (the post says launch week only). v0 by name (the partners page lists Vercel). OpenCode as Business plan usage (it is under open-source integrations, and there is no `opencode` row). The word "GA" for Carbon.

**Open:** Zach runs the Guarded SQL on a Neon branch, then production. Expected count 231 → 233 if both new slugs are absent. Re-check Carbon on 2026-12-01, Qwen4-Max-Preview after 2026-11-25, and whether the MiniMax launch-week discount has a calendar end.
