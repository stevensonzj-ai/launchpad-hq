# 2026-11-05 claude: X-watch fact updates

**Decided:** GPT Image listing renamed "GPT Image 2.6 (Flare / Sunburst)" (officialUrl stays chatgpt.com). LongCat keeps SQL FREEMIUM, so its freeTier is available:true with status unverified. Hy4 officialUrl stays the OpenRouter page.

**Changed (unstaged, branch catalog/xwatch-20261105):**
- New fact files `tencent-hy4.ts`, `longcat-2-5.ts`, registered in `registry.ts`.
- `gpt-image-1-5-dall-e-successor.ts`: 2.6 name, API rates incl. cached text/image, Batch not supported, changelog.
- `kimi.ts`, `windsurf.ts`, `openrouter.ts`, `replit-agent.ts`, `notion-ai.ts`, `hermes-agent.ts`: feature notes and 2026-11-05 changelog entries (windsurf company now Cognition).
- Tests adjusted so older audits accept the newer GPT Image facts: `audit-17/18/22.test.ts`.

**Checks:** typecheck passes. npm test: 1446 of 1447 pass.

**Open:** `removed-slugs.test.ts` fails because the staged SQL header comment names "Hedra" (a denylisted slug). I did not touch the SQL; remove that word from the comment. Nothing committed or pushed.

**Zach to decide:** whether the LongCat chat page confirms free access today (would let freeTier go to verified); whether to keep the audit-test exemptions or fold the GPT Image bump into a proper audit module.
