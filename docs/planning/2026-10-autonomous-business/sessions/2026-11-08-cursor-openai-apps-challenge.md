# 2026-11-08 — cursor — OpenAI apps domain challenge

**Decided:** Serve `/.well-known/openai-apps-challenge` from a public file. Next matches `public/` before an app route, and its static server would label an extensionless file `application/octet-stream`. A `headers()` rule sets `Content-Type: text/plain` first; the static server keeps a type that is already set. The file stays a placeholder until the real token is swapped in.

**Changed (draft PR #164, branch `cursor/openai-apps-challenge-d598`, `1caa4d6`):**
- `public/.well-known/openai-apps-challenge` is exactly `REPLACE_WITH_OPENAI_TOKEN`, no trailing newline.
- `src/proxy.ts` lists the path as public and drops it from the matcher, so Clerk never redirects it or adds auth headers.
- `next.config.ts` sets `Content-Type: text/plain`.
- `.well-known` is a known public directory, so a Markdown request is not rewritten away from the file.
- Not in the sitemap. Public `robots.txt` does not disallow the path.
- `npm test` — 1464 passing. `npm run typecheck` — pass. `npm run lint` — 0 errors (5 existing warnings in discussion/prompt components, not touched).

**Open / Zach to decide:**
- Replace `REPLACE_WITH_OPENAI_TOKEN` with the portal token before taking #164 out of draft. The body must be that token alone, with no trailing newline.
- After the swap, curl the preview: 200, `text/plain`, body equal to the token. A trailing slash 308s to the bare path (Next's default). The verifier should request the path without a slash.
