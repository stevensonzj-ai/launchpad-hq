# 2026-10-29 — Claude — Hermes Agent + catalog audit 16

**Branch:** `hermes-agent-1029` (off `origin/main` 1e80d41). Draft PR, see REVIEW-SUMMARY.md.

## Decided
- Added Hermes Agent (Nous Research) as a new row via operator script `scripts/update-catalog-audit-16.ts`. It is create-only, dry run by default, and uses the shared prod guard.
- Category is `workflow-automation`, because the catalog has no "AI agents" category and Manus and Lindy already sit there.
- Alternatives are only rows that exist: Claude Code, OpenAI Codex CLI, Lindy AI. OpenClaw has no row.
- Provisional pricing lives in one block: `freeTier`/`plans` in `src/data/facts/hermes-agent.ts`. The audit builds the row text from it. Bonus, rollover, credit amounts and included usage are left out.
- New pick-and-setup guide `hermes-agent-getting-started.ts`, reviewed 2026-10-29. No affiliate markup.

## Changed (files)
- `scripts/update-catalog-audit-16.ts`
- `src/data/catalog-audits/audit-16.ts`
- `src/data/catalog-audits/audit-16.test.ts`
- `package.json`
- `src/data/facts/hermes-agent.ts`, `src/data/facts/registry.ts`
- `src/data/tutorials/hermes-agent-getting-started.ts`, `src/data/tutorials/index.ts`
- `REVIEW-SUMMARY.md`

Checks: tsc, lint (0 errors), npm test (1037/1037) and audit:tutorials are all green.

## Open
- Run audit 16 after the deploy: Neon branch first, then production, then `npm run cache:revalidate`. No redeploy is needed, because the routes are force-dynamic. A null row cached before the insert can show a 404 for up to 24 h unless you revalidate or redeploy.
- `/llms.txt` links the guide as soon as the code deploys, and that link 404s until the row exists.
- Browser check still owed: portal.nousresearch.com/pricing (bot checkpoint), Portal signup/trial, cloud region.
- `docs/caching.md` says 3600 s, but the code uses 86400 s.

## For Zach to decide
- Confirm the category (`workflow-automation` or `local-open-source-ai`), `privacyLevel` MEDIUM, difficulty INTERMEDIATE, and `apiAvailable: false` (the API is not stated).
- Firm up the pricing after the Portal browser check, then edit the fact-file block.
