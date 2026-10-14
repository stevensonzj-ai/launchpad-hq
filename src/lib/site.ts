/** Canonical public origin. Used by robots, sitemap, and llms.txt. */
export const SITE_URL = "https://www.launchpadhq.io";

/**
 * Friends-and-family / pre-launch guard.
 * Controls both robots.txt (Disallow: /) and site-wide metadata noindex.
 * TODO(launch): flip to true only when the catalog is ready for public search;
 * that single flip lifts robots.txt and noindex together.
 */
export const SITE_IS_PUBLIC = false;
