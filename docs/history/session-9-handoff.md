> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-9-handoff.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Handoff Summary: LaunchpadHQ — Session 9 → Session 10

**Who I am:** Zach Stevenson. Solo dev, building LaunchpadHQ — a curated AI platform discovery site for beginners. Live at launchpadhq.io. Paternity leave starting soon. Currently the only active user of the site.

---

## What this session was

Session 9 executed the **Session 9 Addendum (admin visibility & email infrastructure)** — the parallel ops/infrastructure workstream, not the catalog content work. It spanned two calendar days (a chunk done one day, the rest plus verification ~24 hours later). The goal was to stand up operational visibility and email infrastructure before traffic arrives. Most of the addendum is now done; the moderation email flow (the main build) is the remaining piece.

Two PRs merged to main this session: analytics (#12) and Sentry (#13).

---

## What got done

### Task 1 — Vercel Analytics + Speed Insights ✅
- Both enabled in the Vercel dashboard (free tier).
- Claude Code added `<Analytics />` and `<SpeedInsights />` to `src/app/layout.tsx`, importing from the `/next` App Router subpath (verified correct over the bare `/react` path).
- Packages: `@vercel/analytics ^2.0.1`, `@vercel/speed-insights ^2.0.0`.
- Merged via PR #12 (`aa6f7255` on main).
- **Confirmed live 24h later:** 4 visitors, 5 page views, 2 referrals from google.com already showing.

### Task 2 — Clerk dashboard bookmark ✅ (with a flag)
- Bookmarked the Clerk overview/users view.
- **Flag carried forward:** the site is still on Clerk's **Development instance** — there is no Production instance yet. Confirmed via the instance switcher (only "Development" + "Create production instance"). This is a known gap from prior sessions and must be addressed before paywall launch. Set aside deliberately; it deserves its own focused task, not a mid-session detour.

### Task 3 — Google Workspace ✅
- `zach@launchpadhq.io` is live. Confirmed sending and receiving 24h later (test email arrived).
- **Family-group snag (worth remembering):** the personal Gmail account (address redacted) is in a Google **Family Group** managed by a family member, with two others also in it — almost certainly tied to **YouTube TV**. Google blocks custom-email upgrades for family-group members. Rather than leave the group (which would disrupt the shared YouTube TV), Zach created a **dedicated new Gmail account** to own the Workspace subscription. That new account is the Workspace owner/admin; `zach@launchpadhq.io` sits on top of it. Day-to-day this means switching Google accounts to reach Workspace admin.
- Plan: Business Starter, **$8.40/mo** (the addendum's "$7" was stale; price has risen).
- DNS handled via Google's automatic Cloudflare authorization (MX ×5 + SPF on root). DKIM (2048-bit, `google._domainkey`) added manually in Cloudflare. DMARC added manually (`_dmarc`, `v=DMARC1; p=none; rua=mailto:zach@launchpadhq.io`).

### Task 4 — Resend ✅
- Domain `launchpadhq.io` added; **verified** (confirmed 22h after adding).
- DNS via Resend's automatic Cloudflare authorization. **No SPF merge needed** — Resend scoped everything to the `send` subdomain (MX on `send`, DKIM on `resend._domainkey`, SPF TXT on `send` not root). This sidestepped the SPF-merge complexity the addendum warned about. Cleaner outcome than planned.
- API key created: **send-only** permissions, scoped to `launchpadhq.io`. Named `launchpadhq-production`.

### Task 5 — Sentry ✅ (this is where the session went long)
- Account created under `zach@launchpadhq.io`, US data region, org `launchpad-hq`, project `javascript-nextjs`. GitHub repo connected (only-select-repositories → `launchpad-hq`).
- Wizard could not run through Claude Code's non-interactive shell (the TUI needs a real TTY; it installed the SDK then exited before writing config). **Resolved by running the wizard in a standalone interactive PowerShell terminal**, then handing the diff back to Claude Code for review. This is the same "interactive CLIs can't run through Claude Code" lesson from prior sessions — reconfirmed.
- Wizard choices: tunnel **No**, React annotation **No**, example page **No**, tracing **Yes**, session replay **No**, logs **No**, CI **Yes** (Vercel), MCP server **No**.
- **PII opt-out:** changed `sendDefaultPii: true` → `false` in all three init files before commit (consistent with the site's privacy stance). Claude Code flagged this; good catch.
- SDK v10.54.0, files: `src/instrumentation.ts`, `src/instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`, `src/app/global-error.tsx`, plus `withSentryConfig` wrap in `next.config.ts` and `.env.sentry-build-plugin` (gitignored).
- Merged via PR #13 (`cae5866d` on main) after a trivial `package-lock.json` rebase conflict against the analytics PR — resolved by `npm install` regen + `--force-with-lease`.

#### The Sentry "it's not capturing" rabbit hole (and the resolution)
After deploy, Sentry kept showing the onboarding "waiting for first error" screen. Long diagnostic path. What actually happened and what we learned:

1. **Vercel env var casing bug.** The Sentry vars had been added with wrong casing (`Sentry_auth_token`, `Sentry_DSN`) instead of all-caps. Vercel env vars are **case-sensitive**. Also `NEXT_PUBLIC_SENTRY_DSN` was missing entirely, and `Resend_API_Key` had the same casing issue. **Vercel will not let you rename a key or reveal a sensitive value** — had to delete and re-create. Re-created correctly as `SENTRY_AUTH_TOKEN`, `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`, `RESEND_API_KEY`. (Note: the DSN is hardcoded in the config files by the wizard anyway, so the env DSN vars are somewhat redundant for runtime — but correct casing matters for the auth token used in source-map upload.)
2. **The test route was never on production.** A temporary `/api/sentry-test` route was created on a `test/sentry-verification` branch but only ever hit on the **preview** deploy. So `launchpadhq.io/api/sentry-test` was 404; the 500 we saw was on the preview URL.
3. **Vercel function logs proved the error fired** server-side on the preview (a 500 with the expected stack trace) — but it still didn't reach Sentry from a bare `throw`. Two reasons surfaced: (a) `onRequestError` for thrown route-handler errors on the Node runtime is a documented Next.js/Sentry rough edge, and (b) **on Vercel serverless, the function can freeze the instant the response returns, dropping the in-flight Sentry HTTP request.**
4. **Resolution — manual capture + flush.** Rewrote the test route to `Sentry.captureException(e)` then `await Sentry.flush(2000)` then return 200. Hit the preview URL → `{"captured": true}` → event landed in Sentry within seconds. In fact **two** events showed up: the manual one, and the *original* unhandled throw from ~13 min earlier (marked "Unhandled"). So Sentry had been working the whole time — events were arriving, just delayed/slow-to-surface and masked by the onboarding screen and refresh timing.
5. **Cleanup:** test route deleted, `test/sentry-verification` branch deleted locally + remote, confirmed the route never merged to main.

**Verified working:** both automatic (unhandled) and manual capture flow through. Source map upload confirmed in the Vercel build logs (uploaded to `launchpad-hq / javascript-nextjs`).

---

## Decisions locked in this session

- **Dedicated Gmail owns Google Workspace.** Because of the Family Group / YouTube TV constraint, Workspace is owned by a new standalone Gmail, not the personal account. `zach@launchpadhq.io` is the working address. Don't try to "fix" this by leaving the family group without checking with the family-group owner first.
- **Resend scoped to `send` subdomain — no SPF merge.** Root-domain SPF stays Google-only (`v=spf1 include:_spf.google.com ~all`); Resend's SPF lives on `send`. Future transactional senders should follow the subdomain pattern to avoid the single-SPF-record merge problem.
- **`sendDefaultPii: false`** for Sentry — deliberate, consistent with the platform's honest-privacy editorial stance.
- **`tracesSampleRate: 1` left at 100% for now.** Fine at ~0 traffic; full visibility is worth more than quota right now. **Drop to ~0.1 before public launch.**
- **DSN hardcoded in config files is fine** — it's a public client identifier, ships in the browser bundle regardless. Not a secret.
- **Test routes never reach production.** The verification route was deliberately kept off main.

---

## Things to fix / follow up (newly surfaced this session)

- **`next.config.ts` Sentry options are misplaced.** `automaticVercelMonitors` and `treeshake` are nested under a `webpack:` key, but they're top-level keys in `SentryBuildOptions`. As written they're **silently ignored**. This does NOT affect runtime error capture, but it means: (a) automatic Vercel cron monitors aren't actually instrumented, and (b) debug-log tree-shaking isn't happening. Worth a small fix commit. (Note: `automaticVercelMonitors` reportedly doesn't work with App Router route handlers anyway, which is how the planned crons would be built — so that one may be moot.)
- **`tracesSampleRate: 1` → 0.1** before public launch (all three init files).
- **`SENTRY_*` env vars are Production-only**, not Preview. Fine for now; if you want Sentry capturing from preview deploys too, add them to Preview. (Runtime capture works regardless because the DSN is hardcoded; the env vars mainly matter for the build-time auth token.)
- **Clerk Production instance migration** — still outstanding, still gating paywall launch.
- **Speed Insights cold-start data point:** FCP/LCP showed ~11s on the first data point — almost certainly a cold Vercel serverless start with n=1. Watch as real traffic accumulates; don't over-react to the single sample, but don't ignore it either.

---

## Still open from the addendum

### Task 6 — Moderation email notification flow (NOT DONE — the main remaining build)
Prerequisites are now in place (Resend verified, `RESEND_API_KEY` + `MODERATION_NOTIFICATION_EMAIL` in Vercel). Scope, per the addendum:
- Install `resend`, create `src/lib/email.ts` (typed `sendEmail()` + `sendModerationNotification()`).
- Hook into the existing pending-submission flow (Claude Code should verify that flow is intact on recon).
- HMAC-signed approve/reject magic-link URLs → `/api/admin/moderate?token=...&action=...&id=...`.
- API route validates signature, performs action, returns a plain confirmation page.
- **Open design questions:** single-use vs. TTL tokens; idempotency on double-click; confirmation-page UX (plain HTML is fine for v1).

### Task 7 — Strip personal Gmail from notification paths (NOT DONE)
Quick Claude Code grep for any code paths emailing the personal Gmail (Stripe webhooks, etc.); swap to `zach@launchpadhq.io`. Can fold into the Task 6 recon pass.

### DNS hygiene note (from the addendum, still worth doing)
Take a screenshot of the final Cloudflare DNS panel and save it to project knowledge. By now the zone has: Vercel A/CNAME, Google MX ×5 + root SPF + `google._domainkey` DKIM + `_dmarc` DMARC, and Resend's `send` MX + `send` SPF + `resend._domainkey` DKIM. A known-good reference snapshot is cheap insurance.

---

## Still open from earlier sessions (unchanged)

**Catalog content (the other workstream — untouched this session):**
- Quiz `goalKeywords` investigation (read-only) for the five new verticals — recommended first task whenever the content track resumes.
- Phase 2 catalog research (Batches 1–3) per CLAUDE.md editorial principles.
- Phase 3 Excluded Platforms page — gated on attorney boilerplate review.

**Carry-forward (ready to do):** difficulty filter on Discover, bookmark coverage audit, cross-axis color collisions, full manual test checklist.

**Strategic/business:** LLC formation (~30 days before paywall), pricing validation, premortem.

**Tutorial track:** finalize quick-start template and/or run the `lastReviewedAt` / `changelogUrl` schema migration.

**Tech debt (CLAUDE.md):** `typecheck` script, react-query adopt-or-remove, `Prompt.author` cleanup, unbounded favoriteIds queries, Discover `take: 200`, cross-tab favorites desync.

---

## State of the project at end of Session 9

- **Branch:** `main`, synced with origin. `cae5866d` (Sentry #13) is head.
- **PRs merged:** #12 (analytics, `aa6f7255`), #13 (Sentry, `cae5866d`).
- **Branches deleted:** `feat/vercel-analytics`, `feat/sentry-nextjs`, `test/sentry-verification` (all merged or intentionally discarded; test branch never merged).
- **Infrastructure now live:** Vercel Analytics + Speed Insights, Google Workspace (`zach@launchpadhq.io`), Resend (verified, send-only key), Sentry (error + tracing, confirmed capturing).
- **Vercel env vars (correctly cased):** `SENTRY_AUTH_TOKEN`, `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`, `RESEND_API_KEY`, `MODERATION_NOTIFICATION_EMAIL` (+ existing Clerk/DB vars).
- **Production:** launchpadhq.io running the new code. No rollbacks.

---

## Starting Session 10

The infrastructure foundation is in place. Two natural directions:

1. **Finish the addendum:** Task 6 (moderation email flow) is the main remaining build, with prerequisites met. Task 7 (Gmail grep) folds into its recon. This closes out the ops workstream cleanly.
2. **Resume content:** quiz `goalKeywords` investigation → Phase 2 catalog research. This is the bigger long-term value driver.

Smaller follow-ups worth a quick commit regardless: fix the misplaced `next.config.ts` Sentry options, and (closer to launch) drop `tracesSampleRate` to 0.1.

Per the working-style rules: all execution goes through Claude Code. This conversation is for planning, prompt drafting, review, and decisions.

---

## Working style — reinforced this session

- **Interactive CLIs (Sentry wizard) need a standalone terminal**, not Claude Code's `!` prefix. Run them yourself, hand the diff back for review.
- **Vercel env vars are case-sensitive and immutable-by-key.** Get the casing right the first time; sensitive values can't be revealed or copied back out, so save them when you create them.
- **Serverless error capture needs an explicit flush.** When verifying any "fire-and-forget" telemetry on Vercel, `await flush()` before the response returns — otherwise the function can freeze and silently drop the event. This was the whole Sentry red herring.
- **Diagnostic playbook for "telemetry looks broken":** confirm the code path actually executes (Vercel function logs) → confirm it's on the deploy you're actually hitting (preview vs prod) → rule out delivery with a manual capture + flush → only then suspect config. We did these slightly out of order and it cost time.
- **Don't over-trust onboarding "waiting for first error" screens** — events were arriving the whole time; the screen and refresh timing masked it.
