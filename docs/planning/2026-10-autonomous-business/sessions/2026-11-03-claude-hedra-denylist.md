# 2026-11-03 claude: hedra code-level denylist (branch fix/hedra-denylist-1103)

**Decided:** hedra is hidden by code (fact file `visibility: "hidden"` + `HIDDEN_PAGE_REDIRECTS` 301), not a DB column. So the denylist blocks creating, renaming to/from, or unhiding any removed slug in every catalog write path.

**Changed (uncommitted):**
- New `src/lib/catalog/removed-slugs.ts` (`REMOVED_PLATFORM_SLUGS = ["hedra"]`, `assertNotRemovedForWrite`, `assertPlatformOperationAllowed`, `assertNoRemovedSlugs`, `guardPlatformWrites`).
- New `src/lib/catalog/guarded-prisma.ts`: drop-in `PrismaClient` for scripts that routes `platform` writes through the guard.
- 38 scripts under `scripts/` now import `PrismaClient` from it; `seed-phase1-batch1-platforms.ts` also skips hedra; `audit-32.ts` / `audit-33.ts` SQL generators assert their inputs.
- New `src/lib/catalog/removed-slugs.test.ts`, added to the `test` script.
- No app, server or MCP runtime code changed.

**Open:** nothing blocking. Lifting a removal means editing `REMOVED_PLATFORM_SLUGS` in a reviewed PR. Zach to commit.
