# 2026-11-06 — cursor — catalog audit 34 (play-ht and kakao-brain-karlo hidden)

**Decided:** Hide `play-ht` and `kakao-brain-karlo` after the Nov 6 2026 recheck. Same pattern as relay-app / hedra: fact-file `visibility: "hidden"` plus `HIDDEN_PAGE_REDIRECTS`. Never delete rows, fact files, or history. Code-only: no Neon branch, no database script, no prod write.

**Changed:**
- `src/data/facts/play-ht.ts`: `visibility: "hidden"`, lifecycle stays `discontinued`, `status.checkedAt` / `verifiedAt` `2026-11-06`, changelog notes no apex A record, `app.play.ht` `DEPLOYMENT_NOT_FOUND`, and the 301. Secondary-source framing kept (Bloomberg).
- `src/data/facts/kakao-brain-karlo.ts`: already hidden. Dates refreshed; changelog notes the Kakao DevTalk recheck and the whole-tree 301. `sourceUrl` stays the DevTalk notice.
- `src/lib/catalog-redirects.ts`: `play-ht` → `/discover?category=voice-speech`; `kakao-brain-karlo` → `/discover?category=image-generation-editing`. Karlo removed from `RETIRED_GUIDE_SLUGS` so `/guide` does not chain. Neither slug has a live or retired guide file.
- `src/lib/mcp/catalog-snapshot.json`: `play-ht` moved from listed rows to `hidden_rows` (215 listed). Karlo was already hidden.
- Tests: `audit-34.ts` / `audit-34.test.ts` (wired into `npm test`); catalog-visibility, snapshot row count, and the two JSON-alternate assertions that treated PlayHT as a listed discontinued tool.

**Open / Zach to decide:**
- Deploy, then the fact-file hide drops both from Discover, search, sitemap, and the public API. The database rows stay.
- No primary PlayHT/Meta shutdown notice was found. Secondary framing stays.
- `naver-hyperclova-x-cue` was left alone (audit 28). `beatoven-ai` stays listed.
