# 2026-10-27 — claude — auth relink fix

## Decided
- User resolution moves to a testable `src/lib/auth-link.ts`. It now uses Clerk's primary email.
- When the email already exists in the database, the existing row is relinked to the current Clerk id. This happens only when Clerk marks that primary email as verified, and it uses a compare-and-swap.
- A signed-in user with no linkable row now gets a 403 "Your account couldn't be linked. Please contact support." Before, they got a 401 asking them to sign in. This uses a new `forbidden` API error code.
- Sentry warnings (Clerk id prefix only, no email) are sent on every relink and on every signed-in user left without a row.
- A failed discussion reply now shows an inline error.

## Changed
- Branch `fix/auth-relink-1027`, commit `58803632` (pushed). Not merged.
- Files: `src/lib/auth-link.ts` (+ test), `src/lib/auth-db.ts`, `src/lib/api-error.ts` (+ test), 11 `src/app/api/**/route.ts`, `src/components/discussions/platform-discussions.tsx`, `package.json` (test list).
- Gates: typecheck clean; 891/891 tests pass; lint shows 0 errors and 2 pre-existing warnings.

## Open
- **PR not opened.** `gh` returned 401 (bad credentials). Run `gh auth refresh -h github.com`, then `gh pr create --base main --head fix/auth-relink-1027 --fill`.
- Preview verification by Zach: sign in as an existing user and as a new user, then check reply errors and the signed-out path.

## For Zach to decide
- Is Clerk "verified primary email" enough trust to relink an existing row automatically?
- DB-error nulls now show the 403 message too, where they used to show a 401. Is that acceptable, or should they get a 500?
