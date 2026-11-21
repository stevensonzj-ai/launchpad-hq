/**
 * Pages that need a signed-in user. `src/proxy.ts` sends signed-out visitors
 * on these paths to sign-in; every other path is left alone.
 *
 * This used to be the other way round: a list of public paths, with sign-in
 * forced on everything else. That also caught addresses that don't exist, so
 * a signed-out visitor who mistyped `/discovr` was sent to sign-in instead of
 * the 404 page. Listing the private pages instead lets an unknown address
 * reach the 404.
 *
 * Adding a page that needs sign-in: add its path here. `protected-routes.test.ts`
 * fails when a new top-level page appears that is in neither this list nor its
 * list of known public pages, so the choice is made on purpose.
 *
 * API routes are not listed: each handler checks auth itself (`401` on writes).
 */
// Exact path plus sub-paths, so "/account" never also catches "/accounting-…".
export const PROTECTED_ROUTE_PATTERNS = ["/account", "/account/(.*)", "/onboarding", "/onboarding/(.*)"];
