# Stale facts batch 3 + catalog audit 19

**Branch:** `stale-facts-b3-1029` (off `origin/main` 1a4e93c, which includes batch 1 / #117 and batch 2 / #118). Draft. **Do not run audit 19 before the code deploys.**

## What this is

Batch 3 of the stale-facts list: rows 52–73 (22 platforms) in `docs/planning/2026-10-autonomous-business/stale-facts-batches.md`, none of which had a fact file. This PR re-verifies each one on the vendor's own pages, adds a sourced fact file for 21 of them, and adds **catalog audit 19**, an operator script that brings the row text in line with the facts. The process and quality bar are the same as batch 2 (#118).

- All 22 rows date from the May 2026 taxonomy restructure.
- **Also in this PR:**
  - the Research Analyst's browser checks of batch 2 (9 rows; see **Batch-2 rows changed**);
  - GPT Image's leftover "3 images/day" upgrade trigger;
  - a **new Antigravity CLI row** (create-only), with a fact file and a guide, cross-linked with Gemini CLI both ways (see **Antigravity CLI**).
- The #115/#116 rows, batch 1 and batch 2 rows are not in the batch; the test checks this.

## How facts were verified

- **Two independent, blind readers per platform.** Twelve research agents, two per group of three or four platforms, read each vendor's own pages: their domain, docs, help centre, newsroom, legal pages or official GitHub. No third-party sites and no X. The readers ran in parallel without seeing each other's results; I compared their reports field by field.
- A fact is `verified` only when both reads agree. It carries `gatheredBy: "research-analyst"`, `verifiedBy: "claude-recheck"` and `verifiedAt: 2026-10-29`, so `isPublishedVerified` holds.
- A fact that only one reader saw, or that the two read differently, is `unverified` or left out. Those go in the file comment and on the Browser-check list, and the row text is left alone.
- Hidden text aimed at AI agents was seen on alpha-sense.com (zero-width characters in a menu link) and on a Murf API docs page; both were ignored.
- **Nobody checked the batch-3 facts in a real browser.** The batch-2 browser checks are the Research Analyst's; see **Batch-2 rows changed**.

## Platforms changed (22), and fact status

`*` marks a guarded field: it is written only while the row still holds the expected old value.

| Platform | Verified facts | Unverified facts | Audit 19 writes |
|---|---|---|---|
| `pathai` | status, officialUrl, company, freeTier, features, privacy | — | currentPricing, freeTierFeatures, usageLimits, website* |
| `alphasense` | officialUrl, freeTier, plans, privacy | — | currentPricing, freeTierFeatures, usageLimits, website* |
| `bloomberg-gpt-terminal-ai` | — | company, features | — (bloomberg.com blocked; one reader only) |
| `ramp-intelligence` | freeTier, plans, features | — | currentPricing, freeTierFeatures, usageLimits |
| `canopy-tax` | officialUrl, freeTier, plans, privacy | — | currentPricing, freeTierFeatures, usageLimits, website* (audit 11 owns its cost tier) |
| `zillow-ai-zestimate` | features | — | — (zillow.com blocked) |
| `restb-ai` | freeTier, plans | — | currentPricing, freeTierFeatures, usageLimits, costTier* (FREEMIUM→ENTERPRISE) |
| `khan-academy-khanmigo` | officialUrl, freeTier, plans | — | 3 text + upgradeTriggers, costTier* (FREE→FREEMIUM), website* |
| `duolingo-max` | features | — | — (duolingo.com renders only in a browser) |
| `quizlet-q-chat` | — (no fact file) | — | — (every Quizlet page returned 403) |
| `speak-language-ai` | company, freeTier, plans, privacy, features | — | primaryUse, 3 text, upgradeTriggers, costTier* (FREEMIUM→PAID), privacyLevel* (HIGH→LOW) |
| `gong` | freeTier, plans | — | currentPricing, freeTierFeatures, usageLimits |
| `outreach` | officialUrl, company, freeTier, plans | — | currentPricing, freeTierFeatures, usageLimits, website* |
| `semrush-ai` | company, freeTier, plans | — | 3 text, costTier* (ENTERPRISE→FREEMIUM), company* |
| `scale-ai` | freeTier, features | — | currentPricing, freeTierFeatures, usageLimits |
| `udio` | freeTier, features | — | 3 text + upgradeTriggers |
| `aiva` | company, freeTier, plans | — | currentPricing, freeTierFeatures, usageLimits |
| `beatoven-ai` | company, features | freeTier | 3 text + upgradeTriggers, costTier* (FREE→FREEMIUM) |
| `google-lyria-3` | officialUrl, freeTier, apiPricing, features | — | 3 text + upgradeTriggers, costTier* (FREE→FREEMIUM), website* |
| `soundraw` | freeTier, plans | — | currentPricing, freeTierFeatures, usageLimits, costTier* (FREEMIUM→PAID) |
| `murf-ai` | officialUrl, company, freeTier, plans, apiPricing | — | 3 text + upgradeTriggers, company* and website* (both were empty) |
| `glasp` | company, freeTier, plans, privacy | — | 3 text + upgradeTriggers, costTier* (FREE→FREEMIUM) |

**Totals: 62 facts verified, 3 unverified, across 21 new fact files.** Every fact has `checkedAt: 2026-10-29` and a vendor `sourceUrl`.

### Biggest corrections
- **Being acquired:** Roche has a definitive merger agreement to buy PathAI (Roche's release, 2026-05-07; closing expected in the second half of 2026). It is now a status notice on the PathAI page.
- **Adobe owns Semrush** (completed 2026-04-28). The plans are now SEO $139, Starter $199 and Pro+ $299 a month, plus a permanent free account; there is no Pro, Guru or Business. The row moves ENTERPRISE → FREEMIUM.
- **Free / paid backwards or wrong:**
  - Khanmigo is free for **teachers**; learners and parents pay $4/mo or $44/yr (US only). The row had it the other way round.
  - Speak has a 7-day trial and no free plan; the US web offer shows only promotional annual prices.
  - Glasp now sells Pro ($12.50/mo) and Unlimited ($30/mo).
  - Soundraw's pricing page lists only paid plans.
  - Beatoven sells downloads per track or by monthly minutes (not FREE).
  - Restb.ai has no free API trial, only free proofs of concept.
- **Gone or changed products:**
  - MusicFX now redirects to Google Flow Music. Lyria 3.5 is in the Gemini app, free with limits, and the Gemini API charges $0.04–$0.08 per song.
  - Udio has disabled all downloads since its Universal Music Group deal (2025-10-29). Free is 10 credits a day; Standard and Pro have 2,400 and 6,000 credits a month (the row said 1,200 and "unlimited").
- **Wrong numbers:**
  - Ramp Plus is $15/user/mo plus a platform fee (not $12).
  - Canopy is Standard $74 / Plus $109 / Premium $149 per user/mo billed annually (not "from $50").
  - AIVA is €11 / €33 a month billed annually.
  - Murf Creator is from $19/mo (not $29).
- **Dropped unsupported claims:** AlphaSense "$10K+ a year", Gong "unlimited call recording", Scale "project-based pricing".
- **Moved sites:** Canopy (getcanopy.com), Outreach (outreach.ai), Khanmigo (khanmigo.ai), Lyria (the DeepMind model page). Murf's empty company and website are filled in.
- **Privacy:** Speak trains on user audio with no stated opt-out → LOW. Glasp trains on saved content (already LOW).

## Batch-2 rows changed

The Research Analyst checked batch 2's open items on official vendor pages on 2026-10-29 (`lp-stale-batch2-browser.md`, plus the fetch results relayed in the brief). I used only facts marked verified. Anything marked NOT STATED is now "not stated" or "not confirmed". Browser-confirmed facts carry `verifiedBy: "ra"`. Hidden text aimed at AI agents on trinka.ai and wix.com was ignored. One of my readers pinned the official URLs for the fetch items (Dragon, Codex, Power Automate, Healthee).

| Row | Check | Fact file | Row (audit 19) | Guide |
|---|---|---|---|---|
| `leonardo-ai` | verified ([pricing](https://leonardo.ai/pricing), [privacy](https://leonardo.ai/privacy-policy)) | Plans verified: Essential $12 / Premium $30 / Ultimate $60 a month billed monthly ($12 / $29 / $58 yearly). 8,500 / 25,000 / 60,000 are **monthly** fast tokens, with separate Token Bank caps (25,500 / 75,000 / 180,000). New privacy fact: Free-plan content can be used for training | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers | No change (already says free work trains the models) |
| `trinka-ai` | partial ([pricing](https://www.trinka.ai/pricing)) | Annual plans verified: Premium $48/yr (from $80), Premium Plus $125/yr, Confidential Data $300/yr (from $500). Monthly prices not captured. The privacy policy has no explicit training clause | currentPricing (drops "$20/mo"), usageLimits | No change |
| `wix-ai` | verified ([plans](https://www.wix.com/plans)) | New verified plans: Light $17 / Core $29 / Business $39 / Business Elite $159 a month, billed yearly; AI credits 150 / 200 / 300 / 1,000; removing branding needs Core. Free storage: not stated | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers | No change |
| `microsoft-designer` | partial ([Designer page](https://www.microsoft.com/en-us/microsoft-365/microsoft-designer)) | New verified freeTier: free with monthly credits, 1 per AI action; **count not stated**; boosts gone; paid plans up to 4x more. The account requirement is not stated | currentPricing, freeTierFeatures, usageLimits, upgradeTriggers | No change |
| `squarespace-ai` | verified | Confirms batch 2's annual/monthly mapping exactly | No change | No change |
| `openai-codex-cli` | verified (RA; [help article](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)) | New freeTier: **the CLI is included on ChatGPT Free and Go**; only Codex cloud isn't. FREEMIUM is now sourced | freeTierFeatures, upgradeTriggers | "OpenAI's pages disagree" becomes "Free and Go include the CLI; Codex cloud starts at Plus" |
| `microsoft-power-automate` | verified ([pricing](https://www.microsoft.com/en-us/power-platform/products/power-automate/pricing)) | Trial is 30 days (one Learn page still says 90) | freeTierFeatures | Trial pitfall now names 30 days and the Learn conflict |
| `dragon-medical-one` | verified ([resource centre](https://dragonmedicalone.nuance.com), [Learn](https://learn.microsoft.com/en-us/industry/healthcare/dragon-medical-one/admin/upgrade-dragon-medical-one)) | New status notice: **LTSR 2021.4.5 and earlier stop working after December 31, 2026**. The installer subdomain is still live | usageLimits | No change (it already carries the notice) |
| `healthee` | verified ([FAQ](https://healthee.com/faqs/)) | Privacy now verified and cited to the FAQ (no PHI or identifiable employee data used for AI training); the privacy policy (2026-03-27) has no AI-training clause | No change | No change (already quotes the FAQ) |

Also: **GPT Image**'s `upgradeTriggers` still said "Needing more than 3 images/day" (audit 18 missed it). Audit 19 rewrites it with no number.

**Audit 18 was edited too, so the two audits can't undo each other.** On the 10 fields both audits write (Leonardo ×3, Designer ×3, Trinka, Codex, Power Automate, Dragon), audit 18 now writes audit 19's text, and its six matching `finding` strings and header say so. This mirrors what batch 2 did to audit 17. `audit-19.test.ts` checks that the texts are equal and simulates re-running 17 and 18 after 19: none of the fields 19 owns change. No other stale-facts audit writes `upgradeTriggers` or `directAlternatives`.

## Antigravity CLI (new row)

- **Sources:** official Google pages only. The facts come from `lp-antigravity-verify.md` (the Research Analyst, including its browser addendum with the Google AI Pro / Ultra prices and the per-plan model table), checked again by one blind reader of mine. Both reads agree on everything except the training opt-out (below).
- **Row** (created only when no row has the slug; the audit 16 pattern):
  - Slug and placement: `antigravity-cli`, "Antigravity CLI", Google, in ai-coding-development. Website is antigravity.google/product/antigravity-cli.
  - **FREEMIUM:** $0 for individuals with a quota refreshed weekly. Google AI Pro $19.99/mo; Google AI Ultra from $99.99/mo; Gemini Enterprise from $30/seat.
  - **Privacy LOW:** Google uses Interactions to improve its ML, and reviewers may see them.
  - **Not tagged open source:** no public source or licence; it ships as a binary under the Antigravity terms.
  - **Requests per minute or per day: "not stated".**
- **Cross-links, both ways:**
  - Gemini CLI's `directAlternatives` gains "Antigravity CLI" (append-only).
  - The new row lists Gemini CLI first.
  - Each guide's "where to next" links the other.
  - Gemini CLI stays PAID; its note already points to Antigravity CLI for free use.
- **Guide:** `src/data/tutorials/antigravity-cli-getting-started.ts` (prompts archetype). Prices only as `{{price:antigravity-cli:…}}` tokens. No model version numbers in the prose. Registered in `index.ts`.
- **⚠ `/platform/antigravity-cli` is a new slug.** Its page, guide and the Gemini CLI guide's link 404 until audit 19 runs. After `--apply`, run `npm run cache:revalidate` and **redeploy**, so the sitemap, `/tutorials` and the guide route pick up the new row.

## What audit 19 changes (`scripts/update-catalog-audit-19.ts`, `npm run db:update-catalog-audit-19`)

- **What it does:** the same as audits 17 and 18.
  - Updates rows only, plus one create.
  - Never deletes; never touches the slug, name, categoryId, description, affiliate or sponsor data of an existing row.
  - Writes a text field only where it differs.
  - Writes company, website, costTier and privacyLevel only from their expected old value (company and website may expect an empty value), and logs a skip for a hand edit.
  - Only appends missing names to directAlternatives.
- **New in this audit:** `upgradeTriggers` is a text field; `directAlternatives` is append-only (the audit 9 rule); the create-only Antigravity row.
- **Safety:** it runs as a dry run unless you pass `--apply`. Production needs `--confirm-production` plus `CONFIRM_PROD_HOST`, and the 5-second countdown applies. The prod-guard code is byte-identical to audits 15–18 (the test checks this).
- **Expected dry run with audit 18 already applied:** `audit19: 27 rows / 100 patched fields, 1 created`.
  - **Batch 3:** 18 rows / 80 fields: 62 text, 7 websites, 8 cost tiers, 2 companies, 1 privacyLevel. Bloomberg, Zillow, Duolingo and Quizlet change in code only, or not at all.
  - **Batch-2 re-check:** 7 rows / 18 text fields.
  - **Other:** 2 rows / 2 fields (GPT Image upgradeTriggers, Gemini CLI directAlternatives).
  - **If audit 18 hasn't run:** run it first (it now writes the aligned text). Audit 19 then reports 25 rows / 90 fields.
  - **Re-run, or a dry run after `--apply`: 0 rows, 0 created.**
- **Audits 10/11 cannot revert it.**
  - Audit 10 touches none of these slugs.
  - Audit 11 patches canopy-tax and squarespace-ai on costTier only (already applied). Audit 19 never writes either cost tier.
  - The test asserts both.
- **Order:**
  1. Deploy first. The fact files show on the site at deploy, because the overlay applies them over the row text.
  2. Run audit 18 if it hasn't run.
  3. Run audit 19 on the Neon branch, then production.
  4. `npm run cache:revalidate`, then redeploy for the new slug.

## Other code changes
- **New fact files:** 21 in `src/data/facts/` plus `antigravity-cli.ts`, all registered in `registry.ts`.
- **Batch-2 fact files updated:** leonardo-ai, trinka-ai, wix-ai, microsoft-designer, squarespace-ai, openai-codex-cli, microsoft-power-automate, dragon-medical-one, healthee.
- **Guides fixed where they contradicted the findings,** with `lastReviewedAt` 2026-10-29:
  - **scale-ai:** drops the "Self-Serve Data Engine with free units" claim. The pricing page now shows no self-serve plan.
  - **pathai:** "an independent company" now notes the pending Roche acquisition.
  - **openai-codex-cli** and **microsoft-power-automate:** as above.
  - **glasp:** notes the policy was updated again on 2026-10-29.
  - **gemini-cli:** gains the Antigravity CLI link.
  - The other 18 batch-3 guides were scanned against today's findings and already agree (Udio's download ban, Lyria 3.5, Soundraw's download paywall, Khanmigo's teacher-free model and so on). They were not re-researched, so their dates are unchanged.
- **`src/lib/mcp/catalog-snapshot.json`:** audit 19 applied with `scripts/mcp-snapshot/apply-audit-19-to-snapshot.ts`, which uses the runner's diff function. The first run changed 27 rows, the second 0. The Antigravity row is not added, as with audit 16's hermes-agent.
- **Tests whose expectations moved with the data (no search or ranking code changed):**
  - `golden-top5.json`: 7 re-pins.
    - A14 and G60 (homework): Khanmigo moves to #1.
    - A23 and G45/G46 (music): Lyria, Soundraw and AIVA move.
    - G58: order only.
    - G37 ("learn a language"): **murf-ai replaces trinka-ai at #5** (see Judgment calls).
  - `catalog-snapshot.test.ts`: batch-3 slugs get the same stress-observation exemption batches 1 and 2 got.
  - `search-p13.test.ts`: the stale-record example moves from AIVA (now fresh) to quizlet-q-chat, which is still on its May import.
- **`stale-facts-batches.md`:** batch 2 is marked done in #118, with its browser checks folded in here; batch 3 is marked as this PR.

## Checks
- `npx tsc --noEmit` passes. The new runner also typechecks on its own; audit 16's runner has a latent type error that tsx ignores at runtime.
- `npm run lint` gives 0 errors and 2 warnings, both pre-existing in files this PR doesn't touch.
- `npm test` passes 1085/1085, including the new `audit-19.test.ts` (22 tests).
- `npm run audit:tutorials` is clean (198 pages).
- I didn't run a dev server or touch any database.

## Browser-check list
These pages could not be read reliably without a real browser, or the two readers disagreed. The affected facts are left as the row has them, or recorded as `unverified`.

| Platform | URL | What to check |
|---|---|---|
| quizlet-q-chat | https://quizlet.com/upgrade, https://help.quizlet.com | Everything: whether Q-Chat is retired (the guide already says so), Plus prices, AI features. Every page returned 403 to both readers |
| bloomberg-gpt-terminal-ai | https://www.bloomberg.com/professional/, https://professional.bloomberg.com/products/bloomberg-terminal/ai/ | Whether a Terminal price is published (the row says ~$24,000/yr); company name ("Bloomberg Finance L.P."); the AI feature names. One reader only |
| zillow-ai-zestimate | https://www.zillow.com/z/zestimate/ | Free consumer use, whether every home has a Zestimate (the row says all; a lead suggests about 110M of 125M), privacy notice. zillow.com returned 403 |
| duolingo-max | https://www.duolingo.com/max | Super and Max prices (the row's two price lines contradict each other), Hearts vs Energy, and Explain My Answer free since 2026-01-01 (one reader) |
| udio | https://www.udio.com/pricing, https://www.udio.com/privacy-policy | Standard and Pro monthly prices (only a $96/yr example was read), company (Uncharted Labs, one reader), training clause |
| beatoven-ai | https://www.beatoven.ai/pricing (404) | Plans and free tier (one reader read Free 5 generations; Creator $6 / 15 min, Visionary $10 / 30 min, $20 / 60 min from the homepage's structured data) |
| murf-ai | https://murf.ai/pricing | Monthly-billing prices, voice hours per plan, and whether Free includes commercial rights (two Murf pages disagree) |
| aiva | https://www.aiva.ai/pricing (monthly toggle) | Monthly-billing prices €15 / €49 (one reader, from the page script) |
| soundraw | https://soundraw.io/pricing | Which of each plan's two prices is monthly and which annual (an older Soundraw page says Creator is $19.99 monthly) |
| alphasense | https://www.alpha-sense.com/trial-request/ | Trial length ("two-week" in a vendor blog post, one reader) |
| semrush-ai | https://www.semrush.com/prices/ | Advanced's AI-prompt allowance (help centre 200 vs pricing page "Unlimited") |
| ramp-intelligence | https://ramp.com/legal/privacy-terms/privacy-terms/privacy-policy | AI-training clause (the page renders only in a browser) |
| restb-ai | https://restb.ai, Restb Lens | Restb Lens self-serve plans and two-week trial (in the guide, not rechecked), and the Clear Capital ownership the guide reports |
| antigravity-cli | https://antigravity.google/terms, Antigravity Settings | Whether the Settings preference / FAQ "opt out of data collection" stops training use (the RA found none stated; my reader found the preference) |
| Batch-2 leftovers | wix.com/plans; Designer page; trinka.ai/pricing; leonardo.ai/pricing | Wix free-plan storage, Designer's free credit count and account requirement, Trinka monthly prices, whether Leonardo's yearly plans are billed up front: all NOT STATED in the browser check |
| Batch-2 fetch items | gemini-cli, upstage-solar, aider, scenario, shopify, salesforce, workato (see #118's list) | The companion fetch file named in the RA's notes was not available, so these batch-2 items are still open, apart from the Codex, Dragon and Healthee results relayed in the brief |
| openai-codex-cli | https://help.openai.com/en/articles/11369540 | The Free/Go CLI fact rests on the RA's check. My reader got 403 there; the pricing page only says Codex is included on Free and Go |

## Risks
- **Price facts expire after 30 days.** `facts.test.ts` checks them against the real date, so `npm test` starts failing for these files after **2026-11-28** unless they are re-checked. Batches 1 and 2 have the same date.
- **The verification is agent-only for batch 3.** JS-heavy and bot-protected sites were the weak spots: Bloomberg, Zillow, Quizlet, Duolingo, Udio's and Murf's pricing pages, and Beatoven's 404. The readers flagged them rather than guessing.
- **Cost tier changes on 9 rows** affect Discover filters and free-alternative results:
  - FREE→FREEMIUM: khanmigo, beatoven-ai, google-lyria-3, glasp
  - FREEMIUM→PAID: speak, soundraw
  - FREEMIUM→ENTERPRISE: restb-ai
  - ENTERPRISE→FREEMIUM: semrush-ai
- **Search order moves** with the data (7 golden re-pins). No search code changed.
- **The new row 404s until the audit runs.** The Gemini CLI guide links to `/platform/antigravity-cli`, which 404s between deploy and audit 19.
- **Run order:** audit 17 and audit 18 (if not yet applied), then audit 19. With the aligned text any order converges, but this order gives the cleanest log.

## Judgment calls (please confirm)
1. **Restb.ai goes to ENTERPRISE**, not PAID. Its API is sales-led with no published prices. The guide also describes a self-serve Restb Lens with published plans, which our readers didn't recheck; if Lens counts, PAID fits.
2. **Soundraw goes to PAID.** The pricing page lists only paid plans, and "try it free" isn't a free plan. Downloads were already paid-only per the guide.
3. **Beatoven goes to FREEMIUM on an unverified free tier.** FREE is clearly wrong (downloads are paid). Whether there is any free use is one reader's read of structured data.
4. **Speak privacy HIGH → LOW** (audio used to train its AI, no opt-out stated). **Leonardo stays MEDIUM** even though Free-plan content trains its models, because paid plans can generate privately. Tell me if you'd rather go LOW.
5. **Antigravity CLI privacy LOW**, as briefed, even though my second read found a Settings preference on data use. The opt-out is recorded as "not confirmed".
6. **Status notices on active products:** PathAI (pending Roche acquisition) and Dragon Medical One (LTSR end of life). Both render as "X: status update", as Character.AI does.
7. **Semrush company becomes "Semrush (an Adobe company)".** No renames: "Google Lyria 3" (current model 3.5) and "Quizlet Q-Chat" (Q-Chat retired per the guide) keep their names and slugs. A rename should be its own PR. **Zach to decide.**
8. **Quizlet gets no fact file.** Nothing was readable, and an all-unverified file would add nothing.
9. **Codex Free/Go rests on the RA's browser check**, cited to the help article my reader couldn't open.
10. **Golden G37 ("learn a language") now has Murf AI at #5**, because it gained verified facts. It's a voice tool, so the result looks odd; it follows the existing ranking rules and I didn't change search code.
11. **Audit 18 edited after merge** (10 fields), as batch 2 did to audit 17.

**Out of scope, noticed:**
- The `google-antigravity` row (the IDE) still says "Free (preview)" and "cloud-based IDE".
- Gemini CLI's `budgetAlternativeTo` is garbled ("Gemini CLI free tier is generous)").
- Claude Code and Codex CLI still list "Gemini CLI (free…)" as a budget alternative.

None were changed here (the brief allows only the cross-link). They're candidates for batch 4 or a follow-up.

## What's left
- Batch 4 (19 rows), listed in `stale-facts-batches.md`.
- The Browser-check list above.
- Running audit 19 after the deploy (and audits 17/18, if they haven't run yet), then `cache:revalidate` and a redeploy for `/platform/antigravity-cli`.
- The rename decisions (Shopify, Salesforce, Lyria, Quizlet) and the out-of-scope stale rows above.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
