# 2026-11-02 — claude — catalog audit 31

**Decided:** apply the verified vendor changes below as dated catalog text. UPDATE-only; no new listings, no price edits beyond what the vendors published, Hedra untouched.

**Changed (branch `audit-31-xwatch`, uncommitted, not pushed):**
- `src/data/catalog-audits/audit-31.ts` (+ `audit-31.test.ts`, added to the `test` script): 6 field patches on 5 rows, exact `from` strings checked against the production rows export. `AUDIT_31_NO_CHANGE` records jules, astra-for-law, openai-private-intelligence, runway-agent, daily, pipecat.
- **Claude:** Max is $100/mo (5x Pro usage); the former Max 20x is now Ultra, $200/mo (10x Pro weekly, no 5-hour limit for verified accounts). DB patches on `claude` (currentPricing, usageLimits) and `claude-code` (usageLimits); `facts/claude.ts` splits Max and Ultra; the Claude Code getting-started guide now names Ultra. Unriddle's own "Max 5x / Max 20x" plans were left alone.
- **Pika:** H3 Flex (open weights) API per-second prices appended to `pika.currentPricing`; mirrored in `facts/pika.ts` (`apiPricing`).
- **Antigravity:** Plugin Marketplace (2026-10-29) in `facts/google-antigravity.ts`, `facts/antigravity-cli.ts` and the `antigravity-cli` description.
- **Kimi:** Kimi 3D Make sentence in `kimi.description` and `facts/kimi.ts`.
- **Deepgram:** dated fact note that the acquisition of Daily (Pipecat) is announced, not completed. No DB change.
- **Mistral Large 4:** `src/data/models/mistral.ts` now $0.70 in / $0.07 cached / $2.10 out per 1M, open weights under the Mistral Ecosystem Open-Weight license (modified MIT; Model-as-a-Service needs a commercial license).
- Operator runner `scripts/update-catalog-audit-31.ts` (dry-run default, not run), npm `db:update-catalog-audit-31`; `scripts/mcp-snapshot/apply-audit-31-to-snapshot.ts` was run on `catalog-snapshot.json` (4 rows).

**Open / Zach to decide:**
- Run the DB script: dry-run on a Neon branch first, then `--confirm-production` with `CONFIRM_PROD_HOST`, `--apply`, then `npm run cache:revalidate`.
- `antigravity-cli` is a production row but is not in the committed MCP snapshot, so its description patch is DB-only. Add it to the snapshot only if you want a new snapshot row.
- The Deepgram source URL (`deepgram.com/learn`) is the blog index, not the exact post; swap in the post URL if you have it.
- Not changed: Google Jules, OpenAI Astra for Law and Private Intelligence, Runway Agent (no catalog rows).
