# Stale facts batch 2 + batch-1 browser checks + catalog audit 18

**Branch:** `stale-facts-b2-1029` (off `origin/main` 1dcf6ee, which includes batch 1 / #117). Draft. **Do not run audit 18 before the code deploys.**

## What this is

Batch 2 of the stale-facts list: rows 29–51 (23 platforms) in `docs/planning/2026-10-autonomous-business/stale-facts-batches.md`, none of which had a fact file. This PR re-verifies each one on the vendor's own pages, adds a sourced fact file for each, and adds **catalog audit 18**, an operator script that brings the row text in line with the facts. The process and quality bar are the same as batch 1 (#117).

- 20 of the 23 rows date from the April import; the three Healthcare AI rows date from the May restructure.
- **Added later in this PR:** the Research Analyst's browser checks of 18 batch-1 rows (#117, audit 17). They update those 18 fact files, 6 guides, and 16 batch-1 rows through audit 18. See **Batch-1 rows changed** below.
- The #115/#116 rows are not touched; the test checks this.

## How facts were verified

- **Two independent, blind readers per platform.** Twelve research agents, two per group of three or four platforms, read each vendor's own pages: their domain, docs, help centre, newsroom, or official GitHub repo. No third-party sites and no X. The two readers ran in parallel without seeing each other's results; I then compared their reports field by field.
- A fact is `verified` only when both reads agree. It carries `gatheredBy: "research-analyst"`, `verifiedBy: "claude-recheck"` and `verifiedAt: 2026-10-29`, so `isPublishedVerified` holds.
- A fact that only one reader saw, or that the two read differently, is `unverified`, or left out of the file if it is a price. Those go in the file comment and on the Browser-check list, and the row text is left alone.
- **Nobody checked the batch-2 facts in a real browser.** No owner check was done. Batch 1's open items *were* browser-checked by the Research Analyst; see **Batch-1 rows changed**.

## Platforms changed (23), and fact status

`*` marks a guarded field: it is written only while the row still holds the expected old value.

| Platform | Verified facts | Unverified facts | Audit 18 writes |
|---|---|---|---|
| `salesforce-einstein` | company, freeTier, plans, apiPricing, features, privacy | — | currentPricing, freeTierFeatures, usageLimits |
| `scenario` | company, freeTier, plans, privacy | — | currentPricing, freeTierFeatures, usageLimits |
| `semantic-scholar` | officialUrl, company, freeTier | — | usageLimits, website* |
| `shopify-magic-sidekick` | company, freeTier, plans, features, privacy | — | currentPricing, freeTierFeatures, usageLimits, costTier* (FREEMIUM→PAID) |
| `slack-ai` | freeTier, plans, features, privacy | — | currentPricing, freeTierFeatures, usageLimits |
| `squarespace-ai` | freeTier, plans, features | — | currentPricing, freeTierFeatures, usageLimits (text only; audit 11 owns its cost tier) |
| `tray-ai` | company, freeTier, plans, features | — | currentPricing, freeTierFeatures, usageLimits, costTier* (ENTERPRISE→PAID) |
| `trinka-ai` | company, freeTier | plans, privacy | freeTierFeatures, usageLimits |
| `upstage-solar` | company, freeTier, plans, apiPricing, features | privacy | currentPricing, freeTierFeatures, usageLimits, website* |
| `vllm` | officialUrl, company, freeTier | — | company* |
| `wix-ai` | freeTier, privacy | — | — (prices served localised; browser-only) |
| `wordpress-ai-jetpack-ai` | freeTier, plans, features | — | currentPricing, freeTierFeatures, usageLimits |
| `workato` | company, freeTier, plans, features | — | currentPricing, freeTierFeatures, usageLimits |
| `aider` | freeTier | company, privacy | — (row already right) |
| `gemini-cli` | company, freeTier, features | — | currentPricing, freeTierFeatures, usageLimits, costTier* (FREE→PAID) |
| `ollama` | company, freeTier, plans, apiPricing, privacy | — | currentPricing, freeTierFeatures, usageLimits, costTier* (FREE→FREEMIUM) |
| `openai-codex-cli` | company, plans, features | — | currentPricing, freeTierFeatures, usageLimits, costTier* (FREE→FREEMIUM) |
| `leonardo-ai` | freeTier | plans | currentPricing, freeTierFeatures, usageLimits (plan names only, no prices) |
| `microsoft-designer` | company, features | — | currentPricing, freeTierFeatures, usageLimits, costTier* (FREE→FREEMIUM) |
| `microsoft-power-automate` | officialUrl, company, freeTier, plans | — | currentPricing, freeTierFeatures, usageLimits, website* |
| `dragon-medical-one` | officialUrl, company, freeTier, features | — | currentPricing, freeTierFeatures, usageLimits, website* |
| `healthee` | officialUrl, freeTier, features | privacy | currentPricing, freeTierFeatures, usageLimits, website* |
| `viz-ai` | officialUrl, company, freeTier, features, privacy | — | website* |

**Totals: 79 facts verified, 7 unverified, across 23 new fact files.** Every fact has `checkedAt: 2026-10-29` and a vendor `sourceUrl`.

### Biggest corrections
- **Gemini CLI is no longer free.** Free individual access (and Google AI Pro / Ultra) moved to Antigravity CLI on 2026-06-18. Gemini CLI now needs a paid Gemini API key, Vertex AI, or a Code Assist Standard / Enterprise licence. The row said "Free (generous quota), 1,000 requests/day".
- **No longer free-only:**
  - Ollama sells cloud plans (Pro $20, Max $100, Team $500) and bills cloud models per token; the local app stays free.
  - Codex CLI is used mainly by signing in with a ChatGPT plan, not "your own API key, unlimited".
  - Microsoft Designer's AI use is metered by monthly Microsoft 365 AI credits, not "15 boosts a day".
- **Free AI where the row said none:**
  - Slack bundles AI into every plan; Free gets "Basic AI" and there is no $10 add-on. Business+ is $18 ($15 annually), not $12.50.
  - Jetpack's free plan includes 20 AI requests.
- **No free plan where the row said FREEMIUM:** Shopify has a 3-day trial and Sidekick comes with paid plans; the row's "unlimited AI features" is wrong too.
- **Wrong numbers:**
  - Salesforce has no "Einstein 1 from $500" edition: Sales Cloud runs from Starter $25 to Max $550 per user/month, and $500 is the price of 100,000 Flex Credits.
  - Scenario: Starter $15 / Pro $45 / Max $75 credit plans, and a 50-credit free tier, not "Pro $29, 100 images/month".
  - Squarespace starts at $19/mo billed annually, not $16, and uses per-plan AI credits.
  - Semantic Scholar's API limits were backwards: the unauthenticated pool is 1,000 req/s shared, and keys start at 1 req/s.
  - Leonardo's plans are Essential / Premium / Ultimate; there is no "Pro $28 / Professional $56".
- **Published prices where the row said "custom":** Tray.ai starts at $50/month with a self-serve 30-day trial.
- **Moved sites:**
  - Dragon Medical One: nuance.com now redirects to Microsoft's page, which also pushes a migration to Dragon Copilot.
  - Healthee moved from healthee.co to healthee.com.
  - Power Automate's product page is now on microsoft.com.
- **Ownership / naming:**
  - vLLM is a community project that started at UC Berkeley.
  - salesforce.com/einstein now shows Salesforce's "AIforce" page.
  - Shopify's AI is now just "Sidekick".

## Batch-1 rows changed

The Research Analyst checked batch 1's 18 open items in a real browser on 2026-10-29 (official vendor pages, US/USD, logged out). I used only what the check marked verified, with its URLs. Where it said NOT STATED, or the page contradicted itself, the fact is now `unverified` or the text says "not stated" / "not confirmed". Facts confirmed in the browser carry `verifiedBy: "ra"`, the same convention as earlier browser checks. Hidden text aimed at AI agents on the Pabbly, Figma, Meshy and HubSpot pages was ignored.

| Row | Check | Fact file | Row (audit 18) | Guide |
|---|---|---|---|---|
| `connected-papers` | verified ([pricing](https://www.connectedpapers.com/pricing)) | New verified freeTier and plans: Free 5 graphs/mo; Academic $6/mo billed annually ($10 quarterly); Business $20/mo ($30 quarterly) | currentPricing, freeTierFeatures, usageLimits: replaces "Academic $3/mo" and an invented Team plan | No change (already said annual or quarterly only) |
| `paperpal` | verified ([pricing](https://paperpal.com/pricing)) | New verified freeTier (200 grammar edits/mo, 5/day AI tools, 5 files/mo, 300 MB) and plans (Prime $25, Pro $59 billed monthly; annual prices are a limited-time promotion). 2- and 3-year plans left out (the page doesn't say which plan they belong to) | currentPricing, freeTierFeatures, usageLimits: drops "Pro plans" and the non-existent Premium plan | No change |
| `pabbly-connect` | partial ([pricing](https://www.pabbly.com/connect/pricing/)) | Plans move from INR to USD (Standard $14, Unlimited $59 billed monthly) but stay **unverified**: 3-yearly prices unreliable, lifetime prices not read. The free plan's monthly reset is not stated | currentPricing: "From $25/mo" becomes plan names with "USD prices not confirmed"; freeTierFeatures: notes the monthly reset is not stated | "monthly task allowance" becomes "task allowance" with the reset not stated |
| `litmaps` | verified ([pricing](https://www.litmaps.com/pricing)) | freeTier and plans now verified. **Free gets 2 Litmaps**; Pro Education $12.50 ($10 yearly), Commercial $50 ($40 yearly); Team has no price. Enterprise dropped (not on the page) | currentPricing, freeTierFeatures, usageLimits: "1 seed map" becomes 2 Litmaps; adds the commercial and monthly prices | "Plan for one map" becomes two maps, citing the page |
| `gpt-image-1-5-dall-e-successor` | partial ([pricing](https://chatgpt.com/pricing/), [FAQ](https://help.openai.com/en/articles/9275245)) | New verified officialUrl **https://chatgpt.com**. freeTier stays unverified and now says **no numeric image caps are stated** | website chat.openai.com becomes https://chatgpt.com (guarded); freeTierFeatures drops "3 images/day"; usageLimits says no numeric limits are published | No change (already chatgpt.com, no numbers) |
| `figma-ai` | verified ([pricing](https://www.figma.com/pricing/)) | Adds monthly prices: only Professional bills monthly ($20 Full / $15 Dev / $5 Collab); Organization and Enterprise bill annually only | currentPricing | No change |
| `meshy` | verified, but **the page conflicts with itself** ([pricing](https://www.meshy.ai/pricing)) | Monthly prices kept. Yearly prices not recorded: the toggle says Pro $16 after a new-user discount, the compare table says "$20 billed yearly" | currentPricing: monthly prices only, "yearly prices not confirmed"; the "20% off annual" claim is gone | No change (no annual claim) |
| `ludo-ai` | verified ([pricing](https://ludo.ai/pricing)) | No free plan, so **PAID stands** after the recheck. The **30 sign-up credits** aren't on the pricing page, so they're out of the verified fact (homepage claim noted as unverified). Monthly prices added: Indie $20, Pro $50, Studio $350 | currentPricing, freeTierFeatures, usageLimits: the 30 credits are dropped, monthly prices and credits added | No change (it gives no number and already says there's no free tier) |
| `mailchimp-ai` | verified ([pricing](https://mailchimp.com/pricing/marketing/)) | Essentials $13 and Standard $20 are regular prices after a 14-day trial. Only Premium has an intro price ($297.50 for 12 months, then $350) | currentPricing: no longer says all paid prices are 12-month prices | No change |
| `hubspot-ai` | verified ([pricing](https://www.hubspot.com/pricing/marketing)) | New verified plans: Marketing Hub Starter $7/seat paid annually ($10 monthly; new-customer offer, list $20), Professional $800, Enterprise $3,600; credits 500 / 3,000 / 5,000 | currentPricing, usageLimits | No change |
| `groq` | verified ([rate limits](https://console.groq.com/docs/rate-limits), [models](https://console.groq.com/docs/models)) | Free-tier limits and per-token prices now verified (30 RPM, 1K RPD, 8K TPM, 200K TPD on GPT OSS and Qwen) | usageLimits | No change |
| `gumloop` | verified ([privacy §21](https://www.gumloop.com/privacy-policy), [pricing](https://www.gumloop.com/pricing)) | New verified privacy fact, `trainsOnData: true`. §21: self-serve content (Pro, Pro trials, free accounts) may be used to train Gumloop's models; Enterprise is excluded. Pro also notes the 8% orchestration fee | **privacyLevel HIGH → LOW** (guarded; a new guarded field in audit 18) | Rewrites the privacy paragraph, which said paying customers' data isn't used for training, and the matching "avoid" line |
| `fireworks-ai` | starting credit NOT STATED ([pricing](https://fireworks.ai/pricing)) | Notes that no starting credit is stated | No change (the row had no credit claim) | **Starting-credit claim removed** ("a small amount of free credit … welcome grant") |
| `replicate` | partial ([billing docs](https://replicate.com/docs/topics/billing)) | New **unverified** freeTier: select models run free "for a bit", amount not stated | freeTierFeatures, usageLimits: "free credits for some models" becomes "free use on select models, amount not stated" | "fixed number of runs" / "one-off allotment" becomes "how many isn't stated" |
| `relevance-ai` | verified ([pricing](https://relevanceai.com/pricing)) | Plans become **Enterprise only, custom pricing** (Pro and Team aren't shown on the public page; the docs still list them) | currentPricing, freeTierFeatures, usageLimits; **costTier PAID → ENTERPRISE** (guarded) | Removes the self-serve Pro sign-up path; says the public page shows Enterprise only and to confirm with sales |
| `reducto` | verified ([pricing](https://reducto.ai/pricing)) | Adds the full per-1,000-page rates and the unique-domain eligibility rule; expiry not stated | freeTierFeatures: adds eligibility and "expiry not stated" | No change |
| `sakana-ai` | partial ([chat](https://chat.sakana.ai/), [API privacy](https://console.sakana.ai/privacy-policy)) | Sakana Chat pricing is not stated. New **unverified** privacy fact (API platform: training subject to opt-out) | freeTierFeatures: "not checked" becomes "states no pricing" | No change (already describes the opt-out) |
| `consensus` | verified ([pricing](https://consensus.app/pricing/)) | Confirms the help-centre plans on the pricing page; adds $0.05 per API/MCP use past the allowance | No change | No change |

Every changed guide has `lastReviewedAt` bumped to 2026-10-29.

**Audit 17 was edited too, so the two audits can't undo each other.** Audit 17 is merged but may not have run yet. Its text writes are unconditional, so re-running it after audit 18 would have reverted 17 batch-1 fields. Where both audits write a field, audit 17 now writes the same text as audit 18 (17 fields; `audit-18.test.ts` checks this). Its relevance-ai tier now goes FREE → ENTERPRISE, and audit 18's goes PAID → ENTERPRISE, so the two converge in either order. I also updated two of audit 17's `finding` strings (Relevance, Ludo) and its header comment.

## What audit 18 changes (`scripts/update-catalog-audit-18.ts`, `npm run db:update-catalog-audit-18`)

- **What it does:** the same as audit 17.
  - Updates rows only; it never creates or deletes any.
  - Never touches slug, name, categoryId, description, affiliate or sponsor data.
  - Writes a text field only where it differs.
  - Writes company, website and costTier only from their expected old value, and logs a skip for a hand edit.
- **Safety:** it runs as a dry run unless you pass `--apply`. Production needs `--confirm-production` plus `CONFIRM_PROD_HOST`, and the 5-second countdown applies. The prod-guard code is byte-identical to audits 15, 16 and 17 (the test checks this).
- **Expected dry run if audit 17 has already been applied:** `audit18: 37 rows / 99 patched fields`.
  - **Batch 2:** 21 rows / 67 fields: 54 text fields (17 currentPricing, 18 freeTierFeatures, 19 usageLimits), 6 websites, 6 cost tiers and 1 company. aider and wix-ai change in code only.
  - **Batch-1 re-check:** 16 rows / 32 fields: 29 text fields, 1 website (GPT Image), 1 cost tier (relevance-ai) and 1 privacyLevel (gumloop). fireworks-ai and consensus change in code only.
  - **If audit 17 hasn't run:** run it first (it now writes the aligned text). Audit 18 then reports 29 rows / 81 fields, because 18 of its batch-1 fields are already in place.
  - **Re-run, or a dry run after `--apply`: 0.**
- **New guarded field: `privacyLevel`.** It is written only from its expected old value (gumloop HIGH → LOW), like the other guarded fields. The runner now selects it.
- **Audits 10/11 cannot revert it.**
  - Audit 10 touches no batch-2 slug.
  - Audit 11 patches one batch-2 row, `squarespace-ai`, on costTier only (FREEMIUM→PAID, already applied). Audit 18 writes only text on that row and never its costTier.
  - The test asserts both.
- **Order:** deploy first. The fact files show on the site at deploy, because the overlay applies them over the row text. Then run the audit: Neon branch first, then production, then `npm run cache:revalidate`.
- Every patched row gets a fresh `updatedAt` on apply.

## Other code changes
- **23 new files in `src/data/facts/`, all registered in `registry.ts`.**
- **Guides fixed where they contradicted the findings, with `lastReviewedAt` bumped to 2026-10-29** (Tray's was already today):
  - **gemini-cli:** adds Vertex AI as a route, removes the "1,000 requests a day" figure, and stops implying the unpaid tier still works. The guide already covered the move to Antigravity CLI.
  - **slack-ai:** "There is no free tier" becomes "Some AI comes with every plan, Free included". Search is no longer described as Business+-only. Adds "unless your organisation opts in" to the training line.
  - **workato:** edition names updated to Standard, Business MCP, Enterprise MCP and Workato ONE, and a numeric retention limit removed. The self-serve plan wording was left alone: it cites Workato's docs, which our readers didn't check (Browser-check list).
  - **salesforce-einstein:** notes the AIforce rebrand, and that AI can be added to Core and above, with the full suite in Max.
  - **microsoft-power-automate:** Premium is billed yearly. The trial pitfall no longer states a trial length, and says the free licence is for work or school accounts.
  - **shopify-magic-sidekick:** Sidekick is included with paid plans and usage varies by plan; the old "available for free, regardless of your subscription plan" quote is gone.
  - **openai-codex-cli:** no longer concludes that Go reaches the CLI (that point is disputed).
  - **scenario:** no longer says the free credits reset daily (unclear).
  - **upstage-solar:** mentions the prepaid commitment plans, and an inline "four cents" became "a few cents".
  - **tray-ai:** the "no published plan price" pitfall now acknowledges the entry price.
  - I didn't bump the other 13 guides. A scan against today's findings found no contradictions (most were written in September), and I didn't re-research their other claims.
- **`src/lib/mcp/catalog-snapshot.json`:** applied audit 18 with a new one-off script, `scripts/mcp-snapshot/apply-audit-18-to-snapshot.ts`. It uses the same diff function as the DB runner and is idempotent (a second run reports 0). Re-run after the batch-1 additions: 16 rows changed, then 0.
- **`catalog-snapshot.test.ts`:** batch-2 slugs get the same stress-observation exemption batch 1 got.
- **Tests whose expectations moved with the data (no search or ranking code changed):**
  - `golden-top5.json`: 11 pinned queries were re-pinned because these rows now carry verified facts and new cost tiers.
    - A06 and G14/G50/G55 (image queries): leonardo-ai moves up.
    - A21 ("run a small business") and E10: shopify-magic-sidekick drops out, now PAID.
    - G06, G07 and G49: trinka-ai moves up.
    - G22 ("write code"): gemini-cli replaces bolt-new at #5.
    - G37 ("learn a language"): trinka-ai replaces aleph-alpha-luminous at #5.
  - `search-relevance.test.ts`: "free alternative to Grammarly" now puts **trinka-ai** first instead of QuillBot, in both search_tools and find_free_alternatives. The test's own rule ("order follows free-tier evidence") now favours Trinka, because it has a verified free-tier fact. I renamed the test, updated its expected order and comments, and kept the consistency check between the two tools.
  - `search-p13.test.ts`: the "record older than 90 days" example was leonardo-ai, which is now fresh. It is now `aiva`, a batch-3 row, and the test also asserts leonardo is no longer stale.
  - **From the batch-1 browser checks:**
    - `golden-top5.json`: 5 more re-pins, because Paperpal and Connected Papers now have verified free-tier facts. A15, G06, G07 and G49 change order only. G28 ("literature review"): connected-papers replaces research-rabbit at #5.
    - `search-relevance.test.ts`: "free alternative to Grammarly" now puts **Paperpal** first (Paperpal, Trinka, QuillBot). Paperpal has a verified free tier, and the rule is unchanged. The test still checks that it agrees with find_free_alternatives.
    - `audit-17.test.ts`: a no-free-tier row may now be ENTERPRISE as well as PAID (audit 18's test already allowed this), for relevance-ai.
    - `audit-18.test.ts`: new tests that cover the 18 re-checked slugs, check that audits 17 and 18 agree on shared fields, and pin the named outcomes (Relevance ENTERPRISE, Gumloop LOW, Litmaps 2 maps, no Ludo credits, Meshy monthly only, chatgpt.com, no Fireworks credit). The dry-run counts are split by batch, and the guard test covers privacyLevel.
  - `audit-11.test.ts`: the squarespace-ai snapshot `updatedAt` pin moves from 2026-04-13 to 2026-10-29, because audit 18 rewrites that row's text. Audit 11's own keeps-updatedAt check is unchanged.
- **`stale-facts-batches.md`:** batch 1 is marked done in #117 (and notes that its browser checks are folded in here), and batch 2 is marked as this PR.

## Checks
- `npx tsc --noEmit` passes.
- `npm run lint` gives 0 errors and 2 warnings, both in files this PR doesn't touch.
- `npm test` passes 1062/1062, including `audit-18.test.ts`.
- `npm run audit:tutorials` is clean (197 pages).
- I didn't run a dev server or touch any database.

## Browser-check list
These pages could not be read reliably without a real browser, or the two readers disagreed. The affected facts are left as the row has them, or recorded as `unverified`.

| Platform | URL | What to check |
|---|---|---|
| leonardo-ai | https://leonardo.ai/pricing, https://leonardo.ai/privacy-policy/ | Plan prices (one read: Essential $12, Premium $30, Ultimate $60, Teams $24/$48 per seat), whether they are the monthly or yearly view, and whether 8,500 / 25,000 / 60,000 are monthly tokens or rollover caps. Privacy/training clause (403). |
| trinka-ai | https://www.trinka.ai/pricing, https://www.trinka.ai/privacy-policy | Premium and Premium Plus USD prices (one read via Trinka's pricing API: $20/mo, $80/yr, Premium Plus $125/yr), and the general training policy (the body didn't render) |
| wix-ai | https://www.wix.com/plans (from a US browser) | USD plan prices (both readers got GST-localised prices), free-plan storage and ads, and per-plan AI limits |
| microsoft-designer | https://www.microsoft.com/en-us/microsoft-365/microsoft-designer | The free monthly AI-credit allowance, and that Designer is still free with a Microsoft account (the page blocked automated requests) |
| openai-codex-cli | https://learn.chatgpt.com/docs/pricing, https://help.openai.com/en/articles/11369540 | Whether ChatGPT Free and Go include the CLI or only the desktop app (the readers disagreed; help article 403) |
| gemini-cli | https://ai.google.dev/gemini-api/docs/pricing, https://github.com/google-gemini/gemini-cli | Whether an unpaid Gemini API key still works with Gemini CLI (one reader thought so; the README says "No free tier") |
| upstage-solar | https://console.upstage.ai/docs/getting-started, https://www.upstage.ai/terms-of-service | The "$10 free credit on sign-up" (read once), and the training clause (the terms, Art. 22, vs the privacy policy) |
| squarespace-ai | https://www.squarespace.com/pricing | Which price is annual and which monthly. Both readers inferred lower = annual from the toggle; the fact is recorded that way and marked verified. |
| scenario | https://www.scenario.com/pricing | Whether the 50 free credits reset daily or are a one-off total, and the annual prices ("Save 33%") |
| shopify-magic-sidekick | https://www.shopify.com/magic, https://www.shopify.com/pricing | Whether /magic redirects to /sidekick (the website was left alone), and whether the $0 Agentic plan includes Sidekick |
| salesforce-einstein | https://www.salesforce.com/einstein/, https://www.salesforce.com/agentforce/pricing/ | Where /einstein redirects (the website was left alone), what Salesforce Foundations ($0) requires, and whether the "Free Suite" the guide relies on is still offered |
| workato | https://docs.workato.com (self-serve plans), https://www.workato.com/pricing | Whether the docs still publish the free and paid self-serve tiers the guide describes (the pricing page shows only quotes and a "Start for free" trial), and the trial length |
| healthee | https://healthee.com/faqs/, https://healthee.com/privacy-policy/ | The AI-training statement (an FAQ line vs a privacy policy that doesn't mention it) |
| aider | https://aider.chat/docs/faq.html | Company name "Aider AI LLC" (read once) |
| dragon-medical-one | https://dragonmedicalone.nuance.com | Whether the installer subdomain the guide sends people to is still live (nuance.com product pages now redirect to Microsoft) |
| microsoft-power-automate | https://www.microsoft.com/en-us/power-platform/products/power-automate/pricing | Trial length (30 days on the pricing page, 90 in Learn), and whether personal accounts can get the free licence |

## Risks
- **Price facts expire after 30 days.** `facts.test.ts` checks them against the real date, so `npm test` starts failing for these files after **2026-11-28** unless they are re-checked. Batch 1 has the same date.
- **The verification is agent-only.** No owner browser check was done. JS-heavy and bot-protected pages (Leonardo, Trinka, Wix localisation, microsoft.com) were the weak spots, and the readers flagged them rather than guessing.
- **Cost tier changes on 6 rows** affect Discover filters and free-alternative results:
  - gemini-cli FREE→PAID
  - shopify FREEMIUM→PAID
  - tray ENTERPRISE→PAID
  - ollama, openai-codex-cli and microsoft-designer FREE→FREEMIUM
- **Search order moves** with the data (11 golden re-pins, plus Trinka first for the Grammarly-alternative query). No search code changed, but users will see different top-5s for those queries after deploy.
- **Squarespace plan prices are marked verified, but the annual/monthly mapping is an inference** that both readers made from the toggle. The row text spells out both prices, so a wrong mapping would swap labels, not invent numbers.

- **Run order:** audit 17 (if not yet applied), then audit 18. With the aligned text either order converges, but 17 first gives the cleanest log.
- **Batch-1 fact dates:** the batch-1 fact files keep `checkedAt: 2026-10-29`, so they expire on 2026-11-28 along with batch 2.

## Judgment calls (please confirm)
1. **Salesforce Einstein stays ENTERPRISE.** Salesforce Foundations is listed at $0 and Starter is $25/user, so FREEMIUM is arguable. But Foundations' requirements aren't stated, and the AI features sit in Core and above.
2. **Workato, Dragon Medical One, Healthee and Viz.ai stay ENTERPRISE with `freeTier.available: false`.** The audit-18 test allows ENTERPRISE with no free tier (audit 17's test now does too, for relevance-ai). Tray moves to PAID because it now publishes a $50 entry price.
3. **Codex CLI and Microsoft Designer go to FREEMIUM without a freeTier fact.** Paid plans are verified for both, but the free part is disputed (Codex) or unreadable (Designer), so there is no freeTier fact for the label to rest on.
4. **Gemini CLI is PAID and stays listed.** An alternative is to hide it or point readers to Antigravity CLI (`google-antigravity` exists). **Zach to decide.**
5. **No renames.** "Shopify Magic / Sidekick" (Shopify now says only "Sidekick") and "Salesforce Einstein" (the page now says "AIforce") keep their names and slugs. A rename should be its own PR, as with GPT Image in batch 1. **Zach to decide.**
6. **Shopify's $0 Agentic plan is left out of `plans`.** It is for selling in AI channels, and whether it includes Sidekick isn't stated. Listing it would contradict "no free store plan".
7. **Workato guide: no rewrite of the self-serve wording.** The guide's self-serve tiers cite Workato's docs (June 2026). Our readers checked only the pricing page, which is quote-only. I fixed only the edition names and a numeric limit, and put the docs on the Browser-check list.
8. **Gumloop privacyLevel LOW**, not MEDIUM. §21 trains on self-serve content by default and names no opt-out. CLAUDE.md's MEDIUM is "with opt-out or anonymization", so LOW is the honest fit.
9. **Relevance AI goes to ENTERPRISE,** following the brief and the public pricing page, even though its docs still describe Pro ($29) and Team ($349). The fact note and guide say so.
10. **Pabbly and Replicate (marked partial) got no verified price facts.** Pabbly's USD prices are recorded as unverified, and the row names the plans without prices.
11. **Audit 17 edited after merge** so the two audits converge (see Batch-1 rows changed). The alternative was a "never re-run audit 17" rule.
12. **Test expectation changes** (Grammarly ordering, stale-flag example, audit-11 `updatedAt` pin, golden re-pins) are listed above. Each follows from the new data, not a code change.

## What's left
- Batches 3 and 4 (41 rows), listed in `stale-facts-batches.md`.
- The Browser-check list above (batch 2). Batch 1's list is now resolved, except Pabbly lifetime/3-yearly prices, Replicate's free amount, Sakana Chat pricing, Meshy's yearly prices and ChatGPT's image caps, which the vendors don't state clearly.
- Running audit 18 after the deploy (and audit 17, if it hasn't run yet).
- The Gemini CLI listing decision, and the Shopify / Salesforce rename decisions.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
