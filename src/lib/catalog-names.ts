import { prisma } from "@/lib/db";
import { cachedCatalogRead } from "@/lib/catalog-cache";
import { platformLinkLabel } from "@/lib/related-links";

const readNames = cachedCatalogRead(
  "catalog-names",
  (slugs: string[]) =>
    prisma.platform.findMany({
      where: { slug: { in: slugs } },
      select: { slug: true, name: true },
    }),
  (slugs) => slugs,
);

export async function catalogNamesBySlug(slugs: string[]): Promise<Map<string, string>> {
  if (slugs.length === 0) return new Map();
  try {
    const rows = await readNames(slugs);
    return new Map(rows.map((row) => [row.slug, row.name]));
  } catch {
    return new Map();
  }
}

export async function platformCatalogLinks(slugs: string[]) {
  const names = await catalogNamesBySlug(slugs);
  return slugs.map((slug) => ({
    href: `/platform/${slug}`,
    label: platformLinkLabel(slug, names.get(slug)),
  }));
}
