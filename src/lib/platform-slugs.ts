import { cache } from "react";
import { prisma } from "@/lib/db";

/** Slugs that exist in the database; used to link workflow tools only when valid. */
export const getPlatformSlugSet = cache(async (): Promise<ReadonlySet<string>> => {
  const rows = await prisma.platform.findMany({ select: { slug: true } });
  return new Set(rows.map((r) => r.slug));
});
