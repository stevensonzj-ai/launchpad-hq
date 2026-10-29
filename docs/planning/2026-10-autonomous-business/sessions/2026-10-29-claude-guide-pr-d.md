# 2026-10-29 — Claude — Guide PR D (renames, Clarifai hide, vendor rewrites, audit 15)

Branch `guide-pr-d-1029`, draft PR to main. Full detail is in `REVIEW-SUMMARY.md` (the PR body).

## Decided

- **Four renames, each confirmed on the vendor's own pages, with 301s from every `/platform/<old>/*` URL:**
  - Vertex AI → Gemini Enterprise Agent Platform (`gemini-enterprise-agent-platform`)
  - Imagen → Nano Banana (`nano-banana`)
  - text-generation-webui → TextGen (`textgen`)
  - NotebookLM → Gemini Notebook (`gemini-notebook`)
- **Clarifai hidden, reversibly.** Its guide 301s to the platform page and the guide file is kept in `src/data/tutorials/retired/`. Lifecycle stays "active" because no shutdown was announced. No DB change.
- **Vendor rewrites:** ChatGPT Free (unlimited text chats), Tray.ai (30-day self-serve trial), llama.cpp (desktop app, port 9931), Cursor (SpaceX acquisition closed 14 Aug 2026; Grok-bundled plans), Firefly (enterprise-only indemnity, partner models), Flow Studio (Canvas, 3D Editor), Magnific "Pro Starter" plan plus its price token.
- **Hedra was not rewritten as "no tiers".** The pay-per-output pricing is the developer API; Hedra Studio still sells subscriptions ("Studio plans from $20/month"). The guide now explains the split.

## Changed

- Commits on the branch: Tray/ChatGPT/llama.cpp; Cursor/Firefly; Magnific/Flow Studio; Hedra; renames + Clarifai + audit 15; comment fix; summary and this note.
- New `scripts/update-catalog-audit-15.ts` and `src/data/catalog-audits/audit-15.ts`, with 17 tests. The test snapshot and golden top-5 were updated for the renames.
- Gates: tsc, lint (0 errors), `npm test` 1018/1018, `audit:tutorials` 197 clean.

## Open / for Zach

- **Deploy and run audit 15 together** (Neon branch first, then prod, then `npm run cache:revalidate`). Until it runs, the four renamed pages and guides 404 behind the 301s.
- **Hedra:** check the Studio tiers and whether there's a free plan in a browser. The facts `plans` still list Basic/Pro/Ultra/Teams from 10-14.
- **Flow Studio:** free-tier numbers are unverified (the Autodesk page returns 403).
- **Firefly:** whether indemnity excludes beta features and partner models is unverified (helpx returns 403).
- **Catalog rows:** Imagen's DB `currentPricing`/`freeTierFeatures` text still mentions "Vertex AI API"; it's a candidate for a later audit.
- **Not touched:** Tabnine, Scite, Lindy, Canva, Activepieces. Audit 10 was not re-run.
