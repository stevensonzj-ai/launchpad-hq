-- Remove the three superseded category rows after the 2026-05 restructure.
-- Industry-Specific AI, Audio Music & Voice AI, and Browser Extensions &
-- Productivi were split across the new taxonomy by
-- scripts/restructure-categories-2026-05.ts. Their rows are no longer
-- referenced by any platform and should be removed.
--
-- The DO block is a safety guard: Platform.categoryId has a NOT NULL FK to
-- categories.id with Prisma's default Restrict behavior, so a DELETE here
-- would already fail if any platform still pointed at one of these rows.
-- The explicit check converts that into a clearer error message naming the
-- script the operator should re-run.

DO $$
DECLARE
  orphan_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO orphan_count
  FROM platforms p
  JOIN categories c ON p."categoryId" = c.id
  WHERE c.slug IN (
    'industry-specific-ai',
    'audio-music-voice-ai',
    'browser-extensions-productivi'
  );

  IF orphan_count > 0 THEN
    RAISE EXCEPTION 'Cannot delete superseded categories: % platforms still reference them. Run scripts/restructure-categories-2026-05.ts first.', orphan_count;
  END IF;
END $$;

DELETE FROM categories
WHERE slug IN (
  'industry-specific-ai',
  'audio-music-voice-ai',
  'browser-extensions-productivi'
);
