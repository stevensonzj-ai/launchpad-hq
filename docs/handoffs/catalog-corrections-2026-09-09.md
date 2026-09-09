# Catalog corrections — 2026-09-09 batch

**Nothing here has been applied to the database.** There are no Neon writes in the nightly
job, ever. This is a findings document for a separate, human-gated pass.

Source for every line below is the platform's research brief at
`tmp/tutorial-pipeline/briefs/<slug>.md` (gitignored, on the owner's machine), which carries
the URL, the fact and the date accessed.

**19 platforms researched. 17 need at least one catalog edit.** Seven are identity changes —
a rename, a re-brand, or a row naming something the vendor does not sell under that name.
That rate is consistent with the 2026-09-07 and 2026-09-08 findings and is no longer
surprising; it is the steady state of a 170-row catalog nobody has re-verified.

---

## A. Identity — the row names something that has changed or never existed

| slug | finding | suggested |
|---|---|---|
| `unriddle` | **Renamed to Anara.** `unriddle.ai` 302-redirects to `anara.com`. | name → `Anara`; website → `https://anara.com`; category arguably `research-academic-tools` |
| `upstage-solar` | **Row conflates two products.** Solar is Upstage's LLM family; the document product is Document Parse / OCR / Information Extract. Category `document-pdf-processing` is **correct**; the name is not. | name → `Upstage Document Parse`, or split into two rows |
| `wondershare-pdfelement-ai` | **No product called "PDFelement AI" exists.** Wondershare sells *Wondershare PDFelement* (V13 current); the AI assistant inside it is branded **Lumi**. | name → `Wondershare PDFelement` |
| `hubspot-ai` | "HubSpot AI" is not current branding. Product page now headed **Agent Hub**; the assistant is **Breeze**. | name → `HubSpot Breeze` |
| `wordpress-ai-jetpack-ai` | "WordPress AI" is not an Automattic product name, and now collides with the WordPress project's own `AI` plugin and core AI Client. | name → `Jetpack AI` |
| `mailchimp-ai` | "Mailchimp AI" is not a name Mailchimp uses. | rename; also `categorySlug` → `sales-marketing-seo-ai` |
| `zoom-ai-companion` | Zoom began **removing the "AI Companion" name** from Zoom Workplace in June 2026 (Zoom blog 2026-06-24). Capability is alive; the label is going. | update display name; a separate **ZoomMate** row may be warranted |
| `v0` | `v0.dev` 302-redirects to `v0.app` (Vercel rename announced 2025-08-11). | website → `https://v0.app` |
| `shopify-magic-sidekick` | `shopify.com/magic` now serves a Sidekick page that never says "Magic". | website → `https://shopify.com/sidekick` |

## B. `costTier` — four wrong, including the flagged one

| slug | catalog | correct | evidence |
|---|---|---|---|
| `salesforce-einstein` | ENTERPRISE | **FREEMIUM** | Free Suite is $0 for 2 users with record-summary and AI-draft included; a non-expiring free Developer Edition now includes Agentforce; 30-day self-serve trial; paid entry $25/user/mo. **This resolves the queue's `SUSPECT_COST_TIER` flag.** The flag was pointing at something real but narrower — the *Einstein-branded predictive* features (Sales Cloud Einstein scoring/forecasting) genuinely are Performance/Unlimited-only or a paid add-on. |
| `docsumo` | FREE | **ENTERPRISE** | The "Free" plan is a 14-day / ~1,000-page trial. Both ongoing tiers say "Talk to us" with no published price. |
| `reducto` | FREE | **FREEMIUM** | No perpetual free tier — a one-time $150 in free usage (~15,000 pages at the published $10/1,000-page rate), then usage rates. Growth/Enterprise are contact-sales. |
| `squarespace-ai` | FREEMIUM | **PAID** | Squarespace has no free plan. Its own FAQ: paid subscriptions from ~$19/mo annual, 14-day trial only, and trial content is "marked for permanent deletion" if not upgraded. |
| `shopify-magic-sidekick` | FREEMIUM | *misleading* | The AI itself costs nothing, but requires a paid Shopify plan after a 3-day trial; the store is paused otherwise. Not strictly wrong, but it reads as "free to use" and is not. |

## C. `privacyLevel` — four look wrong in the same direction

This matters beyond cosmetics: `src/lib/recommendations-core.ts:125` awards **+8** to HIGH for
privacy-motivated users, so a HIGH rating on a platform that trains on customer content by
default actively recommends the wrong tool to the reader who most cares.

| slug | catalog | suggested | evidence |
|---|---|---|---|
| `figma-ai` | HIGH | MEDIUM | Trains on customer content by default on Starter and Professional; the opt-out is admin-only; content routed to a long published sub-processor list. |
| `wix-ai` | HIGH | MEDIUM | Wix's own generative-AI policy states it trains on user-generated content including page layouts and images, routes to ~14 third-party providers, and warns users not to enter personal information into Stability. |
| `duolingo-max` | HIGH | MEDIUM | Policy rev. 2026-05-26 permits recording and storing call audio to train Duolingo's own models, shares text and audio with OpenAI and Google, profiles public by default, session replay in use. |
| `upstage-solar` | HIGH | *not supportable* | ToS Article 22(6) permits AI training on free-service data. |
| `chatpdf` | MEDIUM | **review** | Privacy policy is dated 2023-01-05 and **never mentions uploaded documents** — no retention period, no training position, Stripe named as the only third party while the FAQ names GPT-4o/GPT-4o-mini. The silence is the finding. |

## D. Other fields

- `hubspot-ai` — `hasMobileApp` is `false`, should be `true`.
- `nanonets` — `difficultyLevel` `BEGINNER` → **INTERMEDIATE**. The product assumes a back
  office, an ERP or accounting destination, and a named human reviewer.
- `chatpdf` — no public pricing page; `/pricing` 404s. Prices in the brief are sourced from
  ChatPDF GmbH's App Store listing.

---

## E. `exclusions.json` — one key does not match any real slug

`exclusions.json` carries `"adobe-sensei-firefly-cc"`. **The actual catalog slug is
`adobe-sensei-firefly-in-cc`** (with `in`). The key never matches, so the exclusion has never
taken effect and the row keeps surfacing in `queue-status --next`. Its own note anticipated
exactly this: *"Verify slug before relying on this key."*

`adobe-firefly-getting-started.ts` already exists, so the exclusion's reasoning holds — this
is a near-duplicate row. **This run skipped the row rather than writing a duplicate page**,
and it will keep appearing at the top of the queue until the key is corrected by hand.

The pipeline never writes this file, so the fix is a one-line manual edit:
`"adobe-sensei-firefly-cc"` → `"adobe-sensei-firefly-in-cc"`.

## F. `exclusions.json` candidates from this batch

**None.** Every one of the 19 has a real path a reader can take today. The two closest calls:

- **`docsumo`** — ongoing pricing is quote-only, but a self-serve 14-day trial signup is live
  at `app.docsumo.com/signup`, so it clears the obtainability rule. The page says plainly that
  continuing past the trial means a sales conversation.
- **`salesforce-einstein`** — reads enterprise-only and is catalogued as such, but has at
  least three genuinely free doors (Free Suite, Developer Edition, trial). Not a candidate.

## G. Carried forward unverified — not resolved by this run

- **`khan-academy-khanmigo`** — three Khan Academy surfaces disagree on which countries have
  free teacher access. The page tells the reader to check the linked list rather than assuming.
- **`khan-academy-khanmigo`** — the "no model training on student data" statement is scoped to
  **district partnerships only**; no equally explicit statement covers individual paid learner
  and parent accounts. The page carries this as the limit it is.
- **`hubspot-ai`** — four HubSpot sources contradict each other on whether the Breeze assistant
  is available on the free tier at all.
- **`docsumo`** — the privacy policy's document-retention-for-AI-training clause contradicts
  Docsumo's own SOC 2 blog post. Hedged on the page; not resolved.
- **`nanonets`** — the published subprocessor list is dated 2020-12-02 and names no model
  providers, while the privacy policy says data may be sent to third-party model providers.
- **`reducto`** — a four-way documentary conflict on retention (API 24-hour expiry vs a Studio
  exception, no-training scoped to Growth-and-above, a contrary use/analyze/modify licence in
  the terms, FAQ 12h vs policy 24h). Stated on the page unresolved.
- **`squarespace-ai`** — AI Visibility appears limited to English-language markets. This was in
  the brief but did not reach the page; worth adding on the next pass.

Every one of these is stated on its page hedged, per writing-standard § 8d. None was silently
resolved.
