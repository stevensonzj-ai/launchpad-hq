# LaunchpadHQ — Project Briefing for Claude Code

> Last updated: 2026-04-24
> Owner: Zach
> Audience: Any Claude Code session working on this repo

This file is the briefing Claude Code should read first on every session. It captures the project's mission, constraints, conventions, and decisions made to date so you don't have to re-derive them from the codebase.

---

## Project mission

LaunchpadHQ is a curated AI platform discovery site for **beginners and budget-conscious users**. The goal is to show people that the AI world is bigger than ChatGPT and Claude — that there are ~170 real options across writing, image, video, audio, code, research, automation, and more, many with generous free tiers or local/open-source alternatives.

The product is a guided discovery experience: browse the directory, take a matching quiz, see curated workflow templates, read honest tutorials, save progress, and eventually discuss with other users. The mission-control / "AI launch pad" metaphor runs through the branding.

**Target user:** AI-curious beginner who has probably heard of ChatGPT, might be paying for one AI tool, and wants help figuring out what else is worth their time and money. Not a developer. Not technical. Price-sensitive.

---

## Current state of the project (IMPORTANT)

The project is further along than earlier specs suggest. Auth and payments are already integrated. Features exist at scaffold level across the board. The work ahead is **audit, polish, and complete** — not "build from scratch."

### What is already wired up

- **Authentication: Clerk** is fully integrated. `@clerk/nextjs ^7.2.1` is installed, `ClerkProvider` wraps `src/app/layout.tsx`, `src/proxy.ts` handles middleware via `clerkMiddleware`, sign-in and sign-up routes exist under `src/app/sign-in/[[...sign-in]]/` and the equivalent for sign-up, and `src/lib/auth-db.ts` bridges Clerk userIds to Prisma User records. ~12 source files call Clerk APIs. Do not replace Clerk with another auth solution — it's fully wired.

- **Payments: Stripe** is fully integrated. `stripe ^21.0.1` is installed, routes exist at `src/app/api/stripe/{checkout,portal,webhook}/route.ts`, and `src/lib/stripe.ts` provides the shared client. Environment variables `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `STRIPE_PRICE_ID` are configured in `.env.local`.

- **Clerk is on a Development instance.** Migrating to a Production instance is a pre-paywall prerequisite (not yet done). Clerk is auth-only — billing is raw Stripe, not Clerk Billing.

- **Also in the stack, previously unlisted:** Cloudflare (DNS/CDN), Resend (transactional email; human email is Google Workspace `zach@launchpadhq.io`), Sentry (error monitoring), Vercel Analytics + Speed Insights, Google Search Console (domain property, Cloudflare-DNS verified).

- **Sentry gotcha:** serverless functions must `await Sentry.flush(2000)` before returning, or events are lost.

- **Site-wide `noindex` is currently set** (intentional friends-and-family protection). GSC shows all pages excluded until launch lifts it.

- **Tech stack confirmed:**
  - Next.js 16.2.2 with App Router, using an `(app)/` route group for the authenticated app surface
  - React 19.2.4
  - Prisma 7.6.0 with the `@prisma/adapter-pg` adapter (modern setup, different from Prisma 5 defaults — generic Prisma tutorials may not apply directly)
  - PostgreSQL on Neon
  - Tailwind CSS v4 with `@tailwindcss/postcss`
  - `@tanstack/react-query ^5` for data fetching
  - Deployment: Vercel

- **Feature scaffolds that exist (quality varies — audit before polishing):**
  - Platform discovery (`/discover`, `/platform/[slug]`)
  - Workflows (`/workflows` + `[slug]`)
  - Tutorials — the /tutorials index route is still a placeholder "coming soon" page (no registry listing). The live tutorial content renders as a **Tutorials tab on each platform detail page** (/platform/{slug}) via src/components/tutorials/platform-tutorials.tsx, mounted in platform-detail-tabs.tsx; multiple pages have shipped. See the ## Tutorials section for architecture and authoring rules.
  - Quiz & For‑You (`/quiz`, `/for-you`)
  - Per-platform prompts (`/platform/[slug]/prompts`)
  - Per-platform discussions (`/platform/[slug]/discussions`)
  - Account & Pricing (`/account`, `/pricing`, `/pricing/success`)
  - Onboarding (`/onboarding`) — placeholder page: minimal welcome with a CTA to the quiz. The full onboarding flow (preferences capture, welcome tour) still needs to be built.
  - API routes for categories, platforms, search, recommendations, user/quiz, prompts (rate/report), discussions (replies/vote/report), and Stripe

### Known gotchas

- **`.env.local` is UTF-8 encoded** (re-encoded from UTF-16 LE after an earlier incident). Don't edit `.env.local` directly — ask Zach to make changes himself.

- **Middleware is at `src/proxy.ts`, not `middleware.ts`.** Next.js 16 renamed it. Don't create a `middleware.ts` file — it will conflict.

- **Prisma 7 + PG adapter setup.** When referencing Prisma docs, note this is not the traditional Prisma 5 setup. The PG adapter changes how connections are established.

### Stale planning docs (do NOT read as current spec)

The following files describe the project as it was *planned*, not as it actually is. They predate the Clerk and Stripe integration and contain instructions that would revert real progress if followed. Treat them as historical context only:

- `docs/archive/FEATURE_SPEC.md`
- `docs/archive/IMPLEMENTATION_TASKS.md`
- `docs/archive/CURSOR_FULL_PROMPT.md`
- `docs/archive/CURSOR_IMPLEMENTATION_PROMPT.md`

`AGENTS.md` contains the load-bearing rule "this is Next.js 16, read `node_modules/next/dist/docs/` before coding." That rule is still current and should be respected.

---

## Design system and aesthetic

Theme: mission-control / space launch, but **restrained and professional** — not cartoonish. Think "SpaceX control room" rather than "children's space camp." Current implementation uses:

- Dark mode primary (deep navy/near-black backgrounds)
- Orange accent (warm, not neon) for CTAs, highlights, and the "launchpad" motif
- White primary text, muted gray secondary text
- Subtle starfield dot pattern as ambient background texture
- Rocket iconography used sparingly

**Design principles to preserve:**
- Restraint over spectacle. One strong visual element per section, not five.
- Every tag, pill, and badge should have a clear purpose in the visual hierarchy. Avoid decorative color.
- Information density is a feature — this is a research/comparison tool, not a marketing page. Users want facts.
- Honest UX. If a platform is enterprise-only, say so clearly. If a free tier is limited, show the exact limits.

**Known design weaknesses to improve (in priority order):**
1. Quiz page feels like a generic survey form — needs visual interest, progress indicator, iconed options
2. Discover page cards are visually uniform — needs featured treatment, consistent tag system, better truncation
3. Platform detail pages use too many nested card borders — consolidate
4. Homepage hero rocket icon is generic — replace with something more distinctive

---

## Pricing and paywall model

- **$9/month** (current Stripe configuration)
- **Free trial:** one week, no credit card required (may revisit this)
- **Positioning:** "subscribe and forget" — deliberately priced below the $10/month psychological threshold where users start budget-scrutinizing

**Pricing is a pre-launch decision.** The exact final price ($8 vs $9, with or without annual discount) can be revisited as part of the public-launch workflow. For now, leave `STRIPE_PRICE_ID` and the pricing page copy as they are. Don't spend effort changing prices until launch is imminent.

**Friends-and-family mode:** The site is currently functional without payment enforcement while Zach collects feedback. The paywall will activate before public launch.

### Free vs. paid feature split (target for launch)

**Free (no account required):**
- Full directory browsing across all 170+ platforms
- All category/cost/mobile filters
- Quiz ("Get Matched")
- Platform overview pages (name, overview, official links, basic free-tier summary)
- 1–2 sample workflow templates visible as teasers

**Paid ($9/mo):**
- All workflow templates (currently the strongest feature)
- Full tutorials including copy-prompt-to-platform flows
- Prompt library (submit and browse)
- Community discussions
- Subscription tracker with cost alerts
- Side-by-side platform comparison tool
- Personalized weekly digest email
- Saved favorites, notes, and quiz history

**Rule of thumb:** discovery is free; the value-add features that help users *act* on that discovery are paid.

---

## Tutorials

Tutorials are a **live, active workstream — not a P3 placeholder.** The pilot is validated: pages ship across all three archetypes, the shared renderer holds with no structural cracks, and the format produces real per-platform substance.

### Architecture — file-based static TS, NOT the database

- Tutorials are **static TypeScript** in `src/data/tutorials/*.ts`, one file per platform: `{platformSlug}-getting-started.ts`, exporting a named const.
- **`src/data/tutorials/types.ts` is the compile-time contract** (`PlatformTutorialData`). Author new pages straight against it; tsc enforces required fields.
- **`chatgpt.ts` is the canonical reference page.** Worked references across archetypes: `chatgpt` (prompts), `midjourney` (prompts/image), `zapier` (recipes), `ollama` (pick-and-setup, includes the optional setup section).
- **The dormant Prisma `Tutorial` / `UserProgress` models are intentionally UNWIRED. Do NOT route tutorials through them.** The instinct to "wire tutorials through the DB" is the wrong path — the live system is file-based by design.
- **`accessTier` is a TypeScript union in `types.ts`, not a Prisma enum.**
- **`archetype` = `'prompts' | 'recipes' | 'pick-and-setup'`**, which drives the starter-section heading via an exhaustive `Record` in `platform-tutorials.tsx`.
- **Registration is manual + two-step:** create the file AND add the import + `[x.platformSlug]: x` to `src/data/tutorials/index.ts`. Lookup is by **`platformSlug`** — must match the real Platform DB row's slug (verify, don't assume).

### Authoring rules

- **Web-research pass at authoring time, every page** — not just "are old facts still true" but "what's new the page doesn't mention." Capability drift is mandatory to check.
- **`lastReviewedAt` means "volatile facts web-verified on this date."** Stamp the build day; it's an honesty contract.
- **No volatile model-version numbers in prose.** Write facts to mechanism, hedged — version numbers rot between passes.
- **Security posture varies completely by platform — no boilerplate.** Calibrate sharpness to the platform's `privacyLevel`.
- **Build on the shared renderer; flag, don't custom-build.** One renderer change benefiting all pages is justified; per-page aesthetic divergence is the trap.

### What NOT to build

- **Overlay-on-external-sites** (browser extension injecting tutorials onto ChatGPT's UI, etc.): **cut**. Browser security prevents iframing and a browser extension is a separate product with its own maintenance burden.
- **API sandbox ("try it here"):** **cut from v1**. Attractive feature but creates real operational exposure (abuse, runaway API costs, moderation liability, provider schema changes) that contradicts the "low-cost, hands-off" operating principle. Revisit in year two if traffic justifies it.

---

## Operational approach

**Operating principle:** This is a solo side project. It must stay low-cost and low-maintenance. Features that require constant human attention are disqualified unless they directly drive revenue.

### What IS being automated

- **Vercel Cron** (to be set up) for scheduled server tasks:
  - Daily broken-link check across all platform URLs, emails Zach a report
  - Weekly Neon database backup trigger (Neon has automatic backups — just toggle them on)
  - Monthly "platforms with pricing changes detected" email

### What is NOT being automated (human-in-the-loop via Cowork)

Content work is done by Zach using Claude Cowork as a desktop assistant. Cowork drafts; Zach reviews and publishes. Nothing auto-publishes to the site.

- Weekly newsletter drafting
- Monthly competitive scans of Futurepedia, TAAFT, Toolify, Coda One, AlternativeTo, Future Tools
- Tutorial content drafting
- Platform data updates for pricing/features

### What was considered and cut from scope

- The multi-agent "Launchpad AI Ops" system (@research, @content, @quality, @data, @mod agents on schedules with an admin dashboard): **cut**. It overstates what Claude Code Agent Teams does (that's a dev-time parallelization feature, not a production service) and over-engineers the problem. The Vercel Cron + Cowork pattern above covers the real need.
- RSS scraping + AI summarization infrastructure: **cut**. A second product, not a feature of this one.

### Moderation

No AI moderation for v1. Humans only. The pipeline is implemented (as of Session 4):

- **Default status is `PENDING`.** The `Prompt`, `Discussion`, and `DiscussionReply` models use a `ModerationStatus` enum (`PENDING` | `APPROVED` | `REJECTED`) that defaults to `PENDING`. Submission routes rely on the schema default — don't set status explicitly.
- **Public list endpoints filter to `APPROVED`.** `GET /api/platforms/[slug]/prompts` and `.../discussions` only return approved rows. Replies inside a returned discussion are also filtered to approved.
- **Action-route policy — apply this split to any new action endpoint:**
  - **Rate and vote routes filter target lookups to `APPROVED`.** Engagement signals shouldn't accumulate on non-approved content. Implement via `findFirst({ where: { id, status: ModerationStatus.APPROVED } })` and return a generic 404 (don't distinguish "not found" from "not approved" — information disclosure). This covers `/api/prompts/[id]/rate`, `/api/discussions/[id]/vote`, `/api/discussion-replies/[id]/vote`, and the parent-discussion lookup inside `/api/discussions/[id]/replies`.
  - **Report routes do NOT filter.** Reports on `PENDING` content are valid moderation signals — a user flagging something they encountered in a moderator view is a feature, not a bug. Leaves `/api/prompts/[id]/report` and `/api/discussions/[id]/report` unfiltered by design.
- **Approval UI is not yet built.** Zach flips `status` manually in Prisma Studio for now. Email-on-pending notifications and an admin approval queue are follow-up work. Add automated flagging only after volume justifies it — even then, auto-flag for human review, never auto-publish or auto-remove.

---
## Editorial principles for the platform catalog

These principles govern how platforms are evaluated for inclusion in or exclusion from the LaunchpadHQ catalog, and how exclusions are eventually surfaced to users. The principles are the editorial work that distinguishes LaunchpadHQ from a generic AI tool aggregator — they're a strategic moat against AI-generated competitor sites, since editorial reasoning is hard to fake at scale.

### Inclusion bar

A platform is a candidate for inclusion when it meets at least one of these tests:

- **Genuine beginner relevance**: a non-technical user could plausibly sign up and get value from it
- **High mindshare**: the platform has enough public discussion, news coverage, or social-media presence that beginners are likely to hear about it elsewhere and search for it on LaunchpadHQ — even if the platform itself is intermediate-to-advanced in practice
- **Category completeness**: the platform fills a meaningful gap in an existing category (a free alternative to paid options, a notable open-source option, a strong international entrant, etc.)

A platform that meets none of these is not a candidate, regardless of how active or popular it is. "Real platform" alone isn't enough — there are 15,000+ AI tools listed across the aggregator sites; curation is the differentiator.

### Inclusion-with-disclosure: the default treatment for higher-concern platforms

For platforms with privacy, data-handling, geopolitical, or transparency concerns, the default is **include with honest disclosure**, not exclude.

Reasoning:

- Silent exclusion of high-mindshare platforms (e.g. DeepSeek, MiniMax, Kling) creates a "where is X?" search pattern that hurts catalog credibility
- "We excluded Platform Y because it's from country Z" is a categorical judgment that's hard to apply consistently and raises legal exposure
- "We included Platform Y with a factual note about its data handling" is editorially honest and lets users decide for themselves
- The schema already supports this via the `privacyLevel` enum (LOW/MEDIUM/HIGH) — use it honestly. LOW is informative, not a brand of disapproval. Don't inflate to HIGH to be polite

What honest disclosure looks like in practice:

- Set `privacyLevel` to reflect the platform's actual data-handling practices, even if that's LOW
- Use the description field (or a dedicated notes field if added later) to state observable facts plainly: country of operation, data retention policy, training-on-user-inputs status, any clauses a user should review
- Frame these as facts ("Operated from China. Per the platform's privacy policy as of YYYY-MM-DD, user inputs may be stored on servers in China and used to improve services."), never as judgments ("This platform is risky for privacy.")
- Date-stamp anything that could change. Policies change; the disclosure should be a snapshot, not a permanent claim

### Exclusion bar — per-platform observable facts only

A platform belongs in the Excluded Platforms holding doc (and eventually on the Excluded Platforms page, once that's published) only when there is a **specific, documented observation about that platform** that warrants exclusion. The exclusion is anchored to facts, not categorical judgments.

Acceptable exclusion grounds (each with a specific, date-stamped, primary-source-linked observation):

- **Privacy**: no privacy policy at all; policy fails to address user input handling at all; specific clauses that warrant flagging (must be the actual clause, not a general impression)
- **Safety**: documented child-safety failures, documented security incidents with no remediation, content moderation failures with documented evidence
- **Regulatory**: documented sanctions, regulatory action, or legal findings against the platform
- **Abandoned / inactive**: domain dead, last update >18 months ago, social channels dormant, support unreachable
- **Scam signals**: specific scam patterns documented (fake reviews, payment without delivery, deceptive marketing) — must point to evidence
- **Not actually AI**: marketed as AI but is in fact a non-AI product (rule-based, manually operated, etc.)

Unacceptable exclusion grounds:

- "Based in country X"
- "Has had privacy concerns" (too vague)
- "Owned by company we don't like"
- "Could be used badly"
- "Doesn't feel beginner-friendly"
- Any reasoning that wouldn't survive a "would I want to defend this in writing?" test

### Honest privacyLevel usage

The `privacyLevel` enum is editorial signal, not a brand. Use it honestly across the catalog:

- **HIGH**: clear privacy commitments, enterprise-grade data handling, or open-source/self-hosted platforms where the user controls data
- **MEDIUM**: standard SaaS data handling with reasonable policies, may use inputs for improvement with opt-out or anonymization
- **LOW**: significant data-handling concerns — inputs used for training by default, data stored in jurisdictions a privacy-sensitive user might want to know about, weak or vague policies

LOW is not a death sentence and it's not a way of expressing disapproval. It's a factual signal that helps the user decide. A platform with LOW privacy and high utility is a perfectly valid catalog entry — the disclosure is the point.

### Research format for new candidates

When researching candidate platforms for inclusion, each candidate should be evaluated with:

- One-line rationale for inclusion (why this platform fits the bar)
- Recommended `privacyLevel` based on observable evidence
- 1-2 sentence factual disclosure note (lives in description field), written as observable facts not judgments
- Primary source URL (the platform itself, plus the privacy policy or TOS if the disclosure note cites it)

When a platform doesn't pass the inclusion bar, it gets captured in the holding doc with:

- Exclusion category (from the acceptable list above)
- Date-stamped observable fact
- Primary source URL

The holding doc lives in the project (not published) until the legal boilerplate for the Excluded Platforms page is finalized.

## Excluded Platforms page (planned feature, not yet built)

A future page documenting AI platforms that were investigated during catalog research but excluded from the catalog. Documents the editorial reasoning behind each exclusion. Source data is the holding doc that accumulates from catalog research sessions.

**Why this exists in the roadmap:**

- Surfaces the editorial work that distinguishes LaunchpadHQ from a generic AI tool aggregator
- Solves a real user search pattern (user hears about a platform elsewhere, doesn't find it on the site, currently walks away — with this page they'd walk away informed instead)
- Strategic moat against AI-generated competitor sites; editorial reasoning is hard to fake at scale

### Legal framing — required before publication

Slander and defamation risk is real if exclusion entries are written as evaluative judgments. All exclusion content on the published page must follow these rules — they extend the per-platform observable-facts standard from the Exclusion bar section above:

- **State observable facts, not evaluative judgments.** Bad: "ExampleAI has a misleading privacy policy." Good: "ExampleAI's privacy policy as of [date] does not state how user inputs are stored or whether they're used for training."
- **Date-stamp every observation.** "As of YYYY-MM-DD" — makes clear the entry is a snapshot, not a permanent claim. If the platform fixes the issue, the entry can be updated without retracting anything false.
- **Link to primary sources.** Privacy policies, ToS, etc. — verifiable evidence behind every observation.
- **Use exclusion categories rather than free-form blame.** "Excluded for: insufficient privacy disclosure" is a category sort. "We think they're shady" is an accusation.
- **Distinguish observations from editorial conclusions and label them differently.** "Observed: no SOC 2 certification listed" is fact. "Conclusion: we recommend caution for enterprise users" is editorial. Both are fine; mixing them is where trouble starts.
- **Provide a corrections / appeals contact path on the page itself.** Documented good-faith process — "did you contact us through our correction process?" becomes the immediate response to any legal threat.

### What needs to happen before this page goes live

- Draft a 200-300 word "how we describe exclusions" boilerplate that lives at the top of the page. Sets expectation for users, demonstrates good-faith editorial process, defines the framing for everything below
- Ideally have the boilerplate reviewed by a small-business attorney before publication
- The page itself should be a Server Component, similar architecture to Discover. Likely a simple grid or list of excluded platforms with name, company, exclusion category, and the date-stamped observation(s) that drove the decision
- Consider an `excluded_platforms` table in the schema with columns roughly: `name, company, exclusion_category, observation_text, primary_source_url, date_evaluated, last_updated`. Or a JSON file if the data is small and static enough
- Filterable by exclusion category (privacy, safety, regulatory, abandoned/inactive, scam signals, not-actually-AI)

### Out of scope until the boilerplate is finalized

- Don't preemptively add the database table or page until the legal framing is ready
- Don't publish any entries until the boilerplate is finalized and reviewed
- The holding doc accumulates in the project as a private file in the meantime, capturing exclusions in the legally defensible format (per the Research format section above) so no rework is needed when the page is eventually built

## Coding conventions

### File organization

- Components in `src/components/` — group by feature, not by type (e.g. `components/platforms/`, `components/workflows/`, `components/prompts/`)
- Route handlers in `src/app/api/[route]/route.ts`
- Shared utilities in `src/lib/`
- Prisma schema in `prisma/schema.prisma`
- Types co-located with the code that uses them; shared types in `src/types/` if needed

### Naming

- Files: `kebab-case.tsx` for components and pages
- Components: `PascalCase`
- Functions and variables: `camelCase`
- Database models: `PascalCase` singular (User, Platform, Prompt)
- Database fields: `camelCase`

### Data conventions

- **Single source of truth for platform count.** Never hardcode "168/170/171" anywhere. Read from the DB — `src/lib/platforms.ts` `getPlatformCount()`, which rounds down to the nearest 10 so the displayed count never overstates.
- **Free-tier descriptions: don't reintroduce a "Free: Free:" double-prefix.** `platform-card.tsx` strips a leading case-insensitive "free:" before prepending its own label — keep that guard.
- **Deduplicate platforms before adding new ones.** "Jasper" / "Jasper AI" duplicate rows persist until `scripts/dedupe-jasper-platforms.ts` is run.

### Styling

- Tailwind utility-first, no separate CSS files unless necessary
- Extract a component before reaching for `@apply`
- Use CSS variables for theme colors so dark/light mode stays consistent
- Don't introduce new color values without discussing — the palette is deliberately small

### Error handling and loading states

- Every page that fetches data needs a loading state (Next.js `loading.tsx` or Suspense)
- Every page that can error needs an error boundary (`error.tsx`)
- Empty states matter — "No platforms match your filters" with a helpful reset action, not a blank div
- API route handlers should return proper HTTP status codes with structured error bodies
- **Success / pending-review feedback** on form submits uses an inline green panel (`border-green-500/20 bg-green-500/5`) with a 6-second auto-dismiss via `useEffect`. No toast library in use. For submissions that land at `status=PENDING`, skip the optimistic list update — the row won't appear on the next `GET`, so an immediate refetch is misleading. See `src/components/prompts/platform-prompts.tsx` and `src/components/discussions/platform-discussions.tsx` for the current pattern.

### Testing

- No formal test suite yet. Not a priority for the current phase.
- When modifying auth, payments, or anything handling money/credentials, test manually end-to-end before committing.

### Git and commits

- Commit after every meaningful change; don't stack 10 features into one commit
- Clear, specific commit messages ("Fix double-prefix on free tier text" not "fixes")
- Branch naming: `feature/`, `fix/`, `chore/` prefixes

### Known technical gaps

Follow-ups surfaced by recent work. Not urgent, but worth knowing about — pick them up opportunistically when you're already touching nearby code.

- **Legacy `Prompt.author` (String?) column coexists with the `user` relation.** Some older rows have `author` populated and no `userId`. The current projection in `GET /api/platforms/[slug]/prompts` falls back `user.name → author → "Anonymous"` to keep them readable. Candidate follow-up: backfill the `user` relation for legacy rows, then drop the column in a migration.
- **No admin UI for moderating PENDING submissions.** Zach currently flips `status` manually in Prisma Studio. Building an admin queue is a P2 item under "Complete the feature scaffolds."
- **`LoggedOutLanding` in `src/app/(app)/for-you/page.tsx` is dead code.** Middleware (`src/proxy.ts`) auth-gates `/for-you`, so the signed-out branch is unreachable in practice. Now that anon users land on `/quiz/results` instead, this fallback can be deleted in a future cleanup pass.

---

## Priority roadmap

Current priority order. The original "build auth then payments then features" plan is obsolete because those are already built. The real sequence is:

### Step 0 — Full feature audit (the next task)

Before any polish or bug-fix work, Claude Code will walk through every feature surface in the app and report which are functional, which are broken, and which are scaffolded-but-stub. Output is a status map that drives everything after.

### P0 — Bugs and inconsistencies

1. Deduplicate Jasper entries — `scripts/dedupe-jasper-platforms.ts` is merged but NOT executed. Running it (operator step, Neon branch first) closes this.
2. Remove duplicated content between platform detail sidebar and main column — unverified; check before acting.

### P1 — Design polish (1–2 weeks)

1. Discover page card redesign — featured platforms, consistent tag hierarchy, sort options (popular / newest / best free tier), cleaner truncation
2. Quiz redesign — progress bar, iconed option cards, transitions, celebratory completion
3. Platform detail page — consolidate boxes, add platform logo/preview imagery, strengthen Overview/Tutorials/Discussions/Prompts tab bar
4. Homepage — replace generic rocket icon with distinctive visual, add one ambient motion element

### P2 — Complete the feature scaffolds

The audit will show what's actually broken vs. working vs. stub. Likely includes:

1. Build full onboarding flow (preferences capture, welcome tour) — currently a placeholder page
2. Account page completion (subscription management UI)
3. Prompt library submit/browse/vote flow polish
4. Discussion thread UI polish
5. Admin moderation queue for pending submissions
6. Subscription tracker feature (may not exist yet — confirm via audit)
7. Platform comparison tool (may not exist yet — confirm via audit)

### P3 — Community and growth (after P2 is live)

1. Reddit-style discussion features completion (if not already in place)
2. Weekly personalized digest email
3. Saved favorites and notes
4. Screencast tutorials for the highest-traffic platforms (future enhancement; the written-guide format is the current standard — see ## Tutorials)

### Pre-launch workflow (when Zach is ready to charge publicly)

1. Finalize pricing (confirm $9/mo or change)
2. Update Stripe product and STRIPE_PRICE_ID if price changes
3. Update pricing page copy to match
4. Enforce paywall across paid features
5. Remove "friends-and-family" affordances

### Deferred indefinitely

- API sandbox / "try it here" feature
- Multi-agent ops system
- RSS scraping and auto-summarization
- Browser extension
- Mobile apps (responsive web is sufficient)

---

## Current context (as of April 2026)

- Zach is starting paternity leave soon. Velocity will be lower than a full-time project. Planning assumption: half the output he'd estimate.
- Site is deployed at launchpadhq.io and functional. Not yet publicly launched or monetized (friends-and-family mode).
- This is Zach's first major web project. He's learning as he goes and appreciates when Claude Code explains the "why" behind suggestions, especially for concepts like auth, payments, and database design that are new to him.
- Zach uses Cursor Pro alongside Claude Code in Cursor (OAuth via Max plan). Don't assume features specific to one tool or the other without checking.

---

## How to work with Zach

- **Explain the why.** When making non-obvious technical choices, briefly explain the reasoning. This is a learning project as much as a business project.
- **Read before proposing changes.** Read the target files — both what you're editing and what consumes it — before proposing an edit. Don't rely on memory of earlier reads; re-read if significant time has passed or other edits have landed. Cheap up-front reads beat expensive post-hoc unwinds.
- **Flag uncertainty and contradictions honestly.** If you don't know whether a library behaves a certain way, say so and check rather than guessing. If something in this file, in the actual code, or in a request I've made contradicts what you see elsewhere, trust the code and flag the discrepancy — don't silently pick one side.
- **Push back when the plan looks wrong.** If a proposed approach (mine or yours) would produce a worse outcome than an alternative you can see, say so before executing. Don't silently follow a spec you can see is wrong — flag it, propose the alternative, and wait for my call. "Your spec said 0 but 0 renders as '0 (0)' while null renders as 'No ratings'" is exactly the kind of catch I want. I'd rather re-plan than unwind a commit.
- **Don't over-engineer.** If a simple solution works, use the simple solution. The bar for added complexity is "does this pay for itself in the next six months."
- **Prefer incremental over aggressive refactors.** Small, verifiable changes committed often beats large restructurings that might break things.
- **Test after every meaningful change.** Run the dev server, click through the affected flows, fix anything broken before moving on.
- **Never add a new dependency without flagging it.** The stack is deliberately constrained.
- **Never touch `.env`, `.env.local`, or any file with secrets.** Ask Zach to set values himself. (`.env.local` is UTF-8, re-encoded from a prior UTF-16 LE state; mis-encoding it can still break env loading.)
- **Don't create a `middleware.ts` file.** Middleware lives at `src/proxy.ts` (Next.js 16 convention). Creating `middleware.ts` will conflict.

---

## Questions Claude Code should ask before assuming

- If a design decision isn't covered here, ask rather than guess.
- If a proposed change would cross a P-band (e.g., a bug fix that would require touching the auth flow), flag the sequencing.
- If a user request would require cutting something on this roadmap, name the tradeoff explicitly so Zach can decide.

---

## Files that supplement this one

- `prisma/schema.prisma` — canonical data model
- `AGENTS.md` — Next.js 16 breaking-change warning (still current)
- `README.md` — developer onboarding (if present)
- `package.json` — dependencies and scripts

If those contradict this file, trust the actual code and flag the contradiction so this file can be updated. This is a living document.

The files under `docs/archive/` are historical planning docs that predate the current state of the codebase. Do not follow their instructions — use them only for understanding decisions that led here.
