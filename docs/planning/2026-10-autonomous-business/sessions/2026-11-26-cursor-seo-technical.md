# 2026-11-26 cursor: SEO technical fixes

**Decided:** Guide breadcrumbs were already named in JSON-LD. Google's "Unnamed item" comes from the last crumb URL matching the Article, which had `headline` and no `name`. The current-page crumb no longer sends `item`. The Article has `name`, and `mainEntityOfPage` is a WebPage named "Getting started". Research Rabbit is one slug with two real pages (overview and guide). Neither is an old duplicate, so both stay self-canonical and both stay in the sitemap. Titles are left for the snippet PR. Sitemap `lastmod` is the latest of the guide review date, fact-file `checkedAt`, the platform row `updatedAt`, and a snippet `revisedAt`. No URL is stamped with build time. Static pages and workflows still have no lastmod, because they have no content date.

**Changed:** `src/lib/seo-jsonld.ts`, `src/app/sitemap.ts`, `src/lib/sitemap-lastmod.ts`, `src/data/seo/snippet-overrides.ts` (empty map), `src/lib/seo-metadata.ts` (Twitter card), `src/app/layout.tsx`. Tests in `seo-jsonld.test.ts`, `seo-metadata.test.ts`, `sitemap-lastmod.test.ts`. No SQL.

**Left out:** No redirect for Research Rabbit. Title length on Khanmigo, Bloomberg GPT, Lexis+, Connected Papers, and Research Rabbit's overview is a snippet problem, not a missing tag. Discover filter URLs already canonicalise to the unfiltered list. Hedra was not touched.

**Open:** Merge this before the snippet PR so `revisedAt` changes lastmod. Zach can request a recrawl of Harvey, Codex CLI, and Granola in Search Console; this PR does not.
