> **ARCHIVE — historical record, not current truth.**
> Exported from the LaunchPad HQ Claude project on 2026-09-07.
> Original project path: `session-9-addendum-admin-ops.md`
>
> This document was accurate when written and may since have been superseded.
> Current truth lives in `START-HERE.md`, `CLAUDE.md`, and the code itself
> (`prisma/schema.prisma`, `src/data/tutorials/types.ts`). Where this file
> disagrees with those, they win.

---

# Session 9 Addendum: Admin Visibility & Email Infrastructure

**Purpose:** Stand up the basic operational visibility and email infrastructure for LaunchpadHQ before traffic arrives. None of this is structurally complex; the value is in doing it now rather than scrambling later. This addendum is intentionally separate from the main Session 8 handoff because it's a parallel workstream (ops/infrastructure), not a continuation of the catalog work.

**Time estimate:** 3-4 hours total, split across operator steps and Claude Code builds.

**Ordering rationale:** Tasks are sequenced by dependency, not topic. Quick toggles first. Then Workspace (DNS work). Then Resend (also DNS work, but assumes Workspace is in place). Then Sentry (depends on Workspace for the account email). Then the moderation email flow (depends on Resend).

---

## Decisions locked in before this session

- **Admin tooling scales with actual volume, not hypothetical volume.** Build the right tool for current scale (≈0 users), not the version for 10,000 users. The data model and API endpoints should be scale-ready; the UI should not be over-built. When email moderation becomes noise, *then* build the dashboard.
- **Skip Cloudflare Email Routing.** It's a forwarder, not a full email system. Google Workspace replaces it entirely.
- **Google Workspace for human email, Resend for transactional email.** Two separate problems, two separate tools. Both will require DNS records on `launchpadhq.io`.
- **User counts come from Clerk's dashboard, not a custom page.** Zero build, already exists. Bookmark it and move on.
- **Sentry over a custom error-logging solution.** Free tier covers the foreseeable future, official Next.js wizard handles the wiring, and the alternative is no production visibility at all.

---

## Task 1 — Vercel Analytics (5 min, operator + 1-line code change)

**Why now:** Analytics doesn't backfill. Every day without it is a day of baseline traffic data not collected. Worth turning on before the paywall ships so there's a clean before/after comparison.

**Operator steps (from phone or laptop):**

1. Log into the Vercel dashboard
2. Select the `launchpad-hq` project
3. Analytics tab → enable Web Analytics (free tier)
4. Optional: also enable Speed Insights (separate toggle, also free, covers Core Web Vitals)

**Code step (Claude Code, ~2 min):**

The toggle alone doesn't collect data — there's a one-line import in the root layout. Vercel's UI gives the exact snippet after enabling. Drop a Claude Code prompt asking it to add the `<Analytics />` component (and `<SpeedInsights />` if enabled) to `src/app/layout.tsx`. Trivial change, low risk, no review needed beyond a Vercel preview check that nothing broke.

**Done when:** Vercel Analytics tab shows incoming pageviews after a deploy.

---

## Task 2 — Bookmark Clerk's user dashboard (30 sec, operator only)

**Why:** Avoid building a custom signup-count page when Clerk already has one.

**Operator steps:**

1. Log into clerk.com
2. Select the LaunchpadHQ application
3. Users tab → bookmark this URL
4. Optional: Dashboard / Analytics tabs also have signup-over-time charts — bookmark whichever view is most useful

**Done when:** You can get to total user count in one tap from your phone.

---

## Task 3 — Google Workspace setup ($7/mo, ~30-45 min operator work)

**Why:** Transactional emails need a real `from` address. Business correspondence needs separation from personal Gmail. Deliverability reputation builds over time, so start now. Already on the roadmap from Session 6 — this just executes it.

**Cost:** $7/mo per user, Business Starter plan. Single user is fine to begin.

**Operator steps:**

1. Go to `workspace.google.com`, start signup
2. Use `launchpadhq.io` as the domain
3. Primary email: `zach@launchpadhq.io` (or whatever you prefer)
4. Workspace will give a set of DNS records to add — MX records (for receiving email), plus a TXT record (for domain verification)
5. Open Cloudflare → `launchpadhq.io` DNS settings
6. Add the MX records and the verification TXT record exactly as Workspace specifies
7. Return to Workspace, click "Verify domain"
8. Once verified, set up the primary mailbox and any aliases (`hello@`, `support@`, `noreply@` — though `noreply@` will actually be sent via Resend, not Workspace; setting it as a Workspace alias is fine for receiving bounce-backs and replies)
9. Configure SPF record for Workspace: a TXT record on the root domain with value `v=spf1 include:_spf.google.com ~all` — this authorizes Workspace to send mail as `launchpadhq.io`
10. *(Optional but recommended)* Set up DKIM via Workspace admin panel → Apps → Google Workspace → Gmail → Authenticate email. Workspace generates a DKIM key; add the corresponding TXT record in Cloudflare.

**Heads up on SPF:** SPF is a single TXT record per domain. When Task 4 (Resend) is added, the SPF record will need to be *updated* to include Resend too (e.g. `v=spf1 include:_spf.google.com include:amazonses.com ~all` — exact syntax depends on what Resend specifies). Don't create a second SPF record; merge them into one.

**Done when:** You can send and receive email at `zach@launchpadhq.io` via Gmail's web interface.

---

## Task 4 — Resend account setup (free tier, ~15-20 min operator work)

**Why:** Transactional emails (moderation notifications, eventual Stripe receipts, password resets, trial warnings) need a dedicated provider. Resend has a clean DX, generous free tier (3,000/mo, 100/day), and integrates well with Next.js.

**Cost:** $0 until well past launch.

**Operator steps:**

1. Sign up at resend.com using the new `zach@launchpadhq.io` address
2. Domains tab → Add Domain → `launchpadhq.io`
3. Resend gives a set of DNS records: typically an MX record for a bounce subdomain, a DKIM TXT record, and an SPF include directive
4. In Cloudflare DNS:
   - Add the new MX record (it'll be on a subdomain like `send.launchpadhq.io`, won't conflict with Workspace's MX on the root)
   - Add the DKIM TXT record exactly as specified
   - **Update** the existing SPF record from Task 3 to include Resend's send domain (Resend will tell you the exact `include:` value — likely `include:amazonses.com` or similar). The merged record looks like `v=spf1 include:_spf.google.com include:amazonses.com ~all`. **Do not add a second SPF record.**
5. Return to Resend, click "Verify domain"
6. Once verified, create an API key with send-only permissions for the production environment. Copy it; you'll add it to Vercel's environment variables in Task 6.
7. *(Optional but recommended)* Set up DMARC: a TXT record at `_dmarc.launchpadhq.io` with value `v=DMARC1; p=none; rua=mailto:zach@launchpadhq.io`. `p=none` means "monitor only, don't reject" — appropriate while warming up. Tighten to `p=quarantine` later once you've verified all your legitimate sources are passing.

**Done when:** Resend dashboard shows `launchpadhq.io` as verified, and you have an API key saved to add to Vercel.

---

## Task 5 — Sentry error monitoring (free tier, ~30-45 min total)

**Why now:** You're about to start collecting real users via the paywall, and you'll be on paternity leave shortly after. Right now there's no visibility into production errors beyond "Zach happens to notice." A user hits an error during paternity leave, you have no idea, they churn silently. Sentry closes that gap. Doing this *after* Workspace means the Sentry account is tied to `zach@launchpadhq.io` from day one — no migration later.

**Cost:** $0 on the free tier (5k errors/month, 10k performance events). Well past launch before you'd outgrow it.

**Operator steps:**

1. Sign up at sentry.io using `zach@launchpadhq.io`
2. Create a new project → select Next.js as the platform
3. Sentry will provide a DSN and a setup wizard URL. Copy the DSN.
4. Add `SENTRY_DSN` (and `NEXT_PUBLIC_SENTRY_DSN` if the wizard specifies) to Vercel environment variables across Production, Preview, and Development
5. *(Optional, recommended)* Generate a Sentry auth token for source map uploads — the wizard will prompt for this. Add `SENTRY_AUTH_TOKEN` to Vercel env vars too. Source maps make stack traces actually readable instead of pointing to minified code.

**Claude Code build (~15-20 min):**

- Run `npx @sentry/wizard@latest -i nextjs` — this is Sentry's official installer. It handles the Next.js-specific config: `instrumentation.ts`, `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`, source map upload via `next.config.ts`, etc.
- **Review what the wizard wants to change before approving.** It will modify `next.config.ts` (wrapping it with `withSentryConfig`) and create several new files. Verify nothing collides with existing config.
- Test by deliberately throwing an error in a test route (the wizard sometimes scaffolds one as `/sentry-example-page` — fine to use that and delete after). Confirm it lands in the Sentry dashboard within ~1 minute.
- Configure alert rules in the Sentry dashboard: at minimum, email on any new error type. Keep noisy — current volume is low, false positives are cheap. Tune down later if needed.
- Commit and merge via the usual PR + Vercel preview verification flow.

**Open considerations:**

- **Session Replay** is a Sentry feature that records user sessions to replay alongside errors. It's powerful but has privacy implications (records form inputs by default, can be configured to mask) and uses event budget. Default-off for v1; consider after the paywall is live and you have actual users to debug.
- **Performance monitoring** (tracing) is included in the wizard's default setup. Leave on — useful baseline data even if you don't actively monitor it yet.

**Done when:** A deliberate test error in production appears in the Sentry dashboard within ~1 minute and triggers an email to your inbox.

---

## Task 6 — Moderation email notification flow (Claude Code build, 1-2 hours)

**Why:** From the Session 8 carry-forward: an admin moderation UI is queued, but for the current volume (≈0 submissions), email notifications with magic approve/reject links are the right tool. They work from phone, from anywhere, during paternity leave, without logging in. The dashboard gets built later when email volume becomes noise.

**Prerequisites:**
- Task 4 complete (Resend verified, API key in hand)
- Existing moderation infrastructure from earlier sessions still intact (the pending-review submission flow is presumed working — Claude Code should verify on its reconnaissance pass)

**Operator steps before Claude Code session:**

1. Add `RESEND_API_KEY` to Vercel environment variables (Production, Preview, Development as needed)
2. Decide on the operator email address to receive moderation notifications (probably `zach@launchpadhq.io`)
3. Add it as an environment variable too: `MODERATION_NOTIFICATION_EMAIL`

**Claude Code prompt scope (draft this with me in the session, but the rough shape):**

- Install `resend` npm package
- Create `src/lib/email.ts` — a thin wrapper around the Resend SDK, with a typed `sendEmail()` helper and a `sendModerationNotification()` specific function
- Hook into the existing submission flow: when a discussion post or prompt library submission lands in pending state, send an email to `MODERATION_NOTIFICATION_EMAIL` with the content preview
- Generate signed approve/reject URLs using a server-side secret. URL format roughly `/api/admin/moderate?token=<signed-token>&action=approve&id=<submission-id>`. Token must be signed (HMAC) to prevent forgery — anyone with the URL can act on it, so the signature is the only auth.
- API route `/api/admin/moderate` validates the signature, performs the action, returns a simple confirmation page
- Token should be single-use or short-TTL — store consumed tokens in a small DB table, or include a timestamp and reject after N hours

**Open design questions to resolve with Claude Code:**
- Single-use vs. TTL-based tokens (single-use is safer but requires a DB write; TTL is simpler)
- What happens if you click "approve" twice — idempotent action, or error?
- Confirmation page UX after approve/reject — just a plain HTML "done" page is fine for v1

**Done when:**
- A test submission triggers an email to your inbox
- Clicking "approve" in the email actually approves the submission in the database
- Clicking "reject" rejects it
- Replaying the same link a second time doesn't double-process

---

## Task 7 — Strip personal Gmail from any current notification paths (cleanup, 10 min)

If any current code paths send notifications to your personal Gmail (Stripe webhooks, error monitoring, anything else), swap them to `zach@launchpadhq.io` once Workspace is live. Claude Code can grep for this on its reconnaissance pass before the Task 6 build.

---

## What this addendum is NOT

- Not a moderation dashboard build. That's deferred until email becomes noise.
- Not a custom analytics page. Vercel Analytics + Clerk dashboard cover it.
- Not a transactional email overhaul beyond moderation notifications. Stripe receipts, password resets, trial warnings, etc. will reuse the same `email.ts` wrapper when those workflows ship — building the wrapper now means future work is faster.
- Not a full observability stack. Sentry covers errors and basic performance. Datadog/Honeycomb/New Relic are overkill for current scale.
- Not LLC-gated. Workspace, Resend, and Sentry are all fine to set up under personal name; transfer to LLC when it forms.

---

## Recommended session order

If doing this all in one session:

1. Tasks 1 + 2 (Vercel Analytics + Clerk bookmark) — knock out in 10 min, get the easy wins
2. Task 3 (Workspace) — operator work, DNS propagation may take a few minutes to a few hours
3. Task 4 (Resend) — operator work, same DNS file
4. Task 5 (Sentry) — operator + Claude Code, depends on Workspace being live for the account email
5. Task 7 (cleanup) — quick Claude Code grep
6. Task 6 (moderation email flow) — the main build, save for last when the prerequisites are in place

If splitting across sessions: Tasks 1-5 in one operator-heavy session (~2 hours, with DNS propagation wait time mixed in), Task 6 in a separate Claude Code session.

---

## DNS hygiene note

By the end of Task 4, `launchpadhq.io` will have a meaningful DNS configuration: A/CNAME records for Vercel, MX records for Workspace, MX for Resend bounce subdomain, SPF (merged Workspace + Resend), DKIM for both, and DMARC. **Worth taking a screenshot of the final Cloudflare DNS panel and saving it to the project knowledge** — DNS misconfigurations are painful to diagnose later, and a known-good reference snapshot is cheap insurance.
