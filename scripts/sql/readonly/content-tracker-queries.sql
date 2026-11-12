-- NOT a Guarded SQL file. Do not pass this file to npm run db:guarded-sql.
--
-- Documentation, and the source scripts/export-content-tracker.ts copies
-- when it reads the database. Three read-only SELECTs. Nothing here writes.
--
-- The Guarded SQL GitHub workflow only accepts scripts/sql/<name>.sql
-- (no subdirectory). This file lives under scripts/sql/readonly/ so that
-- workflow will not run it.
--
-- Run these in the Neon SQL editor as launchpad_ro (read-only). Save the
-- three result sets as one JSON object:
--   { "platforms": [...], "prompts": [...], "discussions": [...] }
-- then:
--   npm run export:content-tracker -- --db-json file.json --out <path>
--
-- Column aliases are the ones --db-json expects. Do not rename them.

SELECT p.id, p.slug, p.name, p.website, p.description,
       c.name AS "categoryName", c.slug AS "categorySlug",
       p."costTier"::text AS "costTier", p."currentPricing",
       p."apiAvailable", p.verified, p."updatedAt"
FROM platforms p
JOIN categories c ON c.id = p."categoryId"
ORDER BY p.name;

SELECT "platformId", status::text AS status, count(*)::int AS n FROM prompts GROUP BY 1, 2;

SELECT "platformId", status::text AS status, count(*)::int AS n FROM discussions GROUP BY 1, 2;
