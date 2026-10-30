# 2026-10-29 — Claude — stale facts batch 3 + catalog audit 19

## Decided
- Same process as batch 2: two blind readers per platform on vendor pages only; "verified" only when both agree.
- Folded the Research Analyst's batch-2 browser checks into this PR (Leonardo, Trinka, Wix, Designer, Squarespace, Codex, Power Automate, Dragon, Healthee) plus GPT Image's leftover "3 images/day" upgrade trigger.
- Added the approved Antigravity CLI row (create-only in audit 19), with a fact file and a guide, cross-linked with Gemini CLI both ways. FREEMIUM, privacy LOW, not open source, no request-rate numbers. Pro/Ultra prices come from the RA's browser addendum.
- Audit 18 now writes audit 19's text on the 10 fields both set, so re-runs in any order converge.

## Changed (branch `stale-facts-b3-1029`, draft PR "Stale facts batch 3 + catalog audit 19")
- 21 batch-3 fact files and `antigravity-cli.ts`; 9 batch-2 fact files updated; registry.
- `src/data/catalog-audits/audit-19.ts` + test (22 tests); `scripts/update-catalog-audit-19.ts`; `db:update-catalog-audit-19`; snapshot applied (27 rows).
- Guides: new antigravity-cli guide; fixes to scale-ai, pathai, openai-codex-cli, microsoft-power-automate, glasp and gemini-cli.
- Test expectations: 7 golden re-pins, stale-flag example (now quizlet-q-chat), stress-replay exemption.
- `stale-facts-batches.md` status.

## Open
- Run audits 17/18 if not yet applied, then audit 19 (Neon branch first), `cache:revalidate`, and a redeploy for the new `/platform/antigravity-cli` slug.
- Browser-check list in the PR: Quizlet, Bloomberg, Zillow and Duolingo were unreadable; plus Udio/Murf/Beatoven pricing and the Antigravity opt-out.
- Batch-2 fetch items for Gemini CLI, Upstage and Aider: the companion fetch file was not available.
- Batch 4 (19 rows).

## For Zach to decide
- Restb.ai ENTERPRISE vs PAID; Soundraw PAID; Leonardo privacy MEDIUM vs LOW.
- Renames (Lyria 3 → 3.5, Quizlet Q-Chat, plus Shopify/Salesforce from batch 2).
- Stale neighbours left alone: the google-antigravity row, and Gemini CLI listed as "free" in other rows' budget alternatives.
