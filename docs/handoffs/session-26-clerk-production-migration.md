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
2. ~~Sign-in routing.~~ **RESOLVED** — see the addendum at the end of this file.
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


---

# Addendum, same day — sign-in routing and the welcome page

## Sign-in routing: fixed

`NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` added to Vercel (all three
environments) as `/sign-in` and `/sign-up`. Gated routes now land on the site's own dark sign-in
page with `redirect_url` preserved, instead of Clerk's hosted portal. Verified live.

## The welcome page now shows once per user

`/onboarding` was orphaned: nothing sent anyone there, and `onboardingComplete` was referenced
nowhere in `src/`. It now reads the flag, redirects returning visitors to `/discover`, and sets
the flag on first view. Commit `c46d7805`.

**It gates nothing.** No other route redirects on the flag, the page keeps its "browse all
platforms" alternative, and signing in still gives full run of the site. The quiz is optional
and must stay that way — this was an explicit product decision by the owner.

Every database step degrades to "render the welcome page". `redirect()` sits deliberately
**outside** that try/catch: it signals by throwing `NEXT_REDIRECT`, and a catch would silently
cancel it, which would look like "the flag isn't saving."

Also fixed a pre-existing bug in `getOrCreateDbUser`: the fallback query inside the catch block
returned its promise un-awaited, so a rejection escaped the catch and rejected out of the
function. Callers are written to handle a null user, not a throw. The lookup on line 11 is
deliberately left unwrapped — making it null on failure would turn a database outage into "not
signed in" for every caller including the POST routes, which is a worse failure mode.

## Clerk redirect environment variables — the legacy names are silently ignored

**`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` and `..._AFTER_SIGN_UP_URL` are deprecated** and do
nothing on `@clerk/nextjs` ^7.2.1. They do not error; Clerk simply falls back to its own default
of `/`, so users land on the home page and it looks like the setting was ignored — which it was.

Current names:

| Purpose | Variable |
|---|---|
| Where the sign-in page lives | `NEXT_PUBLIC_CLERK_SIGN_IN_URL` |
| Where the sign-up page lives | `NEXT_PUBLIC_CLERK_SIGN_UP_URL` |
| After sign-in, when no `redirect_url` is present | `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` |
| After sign-up, when no `redirect_url` is present | `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` |

**Fallback, not force.** The force variants override `redirect_url`, which would send someone
following a deep link to `/onboarding` instead of where they were going. Fallback only applies
when there is no destination already.

`.env.local` still carries the deprecated names and should be corrected so local development
does not diverge.

Source: https://clerk.com/docs/guides/development/customize-redirect-urls

## The welcome page's layout was undercutting the product decision

Worth recording because of how it was found. After the page went live the owner — who knew the
quiz was optional, having just specified it that way — described landing there as being taken
"straight to the quiz." He hadn't been; he was on the welcome page, which offered both. But the
quiz was a large filled orange button and the alternative was a small grey sentence beneath it.

The code did exactly what was asked. The layout said something else.

Fixed in `c6e152a6`: browse is now a real outlined button beside the quiz, same size, both full
width when stacked on a phone. The quiz stays the recommendation through position, fill and
shadow rather than by shrinking the alternative. Styling copied from the homepage hero
(`src/app/page.tsx:73`, `:79`) — there is no shared Button component, so that hero is the
convention, and `Rocket` means browse while `Sparkles` means quiz site-wide.

**The generalisable point:** an unprompted reaction from a real person beats any review. It is
also single-use — once someone has been told how a page is meant to read, they can never see it
cold again.

**Known inconsistency, accepted deliberately:** the homepage hero makes `/discover` the filled
primary and `/quiz` the outline secondary. The welcome page inverts that. The owner's reasoning
is that the quiz feeds a planned news-and-updates feature, so a signed-in user is at the one
moment where recommending it helps.
