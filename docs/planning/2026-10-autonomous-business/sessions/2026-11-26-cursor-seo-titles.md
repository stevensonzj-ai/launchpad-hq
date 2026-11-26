# 2026-11-26 cursor: SEO titles and descriptions

**Decided:** Low-CTR page-1 and page-2 snippets are rewritten in a code map, not in the database and not by changing `lastReviewedAt`. The Cursor guide's pattern is a specific how-to title of about 50 characters plus a concrete description. Each new title says the page is a guide or overview. Research Rabbit's overview and guide get different titles so they stop reading like the same page. Higgsfield's platform title was left alone because it already gets clicks. Lexis+ stays an overview and says it is not the vendor sign-in.

**Changed:** `src/data/seo/snippet-overrides.ts` (18 paths, `revisedAt` 2026-11-26) and `buildTutorialMetadata` / `buildPlatformMetadata` in `src/lib/seo-metadata.ts`. No SQL.

**Left out:** Otter, Codex CLI, and Firefly titles. Those pages rank around positions 48-57, so the snippet is not the first fix. Groq's title does not say "not the console," because the guide tells people to open Groq in the browser.

**Open:** Rebased onto main after #196 (`6ce8ced`). The override map and `snippetRevisionDate` are both in `snippet-overrides.ts`. Twitter card from #196 stayed in `seo-metadata.ts`. The breadcrumb comment no longer mentions `includeItem`.
