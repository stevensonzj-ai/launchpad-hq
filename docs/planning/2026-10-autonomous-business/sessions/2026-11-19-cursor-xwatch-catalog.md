# 2026-11-19 cursor: X-watch catalog SQL

**Decided:** Description notes only, on rows that already exist. No new slugs. No fact-file overlay in this batch. SQL was not run. No removed catalog row was named in the SQL file. Claude `upgradeTriggers` was left as the 2026-11-16 fix.

**Changed:** `scripts/sql/catalog-xwatch-20261119.sql`. Twelve idempotent `UPDATE`s. Slugs: `openai-api`, `chatgpt` (twice), `gemini`, `github-copilot`, `tencent-hy4`, `suno`, `hugging-face`, `openrouter`, `lm-studio`, `cohere`, `replit-agent`.

**Left out:** Microsoft-Decision-1.1 (verified on the Microsoft post, including image input and Foundry token prices, but there is no model, Foundry, or Vercel row). An OpenRouter-printed end date for Hy4 Flash (the page shows the 50% rates and does not state November 30; the clock time is Tencent Cloud's, through 12:00 Beijing on 2026-11-30). MAI Code 2 cost comparisons (promotional, no per-token price, no end date). The words "private preview" for Cohere Video Intelligence (the post recruits design partners). Suno Pro/Premier trial credits have no end date on the Visuals page, so the note says that instead of inventing one.

**Open:** Zach runs Guarded SQL on the Neon test target (`dry_run` first), then production if the notes look right. Re-check the Hy4 Flash half-price after 2026-11-30 12:00 Beijing, GPT-6.2 Ultrafast after 2027-02-28 Pacific, and whether Replit's Fabric docs still say preview after the Ignite post. `hugging-face`, `lm-studio`, `cohere`, and `replit-agent` descriptions were null on 2026-11-19, so the first run sets the description to the note alone.
