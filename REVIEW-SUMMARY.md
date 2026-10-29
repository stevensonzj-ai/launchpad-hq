# Add Hermes Agent (Nous Research) + catalog audit 16

Branch `hermes-agent-1029`, based on `origin/main` 1e80d41. This PR adds Hermes Agent as a new catalog row, with a fact file and a getting-started guide. Every fact comes from Nous Research's own pages (agent site, docs, GitHub README/LICENSE, Nous Portal home and privacy policy), as recorded in the 2026-10-29 verification notes. Those notes are not committed. Facts the notes mark NOT STATED are written as "not stated". No database command was run, no dev server was started, and no `.env*` file was read.

> **Order: merge → production deploy → audit 16 (Neon branch, then prod) → `npm run cache:revalidate`.** You don't need to redeploy after the insert (see "Deploy and caching" below). You do need to expire the cache.

## Files

- **New row (operator script):**
  - `scripts/update-catalog-audit-16.ts`
  - `src/data/catalog-audits/audit-16.ts` (row data, pure logic)
  - `src/data/catalog-audits/audit-16.test.ts` (10 tests; pricing tests rewritten for the final Portal pricing)
- **package.json:** adds `db:update-catalog-audit-16` and adds the audit 16 test to `npm test`.
- **Fact file:**
  - `src/data/facts/hermes-agent.ts` (new)
  - `src/data/facts/registry.ts` (registers it)
- **Guide:**
  - `src/data/tutorials/hermes-agent-getting-started.ts` (new; pick-and-setup, with a setup section; `lastReviewedAt` 2026-10-29; no affiliate or disclosure markup)
  - `src/data/tutorials/index.ts` (registers it)
- **Docs:**
  - this file
  - `docs/planning/2026-10-autonomous-business/sessions/2026-10-29-claude-hermes-agent.md`

## What audit 16 does

- Creates one `hermes-agent` row, and only when no row has that slug. It never updates or deletes anything.
- **Category:** looked up by slug: `workflow-automation`. A missing category is warned about and skipped.
- **Name, maker and site:** Hermes Agent by Nous Research; `website` is `https://hermes-agent.nousresearch.com`.
- **Description:** self-host or cloud via Nous Portal; Telegram/Discord/Slack/WhatsApp/Signal/email/CLI; memory, self-written skills, scheduling. The privacy disclosure is dated "as of 2026-10-29".
- **Tags:** costTier `FREEMIUM`, difficulty `INTERMEDIATE`, privacy `MEDIUM`.
- **directAlternatives:** `Claude Code`, `OpenAI Codex CLI`, `Lindy AI`.
- **Safety:** same prod guard as audits 13–15, byte for byte (a test checks this). Dry run is the default; writes need `--apply` and a 5-second countdown. Production needs `--confirm-production` plus `CONFIRM_PROD_HOST`.
- **Output:** slugs and counts only.
- **Re-runs:** a re-run, or a dry run after `--apply`, prints `create skipped (row exists)` and `audit16: 0 created`.
- **Afterwards:** after `--apply` it prints the `npm run cache:revalidate` reminder.

**Alternatives check (snapshot `src/lib/mcp/catalog-snapshot.json`):**

| Alternative | Row exists? | Notes |
|---|---|---|
| Claude Code (`claude-code`) | Yes | |
| OpenAI Codex CLI (`openai-codex-cli`) | Yes | |
| Lindy AI (`lindy-ai`) | Yes | |
| OpenClaw | **No** | No row, fact file or guide anywhere. Left out. |

## Pricing: final, browser-verified on Nous Portal

Pricing was browser-verified by Zach on 2026-10-29 at **https://portal.nousresearch.com/**, the canonical pricing page. (`portal.nousresearch.com/pricing` is a 404 and is linked nowhere; a test checks this.) It lives in one block: the `freeTier` and `plans` entries in **`src/data/facts/hermes-agent.ts`**. Both are now `status: "verified"`, `verifiedBy: "owner"`, with `sourceKind: "plans-page"`, because the source is the Portal home and that path doesn't look like a pricing page.

| Plan | Price | What Portal says |
|---|---|---|
| Free | $0 | Free models only, standard rate limits, $0 monthly credits |
| Plus | $20/mo | Hermes Agent usage included, within limits that reset daily, weekly and monthly; one cloud agent, 4 GB RAM / 25 GB disk |
| Super | $100/mo | Same included usage; one cloud agent, 4 GB RAM / 100 GB disk |
| Ultra | $200/mo | Same included usage; one cloud agent, 8 GB RAM / 100 GB disk |

On every paid plan:
- Any model can be used, but large models have their own monthly limit.
- API keys always use pay-as-you-go credits, not included usage.
- Bigger cloud agents and extra agents are paid from credits.

**Credits:** top-ups from $10 to $200, or a custom amount. The Tool Gateway (web search, scraping, image generation, browser use, speech) is priced per use from credits.

**ChatGPT:** an eligible ChatGPT account can be connected for supported inference with no paid Nous subscription. Tools and Hermes Cloud hosting are charged separately.

**Models:** 300+, priced per 1M tokens.

How the pricing reaches readers:
- `audit-16.ts` builds the row's `currentPricing` and `freeTierFeatures` from that block. A test pins the exact text: *"Free and open source (MIT). Optional Nous Portal plans: Free $0, Plus $20/mo, Super $100/mo, Ultra $200/mo. Paid plans include Hermes Agent usage within limits that reset daily, weekly and monthly, and one cloud agent; API keys use pay-as-you-go credits. Annual pricing and free trial: not stated (as of 2026-10-29)"*.
- The site overlay shows the fact file over the row text. The platform page, the guide header and the guide's `{{price:hermes-agent:Plus}}` / `{{price:hermes-agent:Ultra}}` tokens all follow the fact file.
- The guide describes the plans' shape (included usage with daily/weekly/monthly limits, one cloud agent with more memory and disk on higher plans, credits for extras) and doesn't type any price or size. That is the price-guard rule.
- The features list and `upgradeTriggers` now use Portal's Tool Gateway wording (per use, from credits). They previously quoted the agent site's "a paid-subscription feature".
- **Left out on purpose** (a test checks this): the 10% bonus and rollover caps.

## Items written as "not stated"

- Annual pricing.
- Free trial.
- Cloud hosting provider or region.
- Data retention period (Portal privacy policy).
- A public Hermes Agent API. The row's `apiAvailable` is `false` because the column is a non-null boolean; see the judgment calls.

## Deploy and caching (the 404 question)

- **No build-time slug list.** `/platform/[slug]`, `/platform/[slug]/guide` and `sitemap.ts` are all `export const dynamic = "force-dynamic"`, with no `generateStaticParams` or `dynamicParams` anywhere under `platform/`. A new slug is served as soon as the row exists. **No redeploy is needed after the insert.**
- **The real 404 risk is the data cache.** `getPlatformPageRow` goes through `unstable_cache`, which caches a `null` result too.
  - If anything requests `/platform/hermes-agent` or its guide before the row exists (a crawler, the llms.txt link, a preview check), the 404 can stick until the cache entry expires.
  - The code sets `CATALOG_REVALIDATE_SECONDS = 86400` (24 h).
  - The fix is `npm run cache:revalidate` after `--apply`. If `REVALIDATE_SECRET` is unset in Vercel, the fallback is a redeploy: cache keys include `VERCEL_DEPLOYMENT_ID`, so a new deploy starts with an empty cache.
  - That cache behaviour is the likely reason the PR D renames needed a redeploy. Those renames had a second cause: their 301s shipped in code before the rows were renamed.
- **Code must deploy before the insert.** The fact file and guide only exist in code. If you insert first, the row shows the plain row text until the deploy, then picks up the fact-file overlay. Nothing breaks either way.
- **llms.txt lists every registered guide without a DB check** ("rows are assumed"). From deploy until audit 16 runs, `/llms.txt` links `/platform/hermes-agent/guide`, and that link returns 404. The sitemap, `/tutorials`, Discover, search, MCP and `/data/v1` all read the DB, so Hermes only appears in them after the insert and a revalidate.

## Risks

- **The 404 window described above.** Keep the gap between deploy and audit short, and run the revalidate.
- **MCP aliases and task tags were not added.** `NAME_ALIASES` and `task-tags.ts` are checked against the test snapshot, which (like Klap's) doesn't include this row. "Hermes Agent" still resolves by name once the row exists; the bare word "hermes" gets did-you-mean suggestions only.
- **The test snapshot was not updated.** This follows the Klap precedent (audit 13).

## Judgment calls (please confirm)

1. **Category `workflow-automation`.** The 20-category taxonomy has no "AI agents" category. Manus (autonomous agent) and Lindy (assistant agent) both sit in `workflow-automation`. The alternative was `local-open-source-ai`.
2. **`privacyLevel: MEDIUM`.** Self-hosting keeps state local, which would argue for HIGH. But the cloud path's policy allows training use unless you opt out with Privacy Mode, which is CLAUDE.md's definition of MEDIUM.
3. **`difficultyLevel: INTERMEDIATE`, `costTier: FREEMIUM`.** Free open-source software with optional paid plans, the same shape as n8n's row.
4. **`apiAvailable: false`.** "Not stated" can't be stored in a boolean. I picked the conservative value; the not-stated note lives in the fact file's `features`.
5. **Fact `status`.** Company, platforms, models, features and privacy are `verified` (research-analyst, 2026-10-29). Pricing (`plans`, `freeTier`) is `verified` by owner (your Portal browser check, 2026-10-29).
7. **`apiAvailable` stays `false`.** Portal mentions API keys, but those are for Portal's model API and are billed in credits. Portal does not state a public API for the agent itself.
6. **The guide quotes only verified facts.** It leaves out star counts and version numbers (they go stale fast). It also leaves out the "$5 VPS" line, which would trip the price guard; the guide says "a rented server" instead.

## Also noticed (not changed)

- `docs/caching.md` says catalog cache entries live 3600 s, but `src/lib/catalog-cache.ts` sets `CATALOG_REVALIDATE_SECONDS = 86400`. The doc should be corrected.
- `START-HERE.md` § 2 uses "OpenClaw" for the project's old abandoned scaffolding. The name now also belongs to a real open-source agent product. If an OpenClaw row is ever added, the naming table should say they are unrelated.

## Verification

- `npx tsc --noEmit`: clean.
- `npm run lint`: 0 errors, 2 warnings that were already there (`platform-discussions.tsx`, `platform-prompts.tsx`).
- `npm test`: 1037 passed, 0 failed (includes audit-16, price-guard, price-tokens, label-consistency and facts).
- `npm run audit:tutorials`: clean, 197 pages.

**Not verified (owner):** a Vercel preview of `/platform/hermes-agent` and `/guide`. Both 404 on a preview until audit 16 runs against that preview's DB branch. Also owed: the audit 16 dry run and apply on a Neon branch. (The Portal pricing check is done.)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
