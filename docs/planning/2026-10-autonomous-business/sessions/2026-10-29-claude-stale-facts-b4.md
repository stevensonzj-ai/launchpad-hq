# 2026-10-29 — Claude — stale facts batch 4 + catalog audit 20

## Decided
- Same process as batch 3: two blind readers per platform on vendor pages only; "verified" only when both agree. Pages neither reader could open (Clio, SciSpace plans, Scholarcy, Naver's consumer pages) are left as the row has them and go on the Browser-check list.
- Three batch-3 leftovers went into audit 20: the google-antigravity row now carries the verified Antigravity plans; claude-code and openai-codex-cli point their "free" budget alternative to Antigravity CLI instead of Gemini CLI; Murf's description loses "multiple voices and languages", the only text that made it rank #5 for "learn a language".
- Audit 20 writes no field that audits 17, 18 or 19 write, so re-running any of them cannot undo it (tested).

## Changed (branch `stale-facts-b4-1029`, draft PR "Stale facts batch 4 + catalog audit 20")
- 17 new fact files (61 facts verified, 7 unverified); google-antigravity fact file gains free tier and plans; registry.
- `src/data/catalog-audits/audit-20.ts` + test; `scripts/update-catalog-audit-20.ts`; `db:update-catalog-audit-20`; snapshot applied (20 rows).
- Guides: Acrobat AI Assistant (built into Express and Studio) and Open WebUI (custom licence, not MIT).
- Test expectations: 6 golden re-pins (incl. G37 without Murf), stress-replay D02 now also accepts Adobe Firefly, stress-observation exemption for batch 4.
- `stale-facts-batches.md` status.

## Open
- Run audits 17, 18 and 19 if not yet applied, then audit 20 (Neon branch first), then `cache:revalidate`.
- Browser-check list in the PR: Clio, SciSpace, Scholarcy, Naver (is Cue: really closed?), Firefly USD prices, Amazon Q signups.

## For Zach to decide
- Cost-tier changes: Topaz ENTERPRISE→PAID, Acrobat/Bedrock/Azure FREEMIUM→PAID, Cohere FREE→FREEMIUM, google-antigravity FREE→FREEMIUM.
- Privacy changes: Cohere HIGH→MEDIUM, Amazon Q Developer HIGH→MEDIUM. google-antigravity (IDE) stays HIGH although the CLI row is LOW under the same terms.
- Whether D02's accepted answers should include Adobe Firefly (done here), or Firefly's free-tier fact should be left out.
