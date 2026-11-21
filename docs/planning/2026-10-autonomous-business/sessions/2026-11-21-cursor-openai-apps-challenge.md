# 2026-11-21 — cursor — OpenAI apps challenge onto current main

**Decided:** Keep draft PR #164 a draft. Merge `origin/main` in (no rebase, no force push). Sign-in stays main's protected list only: `/account` and `/onboarding`. `/.well-known/` is left out of the proxy matcher, so Clerk never runs on the domain file. The file stays the placeholder.

**Changed (draft PR #164, branch `cursor/openai-apps-challenge-d598`, merge `717de4e`):**
- `src/proxy.ts`: dropped the old public allowlist. Matcher negative lookahead is `\\.well-known/` (with `data/` and the extension skip).
- `next.config.ts`: kept main's `/alternatives` redirect and the `Content-Type: text/plain` header on `/.well-known/openai-apps-challenge`.
- `src/lib/markdown/negotiate.ts`: `.well-known` stays in `KNOWN_TOP_LEVEL`, so Accept: text/markdown does not rewrite the path.
- `public/.well-known/openai-apps-challenge` now holds the portal token Zach supplied (43 bytes, no trailing newline). The value is not copied here.
- Tests updated off the old public-route list. The routing test checks the challenge file is 43 bytes, has no `0a`, and matches the token.
- `npm test` 1639 pass before the token swap. `npm run typecheck` pass. `npm run lint` 0 errors, 5 existing warnings in quiz/discussion/prompt components.

**Open / Zach to decide:**
- #164 stays a draft until Zach takes it out. No production change in this step.
- Preview check after the token swap: 200, `Content-Type: text/plain`, body byte-identical to the token, no redirect on the path without a slash.
