# 2026-10-29 — Claude — batch-4 browser corrections + catalog audit 21

## Decided
- Applied the Research Analyst's batch-4 browser check (lp-stale-batch4-browser.md, not committed) to the rows the batch-4 readers could not read: Clio, Scholarcy, Adobe Firefly, Restb.ai, Topaz, Cohere, Bedrock, Azure OpenAI, Acrobat AI Assistant, Antigravity. Naver is still unreadable, so it is unchanged and no prices were added.
- Zach: Antigravity CLI and IDE privacy MEDIUM (Enable Telemetry is the opt-out; business accounts have it always off; service, safety and feedback uses continue with it off). Restb.ai cost tier ENTERPRISE (reverses PAID from audit 20).
- Cohere stays FREEMIUM: the trial key never expires, so it is a permanent free tier with a non-commercial limit and a 1,000-calls-a-month cap. PAID is defensible; flagged.
- Adobe Firefly stays an accepted answer for stress-replay D02: it has a verified free tier (daily generations, count not stated) and Midjourney has none.
- Audits 19 and 20 now import their targets for the fields audit 21 also writes, so re-running either after audit 21 cannot undo it (tested in both orders).

## Changed (branch `stale-facts-fix-a21-1029`, draft PR "Batch-4 browser corrections + catalog audit 21")
- `audit-21.ts` + test + pre-row fixture, `scripts/update-catalog-audit-21.ts`, `db:update-catalog-audit-21`, snapshot script and snapshot (10 rows).
- Audit 19 (restb tier, Antigravity CLI create row), audit 20 (shared targets, restb, Antigravity IDE privacy) and their tests.
- New fact files: clio-manage, scholarcy. Updated: adobe-firefly, topaz-labs, cohere, amazon-bedrock, azure-openai-service, adobe-acrobat-ai-assistant, restb-ai, antigravity-cli, google-antigravity, naver (note only).
- Guides: Antigravity CLI and IDE, Restb.ai, Clio, Scholarcy, Acrobat AI Assistant (dates bumped).

## Open
- Run audits 19, 20, 21 in any order (Neon branch first), then `cache:revalidate`. Audit 21 expected dry run: `audit21: 11 rows / 22 patched fields (dry-run)` once audit 20 as first merged is applied.
- Browser-check list in the PR; Naver still needs a real browser.

## For Zach to decide
- Scholarcy FREE to FREEMIUM (a limited free tier plus Plus $9.99): not in the brief, done because the row said FREE next to a paid plan.
- Guide dates were bumped on the six edited guides although the browser check covered only their price, plan and privacy facts.
- Cohere FREEMIUM vs PAID.
