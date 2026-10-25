import { getToolFacts } from "@/data/facts";
import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { RETIRED_GUIDE_SLUGS } from "@/lib/catalog-redirects";
import { loadCatalog } from "@/lib/mcp/catalog";
import { buildFeedContext, toPublicCatalog } from "./serialize";

/** Reuses the MCP connector's read-only catalog select (public columns only). */
export async function loadFeed() {
  const rows = await loadCatalog();
  const ctx = buildFeedContext(rows, getToolFacts, {
    generatedAt: new Date().toISOString(),
    hasGuide: (slug) =>
      Boolean(getStaticTutorialForPlatform(slug)) && !RETIRED_GUIDE_SLUGS.includes(slug),
  });
  return { rows, ctx, catalog: () => toPublicCatalog(rows, getToolFacts, ctx) };
}
