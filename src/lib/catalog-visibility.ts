import { listRegisteredToolFacts } from "@/data/facts";
import { PLATFORM_REDIRECTS } from "@/lib/catalog-redirects";

/**
 * Platform slugs that must not be offered to readers or search engines:
 * fact files marked `visibility: "hidden"` plus duplicate rows that 301
 * elsewhere. Their pages stay reachable by URL (hidden ones noindexed).
 *
 * Applied to: sitemap, Discover, search, recommendations, the public
 * platforms API, and same-category related links.
 */
export function hiddenPlatformSlugs(): string[] {
  const hidden = new Set<string>(Object.keys(PLATFORM_REDIRECTS));
  for (const facts of listRegisteredToolFacts()) {
    if (facts.visibility === "hidden") hidden.add(facts.slug);
  }
  return [...hidden].sort();
}

export function isHiddenPlatform(slug: string): boolean {
  return hiddenPlatformSlugs().includes(slug);
}

/** Prisma `where` fragment that drops hidden slugs. */
export function listedPlatformWhere(): { slug: { notIn: string[] } } {
  return { slug: { notIn: hiddenPlatformSlugs() } };
}
