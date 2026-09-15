# Catalog corrections — 2026-09-15 nightly batch

Reported only. **Never applied to the database** — there are no Neon writes in the nightly job.
Source: per-platform research briefs in `tmp/tutorial-pipeline/briefs/`, each with dated vendor URLs.

## Obtainability / exclusions.json candidates

- **beatoven-ai — NO OBTAINABLE PATH. Page NOT written.** The app host `sync.beatoven.ai`
  is NXDOMAIN on both 1.1.1.1 and 8.8.8.8 (authoritative SOA, serial approx 2026-08-09).
  Every sign-up / subscribe / API CTA on the marketing site points there. `/pricing` and
  `/blog` return 404 and are gone from `sitemap.xml`; the live homepage has no sign-up
  control at all. Marketing site is still up and the vendor has posted no notice.
  **Recommend adding to `exclusions.json`** and fixing/hiding the catalog row.
- **gong — sales-led, no self-serve.** gong.io publishes no price, no trial and no
  self-serve signup; the pricing page is a "customized proposal" form. Page WAS written
  (an employer buying it is a real path) and says plainly a reader cannot sign up tonight.
  Exclusions candidate for Zach's judgement.
- **outreach — sales-led, no self-serve.** No signup, no free tier or trial, no published
  price; signed Order plus 12-month auto-renew. Page WAS written on the same reasoning.
  Exclusions candidate for Zach's judgement.

## Name / URL corrections

- **outreach** — `outreach.io` now redirects to `outreach.ai` (April 2026 rebrand). The
  support site deliberately stayed on outreach.io. Catalog URL needs updating.
- **scispace** — catalog URL is stale: `typeset.io` 301s to `scispace.com`.
- **research-rabbit** — name/company wrong. Litmaps acquired ResearchRabbit 2025-05-08;
  site footer now reads "© 2026 Litmap Ltd". A paid RR+ tier launched with the Oct 2025
  relaunch; the free tier survives (vendor-restated "$0, Forever", 50-seed cap).
- **google-lyria-3** — catalog name is a version behind: Lyria 3.5 shipped 2026-09-04.
  Row URL target also needs checking.
- **consensus** — URL confirmation needed; an unrelated `goconsensus.com` shares the name.
- **semantic-scholar** — nit: bare-host URL vs www.

## Pricing / tier corrections

- **consensus** — vendor's own `consensus.app/home/pricing/` still advertises
  "Premium $8.99/mo" while the help-centre subscription table and docs (both checked
  2026-09-15) say Free / Pro $20 / Deep $65. Page states both; catalog row likely stale.
- **glasp** — `costTier` FREE should be FREEMIUM (Pro $15/mo, Unlimited $36/mo; free tier
  is capped). Also `hasMobileApp` false should be true (iOS/iPad/Android, rebuilt 2026).
- **julius-ai** — pricing model changed from messages to credits (free = currently 25/day,
  resets daily). The old `/docs/account/message-limits` now 404s.
- **soundraw** — `accessTier` is PREMIUM, not FREE: generation is free, downloading is not.

## privacyLevel review requests

- **tactiq** — HIGH looks too harsh. No bot joins the call; the extension transcribes
  in-browser; in-chat disclosure is undisableable on Free; Azure OpenAI with training and
  logging off. Suggest MEDIUM. Caveats: the macOS beta app does capture audio, and the
  Terms still date from June 2019.
- **trinka-ai** — HIGH review requested for the opposite reason: free-tier text IS used for
  AI training per the ToS, while paid tiers are not. HIGH may be right; worth confirming
  the axis.
- **scite** — HIGH may be miscalibrated; Scite's policy (eff. 2026-03-26) and its terms
  both forbid training on customer data.
- **research-rabbit** — HIGH is unverified. The privacy policy is a JS-only Termly embed
  that could not be read.
- **glasp** — **LOW is CORRECT; do not change it.** The scale measures privacy
  *protection* (`recommendations-core.ts:125-126` gives +8 for HIGH when a user asks for
  privacy), so LOW already means least-protective. Flagging because a reviewer reading the
  brief's "default-public highlights" finding could easily invert this.

## Category -> archetype mapping defect (recurring)

The mapping assigned `prompts` to 5 of tonight's 20 rows that have **no prompt surface at
all**: `connected-papers`, `litmaps`, `research-rabbit`, `scholarcy`, `soundraw`. All five
were written as `pick-and-setup` instead (renderer heading "First things to try"). This is
the third batch to hit this. Category tells you the product's domain; it does not tell you
whether the product has a text box. Worth fixing in the mapping rather than per batch.

## Other

- **semantic-scholar** — `difficultyLevel` INTERMEDIATE is arguably BEGINNER.
- **mubert** — catalog's mobile app links point at Mubert Play, not Mubert Render (the
  product this page covers, which is browser-only).
