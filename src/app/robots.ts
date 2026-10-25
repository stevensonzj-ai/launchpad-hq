import type { MetadataRoute } from "next";
import { SITE_IS_PUBLIC, SITE_URL } from "@/lib/site";

/**
 * robots.txt.
 *
 * Pre-launch (SITE_IS_PUBLIC === false): Disallow all agents. Matches the
 * friends-and-family noindex posture — crawlers should not treat the catalog
 * as public while that guard remains.
 *
 * When SITE_IS_PUBLIC is true, allow the public catalog, keep
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
 *   Disallow: /for-you
 *   Disallow: /quiz/results
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
      disallow: [
        "/sign-in",
        "/sign-up",
        "/account",
        "/onboarding",
        "/api/",
        "/for-you",
        "/quiz/results",
        "/mcp",
        // Markdown twins of public pages; the HTML URLs are canonical.
        "/md",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
