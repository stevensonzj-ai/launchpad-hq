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
