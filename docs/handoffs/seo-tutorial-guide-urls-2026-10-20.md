# Handoff — SEO foundation + tutorial guide URLs (2026-10-20)

**Audience:** Grok Bot team (LaunchPad HQ, marketing, research, coding bots) and any future Claude / Claude Code session.
**Session owner:** Zach. Planning/review in Claude (Cowork); implementation in Claude Code (Cursor).
**Production state at end of session:** `main` = `573ee203` (PR #77), Vercel deployment `dpl_HAYhSfwCXZVm3snZkHxSD6VKtZBr` READY, SHA matches.

---

## TL;DR

1. Search engines could not index any of our tutorials. They can now: all **183** tutorials have their own URL at `/platform/[slug]/guide`, plus a public `/tutorials` index.
2. The site now has **one canonical host**: `https://www.launchpadhq.io`. The apex domain and `launchpad-hq.vercel.app` 308-redirect to it.
3. The sitemap was **submitted to Google Search Console for the first time** (it never had been). Status: **Success, 434 pages discovered**.
4. Tutorials are **free and public**: no sign-in, no paywall, no "PREMIUM" label. This is a product decision, not a temporary state.

---

## Background: the question that started this

"Is the site set up in Google Search Console and pinged on keywords?"

- **Search Console:** yes. Domain property `sc-domain:launchpadhq.io`, verified via a Cloudflare DNS TXT record (set up in Session 10) under `zach@launchpadhq.io`. Not the personal Gmail.
- **"Pinged on keywords":** that isn't how Google works. You don't register keywords. Google crawls pages and decides which searches they match. Search Console only *reports* the queries afterwards (Performance report). We target keywords through page titles, headings and content. The meta keywords tag is ignored.

## What was wrong (audit, morning of 2026-10-20)

| Problem | Impact |
|---|---|
| Tutorials only existed as `/platform/[slug]?tab=tutorials`, with the overview's title and a canonical pointing at the overview | Google treated every tutorial as a duplicate of its overview and indexed **none** of them |
| `/tutorials` was in the sitemap but returned 404 to crawlers | Sitemap pointed Google at a dead page. Cause: route missing from Clerk `isPublicRoute` in `src/proxy.ts` |
| `launchpadhq.io` → www used a **307 (temporary)** redirect | Google may treat apex and www as separate hosts |
| `launchpad-hq.vercel.app` served the full site with no redirect or noindex | Duplicate copy of the whole site |
| Sitemap had never been submitted in Search Console | Google had no explicit pointer to our URLs |

## What was done

### 1. Domain redirects (Vercel → Project → Domains), done by Zach in the UI
- `launchpadhq.io` → `www.launchpadhq.io`: **308 Permanent** (was 307)
- `launchpad-hq.vercel.app` → `www.launchpadhq.io`: **308 Permanent** (was serving production)
- Verified with curl: paths are preserved (e.g. `/platform/activepieces` → same path on www); www returns 200.
- Claude's attempt to change this through the browser was blocked by a domain-change permission guard. Domain/DNS changes are Zach-only by design.

### 2. Webhook safety check (because redirects break webhooks)
Webhook senders (Stripe, Clerk/Svix) do **not** follow redirects; a 3xx counts as a failed delivery. Checked both dashboards on 2026-10-20:
- **Stripe** (account "Lakeside Innovation Labs LLC"): **no webhook endpoints registered.**
- **Clerk** (Launchpad HQ, Production instance): **no webhook endpoints registered.**
- So the 308s cannot have broken anything. Clerk's own subdomains (`clerk.launchpadhq.io`, `accounts.launchpadhq.io`) are separate DNS records and unaffected. Invoice emails and hosted invoice pages come from Stripe/Clerk and are unaffected.
- **Open question (see Open items):** the codebase reportedly contains webhook handlers (e.g. Stripe `invoice.payment_failed`). With nothing registered, those handlers never fire.

### 3. PR #77: tutorial guide URLs (squash-merged as `573ee203`)
Original branch `feature/tutorial-guide-urls`, five commits: proxy rule (isolated), guide pages + index + sitemap, PREMIUM label removal + CLAUDE.md, START-HERE fixes, workflow-link guard.

- **New route** `src/app/(app)/platform/[slug]/guide/page.tsx` (server component):
  - Title: `How to Use {Name}: Beginner's Guide | Launchpad HQ`
  - Meta description: the tutorial's tagline
  - Self-referencing canonical
  - JSON-LD: `Article` (with `dateModified` = tutorial `lastReviewedAt`; **no** `datePublished`, by design, since we only track review dates) + `BreadcrumbList`
  - `<h1>` = tutorial title ("Getting Started with X"), so it doesn't duplicate the overview's h1
  - 404s if there's no tutorial **or** no Platform row for the slug
- **Redirect:** `/platform/[slug]?tab=tutorials` → **308** to `/guide` (only when a tutorial exists; otherwise it stays on the overview).
- **Shared components extracted:** `PlatformTabNav`, `PlatformDetailHeader`, used by both overview and guide.
- **`/tutorials`** rewritten as a public server-rendered index: 183 guides in 20 category sections, `ItemList` JSON-LD, self-canonical. `"/tutorials(.*)"` added to `isPublicRoute` in `src/proxy.ts`. **This is the only auth-rule change.**
- **Sitemap** (`src/app/sitemap.ts`): adds one `/guide` URL per tutorial whose Platform row exists, `lastModified` = review date. The DB-down fallback now **omits** guide URLs, so it can never list a 404. The overview's `lastModified` is now just the row's `updatedAt`.
- **Internal links updated** from `?tab=tutorials` to `/guide` in: platform tabs, `gettingStartedHref`, `related-links.ts`, `quiz-links.ts`, `workflow-tier-comparison.tsx` (guarded: link only renders when the slug is in the DB **and** has a tutorial), `llms.txt`.
- **"PREMIUM" access-tier label removed from reader-facing UI** (the `accessTier` data field is untouched). CLAUDE.md updated: tutorials are free and public.
- **START-HERE.md corrected:** tutorial count is **183** (152 FREE / 31 PREMIUM, data only), `SITE_IS_PUBLIC` is **true** (flipped in #50 on 2026-10-14), plus other stale claims. Ledger entries 4.25–4.28 added.
- Gates passed: typecheck, build, 131/131 tests, `audit:tutorials` (183 clean). Changed files lint clean.

### 4. Production verification (after deploy)
| Check | Result |
|---|---|
| Guide URLs in sitemap | 183, and **all 183 return 200** |
| Sitemap total | 434 URLs, all on www, valid XML, ~0.4–1.0s, fine with Googlebot UA |
| `/tutorials` | 200 signed-out, 183 guide links, self-canonical |
| `?tab=tutorials` | 308 → `/guide` |
| No-tutorial platform `?tab=tutorials` | 200 overview |
| No-tutorial `/guide` | 404 |
| Apex `/…/guide` | 308 → www |

### 5. Google Search Console (done by Zach)
- Submitted `https://www.launchpadhq.io/sitemap.xml` → after an initial "Couldn't fetch" (a first-submission quirk) it is now **Success, 434 discovered pages**.
- URL Inspection, `/tutorials`: live test **"URL is available to Google / Page can be indexed"**. **Request indexing** submitted.
- Three guide URLs were accidentally added as *sitemaps*; they've been **removed**. Only `sitemap.xml` remains.
- **Request indexing** also submitted (via URL Inspection) for `/platform/chatgpt/guide`, `/platform/claude/guide`, `/platform/gemini/guide`.
- **Note for anyone using GSC:** the "Add a new sitemap" box is only for sitemap files. To get a single page crawled, use the **"Inspect any URL"** bar at the top → Request indexing (about 10/day quota).

### 6. Bing Webmaster Tools (done by Zach + Claude)
- Site imported from Google Search Console (read-only grant); the import brought no sitemaps, so `https://www.launchpadhq.io/sitemap.xml` was submitted manually. Status: Processing as of end of session.

---

## Decisions made this session (don't re-litigate without new info)
1. **Tutorials are free and public, forever-ish.** All 183 indexed. If a paid tier is built later, it should be *new* value (e.g. "what changed in your tools" alerts, the cost tracker), not gated copies of pages Google already has.
2. **URL shape:** `/platform/[slug]/guide`. Permanent. Never change it.
3. **Canonical host:** `https://www.launchpadhq.io`. All redirects are 308.
4. **`dateModified` only** in structured data. No fake publish dates.
5. **GA4 still not needed.** Search Console + Vercel Analytics cover it (Session 10 decision stands).

## Open items / next actions

| # | Item | Owner | Notes |
|---|---|---|---|
| 1 | ~~Request indexing for the ChatGPT, Claude, Gemini guides~~ | Zach | **DONE 2026-10-20** via URL Inspection. |
| 2 | ~~Bing Webmaster Tools~~ | Zach + Claude | **DONE 2026-10-20.** Site imported from GSC as `https://launchpadhq.io/` (signed in as zach@launchpadhq.io, read-only GSC grant). Import brought 0 sitemaps, so `https://www.launchpadhq.io/sitemap.xml` was submitted manually (status: Processing). Recheck in a few days. Optional later: IndexNow (Bing's instant-ping protocol) via a small route + key file. |
| 3 | **Webhook handler recon** (read-only, Claude Code): list every webhook route, what depends on it, and whether it's dead code given that **nothing is registered** in Stripe or Clerk. Also list base-URL settings using bare apex or `*.vercel.app`. | Claude Code | Matters for sponsorship invoicing. Also decide: are sponsors billed via Clerk Billing or Stripe invoices directly? (Probably Stripe.) |
| 4 | **Dead-product guides**: e.g. "Getting Started with Clarifai" says the product has been unreachable since 2026, but it's now an indexable how-to page | Zach decides | Options: retitle as "what happened + what to use instead" (recommended; same approach as Sora 2 in the Session 27 review), noindex, or remove. Audit the registry for others. |
| 5 | **Seed dev-local DB** with the 19 platforms from the 2026-10-15 manual batches (capcut, captions, deepl, deepseek, freepik-ai, gamma, hedra, higgsfield, kimi, kling-ai, krea, meta-ai, napkin-ai, perplexity-comet, poe, quillbot, qwen, speechify, veed), plus fathom, fireflies-ai, granola | Zach | Prod has them; dev doesn't. START-HERE 4.28. |
| 6 | **Lint chore branch**: 42 pre-existing full-repo lint errors (16 tracked files incl. `scripts/*` and the Jasper dedupe script, `src/lib/db.ts`, `back-to-top.tsx`, `outbound-link.test.ts`; rest in untracked `tmp/`) | Claude Code | Separate `chore/` branch; not caused by #77. |
| 7 | **Mobile check of `/tutorials`** on a phone | Zach | Desktop verified; mobile wasn't. |
| 8 | **Watch Search Console** over 1–3 weeks: Indexing → Pages (indexed count climbing toward ~434), then the Performance report for queries | Zach / marketing bot | Performance data is the real "keyword" signal. Use it to decide which tutorials deserve more depth. |

## For the marketing / research bots specifically
- Every tutorial now has a shareable, indexable URL: `https://www.launchpadhq.io/platform/{slug}/guide`. Use these in any outbound content, not `?tab=tutorials` links (those still work but redirect).
- The hub to link to is `https://www.launchpadhq.io/tutorials` ("183 free guides, no account needed").
- Always link to **www**. Never use `launchpad-hq.vercel.app`.
- The search-demand signal will come from Search Console → Performance once data accrues. Don't invent keyword targets before then; wait for real queries.

## Useful references
- PR: https://github.com/stevensonzj-ai/launchpad-hq/pull/77
- Vercel deployment inspector: https://vercel.com/stevensonzj-ais-projects/launchpad-hq/HAYhSfwCXZVm3snZkHxSD6VKtZBr
- Search Console (use the `zach@launchpadhq.io` account): https://search.google.com/search-console?resource_id=sc-domain%3Alaunchpadhq.io
- Stripe: 3xx webhook responses count as failures: https://support.stripe.com/questions/webhooks-what-to-do-when-the-http-status-code-starts-with-a-three-(3xx)
