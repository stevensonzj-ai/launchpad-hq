# START HERE

**Finish this entire file before you open anything else — including the source code, including `CLAUDE.md`, including the git log.** This repository contains documents that are confident, complete and wrong, a working tree that looks catastrophically modified but isn't, and a destructive script that runs live by default. Every one of those will mislead you inside ten minutes if you start reading elsewhere. This file exists to inoculate you against them.

> **Written:** 2026-09-07 · **Written for:** any engineer or autonomous agent taking over LaunchpadHQ · **Owner:** Zach Stevenson (sole developer and operator)

---

## 1. What this project is

**LaunchpadHQ** is a curated AI-platform discovery site for beginners and budget-conscious users, live at **launchpadhq.io**. Its thesis is that the AI world is bigger than ChatGPT and Claude — that there are ~170 real, catalogued options across writing, image, video, audio, code, research and automation, many with genuinely usable free tiers or local open-source alternatives. The product is a guided discovery experience: browse the directory, take a matching quiz, read honest per-platform getting-started guides, save favourites, and discuss. The differentiator is *editorial honesty* — the site tells users what a tool is bad at, what its free tier actually limits, and what its privacy posture really is. That editorial work is the moat; it is hard to fake at scale, which is the entire defence against AI-generated competitor directories.

**Current status.** Live in production and functional, but **not publicly launched and not monetized**. The site serves a deliberate site-wide `noindex` — a "friends and family" guard that keeps Google from forming a thin-content impression of the domain while the catalog is still filling in. There is no paywall enforcement; payment plumbing exists but is not switched on. It is a solo side project executed with professional discipline: the owner does not depend on it for income, and the operating constraint that governs every architectural decision is that it must stay **low-cost and low-maintenance**. Features requiring constant human attention are disqualified unless they directly drive revenue.

The last substantive work (July 2026) was the tutorial content pipeline, which has produced 29 live per-platform guides. The project has been dormant since.

---

## 2. Naming history

You will hit these within minutes. Nothing here is a bug; all of it is history.

| What you'll see | What it actually is |
|---|---|
| `ai-launchpad` | The `name` field in `package.json`. An early name, never used anywhere else. Ignore it. |
| `launchpad-hq` | The GitHub repository (`stevensonzj-ai/launchpad-hq`), the Vercel project, and the Sentry organisation. |
| `launchpadhq` | The local working directory on the owner's machine (`C:\Users\Zach\Projects\launchpadhq`). |
| `LaunchpadHQ` / `LaunchPad HQ` | The product. `LaunchpadHQ` is the correct product spelling; `LaunchPad HQ` is the name of the Claude project the archives came from. |
| `javascript-nextjs` | The Sentry **project** name. A setup-wizard default that was never renamed. It is this app. |
| `middleware.ts` | Does **not exist and must never be created.** Next.js 16 renamed middleware to `src/proxy.ts`. Creating `middleware.ts` will conflict with it. Every prior session records this rule; it is the single most repeated instruction in the project. |
| `tutorialTier` | An earlier name for what is now `accessTier`. Only `accessTier` exists in code. |
| `Tutorial`, `UserProgress` | Prisma models in `prisma/schema.prisma`. **Dead scaffolding, intentionally unwired.** `prisma.tutorial` appears nowhere in `src/`. Live tutorials are static TypeScript. Do not "finish wiring" them — see § 4. |
| `industry-specific-ai`, `audio-music-voice-ai`, `browser-extensions-productivi` | Category slugs **deleted** in the May 2026 taxonomy restructure. 301/308 redirects for them live in `next.config.ts` and `src/proxy.ts`. |
| `ai-plugins-for-business-softwar` | A truncated slug caused by an Excel import bug. Renamed by migration to `ai-plugins-business-software`; the redirect is retained. |
| `import-platforms-legacy.ts` | Was `import-platforms.ts`. Renamed and guarded behind a `--force-legacy-import` flag so it can't be run by accident. Kept for the historical record only. |
| `Prompt.author` (String?) | A legacy column that coexists with the modern `user` relation. Some old rows have one and not the other; the API projection falls back `user.name → author → "Anonymous"`. |
| `dev-local` / `ep-hidden-truth-aj8wfxc2` | The Neon **development** database branch. Local development points here. |
| `ep-odd-mud-ajdk8f99` | The Neon **production** compute. If you see this hostname in a local `DATABASE_URL`, stop — see gate **G1**. |
| `make-integromat`, `otter-ai`, `perplexity-ai`, `canva-ai-magic-studio`, `adobe-acrobat-ai-assistant` | Real database platform slugs whose tutorial **filenames** are shorter (`make-`, `otter-`, `perplexity-`, `canva-ai-`, `acrobat-ai-`). Five of the 29 tutorial files diverge this way. `CLAUDE.md` describes the convention incorrectly — see § 4. |
| `github-copilot` ≠ `microsoft-copilot` | Two separate catalog rows. Cross-wiring them is an easy mistake. |
| `runway` ≠ `runway-for-education` | Same — two separate rows. |
| `canva-ai-magic-studio` ≠ `canva-magic-studio` | Same — two rows. The second is deliberately left unwired to any tutorial. |
| `runway-ml`, `eleven-labs` | **Not real slugs.** They appear as guesses in older notes. Ignore them. |
| `Fable` / `Fable 5` | A Claude model used for exactly one autonomous coding sprint in June 2026, which produced six branches. Not a service, not a dependency, not part of the running system. |
| `Cowork` | The Claude desktop assistant, used by the owner for content drafting. Evaluated for the tutorial pipeline and declined. Not part of the app. |
| `OpenClaw` | Earlier exploratory scaffolding, long abandoned. Its leftovers are the dormant `Tutorial` model and the original static tutorial file. The standing rule is *"OpenClaw output is input, not ground truth."* |

---

## 3. Reading order and what is authoritative

Read in this order. Stop at each and take it at the weight given.

1. **This file (`START-HERE.md`)** — governs everything below it. Where it contradicts another document, this file wins, because it was written last and written specifically to reconcile them.
2. **`CLAUDE.md`** (repo root, ~480 lines) — the standing engineering briefing. **The primary authority on conventions, coding rules, architecture and the moderation policy.** It is substantially accurate and genuinely good. Its header claims `Last updated: 2026-04-24`; that is wrong — it was materially rewritten in June 2026. It has five known errors, all listed in § 4. Trust everything in it *except* those five.
3. **`AGENTS.md`** (repo root, 5 lines) — one rule, still current: this is Next.js **16**, whose APIs and file conventions differ from what a model trained earlier will assume. Read the relevant guide in `node_modules/next/dist/docs/` before writing framework code.
4. **The code itself** — `prisma/schema.prisma` is the canonical data model. `src/data/tutorials/types.ts` is the compile-time contract for tutorial content. **Where any document disagrees with the code, the code wins and the document should be corrected.** This is a standing instruction from the owner, not a suggestion.
5. **`docs/history/README.md`** — the index to the archived project record, with a warning about how to read it.
6. **`docs/history/*`** — 24 archived documents. **Historical record, not instructions.** Read § 4 of this file before you act on anything in there.
7. **`docs/archive/*`** — four pre-2026 planning documents that predate the authentication and payments integration entirely. `CLAUDE.md` correctly warns that following their instructions would revert real progress. Read only to understand how the project got here.

### What is authoritative on what has actually been *tested*

Read this paragraph carefully, because the honest answer is uncomfortable.

**There is no test suite.** No unit tests, no integration tests, no end-to-end tests, no CI test job. `CLAUDE.md` states this plainly and calls it a deliberate deprioritisation for the current phase. The only automated gates are `npm run typecheck` (`tsc --noEmit`) and `npm run build`.

Consequently there is **no single document that authoritatively records what has been verified.** The nearest thing, and the one you should treat as the verification record, is **`docs/history/session-22-handoff.md`** — the most recent handoff. Each handoff's opening block states the production deployment that was verified live against a specific commit sha, and its body records what was checked by hand on a Vercel preview. Older handoffs are authoritative *for the state at their date only*.

`docs/session-4-manual-test.md` is a genuine manual test checklist for the prompts and discussions flow. It is thorough and still broadly valid for those surfaces, but it is a one-off from an early session, was never generalised, and covers perhaps a tenth of the app.

**Practical consequence for you:** "it compiles" means very little here. A merge in Session 12 passed both typecheck and build with a dropped React prop that broke a badge on the highest-traffic page. Human preview verification is the real gate. See gate **G11**.

---

## 4. Superseded claims

This is the most valuable section of this document. Every entry is a claim that appears somewhere in this repository, is stated confidently, and is **false**. They are ordered by how much damage acting on them would do.

### Critical — acting on these would break or revert real work

**4.1 — "Payments use Clerk Billing."**
*Where:* `docs/history/business-strategy-reference.md`, § "Payments architecture (decided)", stated as a locked decision with supporting rationale, cost analysis and free-trial mechanics.
*Truth:* Billing is the **raw Stripe SDK**. Three hand-rolled routes at `src/app/api/stripe/{checkout,portal,webhook}/route.ts`, a shared client at `src/lib/stripe.ts`, `STRIPE_PRICE_ID` read directly. There is **zero Clerk Billing in the codebase**. Clerk is **authentication only**. This was established by direct code inspection in Session 18 and the reference doc was never updated. *Implication:* the Clerk development→production migration and the Stripe production wiring are two independent tracks, not one integration.

**4.2 — "Tutorials are greenfield / zero work done."**
*Where:* `docs/history/product-roadmap-reference.md`, feature inventory table.
*Truth:* **29 tutorial pages are live in production.** They render as a Tutorials tab on each platform detail page. This claim is roughly four months and three shipped batches out of date.

**4.3 — "Tutorials are database-backed; a three-column migration adds `lastReviewedAt`, `changelogUrl` and an `accessTier` enum to the tutorial table."**
*Where:* `docs/history/tutorial-template-spec.md` § 9, and `docs/history/session-14-handoff.md`, both stating it as a locked decision.
*Truth:* **Reversed in Session 15 and the migration was cancelled, not deferred.** Tutorials are static TypeScript files in `src/data/tutorials/`, one per platform, validated at compile time by `src/data/tutorials/types.ts`. `accessTier` is a TypeScript union (`'FREE' | 'PREMIUM'`), **not** a Prisma enum. The Prisma `Tutorial` and `UserProgress` models exist but are dormant and deliberately unwired.
*Why this one is dangerous:* "wire the tutorials through the database" is exactly the instinct a competent engineer will have on seeing an unused `Tutorial` model. It is the wrong path, and both `CLAUDE.md` and Session 15 say so explicitly. **Do not route tutorials through the database.**

**4.4 — "`scripts/dedupe-jasper-platforms.ts` should be run to clean up duplicate Jasper rows."**
*Where:* `CLAUDE.md`, § "Data conventions" and § "Priority roadmap → P0", stated without qualification.
*Truth:* The instruction is correct but **materially incomplete in a way that can destroy production data.** The script **defaults to LIVE writes**, not dry-run, cushioned only by a five-second countdown. It must be run with `--dry-run` explicitly, against a Neon branch, first. See gate **G2**. Every handoff from Session 13 onward flags this; `CLAUDE.md` does not.

**4.5 — "The archetype is derivable from the platform's category and does not need its own field."**
*Where:* `docs/history/tutorial-template-spec.md` § 6.
*Truth:* `archetype` is a **required field** on `PlatformTutorialData` and is an editorial judgement, not a derivation. It selects the heading shown above the starter cards via an exhaustive `Record` in `src/components/tutorials/platform-tutorials.tsx`. In Session 22 two pages were briefed as `recipes` and had to be corrected to `pick-and-setup` because the rendered heading would have read "Starter automations to try" above cards that described no automations. **The check that catches this is reading the archetype's heading string against the actual card titles**, not reasoning about which archetype a tool "feels like."

### Significant — these will send you to redo finished work or chase fixed bugs

**4.6 — "The `CLAUDE.md` audit is outstanding."**
*Where:* `docs/history/claude-md-audit-deferred.md`, presented as an open to-do list across three tiers.
*Truth:* Tiers 1 and 2 were executed in Session 18 (two documentation-only pull requests) and verified by literal-string grep. Only the **Tier 3 structural lean-down** remains open, and it gates nothing.

**4.7 — "Two quiz feature branches are unmerged; read this first."**
*Where:* `docs/history/product-roadmap-reference.md`, top section, explicitly labelled "read this first."
*Truth:* Both merged in June 2026, along with four other branches. The section's framing makes it the first thing a reader trusts and the first thing that misleads them.

**4.8 — "The Discover difficulty and free-tier filters are still to build."**
*Where:* `docs/history/product-roadmap-reference.md` and `docs/history/business-strategy-reference.md`.
*Truth:* Shipped, then the entire Discover filter UI was redesigned and re-shipped in July 2026 as a compact bar of native `<select>` dropdowns with removable filter pills and a reactive result count.

**4.9 — "The Discover filter redesign should be a 'Filters' button opening a popover on desktop and a slide-up sheet on mobile."**
*Where:* `docs/history/session-13-handoff.md`, design notes.
*Truth:* **Explicitly rejected** in Session 21 on published usability-research grounds (hiding critical filters behind a single button is an anti-pattern for a small facet count) and because building it would have meant hand-rolling the project's first popover primitive. Shipped as four visible native dropdowns instead. If a dropdown ever needs to become a custom control, the sanctioned upgrade path is Radix — **not** a hand-rolled popover.

**4.10 — "Remove duplicated content between the platform detail sidebar and main column (P0 bug)."**
*Where:* `CLAUDE.md`, § "Priority roadmap → P0", item 2.
*Truth:* **The bug does not exist.** A field-by-field audit in June 2026 confirmed the platform detail page is single-column and an earlier redesign had already fixed it. `CLAUDE.md` still lists it, hedged as "unverified."

**4.11 — "Tutorial files are named `{platformSlug}-getting-started.ts`."**
*Where:* `CLAUDE.md`, § "Tutorials".
*Truth:* The filename stem is the tutorial's own **`slug`**, which is shorter than `platformSlug` on five of the 29 files: `acrobat-ai-`, `canva-ai-`, `make-`, `otter-`, `perplexity-`. Registration and lookup are by `platformSlug`, which must exactly match a real `Platform` row — **verify it against the database, never assume it.**

**4.12 — "`getPlatformCount()` rounds down to the nearest ten."**
*Where:* `CLAUDE.md`, § "Data conventions".
*Truth:* `getPlatformCount()` in `src/lib/platforms.ts` returns the **exact** count. The rounding is a separate exported helper, `roundDownToTen()`, in the same file. The underlying rule — never hardcode a platform count anywhere — is correct and still binding.

**4.13 — "Resend is scoped to the `send.` subdomain; verify the sender matches or mail won't send."**
*Where:* `docs/history/session-9-handoff.md`, `docs/history/claude-fable-5-session-handoff.md`, `docs/history/session-10-handoff.md`, repeated as an open risk.
*Truth:* The root domain `launchpadhq.io` **is** verified in Resend, and moderation email was confirmed delivering in production in Session 14. The warning is retired.

**4.14 — "Pilot tutorial pages stay in documents and are not indexed until the quality bar is confirmed."**
*Where:* `docs/history/tutorial-template-spec.md` § 10.
*Truth:* All 29 pages are live in production. They are not indexed, but only because of the site-wide `noindex` — a different mechanism, applied for a different reason, that will be lifted at launch.

### Time-rotted — harmless once you know, confusing until you do

**4.15 — Tutorial page counts.** Handoffs state 4, 5, 9, 19 and 29 live pages at their respective dates. **29 is current** (`ls src/data/tutorials/*.ts` minus `types.ts` and `index.ts`).

**4.16 — "main is at `<sha>`."** Every handoff opens with one. All are superseded; several are *below* the current HEAD. See § 8 for the real state — which is itself untidy.

**4.17 — "Zach is starting paternity leave soon."** Appears in `CLAUDE.md` § "Current context (as of April 2026)" and in Sessions 8 and 9. **Stale.** The child was born in late April 2026 and Session 10 explicitly retires the framing. There is no absence cliff and no deadline pressure. The real constraint is fragmented time, which makes small well-reviewed increments *more* important, not less.

**4.18 — `CLAUDE.md`'s header date, `2026-04-24`.** Understates the file's currency by two months and invites you to distrust the whole document. Trust it except for 4.4, 4.10, 4.11, 4.12 and 4.17.

**4.19 — `CLAUDE.md`'s "Step 0 — Full feature audit (the next task)" and the P0/P1/P2/P3 roadmap beneath it.** That audit never happened and the P-band sequence does not describe what has actually been worked on since April, which was the tutorial content pipeline almost exclusively. Treat the roadmap as a menu of unstarted ideas, not as a plan in progress.

**4.20 — The tutorial reference prose in `docs/history/tutorial-reference-pages.md`.** Use it for voice, structure and depth. **Do not use it for facts.** Session 15 found that the "validated" ChatGPT draft named a model that had been retired and omitted two capabilities that had since become core — within weeks of being written. That discovery is the origin of the standing research rule, gate **G16**.

### Not superseded — an open defect, recorded here so it isn't lost

**4.21 — Sora 2 is in the live catalog and the product is discontinued.**
Discovered by accident in Session 22. OpenAI ended the web and app experiences on 2026-04-26. A user can currently find, filter to, and click through to a platform that no longer exists. The same row also carries an incorrect `costTier` of `ENTERPRISE`. **This has not been fixed.** It reframes a larger question nobody has answered: nothing in the system detects whether a catalogued platform still exists, and with ~170 rows Sora is unlikely to be the only one. See § 8.

---

## 4b. Credentials

**A full scan of every file added by this handoff, and of every file tracked in git, found no live credentials.** Specifically checked for: Stripe live and test keys, Stripe webhook secrets, Resend API keys, Postgres connection strings containing a password, AWS access key IDs, GitHub personal access tokens, and PEM private key blocks.

Two findings, neither actionable:

- `docs/archive/CURSOR_IMPLEMENTATION_PROMPT.md` contains the literal placeholder `CLERK_SECRET_KEY=sk_test_...` in an example block. Not a key.
- The Sentry DSN is hardcoded in `sentry.server.config.ts`, `sentry.edge.config.ts` and `src/instrumentation-client.ts`. This is **correct and intentional** — a DSN is a public client identifier that ships in the browser bundle regardless. It is not a secret and was a deliberate decision.

### The rule

**Credentials are not in this repository and must never be.** `.env*` is gitignored and no environment file is tracked. Real secrets live in three places only: Vercel's environment variable store, the owner's local `.env` and `.env.local`, and the individual service dashboards.

**You must never read, write, edit or print the contents of `.env`, `.env.local`, `.env.local.utf16.bak`, `.env.sentry-build-plugin`, `.env.vercel.production`, or anything under `.clerk/`.** This is not a soft preference — see gate **G10** for what happened the last time that file was mishandled. If a value needs to change, ask the owner to change it himself.

### What an operator must provide before specific work is possible

| Variable | Needed for | Note |
|---|---|---|
| `DATABASE_URL` | Anything touching Postgres | Lives in `.env`, **not** `.env.local`. Must point at the Neon `dev-local` branch for local work — see **G1**. |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` | Any authenticated route | Currently a Clerk **Development** instance. A production instance does not exist yet and is a pre-paywall prerequisite. |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID` | Checkout, portal, webhook routes | Test-mode. A production Stripe account requires the LLC and business bank account first — see § 10. |
| `RESEND_API_KEY`, `MODERATION_NOTIFICATION_EMAIL`, `MODERATION_SECRET` | Moderation email flow | `MODERATION_SECRET` is generated, not issued: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. |
| `NEXT_PUBLIC_APP_URL` | Absolute links in outbound email | Falls back sensibly but should be set. |
| `SENTRY_AUTH_TOKEN` | Source-map upload at build time | Runtime error capture works without it. Vercel-side only. |

Access to the Vercel, Neon, Clerk, Stripe, Resend, Sentry, Cloudflare and Google dashboards is the owner's alone. Any task requiring one of them is an **operator step** and you must stop and ask.

---

## 5. The failure history, written as hard gates

Every rule below is here because something specific went wrong. The reasoning is attached deliberately: a gate without its story gets rationalised away by a sufficiently confident agent at 2am. Read the *because* clause before deciding a gate doesn't apply to you.

**G1 — Confirm the database target before any write. Every time.**
Run `node -e "console.log(new URL(process.env.DATABASE_URL).hostname)"` — no credentials printed — and read the result. It must be `ep-hidden-truth-aj8wfxc2` (the Neon `dev-local` branch). If it is `ep-odd-mud-ajdk8f99`, you are pointed at **production**; stop.
*Because* on 2026-06-19 exactly that check revealed local development had been running against the production Neon compute for an unknown length of time. Everyday local work — any stray migration, seed or script — had been one command away from corrupting live data with no undo. It was found by running the check, not by anything failing.

**G2 — Never run `scripts/dedupe-jasper-platforms.ts` without `--dry-run`, and never against production first.**
The order is: Neon branch → `--dry-run` → read the logged duplicate JSON → confirm the canonical row → live on the branch → verify in the Neon SQL editor → only then production.
*Because* the script **defaults to LIVE writes**, cushioned only by a five-second countdown. It has sat merged and deliberately unrun since June 2026 across nine consecutive sessions for this reason alone. It is otherwise well built — idempotent, single atomic transaction, recovery logging — which is precisely what makes the default dangerous: everything about it invites confidence.

**G3 — Never execute a Prisma migration or a data script. Write them; do not run them.**
Create migration files only (`--create-only` or hand-written). The operator applies them manually, Neon branch first, verified in the SQL editor before production.
*Because* this discipline is why the May 2026 category restructure — two migrations, 45 platform reassignments, three category deletions — landed with zero rollbacks. It is also why the safety-guarded `DO $$` block in the deletion migration aborted correctly rather than orphaning rows.

**G4 — A credential that touches a transcript is a dead credential. Rotate it the same day.**
*Because* on 2026-06-19 a production-format Neon `DATABASE_URL` including the `neondb_owner` password was pasted into a planning conversation. **Neon roles span branches**, so what looked like a development credential was a production credential. It was rotated in Vercel and locally within the hour. Never paste a connection string anywhere, ever — print the hostname alone when you need to check.

**G5 — Never run `git clean -f`. Run `git clean -n` and read it.**
If an untracked file has a real-looking name, move it aside or commit it to a scratch branch before deleting anything.
*Because* in June 2026 a `git clean -f scripts/ src/lib/` intended as tidying permanently destroyed two untracked work-in-progress files. Nothing was ultimately lost only because they were later rebuilt from scratch. **`git clean -f` is the one git operation with no undo.**

**G6 — Never trust `git branch --merged` in this repository.**
Verify patch-equivalence with `git cherry` against the merge base, then delete with `git branch -D` — not `-d`, which reuses the same broken logic.
*Because* everything here merges by **squash**. A squashed commit has a different sha from the branch tip, so `--merged` reports "not merged" for content that is fully in main. Believing it will make you re-merge work that already shipped, or refuse to clean up branches that are genuinely done.

**G7 — "Merged" does not mean "deployed." Verify against the Vercel API.**
After any merge, poll for a deployment with `target: "production"` whose `githubCommitSha` matches main's HEAD, at state `READY` with `aliasError: null` and the apex and www aliases bound. Only then is it live.
*Because* in June 2026 a merge to main produced **no deployment at all** — the commit was clean on GitHub, GitHub reported "successfully deployed" (pointing at an old preview), and launchpadhq.io kept serving the previous build. The GitHub→Vercel webhook silently dropped. The recovery is an empty commit (`git commit --allow-empty`) to re-trigger. This happened more than once and is why deployment verification is a permanent part of the merge ritual rather than an optional check.

**G8 — Every serverless handler that reports to Sentry must `await Sentry.flush(2000)` before returning.**
*Because* on Vercel the function can freeze the instant the response returns, dropping the in-flight Sentry HTTP request. This cost most of a session in June 2026 chasing "Sentry isn't capturing" when Sentry was working the whole time and events were simply being discarded at the edge. The moderation route already does this in the `finally` of both its GET and POST handlers — match that pattern.

**G9 — Vercel environment variables are case-sensitive, cannot be renamed, and cannot be revealed after creation.**
*Because* `Sentry_auth_token` and `Resend_API_Key` were created with wrong casing and were silently inert — no error, no warning, just features that quietly didn't work. The only fix is delete-and-recreate, and since the value can never be read back out you must save it at creation time.

**G10 — Never touch `.env`, `.env.local`, or any file containing secrets. Ask the owner.**
*Because* `.env.local` was once UTF-16 LE — almost certainly created by a PowerShell `>` redirect, which defaults to UTF-16 — and Next.js/Turbopack read **none of it**. That single encoding fault presented as two unrelated bugs at once: a 500 on the moderation route (its secret was undefined) and a local authentication failure (Clerk fell back to a keyless throwaway instance). It had been latent for weeks because no local code path had needed that file until then. It is UTF-8 now. A careless rewrite puts it back.

**G11 — Verify on a Vercel preview before merging, and test the signed-out path.**
*Because* in June 2026 a branch passed `typecheck` and `build` completely clean and the preview caught a dropped React prop that broke the "Advanced" badge on `/quiz/results`. The signed-in page was correctly wired; the bug existed **only on the anonymous path**, which is the higher-traffic one. Compiling is not working, and the signed-in happy path is not the path most users take.

**G12 — Merge one branch at a time, against real post-merge main.**
Merge current main *into* the branch first, so the preview reflects the actual post-merge state rather than a stale base.
*Because* bulk-reviewing a stack means reviewing branch N blind to merges 1 through N−1. Doing it one at a time is what let Session 12 verify that two branches' edits to the same scoring file were genuinely orthogonal rather than assuming it.

**G13 — Never inline a multi-line body into a `gh` command from PowerShell.**
Use `gh pr create --fill`, then `gh pr merge <n> --squash --subject "..."`. For commit messages, `git commit -F <file>`.
*Because* PowerShell here-strings containing quotes or backticks break the parse. This bit twice in one session before the convention was locked.

**G14 — `Remove-Item Env:DATABASE_URL` between branch-targeted and production-targeted commands.**
*Because* `$env:DATABASE_URL='...'` persists for the entire PowerShell session, not just the next command. A restructure step in May 2026 ran against the wrong target because the variable was still set. It was caught only by reading the datasource line in Prisma's output.

**G15 — Interactive CLIs cannot run through an agent shell. Hand them to the operator.**
*Because* the Sentry setup wizard needs a real TTY; run non-interactively it installed the SDK and then exited **without writing any configuration**, leaving a half-finished state that looked like success. Run those in a standalone terminal and hand the resulting diff back for review.

**G16 — Research every volatile fact live, at authoring time, on the day you write it — then stamp that date.**
The pass covers model lineup, current capabilities, free-tier shape, pricing bands, recent additions **and deprecations**. Write to durable *mechanism*, never to a version number. `lastReviewedAt` means "volatile facts web-verified on this date" — no research pass, no fresh date.
*Because* in Session 22 live research found that a platform on the build slate had been **discontinued three months earlier**; without the pass, a tutorial would have shipped for a product that no longer existed. And in Session 15 the "validated" reference page named a retired model and omitted two capabilities that had become core — within weeks of being written. Deferring a page does not help; the facts move regardless. The research pass is not quality polish on a known-good plan. It is what establishes whether the plan is valid at all.

**G17 — Do not fabricate content when a source is unavailable. Stop and report the blocker.**
*Because* in Session 22 an agent handed an unresolvable file path correctly recognised that the only way to produce the requested files was to author them from its own knowledge — and stopped, ran the recon it could complete, and reported cleanly. Fabricated content presented as sourced transcription is the worst available outcome on a site whose entire value proposition is accuracy. The constraint held under pressure rather than degrading into helpfulness. Hold it.

**G18 — An observation made from a different environment than the one that owns the repository can be locally correct and globally wrong. Establish your position before you report a state finding.**
Check where you are standing — `git config --show-origin --get core.autocrlf`, `uname -a` — and prefer a differential test against a known-good control file over trusting a single absolute result.
*Because* twice in one session an agent inspecting this repository through a Linux mount reported problems that do not exist on the owner's Windows machine. First: `core.autocrlf` reads as unset from the mount but is `true` on Windows — set in the **system** config shipped by the Git for Windows installer, not in anyone's personal global config, so it applies to every default Windows checkout — and the same commit showed 110 modified files with 23,654 phantom lines from one side and a clean tree from the other. Second: `grep -c $'\r'` behaves correctly under Linux but returns a false positive on every line of a pure-LF file under Git Bash on Windows, which would have condemned 29 correct files. Both readings were accurate where they were taken; neither described the repository. The habit that catches this is cheap: before trusting a tool's absolute output, run it against a control whose answer you already know.

---

## 6. Invariants and non-negotiables

The full text of most of these is in `CLAUDE.md`; this is the summary you should carry in working memory.

- **Middleware lives at `src/proxy.ts`. Never create `middleware.ts`.**
- **Never touch `.env`, `.env.local`, or any secrets file.** (G10)
- **Never add a dependency without flagging it first.** The stack is deliberately constrained — the entire `src/components/ui/` directory is one hand-rolled tooltip. There is no Radix, no shadcn, no Headless UI, no toast library.
- **Never introduce a new colour value without discussing it.** The palette is deliberately small: deep navy/near-black, one warm orange accent, white and muted grey text.
- **Do not route tutorials through the database.** They are static TypeScript. (4.3)
- **Never hardcode a platform count.** Read it from the database.
- **Moderation action-route policy, applied to every new action endpoint:** rate and vote routes must filter target lookups to `APPROVED` and return a generic 404 that does not distinguish "not found" from "not approved" — engagement signals must not accumulate on unapproved content, and the indistinguishable 404 prevents information disclosure. **Report routes deliberately do not filter**, because a report on pending content is a valid moderation signal.
- **Default moderation status is `PENDING`,** set by the schema. Submission routes rely on that default and must not set status explicitly. Public list endpoints filter to `APPROVED`.
- **No AI moderation.** Humans only. If automated flagging is ever added, it may flag for human review — never auto-publish, never auto-remove.
- **Never publish an exclusion or a platform criticism as a judgement.** State observable, date-stamped, primary-source-linked facts. `privacyLevel` is a factual signal, not a brand — `LOW` is informative, not disapproval, and must not be inflated to be polite. The full editorial standard is in `CLAUDE.md`.
- **Don't over-engineer.** The bar for added complexity is: does this pay for itself within six months.
- **Prefer incremental over aggressive refactors.** Small verifiable changes committed often.
- **Read before proposing changes** — both what you are editing and what consumes it. Re-read rather than relying on memory of an earlier read.
- **Flag contradictions rather than silently picking a side.** If this file, `CLAUDE.md`, the code, or a request disagree with each other, trust the code and say so.
- **Push freely, merge deliberately.** Pushing a branch is backup. Merging to main is the live gate and the only consequential action.

---

## 7. How work actually gets done here

There is one person. He is both the developer and the sole operator, and his review capacity — not model capability, not compute — is the binding constraint on everything. Every process rule below exists to protect it.

**The loop:**

1. **Plan in conversation.** Decisions, architecture, pushback and prompt-drafting happen in discussion with an assistant, not at the keyboard. The owner explicitly values *pushback before execution over efficiency*: if a plan is flawed, say so and wait rather than silently executing it.
2. **Recon read-only, first, always.** Before any edit: read the target files and their consumers, state what you found, and only then propose. This has repeatedly overturned the premise of a task — the tutorial architecture reversal, a "bug" that didn't exist, a config "fix" whose premise was inverted. Recon that changes the plan is the system working.
3. **Implement on a branch.** One branch per unit of work. `feature/`, `fix/`, `chore/`, `docs/` or `tutorials/` prefix. Commit after every meaningful change with a specific message.
4. **Gate locally:** `npm run typecheck` then `npm run build`. Both must pass.
5. **Open a pull request and stop.** `gh pr create --fill`. (G13)
6. **The owner reviews the Vercel preview by hand.** This is the real quality gate, not the automated one. (G11) He reviews screenshots and clicks through the affected flows, including signed-out.
7. **On his approval, squash-merge:** `gh pr merge <n> --squash --delete-branch=false`. Branches are retired deliberately in later sweeps, not at merge time.
8. **Verify the deployment against the Vercel API** before claiming anything is live. (G7) The executing agent owns this step, not the human.
9. **Write a handoff** capturing state, decisions, what was deliberately *not* done, and carry-forward items. This is why 15 sessions of context survive at all.

**Who verifies what:** automated gates verify that it compiles. The owner verifies that it works. Nothing else does. An agent must never claim a visual, browser or manual check it did not and could not perform — anything requiring one goes on an explicit "requires owner verification" list.

**On content work specifically:** the research pass and the review sitting are per-page and do not compress. Batching speeds only the middle step — mechanical transcription from a locked brief into TypeScript. The proven method is that all editorial judgement is resolved *upstream*, in a rigid brief where every field is final content with sources and a research date attached, so the building step decides nothing. When a brief is ambiguous, the correct behaviour is to stop, not to improvise. (G17)

---

## 8. Current state

Verified on the owner's machine on **2026-09-07**.

### Repository

Work happens on `main`. Before anything else, establish where you are and whether you are current: `git log --oneline -1`, `git status`, `git fetch origin --prune`, and confirm `main` matches `origin/main`.

Do not trust a commit sha written in any document in this repository, including this one. They are snapshots taken on a particular day and they rot. The repository is the only authority on its own state.

Roughly thirty local branches exist. Most are merged feature branches awaiting a hygiene sweep, including `tutorials/session-22-batch`, whose commits are patch-equivalent to a squash already on `main`. Per gate G6, `git branch --merged` gives false negatives on squash-merges here — verify with `git cherry` against the merge base before deleting anything, and use `git branch -D` only after independent confirmation. Six `backup/*` refs are deliberate safety nets; leave them alone.

### Line endings

The repository stores LF. `.gitattributes` declares `* text=auto eol=lf`, so every checkout — Windows, Linux, CI, container — gets LF. Line endings are a property of this repository, not of whoever's machine is looking at it.

That was not always true, and the failure mode is worth recognising. Before 2026-09-07 there was no `.gitattributes`, so behaviour depended entirely on each contributor's local `core.autocrlf`. On a Windows machine with `core.autocrlf=true` — which is the **system-level default shipped by the Git for Windows installer**, at `C:/Program Files/Git/etc/gitconfig`, not something anyone opted into — git normalised transparently and `git status` was clean. On a Linux checkout of the same commit — a container, a CI runner, WSL, or an agent working through a mounted volume — git compared raw bytes and reported 110 files modified with 23,654 insertions and 23,654 deletions and zero content change. Same repository, same commit, two completely different pictures, and the one you saw depended on where you were standing. The mechanism is visible in this repository's own history: the 26 files added by the handoff commit were authored as LF and committed as LF, and the very next checkout wrote all 26 back to disk as CRLF.

If you ever see a large diff that `git diff --ignore-cr-at-eol --stat` reports as empty, that is what you are looking at. It is not a change. Committing it would bury real changes in noise. `.gitattributes` is what prevents it — do not remove it.

Binary files are exempt and must stay that way. `text=auto` means *detect*, so git's own binary detection already spares them, and `.gitattributes` additionally declares `*.xlsx`, `*.ico` and `docs/archive/IMPLEMENTATION_TASKS.md` as `binary` so the exemption survives anyone later simplifying the first line. That last one is a `.md` file that is **UTF-16 LE with a BOM** — the same encoding fault as the `.env.local` incident behind G10 — so it reads as binary to git. Note that `.svg` is text and is correctly not listed.

Every file written to this repository uses LF.

Do not verify that with `grep -c $'\r' <file>`. Under Git Bash on Windows that command reports a false positive on every line of a pure-LF file; it works correctly under Linux, which is exactly the kind of environment-dependent result that produced the confusion this section documents. Use `tr -dc '\r' < <file> | wc -c` (expect `0`), or `file(1)`, or simply rely on `.gitattributes` to normalise at commit time.

The working tree carries no untracked items beyond the handoff documents themselves. `.claude/`, which holds local editor settings, is invisible here only because of a **machine-local** rule: git falls back to `~/.config/git/ignore` when `core.excludesFile` is unset, and on the owner's machine that file contains the single pattern `**/.claude/settings.local.json`. That rule is not in this repository. On a fresh checkout elsewhere — a container, a CI runner, another contributor — `.claude/settings.local.json` will show up as untracked. Note also that `.claude/` itself is not ignored; it disappears from `git status` only because that one file is currently its only member.

### What is shipped and live

- 170-platform catalog across a 20-category taxonomy, with a Discover page whose filters are a compact native-`<select>` bar with removable pills and a reactive count.
- Platform detail pages with Overview, Tutorials, Prompts and Discussions tabs.
- **29 tutorial pages**, static TypeScript in `src/data/tutorials/`, across three archetypes and eight categories.
- A four-question matching quiz with a public results page for signed-out users, a soft difficulty penalty with an "Advanced" badge, and a goal-relevance floor.
- Workflows, favourites, a For You page, account and pricing pages.
- Authentication via Clerk (development instance), payments plumbing via raw Stripe, both fully wired.
- A moderation pipeline: submissions default to `PENDING`, an email fires with HMAC-signed magic links, the link renders a confirmation page, and a button POST commits the decision. Replays are idempotent.
- Sentry error monitoring, Vercel Analytics and Speed Insights, Google Search Console.

### What is verified

Production was confirmed live against `7615a1f3` on 2026-07-27 — deployment `READY`, `aliasError: null`, apex and www bound. Everything above was verified by hand on a Vercel preview before its merge. **Nothing has been verified since 2026-07-27.** Given six weeks of drift in the AI platform market, assume tutorial content facts have decayed.

### What is owed

1. **A catalog liveness audit.** The highest-priority open item. Nothing detects whether a catalogued platform still exists; one confirmed-dead entry has already been found by accident.
2. **The maintenance cadence layer.** Specified in the batch playbook and gated on "20+ deep pages exist." There are 29. Overdue.
3. **The Jasper deduplication run.** Script merged and reviewed; only the operator run is owed. (G2)
4. **Clerk development→production migration.** A pre-paywall prerequisite. The DNS and OAuth reconfiguration has sharp edges; recon it before touching it.
5. **Local `main` is behind origin.** Trivial, but it is the first trap.
6. **Two dated re-check triggers that have now passed** without anyone checking: a promotional API rate that expired 2026-08-31 and is stated explicitly on a live page, and a branding change on another platform expected within roughly two months of late July.
7. **A `CLAUDE.md` Tier 3 lean-down** — convert duplicated strategy prose into pointers. Gates nothing.
8. **Branch hygiene.** Roughly 30 local branches, including six deliberate `backup/*` safety refs (leave those alone) and many merged feature branches. (G6)

### Known and accepted defects

- **Sora 2 is live in the catalog and is a discontinued product**, with an incorrect `costTier`. Known since 2026-07-27, unfixed. (4.21)
- **Overview-card metadata across the catalog is stale** in a way tutorial pages deliberately are not — it contains volatile version numbers that rot. A separate workstream, never started.
- **`/pricing` prerendering can exhaust Neon connection permits at build time.** One local build failed this way; a clean retry passed. Vercel prerenders identically, so production deploys can fail intermittently on a database limit unrelated to the code being shipped, and it worsens as page count grows.
- **Two tutorial pages carry a prompt-string gap** — the heading promises starter prompts but only one of four cards on each carries an actual prompt. Merged deliberately as a polish item.
- **A double-submit race in the moderation route.** Two POSTs between read and write could both pass the pending gate. Harmless at single-moderator scale; documented rather than fixed.
- **Quiz keyword buckets contain substring false-positives** with no word-boundary check — a finance keyword fires inside "first", a healthcare keyword inside "keystroke". Diagnosed, scoped (the fix is category-aware matching, since the four verticals map 1:1 to category slugs), never implemented.
- **`LoggedOutLanding` in `src/app/(app)/for-you/page.tsx` is dead code** — middleware auth-gates that route, so the signed-out branch is unreachable.
- **No admin moderation UI.** Status is flipped by hand in Prisma Studio.
- **No rate limiting** on any submission or vote endpoint.
- **15 pre-existing npm vulnerabilities** in the `xlsx` dependency, long acknowledged.
- **`tracesSampleRate` is 1 (100%)** in all three Sentry configs. Intentional at zero traffic; should drop to ~0.1 before public launch.
- **`changelogUrl` is set on many tutorial pages but never rendered.** This is deliberate — it feeds the future maintenance detection layer. **Do not "clean it up."**

---

## 9. Where everything lives

### Repository map

```
START-HERE.md              ← this file
CLAUDE.md                  ← the standing engineering briefing (authoritative on conventions)
AGENTS.md                  ← one rule: this is Next.js 16, read its docs before writing framework code
README.md                  ← stock create-next-app boilerplate; carries no project information
.gitattributes             ← `* text=auto eol=lf`, plus explicit binary exemptions (§ 8)
package.json               ← scripts: dev, build, start, lint, typecheck, db:*
next.config.ts             ← Sentry wrapper + category redirects (many-to-one only)
prisma.config.ts
eslint.config.mjs, postcss.config.mjs, tsconfig.json
sentry.server.config.ts, sentry.edge.config.ts
data/                      ← ai_platforms_enhanced_metadata.xlsx (original import source)
docs/
  archive/                 ← 4 pre-Clerk/Stripe planning docs. Do NOT follow their instructions.
  history/                 ← 24 archived Claude-project documents (see its README.md)
  session-4-manual-test.md ← the only manual test checklist in the repo
prisma/
  schema.prisma            ← canonical data model
  migrations/              ← 4 migrations
public/
scripts/                   ← operator-run scripts. Next.js never imports this directory.
src/
```

### Source map

| Path | What lives there |
|---|---|
| `src/proxy.ts` | **Middleware.** Clerk auth gating, plus the one-to-many category redirects that cannot live in `next.config.ts`. |
| `src/app/(app)/` | The authenticated app surface: `discover`, `platform/[slug]` (+ `prompts`, `discussions`), `workflows`, `quiz`, `for-you`, `account`, `pricing`, `onboarding`, `tutorials`. |
| `src/app/(app)/tutorials/page.tsx` | A "coming soon" placeholder **by design.** Live tutorials are the Tutorials tab on each platform page, not a standalone route. |
| `src/app/quiz/results/` | The **public** quiz results page for signed-out users. Outside the `(app)` group deliberately. Historically where bugs hide, because it is the anonymous path. |
| `src/app/api/` | Route handlers: platforms, categories, search, recommendations, user/quiz, prompts (rate/report), discussions (replies/vote/report), moderation, and the three Stripe routes. |
| `src/components/tutorials/platform-tutorials.tsx` | **The shared tutorial renderer.** One change here benefits all 29 pages — which is the only justification for touching it. Per-page visual divergence is the trap. |
| `src/components/platforms/`, `prompts/`, `discussions/`, `workflows/`, `layout/`, `ui/` | Feature-grouped components. `ui/` contains exactly one hand-rolled tooltip. |
| `src/data/tutorials/types.ts` | **The compile-time contract for all tutorial content.** Author new pages straight against it. |
| `src/data/tutorials/index.ts` | The registry. Adding a page is **two manual steps**: create the file *and* add its import plus `[x.platformSlug]: x` here. |
| `src/data/tutorials/*-getting-started.ts` | 29 tutorial pages. Canonical references: `chatgpt` (prompts), `midjourney` (prompts/image), `zapier` (recipes), `ollama` (pick-and-setup, the only one with a setup section). |
| `src/data/workflows/`, `src/data/research/` | Static workflow definitions and one research document. |
| `src/lib/` | `platforms.ts` (counts), `discover-filters.ts` (the Discover URL contract and its enum whitelists — the security-relevant one), `recommendations-core.ts` (quiz scoring), `quiz-map.ts`, `auth-db.ts` (Clerk↔Prisma bridge), `stripe.ts`, `email.ts`, `moderation-token.ts` (HMAC), `labels.ts`, `platform-slugs.ts`. |
| `scripts/restructure-categories-2026-05.ts` | Contains `FINAL_CATEGORIES`, **the authoritative category name↔slug map.** Pull category slugs from here, never from memory. |
| `scripts/dedupe-jasper-platforms.ts` | See **G2** before you so much as open it. |

### External systems

| System | What is in it | Who can reach it |
|---|---|---|
| **GitHub** — `stevensonzj-ai/launchpad-hq` | Source, pull requests, ~30 branches. The `gh` CLI is installed and authenticated on the owner's machine. | Owner |
| **Vercel** — project `launchpad-hq` | Hosting, production and preview deployments, **all runtime environment variables**, Analytics, Speed Insights. Auto-deploys on merge to `main` and on every PR branch. | Owner |
| **Neon** — Postgres | **The production database.** Branch `dev-local` (`ep-hidden-truth-aj8wfxc2`) for local work; production on `ep-odd-mud-ajdk8f99`. The Neon SQL Editor is the de facto admin tool. Roles span branches (G4). | Owner |
| **Clerk** | Authentication. **Development instance only** — no production instance exists. Verification is 6-digit in-page codes, not magic links; a fix in the quiz flow depends on that, so if it ever changes to magic links, that flow breaks. | Owner |
| **Stripe** | Payments. Test mode. No production account yet — it requires the LLC and business bank account first. | Owner |
| **Cloudflare** | DNS for `launchpadhq.io`. Vercel A/CNAME, Google MX and SPF and DKIM, Resend `send.` MX and DKIM, DMARC. | Owner |
| **Resend** | Transactional email. Root domain verified. Send-only API key. | Owner |
| **Sentry** — org `launchpad-hq`, project `javascript-nextjs` | Error monitoring and tracing. DSN hardcoded (correctly). | Owner |
| **Google Workspace** | `zach@launchpadhq.io`. Owned by a dedicated Google account, not the personal one, for reasons documented in the Session 9 archive. | Owner |
| **Google Search Console** | Domain property, Cloudflare-DNS verified. **Shows zero query data and will continue to** until the site-wide `noindex` is lifted and pages index — weeks to months after that. Do not plan around GSC data; it structurally does not exist yet. | Owner |
| **Claude project "LaunchPad HQ"** | Where all 24 archived documents came from. **You cannot see it.** It may still be receiving updates that never reach this repository. | Owner |

### What is explicitly NOT in this repository

- **Every credential.** (§ 4b)
- **Vercel environment variable values.** The names are documented in § 4b; the values exist only in Vercel and on the owner's machine.
- **Any database content.** 170 platform rows, 20 categories, users, prompts, discussions — none of it is in git. `data/ai_platforms_enhanced_metadata.xlsx` is the original import source, not a current export. `scripts/export-platforms.ts` exists if you need a snapshot, and running it is an operator step.
- **DNS configuration.** Cloudflare only.
- **Any test suite, CI test job, or coverage report.** None exist.
- **Deployment configuration beyond `next.config.ts`.** Build settings, environment scoping and domain bindings live in Vercel.
- **The excluded-platforms holding document.** Deliberately unpublished pending legal review; it lives in the Claude project.
- **Design assets, brand files, or a design system document.** The design system exists only as conventions described in `CLAUDE.md` and as the code itself.

---

## 10. The business picture

Everything here is drawn from the archived documents. Where they establish nothing, the gap is marked rather than filled.

### Model

- **Price: $9/month**, deliberately set below the $10 threshold at which users start scrutinising a subscription. Positioning is "subscribe and forget."
- **Free trial:** one week, no credit card. *(Note: this shape came from the abandoned Clerk Billing plan — see 4.1. Whether raw Stripe is configured the same way is unverified. `TODO(Zach)`: confirm the trial mechanics that actually exist in the Stripe configuration.)*
- **Gating philosophy, locked:** gate interaction, personalization and depth — **never** the catalog's existence or browsability. A full-site gate was explicitly considered and rejected because it would destroy the organic search funnel, present maximum friction to the lowest-confidence users, and delete top-of-funnel rather than convert it.
- **Three access levels:** read freely with no account (catalog, filters, quiz, platform pages, lighter tutorials) → free account to contribute (save results, favourite, post) → paid (deep tutorials, the For You news feed, favourites-driven personalization).
- **The monetization-ready bar** — the definition of "ready to charge," and all three must be true: the For You **news feed** works; tutorials have a real first batch live; personalization is solid. Two of the three now arguably hold. **The news feed is the entire retention mechanism** — it is the only feature giving anyone a reason to return next week, and it has zero work done.
- **Launch prerequisites, in dependency order:** form the LLC (Texas, ~$300) → EIN → business bank account → production Stripe account → Clerk production migration → run the Jasper dedup → lift `noindex` → enforce the paywall. Almost all coding work sits *off* this critical path.

### Market and competition

- **Target user:** an AI-curious beginner, probably not technical, possibly paying for one AI tool already, price-sensitive, who wants help deciding what else is worth their time and money.
- **Named competitors** (monitored via a planned monthly manual scan): Futurepedia, There's An AI For That, Toolify, AlternativeTo, Future Tools, Coda One.
- **The stated differentiator:** curation and editorial reasoning. There are 15,000+ AI tools listed across the aggregators; being a "real platform" is not enough to be included here.
- **The named strategic risk:** Google's March 2026 core update made scaled content abuse — many thin, templated pages — a top enforcement target, and a flag hits the *whole domain* including catalog rankings already earned. Every rule in the tutorial specification exists to make each page defensibly substantive. This is why the site is `noindex` while the catalog fills in, and why page production is deliberately staged rather than dumped.

### What is unknown

- `TODO(Zach)`: **Traffic and audience.** Analytics have run since June 2026, but no archived document records actual numbers beyond a single early data point. Unknown: current monthly visitors, top entry pages, sources.
- `TODO(Zach)`: **Demand evidence.** No search demand data exists and none will until `noindex` lifts. Page-production ordering has been driven by editorial judgement alone.
- `TODO(Zach)`: **Willingness to pay.** No pricing validation, no user interviews, no waitlist, no signal that anyone will pay $9/month. The price was reasoned to, not tested.
- `TODO(Zach)`: **User count.** Clerk holds it; no document records it.
- `TODO(Zach)`: **Cost to run.** Every service is on a free tier except Google Workspace (~$8.40/month) and the domain. Total monthly cost is not written down anywhere.
- `TODO(Zach)`: **Competitive position.** Competitors are named but never analysed — no feature comparison, no assessment of their traffic, monetization or vulnerability.
- `TODO(Zach)`: **What success looks like.** Explicitly a hobby project not depended on for income, with no revenue target, no user target, and no stated point at which it would be judged a failure or wound down.
- `TODO(Zach)`: **Legal.** A small-business attorney review is planned for the excluded-platforms page and single-member LLC treatment. Not done. No terms of service or privacy policy is mentioned anywhere in the archives — **for a site that collects accounts, payments and user submissions, verify whether these exist.**

---

## 11. Future ideas, rejections, and standing debt

### Backlog, with rough cost

| Item | Rough cost | Note |
|---|---|---|
| Catalog liveness audit | 1 session + operator DB step | The top priority. Also needs a decision: remove dead platforms, or mark them discontinued? The latter is better content but needs a schema field and a render treatment, making it a feature rather than a data fix. |
| Maintenance cadence layer | 1–2 sessions | Weekly cron detects staleness → a re-research pass produces a review brief → the owner adjudicates. Overdue. **Its make-or-break property is trust:** a brief that cries wolf or misses real changes collapses the system. |
| Next tutorial batch (10–15 pages) | 1 research session + 1 build + 1 review sitting | Deferred candidates already identified. Should follow the liveness audit, not precede it. |
| Admin moderation queue | 1 session | Replaces flipping status by hand in Prisma Studio. |
| Full onboarding flow | 1–2 sessions | Currently a placeholder page. |
| For You news feed | Its own design session, then a build | The retention keystone. Gates the paywall. **Full automation is off the table as a brand requirement** — unsupervised AI publishing AI-platform news will hallucinate updates and prices, poisoning the credibility the catalog earns. AI gathers and drafts; a human reviews and publishes. |
| Rate limiting on submissions | Small | Lands before contribution is actively marketed. |
| Platform comparison tool | Unscoped | Named as a paid feature; may not exist at all. |
| Subscription tracker with cost alerts | Unscoped | Same. |
| Excluded Platforms page | Blocked | Needs a 200–300 word legal boilerplate, ideally attorney-reviewed, before anything is published. |
| Glossary | Small, form undecided | Static page vs. content collection vs. table. Only bites once pages carry un-glossed long-tail terms. |
| Weekly digest email | Unscoped | Paid feature. |

### Explicitly rejected — do not resurrect without new evidence

- **A browser extension overlaying tutorials onto vendor sites.** Cut. Browser security prevents the iframe approach, and an extension is a separate product with its own maintenance burden.
- **An API sandbox ("try it here").** Cut from v1. Attractive, but creates real operational exposure — abuse, runaway API costs, moderation liability, provider schema changes — that directly contradicts the low-cost, hands-off operating principle. Revisit only if traffic ever justifies it.
- **A multi-agent "AI Ops" system** with scheduled research, content, quality, data and moderation agents behind an admin dashboard. Cut as over-engineered, and as resting on a misunderstanding of what agent parallelism actually provides.
- **RSS scraping with AI summarization.** Cut — that is a second product, not a feature of this one.
- **Mobile apps.** Responsive web is sufficient.
- **A full-site paywall.** Rejected on funnel grounds. (§ 10)
- **AI auto-moderation.** Right architecture, wrong time — build it when manual review becomes a chore, using real submission data to design against. If built: aggressive auto-approve, conservative auto-reject, escalate the middle, keep an audit log, and place it *in front of* the existing email flow rather than replacing it.
- **A hand-rolled popover primitive** for the Discover filters. Rejected; Radix is the sanctioned upgrade if native controls ever prove insufficient. (4.9)
- **Enriching platform descriptions to improve quiz matching.** Rejected — it worsens over-matching and amounts to keyword stuffing. Structured metadata scales; free-text substring matching degrades as buckets grow.

### Standing technical debt

- **No test suite.**
- **Legacy `Prompt.author` column** coexisting with the `user` relation; needs a backfill then a drop migration.
- **`LoggedOutLanding`** dead code.
- **Quiz keyword substring false-positives** with no word-boundary check.
- **Dormant Prisma `Tutorial` and `UserProgress` models.** Documented dead scaffolding. Leave them; removal is its own destructive-migration task and is not worth bundling into anything.
- **`react-query` is installed** — decide whether to adopt it consistently or remove it.
- **Unbounded `favoriteIds` queries** and a hardcoded `take: 200` on Discover.
- **Cross-tab favourites desync.**
- **Misplaced Sentry build options** in `next.config.ts` — `automaticVercelMonitors` and `treeshake` are nested under a `webpack:` key where they are silently ignored. No runtime impact.
- **A `pg` SSL deprecation warning** on any database-touching build. Cosmetic; address when `pg` is next bumped.
- **Build time trend.** Roughly 50–70 seconds historically, ~146 seconds on the last large batch deploy. Logged as a baseline, not chased. If it climbs toward a timeout, that trend started here.
- **Two string styles across the 29 tutorial files** — earlier files use double-quoted strings with escapes, later ones use template literals. The template-literal style is better (apostrophes and quotes transcribe with zero escaping) and should be the convention. Do not introduce a third.

---

## 12. If you are an autonomous agent

The owner's stated intent is **eventual full autonomy, reached by starting small and working up.** That is the right instinct, and this section is how to get there without a catastrophe on the way. What follows is a ladder, not a permission slip. **You are currently on Level 1.** Do not self-promote.

### Level 1 — where you are now

**You may:** read anything except secrets files; run `git status`, `git log`, `git diff`, `git branch`; create branches; write and edit code and documentation on a branch; run `npm run typecheck`, `npm run build`, `npm run lint`, `npm run dev`; run read-only recon; open a pull request; write handoffs.

**You may not:** merge to `main`; push to `main`; run any database command, migration, seed or data script; read, write or print any `.env*` file or anything under `.clerk/`; add a dependency without explicit approval; run `git clean -f`, `git push --force`, or any history rewrite; execute `scripts/dedupe-jasper-platforms.ts` under any circumstances; change environment variables anywhere; publish content.

**Before your first write, always:** run `git status` and record a clean baseline. **Create the branch before writing any file.** If git or the shell is unavailable, **do not** write files as a fallback — writing without a branch contaminates whatever is checked out, which in this repository is currently an already-merged branch. This exact failure has happened here before.

### Stop and ask — no exceptions

- Anything touching the database: schema, migration, seed, data script, or a query that writes.
- Anything touching authentication, payments, or money.
- Anything touching secrets or environment variables.
- Merging to `main`, or any action that would deploy to production.
- Adding a dependency, or introducing a new colour value.
- Publishing user-facing content, or any change to what the site asserts as fact.
- A change that would cross the boundary of the task you were given — for example, a bug fix that turns out to require touching the auth flow.
- Any request that contradicts this file, `CLAUDE.md`, or the code. Name the contradiction; do not pick a side silently.
- Anything you were told to do that you can see is wrong. The owner has said explicitly and repeatedly that he would rather re-plan than unwind a commit.
- Discovering that a document you were relying on is false. Add it to § 4 rather than working around it.

### Never do these alone, at any level

1. **Never run the Jasper deduplication script.** (G2)
2. **Never execute a migration or data script against any database.** Write it; the operator runs it, Neon branch first. (G3)
3. **Never touch `.env`, `.env.local`, or any secrets file.** (G10)
4. **Never `git clean -f`.** (G5)
5. **Never force-push or rewrite history** without a backup ref, and never `--force` where `--force-with-lease` will do.
6. **Never publish content you have not verified against a live primary source that day.** (G16)
7. **Never fabricate content to satisfy a request.** Stop and report the blocker — a clean early stop beats a burned session, and fabricated facts are the worst possible outcome on an accuracy-is-the-product site. (G17)
8. **Never claim a visual, browser or manual verification you did not perform.** Put it on a "requires owner verification" list instead.
9. **Never create `middleware.ts`.**
10. **Never destroy or overwrite work you cannot account for.** Preserve, then flag.

### Working rules that make autonomy safe here

- **Recon before action, always.** State what you found before writing code. Recon has overturned the premise of a task more than once in this project — that is the process working, not a delay.
- **One branch per unit of work, committed as you go.** This is what makes an interrupted session safe: finished work is on disk, only the in-progress piece is incomplete, and it is isolated.
- **"Blocked" is a valid success state.** A task that is honestly documented as blocked, with the reason and the unblock steps, is a *complete* outcome. Never grind against an unsatisfiable goal — that is how an agent starts eroding real work to make a checker pass.
- **Circuit-break.** The same operation failing three times means stop and mark it blocked. Systemic failures across multiple tasks mean stop the whole session, write the handoff, and end.
- **Reconcile against the goal after each task.** Confirm branches and commits actually match what you believe you did. Correct drift before carrying it forward.
- **Self-correct with disclosure, never silently.** Investigate read-only, document the finding, correct only if non-destructive and clearly safe, flag anything uncertain.
- **Write the handoff.** State what you completed, what is blocked and how to unblock it, backup refs created, environment variables needed (names and generation commands — **never values**), suggested merge order, what requires owner verification, and an honest self-assessment including what this document got wrong. Fifteen sessions of context survive only because someone wrote them down each time.

### The ladder to full autonomy

Each level is earned by evidence, not elapsed time. The gate for each is stated so it can actually be checked.

**Level 2 — merge documentation-only changes.** *Gate:* ten or more pull requests reviewed and merged by the owner with no correction required, and a demonstrated instance of correctly stopping to ask rather than proceeding.

**Level 3 — merge code changes to `main` and verify the deployment.** *Gate:* Level 2, plus **a real test suite covering at least the quiz scoring, the Discover filter URL contract with its enum whitelists, and the moderation token and route policy.** Human preview review is currently the only thing catching bugs that typecheck and build both pass (G11). Removing the human without replacing that gate leaves nothing. **A test suite is the hard prerequisite for this level and it does not exist.**

**Level 4 — operate against the database.** *Gate:* Level 3, plus a documented and enforced Neon-branch-first workflow, plus a verified rollback path (the `.gitattributes` requirement — so a destructive change is never buried in 23,000 lines of line-ending noise — is now satisfied). Even then: production writes stay operator-gated. The failure history in § 5 is disproportionately database incidents.

**Level 5 — full autonomy including releases.** *Gate:* everything above, running clean for a sustained period, plus monitoring that would actually catch a bad release — which today means Sentry alerting, since there is no synthetic checking and no uptime monitor.

**The honest assessment:** this repository is not currently safe for autonomous operation above Level 1, and the reason is not the agent — it is that the human review step is the *only* correctness gate that exists. Build the tests and fix the Jasper script's default before raising the ceiling. Those two changes are worth more toward autonomy than any amount of agent capability.

---

*Written 2026-09-07 from the repository as it stood on that date and from 24 documents exported out of the Claude project the same day. Where this file disagrees with the code, the code wins — and this file should be corrected.*
