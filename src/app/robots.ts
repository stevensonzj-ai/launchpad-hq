import type { MetadataRoute } from "next";
import { SITE_IS_PUBLIC, SITE_URL } from "@/lib/site";

/**
 * robots.txt.
 *
 * Pre-launch (SITE_IS_PUBLIC === false): Disallow all agents. Matches the
 * friends-and-family noindex posture — crawlers should not treat the catalog
 * as public while that guard remains.
 *
 * TODO(launch): flip SITE_IS_PUBLIC in src/lib/site.ts when noindex is lifted.
 * The launch-time rules below then apply: allow the public catalog, keep
 * auth/account/api out of crawlers, and advertise sitemap.xml.
 *
 * Launch-time version (gated, not active):
 *   User-agent: *
 *   Allow: /
 *   Disallow: /sign-in
 *   Disallow: /sign-up
 *   Disallow: /account
 *   Disallow: /onboarding
 *   Disallow: /api/
 *   Sitemap: https://www.launchpadhq.io/sitemap.xml
 */
export default function robots(): MetadataRoute.Robots {
  if (!SITE_IS_PUBLIC) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/sign-in", "/sign-up", "/account", "/onboarding", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
