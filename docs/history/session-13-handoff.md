> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-13-handoff (1).md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Handoff Summary: LaunchpadHQ — Session 13 → Session 14

**Who I am:** Zach Stevenson. Solo dev, building LaunchpadHQ — a curated AI platform discovery site for beginners. Live at launchpadhq.io.

**Read alongside:** `Claude-Fable-5-Session-Handoff.md` (canonical merge order + the 6 Fable branches) and `session-12-handoff.md` (the first half of the merge sequence). This session finished the merge sequence those docs laid out.

---

## What this session was

The back half of the merge sequence. Goal: merge the remaining three Fable branches (discover-filters, moderation-email, jasper-dedup), then the held vertical commit. We merged **all three remaining branches** — the full six-branch Fable sequence is now complete and on main. The held vertical commit `9edda0fa` was **not** started (next session's substantive quiz work).

Branch 5 (moderation-email) ate most of the session because verifying it locally surfaced a cascade of pre-existing local-environment problems that had to be diagnosed and fixed before the interstitial could be tested. All resolved. Two of those fixes are durable improvements beyond this branch (UTF-8 env file, dev-branch DB separation, rotated credential).

**Net result:** main at `e3b55d76`, all six Fable branches merged (#15–#20), no rollbacks, no database mutations. Plus three infrastructure fixes banked: credential rotated, `.env.local` re-encoded to UTF-8, local dev pointed at a dedicated Neon dev branch.

---

## Part 1 — Branch 4: `feature/discover-filters` (PR #18, merged)

Merged clean. Difficulty chip row (All/Beginner/Intermediate/Advanced, **Advanced includes EXPERT**) + "Has free tier" chip on Discover, plus query-param whitelisting (`?cost`/`?difficulty` gated against constants before hitting Prisma, so junk like `?cost=banana` no longer 500s).

- Single file: `src/app/(app)/discover/page.tsx` (+83/−8). No quiz overlap, clean merge-up.
- Gates green (typecheck + build).
- Preview-verified: mobile chip wrapping at 320/375px (clean, no horizontal scroll), `?difficulty=advanced` surfaces EXPERT tools, `?cost=free-tier` → FREE+FREEMIUM, `?cost=banana` no crash, combined params filter + highlight correctly.
- Merged at `d0ebd291`.

`?difficulty=advanced` including EXPERT is a deliberate product call — keeps powerful tools reachable for a beginner site rather than hiding them. Confirmed correct on preview.

---

## Part 2 — `gh` CLI now installed

`gh` (GitHub CLI) is installed and authenticated (`stevensonzj-ai`, scopes include `repo` + `workflow`, v2.94.0). The Session 12 carry-forward is done. **One gotcha learned:** the install needed a full **Cursor restart + fresh Claude Code session** before `gh` appeared on PATH — `where.exe gh` returning "not found" in an existing session was a stale-PATH artifact, not a missing install. From #18 onward, Claude Code drives PR create + squash-merge directly via `gh` (no more manual browser-compare merges).

Workflow per branch now: `gh pr create` → **stop** → Zach does the Vercel cross-check (Source commit == PR newest == green) → tell Claude Code to `gh pr merge N --squash --delete-branch=false` → `git pull main` → Zach confirms production deploy.

---

## Part 3 — Branch 5: `feature/moderation-email` (PR #19, merged) — the long one

The deliverable: Resend email wiring (`src/lib/email.ts`), HMAC-SHA256 TTL tokens (`src/lib/moderation-token.ts`), `GET/POST /api/moderation`, notification hooks on prompt/discussion/reply submission routes. 8 files, +676/−2. Merged at `52931f94`.

### The POST-confirm interstitial (built this session, before merge)

The branch originally mutated submission status on **GET** — the known flag (email link prefetchers/scanners, including Gmail/Workspace, could auto-trigger approve/reject). We **chose to build the interstitial before merging** (Option B) rather than merge the GET-mutate version and follow up — fewer total cycles, and the local test exercises the final design.

What was built (Claude Code, on the branch):
- **GET** now validates the token, reads the row, runs terminal-state gates, and — if still PENDING — renders a **confirmation page with a button**. No mutation on GET.
- **POST** carries the same token (on its query string, so it reads identically to GET via `searchParams.get`, no `formData()` parsing), **re-validates the token independently from scratch** (signature + expiry + shape — does NOT trust that GET already checked), re-runs read-before-write idempotency, then mutates and renders Approved/Rejected.
- A shared `resolve()` helper holds the common path, returning a discriminated union (terminal response vs. pending payload).
- **Added `escapeHtml`/`truncate`** — the confirm page is the first place this route renders user-submitted content (title + body preview), so escaping is necessary (self-XSS vector aimed at the one person with approve/reject power). Claude Code caught this unprompted. Good catch.
- `page()` helper got an optional 4th `bodyHtml` param (defaults `""`), so existing terminal-state calls are byte-for-byte unchanged.
- `Sentry.flush(2000)` in the `finally` of both GET and POST.

Verified end-to-end **locally** (see Part 4 for why local, not preview): confirm page on GET (not instant action), commit on button POST, replay → "Already reviewed" (idempotency), tampered token → "Invalid link," reject flow works. All passed.

### Known residual (documented, not fixed — fine at scale)
A double-submit race exists (two POSTs between read and write could both pass the PENDING gate). Harmless at single-moderator scale (worst case approve-then-approve no-op, or last-write-wins). Not worth transactional locking now; revisit if multiple moderators are ever added.

### How the moderation flow works (for reference)
User submits (signed in) → saves as PENDING (not public) → email fires to `zach@launchpadhq.io` with content preview + approve/reject magic links → Zach clicks → **confirmation page** (not instant) → clicks button → commits (approve = public, reject = hidden) → replay = "Already reviewed." One email per submission, individual review, Zach is sole gatekeeper. Send failures are **swallowed** (user's submit still succeeds even if email fails) — so email failures are silent; that's where to look if a submission lands but no email arrives.

---

## Part 4 — The local-environment cascade (the part worth understanding)

Testing branch 5 locally surfaced a chain of pre-existing problems. None were bugs in the branch's code — all were local-env issues this task happened to be the first to exercise. Resolved in order:

### 4a — Local dev was running against PRODUCTION
The local `.env` `DATABASE_URL` pointed at the **production** Neon branch (`ep-odd-mud-ajdk8f99`, the Primary/Default compute). Confirmed via Neon console. This means everyday local dev had been hitting live data — a standing risk (a stray migration/seed/script could corrupt prod with no undo). The failed test posts earlier in the session were attempts against prod (rejected by the 401, so nothing landed).

**Resolved:** created a dedicated Neon **dev branch** `dev-local` (`ep-hidden-truth-aj8wfxc2`), child of production (copies schema + data). Pointed local `.env` `DATABASE_URL` at it. This is **permanent** — local dev now never touches production. (A persistent dev branch drifts from prod over time; reset it occasionally if needed.)

- `DATABASE_URL` lives in `.env` (UTF-8), NOT `.env.local`. `.env` holds only `DATABASE_URL`; everything else is in `.env.local`.
- Safety ritual confirmed working: re-ran a read-only host check after the swap to verify `.env` resolved to `ep-hidden-truth` (dev) before any seeding.

### 4b — `.env.local` was UTF-16 LE → the dev server couldn't read ANY of it
The Next.js dev server was reading **nothing** from `.env.local` — confirmed via a temp `[env check]` log showing `MODERATION_SECRET present: false | CLERK_SECRET_KEY present: false`. Root cause: `.env.local` was **UTF-16 LE encoded** (BOM `FF FE`), which Next.js/Turbopack can't parse. This silently explained BOTH the moderation 500 (`MODERATION_SECRET` undefined) AND the Clerk **keyless-mode** local-auth failure (Clerk keys undefined → keyless throwaway instance → "Unauthorized" on posting, the "first user created" toast). One root cause, two symptoms.

The dev server only ever had `DATABASE_URL` because that lives in `.env` (UTF-8). This had been latent for a while — local dev just never exercised a code path needing `.env.local` until now.

**Resolved:** backed up (`.env.local.utf16.bak`) then re-encoded to **UTF-8 (no BOM)** via PowerShell:
```powershell
Copy-Item .env.local .env.local.utf16.bak
$content = Get-Content .env.local -Raw
[System.IO.File]::WriteAllText("$PWD\.env.local", $content, (New-Object System.Text.UTF8Encoding $false))
```
After re-encode: `[env check]` showed `true | true`, the interstitial rendered, and (bonus) local Clerk auth should now work / keyless toast gone. **`.env.local` is now UTF-8** — the historical UTF-16 gotcha is resolved going forward (it was likely created by a PowerShell `>` redirect, which defaults to UTF-16).

### 4c — Credential leak → rotated
A production-format Neon `DATABASE_URL` including the `neondb_owner` password was inadvertently pasted into the planning conversation. Because **Neon roles span branches**, that credential reached production. **Rotated** this session: Neon console → Roles & Databases (on the production branch) → Reset password. Then updated the new connection string in:
- Vercel Production `DATABASE_URL` (delete-recreate, since it's sensitive; set to Production + Preview — Development scope was unavailable, which is fine since local uses `.env` not Vercel's Dev scope). Redeployed production.
- Local `.env` (the dev-local branch string with the new password).

Live site stayed up throughout (warm connections). Rotation complete; the leaked credential is dead.

### Testing approach that worked (since local auth was broken at the time + no prod writes allowed)
Seeded two PENDING discussion rows directly on the **dev branch** + minted valid tokens using the **real** `createModerationToken` function (not a reimplemented HMAC), printing the full approve/reject URLs. This sidestepped the broken Clerk auth (no posting through the UI needed) and stayed off production. Throwaway `scripts/seed-moderation-test.ts` + `scripts/teardown-moderation-test.ts` — both **deleted before merge** (never committed). Teardown ran clean (2 rows deleted from dev branch). Temp diagnostics in `route.ts` all removed before merge (verified: empty `git diff` on the file = back to committed state).

---

## Part 5 — Branch 6: `feature/jasper-dedup` (PR #20, merged)

The simplest merge of the six. Adds one dormant file `scripts/dedupe-jasper-platforms.ts` (+448), touches NO app/schema/runtime code. Next.js never imports `scripts/`, so merging changes nothing the live site runs. Merged at `e3b55d76`.

Script design (for the eventual run): idempotent discovery early-exit (re-run = no-op), `--dry-run` mode, recovery logging before destructive steps, all writes in a single atomic transaction, constraint-collision handling, post-run verification (expects exactly 1 Jasper row remaining).

**⚠️ Footgun for the operator run:** the script **defaults to LIVE**, not dry-run. Running it bare goes straight to live writes (cushioned only by a 5-second countdown). **Pass `--dry-run` explicitly, against a Neon branch, first.** This warning is also in the PR #20 body for the permanent record.

---

## State of the project at end of Session 13

- **Branch:** `main`, synced local + origin. Head is `e3b55d76`.
- **Merged this session:** PR #18 (discover-filters), #19 (moderation-email), #20 (jasper-dedup). All squash-merged, all preview/build-verified, no rollbacks.
- **All six Fable branches now on main:** #15 config-fixes, #16 quiz-scoring-safe, #17 quiz-difficulty-filter-fix, #18 discover-filters, #19 moderation-email, #20 jasper-dedup.
- **Production:** launchpadhq.io running everything through #20. Auto-deploys on merge — confirm latest Production deploy for `e3b55d76` landed.
- **Local dev env (durable changes this session):**
  - `.env` `DATABASE_URL` → permanent Neon **dev-local** branch (`ep-hidden-truth-aj8wfxc2`). Local dev no longer touches production.
  - `.env.local` → re-encoded to **UTF-8** (was UTF-16 LE). Dev server now reads it correctly; local Clerk auth should work.
  - `neondb_owner` Neon password **rotated**; Vercel Production + local `.env` updated.
  - Backup: `.env.local.utf16.bak` exists (the old UTF-16 version) — delete once confident.
- **Backup refs (keep for now, clean up next session):** `backup/discover-filters-premerge`, `backup/moderation-email-premerge`, `backup/jasper-dedup-premerge`, plus the earlier `backup/quiz-scoring-safe-premerge`, `backup/quiz-difficulty-filter-fix-premerge`, `backup/feature/quiz-scoring-fixes` (held vertical commit).
- **Held vertical commit `9edda0fa`** — untouched, still on `origin/feature/quiz-scoring-fixes` + backup ref. Next session's work.

---

## Carry-forward / next session

### Substantive next work: the held vertical commit + verticals decision
1. Cherry-pick `9edda0fa` (legal/healthcare/finance/sales-marketing keyword buckets + picker entries) onto a **fresh** branch off updated main → preview.
2. **Re-check Legal + Beginner on preview** — should now show legal tools with amber "Advanced" badges (not flat-23% filler), thanks to the now-merged difficulty fix + goal-relevance floor.
3. **Make the verticals keyword/category call** (Session 11 Part 3): minimum = keyword scrub (`irs` fires inside "first", `stroke` inside "keystroke", `compliance` catching dev tools, `property`, `pipeline`); cleaner = category-aware matching for the 4 verticals (they map 1:1 to category slugs `legal-ai`, `healthcare-ai`, `finance-real-estate-ai`, `sales-marketing-seo-ai`). Hybrid recommended (category = strong signal, keyword = weak supplement).
4. Then retire the superseded `feature/quiz-scoring-fixes` + backup ref.

### Verification / ops follow-ups (not blocking)
- **Production self-test of moderation** — the one real "verified locally, not yet in prod" gap. Post on the live site, confirm the email lands in Gmail, click the link, confirm the interstitial → approve round-trip works in production. Env vars confirmed present (RESEND_API_KEY, MODERATION_NOTIFICATION_EMAIL, MODERATION_SECRET all in Vercel Production) and `launchpadhq.io` verified in Resend — so it *should* work; this just closes the loop.
- **Jasper dedup operator run** — dormant script on main. Neon branch → `--dry-run` FIRST (defaults to LIVE!) → verify → live. Separate manual step, whenever.
- **`/for-you` QuizCta copy** — still says "5 quick questions," should be "4" (Q5 removed, 4-question quiz live). One-line fix, carried since Session 11.
- **Branch/backup-ref cleanup** — six backup refs + the merged feature branches + the stale `feature/quiz-anon-flow-fix` (already merged #14) can be retired once confident in the merges. Do at *start* of next session, fresh head — not the tail of a long one.
- **Delete `.env.local.utf16.bak`** once confident the UTF-8 re-encode is clean.

### Future (parked — discussed this session)
- **AI auto-moderation** — Zach's instinct: auto-approve obvious-good, auto-reject obvious-spam, escalate the ambiguous middle. Right architecture, **wrong time** — build it when manual review becomes a chore (you'll have real submission data to design against by then). Design notes: three-bucket classifier; asymmetric thresholds (aggressive auto-approve, conservative auto-reject — silently killing a legit post is worse than an unnecessary escalation); keep an audit log of auto-actions; layer it in FRONT of today's email flow (the email-with-magic-links becomes the escalation tier, not the only path). Already in roadmap doc as a future direction.

### Still parked from prior sessions
- **Tutorials** — the main greenfield substance build (Tier 1 prompt starter kits, all ~170 platforms, free + indexed). Add `lastReviewedAt`/`changelogUrl` schema fields before content production. **This is the big "first" on the substance roadmap** after the verticals work.
- **News feed** — the retention keystone, own design session, built near launch (human-in-the-loop; full automation off the table per brand requirement).
- **Clerk Production instance migration** — still on Development; gates the paywall. (Note: the keyless-mode issue this session was a separate local-env problem, now fixed — it's NOT the same as the Dev→Prod migration, which is still outstanding.)
- **Paywall / LLC** — deferred behind the monetization-ready bar (news + tutorials + personalization). Clerk Billing chosen.
- 15 pre-existing npm vulns (xlsx) — eventually.
- The pg/SSL `sslmode` deprecation warning (cosmetic, fires on any DB-touching build) — note for whenever `pg` is next bumped.

---

## Working style — reinforced this session

- **Verify locally when preview can't reach it, but stay off production to do it.** The whole branch-5 detour was about getting an *honest* test of the interstitial without touching prod. Seeding a dev branch + minting real tokens was the right call over merging on code-review confidence alone — and it surfaced three real env problems we'd otherwise have shipped around.
- **Confirm the DB target before any write — every time.** The read-only host check (`new URL(process.env.DATABASE_URL).hostname`, no credentials printed) caught that local was on production. Run it before seeding, after any `.env` swap. Never assume which branch you're pointed at.
- **A credential that touches the transcript is a credential to rotate.** Neon roles span branches, so a dev-branch password = a production password. Rotated same-session.
- **`gh` needs a full Cursor restart + fresh session to land on PATH.** A "command not found" in an existing session after install is stale PATH, not a failed install.
- **Grab the RIGHT Vercel deployment for the cross-check.** Twice this session the production (`main`) row was grabbed instead of the branch preview. Match BOTH the branch name (`feature/X`) AND the commit hash, and confirm Environment = Preview, before trusting the green.
- **Empty `git diff` is the strongest cleanup proof.** After removing uncommitted diagnostics, an empty diff on the file proves the working tree matches committed state exactly — nothing beyond the diagnostics changed.
- **Push freely, merge deliberately.** Backup ref before each merged-up branch; `--delete-branch=false` on every merge (retire branches deliberately, not at merge time).
- All execution via Claude Code; this chat is planning/review/decisions. Middleware lives at `src/proxy.ts`. No DB-mutating commands in Claude Code — operator runs scripts manually, Neon branch first, `--dry-run` where available.

---

## Product direction — end-of-session discussion (NEW — sets the roadmap from here)

With the Fable merge sequence done, the conversation turned to "what's next for the website." Zach named: tutorials, news, a help/contact section, pre-launch "free now, paid coming" messaging on the homepage + pricing page, a future pricing conversation, and an aesthetics pass — specifically a **Discover-page filter redesign** (the current page stacks 5 control rows — 20-category chip wall + cost + difficulty + app/access + sort — above any tools; looks cluttered, especially on mobile).

**The decision reached: Tutorials is the next real work, NOT the filter redesign.** Reasoning (this is the important part to hold onto):

- The strategy doc's monetization-ready bar is **news + tutorials + personalization**; two of three are greenfield. Tutorials is explicitly **"BUILD FIRST"** on the product roadmap.
- The strategy doc explicitly warns about the **"defer until the site feels ready" → permanent polishing** trap. A filter redesign is polishing — it makes a working page nicer but moves zero distance toward the monetization bar. It *feels* productive and contained, which is exactly why it's tempting and exactly why it can crowd out substance.
- Tutorials **compounds** (evergreen SEO ranks longer the earlier it's indexed) and **serves existing traffic** (the site already gets Google visitors). It has a real cost-of-delay; polishing doesn't.
- Tutorials is **low-risk and fragment-friendly** (structured content, server-rendered) — fits fragmented newborn-era time better than news (which needs a full design session + human-in-the-loop pipeline + near-launch timing).

**The filter redesign is NOT dismissed** — the Discover page genuinely is cluttered, and a control panel burying the product on a beginner site is more than cosmetic. It's a legitimate, well-scoped, low-risk task (one page, no data/schema/auth). It's just not *first*. Do it as a contained visual win between heavier tutorial work, OR as a single deliberate session with a hard scope boundary if it nags — but don't let it become the pattern of always choosing the polish. (Design notes for when it happens: collapse filters into a single filter bar with a "Filters" button → dropdown on desktop / slide-up sheet on mobile; category selector becomes a dropdown not a 20-chip wall; active filters render as removable pills; **preserve the URL-param shareability hardened in branch 4 / PR #18**.)

### The agreed sequence from here

1. **Tutorials planning session (NEXT).** Planning, not build. Open decisions to resolve before any Claude Code work: the `lastReviewedAt`/`changelogUrl` schema migration (template-lock vs. add-fields-first — still unresolved from prior sessions); tier structure (Tier 1 prompt starter kits for all ~170 platforms free+indexed; Tier 2 written quick-starts ~20–25 platforms; Tier 3 evergreen concepts); the fixed template; how the free/paid split renders; the SEO/server-rendering approach. Low-energy-friendly (a discussion, not a marathon build). This planning session is the actual unblock that turns "tutorials, someday" into a concrete build plan.
2. **Pre-launch messaging + help/contact (small, fold in opportunistically).** Homepage "create a free account, paid coming" note; pricing-page wording for the free period; a help/contact page (contact = `zach@launchpadhq.io` or a Resend-backed form, optional short FAQ). **Messaging caution:** the paywall is deferred behind the monetization bar with NO fixed date — phrase any "coming soon" vaguely enough not to promise a timeline. Consider "free during early access" framing on the pricing page rather than showing a $9 price for something unenforced.
3. **The held vertical commit + verticals decision** (last loose end from the Fable sequence — see carry-forward above). Small-to-medium; clears the deck of the final quiz item.
4. **Tutorials build** — its own dedicated sequence after planning. The main substance work.
5. **News feed** — later, own design session, near launch (human-in-the-loop; full automation off the table per brand requirement).
6. **Pricing conversation** — a strategy session for when tutorials + news are real and the paywall flip is closer. Zach flagged wanting to talk it through.

**Filter redesign** slots in as a contained task whenever a natural gap appears — not first, scoped tight when it happens.

**The discipline to protect:** the monetization bar is the thing; build toward it. The pull toward polish (the redesign) over substance (tutorials) is the exact risk the strategy doc names. The redesign isn't wrong to want — but if it goes first, the honest question is whether tutorials then follows, or whether the next polish item appears and tutorials stays perpetually "next."

---

## Starting Session 14 — order of operations

1. **Get current.** `git checkout main && git pull origin main && git fetch origin --prune`. Confirm main at `e3b55d76` (or later if a prod deploy nudged it).
2. **Branch/backup-ref cleanup** (fresh head, nothing mid-flight): retire the six `backup/*-premerge` refs, the merged feature branches, and stale `feature/quiz-anon-flow-fix`. Delete `.env.local.utf16.bak`. Keep `backup/feature/quiz-scoring-fixes` until the held vertical commit is dealt with.
3. **Tutorials planning session** — the agreed next focus (see "Product direction" above). Work the open decisions (schema migration, tier structure, template, free/paid rendering, SEO approach) into a concrete build plan. This is planning/design, not a Claude Code build yet.
4. **As natural gaps allow** (don't crowd out the tutorials planning): the held vertical commit + verticals keyword/category decision; pre-launch messaging + help/contact page; `/for-you` QuizCta "5"→"4"; production self-test of moderation.
5. **Then:** tutorials build (own sequence), then News (own design session, near launch). Pricing conversation when the flip is closer.

**Note on reference docs:** `business-strategy-reference.md` and `product-roadmap-reference.md` live only in Claude.ai project knowledge (not in the repo — Claude Code can't see them). The product-direction decision above (tutorials-first over filter-redesign, the agreed sequence, messaging cautions) is worth folding into `product-roadmap-reference.md` via the Claude.ai UI when convenient, so the strategy docs stay ground-truth.
