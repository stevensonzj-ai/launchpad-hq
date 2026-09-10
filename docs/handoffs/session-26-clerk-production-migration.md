# Session 26 — Clerk moved from development to production

**2026-09-10.** Same day as Session 25, immediately after it. Cowork session driving Chrome
directly against Clerk, Cloudflare, Vercel, Google Cloud and Neon.

## Working agreements added this session

**The two-foot rule.** Owner's rule, from aircraft inspection: when inspecting anything, also
inspect everything within two feet of it. Don't look only for the defect you came for — check
what surrounds it and flag anything that could be better. Standing expectation for every
session: code review, dashboards, data, copy, process.

**Plain language.** Match the words to what is being decided, not to the underlying machinery.
Define a term the first time it carries weight.

The rule earned its keep immediately: the Google account mix-up, the "vetted" claim, the loaded
SQL editor, the DMARC posture and the broken onboarding flag were all found *beside* the thing
being worked on, not in it.

## Why this was urgent

launchpadhq.io was running Clerk's **development** instance in production. Dev instances cap at
100 users, **cannot transfer users to production**, transmit session tokens in the querystring
(Clerk states this is not secure for production), and showed `devoted-koi-95.accounts.dev`
branded "My Application" to anyone hitting sign-up. Found while verifying the Session 25 merge.

## Final state — migration COMPLETE

| | |
|---|---|
| Clerk app | `app_3CRsSv4lr8zfNz9kXZvRV9ePojB` — renamed to **Launchpad HQ** |
| Production instance | `ins_3J8tvUpCjkR9vzHq9ih4ay1JqTH` |
| Dev instance (retained for Preview + local) | `ins_3CRsSzLBcdZMS40cQY7xHpA3kUd` |
| Domain | `launchpadhq.io` — 5 CNAMEs in Cloudflare, all **DNS-only**, all verified, SSL issued |
| Google Cloud project | `launchpadhq-auth` (number 160716348097), in the `launchpadhq.io` org |
| Owner's production Clerk id | `user_3J96ejyNXj8qFNmhZc6xJT7nvby` |

**Verified working:** `/sign-in` with no "Development mode" badge; `accounts.launchpadhq.io`
serving over HTTPS; **Google sign-in completed end to end**; database row re-pointed with
relations intact.

### DNS records (Cloudflare, all CNAME, all DNS-only)

| Name | Points to |
|---|---|
| `clerk` | `frontend-api.clerk.services` |
| `accounts` | `accounts.clerk.services` |
| `clkmail` | `mail.12nezr4yae5k.clerk.services` |
| `clk._domainkey` | `dkim1.12nezr4yae5k.clerk.services` |
| `clk2._domainkey` | `dkim2.12nezr4yae5k.clerk.services` |

Cloudflare nags to enable proxying on that page. **Ignore it** — Vercel and Clerk records must
stay DNS-only. Proxying is the usual reason Clerk records fail to verify.

### Vercel environment variables

| Name | Environments | Key |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Production | `pk_live_` |
| `CLERK_SECRET_KEY` | Production | `sk_live_` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | All Pre-Production | `pk_test_` |
| `CLERK_SECRET_KEY` | All Pre-Production | `sk_test_` |

All Config type. Preview and local development stay on the dev instance deliberately.
**`NEXT_PUBLIC_*` values are baked in at build time — changing them does nothing without a
redeploy.**

### The one database change

```sql
UPDATE users SET "clerkId" = 'user_3J96ejyNXj8qFNmhZc6xJT7nvby'
WHERE email = 'zach@launchpadhq.io';
```

Run and verified. Row id `cmq705dxl000004ju0px6ybec` unchanged, so preferences and relations
survived. Required because `users.email` is unique — without it the first production sign-in
hits a constraint violation in `src/lib/auth-db.ts` instead of creating a row.

The `stevensonzj@gmail.com` row still holds a dead dev `clerkId`. Harmless; tidy up whenever.

## Google OAuth — configured, but the app is still in Testing

Custom credentials are in and the connection shows **Enabled**. But the app **cannot be
published**: Google requires an application home page, **privacy policy link** and **terms of
service link**, and `/privacy` and `/terms` do not exist on the site.

**Stopgap:** `zach@launchpadhq.io` and `stevensonzj@gmail.com` are on the test-user list, so
Google sign-in works for the owner. **For everyone else it fails until the app is published.**
Email and password sign-in is unaffected.

Home page and authorized domain (`launchpadhq.io`) are filled in; only the two legal links are
missing. Scopes are `openid` / `userinfo.email` / `userinfo.profile` — non-sensitive, so
**publishing needs no Google verification review** once the links exist.

**This elevates the legal pages.** Session 23's addendum flagged them as blocking Stripe
activation. They now also block public Google sign-in. Same two documents, two blockers.

## Open, in rough priority order

1. **`/privacy` and `/terms` plus a footer.** Blocks public Google sign-in AND Stripe.
2. **Sign-in routing.** `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` were
   never in Vercel — only in `.env.local`, where they point at `/account/sign-in`, a route that
   does not exist and is itself auth-gated. Gated routes therefore land on Clerk's hosted portal
   rather than the site's own `/sign-in`. Fix: add both to Vercel (all environments) as
   `/sign-in` and `/sign-up`, redeploy, and correct `.env.local`.
3. **Catalog `privacyLevel` is a live scoring defect** — see Session 25 § 5.5.
4. **Onboarding completion is probably broken.** Both accounts show `onboardingComplete = false`
   despite the owner signing in repeatedly and completing the quiz. `AFTER_SIGN_IN_URL` is
   `/onboarding`, so users may be looped through onboarding on every sign-in with nothing
   flipping the flag.
5. **"170+ vetted AI tools"** on the homepage, against a catalog holding a discontinued product,
   dead product names, and wrong privacy ratings. Fix the data rather than soften the word.
6. **`/tutorials` says "coming soon"** while 88 tutorials exist, and is auth-gated — a visitor is
   asked to sign in and rewarded with a page telling them to come back later. Not in
   `isPublicRoute` in `src/proxy.ts`.
7. **88 tutorials are invisible from the homepage.** Buried behind a tab on platform pages.
8. **Google Cloud account sprawl.** Three accounts signed into Chrome; the console defaults to
   `stevensonzj@gmail.com` (`authuser=0`), the right one is `zach@launchpadhq.io` at
   **`authuser=2`**, and there is also a `launchpadhq.admin@gmail.com`.
9. **DMARC is `p=none`** — monitor only. SPF and DKIM already in place. Three senders on the
   domain now (Google Workspace, Resend, Clerk).
10. **Clerk API version pinned to 2025-11-10**, latest 2026-05-12.
11. **Production `CLERK_SECRET_KEY` stored as Config, not Secret** — readable in the dashboard.
12. **`.env.vercel.production`** still in the project folder with credentials rotated dead in
    June. Flagged since Session 23.

## Mistakes this session, recorded so they aren't repeated

1. **An ambiguous instruction cost an hour.** Written as "`CLERK_SECRET_KEY` -> the `sk_live_`
   value". The owner reasonably read the arrow as *rename to*, and replaced the variable
   **names** with `pk_live_`/`sk_live_`. Production briefly had no Clerk configuration; only the
   already-built bundle kept the site working. **When writing about key/value pairs: say the
   name stays X and the value goes in the value field.**
2. **Wrong SQL table name, twice** — first `"User"` (Prisma model name), then an assumption of
   full snake_case. Truth: table `users`, columns camelCase and quoted. **Check
   `information_schema` before writing SQL against this database.**
3. **A `/tutorials` 404 was misread as a broken route** — it was a Clerk auth redirect. WebFetch
   reports the redirect chain as a 404.
4. **Both of this day's handoffs were initially written only to the Claude project**, against the
   standing instruction in this directory's README. Corrected by committing them here.
