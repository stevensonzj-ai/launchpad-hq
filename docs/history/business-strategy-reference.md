> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `business-strategy-reference (1).md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# LaunchpadHQ — Business & Monetization Strategy (Reference Doc)

**Created:** June 9, 2026, during the Session 10 planning discussion (strategy, no code executed).
**Purpose:** Capture the monetization, launch-sequencing, and payments-architecture decisions so they don't have to be reconstructed from chat. This is a living reference, not a session execution recap. Pairs with `product-roadmap-reference.md`.

---

## Headline stance: paywall and LLC are deliberately deferred

The paywall is **not** being rushed, and the LLC is **not** being formed yet. This is a decision, not a delay.

**Why defer the LLC specifically:** Forming it now buys nothing while the site is free. An informational catalog has minimal liability exposure and there's no revenue to shield. What forming it early *does* create is an ongoing compliance obligation (annual Texas filings) starting the day it's formed — pure overhead with zero offsetting benefit until money is moving. **Form the LLC when monetization is imminent, not before.**

**Why defer the paywall:** The hardest-won asset is organic search traffic, and a first impression of "pay $9 for features that aren't compelling yet" permanently poisons an early visitor. Better to stay free and good than paid and thin. The plumbing (below) can all be built in parallel and held ready; the *flip* is a separate gate opened only when the product justifies it.

**The trap to avoid:** "Defer until the site feels ready" is open-ended, and open-ended is how solo projects stall in permanent polishing. The deferral only works because it's bounded by the monetization-ready bar below.

---

## The monetization-ready bar (the definition of "ready to charge")

The paid tier is ready to charge for when **all three** are true:

1. **The For You news feed is working** — this is the retention engine (see below).
2. **Tutorials have a real first batch live** — especially the deeper, platform-specific guides.
3. **Personalization is solid** — favoriting → For You, working as it does today.

Everything else is either free funnel or supporting. This is three things, not the whole product vision.

**Why news is load-bearing:** "Subscribe and forget" at $9/mo only works if there's a *recurring* reason to keep paying. Favoriting, the quiz, the prompt library, and tutorials are largely one-time or static value. The news feed is the only feature that gives someone a reason to return next week. It is the entire retention mechanism of the model — and as of this session it has zero work done.

---

## Gating philosophy (locked)

**Gate interaction, personalization, and depth — never the catalog's existence or browsability.**

A full-site gate was explicitly considered this session and **rejected**. Reasons:
- It destroys the organic-search funnel: Googlebot hits a login wall and can't index, rankings decay, and the funnel that's currently growing collapses.
- It's the highest-friction possible introduction for the lowest-confidence possible user (beginners), contradicting the "earn trust before asking for signup" positioning.
- Non-payers behind an open catalog aren't freeloaders draining anything — they cost ~nothing to serve and are the top of the funnel. Gating deletes them rather than converting them.
- The open catalog is what *makes* the paywall valuable (it's the marketing engine and trust-builder), not what competes with it.

The legitimate worry underneath the full-gate instinct ("the gated features might be too thin to justify $9") is real, but the answer is **make the paid layer worth it**, not hold the free catalog hostage to compensate.

### The access model (three tiers of access, not three price tiers)

| Access | What's in it |
|---|---|
| **Read freely (open + indexed, no account)** | Catalog, platform pages, difficulty filter, quiz-taking, prompt library viewing, discussion viewing, lighter tutorial tiers (starter kits, evergreen concepts) |
| **Free account to contribute** | Saving quiz results, favoriting, posting to prompt library / discussions |
| **Paid ($9/mo)** | For You news feed, deep platform-specific tutorials, favorites-driven personalization |

Note: opening the prompt library and discussions to free viewing shifted them from "paid pillar" toward "free funnel." That moved the weight of the paid tier onto **news + tutorials + personalization** — which is why those two greenfield builds are now *the* substance decisions.

---

## Payments architecture (decided): Clerk Billing, not custom Stripe

Since the stack is already Clerk + Stripe + Next.js, **Clerk Billing** is the chosen path over a hand-rolled Stripe subscription + webhook integration.

**Why:**
- Eliminates the most error-prone part of a billing build (webhook handling, subscription sync) — directly aligned with limited, fragmented review time.
- Cost is trivial: 0.7% per transaction on top of normal Stripe fees (~6¢ on a $9 charge).
- Subscription UI is built in (users manage their plan from Clerk's `<UserButton />` billing tab) — fits "subscribe and forget."
- Free-trial support confirmed: per-plan, configurable (1-day minimum, so 7-day is fine), **credit card required up front**, auto-charges at trial end if not cancelled, only never-paid/never-trialed users are eligible (built-in abuse prevention). Subscription status is stored alongside user data, so no sync code.

**Caveats / risks to remember:**
- Clerk Billing is in **Beta** — APIs are experimental and may have breaking changes. **Pin the SDK and clerk-js versions.** Tolerable for a hobby project you can babysit; would warrant more caution if income depended on it.
- Plans live in the **Clerk Dashboard, not Stripe** — they don't sync to Stripe products. Clerk uses Stripe purely for payment processing. Committing to Clerk Billing means committing to Clerk's billing model; migrating away later means rebuilding.
- A Stripe account created for a **dev** instance **cannot** be used for production — a separate production Stripe account is required. This ties directly to the Clerk Production migration (a known P0). In dev, Clerk Billing works against a sandbox without a real Stripe account.

---

## LLC → payments dependency chain & timing

**Sequence:** File LLC → get EIN → open business bank account → activate production Stripe → flip live billing.

1. **File Certificate of Formation (Form 205) via SOSDirect** — ~$300 state fee. Texas is fast right now (filings were processing in ~2 business days as of late January 2026; official estimate is 10–12 business days). Expedite options exist if ever needed.
   - **Decision needed:** registered agent. Being your own agent makes your home address public record; a registered-agent service (~$100–300/yr) keeps it private. For a public-facing site, lean toward the service.
2. **EIN from the IRS** — free, online, issued same-day with an SSN.
3. **Business bank account** — needs the formation cert + EIN.
4. **Production Stripe account** — business verification with EIN + bank.

**Important:** the LLC clock is no longer the binding constraint. Texas processing is fast, so launch timing is gated by *technical/product readiness* (which is in Zach's control), not a government queue.

**Not legal/financial advice:** the filing mechanics above are factual, but single-member LLC tax treatment and the operating agreement warrant a brief CPA/attorney pass. The small-business attorney already planned for the Excluded Platforms boilerplate can absorb this.

---

## The phasing plan (PARKED — reference for when product is ready)

This is the sequence to run **when the monetization bar is met**, not now. Two parallel tracks: **[Operator]** (non-coding) and **[Coding]** (Claude Code).

- **Phase 0 — Start the clock + recon:** [Operator] decide registered agent, file Form 205. [Coding] read-only recon of the Clerk Dev→Prod migration scope.
- **Phase 1 — Clear the deck + build billing in sandbox:** [Coding] P0 bugs (Jasper dedup, duplicate sidebar/main content), build Clerk Billing in dev sandbox. [Operator] once LLC approved → EIN → business bank account.
- **Phase 2 — Production wiring:** [Coding] execute Clerk Production migration (new prod keys, Clerk subdomain DNS, OAuth reconfig, redirect URLs). [Operator] create + verify production Stripe, connect to Clerk Production, reconfigure $9/mo + 7-day-trial plan in prod dashboard.
- **Phase 3 — Verification + ops:** end-to-end Stripe test with a real card (subscribe → trial → charge → cancel → re-access); moderation email flow; Gmail grep; quiz `goalKeywords` fix.
- **Phase 4 — The flip (separate judgment gate):** only if the monetization bar is genuinely met. Enable gating, monitor via Sentry + Vercel Analytics + Clerk dashboard.

**Critical path:** LLC → EIN → bank → prod Stripe → flip. Almost all coding lives *off* that path and runs in parallel. Highest-risk item: the Clerk Production migration (DNS + OAuth has sharp edges) — recon it first.

---

## Known prerequisites still outstanding (from prior sessions)

- **Clerk Production instance migration** — still on Development; gates the paywall and production billing.
- **P0 bugs:** Jasper platform deduplication; duplicated content between platform detail sidebar and main column.
- **Stripe end-to-end verification with a real card** — before any real user touches live billing.

---

## Context note

Paternity leave is **over** — son born end of April 2026. The earlier "front-load everything before going absent" framing is stale. There's no hard absence cliff, which removes artificial urgency from the launch. But fragmented newborn-era time means the "incremental, well-reviewed changes" discipline is, if anything, more important. Launch when ready, not on a clock.

## Tooling note (added June 9, 2026)

Claude Fable 5 launched June 9, 2026 — a Mythos-class model built for long-running, asynchronous, multi-day batch work. It's the tool to reach for on large, well-scoped, low-judgment jobs: the deferred Phase 2 catalog research (~170 platforms), big mechanical migrations, bulk content generation reviewed in batch. It is *not* the right fit for the surgical, human-in-the-loop, diff-review-and-preview rhythm this project runs on day to day — Opus stays the default there. The constraint on this project has never been raw model capability; it's review time and calendar-bound steps, which a more-autonomous model doesn't relieve.
