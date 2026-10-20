/**
 * Catalog URL moves, kept dependency-free so `next.config.ts` can import it.
 *
 * - PLATFORM_REDIRECTS: duplicate catalog rows. Every /platform/<from>/...
 *   URL 301s to the same path under /platform/<to>. The <from> rows still
 *   exist in the database, so they are also hidden from listings (see
 *   `src/lib/catalog-visibility.ts`).
 * - RETIRED_GUIDE_SLUGS: platforms whose how-to guide was removed because
 *   the product no longer works. /platform/<slug>/guide 301s to the
 *   platform page, which carries the "what happened" notice.
 *
 * Source and rationale: docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md (PR 1).
 */
export const PLATFORM_REDIRECTS: Readonly<Record<string, string>> = {
  // Duplicate of the guided Canva entry.
  "canva-magic-studio": "canva-ai-magic-studio",
  // Adobe says "Adobe Sensei has transitioned to Adobe AI"
  // (https://business.adobe.com/products/sensei.html, checked 2026-10-20);
  // the guided Firefly entry covers the product readers are looking for.
  "adobe-sensei-firefly-in-cc": "adobe-firefly",
};

export const RETIRED_GUIDE_SLUGS: readonly string[] = ["kakao-brain-karlo"];

export type CatalogRedirect = {
  source: string;
  destination: string;
  statusCode: 301;
};

/** next.config.ts `redirects()` entries for the moves above. */
export function catalogRedirects(): CatalogRedirect[] {
  const moves: CatalogRedirect[] = [];
  for (const [from, to] of Object.entries(PLATFORM_REDIRECTS)) {
    moves.push({ source: `/platform/${from}`, destination: `/platform/${to}`, statusCode: 301 });
    moves.push({
      source: `/platform/${from}/:path*`,
      destination: `/platform/${to}/:path*`,
      statusCode: 301,
    });
  }
  for (const slug of RETIRED_GUIDE_SLUGS) {
    moves.push({
      source: `/platform/${slug}/guide`,
      destination: `/platform/${slug}`,
      statusCode: 301,
    });
  }
  return moves;
}
