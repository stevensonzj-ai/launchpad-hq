# 2026-11-14 — Claude — quiz local category and body background

Branch `fix/quiz-local-category-and-body-bg`, cut from `8d62e4b3` (main after #170). Draft PR, not merged.

## Decided

- **Follow-up 8 (START-HERE 4.43).** `local-open-source-ai` is allowed only when `runtime=local` and at least one chosen goal has local picks. Video, audio and automation on their own now return cloud tools only.
- **Mixed two-goal answers (e.g. coding + video, local).** The local category stays allowed, and local picks alternate with the cloud picks. The notice for this case is new, owner-approved wording: "…so the {names} picks below are cloud tools." With no local-pick goal the 2026-11-12 sentence is unchanged.
- **Follow-up 7 (START-HERE 4.42).** The `body` rule in `globals.css` moved into `@layer base` rather than being removed, so the font fallback stays.

## Changed

- PR #170 (ledger for #169) squash-merged as `8d62e4b3`; production deploy READY.
- `src/lib/quiz-ranking.ts` — `allowedCategories` rule; `localRuntimeNotice` mixed-goal sentence. `scorePlatform` and `rankScoredPlatforms` untouched.
- `src/data/quiz-defaults.ts` — comment on `LOCAL_CATEGORY` only.
- `src/app/globals.css` — `body` rule wrapped in `@layer base`.
- `src/lib/quiz-ranking.test.ts` — pinned "allowed for every goal" test narrowed to goals with local picks; new tests for video/audio/automation (uncut list), the coding + video golden, and both notice sentences.
- `START-HERE.md` — 4.42 and 4.43 marked fixed in place.

Checks: `quiz-ranking.test.ts` 37/37, `quiz-defaults.test.ts` 6/6, `quiz-map.test.ts` 4/4, `recommendations-score.test.ts` 11/11, typecheck clean, eslint clean on the changed TS files. No local build and no full `npm test`; the Vercel preview is the gate.

## Recon findings worth keeping

- Before the fix (catalog snapshot, runtime=local): audio/beginner/free listed `localai` 12th; audio/advanced/enterprise listed `localai` 10th and `stability-ai` 12th; video/advanced/enterprise listed `comfyui` 11th.
- In coding + video / local, ComfyUI can still enter through a video keyword (17th on free, 20th on enterprise, so below the 12 shown today). Accepted: the visitor chose local.
- `--background` / `--foreground` and their Tailwind utilities are used nowhere outside `globals.css`.
- The Header sets its own background (`bg-gray-950/90`). No element in `src` has a solid light fill (white, gray 50–200, light yellow/orange/amber) without its own text colour; every such class found is a low-opacity tint.
- Effect of the CSS change inside `(app)`: text that inherits its colour from `body` goes from `#ededed` to white in dark mode, and from `#171717` to white in light mode.

## Still open

- **Package 3 candidates:** `src/app/global-error.tsx` (bare `<html><body>`, no `globals.css`) and the built-in 404 (no `not-found.tsx` exists). Both left unchanged; how they render for light-mode visitors was not checked.
- The CSS change was not viewed in a browser locally. Check the preview in light mode: `/`, `/sign-in`, a page inside `(app)`.
- 4.43's "ComfyUI twelfth for video/beginner/free" did not reproduce from the snapshot (probably snapshot drift, 4.37).

## For Zach

- Review and merge the draft PR when the preview looks right.
- Decide whether Package 3 gets a `not-found.tsx` and a styled `global-error.tsx`.
