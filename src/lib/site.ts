/** Canonical public origin. Used by robots, sitemap, and llms.txt. */
export const SITE_URL = "https://www.launchpadhq.io";

/**
 * Friends-and-family / pre-launch guard.
 * Controls both robots.txt (Disallow: /) and site-wide metadata noindex.
 * TODO(launch): flip to true only when the catalog is ready for public search;
 * that single flip lifts robots.txt and noindex together.
 */
export const SITE_IS_PUBLIC = false;

/**
 * User-facing Pro subscription. Stripe checkout/portal stay in the repo
 * but must 404 while this is false. Do not delete Stripe routes, DB columns,
 * or migrations when flipping this.
 */
export const PRO_PLAN_ENABLED = false;
