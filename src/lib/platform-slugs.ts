import { cache } from "react";
import { prismaRead as prisma } from "@/lib/db";
import { cachedCatalogRead } from "@/lib/catalog-cache";

// Cached as an array: a Set does not survive the data cache's JSON round trip.
const readPlatformSlugs = cachedCatalogRead("platform-slugs", async (): Promise<string[]> => {
  const rows = await prisma.platform.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
});

/** Slugs that exist in the database; used to link workflow tools only when valid. */
export const getPlatformSlugSet = cache(async (): Promise<ReadonlySet<string>> => {
  return new Set(await readPlatformSlugs());
});
