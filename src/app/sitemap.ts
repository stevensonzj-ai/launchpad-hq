import type { MetadataRoute } from "next";
import { listRegisteredTutorials } from "@/data/tutorials";
import { listModelFamilies } from "@/data/models";
import { WORKFLOWS } from "@/data/workflows";
import { prisma } from "@/lib/db";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const STATIC_PUBLIC_PATHS = [
  "/",
  "/discover",
  "/quiz",
  "/workflows",
  "/tutorials",
  "/pricing",
  "/models",
  "/models/compare/claude-vs-gpt",
  "/how-we-make-money",
  "/sponsor-guidelines",
  "/ai-of-the-week",
] as const;

function parseRealDate(value: string | Date | null | undefined): Date | undefined {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date;
}

function laterDate(...candidates: Array<Date | undefined>): Date | undefined {
  const valid = candidates.filter((d): d is Date => d instanceof Date);
  if (!valid.length) return undefined;
  return new Date(Math.max(...valid.map((d) => d.getTime())));
}

function withLastModified(
  url: string,
  lastModified?: Date,
): MetadataRoute.Sitemap[number] {
  return lastModified ? { url, lastModified } : { url };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PUBLIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
  }));

  const workflowEntries: MetadataRoute.Sitemap = WORKFLOWS.map((workflow) => ({
    url: `${SITE_URL}/workflows/${workflow.slug}`,
  }));

  const modelFamilyEntries: MetadataRoute.Sitemap = listModelFamilies().map((family) =>
    withLastModified(
      `${SITE_URL}/models/${family.familySlug}`,
      parseRealDate(family.lastVerifiedAt),
    ),
  );

  const tutorials = listRegisteredTutorials();
  const lastReviewedBySlug = new Map(
    tutorials.map((tutorial) => [tutorial.platformSlug, tutorial.lastReviewedAt]),
  );

  let platformEntries: MetadataRoute.Sitemap;

  try {
    // Same catalog visibility as Discover and /platform/[slug]: every
    // Platform row is public. Neither page applies a published/active/
    // verified where-clause (Discover starts with `where = {}`; the
    // detail page is findUnique({ slug }) only). Do not invent a gate.
    const platforms = await prisma.platform.findMany({
      where: {},
      select: { slug: true, updatedAt: true },
      orderBy: { slug: "asc" },
    });

    platformEntries = platforms.map((platform) => {
      const lastModified = laterDate(
        parseRealDate(platform.updatedAt),
        parseRealDate(lastReviewedBySlug.get(platform.slug)),
      );
      return withLastModified(`${SITE_URL}/platform/${platform.slug}`, lastModified);
    });
  } catch {
    // DB unavailable (local build without DATABASE_URL, Neon blip): keep
    // the static catalog plus tutorial-backed platform URLs only. Do not
    // invent lastmod for rows we could not read.
    platformEntries = tutorials.map((tutorial) =>
      withLastModified(
        `${SITE_URL}/platform/${tutorial.platformSlug}`,
        parseRealDate(tutorial.lastReviewedAt),
      ),
    );
  }

  return [...staticEntries, ...workflowEntries, ...modelFamilyEntries, ...platformEntries];
}
