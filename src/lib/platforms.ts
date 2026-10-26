import { cache } from "react";
import { prisma } from "@/lib/db";
import { cachedCatalogRead } from "@/lib/catalog-cache";

// The root layout's metadata reads both counts on every render, so they sit
// in the shared catalog cache (src/lib/catalog-cache.ts) rather than waking
// the database per page view. React `cache` still dedupes within a request.
const readPlatformCount = cachedCatalogRead("platform-count", () => prisma.platform.count());
const readCategoryCount = cachedCatalogRead("category-count", () => prisma.category.count());

export const getPlatformCount = cache((): Promise<number> => readPlatformCount());

export const getCategoryCount = cache((): Promise<number> => readCategoryCount());

/** Round down to the nearest 10 so displayed counts never overstate reality as rows change. */
export function roundDownToTen(n: number): number {
  return Math.max(0, Math.floor(n / 10) * 10);
}
