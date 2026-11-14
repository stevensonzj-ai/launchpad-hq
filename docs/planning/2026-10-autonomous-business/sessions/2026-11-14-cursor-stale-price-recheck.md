# 2026-11-14 — cursor — stale price recheck (catalog audit 35)

**Decided:** The live fact-file date check was failing because 39 tools still had free-tier or plan `checkedAt` of 2026-10-14 (31 days, limit 30). Recheck vendor pricing pages. Move `checkedAt` to 2026-11-14 only when the page confirmed the price. Pages that could not be read stay 2026-10-14 and are marked unverified. Zach approved this on 2026-11-14.

**Changed:** Fact files under `src/data/facts/` for those 39 tools. Catalog audit 35 (`src/data/catalog-audits/audit-35.ts` and its test). Guarded SQL at `scripts/sql/catalog-audit-35-20261114.sql` for comfyui, sarvam-ai, captions, vapi, and firecrawl. No Hedra SQL: that slug is on the removed-platform denylist. `package.json` `scripts.test` gained `audit-35.test.ts` only. The October stress snapshot test allows the new `as_of`, verification, and starting-price differences.

**Open / Zach:** The SQL file is not applied. Run it yourself if production still has the old sentences. Gamma, Higgsfield, Perplexity Comet, QuillBot, Qwen, Wispr Flow, DeepL's API dollar amounts, JetBrains AI Free, and Hedra's free plan could not be confirmed.

**Tests:** `npm test` — 1527 passed. `npm run build` compiled and typechecked; static generation then failed because `DATABASE_URL` is unset in this environment (`ECONNREFUSED` on `prisma.platform.count()`). No database was contacted.
