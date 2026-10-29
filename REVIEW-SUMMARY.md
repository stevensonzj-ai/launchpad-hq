# Stale facts batch 1 + catalog audit 17

**Branch:** `stale-facts-b1-1029` (off `origin/main` 9fdb93d). Draft. **Do not run audit 17 before the code deploys.**

## What this is

The content tracker (`launchpad-content-tracker-2026-10-29-v2.xlsx`, Platforms sheet) shows which catalog rows have no sourced facts and haven't been touched since the April/May imports. This PR re-verifies the **28 oldest** of those rows on the vendors' own pages, adds a sourced fact file for each, and adds **catalog audit 17**, an operator script that brings the row text in line with the facts.

- The full ordered list and the batch split are in `docs/planning/2026-10-autonomous-business/stale-facts-batches.md`.
- **Group size:** the brief estimated ~87 rows. By the strict rule (no source links, and `updatedAt` on or before 2026-05-31, excluding hidden rows) the count is **73**. Another **19** rows have no source links and pricing text with no date at all, but October audits bumped their `updatedAt` while editing other fields. I listed those as batch 4 rather than drop them, for **92 in total**.
- **Batches:** batch 1 is rows 1–28 (this PR); batch 2 is 23 rows; batch 3 is 22 rows; batch 4 is the 19 undated rows.
- **Ordering:** 41 rows share the oldest import timestamp, so batch 1 is alphabetical within that tie.
- **Skipped as instructed:** Tabnine, Clarifai, Hermes, Canva, Lindy, Scite and Activepieces. No row in the group is hidden, discontinued, or carries a "what happened" notice.

## How facts were verified

- **Two independent readers per fact.** Seven research agents read each vendor's own pages: their domain, docs, help centre, or official GitHub repo. No third-party sites and no X were used.
- Three more agents then re-fetched every price and limit claim independently.
- A fact is `verified` only when both reads agree. It carries `gatheredBy: "research-analyst"`, `verifiedBy: "claude-recheck"` and `verifiedAt: 2026-10-29`, so `isPublishedVerified` holds.
- A fact read only once, or partly contradicted by its own page, is `unverified`.
- A price seen by only one reader is not recorded as a fact. It goes in the file comment and on the Browser-check list, and the row text is left alone.
- **Nobody checked these in a real browser.** No owner check was done, unlike Hermes.

## Platforms changed (28), and fact status

`*` marks a guarded field: it is written only while the row still holds the expected old value.

| Platform | Verified facts | Unverified facts | Audit 17 writes |
|---|---|---|---|
| `ai21-labs-jamba` | company, freeTier, plans, apiPricing, privacy | — | currentPricing, freeTierFeatures, usageLimits, website*, costTier* (FREE→FREEMIUM) |
| `connected-papers` | officialUrl | — | — (prices are browser-only) |
| `consensus` | freeTier, plans | — | currentPricing, freeTierFeatures, usageLimits |
| `docsumo` | company, freeTier, plans, privacy | — | currentPricing, freeTierFeatures, usageLimits, website*, costTier* (FREE→PAID) |
| `figma-ai` | company, freeTier, plans | privacy | currentPricing, freeTierFeatures, usageLimits |
| `fireworks-ai` | company, freeTier, privacy | apiPricing | currentPricing, freeTierFeatures, usageLimits, costTier* (FREEMIUM→PAID) |
| `gpt-image-1-5-dall-e-successor` | company, apiPricing, features | freeTier (ChatGPT pages returned 403) | usageLimits |
| `gpt4all` | officialUrl, company, freeTier, features | — | website* |
| `groq` | company, freeTier, privacy | apiPricing | currentPricing, freeTierFeatures, usageLimits, costTier* (FREE→FREEMIUM) |
| `gumloop` | freeTier, plans | company | currentPricing, freeTierFeatures, usageLimits, costTier* (FREE→PAID) |
| `hubspot-ai` | company, freeTier | privacy | freeTierFeatures, usageLimits |
| `hugging-face` | company, freeTier, plans, privacy | — | currentPricing, freeTierFeatures, usageLimits |
| `jan` | company, freeTier | privacy | company* (→ Menlo Research) |
| `litmaps` | — | freeTier, plans | currentPricing, usageLimits (only the parts both readers saw) |
| `llama-cpp` | officialUrl, company, freeTier | — | company*, website* (→ ggml-org) |
| `lm-studio` | company, freeTier, plans | privacy | currentPricing, freeTierFeatures, usageLimits, costTier* (FREE→FREEMIUM) |
| `localai` | company, freeTier | features | — (row already right) |
| `ludo-ai` | freeTier, plans | company | currentPricing, freeTierFeatures, usageLimits, costTier* (FREEMIUM→PAID) |
| `mailchimp-ai` | company, freeTier, plans | privacy | currentPricing, freeTierFeatures, usageLimits |
| `meshy` | freeTier, plans | company | currentPricing, freeTierFeatures, usageLimits |
| `nanonets` | freeTier, plans | company | currentPricing, freeTierFeatures, usageLimits |
| `pabbly-connect` | freeTier | plans (only ₹ prices were served) | freeTierFeatures, usageLimits |
| `paperpal` | — | privacy | costTier* (FREE→FREEMIUM; the row's own text lists paid plans) |
| `reducto` | freeTier, plans | company | currentPricing, freeTierFeatures, usageLimits, costTier* (FREE→FREEMIUM) |
| `relevance-ai` | freeTier, plans | company | currentPricing, freeTierFeatures, usageLimits, costTier* (FREE→PAID) |
| `replicate` | company, apiPricing | — | currentPricing |
| `research-rabbit` | company, freeTier, plans | — | currentPricing, freeTierFeatures, usageLimits, company*, costTier* (FREE→FREEMIUM) |
| `sakana-ai` | company, plans, apiPricing | features | primaryUse, currentPricing, freeTierFeatures, usageLimits, apiAvailable* (false→true) |

**Totals: 68 facts verified, 20 unverified, across 28 new fact files.** Every fact has `checkedAt: 2026-10-29` and a vendor `sourceUrl`.

### Biggest corrections
- **No free plan any more:** Relevance AI (Free plan retired), Gumloop (only a 14-day Pro trial), Docsumo (14-day trial, then quotes), Fireworks (prepaid billing).
- **No longer free-only:** LM Studio (Bionic+ $20 and Pro $100 add cloud features), ResearchRabbit (RR+), Groq (paid Developer tier).
- **Wrong numbers:**
  - Consensus is Pro $20/mo, not Premium $8.99.
  - Meshy's free plan is 100 credits a month, not 5 a day.
  - Mailchimp's free plan is 250 contacts and has no generative AI.
  - HubSpot's free CRM is 2 users, not 5.
  - Nanonets and Reducto moved to credits and per-use pricing.
  - Hugging Face Enterprise is $50 per user, not custom.
- **Ownership:**
  - ggml.ai (llama.cpp) was acquired by Hugging Face in 2026, and the repo moved to `ggml-org`.
  - Replicate announced it is joining Cloudflare (2025-11-17).
  - Groq signed an Nvidia licensing deal (2025-12-24). That is not an acquisition.
  - Jan's maker is Menlo Research.
  - ResearchRabbit belongs to Litmap Limited.
- **Superseded model:** OpenAI's API docs mark GPT Image 1.5 "Deprecated". The current models are GPT Image 2.5 Sunburst and Flare.

## What audit 17 changes (`scripts/update-catalog-audit-17.ts`, `npm run db:update-catalog-audit-17`)

- **What it does:**
  - Updates rows only; it never creates or deletes any.
  - Never touches slug, name, categoryId, description, affiliate or sponsor data.
  - Writes a text field only where it differs.
  - Writes company, website, costTier and apiAvailable only from their expected old value, and logs a skip for a hand edit.
- **Safety:** it runs as a dry run unless you pass `--apply`. `--confirm-production` plus `CONFIRM_PROD_HOST` is required for production, the 5-second countdown applies, and the prod-guard code is identical to audits 15 and 16 (the test checks this).
- **Expected dry run (from the pre-audit snapshot, which matches the tracker's production pricing and website columns):** `audit17: 26 rows / 79 patched fields`.
  - 60 text fields.
  - 4 websites, 3 companies, 11 cost tiers and 1 apiAvailable.
  - localai and connected-papers change in code only.
  - **Re-run, or a dry run after `--apply`: 0.**
- **Audits 10/11 cannot revert it.** No batch-1 slug appears in audits 10 or 11, or in any earlier audit (the test checks 10 and 11). So I followed audit-15's approach: patch only rows those audits don't own.
- **Order:** deploy first. The fact files show on the site at deploy, because the overlay applies them over the row text. Then run the audit: Neon branch first, then production, then `npm run cache:revalidate`.
- The 26 patched rows get a fresh `updatedAt` on apply.

## Other code changes
- **28 new files in `src/data/facts/`, all registered in `registry.ts`.**
- **LM Studio guide:** fixed the "nothing you type is sent anywhere" and "paid tier for organisations" lines for the new optional cloud plans, and bumped `lastReviewedAt` to 2026-10-29.
  - I didn't bump the other 27 guides. I scanned them against today's findings and they already matched (most were written September–October). I didn't re-research their other claims, so a new date would overstate the review.
- **`src/lib/mcp/catalog-snapshot.json`:** applied audit 17 with a new one-off script, `scripts/mcp-snapshot/apply-audit-17-to-snapshot.ts`. It is the same diff function the DB runner uses, and it is idempotent. Without this, the label and MCP tests would pair the new fact files with stale rows.
- **`catalog-snapshot.test.ts`:** batch-1 slugs may now differ from the 2026-10-26 stress observations on the same fields fix P1.3 allowed. This is the pattern audit 15 used.
- **`golden-top5.json`:** three pinned queries were re-pinned. No search code changed; the rankings moved because these rows now carry verified facts.
  - A15 ("research with citations"): research-rabbit moves above scite. Same five results.
  - G28 ("literature review"): research-rabbit replaces connected-papers at #5.
  - G36 ("customer support chatbot"): relevance-ai moves above lindy-ai. Same three results.
- **Hermes session note:** added the #116 post-merge line.

## Checks
`npx tsc --noEmit` passes. `npm run lint` gives 0 errors and 2 warnings, both in files this PR doesn't touch. `npm test` passes 1047/1047, including the new `audit-17.test.ts`. `npm run audit:tutorials` is clean. I didn't run a dev server or touch any database.

## Browser-check list
These pages could not be read reliably without a real browser. The affected facts are left as the row has them, or recorded as `unverified`.

| Platform | URL | What to check |
|---|---|---|
| connected-papers | https://www.connectedpapers.com/pricing | Academic and Business prices (annual and quarterly), and whether Free is still 5 graphs a month |
| paperpal | https://paperpal.com/pricing | Prime and Pro USD prices (monthly and annual), and the free-plan limits (one read saw 200 grammar edits a month) |
| pabbly-connect | https://www.pabbly.com/connect/pricing/ | USD prices from a US browser (only ₹ was served), the billing term, and whether the 100 free tasks reset monthly |
| litmaps | https://www.litmaps.com/pricing | Whether Free has 1 Litmap or 2; commercial Pro ($50/mo, $40 yearly, read once); education monthly $12.50 (read once) |
| gpt-image-1-5-dall-e-successor | https://chatgpt.com/pricing, https://help.openai.com/en/articles/9275245, https://openai.com/index/introducing-chatgpt-images-2-5/ | ChatGPT image limits by plan, Plus price, and a product URL to replace chat.openai.com (all returned 403) |
| figma-ai | https://www.figma.com/pricing/ | Month-to-month prices (only the annual view rendered) |
| meshy | https://www.meshy.ai/pricing | Whether $20 is the monthly or yearly-billed price, and the actual annual prices |
| ludo-ai | https://ludo.ai/pricing | Month-to-month prices, and whether any lasting free plan exists beyond the 30 sign-up credits |
| mailchimp-ai | https://mailchimp.com/pricing/marketing/ | The price after the first 12 months for each plan |
| hubspot-ai | https://www.hubspot.com/pricing/marketing/starter and https://www.hubspot.com/flexible-seats-and-credits-pricing-supplement | Which of $7 or $20 per seat is monthly vs annual, and the credits per tier (500/3,000/5,000 vs 5,000/10,000/15,000) |
| groq | https://console.groq.com/docs/rate-limits and https://console.groq.com/docs/models | The Free tab's limits (the readers couldn't tell the tabs apart) and the per-token prices (read once) |
| gumloop | https://www.gumloop.com/pricing and https://www.gumloop.com/privacy-policy | The pricing page (confirmed via docs only) and the training clause in the privacy policy |
| fireworks-ai | https://fireworks.ai (sign-up / billing) | Whether new accounts still get a starting credit (the guide says a small one; the pricing page doesn't mention it) |
| replicate | https://replicate.com/pricing (and the "Try for free" collection the guide describes) | Whether free runs or credits still exist (the row and guide say so; the pricing page doesn't) |
| relevance-ai | https://relevanceai.com/pricing | The marketing page shows only Enterprise; check whether Pro and Team are sold publicly, and whether Vendor Credits are $20/$70 or 10,000/35,000 |
| reducto | https://reducto.ai/pricing | Whether the free balance is $150 or 15,000 credits, and whether it expires |
| sakana-ai | https://chat.sakana.ai, https://console.sakana.ai/privacy-policy | Sakana Chat pricing and free use (this decides FREEMIUM vs PAID), and the privacy policy |
| consensus | https://consensus.app/pricing | That it matches the help-centre article, and the privacy policy URL |

## Risks
- **Price facts expire after 30 days.** `facts.test.ts` checks them against the real date, so `npm test` starts failing for these files after **2026-11-28** unless they are re-checked. This is the same rule every fact file is under.
- **The verification is agent-only.** The readers were automated; no owner browser check was done. JS-heavy pages were the weak spot, and the readers flagged them rather than guessing.
- **Replicate's label may overstate.** Its card label reads `verified` because its only price fact (API pricing) is verified, but the row's "free predictions" text is unverified (see the browser-check list).
- **Cost tier changes on 11 rows** affect Discover filters and free-alternative results: ai21, docsumo, fireworks, groq, gumloop, ludo, lm-studio, paperpal, reducto, relevance-ai, research-rabbit.

## Judgment calls (please confirm)
1. **AI21 is FREEMIUM, not PAID.** The hosted API is only a trial, but the Jamba open-weight files are free to run, and the guide leads with that.
2. **Nanonets and Reducto count as having a free tier.** Each gives a one-time starting balance ($50 that never expires; $150) rather than a monthly allowance. The text says "one-time balance". The alternative is PAID, the treatment Lindy got for its 7-day credits.
3. **Ludo AI is PAID.** The pricing page lists no free plan, and the 30 sign-up credits are described as credits, not a plan.
4. **Sakana stays FREEMIUM for now.** No free tier is listed for Fugu or Namazu, but Sakana Chat wasn't checked. The row text says this plainly.
5. **The GPT Image row is not renamed.** Its name and slug still say "GPT Image 1.5", which OpenAI now marks deprecated. The guide already covers Images 2.5. A rename (audit-15-style: slug, redirect, guide move) should be its own PR. **Zach to decide.**
6. **GPT4All is close to the inactivity bar.** Its last commit was 2025-05-27, about 17 months ago, against the 18-month "abandoned" rule. The fact file notes it. Re-check in December.
7. **Litmaps and Pabbly have partial facts.** Both readers saw some details, so the row text is patched only for those (Litmaps' education rate and separate Team plan; Pabbly's plan names and task limits). The plans facts stay `unverified`.

## What's left
- Batches 2–4 (64 rows), listed in `stale-facts-batches.md`.
- The browser-check list above.
- Running audit 17 after the deploy.
- The GPT Image rename decision.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
