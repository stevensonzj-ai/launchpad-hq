import { NotFoundContent } from "@/components/layout/not-found-content";

/**
 * 404 for notFound() calls inside the (app) group. The (app) layout already
 * renders the Header and the <main>, so this renders only the body. Without
 * this file Next used src/app/not-found.tsx here too, and its own Header
 * gave the page two. Unmatched URLs that no segment handles still use
 * src/app/not-found.tsx, which renders the Header itself.
 *
 * The tab title comes from the page's generateMetadata fallback
 * (NOT_FOUND_METADATA in src/lib/seo-metadata.ts).
 */
export default function AppNotFound() {
  return <NotFoundContent />;
}
