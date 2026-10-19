/** Canonical public origin. Used by robots, sitemap, metadataBase, and llms.txt. */
export const SITE_URL = "https://www.launchpadhq.io";

/** Absolute URL on the production host. Never uses the Vercel preview hostname. */
export function absoluteUrl(path = "/"): string {
  const normalized = path === "" || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return SITE_URL;
  return `${SITE_URL}${normalized}`;
}

/**
 * Public-search guard.
 * Controls both robots.txt (Disallow: / vs public allow list) and site-wide
 * metadata noindex. True = catalog is indexable; false = friends-and-family.
 */
export const SITE_IS_PUBLIC = true;

/**
 * User-facing Pro subscription. Stripe checkout/portal stay in the repo
 * but must 404 while this is false. Do not delete Stripe routes, DB columns,
 * or migrations when flipping this.
 */
export const PRO_PLAN_ENABLED = false;
