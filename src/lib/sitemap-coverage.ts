/** Static public paths that always belong in sitemap.xml. */
export const SITEMAP_STATIC_PUBLIC_PATHS = [
  "/",
  "/discover",
  "/quiz",
  "/workflows",
  "/tutorials",
  "/pricing",
  "/privacy",
  "/terms",
  "/models",
  "/models/compare/claude-vs-gpt",
  "/how-we-make-money",
  "/advertise",
  "/ai-of-the-week",
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
