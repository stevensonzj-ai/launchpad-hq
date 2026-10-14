import type { MetadataRoute } from "next";
import { listRegisteredTutorials } from "@/data/tutorials";
import { WORKFLOWS } from "@/data/workflows";
import { SITE_URL } from "@/lib/site";

const STATIC_PUBLIC_PATHS = [
  "/",
  "/discover",
  "/quiz",
  "/workflows",
  "/tutorials",
  "/pricing",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PUBLIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
  }));

  const workflowEntries: MetadataRoute.Sitemap = WORKFLOWS.map((workflow) => ({
    url: `${SITE_URL}/workflows/${workflow.slug}`,
  }));

  // Live tutorials render on the platform detail page (Tutorials tab),
  // not as standalone /tutorials/[slug] routes.
  const tutorialEntries: MetadataRoute.Sitemap = listRegisteredTutorials().map((tutorial) => ({
    url: `${SITE_URL}/platform/${tutorial.platformSlug}`,
  }));

  return [...staticEntries, ...workflowEntries, ...tutorialEntries];
}
