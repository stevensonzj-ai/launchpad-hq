import { getActivePlacement } from "@/data/sponsors";
import type { SponsorPlacement } from "@/data/sponsors";
import { PRO_PLAN_ENABLED } from "@/lib/site";

/** Static public paths that always belong in sitemap.xml. */
export const SITEMAP_STATIC_PUBLIC_PATHS = [
  "/",
  "/discover",
  "/quiz",
  "/workflows",
  "/tutorials",
  "/privacy",
  "/terms",
  "/models",
  "/models/compare/claude-vs-gpt",
  "/how-we-make-money",
  "/advertise",
  "/connector",
] as const;

export const SITEMAP_PRIVATE_PATHS = [
  "/sign-in",
  "/sign-up",
  "/account",
  "/onboarding",
  "/for-you",
  "/quiz/results",
] as const;

export function sitemapUrl(origin: string, path: string): string {
  if (path === "/") return origin;
  return `${origin}${path}`;
}

export function sitemapStaticPublicPaths(options?: {
  proPlanEnabled?: boolean;
  includeAiOfTheWeek?: boolean;
}): string[] {
  const paths: string[] = [...SITEMAP_STATIC_PUBLIC_PATHS];
  if (options?.proPlanEnabled) paths.push("/pricing");
  if (options?.includeAiOfTheWeek) paths.push("/ai-of-the-week");
  return paths;
}

export function sitemapStaticPublicPathsForNow(
  date: Date = new Date(),
  placements?: readonly SponsorPlacement[],
  proPlanEnabled: boolean = PRO_PLAN_ENABLED,
): string[] {
  const booked =
    getActivePlacement("ai-of-the-week", date, undefined, placements) != null;
  return sitemapStaticPublicPaths({
    proPlanEnabled,
    includeAiOfTheWeek: booked,
  });
}
