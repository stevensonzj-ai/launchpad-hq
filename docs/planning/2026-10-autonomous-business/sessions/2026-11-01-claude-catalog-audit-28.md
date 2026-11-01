# 2026-11-01 — claude — catalog audit 28

**Decided:** rows audit 27 left open were re-read on 2026-11-01. Rule applied: still unverifiable after a real attempt means hide with a 301, never delete.

**Changed (branch `catalog/audit-28-1101`, local commit, not pushed):**
- `src/data/catalog-audits/audit-28.ts` + test, `scripts/update-catalog-audit-28.ts` (operator-only, dry-run default), `scripts/mcp-snapshot/apply-audit-28-to-snapshot.ts` (run), `db:update-catalog-audit-28` npm script.
- DB text (4 rows): duolingo-max freeTierFeatures corrected; mem pricing, free tier and limits from get.mem.ai/pricing; speak-language-ai and zillow-ai-zestimate re-dated to 2026-11-01.
- Hidden with 301 (fact file `visibility: "hidden"`, `HIDDEN_PAGE_REDIRECTS`): naver-hyperclova-x-cue (discontinued, to perplexity-ai), genspark (to manus), poe (new fact file, to openrouter). Their three guides moved to `src/data/tutorials/retired/`. clarifai was already hidden.
- Fact files re-dated: duolingo-max, speak-language-ai, zillow-ai-zestimate. Snapshot and golden top-5 updated; older audit/MCP tests adjusted for the hidden rows.

**Open / Zach to decide:**
- Run `npm run db:update-catalog-audit-28` on a Neon branch with `--dry-run` first, then production, then `npm run cache:revalidate`.
- duolingo-max `usageLimits` and `currentPricing` still say "heart limits"/hearts; Duolingo now uses an energy meter. Not changed (outside the brief).
- naver-hyperclova-x-cue row text still describes the closed Cue: chatbot (page is hidden, so unseen); no DB change made.
- No `src/data/facts/mem.ts` created (skipped as not simple).
