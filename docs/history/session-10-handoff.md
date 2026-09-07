> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-10-handoff.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Handoff Summary: LaunchpadHQ — Session 10 → Session 11

**Who I am:** Zach Stevenson. Solo dev, building LaunchpadHQ — a curated AI platform discovery site for beginners. Live at launchpadhq.io.

**Context correction (supersedes older handoffs):** Paternity leave is **over** — son born end of April 2026. The "paternity leave starting soon / front-load before going absent" framing in Session 8–9 handoffs is **stale**. No hard absence cliff. But fragmented newborn-era time means the "incremental, well-reviewed changes" discipline matters more, not less.

---

## What this session was

A long, multi-part session that ran across more than one sitting. It started as **strategy/planning** (monetization, LLC, payments architecture), moved into **execution** (quiz fixes), and then got **tangled** when a parallel Claude Fable 5 coding sprint interleaved with a production deploy that hadn't landed. It was untangled cleanly at the end.

**Net result:** one funnel-critical fix is **live in production**; six Fable-built branches are **backed up to origin, unmerged, awaiting methodical review**; the repo is synced and clean; and there's a clear runway for Session 11. Nothing was lost, nothing broke, no database was touched.

---

## Part 1 — Strategy & planning (no code)

Captured in two living reference docs created this session: `business-strategy-reference.md` and `product-roadmap-reference.md`. Highlights:

- **Paywall + LLC deliberately deferred** — not a delay, a decision. Forming the LLC now is pure compliance overhead with no benefit pre-revenue. The deferral is **bounded** by the monetization-ready bar (below) so it doesn't drift into permanent polishing.
- **Monetization-ready bar (the definition of "ready to charge"):** (1) For You **news feed** working, (2) **tutorials** first batch live, (3) **personalization** solid. Three things, not the whole vision.
- **Gating philosophy (locked):** gate interaction/personalization/depth, **never the catalog's existence or browsability**. A full-site gate was explicitly considered and **rejected** (kills SEO funnel, wrong for beginners, deletes top-of-funnel rather than converting it). Access model: **read freely → free account to contribute → pay for news + deep tutorials + personalization.**
- **Payments architecture (decided): Clerk Billing, not custom Stripe.** Removes the fragile webhook/sync layer. Free-trial support confirmed (per-plan, 1-day min, card required up front, auto-converts). Caveats: Clerk Billing is in Beta (pin SDK versions); plans live in Clerk not Stripe; a dev-instance Stripe account can't be used for production (ties to the Clerk Production migration P0).
- **LLC → payments chain:** file Form 205 (SOSDirect, ~$300; Texas processing fast right now) → EIN (free, same-day) → business bank account → production Stripe → flip. Critical path is short and mostly operator-side; nearly all coding runs off it. Registered-agent decision still owed (service ~$100–300/yr keeps home address private — recommended).
- **Fable 5 positioning:** right tool for large async batch jobs (e.g. deferred Phase 2 catalog research across ~170 platforms, big migrations). Opus stays the default for surgical, human-in-the-loop, diff-review work.

---

## Part 2 — Google Search Console

- Set up as a **domain property** (`sc-domain:launchpadhq.io`) via Cloudflare DNS TXT verification — confirmed verified, data processing (24–48h to populate).
- Set up under `zach@launchpadhq.io` (Workspace account), not personal Gmail.
- **GA4 deemed optional** — overlaps heavily with existing Vercel Analytics, heavier setup, privacy baggage. GSC fills the real gap (which search queries bring people in = the demand signal).
- When data populates: **Performance** report (queries/rankings) is the one to read together — it informs what to build tutorial depth around. **Indexing → Pages** is the SEO early-warning system. Consider submitting a sitemap if one exists.

---

## Part 3 — Quiz work (recon + two original branches)

**Read-only recon (Claude Code) established ground truth:**
- **Prompt library and discussions already implement the read-freely / sign-in-to-post access model.** This was imagined work that already exists. Public GET, 401 on POST. The remaining gap is *operational* (moderation notifications + rate limiting), not the access model.
- Confirmed route auth state: `/quiz`, `/platform/*` (incl. prompts + discussions) public for viewing; posting auth-gated; `/for-you` auth-gated.
- Quiz scoring mapped: free-text Q5 (`tasks`) is **inert** (saved, never scored); 3 goal buckets (`automation`, `education`, `data_analysis`) defined but unreachable from picker; enterprise budget wrongly excludes FREE/FREEMIUM; the 5 newer verticals have no `goalKeywords` entries; scorer is keyword-on-use-case-text, not category-aware.

**Branch `feature/quiz-anon-flow-fix` — DONE, MERGED, LIVE.**
- Fixed the funnel-critical bug: signed-out quiz-takers were bounced to auth-gated `/for-you`, lost all answers (100% leak at the conversion moment).
- Fix: public `/quiz/results` route renders recommendations immediately for anon users (value first) with a "create a free account to save these" CTA; on sign-in, answers survive the auth round-trip and persist, landing on a populated For You.
- **Load-bearing risk tested and cleared:** the fix depends on `sessionStorage` surviving the Clerk auth round-trip. Verified live — **the Clerk instance uses 6-digit in-page code entry, NOT magic links**, so the user stays in the same tab and the stash survives. (If Clerk verification ever changes to magic-link, this breaks; fallback would be localStorage + 24h expiry.)
- Verified end-to-end on preview AND on production (incognito). **Merged (commit `b47913b`), deployed, confirmed live.**

**Branch `feature/quiz-scoring-fixes` — PARKED, and now SUPERSEDED (see reconciliation note below).**
- 4 commits: remove dead Q5, expose 3 orphaned buckets + 2-col grid, enterprise-budget fix, vertical keyword buckets.
- The vertical commit (`9edda0fa`) surfaced **the difficulty-filter problem**: Legal + Beginner returned 12 tools, none legal, all tied at a flat 23%. The scorer **hard-filters on `difficultyLevel`** before scoring, excludes INTERMEDIATE/ADVANCED vertical tools, then pads with baseline-scored filler. Goal selection had no effect. The **difficulty-filter decision was owed** — and Fable has since built a fix for it (see Part 4).

---

## Part 4 — The Claude Fable 5 sprint (separate session — see its own handoff doc)

A **separate** Fable 5 autonomous session ran a bulk coding brief (8 tasks). **Its full handoff is a separate document** — read it alongside this one. Summary and review notes here.

**Safety posture — clean.** Per Fable's compliance log: no merges/pushes to main or origin, no database writes, the Jasper script never executed, `.env.local` untouched, only `resend` installed, branch-before-write held throughout. Branch-per-task discipline worked exactly as intended — a pile of reviewable branches, nothing contaminated.

**The six branches it produced (all now backed up to origin, all unmerged):**
1. `feature/config-fixes` — adds `typecheck` script (`tsc --noEmit`); correctly did NOT apply the Sentry "fix" (the brief's premise was inverted for SDK v10 — the existing config is correct).
2. `feature/quiz-scoring-safe` — the 3 SAFE scoring commits (Q5 removal, expose 3 goals + 2-col grid, enterprise-budget fix), cherry-picked clean.
3. `feature/quiz-difficulty-filter-fix` — **the difficulty-filter fix we owed a decision on.** Fetches all difficulties; above-level tools take a 35% score penalty (×0.65) and render a small amber "Advanced" badge; if top score < 15%, shows an honest empty state ("We don't have strong matches… try Discover"). **This is a design decision Fable made — it needs owner sign-off, not just review.**
4. `feature/discover-filters` — added the difficulty chip row (All/Beginner/Intermediate/Advanced, Advanced includes EXPERT) + a "Has free tier" chip in the existing cost row. Hardened query against bad params.
5. `feature/moderation-email` — Task 6. Stateless HMAC-SHA256 TTL tokens (`moderation-token.ts`), `email.ts` wrapper, `GET /api/moderation` with `Sentry.flush` before returns; hooks into prompts/discussions/replies. Needs `MODERATION_SECRET` env var set.
6. `feature/jasper-dedup` — Task 6 P0. Script written, **never executed**; discovers duplicates at runtime, has `--dry-run`. Least-verified artifact (no DB access). Owner process: Neon branch → dry-run → verify → live on branch → production.

Also: `backup/feature/quiz-scoring-fixes → 9edda0fa` (backup ref for the held vertical commit). Task 7 (duplicate sidebar/main bug) confirmed **non-existent** — already fixed by an earlier redesign; P0 item can be checked off.

**Four things to scrutinize before merging (from review):**
1. **GET-mutation moderation links (real concern).** Approve/reject happen on GET — email scanners/prefetchers could auto-trigger actions. Softened by idempotency + 24h TTL. Not a merge-blocker at zero volume, but switch to a **POST-confirm interstitial** before driving any public submissions.
2. **`?difficulty=advanced` now includes EXPERT** — a behavior widening. Probably right for a beginner site (keeps powerful tools reachable), but it's a product call — verify on preview.
3. **Email sender constant** is `notifications@launchpadhq.io` — confirm it matches the Resend-verified domain (Session 9 scoped Resend to `send.launchpadhq.io`) or emails won't send.
4. **Jasper script** — never skip the dry-run; first contact must be read-only on a Neon branch.

**Suggested merge order (both reviews agree):** config-fixes → quiz-scoring-safe → quiz-difficulty-filter-fix → discover-filters → moderation-email (set `MODERATION_SECRET` first) → jasper-dedup → then cherry-pick the held `9edda0fa` onto a fresh branch → preview → evaluate Legal+Beginner.

---

## Part 5 — The git/deploy tangle and how it resolved (READ THIS)

This is the part most worth understanding, because it's where the session got confusing — and it covers both **the deploy that initially didn't happen** and **the merges we deliberately did NOT do.**

### 5a — The production deploy that didn't fire (now resolved)
- After merging `feature/quiz-anon-flow-fix` to main, **GitHub said "successfully deployed" but no production deployment appeared in Vercel** — commit `b47913b` wasn't in the deployments list, and launchpadhq.io still served the old quiz.
- Red herrings ruled out: it was NOT the Vercel Production Branch setting (correctly set to `main`), NOT the status filter, NOT a failed build. The GitHub "successfully deployed" line was pointing at an **old preview**, not a production build. The squash-merge simply didn't trigger a production deploy — a one-off.
- **Resolution:** pushed an empty commit to main (`git commit --allow-empty -m "chore: trigger production deploy"` → `git push origin main`). This fired a real **Production** deployment (commit `5bfc387`), which **confirmed auto-deploy from main works** — so this was a one-off hiccup, NOT a broken integration. No webhook investigation needed. Anon-flow fix verified live in incognito afterward.

### 5b — The pre-Fable git cleanup (no loss, but a lesson)
- Before the Fable sprint, a "clean the tree" step ran `git checkout -- .` (reverted ~27 **tracked** files — fully recoverable, no loss) and `git clean -f scripts/ src/lib/` (permanently deleted two **untracked** scratch files: an early `moderation-token.ts` and a Jasper script).
- **Nothing was actually lost** — Fable re-created proper versions of both on its branches. But the lesson stands: **`git clean -f` on untracked files has no undo.** Before `git clean -f`, if any untracked file has a real-looking name, move it aside or commit it to a scratch branch first — don't `-f` delete. (Playbook addition.)

### 5c — What we deliberately did NOT do today (the restraint)
This is the "push/merge we didn't do," and it's intentional:
- **Did NOT merge any Fable branch.** All six stay unmerged, backed up on origin, awaiting methodical per-branch review next session.
- **Did NOT merge the old `feature/quiz-scoring-fixes` branch** (it's superseded — see reconciliation note).
- **Did NOT make/accept the difficulty-filter design decision** — Fable built a reasonable version; it needs a real look + sign-off, not a blind merge.
- **Did NOT push tired.** Explicit decision to stop after the deploy rather than start merging six branches at the tail of a long, tangled session.

### 5d — What we DID do for safety
- Synced local main to origin (`git pull origin main` — fast-forwarded to `b47913b`).
- **Backed up all six Fable branches to origin** (six clean `git push origin <branch>` — push ≠ merge; pure insurance so nothing lives only on the local disk).
- Triggered + verified the production deploy.

**The clean mental rule going forward: push freely (it's just backup), merge deliberately (it's the live gate).**

---

## Reconciliation note — overlapping quiz branches (IMPORTANT for Session 11)

There are now TWO overlapping sets of quiz-scoring branches. Don't double-merge.
- **OLD:** `feature/quiz-scoring-fixes` (the original 4-commit branch: 3 safe + the problematic vertical commit `9edda0fa`). **Treat as superseded.**
- **NEW (use these):** Fable's `feature/quiz-scoring-safe` (the 3 safe commits, clean) + `feature/quiz-difficulty-filter-fix` (the fix that unblocks verticals) + the held `9edda0fa` (via `backup/feature/quiz-scoring-fixes`, to be cherry-picked onto a fresh branch and evaluated AFTER the difficulty fix is in).

So the path is: merge `quiz-scoring-safe`, merge `quiz-difficulty-filter-fix`, THEN cherry-pick `9edda0fa` and evaluate Legal+Beginner on preview. Retire the old `feature/quiz-scoring-fixes` branch once confirmed redundant.

---

## Decisions locked this session

- **Clerk Billing over custom Stripe.** Trial support confirmed.
- **Gate interaction/personalization/depth, not the catalog.** Full-site gate rejected.
- **Monetization-ready bar = news + tutorials + personalization.** Bounded deferral.
- **Quiz goes all-click** (drop free-text Q5); **anon results-first flow** (value before signup).
- **Enterprise budget includes FREE/FREEMIUM.**
- **Verticals: build-and-evaluate**, not retire (Zach's override) — via curated keywords, not a scoring rebuild.
- **Tutorials before News** (tutorials compound early in SEO; news is a late-built retention engine).
- **Don't merge tired; methodical per-branch review next session.**
- **Push freely, merge deliberately.**

---

## State of the project at end of Session 10

- **Branch:** `main`, synced local + origin. Head is the empty trigger commit (`5bfc387`) on top of `b47913b` (anon-flow merge).
- **Production:** launchpadhq.io running the anon-flow fix. **Verified live.** No rollbacks.
- **PRs merged this session:** #14 (`feature/quiz-anon-flow-fix`, `b47913b`).
- **Branches on origin awaiting review (Fable):** `feature/config-fixes`, `feature/quiz-scoring-safe`, `feature/quiz-difficulty-filter-fix`, `feature/discover-filters`, `feature/moderation-email`, `feature/jasper-dedup`. Plus `backup/feature/quiz-scoring-fixes` (held vertical commit `9edda0fa`).
- **Superseded:** `feature/quiz-scoring-fixes` (old 4-commit branch) — retire after confirming redundancy.
- **GSC:** verified, data processing.
- **Reference docs:** `business-strategy-reference.md` + `product-roadmap-reference.md` exist; **both need a ground-truth update next session** (anon-flow now merged/live; difficulty-filter now built pending sign-off; moderation/Discover/Jasper now built rather than pending).
- **New env var needed before moderation-email merge:** `MODERATION_SECRET` (generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`; add to Vercel + local). `RESEND_API_KEY` + `MODERATION_NOTIFICATION_EMAIL` already in Vercel.

---

## Starting Session 11 — order of operations

1. **Get current (read-only first).** Fresh PowerShell, in project dir: `git checkout main`, `git pull origin main`, `git fetch origin`, `git branch -a`. Confirm main is current and all six Fable branches + backup ref are on origin.
2. **Read both handoffs** (this one + the Fable 5 session handoff) and skim the two reference docs.
3. **Update the two reference docs to ground truth** (anon-flow merged/live; difficulty-filter built; moderation/Discover/Jasper built). Quick.
4. **Make the difficulty-filter decision.** Review `feature/quiz-difficulty-filter-fix` on its preview — evaluate whether Fable's 35% penalty / 15% empty-state threshold / Advanced-badge approach is right. This is a *decision*, not just a review.
5. **Methodical per-branch merges**, in the agreed order: config-fixes → quiz-scoring-safe → quiz-difficulty-filter-fix → discover-filters → moderation-email → jasper-dedup. For each: diff review → Vercel preview verify → merge. Specific watch-items:
   - `quiz-scoring-safe`: expect a mechanical conflict with the (already-merged) anon-flow changes in `quiz-client.tsx` — **eyeball it, keep both sides** (they're orthogonal: anon-flow's redirect split + scoring's header/Q5 changes).
   - `moderation-email`: set `MODERATION_SECRET` first; run the full round-trip on preview (submit → email → approve → "already reviewed" on replay → tamper token → "invalid"); note the GET-mutation-link follow-up.
   - `jasper-dedup`: Neon branch + `--dry-run` first, read the output, never skip it.
   - Confirm the email sender `notifications@launchpadhq.io` matches the Resend-verified domain before relying on it.
6. **After scoring-safe + difficulty-filter are merged:** cherry-pick the held `9edda0fa` onto a fresh branch → preview → evaluate Legal+Beginner (should now show legal tools with Advanced badges, not flat-23% filler). Retire the old `feature/quiz-scoring-fixes`.
7. **Near-term follow-ups (not blocking):** GET→POST moderation interstitial before driving public submissions; `/for-you` QuizCta still says "5 quick questions" (→ 4); 15 pre-existing npm vulns (xlsx) eventually.

After all that, the substance roadmap resumes: **Tutorials first** (the main greenfield build), then **News** (its own design session, near launch).

---

## Working style — reinforced this session

- **Push freely, merge deliberately.** Pushing a branch is backup; merging to main is the live gate. The only consequential action is the merge.
- **Finish-and-verify one workstream before opening another in the same repo.** The whole tangle came from interleaving the anon-flow merge with a Fable sprint without a clean handoff between them. Sequence them.
- **Don't merge tired.** Merging is consequential; do it with a fresh head.
- **`git clean -f` is the one git op with no undo.** Inspect untracked files (`git clean -n`) and move real-looking ones aside before any `-f`.
- **Verify deploys from the deployments list, not GitHub's green checkmark.** Catching that `b47913b` was missing from Vercel is what surfaced the stuck deploy.
- **Autonomous sessions produce work; you (not the session) judge whether it's acceptable.** The handoff + diff review is the authority, not the session vouching for itself.
- **All execution still goes through Claude Code / autonomous sessions; this conversation is planning, prompt-drafting, review, decisions.** Middleware lives at `src/proxy.ts`, never `middleware.ts`.
