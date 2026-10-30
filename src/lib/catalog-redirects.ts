/**
 * Catalog URL moves, kept dependency-free so `next.config.ts` can import it.
 *
 * - PLATFORM_REDIRECTS: duplicate catalog rows and renamed slugs. Every
 *   /platform/<from>/... URL 301s to the same path under /platform/<to>.
 *   Duplicate <from> rows still exist in the database, so they are also
 *   hidden from listings (see `src/lib/catalog-visibility.ts`); a renamed
 *   slug has no row left once its audit runs.
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
  // Slug rename, not a duplicate: Mistral renamed Le Chat to Vibe
  // (https://mistral.ai/products/le-chat, checked 2026-10-25).
  // scripts/update-catalog-audit-6.ts moves the row to the new slug, so no
  // row is left under the old one. Deploy and run audit 6 together.
  "mistral-ai-le-chat": "mistral-vibe",
  // Slug renames, guide PR D (2026-10-29); scripts/update-catalog-audit-15.ts
  // moves each row, so deploy and run audit 15 together. Sources:
  // Google renamed Vertex AI (docs.cloud.google.com/gemini-enterprise-agent-platform/
  // vertex-ai-name-changes); "Imagen models are shut down. Use Nano Banana"
  // (ai.google.dev/gemini-api/docs/imagen); the oobabooga repo is now TextGen
  // (github.com/oobabooga/textgen); "NotebookLM is now Gemini Notebook"
  // (blog.google, 2026-07-16).
  "google-vertex-ai": "gemini-enterprise-agent-platform",
  "google-imagen-3": "nano-banana",
  "text-generation-webui-oobabooga": "textgen",
  notebooklm: "gemini-notebook",
  // Slug renames, catalog audit 22 (2026-10-30); scripts/update-catalog-audit-22.ts
  // moves each row, so deploy and run audit 22 together. Sources:
  // shopify.com/magic redirects to shopify.com/sidekick ("Sidekick"); Salesforce's
  // agent product page: "Agentforce (formerly Einstein Copilot)", and
  // salesforce.com/einstein now redirects to its AI page.
  "shopify-magic-sidekick": "shopify-sidekick",
  "salesforce-einstein": "salesforce-agentforce",
};

export const RETIRED_GUIDE_SLUGS: readonly string[] = [
  "kakao-brain-karlo",
  // Shut down (final deprecation July 2026); page hidden,
  // guide kept in src/data/tutorials/retired/ (guide PR D, 2026-10-29).
  "clarifai",
];

/**
 * Hidden platforms whose whole /platform/<slug> tree 301s to the closest
 * live listing page (catalog audit 26, 2026-10-30). Their fact files stay
 * (visibility "hidden"), the DB rows stay, nothing is deleted.
 * - relay-app: relay.app says "Relay.app shut down in September 2026. All
 *   accounts, workflows, and run history have been permanently deleted."
 *   (re-read 2026-10-30).
 * - tabnine: acquired by Tricentis (tricentis.com/news/tricentis-acquires-tabnine,
 *   2026-07-30); tabnine.com and /pricing now redirect to tricentis.com
 *   (/products and /contact-us), app.tabnine.com returns 503, no standalone
 *   plans or sign-up (re-checked 2026-10-30). Its retired guide moved here
 *   from RETIRED_GUIDE_SLUGS so /platform/tabnine/guide does not chain.
 */
export const HIDDEN_PAGE_REDIRECTS: Readonly<Record<string, string>> = {
  "relay-app": "/alternatives/free-zapier-alternatives",
  tabnine: "/compare/cursor-vs-github-copilot",
};

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
  for (const [slug, to] of Object.entries(HIDDEN_PAGE_REDIRECTS)) {
    moves.push({ source: `/platform/${slug}`, destination: to, statusCode: 301 });
    moves.push({ source: `/platform/${slug}/:path*`, destination: to, statusCode: 301 });
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
