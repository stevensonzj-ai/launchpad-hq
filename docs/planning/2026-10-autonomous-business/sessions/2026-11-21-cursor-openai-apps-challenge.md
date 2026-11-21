# 2026-11-21 — cursor — OpenAI apps challenge onto current main

**Decided:** Keep draft PR #164 a draft. Merge `origin/main` in (no rebase, no force push). Sign-in stays main's protected list only: `/account` and `/onboarding`. `/.well-known/` is left out of the proxy matcher, so Clerk never runs on the domain file. The file stays the placeholder.

**Changed (draft PR #164, branch `cursor/openai-apps-challenge-d598`, merge `717de4e`):**
- `src/proxy.ts`: dropped the old public allowlist. Matcher negative lookahead is `\\.well-known/` (with `data/` and the extension skip).
- `next.config.ts`: kept main's `/alternatives` redirect and the `Content-Type: text/plain` header on `/.well-known/openai-apps-challenge`.
- `src/lib/markdown/negotiate.ts`: `.well-known` stays in `KNOWN_TOP_LEVEL`, so Accept: text/markdown does not rewrite the path.
- `public/.well-known/openai-apps-challenge` is still exactly `REPLACE_WITH_OPENAI_TOKEN` (25 bytes, no trailing newline).
- Tests updated off the old public-route list. Challenge path is covered as not protected, not rewritten, and text/plain.
- `npm test` 1639 pass. `npm run typecheck` pass. `npm run lint` 0 errors, 5 existing warnings in quiz/discussion/prompt components.

**Open / Zach to decide:**
- Replace `REPLACE_WITH_OPENAI_TOKEN` with the portal token before taking #164 out of draft. Body must be that token alone, no trailing newline.
- After the swap, the preview check is: 200, `Content-Type: text/plain`, body equal to the token, no redirect on the path without a slash.
