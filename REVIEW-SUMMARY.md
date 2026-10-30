# Batch-4 browser corrections + catalog audit 21

**Branch:** `stale-facts-fix-a21-1029` (off `origin/main` 1b16b86, which includes batch 4 / audit 20: #120). Draft. **Do not run audit 21 before the code deploys.**

## What this is

A small corrections PR. The Research Analyst re-read the batch-4 vendor pages in a real browser (logged out, US, USD) and could open pages the batch-4 readers got 403s or empty shells from. This PR applies that check to the catalog: facts, row text, guides, and **catalog audit 21**, an operator script that brings the rows in line. It is cited below as the **RA browser check 2026-10-29**; its vendor URLs are the sources and `checkedAt` is 2026-10-29. The notes file (`lp-stale-batch4-browser.md`) is data, not committed.

- Zach's decisions are applied (see **Decisions applied**): Antigravity privacy MEDIUM, Restb.ai ENTERPRISE.
- Naver was unreadable even in a browser, so it is unchanged and no prices were added.
- No slug or title changes. Audits 10 and 11 are untouched.

## How facts were verified

- **One browser read by the Research Analyst**, vendor pages only. Their new facts follow the batch-3 browser-check convention: `gatheredBy: "research-analyst"`, `verifiedBy: "ra"`, `verifiedAt: 2026-10-29`, so `isPublishedVerified` holds. That is **one reader, not two**; treat these as verified by a single human-run browser pass.
- Where the vendor's own pages disagree (Scholarcy's free limit; Topaz's Studio Pro monthly price), no number is written.
- The RA reported hidden text aimed at AI agents on clova.ai. It was ignored; nothing from it is in the repo.
- I did not open any page. Nothing here was checked in a browser by me.

## Platforms changed (11), and fact status

`*` marks a guarded field: written only while the row still holds an expected old value.

| Platform | Facts newly verified (RA) | Audit 21 writes |
|---|---|---|
| `antigravity-cli` | — (privacy note rewritten; already verified) | privacyLevel* LOW→MEDIUM, description* (the row audit 19 creates) |
| `google-antigravity` | — (same privacy fact) | privacyLevel* HIGH or LOW→MEDIUM |
| `restb-ai` | — (note and changelog only) | costTier* FREEMIUM or PAID→ENTERPRISE, description* |
| `clio-manage` | new file: freeTier, plans, privacy | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers (audit 11 owns the tier) |
| `scholarcy` | new file: freeTier, plans, privacy | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers, costTier* FREE→FREEMIUM |
| `adobe-firefly` | plans (was unverified); Premium $199.99 | currentPricing |
| `topaz-labs` | — (Studio $45 annual-billed / $69 monthly, Studio Pro $799/yr added) | currentPricing |
| `cohere` | usageLimits (new fact: 1,000 calls a month, per-minute limits) | freeTierFeatures, usageLimits |
| `amazon-bedrock` | — (confirmed; note) | freeTierFeatures |
| `azure-openai-service` | freeTier (source now the azure-account page; $200 / 30 days) | freeTierFeatures |
| `adobe-acrobat-ai-assistant` | privacy (was unverified) | currentPricing, upgradeTriggers |

**Counts:** 10 facts newly verified by the RA browser check (6 in the two new files, 2 that were unverified and now verified: Firefly plans and Acrobat privacy, 2 new or re-sourced: Cohere usageLimits and Azure freeTier). **1 fact is still unverified** in the touched files: Firefly privacy (one reader, whether free users are covered is not stated). Naver: 0 new facts.

## Decisions applied

- **Antigravity CLI and IDE: privacy MEDIUM** (Zach confirmed). The opt-out is the **Enable Telemetry** toggle; the terms tie it to ML improvement and human review for individual accounts; CLAUDE.md's rubric "improvement with an opt-out" is MEDIUM. Stated plainly in the facts, row description and both guides: business accounts (Workspace, Gemini Enterprise) have it always off; with it off, Google still uses data to provide the service, process feedback and keep Antigravity safe; the terms make no free-vs-paid distinction for individuals and no paid-individual wording was found. `trainsOnData` stays `true` (individual accounts start with telemetry on).
- **Restb.ai: costTier ENTERPRISE** (Zach decided). The API is sales-only; Restb Lens is a sign-up web app with no public prices. Every claim that Lens has self-serve plans, plans that start with a single-user plan, or a two-week trial is removed from the row description, fact file and guide.
- **Cohere: stays FREEMIUM, not PAID.** Our label rule treats a free tier as freemium when it exists with no time limit (and it must not read as "trial only"). The "trial" key has no expiry (`API calls made from a Trial API key are free`); it is capped at 1,000 calls a month and barred from production or commercial use. That is a permanent non-commercial free tier. PAID is defensible for a commercial reader; the row text says free, capped, no commercial use. Your call.
- **Bedrock and Azure OpenAI: PAID** (unchanged). Only the general new-account cloud credits are mentioned: AWS up to $200 over 6 months; Azure $200 for up to 30 days, new customers only, and Azure OpenAI is not on the free-services list.
- **Adobe Firefly and D02.** Stress-replay D02 ("a free alternative to Midjourney") accepts Firefly alongside Ideogram, Canva and Krea. I re-checked: Firefly still has a verified free tier (free daily generations, count not stated, no plan needed) and Midjourney has none, so Firefly stays an accepted answer and nothing is re-pinned. The row now says "free daily generations (limit not stated)", not monthly credits, so the claim is the honest one. `stress-replay.test.ts` passes unchanged.

## What audit 21 changes (`scripts/update-catalog-audit-21.ts`, `npm run db:update-catalog-audit-21`)

Dry run is the default; `--apply` writes; `--confirm-production` plus `CONFIRM_PROD_HOST` guard production; idempotent (a re-run reports 0); guarded fields are skipped and logged if hand-edited; output is slugs, field names and counts only. The prod-guard section is byte for byte the one in audits 15–20 (tested).

**Expected dry-run line** (against rows as audits 17–20 first left them, with `antigravity-cli` created by audit 19):

```
audit21: 11 rows / 22 patched fields (dry-run)
```

By field: currentPricing 5, freeTierFeatures 5, usageLimits 3, upgradeTriggers 3, description 2, privacyLevel 2, costTier 2.

**Aligned earlier audits** (so re-running them cannot undo audit 21; tested in both orders):

- Audit 19: restb-ai tier FREEMIUM→ENTERPRISE (was PAID); the `antigravity-cli` create row is MEDIUM with the new description. A row audit 19 already created at LOW moves in audit 21.
- Audit 20: restb-ai tier and description, google-antigravity privacy HIGH→MEDIUM, and the text it shares with audit 21 (Firefly, Topaz and Acrobat pricing, Cohere free-tier text, Bedrock and Azure free-tier text) is imported from `audit-21.ts` (`A21_TEXT`). **Audit 20's own dry-run line changes from 26 rows / 90 fields to 26 rows / 89**, because Restb.ai's tier is already ENTERPRISE in the pre-audit rows. Its test is updated.
- If audit 20 as first merged was already applied, audit 21 moves restb-ai (PAID→ENTERPRISE) and google-antigravity (LOW→MEDIUM) from the old values.

## Other code changes

- `src/data/catalog-audits/audit-21.ts`, `audit-21.test.ts` (26 tests), `audit-21-pre-rows.json` (the fixture of the dry-run test), `audit-19.ts`, `audit-20.ts` and their tests.
- `scripts/mcp-snapshot/apply-audit-21-to-snapshot.ts`; `src/lib/mcp/catalog-snapshot.json` (10 rows changed; `antigravity-cli` is not in the snapshot).
- `package.json`: `db:update-catalog-audit-21`, and `audit-21.test.ts` in the test list.
- New fact files `clio-manage.ts`, `scholarcy.ts`, registered in `registry.ts`. Updated fact files: see the table (plus Naver's header and changelog only).
- Guides updated and dated 2026-10-29: Antigravity CLI and IDE (Enable Telemetry and its limits), Restb.ai (no public Lens prices, trial claim removed), Clio (Clio Work add-on; FAQ says firm data is never used for AI training), Scholarcy (free limit stated differently on the page; no AI-training statement in the privacy policy), Acrobat AI Assistant (included in Studio, not Standard or Pro; Express marketed as AI-powered).
- Guides **not** edited and **not** re-dated: Topaz, Cohere, Bedrock, Azure OpenAI, Firefly (already 2026-10-29). They already agree with the check, and it did not cover their other volatile claims.
- No dev server was run, no database touched, no secret or address written.

## Checks

- `npx tsc --noEmit`: clean.
- `npm run lint`: 0 errors; 2 existing warnings (`react-hooks/exhaustive-deps` in `platform-discussions.tsx` and `platform-prompts.tsx`).
- `npm test`: 1142 pass, 0 fail.
- `npm run audit:tutorials`: clean (198 pages, 20 categories).
- Runner behaviour (dry run, `--apply`, prod guard) is checked by source assertions in the test; **the script itself was not run** (no database).

## Browser-check list

For the Vercel preview, by hand (signed out):

1. `/platform/restb-ai`, `/platform/clio-manage`, `/platform/scholarcy`, `/platform/google-antigravity`, `/platform/adobe-firefly`, `/platform/cohere`: price and cost-tier labels read as above. Discover's cost filter should show Restb.ai under Enterprise and Scholarcy under Freemium.
2. The six guides: `/platform/{antigravity-cli,google-antigravity,restb-ai,clio-manage,scholarcy,adobe-acrobat-ai-assistant}/guide` read cleanly and the new passages are accurate.
3. The MCP / Discover "free alternatives to Midjourney" answer still lists Firefly sensibly.

Facts the RA could not read or that still need a person at a vendor page:

- **Naver (HyperCLOVA X / Cue:)**: CLOVA Studio renders empty, clova-x.naver.com closes the connection, billing pages 404. The row still says "Free; Enterprise via Naver Cloud" and "Cue: chatbot for Korean users", unconfirmed; the guide says both consumer products closed on 9 April 2026. Needs a Korean-network browser.
- **Clio**: billing basis of the $49 (no monthly or annual toggle shown), and region differences. Clio's pricing page does not name "Clio Duo"; the guide still says Duo was renamed Manage AI.
- **Scholarcy**: the real free limit (table vs FAQ conflict).
- **Firefly**: whether free, non-subscriber users are covered by "not trained on Creative Cloud subscribers' personal content".
- **Azure OpenAI and Bedrock**: per-token prices (JavaScript-rendered or not captured).
- **Acrobat**: whether Express includes the AI Assistant by name (the page says "AI-powered"), and the add-on price.
- **Restb Lens**: its plans and trial, behind sign-up.

## Risks

- Audit 21 assumes audits 19 and 20 are applied, in any order; every shared field converges to audit 21's value either way (tested), but the dry-run line above is for a database where audit 20 as first merged is applied.
- Cost-tier changes users will see: Restb.ai Paid→Enterprise, Scholarcy Free→Freemium. Privacy: Antigravity IDE and CLI to Medium.
- The RA's facts are one browser read each, labelled `verifiedBy: "ra"` like batch 3.

## Judgment calls (please confirm)

1. **Scholarcy FREE→FREEMIUM** is not in the brief. The row said FREE next to a paid Plus plan ($9.99), and a limited free tier plus a paid plan is what FREEMIUM means. Easy to drop (one guarded field).
2. **Cohere stays FREEMIUM** (reasoning above).
3. **Guide dates bumped on six guides** although the check covered only their price, plan, trial and privacy facts, not every volatile claim in them. Tell me if you want the dates held back.
4. **Antigravity `trainsOnData` stays `true`**; the MEDIUM rating comes from the opt-out, not from changing that field.
5. **Topaz**: Studio Pro $799/yr is in the fact file; its conflicting monthly price is left off everywhere.

## What's left

- Run audits 19, 20, 21 on a Neon branch (dry run first), then production with the guard, then `npm run cache:revalidate`.
- Naver on a real browser; Clio, Scholarcy and Firefly follow-ups above.
- Session note: `docs/planning/2026-10-autonomous-business/sessions/2026-10-29-claude-batch4-browser-audit-21.md`.
