# 2026-11-16 cursor: X-watch catalog update

**Decided:** Update existing rows only. No new slugs. Gemini 4 Hydrogen, Qwen4-Max, Claude Meetings, ChatGPT Wallet, DeepSeek's Nov 13 API tools, Devin Apps, Suno Bridge, and Gemini 4 Hydrogen in GitHub Copilot are notes or price facts on `gemini`, `qwen`, `claude`, `chatgpt`, `deepseek`, `windsurf`, `suno`, and `github-copilot`. Claude `upgradeTriggers` drops the Opus 4.6 phrase and names no model, matching the ChatGPT copy fix. Cache, Batch, and Flex prices for Hydrogen come from the Gemini API pricing page, not the launch post. Qwen4-Max-Preview still retires at 24:00 on 2026-11-25 (UTC+8).

**Changed:** branch `catalog/xwatch-20261116`, draft PR, not merged. SQL was not run.

- `scripts/sql/catalog-xwatch-20261116.sql` — 9 idempotent `UPDATE`s. Slugs: gemini, qwen, claude (twice), chatgpt, deepseek, windsurf, suno, github-copilot.
- `src/data/catalog-audits/audit-36.ts` and `audit-36.test.ts`. The test is imported from `xwatch-20261112.test.ts` so `npm test` runs it. `package.json` was not edited.
- Fact overlays and the Gemini, Qwen, and DeepSeek model registries. `checkedAt` 2026-11-16 only on facts re-read that day.

**Left out:** Inkling 2 Small (Hugging Face license is Apache 2.0, but no catalog row says "Tinker only, weights planned"). Sesame (no row; sesame.com did not show the plan prices). Perplexity Teammates (official pages returned 403). Seedance 2.5 Flash in HeyGen and ComfyUI (not on the pages fetched). A new Argon $4/$20 line (the pricing page still shows it, and the model registry already records it). Suno Bridge spending credits (the post does not say that).

**Checks:** `npm test` 1534 pass, 0 fail. `npm run typecheck` passed. `next build` compiled and TypeScript finished, then static generation failed because `DATABASE_URL` is unset (`ECONNREFUSED` on `prisma.platform.count()`). No database was contacted and the catalog SQL was not run.

**Open:** Zach runs the Guarded SQL on a Neon branch, then production. Platform count does not change. Re-check Qwen4-Max-Preview after 2026-11-25, and Claude Meetings' free docs and whiteboards after 2027-02-10.
