# 2026-10-29 — Claude — Stale facts batch 2 + catalog audit 18

**Branch:** `stale-facts-b2-1029` (off `origin/main` 1dcf6ee, after #117). Draft PR, see REVIEW-SUMMARY.md.

## Decided
- Batch 2 = rows 29–51 of `stale-facts-batches.md` (23 platforms). Same bar as batch 1: vendor pages only, two independent blind readers per platform (12 agents), `verified` only where both agree, single reads left out or `unverified` and put on the Browser-check list.
- Audit 18 patches only facts both readers saw; company, website and costTier are guarded on their old value. Audit 10 has no batch-2 slug; audit 11 owns only squarespace-ai's costTier, which audit 18 never writes.
- ENTERPRISE rows with no free tier stay ENTERPRISE (the test now allows it); Tray moves to PAID ($50 entry price).

## Changed
- 23 new fact files in `src/data/facts/` (79 facts verified, 7 unverified), registered in `registry.ts`.
- `scripts/update-catalog-audit-18.ts`, `src/data/catalog-audits/audit-18.ts`, `audit-18.test.ts`, and the `db:update-catalog-audit-18` npm script. Expected dry run: 21 rows / 67 fields (54 text, 6 websites, 6 cost tiers, 1 company); a re-run reports 0.
- `scripts/mcp-snapshot/apply-audit-18-to-snapshot.ts`, run once on `catalog-snapshot.json`; snapshot test exemption for batch 2.
- 10 guides fixed where they contradicted the findings (gemini-cli, slack-ai, workato, salesforce-einstein, power-automate, shopify, codex-cli, scenario, upstage, tray), with `lastReviewedAt` 2026-10-29.
- Test expectations moved with the data: 11 golden re-pins, Grammarly-alternative order (Trinka first), stale-flag example (leonardo → aiva), audit-11 squarespace `updatedAt` pin. No search code changed.
- Checks: tsc, lint (0 errors), npm test (1059/1059) and audit:tutorials are all green.

## Open
- Deploy, then run audit 18: Neon branch first, then production, then `npm run cache:revalidate`.
- 16 browser checks (REVIEW-SUMMARY.md). Biggest: Leonardo and Trinka prices, Wix USD prices, Codex CLI on the Free/Go plans, Microsoft Designer's free allowance, Workato's self-serve docs.
- Price facts expire after 30 days (2026-11-28) under `facts.test.ts`.
- Batches 3–4 (41 rows).

## For Zach to decide
- Gemini CLI: keep listed as PAID, or hide / point to Antigravity CLI (free use moved there on 2026-06-18).
- Renames: "Shopify Magic / Sidekick" → Sidekick; "Salesforce Einstein" (page now says AIforce).
- Cost tiers: Salesforce stays ENTERPRISE despite a $0 Foundations listing; Codex CLI and Designer FREEMIUM without a freeTier fact.

## Add-on: batch-1 browser checks (same day, same PR)
- Folded the Research Analyst's browser checks of batch 1's 18 open items into this PR. Used only items marked verified, citing the RA's URLs; NOT STATED or self-conflicting items became `unverified` or "not stated" / "not confirmed". The RA notes file stays out of the repo.
- 18 batch-1 fact files updated. Audit 18 gains 16 batch-1 patches (32 fields) plus a guarded `privacyLevel`: Gumloop HIGH → LOW (policy §21 trains on self-serve content), Relevance AI PAID → ENTERPRISE (public page shows Enterprise only), GPT Image website → https://chatgpt.com. Ludo stays PAID, and its 30 sign-up credits are dropped. Litmaps Free has 2 maps. Meshy is monthly prices only (its yearly view conflicts). Fireworks' starting-credit line is out of its guide.
- Audit 17's text aligned with audit 18 on 17 shared fields, and its relevance tier goes to ENTERPRISE, so the two converge in either order.
- 6 guides changed and their dates bumped (fireworks, gumloop, relevance-ai, litmaps, pabbly-connect, replicate). 5 golden re-pins; Grammarly-alternative order is now Paperpal first.
- Expected dry run if audit 17 already ran: 37 rows / 99 fields. If not, run 17 first, then expect 29 / 81 from 18.
- Checks: tsc and audit:tutorials clean, lint 0 errors, npm test 1062/1062.
- For Zach: confirm Gumloop LOW (vs MEDIUM), Relevance ENTERPRISE despite the docs' Pro/Team, and the post-merge edit to audit 17.
