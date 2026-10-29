# 2026-10-29 — Claude — Stale facts batch 1 + catalog audit 17

**Branch:** `stale-facts-b1-1029` (off `origin/main` 9fdb93d). Draft PR, see REVIEW-SUMMARY.md.

## Decided
- The stale group is the tracker rows with no source links and `updatedAt` on or before 2026-05-31: 73 rows (the brief estimated ~87). Another 19 rows with undated pricing text and October `updatedAt` bumps are batch 4. Order and split: `stale-facts-batches.md` (28 / 23 / 22 / 19).
- Batch 1 = the 28 oldest. Facts were read by research agents on vendor pages only and re-read by separate agents. A fact is `verified` only when both reads agree (`verifiedBy: "claude-recheck"`). Single-read prices are left out of facts and put on the Browser-check list.
- Audit 17 patches only facts both readers saw. Company, website, costTier and apiAvailable are guarded on their old value. No batch-1 slug is in audits 10 or 11.

## Changed
- 28 new fact files in `src/data/facts/` (68 facts verified, 20 unverified), registered in `registry.ts`.
- `scripts/update-catalog-audit-17.ts`, `src/data/catalog-audits/audit-17.ts`, `audit-17.test.ts`, and the `db:update-catalog-audit-17` npm script. Expected dry run: 26 rows / 79 fields; a re-run reports 0.
- `scripts/mcp-snapshot/apply-audit-17-to-snapshot.ts`, run once on `catalog-snapshot.json`. `catalog-snapshot.test.ts` gets the audit-17 exemption.
- `golden-top5.json`: three queries re-pinned (A15, G28, G36), because the rows now carry verified facts. No search code changed.
- LM Studio guide: optional cloud plans, and `lastReviewedAt` set to 2026-10-29.
- Hermes session note: #116 post-merge line.
- Checks: tsc, lint (0 errors), npm test (1047/1047) and audit:tutorials are all green.

## Open
- Deploy, then run audit 17: Neon branch first, then production, then `npm run cache:revalidate`.
- 18 browser checks (REVIEW-SUMMARY.md). Biggest: ChatGPT image limits (403), and USD prices for Pabbly, Paperpal and Connected Papers.
- Price facts expire after 30 days (2026-11-28) under `facts.test.ts`.
- Batches 2–4 (64 rows).

## For Zach to decide
- Rename `gpt-image-1-5-dall-e-successor` (OpenAI marks GPT Image 1.5 deprecated; the current models are GPT Image 2.5).
- Cost tiers: AI21 FREEMIUM (open weights), Nanonets and Reducto as free tier (one-time credits), Ludo PAID, Sakana left FREEMIUM until Sakana Chat is checked.
- GPT4All is near the 18-month inactivity bar (last commit 2025-05-27).
