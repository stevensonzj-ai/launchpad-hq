# 2026-10-29 — Claude — Guide PR D (renames, Clarifai shutdown, Tabnine retired, vendor rewrites, audit 15)

Branch `guide-pr-d-1029`, draft PR to main. Full detail is in `REVIEW-SUMMARY.md` (the PR body).

## Decided

- **Four renames, each confirmed on the vendor's own pages, with 301s from every `/platform/<old>/*` URL:**
  - Vertex AI → Gemini Enterprise Agent Platform (`gemini-enterprise-agent-platform`)
  - Imagen → Nano Banana (`nano-banana`)
  - text-generation-webui → TextGen (`textgen`)
  - NotebookLM → Gemini Notebook (`gemini-notebook`)
- **Clarifai hidden, reversibly.** Its guide 301s to the platform page and the guide file is kept in `src/data/tutorials/retired/`. Lifecycle stays "active" because no shutdown was announced. No DB change.
- **Vendor rewrites:** ChatGPT Free (unlimited text chats), Tray.ai (30-day self-serve trial), llama.cpp (desktop app, port 9931), Cursor (SpaceX acquisition closed 14 Aug 2026; Grok-bundled plans), Firefly (enterprise-only indemnity, partner models), Flow Studio (Canvas, 3D Editor), Magnific "Pro Starter" plan plus its price token.
- **Follow-up (RA-verified, re-read on official pages):**
  - Tabnine guide retired (301 to the platform page). The page is now a "what happened" note: Tricentis acquisition, folded into its Agentic Quality Engineering Platform, existing customers supported. Lifecycle is "discontinued". Audit 15 removes the row's pricing.
  - Clarifai notice: shutdown confirmed, core team joined Nebius (licenses the inference IP, not a full acquisition). Lifecycle "discontinued", still hidden.
  - Scite: no free plan; new fact file. Canva: plans and AI Pass re-checked, $144 kept. Lindy: Team $49.99 for 5,000 credits. Activepieces: "1,000 a month, refreshing daily" per the table.
- **Hedra was not rewritten as "no tiers".** The pay-per-output pricing is the developer API; Hedra Studio still sells subscriptions ("Studio plans from $20/month"). The guide now explains the split.

## Changed

- Commits on the branch: Tray/ChatGPT/llama.cpp; Cursor/Firefly; Magnific/Flow Studio; Hedra; renames + Clarifai + audit 15; comment fix; summary and this note.
- New `scripts/update-catalog-audit-15.ts` and `src/data/catalog-audits/audit-15.ts`, with 17 tests. The test snapshot and golden top-5 were updated for the renames.
- Audit 15 gained row patches (tabnine, scite, lindy-ai, activepieces) and removes "Tabnine" from 3 reference arrays.
- Gates: tsc, lint (0 errors), `npm test` 1026/1026, `audit:tutorials` 196 clean.

## Open / for Zach

- **Deploy and run audit 15 together** (Neon branch first, then prod, then `npm run cache:revalidate`). Until it runs, the four renamed pages and guides 404 behind the 301s.
- **Hedra:** check the Studio tiers and whether there's a free plan in a browser. The facts `plans` still list Basic/Pro/Ultra/Teams from 10-14.
- **Flow Studio:** free-tier numbers are unverified (the Autodesk page returns 403).
- **Firefly:** whether indemnity excludes beta features and partner models is unverified (helpx returns 403).
- **Catalog rows:** Imagen's DB `currentPricing`/`freeTierFeatures` text still mentions "Vertex AI API"; it's a candidate for a later audit.
- **Tabnine lifecycle:** "discontinued" was chosen so the what-happened pattern applies. Change it back to "acquired" if you'd rather it read as still available.
- **Could not re-read:** the Tabnine blog post (it redirects to Tricentis) and Clarifai's July 13 date (its hosts are down; secondary sources say July 17).
- **Activepieces' pricing page contradicts itself** (table: daily; FAQ: monthly or next day).
- Audit 10 was not re-run.
