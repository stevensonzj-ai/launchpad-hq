# 2026-10-29 — X-watch catalog prep (catalog audit 12)

Agent: Claude (Claude Code), branch `catalog/x-watch-1029`. Prep only: no database access, nothing run against Neon, not pushed.

## What changed

- `src/data/catalog-audits/audit-12.ts` — patch data and pure diff logic.
- `scripts/update-catalog-audit-12.ts` — operator runner (same guard block as audit 11, byte for byte).
- `src/data/catalog-audits/audit-12.test.ts` — 13 tests, added to `npm test`.
- `package.json` — `db:update-catalog-audit-12`.

How it differs from audit 11: it **only appends**. Each note is added to `description` (or `currentPricing` for OpenAI API) only while the field doesn't already contain it, so existing text is never rewritten. `kling-ai.apiAvailable` changes false → true only while it is still false. Every row keeps its `updatedAt`, because a note re-checks none of the row's other text, and each note carries its own "as of 2026-10-29". Dry-run prints `(was empty)` when a field was empty before the note.

**Empty descriptions are skipped.** A description note is not written while the row's description is empty, null or whitespace, so a dated note never becomes a row's whole description. `currentPricing` notes and the guarded `apiAvailable` change still apply on those rows. The runner logs `<slug>: description note skipped (empty description)` for each one (no values printed); the helper is `audit12SkippedEmptyDescription`. On the prod-derived branch, **gemini, chatgpt, openai-api, github-copilot, runway, suno, notion-ai and mistral-vibe have empty descriptions**, so their description notes are skipped pending proper descriptions. The verified facts stay recorded in this note (table below) and in `audit-12.ts` for that later pass. Expected on the snapshot (same empty rows): **2 rows / 3 field changes** — `openai-api.currentPricing`, `kling-ai.description` and `kling-ai.apiAvailable` — and 0 on a re-run.

## Items (all verified 2026-10-29 on the vendor's own page)

| # | Row | Result | Source |
|---|---|---|---|
| 1 | gemini | **Applied.** Carbon goes first to "a subset of cyber defenders", then trusted partners via the Fairwind Program. Introductory API price $2/$10 per 1M input/output tokens, then $4/$20. The page gives no end date for the introductory price. | https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/ |
| 2a | openai-api | **Applied, corrected.** $1/$5 per 1M confirmed on the post. The 1.05M context is not on the post; it is on the model page as 1,050,000. The model page also says prompts over 272K input tokens cost more. | https://openai.com/index/introducing-gpt-6-1-terra/ , https://developers.openai.com/api/docs/models/gpt-6.1-terra |
| 2b | chatgpt | **Applied.** Pro tiers get $100/$200/$500. Business gets $20 per paid Standard seat or $100 per paid Premium seat, pooled and capped at $500 per workspace a month. The subscription must be paid and at least 7 days old. | https://developers.openai.com/api/docs/guides/chatgpt-api-credits |
| 2c | chatgpt (iCloud) | **Skipped.** The given URL is the general "Plugins in ChatGPT" article and doesn't mention iCloud. Only press coverage confirms it. | https://help.openai.com/en/articles/20001256 |
| 3 | github-copilot | **Applied, corrected.** GA on all Copilot plans, with Fusion Standard/High/Max. The page **does not say it replaces Auto**: it combines HydraFusion with auto model selection. The 30% discount is "for a limited time" with **no end date**, so it is left out. | https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion/ |
| 4 | Hermes Agent (Nous) | **Skipped: not in the catalog.** The page also contradicts the lead. The plans are Free/Plus $20/Super $100/Ultra $200 (prices *are* listed). Cloud Agents are billed daily, separately from the plans. No daily/weekly limits are listed. | https://portal.nousresearch.com/cloud |
| 5 | kling-ai | **Applied, corrected.** Without input video: $0.157/s at 720p and $0.235/s at 1080p. The lower with-input-video rates were added too. The page doesn't say "fully available". `apiAvailable` false → true. | https://kling.ai/document-api/pricing/base/video.md |
| 6 | runway | **Applied.** "included in every paid plan". Free users can use built-in and shared apps but can't build their own. | https://runway.com/news/company-news/introducing-runway-app-studio |
| 7 | suno | **Applied, wording corrected.** The page says "Available on all Suno plans" but doesn't name Free, so the note doesn't say "incl. Free". The beta has an early-access sign-up. | https://suno.com/release-notes/suno-mcp-beta |
| 8 | notion-ai | **Applied, corrected.** The help page confirms speaker labels, and the "Notion Meetings Add-on" (a Chrome extension for Google Meet) labels speakers in group meetings too. There is no release date, so the note doesn't say "now". | https://www.notion.com/help/ai-meeting-notes |
| 9 | mistral-vibe | **Applied.** "The Responses API is in public preview." No date on the page. | https://docs.mistral.ai/studio/conversations/responses |

New listings: **none added.**
- AssemblyAI is already listed (`assemblyai`). TTS-1 at $15 per 1M characters is verified on https://www.assemblyai.com/pricing. It could be a follow-up note on that row, but it wasn't in this audit's scope.
- Nemotron 3.5 (official page not found; it's published as "Nemotron 3.5 ASR", not "Transcribe") and Liquid AI LFM3 (open-weight 2B dev models) are skipped. Neither is beginner-relevant or a category gap.
- Genie 4 and the Anthropic government discount were skipped as instructed.

## Open / for Zach

- Eight rows (gemini, chatgpt, openai-api, github-copilot, runway, suno, notion-ai, mistral-vibe) need proper descriptions written. Their audit 12 description notes are held until then; re-running audit 12 after the descriptions land will append them.
- Fact files (`src/data/facts/*`) and the MCP catalog snapshot were not updated. The snapshot can only be rebuilt from the local export.
- `openai-api` still shows stale GPT-4o pricing from 2026-04 ahead of the new note.

## Ship steps (after the Neon reset, 7 PM CT Oct 31)

1. **Neon branch run.** Point `DATABASE_URL` at a fresh branch of prod. Run `npm run db:update-catalog-audit-12` (dry-run): expect 2 rows / 3 fields, plus 8 `description note skipped (empty description)` lines. Then run with `-- --apply`. Re-run the dry-run: it must print `audit12: 0 rows / 0 field changes`. Spot-check rows in Prisma Studio.
2. **Take a prod restore point** in the Neon console before writing.
3. **Prod run.** Run `Remove-Item Env:DATABASE_URL` (G14), then point at prod. Set `$env:CONFIRM_PROD_HOST='ep-odd-mud-ajdk8f99'`, then run `npx tsx scripts/update-catalog-audit-12.ts --confirm-production` (dry-run). Then run with `--confirm-production --apply`, then the dry-run again (expect 0). Run `Remove-Item Env:CONFIRM_PROD_HOST`. Then run `npm run cache:revalidate`.
4. **Post-merge check.** Open the kling-ai and openai-api platform pages and MCP `get_pricing_facts` for kling-ai / openai-api. Confirm the notes show, nothing else changed, and the `updatedAt` dates did not move.
