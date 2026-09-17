# Catalog corrections — 2026-09-17 nightly batch

Reported only. **Never applied to the database — there are no Neon writes in this job, ever.**
Source: the 18 research briefs in `tmp/tutorial-pipeline/briefs/` written this run, plus the
reused `beatoven-ai` brief of 2026-09-15.

---

## Blocking decisions (these need Zach, nothing downstream can settle them)

### 1. `jasper` vs `jasper-ai` — duplicate rows, unresolved
Production probably still holds both. `scripts/dedupe-jasper-platforms.ts` exists on branch
`feature/jasper-dedup`, was committed but **never run**, and prefers `jasper-ai` as canonical.
`src/data/workflows/workflows.ts:500` also references `slug: "jasper-ai"`. But the platform
export this pipeline derives from (`tmp/platforms-export-2026-09-07.json:2350`) uses `jasper`.

This page ships as `platformSlug: "jasper"`, matching the export. **If the dedup later keeps
`jasper-ai`, this tutorial attaches to a deleted row and 404s.** Decide the surviving slug
before merging, and rename the file and `platformSlug` together if it is `jasper-ai`.

### 2. `beatoven-ai` — a page shipped for an unobtainable product, inconsistently
Beatoven's marketing site is up (`www.beatoven.ai` returns 200) but the app hostname
`sync.beatoven.ai` does not resolve — verified again from the cloud container on 2026-09-17,
two days after the brief first found it. The page ships and is honest about it: its opening
line is "there is no working way in", it tells the reader to check `beatoven.ai` for a sign-up
button before assuming the product is gone, and it routes them to working music generators.

**But `play-ht` met the same condition and got no page at all.** One of those two calls is
wrong and it is a policy question, not a research one: does an unobtainable product get an
honest "this is dark right now" page, or no page? The page was left in place because it is
truthful and reversible; removing it unattended was the larger action. Settle the rule and
this row follows it.

---

## exclusions.json candidates

| Slug | Finding |
|---|---|
| `relay-app` | **Shut down.** The vendor's own homepage and docs are titled "Relay.app is shutting down": signups off 2026-07-16, free access ended 2026-08-15, paid access ended 2026-09-14 — three days before this run. Workspaces and stored credentials auto-deleted. TechCrunch 2026-08-17 reports an acqui-hire; founder Jacob Bank is now VP Product for Chrome at Google. **Note: this row is NOT in `src/data` (grep clean), so it lives in the Neon DB — adding it to exclusions.json will stop a tutorial being written but will NOT remove the row from the site.** |
| `play-ht` | **Unobtainable.** Marketing site loads with no sunset notice, but `app.play.ht` (the studio) and `docs.play.ai` serve expired TLS certificates, `api.play.ht` does not resolve, and `play.ai` / `www.play.ai` fail DNS. Terms last updated 2023-06-01. Meta acqui-hired the Play AI team in July 2025 (TechCrunch 2025-07-13, Bloomberg 2025-07-11). The widely-repeated 2025-12-31 shutdown date is unsourced affiliate rumour and is recorded as unverified. Row should be hidden or marked discontinued, not just URL-patched. |
| `beatoven-ai` | See blocking decision 2 above. |

**Not exclusions candidates**, though they were checked as such: `tray-ai` (human-gated trial
form is a real path), `workato` (self-serve free account exists), `lindy-ai`, `relevance-ai`,
`jasper` — all obtainable.

---

## accessTier corrections

Nine rows are wrong. Every one of these is a trial or a preview being carried in the catalog
as a free tier, which is the failure mode that matters most to a beginner deciding what to try.

| Slug | Catalog | Correct | Why |
|---|---|---|---|
| `surfer-seo` | FREE | **PREMIUM** | No free plan. Card-required 7-day Pro trial only. |
| `jasper` | FREE | **PREMIUM** | Pro around $69/mo; 7-day card-required trial. |
| `writesonic-chatsonic` | FREE | **PREMIUM** | |
| `semrush-ai` | FREE | **PREMIUM** | |
| `pictory-ai` | FREE | **PREMIUM** | No free tier; 14-day / 3-project trial. |
| `luma-dream-machine-ray3` | FREE | **PREMIUM** | Pricing page lists no free plan; cheapest around $30/mo. |
| `murf-ai` | FREE | **PREMIUM** | The "Free" plan is a one-time 10-minute trial that **cannot download or export anything** (Murf's own help centre) and is marked "No Commercial Rights". |
| `lindy-ai` | FREE | **PREMIUM** | Self-serve signup exists but direct signups bill immediately; 7-day trial only for Slack joiners. |
| `relevance-ai` | FREE | **PREMIUM** | Free plan closed to new signups 2026-09-11 (vendor docs PR). The marketplace listing still says "Start for free" — contradiction noted on the page. |

Confirmed correct, no change: `photoroom` FREE, `invideo-ai` FREE, `activepieces` FREE,
`microsoft-power-automate` FREE, `pabbly-connect` FREE, `workato` FREE, `tray-ai` PREMIUM.

---

## Display-name corrections

| Slug | Catalog | Correct | Source |
|---|---|---|---|
| `photoroom` | PhotoRoom | **Photoroom** | Vendor's own capitalisation. |
| `invideo-ai` | InVideo AI | **invideo AI** | Vendor uses lowercase. |
| `pictory-ai` | Pictory AI | **Pictory** | |
| `luma-dream-machine-ray3` | Luma Dream Machine (Ray3) | **Luma** | Luma's own reference page: "Do not use 'Dream Machine' — it is an older deprecated model replaced by Ray." Ray3 was superseded by Ray3.14 (Jan 2026) then Ray3.2 (Jun 2026). The row name is two deprecations out of date. |
| `semrush-ai` | Semrush AI | **Semrush AI Visibility** | There is no product called "Semrush AI"; the page opens by saying so. |
| `surfer-seo` | Surfer SEO | **Surfer** | Vendor pages now title as "Positive Surfer" after the Positive Group acquisition (Oct 2025). |
| `tray-ai` | Tray.io | **Tray.ai** | Renamed 2024-07-16. Suggest alias "formerly Tray.io". |
| `writesonic-chatsonic` | Writesonic / Chatsonic | **Writesonic** | Chatsonic demoted to an unadvertised feature; one company, one subscription — no row split needed. |
| `play-ht` | Play.ht | **PlayAI** | Moot if the row is hidden. |

---

## Category corrections

- `photoroom`: `sales-marketing-seo-ai` → **`image-generation-editing`**. It is a photo editor. Worth noting its free plan is licensed personal/non-commercial (Terms effective 2026-07-29), so a tool filed under sales-marketing has a free tier that may not be used for product listings.
- `writesonic-chatsonic`: `text-conversational-ai` → **`sales-marketing-seo-ai`**. Repositioned to AI-visibility / GEO tooling.
- `jasper`: `text-conversational-ai` → **`sales-marketing-seo-ai`** (probable).

---

## websiteUrl corrections

- `murf-ai`: **empty** → `https://murf.ai` (verified via robots.txt sitemaps and ToS §1.2 naming murf.ai as "the Site" under Murf Inc.).
- `play-ht`: **empty** → `https://play.ht` is the only working domain; `play.ai` is dead. Moot if hidden.
- `activepieces`: → `https://www.activepieces.com`
- `lindy-ai`: → `https://www.lindy.ai`
- `semrush-ai`: → `https://www.semrush.com`
- `microsoft-power-automate`: current URL 302-redirects to `microsoft.com/power-platform/products/power-automate`.

---

## privacyLevel corrections

- `luma-dream-machine-ray3`: MEDIUM → **HIGH**. Luma's terms take a perpetual, irrevocable licence over **input and output** on free use.
- `surfer-seo`: HIGH → **review as MEDIUM**. Likely overstated.
- `pabbly-connect`: MEDIUM **confirmed**, no change.
- `tray-ai`: HIGH **confirmed**, category confirmed.

---

## Other field corrections

- `microsoft-power-automate`: `hasMobileApp` true → **false**. The app was deprecated 2026-08-31 and pulled from both stores; that date has passed. `difficultyLevel` BEGINNER flagged as arguable.

---

## Corporate events worth recording

- **Semrush**: Adobe completed its acquisition 2026-04-28. Plan lineup renamed under "Semrush One" (2025-10-29): Pro/Guru/Business became SEO/Starter/Pro+/Advanced.
- **Surfer**: acquired by Positive Group, Oct 2025.
- **Relay.app**: acqui-hired, Aug 2026.
- **PlayAI**: team acquired by Meta, July 2025.
- **Workato**: alive, private, independent; 2026 Gartner iPaaS Leader for the 8th time.

---

## Vendor self-contradictions carried onto pages rather than resolved

Per § 8c, where a vendor's own documents disagree the page says so rather than picking one.
These are on the shipped pages and are the most valuable content in the batch:

- **invideo AI** — a free plan documented in the help centre is absent from invideo's own pricing table; the terms of 2026-07-08 narrow the help centre's "complete rights" claim.
- **Jasper** — ToS §7 says it trains on your input and output (EU/UK-only opt-out); the ethics page says data is "NOT used to train underlying LLMs".
- **Semrush** — the KB contradicts the pricing card on whether the $139 SEO plan includes prompt tracking.
- **Pabbly Connect** — terms §3.22 cap a one-time plan at 10,000 tasks while `buy.pabbly.com` sells a 20,000-task one-time tier. Separately §19.4: "lifetime" includes only one year of support, renewable at a third of the original purchase price.
- **Microsoft** — Microsoft's own pages contradict each other on the free plan.
- **Relevance AI** — free plan closed 2026-09-11 while the marketplace still says "Start for free".
- **Pictory** — from 2026-09-01 Pictory's own help centre requires a Melodie music clearance code in a YouTube description or the track owner can claim the video.
- **Beatoven** — the licence position splits three ways across terms, FAQ and plan table.
- **Luma** — three mutually contradictory plan lineups across Luma's own surfaces.

---

## One research finding that corrected a false premise in the pipeline

The `pabbly-connect` task brief asserted that "internal steps are not counted as tasks" is a
Pabbly differentiator versus Zapier. **It is not.** Zapier's own pricing help page states that
its triggers, Filter, Paths, Formatter, Delay, Looping, Digest and Storage all consume no
tasks. Any `whyHere` built on that contrast would have been false. The page rebuilds its
differentiation on the one-time purchase model instead. Worth fixing in whatever prompt
carried that premise, so a later run does not reintroduce it.
