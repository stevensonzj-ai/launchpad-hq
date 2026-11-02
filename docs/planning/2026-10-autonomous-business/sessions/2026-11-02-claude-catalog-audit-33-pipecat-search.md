# 2026-11-02 — claude — catalog audit 33 (Pipecat stops ranking for text-to-speech)

**Decided:** fix audit 32's side effect with data only. Pipecat ranked 5th for "text to speech voiceover" (free), "text to speech" because its description said "text-to-speech services" and "speech-to-text" (phrase and word matches in the `description` field; nothing else in Pipecat's row or fact file is scored). No search code, weights, cutoff, tokenization or MCP surface touched; no other platform's data touched.

**Changed (branch `audit-33-pipecat-search`, uncommitted, not pushed):**
- `src/data/catalog-audits/audit-33.ts` + `audit-33.test.ts` (added to the `test` script): one patch, `pipecat.description`, from the exact audit-32 insert text to a version that says "transcription, language-model and voice-synthesis services" and "It is not a voice generator itself". Every dated fact kept.
- `scripts/update-catalog-audit-33.ts` (dry-run default, prod guard, not run) and npm `db:update-catalog-audit-33`.
- `scripts/sql/audit-33-pipecat.sql`: one guarded UPDATE (matches only the exact old description; sets `updatedAt`). A test keeps it equal to the generator.
- `catalog-snapshot.json` via `scripts/mcp-snapshot/apply-audit-33-to-snapshot.ts` (one row).
- `golden-top5.json`: A25 back to `speechify, elevenlabs, murf-ai, deepgram, openai-api`. All other golden rows unchanged (golden test passes).
- `src/data/facts/pipecat.ts` not changed: search does not read it for ranking and it has no description.

**Open / Zach to decide:**
- Run the SQL or the script: dry-run on a Neon branch first, then `--confirm-production` with `CONFIRM_PROD_HOST`, `--apply`, then `npm run cache:revalidate`. Until then live search still shows Pipecat in the TTS results.
- `keyIntegrations`, `contentTypes` ("Audio (speech)") and the fact-file text still say speech/TTS; they are accurate and not scored, so left alone.
