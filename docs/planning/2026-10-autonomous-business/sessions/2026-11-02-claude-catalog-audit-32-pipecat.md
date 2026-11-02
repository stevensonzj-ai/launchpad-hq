# 2026-11-02 — claude — catalog audit 32 (Pipecat)

**Decided:** add Pipecat as a new listing (slug `pipecat`) in Deepgram's category (`ai-apis-developer-services`) and link it from the Deepgram page. Same shape as Hermes Agent (audit 16). No affiliate links, Hedra not re-added.

**Changed (branch `audit-32-pipecat`, uncommitted, not pushed):**
- `src/data/catalog-audits/audit-32.ts` (+ `audit-32.test.ts`, added to the `test` script): row data, fixed id `cmpipecataudit32x0000001`, Deepgram append, and the SQL generator.
- `scripts/insert-catalog-audit-32.ts` (dry-run default, prod guard, idempotent, not run) and npm `db:insert-catalog-audit-32`.
- `scripts/sql/audit-32-pipecat.sql`: two guarded statements, one per line (insert if slug missing and category exists; append "Pipecat" to `deepgram.complementaryTools` once). A test keeps it equal to the generator.
- `src/data/facts/pipecat.ts` (registered): free and open source (BSD 2-Clause); Pipecat Cloud agent-1x/2x/3x per active minute from Daily's pricing page; Deepgram's acquisition of Daily worded as announced, not completed; no Pipecat Foundation page exists yet. Stars (16,999) appear only with their date.
- `src/data/tutorials/pipecat-getting-started.ts` (registered): quickstart only, price token for agent-1x, no typed prices.
- Logo: registered in `platform-logo-assets.json`, `platform-logo-plates.json` and `catalog-logos.json`.
- `catalog-snapshot.json` via `scripts/mcp-snapshot/apply-audit-32-to-snapshot.ts`: pipecat added, Deepgram list updated, `db_rows` 225 → 226. `catalog-snapshot.test` 215 → 216.
- `golden-top5.json`: A25 ("text to speech voiceover", free) now ends `…deepgram, pipecat` instead of `…deepgram, openai-api`.
- `audit-31.test.ts` no longer asserts there is no pipecat row.
- Claude's `get_pricing_facts` top-level `as_of` comes from `facts/claude.ts` `freeTier.checkedAt` (the free-tier fact wins over `plans`). Moved 2026-10-26 → 2026-11-02 (`checkedAt` and `verifiedAt`); snapshot stress test allows that one field for claude.
- `package.json` test script had `audit-31.test.tssrc/data/affiliates.test.ts` run together (no space), so neither ran. Split and added audit-32; both now run and pass.

**Open / Zach to decide:**
- Copy `C:\Users\Zach\pipecat-logo.png` to `public/images/platforms/pipecat.png` (the session could not read outside the repo). Until then one test, "has the PNG file", fails.
- Run the SQL or the script: dry-run on a Neon branch first, then `--confirm-production` with `CONFIRM_PROD_HOST`, `--apply`, then `npm run cache:revalidate`.
- Pipecat now ranks 5th for "text to speech voiceover" (free), ahead of OpenAI API. Reword the row if that is unwanted.
- Claude's free-tier summary text was re-dated on the strength of the 2026-11-02 pricing-page check; the five-hour-window note inside it still says 2026-10-26.
- The logo is the pipecat-ai GitHub org avatar (black on white, not made transparent).
