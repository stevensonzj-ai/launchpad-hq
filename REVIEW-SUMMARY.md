# Stale facts batch 4 + catalog audit 20

**Branch:** `stale-facts-b4-1029` (off `origin/main` 53eafe7, which includes batches 1–3: #117, #118, #119). Draft. **Do not run audit 20 before the code deploys.**

## What this is

Batch 4 of the stale-facts list: rows 74–92 (19 platforms) in `docs/planning/2026-10-autonomous-business/stale-facts-batches.md`. These are the rows whose pricing text carries no date; none had a fact file. This PR re-verifies each one on the vendor's own pages, adds a sourced fact file for 17 of them, and adds **catalog audit 20**, an operator script that brings the row text in line with the facts. The process and quality bar are the same as batch 3 (#119).

- **Also in this PR:** three batch-3 leftovers (see **Batch-3 leftovers**): the `google-antigravity` row, "Gemini CLI" as a free alternative, and Murf AI ranking #5 for "learn a language".
- The rows done in #115/#116 and batches 1–3 are not in the batch; the test checks this.

## How facts were verified

- **Two independent, blind readers per platform.** Twelve research agents (Sonnet), two per group of three or four platforms, read each vendor's own pages: their domain, docs, help centre, legal pages or official GitHub. No third-party sites and no X. The readers ran in parallel without seeing each other's results; I compared their reports field by field.
- A fact is `verified` only when both reads agree. It carries `gatheredBy: "research-analyst"`, `verifiedBy: "claude-recheck"` and `verifiedAt: 2026-10-29`, so `isPublishedVerified` holds.
- A fact only one reader saw, or that the two read differently, is `unverified` or left out. Those go in the file comment and on the Browser-check list, and the row text is left alone.
- No reader saw hidden text or instructions aimed at AI agents on any page.
- **The readers used a summarising fetch tool**, so quotes are the tool's, not raw page text. **Nobody checked the batch-4 facts in a real browser.**

## Platforms changed (16 of the 19), and fact status

`*` marks a guarded field: it is written only while the row still holds the expected old value.

| Platform | Verified facts | Unverified facts | Audit 20 writes |
|---|---|---|---|
| `cline` | officialUrl, company, freeTier, plans, privacy | — | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers |
| `clio-manage` | — (no fact file) | — | — (every clio.com page returned 403) |
| `harvey-ai` | officialUrl, company, freeTier, plans | privacy (one reader read the security page) | currentPricing, freeTierFeatures, usageLimits |
| `luminance` | officialUrl, company, freeTier, plans, privacy | — | currentPricing, freeTierFeatures, usageLimits |
| `scispace` | officialUrl (typeset.io → scispace.com) | — | website* (pricing and privacy pages returned 403) |
| `spellbook` | officialUrl, freeTier, plans | company, features (one reader) | currentPricing, freeTierFeatures, usageLimits, website* (audit 11 owns the cost tier) |
| `naver-hyperclova-x-cue` | officialUrl | — | — (consumer pages blocked; see Browser-check list) |
| `adobe-firefly` | freeTier, usageLimits | plans (USD prices: one reader), privacy | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers |
| `topaz-labs` | officialUrl, company, freeTier, plans, privacy | — | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers, costTier* (ENTERPRISE→PAID) |
| `cohere` | officialUrl, company, freeTier, plans, apiPricing, privacy | — | currentPricing, freeTierFeatures, costTier* (FREE→FREEMIUM), privacyLevel* (HIGH→MEDIUM) |
| `adobe-acrobat-ai-assistant` | freeTier, plans, features | privacy (one reader) | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers, costTier* (FREEMIUM→PAID) |
| `amazon-bedrock` | freeTier, plans, apiPricing, privacy | — | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers, costTier* (FREEMIUM→PAID) |
| `azure-openai-service` | freeTier, plans, features, privacy | — | primaryUse, currentPricing, freeTierFeatures, usageLimits, costTier* (FREEMIUM→PAID) |
| `chatpdf` | officialUrl, freeTier, plans, features | — | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers |
| `google-veo-3-1` | status, officialUrl, plans, apiPricing | — | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers, website* |
| `open-webui` | freeTier, plans, features | company (one reader) | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers |
| `scholarcy` | — (no fact file) | — | — (every scholarcy.com page returned 403) |
| `wondershare-pdfelement-ai` | officialUrl, plans, features | — | currentPricing, freeTierFeatures, usageLimits |
| `amazon-q-developer` | status, freeTier, plans, privacy | — | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers, privacyLevel* (HIGH→MEDIUM), directAlternatives (+Kiro) |

**Totals: 61 facts verified, 7 unverified, across 17 new fact files** (Clio and Scholarcy have none). Every fact has `checkedAt: 2026-10-29` and a vendor `sourceUrl`.

### Biggest corrections
- **Licence:** Open WebUI is no longer "Completely free and open-source (MIT)". Since v0.6.6 (2025-04-19) it uses its own "Open WebUI License": BSD-3 plus a branding clause, which the docs call "not an OSI-approved 'open source' license". Free to self-host; Enterprise is quote only.
- **Product changes:**
  - **Acrobat AI Assistant** is built into the Express and Studio plans, not "included with Pro $22.99/mo". There is no free AI tier.
  - **Amazon Q Developer:** AWS ends IDE plugin support on 2027-04-30 and points to Kiro. Now a status notice, plus Kiro as a direct alternative.
  - **Veo 3.1:** the Gemini API's Veo 3.1 previews were shut down on 2026-10-22 (Gemini Omni Flash replaces them). Now a status notice. Video generation comes with Google AI plans (Plus $4.99, Pro $19.99, Ultra from $99.99 a month).
  - **Azure OpenAI Service** is now offered as "Azure OpenAI in Foundry Models" inside Microsoft Foundry. No rename of the row.
- **Wrong or unsourced numbers:**
  - Adobe Firefly: "25 free credits a month" is now free daily generations; paid plans carry 2,000 / 4,000 / 10,000 / 50,000 monthly credits that don't roll over. "Premium $199.99" was the teams price.
  - Topaz Labs: subscriptions only (Photo $199/yr, Gigapixel $149/yr, Video $299/yr, Studio $399/yr); no perpetual licence listed.
  - Spellbook: the "From $99/user/mo" price has no source. Pricing is custom by team size, with a 7-day trial.
  - ChatPDF: the "Plus $5/mo", "120 pages" and "10 questions a day" figures are gone. The homepage shows only the free plan (2 documents a day).
  - Wondershare: "From $79.99/year" is gone. The homepage shows perpetual licences ($129.99–$139.99, promotional) and a $39.99 yearly education plan.
  - Bedrock: "first 2 months" is now up to $200 in AWS credits over 6 months.
  - Azure: "$200 credits" has no source; Microsoft says "try Azure free for up to 30 days".
- **Free / paid:**
  - Cohere's free Trial key is rate limited with no production or commercial use.
  - Harvey and Luminance publish no prices.
  - Cline is free for individual developers, with inference paid at cost or with your own keys.
- **Privacy:**
  - Cohere trial-user inputs may be used for research and development (de-identified; no opt-out), so HIGH→MEDIUM.
  - Amazon Q Developer Free-tier content may be used for service improvement, including model training, with an opt-out; Pro content is not. HIGH→MEDIUM.
  - Azure: prompts and completions are not used to train foundation models. HIGH stays.
- **Moved sites:** Spellbook (spellbook.com), SciSpace (scispace.com), Veo (deepmind.google/models/veo/).
- **Unread rows:**
  - Clio Manage and Scholarcy: every page returned 403.
  - Naver: the row still describes "Cue: chatbot", but the guide says CLOVA X and Cue: closed on 9 April 2026, and the readers could not open either page. Left alone.

## Batch-3 leftovers

All from official Google sources or the catalog's own text, and none touches the rows listed in the brief's "do not change".

1. **`google-antigravity` (the IDE).**
   - **Before:** "Free (preview)", "Free cloud-based IDE", "generous free tier".
   - **After:** the same verified plans as the `antigravity-cli` row, built from audit 19's own helper functions so the two cannot drift:
     - Individuals $0 with weekly rate limits;
     - Google AI Pro $19.99/mo and Ultra from $99.99/mo;
     - Gemini Enterprise from $30 per seat.
   - **Also:** the FREE→FREEMIUM tier (guarded). The row's fact file gains the free tier and plans, reusing the CLI's two-reader facts: Google's pricing and plans pages cover the desktop app and the CLI alike.
   - **Left alone:** the IDE's privacy stays HIGH (see Judgment calls).
2. **Gemini CLI as a free alternative.**
   - The only rows listing it as free were `claude-code` ("Gemini CLI (free)") and `openai-codex-cli` ("Gemini CLI (free with Google account)"), both in `budgetAlternativeTo`.
   - Each entry is swapped for "Antigravity CLI (free for individuals)" and "Antigravity CLI (free with a personal Google account)". The swap runs only while the row holds the old entry.
   - The plain `directAlternatives` entries for Gemini CLI (Aider, Codex) aren't claims about price, so they stay.
   - No guide called Gemini CLI free outside its own and the Antigravity pages (the test scans Claude Code, Codex and Aider).
   - The `gemini-cli` row isn't touched. Its garbled `budgetAlternativeTo` ("Gemini CLI free tier is generous)") is still there; it's on the out-of-scope list.
3. **Murf AI at #5 for "learn a language".**
   - **Cause (not what batch 3 said).** The only text that matched the query was Murf's original description, "AI voice generator for voiceovers, e-learning, and ads with multiple voices and **languages**" (the word "language" in the description). The batch-3 facts have no such word. Batch 3 refreshed Murf's row and facts, and it then overtook Trinka on the tie-break between equal description-only matches. I did not trace which tie-break (both are `verified`); the root cause is the description either way.
   - **Verdict.** Murf is a text-to-speech tool and not a language-learning tool, so the match is a poor fit.
   - **Fix.** Audit 20 rewrites the description (guarded on the old text) to "AI text-to-speech studio for multilingual voiceovers in videos, e-learning and ads, with a library of voices to choose from." No search code changed.
   - **Result.** Murf no longer appears at all for "learn a language", and Trinka returns to #5 (G37 re-pinned). The test checks it still ranks for "text to speech voiceover".

## What audit 20 changes (`scripts/update-catalog-audit-20.ts`, `npm run db:update-catalog-audit-20`)

- **What it does:** the same as audits 17–19, with no create.
  - Updates rows only. Never deletes; never touches the slug, name, categoryId, affiliate or sponsor data of an existing row.
  - Writes a text field only where it differs.
  - Writes company, website, costTier, privacyLevel and description only from their expected old value, and logs a skip for a hand edit.
  - Only appends missing names to `directAlternatives`.
  - Swaps a named `budgetAlternativeTo` entry only while the row holds the old entry.
- **Safety:** it runs as a dry run unless you pass `--apply`. Production needs `--confirm-production` plus `CONFIRM_PROD_HOST`, and the 5-second countdown applies. The prod-guard code is byte-identical to audits 15–19 (the test checks this). It prints slugs, field names and counts only.
- **Expected dry run (audits 17–19 applied or not: no dependency):** `audit20: 20 rows / 73 patched fields (dry-run)`.
  - **Batch 4:** 16 rows / 65 fields: 54 text (incl. 1 primaryUse), 3 websites, 5 cost tiers, 2 privacy levels, 1 directAlternatives.
  - **Leftovers:** 4 rows / 8 fields: 4 text, 1 cost tier (google-antigravity), 2 budgetAlternativeTo, 1 description.
  - **Re-run, or a dry run after `--apply`: 0 rows.**
- **Earlier audits cannot revert it, and it cannot revert them.**
  - It writes no field that audits 17, 18 or 19 write on the same row. The only shared rows are `murf-ai` (audit 19 writes text, audit 20 the description) and `openai-codex-cli` (audits 18/19 write text, audit 20 `budgetAlternativeTo`).
  - `audit-20.test.ts` checks the field sets, then applies audits 17, 18 and 19 to the patched snapshot and asserts none of the fields it owns changes.
  - **Audit 10** patches `claude-code` on currentPricing only. **Audit 11** patches `clio-manage` and `spellbook` on costTier only; audit 20 never writes either tier, and the snapshot holds PAID. **Audits 5 and 15** only remove names (Sora 2, Kakao Brain, Tabnine…); audit 20 adds only "Kiro". The test asserts all of this.
- **Order:**
  1. Deploy first. The fact files show on the site at deploy, because the overlay applies them over the row text.
  2. Run audit 19 first if it hasn't run: it creates the `antigravity-cli` row that the new "Antigravity CLI (…)" budget entries name. Audit 20 doesn't depend on it, but the names resolve only once it exists.
  3. Run audit 20 on the Neon branch, then production.
  4. `npm run cache:revalidate`.

## Other code changes

- **New fact files:** 17 in `src/data/facts/`, all registered in `registry.ts`. `google-antigravity.ts` gains the free tier and plans.
- **Guides fixed where they contradicted the findings,** `lastReviewedAt` 2026-10-29:
  - **adobe-acrobat-ai-assistant:** "paid add-on... unless Studio bundles it" becomes "built into Express and Studio, with an add-on also mentioned".
  - **open-webui:** the licence is now stated (custom, branding clause, not OSI-approved).
  - The other 17 batch-4 guides were scanned against today's findings and already agree (Topaz subscription-only, Spellbook no price and a 7-day trial, Cohere's trial-user training clause, Azure's no-free-tier warning, Bedrock's six-month free plan, Naver's closure, and so on). They weren't re-researched, so their dates are unchanged. The Amazon Q guide goes further than the readers (new signups and Pro closed on 2026-05-15): I left it, and it's on the Browser-check list.
- **`src/lib/mcp/catalog-snapshot.json`:** audit 20 applied with `scripts/mcp-snapshot/apply-audit-20-to-snapshot.ts`, which uses the runner's diff function. The first run changed 20 rows, the second 0.
- **Tests whose expectations moved with the data (no search or ranking code changed):**
  - `golden-top5.json`: 6 re-pins.
    - G37 ("learn a language"): murf-ai out, trinka-ai back at #5.
    - G22 ("write code") and G23 ("debug python code"): `cline` moves up (to #1 and #1) once it has refreshed text and sourced facts, which changes its place in the tie-break between equally matched coding tools (I did not trace which tie-break).
    - G14, G50, G55 (image generators): order only, Firefly moves up. It now has a verified free tier.
  - `catalog-snapshot.test.ts`: batch-4 slugs get the same stress-observation exemption batches 1–3 got.
  - **`stress-replay.ts` D02 ("Free alternative to Midjourney"), a gate: please look.** It passed when at least 2 of Ideogram, Canva and Krea were in the top 5. Firefly's verified free tier now ranks it first and fills the fifth slot, pushing Canva out (the list is Firefly, Ideogram, Leonardo, GPT Image, Scenario). I added Adobe Firefly to the accepted answers, with a comment. The alternative is to drop Firefly's free-tier fact, which I didn't do because it's verified and correct.
- **`stale-facts-batches.md`:** batch 4 marked as this PR. A session note is added under `sessions/`.

## Checks
- `npx tsc --noEmit` passes. The new runner and the snapshot applier also typecheck on their own.
- `npm run lint` gives 0 errors and 2 warnings, both pre-existing in files this PR doesn't touch.
- `npm test` passes 1107/1107, including the new `audit-20.test.ts` (22 tests).
- `npm run audit:tutorials` is clean (198 pages).
- I didn't run a dev server or touch any database.

## Browser-check list
These pages could not be read reliably without a real browser, or the two readers disagreed. The affected facts are left as the row has them, or recorded as `unverified`.

| Platform | URL | What to check |
|---|---|---|
| clio-manage | https://www.clio.com/pricing/, https://www.clio.com/privacy/ | Everything: plans (the row says EasyStart $39 / Essentials $69 / Advanced $99 / Complete $129), the 7-day trial, AI features by plan, privacy and training clause. Every page returned 403 to both readers |
| scholarcy | https://www.scholarcy.com/pricing, https://www.scholarcy.com/privacy-policy | Everything: free limits (the guide says three different figures), Plus price, trial, privacy. Every page returned 403 to both readers |
| scispace | https://scispace.com/pricing, https://scispace.com/privacy-policy | Free vs Premium ($20) vs Advanced ($70) prices and limits, privacy. Both returned 403. The website was moved from typeset.io on the redirect alone |
| naver-hyperclova-x-cue | https://clova-x.naver.com, https://cue.search.naver.com, Naver's privacy policy, https://www.ncloud.com/product/aiService/clovaStudio | Whether CLOVA X and Cue: closed on 2026-04-09 (the guide says so; the row still describes "Cue: chatbot"). Row pricing and the training clause. These pages were blocked, or showed no prices |
| adobe-firefly | https://www.adobe.com/products/firefly/plans.html in a US locale | USD prices for Standard, Pro, Pro Plus and Premium (one reader: $9.99 / $19.99 / $49.99, Premium not captured); the free daily count; trial length; whether the "no training on Creative Cloud subscribers' content" line covers free users; the Pro-for-teams credit conflict (7,000 vs 4,000) |
| adobe-acrobat-ai-assistant | https://www.adobe.com/acrobat/pricing.html, https://helpx.adobe.com/acrobat/using/acrobat-ai-assistant.html | Price of the AI Assistant add-on ($1.99/mo appears only in the students section), trial length, Standard vs Express trial, the "never used to train" statement (one reader; the help page returned 403) |
| topaz-labs | https://www.topazlabs.com/pricing (the last 48,000 characters), https://www.topazlabs.com/terms-of-service (404) | A free trial or perpetual licence mentioned in the unread part; Studio Pro and Topaz for Web prices (the page shows two different figures each) |
| cohere | https://docs.cohere.com/docs/rate-limits, https://cohere.com/model-training-privacy-notice | Trial-key limits (1,000 calls a month: one reader; 20 requests a minute for Chat); current Command A prices (the pricing page lists older models only); the Enterprise Data Commitments |
| amazon-q-developer | https://aws.amazon.com/q/developer/pricing/ in a browser | Whether Pro and new IDE signups closed on 2026-05-15 as the guide says (both readers still saw Pro $19 on the pricing page) |
| amazon-bedrock | https://aws.amazon.com/bedrock/pricing/ (last 18,000 characters), the Bedrock FAQ | Anthropic and Nova per-token prices; the "not used to improve the base models" line (one reader) |
| azure-openai-service | https://azure.microsoft.com/en-us/pricing/details/azure-openai/ | Per-token prices (the page shows "$-" placeholders), the free-account credit amount, "limited access" (one reader) |
| google-veo-3-1 | https://flow.google/, Google Cloud pricing for the generally available Veo models | Whether free Flow accounts get a daily Veo allowance (the guide says so; the Gemini plans page lists none), Google Cloud Veo prices, consumer privacy |
| harvey-ai | https://www.harvey.ai/security | The "never trains on customer data" statement (one reader); the Customer Agreement |
| spellbook | https://spellbook.com/privacy-policy, https://spellbook.com/security | Company name (Dialog Enterprises Inc., one reader), academic free access, the zero-data-retention agreements (one reader), the training clause |
| open-webui | https://openwebui.com/privacy, the env-configuration docs (404) | Company name (Open WebUI Inc., one reader); telemetry defaults; the website privacy line on training ML models |
| wondershare-pdfelement-ai | https://pdf.wondershare.com/pricing.html (404), the privacy policy (404) | AI credit limits, trial terms and watermark, and the training clause |
| chatpdf | /pricing, /privacy and /api/docs (all 404) | The Plus price, page and file limits, the privacy policy and training clause |
| luminance | https://www.luminance.com (customer terms, Data Processing Addendum) | Customer-data terms; the privacy policy only was read |

## Risks
- **Price facts expire after 30 days.** `facts.test.ts` checks them against the real date, so `npm test` starts failing for these files after **2026-11-28** unless they are re-checked. Batches 1–3 have the same date.
- **The verification is agent-only for batch 4.** JS-heavy and bot-protected sites were the weak spots: Clio, Scholarcy, SciSpace, Adobe's regional pricing, Azure's pricing page. The readers flagged them rather than guessing.
- **Cost-tier changes on 6 rows** affect Discover filters and free-alternative results:
  - ENTERPRISE→PAID: topaz-labs
  - FREEMIUM→PAID: adobe-acrobat-ai-assistant, amazon-bedrock, azure-openai-service
  - FREE→FREEMIUM: cohere, google-antigravity
- **Search order moves** with the data (6 golden re-pins, one stress-replay criterion). No search code changed.
- **Veo's status notice** ("Gemini API previews shut down on 2026-10-22") shows a notice on a product that is still sold in Gemini and Flow. The wording is scoped to the API; please read it on the preview.

## Judgment calls (please confirm)
1. **Cost tiers.** Topaz ENTERPRISE→PAID (consumer subscriptions); Acrobat, Bedrock and Azure FREEMIUM→PAID (time-limited trials or credits only, no permanent free tier, the same rule audit 11 used); Cohere FREE→FREEMIUM (free Trial key, paid production); google-antigravity FREE→FREEMIUM (to match the CLI row). Veo stays FREEMIUM because the guide describes a free daily Flow credit allowance that the readers couldn't check.
2. **Privacy.**
   - **Cohere HIGH→MEDIUM:** trial-user inputs may be used for research and development, with no opt-out.
   - **Amazon Q Developer HIGH→MEDIUM:** Free-tier content may be used for training, with an opt-out.
   - **Topaz** stays HIGH although its policy says nothing about training.
   - **google-antigravity (IDE)** stays HIGH, although the CLI row is LOW under the same Antigravity terms. I didn't change it because the opt-out question is open (same as for the CLI row). **Zach to decide** whether the IDE should be LOW.
3. **Open WebUI** stays FREE. The text now says it is not OSI-approved open source. If the site tags or filters "open source" from another field, check it.
4. **Status notices on active products:** Amazon Q Developer (IDE plugin support ends 2027-04-30) and Veo 3.1 (API previews shut down). Both render as "X: status update".
5. **D02 gate edited** (see Other code changes). **Zach to confirm.**
6. **Firefly's plans fact is `unverified`** because one reader got USD prices; the credit amounts (both readers) are in a verified `usageLimits` fact and in the row text, and USD prices are omitted from the row ("vary by region and are not confirmed").
7. **No renames:** Azure OpenAI Service (now "Azure OpenAI in Foundry Models") and Google Veo 3.1 keep their names and slugs. A rename should be its own PR.
8. **Amazon Q Developer** adds Kiro as a direct alternative (AWS names it as the replacement). Audit 15 removed Tabnine from the same list; audit 20 doesn't put it back.

**Out of scope, noticed:**
- The `gemini-cli` row's `budgetAlternativeTo` is still garbled ("Gemini CLI free tier is generous)"). The brief says not to change that row.
- Rows noticed in earlier batches' leftovers (Shopify/Salesforce renames, Lyria, Quizlet, Restb.ai, Leonardo) are untouched, as instructed.

## What's left
- The Browser-check list above.
- Running audits 17/18/19 (if not yet applied) and then audit 20 after the deploy, then `cache:revalidate`.
- The rename and tier/privacy decisions above.
- Stale-facts batches are finished once the browser checks are folded in; the next catalog task would be re-dating the facts before 2026-11-28.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
