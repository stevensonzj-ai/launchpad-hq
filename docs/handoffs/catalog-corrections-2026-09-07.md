# Catalog Corrections — Consolidated Review

**Date:** 2026-09-07
**Source:** Part 3 (Catalog Corrections) and Part 4 (Uncertainties) of the 15 locked tutorial research briefs in `tmp/tutorial-pipeline/briefs/`.
**Scope:** 15 of 170 catalog rows. Part 1 (shipped page copy) was not consulted.

Every claim below is attributed to the brief it came from. Where two briefs would have to be combined to reach a conclusion, they have not been. Where a researcher flagged a claim as unconfirmed, it appears in Section 3 and is not stated as a correction anywhere else.

---

## 1. Executive summary

**Fifteen rows were reviewed. Thirty field-level changes are ready to apply now (Section 2), plus five more that come bundled inside identity changes (Section 4). Twenty-five items need a check before they can be actioned (Section 3).**

Three things matter most:

**1. `costTier` rot is confirmed at scale, and it is not random.** All 15 briefs made an explicit `costTier` determination. Only two were confirmations of an already-correct value (`microsoft-copilot`, `windsurf`). One is unresolvable without a check (`google-veo-3-1`). The remaining twelve are corrections or conditional corrections. The single value with a verified before-and-after is `claude-code`: stored as `ENTERPRISE`, correct value `PAID` — a two-band error on a flagship row. The pattern in the corrections is that free-adjacent facts drift in both directions: `gumloop` lost its free plan on 2026-07-30 and is now paid-only; `groq` and `open-webui` are more free than the catalog is likely to record; `slack-ai` and `flux` are less free than a naive reading of their parent brands suggests. **Start here — it is the highest-volume, lowest-ambiguity work.**

**2. Two rows point at products that no longer exist under the name the catalog uses, and one product is dead.** `windsurf` is now **Devin Desktop**, owned by **Cognition**, and `windsurf.com` 302-redirects away (windsurf.md — re-verified against vendor pages, high confidence). `mistral-ai-le-chat` is now **Vibe** as of 2026-05-28 (mistral-ai-le-chat.md). Separately, if the catalog carries a **Copilot Pro** row, that product is discontinued — no longer purchasable, support ended 2026-08-01 (microsoft-copilot.md). Full detail in Section 4.

**3. `udio` may be advertising rights the product no longer grants — but the evidence is explicitly flagged as MEDIUM confidence.** Per udio.md, the Terms of Service (12 Nov 2025) and a Udio help article (17 Feb 2026) say downloads are disabled, output is not user-owned, and commercial use is not permitted. Udio's *own help centre* still says the opposite. The researcher could not resolve which Udio intends to enforce and did not log in. If the catalog asserts downloads, ownership or commercial use for this row, it may be materially misleading users — **but verify in a logged-in account before changing anything** (Section 3, item U1). This is the largest user-facing risk in the set and simultaneously one of the least settled.

**One caveat that shapes the whole work queue:** with the single exception of `claude-code`, the briefs were not written against a database dump. They say "if the catalog currently lists X, correct it to Y". The `current value` column below reflects that. **Read the 15 rows out of Neon first**; some of these thirty changes will turn out to be no-ops, and knowing which is worth ten minutes.

**Design signal:** six of fifteen rows carry lifecycle state the schema cannot express — discontinued, renamed, acquired-but-independent, superseded-in-place, pivoted. See Section 6, item Q1.

---

## 2. Act now — high confidence

Rows where a brief gives a clear, primary-sourced correction. **Identity changes (`name`/`company`/`website` moving together) are in Section 4, not here.** Rows marked *(conditional)* apply only if the stored value matches the "current value" column.

| # | slug | field | current value | corrected value | evidence |
|---|------|-------|---------------|-----------------|----------|
| 1 | `claude-code` | costTier | `ENTERPRISE` (stated) | `PAID` | claude-code.md: Anthropic setup docs + pricing page — requires Pro/Max/Team/Enterprise/Console; "Includes Claude Code" from Pro ($17–20/mo) upward. Not enterprise-gated. FREEMIUM also wrong: the free Claude plan explicitly excludes it. |
| 2 | `claude-code` | website | `https://docs.anthropic.com/en/docs/claude-code` (stated) | `https://claude.com/product/claude-code` | claude-code.md: stored URL now 302-redirects to `code.claude.com/docs/en/overview`. Keep `https://code.claude.com/docs` as the docs link. |
| 3 | `flux` | costTier | not stated | `PAID` | flux.md: BFL's own surfaces are pay-as-you-go from the first image (1 credit = $0.01; docs suggest starting at $10–$20). No free credits documented in BFL's own docs. Brief explicitly warns: do **not** mark FREEMIUM on the strength of open weights. *Carry the caveat in Section 3, item F1.* |
| 4 | `google-veo-3-1` | name | `Google Veo 3.1` | `Google Veo` | google-veo-3-1.md: "3.1" is already fragmented into Lite/Fast/Quality variants with different capabilities and credit costs, so the bare number is not accurate even within Flow; Google iterates fast enough that a pinned version reads stale within weeks. Editorial hygiene, not a vendor rename. |
| 5 | `google-veo-3-1` | website | `https://deepmind.google/models/veo/` *(conditional)* | `https://labs.google/fx/tools/flow` | google-veo-3-1.md: the DeepMind page is the canonical model spec page but has no path to actually make a video; Flow is where a beginner can. Keep the DeepMind page as a secondary/model-info link. Do **not** point at the Gemini app video page (paywalls immediately). |
| 6 | `groq` | costTier | `FREEMIUM` or `PAID` *(conditional)* | `FREE` | groq.md: free tier with real usable limits; paid usage is pay-as-you-go per token with no subscription requirement. There is no consumer subscription product. |
| 7 | `groq` | category | `text-conversational-ai` *(conditional)* | `ai-apis-developer-services` | groq.md: "it is infrastructure, not a chatbot." |
| 8 | `groq` | website / try-it link | `https://groq.com` (correct) | keep, **and add** `https://console.groq.com/playground` | groq.md: the marketing site does not itself let a beginner do anything. |
| 9 | `gumloop` | costTier | `FREE` or `FREEMIUM` *(conditional)* | `PAID` | gumloop.md: pricing page lists no $0 plan — only Pro (from ~$37/mo) and Enterprise, with a 14-day trial. Any site copy promising a "free tier" or "free plan" for Gumloop must be corrected. *Dating of the removal is secondary-sourced — Section 3, item G2.* |
| 10 | `leonardo-ai` | costTier | `PAID` or `FREE_TRIAL` *(conditional)* | `FREEMIUM` | leonardo-ai.md: free tier is real and permanent — ~150 tokens/day, refreshing daily, no card required. Paid tiers $12/$30/$60 monthly. "The free plan is permanent, not a trial." |
| 11 | `leonardo-ai` | website | `https://app.leonardo.ai` *(conditional)* | `https://leonardo.ai` | leonardo-ai.md: the app requires sign-in; prefer the marketing site for a beginner-facing catalog entry. |
| 12 | `microsoft-copilot` | website | anything other than the target *(conditional)* | `https://copilot.microsoft.com/` | microsoft-copilot.md: resolves and is the consumer product. Do **not** use `copilot.cloud.microsoft` (work/Entra entry point) or `github.com/features/copilot` (different product). Note Microsoft's own pages now write it as `copilot.com`; either is defensible, but the stored host is the safer value. |
| 13 | *Copilot Pro row, if one exists* | liveness | live | `DISCONTINUED` (or merged into Microsoft 365 Premium) | microsoft-copilot.md: the $20/mo consumer Copilot Pro tier is no longer purchasable; support ended 2026-08-01. |
| 14 | `mistral-ai-le-chat` | costTier | older Le Chat-era value *(conditional)* | `FREEMIUM` | mistral-ai-le-chat.md: permanent free plan (no card, no trial expiry); paid consumer tier $14.99/mo; Team $24.99/user/mo with $50/mo minimum; Enterprise custom. |
| 15 | `open-webui` | costTier | not stated | `FREE` | open-webui.md: self-hosted software is free with no account, trial or usage cap. Revenue is enterprise licensing sold separately; it gates nothing an individual or small team would use. "Do not tag as freemium — there is no consumer paid tier to upgrade into." |
| 16 | `open-webui` | website | GitHub repository URL *(conditional)* | `https://openwebui.com/` | open-webui.md: canonical; keep GitHub as a secondary source link. Docs at `https://docs.openwebui.com/`. |
| 17 | `pika` | costTier | not stated | `FREEMIUM` | pika.md: real non-expiring free plan (Basic, $0, 80 monthly credits) per the current pricing page. Limited (480p, ~6 five-second clips/month) but not a trial. *Note: the FAQ contradicts the pricing page on several adjacent facts — Section 3, item P1.* |
| 18 | `pika` | company | `Pika Labs` *(conditional)* | `Mellis, Inc.` (Palo Alto, California) | pika.md: legal entity named in the Terms and Privacy Policy; "Pika Labs" is the informal name used in the blog and press. |
| 19 | `recraft` | costTier | `FREE` or `PAID` *(conditional)* | `FREEMIUM` | recraft.md: real free plan (limited daily credits, public non-commercial output); paid entry Basic $12/mo monthly, $10/mo annual. |
| 20 | `recraft` | website | `https://recraft.ai` *(conditional)* | `https://www.recraft.ai` | recraft.md: the bare domain redirects to the www form; catalog should point at the root domain, not the studio entry point. |
| 21 | `slack-ai` | costTier | `FREEMIUM` or `FREE_TIER` *(conditional)* | `PAID` | slack-ai.md: "Slack itself is freemium, but Slack AI specifically is not." AI features are paid-plan only, and the features worth a tutorial require Business+ or higher. *One wrinkle in Section 3, item S2.* |
| 22 | `slack-ai` | company | not stated | `Salesforce` | slack-ai.md: metadata field only — do **not** merge Slack AI with Salesforce's separate agent products; they are distinct purchases. |
| 23 | `slack-ai` | pricing description | `$10/user/month add-on` or similar *(conditional)* | plan-tier language | slack-ai.md: Slack AI is no longer a standalone purchasable add-on. It was folded into plan tiers; the add-on was withdrawn from sale and legacy customers migrated at first renewal after 2025-08-17. |
| 24 | `slack-ai` | plan names | `Enterprise Grid` *(conditional)* | `Enterprise+` | slack-ai.md: "Enterprise Grid" is legacy; the current top tier is Enterprise+. |
| 25 | `synthesia` | costTier | not stated | `FREEMIUM` | synthesia.md: genuine non-expiring $0 Basic plan, no card required, alongside paid self-serve tiers. "Do not classify as `trial` or `paid`." |
| 26 | `synthesia` | website | check for `synthesiagame.com` / `syntheia.io` *(conditional)* | `https://www.synthesia.io` | synthesia.md: it is `.io`, not `.com`, and is distinct from synthesiagame.com (piano-learning product) and syntheia.io (different company, one letter apart). Confirm the row points at neither. |
| 27 | `udio` | costTier | not stated | `FREEMIUM` | udio.md: permanently free tier ($0, no card, ~10 credits/day + ~100/month) alongside paid plans around $10/mo (Standard) and $30/mo (Pro). |
| 28 | `windsurf` | costTier | paid-only *(conditional)* | `FREEMIUM` | windsurf.md: real $0 plan includes Devin Desktop, unlimited inline edits, unlimited tab completions and a light agent quota. Paid entry currently $20/mo (Pro). |
| 29 | `windsurf` | description/blurb | mentions `Cascade` *(conditional)* | `Devin Local` | windsurf.md: "Cascade" — the agent name in essentially every pre-2026 article — was retired around 2026-07-01 and replaced by Devin Local. Any blurb leading with Cascade is stale. |
| 30 | `windsurf` | changelogUrl | not stated | `https://docs.devin.ai/desktop/changelog` | windsurf.md: verified active and dated. |

### Confirmed correct — no action needed

Recorded so nobody re-researches them:

- `microsoft-copilot` **costTier `FREEMIUM`** — confirmed correct value, not a change (microsoft-copilot.md). Genuinely usable free tier with no account required, alongside paid consumer plans that gate real features. Do not set FREE, PAID or ENTERPRISE.
- `windsurf` **costTier `FREEMIUM`** — brief says "CONFIRM AS FREEMIUM"; row 28 above applies only if it is currently stored as paid-only (windsurf.md).
- Website URLs confirmed canonical and correct as-is: `https://bfl.ai` (flux.md), `https://groq.com` (groq.md), `https://www.gumloop.com` (gumloop.md), `https://pika.art` (pika.md), `https://www.udio.com` (udio.md), `https://slack.com/features/ai` (slack-ai.md), `https://www.synthesia.io` (synthesia.md).
- **Liveness: ALIVE and actively shipping** was confirmed for all 15 rows individually. No row in this batch is a dead product. The only discontinued product named anywhere in the set is Copilot Pro (row 13), which is a *different* row from `microsoft-copilot`.

---

## 3. Verify before acting

Twenty-five items. Each is either a vendor source contradicting another vendor source, or a claim the researcher explicitly flagged as unconfirmed. **None of these should be written to the database until the named check is done.**

### `google-veo-3-1`

**V1 — Does Flow actually have a free tier? This decides `costTier` and `accessTier`.**
The conflict (google-veo-3-1.md): `labs.google/fx/tools/flow` and the Flow credits help article both state non-subscribers get 50 credits/day. The Flow "Get started" help article lists "Google AI Plus, Pro, or Ultra" as a *requirement*. Two Google pages disagree. The researcher went with the free-tier reading and called this "the single most load-bearing uncertainty in the brief."
**Cheapest check:** open `https://labs.google/fx/tools/flow` in a signed-out / incognito window and see whether a generate control is offered or a paywall.

**V2 — If free exists, can it select Veo, or only the cheaper Omni models?**
The conflict (google-veo-3-1.md): the Flow page lists Veo 3.1 among free-tier models and the arithmetic works (Veo Lite = 10 credits against a 50-credit grant), but no explicit Google statement confirms the free tier's model picker includes Veo.
**Cheapest check:** in the same signed-out or free-account Flow session, open the model dropdown and look for Veo.

### `groq`

**V3 — Are Llama models enterprise-only or publicly priced? Two Groq pages disagree.**
The conflict (groq.md): the models docs currently mark `llama-3.1-8b-instant` and `llama-3.3-70b-versatile` as Enterprise (contact sales); the pricing page still shows public per-token rates for them. Called "the most consequential open question in this brief" because Llama models are what most existing Groq tutorials tell beginners to pick.
**Cheapest check:** open `https://console.groq.com/playground` on a free account and read the model dropdown.

**V4 — Is the playground usable on the free tier without ever creating an API key?**
Flagged unconfirmed (groq.md): strongly implied by the console's structure and the Free plan description, but not stated in any doc read. If wrong, starter actions 1–4 need reordering.
**Cheapest check:** sign up with a fresh account and try to run a prompt in the playground before creating a key.

**V5 — Does Groq train on customer inference data?**
Flagged unconfirmed (groq.md): the retention doc is silent on training; the privacy policy explicitly excludes Customer Data from its scope and defers to the Services Agreement and DPA, which were not read. "The absence of a claim is not a promise either way. Do not upgrade this to a positive claim without reading the DPA."
**Cheapest check:** read the GroqCloud DPA / Services Agreement sections on customer data and model training.

### `pika`

**V6 — Pika's FAQ and pricing page directly contradict each other on four facts.**
The conflict (pika.md): FAQ says 150 free credits/month, Pika 2.2 is latest, watermark-free requires Pro or Fancy, commercial use unavailable on Basic and Standard. The pricing page says 80 credits, Pika 2.5, watermark-free on all four plans, commercial use on all four plans. The brief follows the pricing page (internally consistent with the Terms of 2026-02-11 and the homepage) but does not declare the FAQ wrong. Its explicit instruction: "Do not source anything from Pika's FAQ without cross-checking the pricing page." The commercial-use half of this also appears in Section 5.
**Cheapest check:** the brief's own recommendation — email Pika support for a written answer on free-tier commercial use before the page ships.

**V7 — Plan-to-price mapping was read from rendered page text, not a labelled table.**
Flagged low confidence (pika.md): the pricing page renders each card as price-then-name, which is easy to misread. The researcher's reading is BASIC $0 (80 credits), STANDARD $8/mo yearly (700), PRO $28/mo yearly (2300), FANCY $76/mo yearly (6000). Self-consistent, but unverified visually. Monthly and weekly billing prices were never captured.
**Cheapest check:** open `https://pika.art/pricing` and eyeball which price sits with which plan name.

**V8 — Pikaframes on the free plan is contradicted within the pricing page itself.**
The conflict (pika.md): the BASIC plan card omits Pikaframes from its feature list, while the Pikaframes credit table on the same page marks 480p 5s at "12 credits Free."
**Cheapest check:** inside a free account, try to start a Pikaframes generation.

### `udio`

**V9 — Are downloads still disabled? MEDIUM confidence they are.**
Flagged explicitly (udio.md): strongest primary evidence is the ToS (12 Nov 2025), which prohibits downloading outright, and Udio's UMG help article (17 Feb 2026) stating downloads are disabled. No Udio-owned page dated between February and September 2026 either reverses or reaffirms this, and the official changelog has not been updated in 2026. The product UI is behind a login the researcher did not pass. "If downloads have quietly returned, the lead of this page changes."
**Cheapest check:** log into `udio.com`, generate or open a track, and look for a download control.

**V10 — Udio's help centre and its Terms of Service say opposite things about ownership and commercial use.**
The conflict (udio.md): the help centre's "Answers to common usage questions" (26 Mar 2025) says users own their output and may use it commercially, and a sibling article is still titled "What you can do with your songs (tl;dr: most anything you want)." The ToS says the opposite on both counts. The researcher wrote on the ToS as the binding and more recent instrument but could not determine which Udio intends to enforce, and called it "the highest-risk claim on the page."
**Cheapest check:** while logged in for V9, re-open `udio.com/terms` and confirm the "Last Revised" date is still 12 November 2025 — everything in the rights section flows from that one document.

### `gumloop`

**V11 — Does any free path survive that the pricing page does not advertise?**
Flagged with split confidence (gumloop.md): "Confidence that there is no advertised free plan: high. Confidence that no free path exists at all: moderate." The researcher did not create an account. Related and also unconfirmed: whether the 14-day trial requires a credit card.
**Cheapest check:** start the signup flow from the "Start trial" button and observe whether a $0 workspace is offered and whether a card is demanded before the trial begins.

**V12 — The free-plan removal date is secondary-sourced, and the packaging is volatile.**
Flagged (gumloop.md): only a third-party pricing tracker dates the removal of the permanent free plan to 2026-07-30. "Gumloop has changed packaging once recently and could change it again. Re-verify the pricing page before each publish cycle; this is the single most volatile fact in this brief." Also unresolved: whether the ~$37 entry price is a fixed tier or the bottom of a credit slider.
**Cheapest check:** `https://www.gumloop.com/pricing` — confirm no $0 plan is listed, and note whether the price is fixed or slider-driven. Do not store the 2026-07-30 date as fact.

### `slack-ai`

**V13 — Slack's marketing page contradicts Slack's help centre on plan gating.**
The conflict (slack-ai.md): `slack.com/features/ai` presents most AI capabilities as available "across paid plans" without tier distinctions; the help centre's feature table gates search answers, recaps, file summaries, translations, message explanations, canvas generation and Slackbot to Business+. The brief follows the help centre as more precise and more recently maintained, but flags it for re-check.
**Cheapest check:** open `https://slack.com/help/articles/25076892548883-Guide-to-AI-features-in-Slack` and compare its feature table against the marketing page.

**V14 — "No free tier" may be very slightly overstated.**
The wrinkle (slack-ai.md): the help centre describes Slackbot as available "in limited capacity" as a preview on Free and Pro plans. What that preview includes is not specified in any primary source found. The brief deliberately says Slack AI has no free tier "without claiming Free users see literally nothing." Row 21 in Section 2 still stands; this only affects how the row is described, not its `costTier`.
**Cheapest check:** open a free Slack workspace and see what Slackbot exposes.

### `microsoft-copilot`

**V15 — Copilot Vision's free availability appears to have flipped, and may flip back.**
The conflict (microsoft-copilot.md): Microsoft's current Vision page states a Microsoft 365 Personal, Family or Premium subscription is required; earlier public messaging described Vision as free in Edge for consumers. The brief follows the current page and names this "the most likely fact on the page to flip back." Related and unconfirmed: which Copilot-on-Windows features beyond Vision require a subscription.
**Cheapest check:** re-read Microsoft's Copilot Vision support page immediately before publish and note its date.

### `leonardo-ai`

**V16 — Video generation token cost is not confirmed numerically.**
Flagged as "the softest factual claim in the brief" (leonardo-ai.md): no primary page states what a video generation costs in tokens. The claim that a clip "can consume most of a free day's allowance" is an inference from the general statement that cost scales with compute, plus the confirmed fact that some Blueprints exceed a free user's daily allowance entirely.
**Cheapest check:** in a free Leonardo account, open the video generation panel and read the token cost the interface displays before submitting.

### `recraft`

**V17 — SVG export and custom styles on the free plan are both undocumented.**
Flagged unconfirmed (recraft.md): the export doc lists SVG among formats without qualifying by tier and the free-plan doc says free users get "image and vector generation tools", but nothing on recraft.ai confirms free users can download SVG. Custom-style availability on free is equally undocumented. Starter actions 1 and 2 depend on these.
**Cheapest check:** in a free Recraft account, generate one vector image and open the export dialog; then open the custom-styles panel.

### `flux`

**F1 — Do new Black Forest Labs accounts get any free credit balance?**
Flagged unconfirmed (flux.md): BFL's get-started docs describe adding credits via Stripe and recommend starting with $10–$20, but nowhere state whether a new account receives a free balance. Not visible on any page accessible without an account. Separately, `playground.bfl.ai` redirects through auth so the pre-login state could not be inspected — there may be an ungated demo at `playground.bfl.ai/lab/flux-2-klein`. **This caveat attaches to Section 2, row 3.** The `PAID` recommendation stands on BFL's documented pay-from-the-first-image model; it does not stand on a verified zero-balance signup.
**Cheapest check:** create a BFL account and read the credit balance on the dashboard before adding a card.

**F2 — Is FLUX.2 `[dev]`'s default licence actually non-commercial?**
Flagged as inference (flux.md): BFL's blog describes `[dev]` as open-weight with commercial licensing available via `bfl.ai/licensing`; the licensing page describes paid tiers rather than naming the default licence for `[dev]`. The inference is strongly supported by the tier structure but the exact `[dev]` licence text on Hugging Face was not read directly. See also Section 5.
**Cheapest check:** open the FLUX.2 `[dev]` model card on Hugging Face and read the licence file named there.

### `open-webui`

**V18 — Desktop app maturity and platform coverage are unknown.**
Flagged unconfirmed (open-webui.md): the docs index lists a desktop app as one of four install paths ("native app, no Docker required"), but the dedicated page URL returned 404. OS coverage, beta status, and whether it still needs a separate model source are all unknown. "This matters more than it looks: a solid desktop app would materially lower the technical floor the whole page is built around."
**Cheapest check:** find the desktop page under `https://docs.openwebui.com/` and read its OS list.

### `windsurf`

**V19 — Does free signup require a credit card?**
Flagged unconfirmed (windsurf.md): getting-started says you "can sign up for free" but does not say whether a card is collected. Note the *prior* brief claimed "no card needed"; the corrected brief deliberately does not. "It's a real decision factor for a beginner."
**Cheapest check:** start the signup flow at `https://devin.ai/download` and see whether payment details are requested.

**V20 — "Free models" and the free plan do not reconcile.**
The conflict (windsurf.md): the quota doc says "free models don't count against your quota at all," the models page lists no zero-cost model, and the pricing page says the free plan has "limited model availability." Three vendor surfaces, no coherent reading. The brief makes no claim about specific free models. Related: the free-plan quota size is unpublished — any number found elsewhere is a third-party estimate, and none should be entered.
**Cheapest check:** in a free Devin Desktop account, open the model picker and check which entries are marked free.

### `mistral-ai-le-chat`

**V21 — Free-tier connector access is stated but untested.**
Flagged (mistral-ai-le-chat.md): the pricing page lists "100+ connectors" under Free, which reads as included, but individual connectors may still be gated. Also unconfirmed on this row: there are **no published numeric free-tier limits** — "Limited messages and web searches" is all Mistral states. "If the data model wants a number, leave it null rather than importing one."
**Cheapest check:** on a free Vibe account, open the connectors panel and try to enable one.

### `synthesia`

**V22 — Free-plan watermark and free-plan custom avatars are both only partly confirmed.**
Flagged (synthesia.md): the pricing page presents watermark removal as a paid feature, which *implies* a logo on free output, but no first-party page states the watermark policy in those words — "confidence high, primary confirmation partial." Custom avatars on the free plan are not confirmed at all; the feature page does not state tier availability and the pricing page lists only stock avatars for Basic.
**Cheapest check:** render one 10-second video on a free Basic account and look at the output.

### `claude-code`

**V23 — The auto-mode default and the Pro prompt counts are the fastest-staling facts on this row.**
Flagged (claude-code.md): docs state that on Pro, Max and Team the built-in starting mode is currently `auto`, but also that this depends on client version, feature flags, first-session behaviour and org settings, and that Anthropic can turn it off server-side. "This is the fact most likely to be stale first, and it materially changes the safety story." Separately, the Pro prompt-count figures ("approximately 10-40 prompts every five hours") reference Sonnet 4 and Opus 4 by name, suggesting they predate the current lineup, and the claim that Opus remains unavailable to Claude Code on Pro rests on that same possibly-dated article.
**Cheapest check:** start a fresh Claude Code session on a Pro account and observe the starting permission mode. Neither of these affects any Section 2 row — they are copy freshness only.

---

## 4. Identity changes

Products renamed, acquired or merged. These move `name`, `company` and `website` together.

### Catalog is pointing at a product that no longer exists under that name

**`windsurf` → Devin Desktop (Cognition).** Not cosmetic. Per windsurf.md, which explicitly re-verified both headline facts against vendor pages (`cognition.com/blog/windsurf`, `devin.ai/blog/windsurf-is-now-devin-desktop`, changelog v3.0.12) rather than inheriting them from the prior pass:
- `name` → **`Devin Desktop (formerly Windsurf)`** so either search term resolves. If the row still says **Codeium**, it is two rebrands stale: Codeium → Windsurf → Devin Desktop.
- `company` → **`Cognition`**. Not "Windsurf", not "Codeium", not "Exafunction" (the original corporate entity). Cognition's 2025-07-14 announcement states it acquired "Windsurf's IP, including their trademark and the strong brand they have built."
- `website` → **`https://devin.ai/desktop`**. `windsurf.com` is retired and returns a 302. If a separate download field exists, `https://devin.ai/download`. Docs moved to `docs.devin.ai`; `docs.windsurf.com` still redirects but should not be the stored value.
- **Keep the slug `windsurf`** — inbound links and search behaviour both favour it.
- Liveness: **ALIVE (rebranded)** — shipping as recently as 2026-08-21, downloadable on all three desktop platforms, free signups open. Accurate description: acquired and rebranded, product continuous.
- Caution from the same brief: the JetBrains plugin on the download page is *still labelled "Windsurf JetBrains"*. The rename is not uniformly applied across the vendor's own surfaces — do not treat a stray "Windsurf" string as evidence the rename did not happen.
- **Also a correction to prior research, worth carrying:** the prior brief claimed the product "imports settings and most extensions from VS Code or Cursor." The vendor docs state plainly: "You cannot install extensions through any marketplace on Devin Desktop." Only settings and keybindings import is supported. If any catalog blurb inherited the extensions claim, it needs fixing.

**`mistral-ai-le-chat` → Mistral Vibe.** Per mistral-ai-le-chat.md: Mistral renamed Le Chat to **Vibe** on 2026-05-28 and merged it with its coding agent into one product with three modes (Work, Code, Chat). Accounts, plans and conversations carried over; URL and login unchanged.
- `name` → **`Mistral Vibe (formerly Le Chat)`**. Keep "Le Chat" in the name or as an alias for at least a year — it is still the dominant search term and nearly all third-party coverage uses it.
- `website` → `https://chat.mistral.ai` is correct and current. If the row points at `https://mistral.ai/products/le-chat`, that path resolves but now serves Vibe content; update to `https://mistral.ai/products/vibe`, or better for beginners, point straight at `chat.mistral.ai`.
- **Keep the slug `mistral-ai-le-chat`** — redirect, do not break it.
- The brief argues this is **more than cosmetic**: "the centre of gravity moved from 'chatbot' to 'work agent,' so PIVOTED is defensible alongside RENAMED."

**Copilot Pro — discontinued.** Per microsoft-copilot.md: the $20/mo consumer Copilot Pro tier is no longer purchasable and support ended 2026-08-01. If a Copilot Pro row exists, mark it DISCONTINUED or MERGED into Microsoft 365 Premium. The same brief warns that **"Microsoft 365 Copilot"** (paid work add-on) and **"GitHub Copilot"** (paid dev tool) are distinct products from the consumer `microsoft-copilot` row and must not be merged into it.

### Cosmetic or metadata-only — the product a user reaches is unchanged

**`leonardo-ai` — acquired by Canva, announced 2024-07-29.** Per leonardo-ai.md, the product was **not** folded in or shut down. Canva's own announcement states Leonardo "will continue to operate independently," and that remains true today: leonardo.ai and app.leonardo.ai run as a standalone platform with their own pricing, plans, help centre and model releases. **The brief's explicit instruction: "Do not mark this MERGED. The correct status is ALIVE with an ownership note."** Canva ownership belongs in a `company`/ownership field; it changes nothing about the beginner's experience.

**`pika` — operating company is Mellis, Inc.** (Palo Alto, California), per pika.md. Not a rename; "Pika Labs" is simply the informal name used in the blog and press. Also worth recording: `pika.me` (Pika MCP and the "AI Selves" product) and `dev.pika.art` (API Club) are named alongside `pika.art` in the Terms and Privacy Policy, and `pika.art/blog` 302-redirects to `experiment.pika.art/blog`.

**`slack-ai` — parent company Salesforce**, per slack-ai.md. Metadata only. The structural change on this row is commercial, not nominal: Slack AI ceased to be a purchasable add-on and was folded into plan tiers (see Section 2, row 23).

**`google-veo-3-1` — version-number removal is ours, not Google's.** Per google-veo-3-1.md, the recommended rename `Google Veo 3.1` → `Google Veo` is catalog freshness hygiene, not a vendor rebrand. The genuine identity movement on this row is a **successor**, not a rename: Google shipped Gemini Omni on 2026-05-19 and states on its own product page that "Gemini Omni will replace Veo in the Gemini app." The API docs now recommend Gemini Omni Flash as the default video model and position Veo for specific capabilities and "legacy pipelines." The brief's call is **ALIVE with an active successor** — Veo 3.1 Lite/Fast/Quality are all still selectable in Flow and listed as Preview, not deprecated. *But note uncertainty 4 in the same brief: the US product page says Omni replaces Veo while a UK/regional variant still reads "powered by Veo 3.1" — the rollout appears staged by geography.* Do not record the replacement as globally complete.

---

## 5. Rights and licensing findings

These carry user-facing risk beyond metadata tidiness. Stated plainly as "what a user could get wrong."

### `udio` — the most severe, and the least settled

Per udio.md, drawn from the Terms of Service dated 12 Nov 2025 and a Udio help article dated 17 Feb 2026: **downloads are disabled, output is not user-owned, and commercial use is not permitted.** The brief states: "If the catalog carries any field asserting downloads, ownership, or commercial use, it must be corrected — all three have reversed." Context: Udio settled Universal Music Group's copyright lawsuit (announced 2025-10-29) and is building a licensed service with UMG.

**What a user could get wrong:** arrive expecting to generate a track, download it, and use it in a video — and be unable to do any of the three. This is not a nuance; it inverts the product's basic promise.

**But this is flagged MEDIUM confidence and must not be written as settled.** Udio's own help centre still says users own their output and may use it commercially (see Section 3, V9 and V10). The researcher could not determine which Udio enforces and did not log in. The brief's own recommendation — **a card-level warning flag** ("no downloads", "non-commercial only", "output not user-owned") rather than body copy — is the right shape once verified, because "this platform's constraints are unusual enough that a card-level warning is warranted."

A related internal contradiction, noted for completeness: ToS §6.4 requires free users to credit Udio when making "public use" of output, while §1.2 and §6.3 prohibit public distribution entirely. The researcher notes these "cannot both be operative as written."

### `flux` — output commercial rights are genuinely contested, and BFL has not answered

Per flux.md: there are open, unresolved discussion threads on Hugging Face (on both FLUX.1-dev and FLUX.1-Kontext-dev) noting that **licence v1.1 removed an explicit "commercial outputs" line**, asking BFL for clarification, and receiving none. The brief deliberately frames this as "commercial use requires a paid licence" *for the model*, and makes **no claim** about whether outputs alone are separable from that restriction. Its instruction: "This is the highest-risk ambiguity on the page and should not be tightened into a confident statement without a primary clarification."

Separately (F2 in Section 3): the inference that FLUX.2 `[dev]`'s default licence is non-commercial is strongly supported by the tier structure but the `[dev]` licence text was not read directly.

**What a user could get wrong:** download open weights, assume open weights means free commercial use, and ship client work on a licence that may not permit it. The catalog must not let "open weights" read as "free to use commercially."

### `recraft` — free output is non-commercial and not the user's

Per recraft.md: the free plan produces **public, non-commercial output**. The brief's own framing of the consequence: the tutorial "is genuinely followable without paying — but the output cannot be used for anything real."

**What a user could get wrong:** make a logo on the free plan and put it on a business. Two adjacent facts are undocumented and should not be assumed: whether free users can export SVG at all, and whether free output is watermarked (recraft.md makes no claim either way on watermarking). See Section 3, V17. This also drives the `accessTier` judgement call in Section 6, Q3.

### `pika` — commercial use on the free plan is contradicted by Pika's own two pages

Per pika.md: the pricing page says commercial use is permitted on all four plans; the FAQ says commercial use is unavailable on Basic and Standard. The brief follows the pricing page but **names the conflict explicitly rather than picking a side silently**, and recommends emailing Pika support for a written answer before the page ships.

**What a user could get wrong:** monetise a free-plan clip on the strength of the pricing page while the FAQ says they may not. Also unverified: default visibility of a new generation — the brief's guidance is "treat every generation as potentially visible," which is safe under either default.

### `open-webui` — "open source" is defensible but not literally accurate

Per open-webui.md: the licence is **BSD-3-Clause with one added condition (Clause 4, branding retention)**, so it is not stock BSD-3 and arguably not OSI-conformant — "a purist would call it *source-available*." The added condition binds only deployments exceeding **50 end users in a rolling 30-day window**, which excludes every user this site is written for, and all pre-v0.6.6 code remains plain BSD-3.

The brief's recommendation: **keep the `open-source` tag** ("removing the tag would mislead beginners more than keeping it does"), and if the catalog supports a licence field, record it as **"Open WebUI License (modified BSD-3-Clause)"** rather than "BSD-3-Clause". Note the licence has already changed once (at v0.6.6); the brief advises re-reading the LICENSE file at each review rather than trusting the brief.

### `leonardo-ai` — free-tier output is public and used for training

Per leonardo-ai.md: free generations are **public and remixable**, and free-tier generated content is used for training per the privacy policy. What the policy does **not** state cleanly is whether an *uploaded reference image* itself becomes publicly visible on the free plan, or is used only privately as an input — the researcher flagged this gap and wrote the security guidance to advise caution rather than assert a mechanism.

**What a user could get wrong:** upload a private reference photo, or generate something client-confidential, on a free account.

### `synthesia` — provenance markers exist, removing them is prohibited

Per synthesia.md: the Acceptable Use Policy prohibits removing "watermarks designed to differentiate between human-generated and AI-generated content," which implies such markers exist — but **no first-party page confirms C2PA adoption or describes the technical signal**, and the brief makes no claim about the underlying technology. Free-plan watermarking is implied by the pricing page but not stated in first-party words (Section 3, V22).

Separately flagged as "the weakest-sourced area of the brief": whether customer scripts train Synthesia's models. The privacy policy distinguishes Customer Data (customer-controlled) from usage information used "to improve our Platform and underlying technologies," and does not say plainly whether free-account script text is excluded.

### `google-veo-3-1` — commercial rights are unanswered; watermarking is partly documented

Per google-veo-3-1.md: multiple community threads ask whether Veo output can be used commercially and **receive no clear official answer** in what the researcher could reach. "The brief deliberately makes no claim about commercial rights. If LaunchpadHQ wants to answer that, it needs a separate read of the Google One / Gemini terms, not the product pages." SynthID coverage on the free tier is an inference from "all outputs" language, not an explicit free-tier statement. Flow documents a user-controlled visible-watermark toggle plus mandatory visible watermarks in three countries, but community posts describe visible watermarks appearing for paying Ultra users, suggesting the toggle may not behave as documented.

### Training-on-your-data defaults — a smaller but consistent pattern

Not output rights, but the same family of user-facing risk. Four briefs surfaced a training default that a beginner would not expect:

- `windsurf` (windsurf.md): the security doc says the training opt-out is available "if you're on a paid plan"; it does not explicitly state free users cannot opt out. The brief takes the conservative reading — "on free, assume your code contributes" — which matters for readers handling client code.
- `gumloop` (gumloop.md): the privacy policy phrases the no-AI-training commitment as applying "for premium users," implying non-paying users may have been treated differently. With the free plan gone this may be moot; unconfirmed.
- `mistral-ai-le-chat` (mistral-ai-le-chat.md): the source distinguishes Vibe (**not** opted out of training by default) from Vibe Enterprise (opted out by default), and is silent on Pro and Team.
- `groq` (groq.md): no statement either way — see Section 3, V5.
- `claude-code` (claude-code.md): notes the consumer-plan training default as "a real caveat," while leaving `privacyLevel: HIGH` as-is.

---

## 6. Open questions for the owner

Judgement calls, not defects.

**Q1 — Does the catalog need a lifecycle/status field? The evidence in this batch says yes.** Six of fifteen rows carry state the current schema cannot express, and each is a *different* state:
- `windsurf` — RENAMED + acquired, product continuous (windsurf.md)
- `mistral-ai-le-chat` — RENAMED, and "PIVOTED is defensible alongside RENAMED" (mistral-ai-le-chat.md)
- `google-veo-3-1` — ALIVE with an active successor; the brief asks for a MERGED or SUPERSEDED-BY pointer at Gemini Omni and suggests revisiting in ~2 quarters (google-veo-3-1.md)
- Copilot Pro — DISCONTINUED, if that row exists (microsoft-copilot.md)
- `leonardo-ai` — acquired but explicitly **not** merged; needs "ALIVE with an ownership note" (leonardo-ai.md)
- `gumloop` — "PIVOTED (partial)", positioning moved from "workflow automation for anyone" to enterprise "multiplayer AI agent builder" (gumloop.md)

Four separate briefs independently reached for vocabulary the schema does not have. Note the counter-pressure: leonardo-ai.md warns that a blunt MERGED flag would be actively *wrong* for an acquisition where the product stayed independent. Any status enum needs to distinguish ownership change from product death.

**Q2 — Should `flux` be listed as a product at all, or marked as a model?** flux.md calls this "the most important correction" on that row: FLUX has no consumer application. Black Forest Labs ships a developer dashboard with a login-gated playground requiring prepaid credits, a paid API, and downloadable open weights. "A beginner cannot 'sign up for FLUX' in the way the catalog's other image entries imply." The brief recommends either an explicit "model, not an app" marker, or card copy that names the realistic access route (a third-party front-end) up front — "without that, this page will generate confused clickthroughs to a developer dashboard." A related but distinct case: open-webui.md insists that row "must not be described as an AI, an assistant, or a model. 'Interface' or 'front end' only — loose phrasing here is the source of the most common user confusion about this tool." Both point at the same gap: the catalog assumes every row is a signup-able app.

**Q3 — What does `accessTier: FREE` mean — followable for free, or usable for free?** recraft.md raises this directly and flags it as a judgement call for you: "Every starter action can be completed on a free account, so the tutorial is genuinely followable without paying — but the output cannot be used for anything real. If the site's convention is that FREE means 'usable output without payment', this should be re-tiered to PREMIUM." The same test would catch `flux` (Q2) and arguably `udio` (Section 5). Worth settling once, as a convention, rather than per row.

**Q4 — Should there be an alias / "not to be confused with" field?** Three briefs asked for one independently. groq.md: "the Groq/Grok collision is the single most likely reason a user lands on this page by mistake... If [the schema] does not [support an alias field], this is a strong argument for adding one." synthesia.md: distinguish from `synthesiagame.com` (piano-learning) and `syntheia.io` (different company, one letter apart). microsoft-copilot.md: the consumer row must stay distinct from Microsoft 365 Copilot and GitHub Copilot. Retired names would populate the same field: Le Chat, Windsurf, Codeium, Cascade, Enterprise Grid.

**Q5 — Can `changelogUrl` be null?** Five briefs report that no suitable changelog exists and were forced to compromise: microsoft-copilot.md recommends shipping **no** changelogUrl ("if the pipeline requires a non-null value, the least-bad option is the Microsoft Copilot Blog release-notes feed, with a note that it is stale"); slack-ai.md — `slack.com/release-notes` covers the desktop app generally, not AI features, "if the tutorial template expects a feature-scoped changelog, there isn't one"; recraft.md — the announcements page "is a blog category page, not a versioned release-notes page"; google-veo-3-1.md — "changelogUrl is a compromise... If the site's changelog field expects a product-specific feed, this row may be better with `none`"; mistral-ai-le-chat.md — "Best available official option, not an ideal one." If the field is required, the pipeline is manufacturing bad data on a third of these rows.

**Q6 — Secondary categories.** Several briefs proposed one and could not act without knowing whether the schema supports it: `flux` → `local-open-source-ai` secondary ("a genuine differentiator and a real reason someone picks FLUX"), with `video-creation-editing` "arguably defensible but premature" (flux.md); `leonardo-ai` → `gaming-creative-ai` (leonardo-ai.md); `synthesia` → `voice-speech` (synthesia.md); `pika` → a music/audio category, though "new enough that a beginner-facing page should not lead with them" (pika.md); `gumloop` → primary `workflow-automation`, secondary `document-pdf-processing` (gumloop.md); `open-webui` → primary `local-open-source-ai`, secondary `text-conversational-ai` "but it is not a model and should not sit alongside ChatGPT or Claude as if it were one" (open-webui.md); `mistral-ai-le-chat` → `international-regional-ai` secondary plus a cross-link to `local-open-source-ai`, with the warning "Do not file the hosted assistant itself as open-source — the assistant is proprietary and hosted; only the models are open" (mistral-ai-le-chat.md).

**Q7 — `gumloop`'s positioning has moved upmarket; should the beginner framing follow?** gumloop.md: the visual workflow canvas still exists and is fully documented, but it is no longer the headline. Combined with the removal of the free plan, "the product is moving upmarket. Our beginner framing is still accurate about what the tool does, but the category placement and any 'great for solo beginners' language should be softened." A $37/mo floor is a real barrier for this site's audience.

**Q8 — What does `hasMobileApp` mean?** claude-code.md: "`hasMobileApp: false` is arguably wrong now. Claude Code sessions run in the Claude iOS and Android apps, and cloud sessions can be started and monitored from a phone. If the field means 'a dedicated standalone mobile app', false is defensible; if it means 'usable on mobile', it should be true." A definition question, not a data error — but it will recur across the other 155 rows.

**Q9 — Should model names be stored as catalog facts at all?** Two briefs say no, independently. groq.md: "Model names in any catalog metadata should be treated as volatile. Avoid storing specific model names as durable catalog facts." leonardo-ai.md: "The brief deliberately names almost no models in the shipped copy — it teaches the concept of model switching instead. This is intentional and should be preserved in edits." Counter-case from flux.md: where a model name *is* stored, it must be generation-qualified — "'FLUX' alone is now ambiguous across FLUX.1, FLUX.2 and FLUX 3, and FLUX 3 is a multimodal image/video/audio model rather than the image line's successor."

**Q10 — Duplicate and adjacency decisions confirmed, recorded so they are not re-litigated.** synthesia.md: Synthesia and HeyGen "should remain listed. They are direct competitors, not duplicates" — though the brief notes the differentiating positioning (corporate/training vs creator/social) is editorial judgement, not a sourced head-to-head claim. slack-ai.md: keep Slack AI distinct from Salesforce's agent products.

---

## Appendix — brief coverage

All 15 briefs were read in full for Parts 3 and 4. Part 1 was not consulted.

`claude-code.md` · `flux.md` · `google-veo-3-1.md` · `groq.md` · `gumloop.md` · `leonardo-ai.md` · `microsoft-copilot.md` · `mistral-ai-le-chat.md` · `open-webui.md` · `pika.md` · `recraft.md` · `slack-ai.md` · `synthesia.md` · `udio.md` · `windsurf.md`

All briefs are dated or researched 2026-09-07 and marked LOCKED. Prices, credit allowances, rate limits and model names throughout are hedged by their researchers as current-as-of-that-date and should not be written into structured fields without a re-check.
