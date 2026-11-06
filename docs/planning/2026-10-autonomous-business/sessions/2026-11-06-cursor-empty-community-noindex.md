# 2026-11-06 — cursor — empty community pages noindex

**Decided:** Zach approved exactly three changes. Keep discussions and prompts, and keep account-required posting. Do not add 301s, IP rate limits, seeded posts, database writes, migrations, or MCP / `/mcp` edits.

**Changed (draft PR #163, branch `cursor/empty-community-noindex-6009`):**
- Empty discussions/prompts tabs (and the matching path pages) collapse to "Start the discussion" / "Share the first prompt". The button opens the existing sign-in line or post form. No "Open full … page" link while the approved count is 0. Non-empty sections are unchanged.
- `/platform/{slug}/discussions` and `/prompts` are `noindex, follow` until the cached approved count is at least 1, then indexable as before. Not added to `robots.txt`. Still omitted from the sitemap; a test locks that.
- Prompt output links render with `rel="ugc nofollow noopener noreferrer"`. Discussion and reply bodies stay plain text.
- Tests: `npm test` — 1463 passing. Follow-up: `createElement` children go in the props object so `next build` typecheck accepts `community-empty.test.ts` (same pattern as `outbound-link.test.ts`).

**Open / Zach to decide:**
- After merge, curl a known-empty path (ChatGPT discussions) for `noindex, follow`, Activepieces discussions for no robots meta, and confirm the sitemap and `robots.txt` are unchanged. No approved prompt exists yet, so the `ugc` rel shows up live only after one with an output URL is approved.
- Approving a post already expires the platform page-row cache tag, which is what flips indexability. If that expiry fails, the count can trail until the catalog cache refreshes.
- 301 of empty paths to the parent was considered and not done.
