# 2026-11-23 cursor: X-watch catalog SQL

**Decided:** Description notes on rows that already exist. No new slugs. No Hedra. Prices only where the vendor page stated them, with no invented end date. GLM-5.4, Inkling 2 Mini, and the Foundry MAI models stay off the SQL because those products have no catalog row. Claude `upgradeTriggers` in the committed snapshot drops the Opus 4.6 phrase and names no model. A read-only check of the production branch already showed that sentence in the database, so the new statement is a no-op there and still rewrites a branch that has the old text.

**Changed:** `scripts/sql/catalog-xwatch-20261123.sql`. Six idempotent `UPDATE`s. Slugs: `openai-api`, `gemini`, `kling-ai`, `replit-agent`, `qwen`, `claude`. Fact overlays on those five product files, plus `audit-37` and the snapshot line for Claude. SQL was not run.

**Left out:** GLM-5.4 (confirmed on the Z.ai post; API coming soon; no token price; no row). Inkling 2 Mini (confirmed on the news post and Hugging Face card; no row). MAI Image 2.7 / Flash and MAI Realtime 1 (confirmed on the Microsoft posts; no Foundry row; not placed on Copilot). MAI Cyber 2 Flash is not listed as available. Wan 3.0 in ComfyUI, Hy4 on Ollama Cloud and Together, Seedance 2.5 Flash on Pika, Runway Agent, and the Perplexity Computer extension were not on the named vendor page.

**Checks:** `npm test` 1648 pass, 0 fail. `npm run typecheck` passed. `next build` compiled and TypeScript finished, then static generation failed because `DATABASE_URL` is unset (`ECONNREFUSED` on `prisma.platform.count()`).

**Open:** Zach runs Guarded SQL on the Neon test target (`dry_run` first), then production if the notes look right. Re-check Qwen4-Max-Preview after 24:00 on 2026-11-25 (UTC+8), and Carbon's introductory API price after 2026-11-30. A Z.ai or Thinking Machines row would be a separate inclusion pass.
