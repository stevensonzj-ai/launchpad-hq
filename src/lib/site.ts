/** Canonical public origin. Used by robots, sitemap, and llms.txt. */
export const SITE_URL = "https://launchpadhq.io";

/**
 * Friends-and-family / pre-launch guard.
 * TODO(launch): flip to true only when site-wide noindex is lifted and the
 * catalog is ready for public search. Do not flip this as part of Phase 0.
 */
export const SITE_IS_PUBLIC = false;
