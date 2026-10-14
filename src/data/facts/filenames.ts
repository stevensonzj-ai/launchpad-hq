/** Fact-page helpers and fixtures that must never be treated as catalog slugs. */
export const FACT_PAGE_SKIP_FILES = [
  "types.ts",
  "index.ts",
  "registry.ts",
  "walk.ts",
  "audit.ts",
  "overlay.ts",
  "diff.ts",
  "retired-terms.ts",
  "facts.test.ts",
  "filenames.ts",
  "_template.ts",
] as const;
