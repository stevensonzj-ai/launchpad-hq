import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/** Browse-first: most routes stay public; only gated areas require auth. */
const isPublicRoute = createRouteMatcher([
  "/",
  "/discover(.*)",
  "/platform(.*)",
  "/workflows(.*)",
  "/quiz(.*)",
  "/for-you(.*)",
  "/pricing(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api(.*)",
]);

/**
 * Category slugs from the 2026-05 restructure whose platforms fanned out
 * across multiple new categories — no single best-fit destination. For these
 * we strip the `?category=` filter and 308 the user to /discover so they can
 * browse the unfiltered catalog.
 *
 * Lives here instead of next.config.ts redirects() because Next.js passes
 * `has`-matched query params through to the destination, which would create
 * an infinite redirect loop when the destination drops the param (Next.js
 * issue #24949). NextResponse.redirect from middleware gives us a clean URL
 * with the param actually removed.
 */
const STRIPPED_CATEGORY_SLUGS = new Set(["industry-specific-ai", "audio-music-voice-ai"]);

export default clerkMiddleware(async (auth, request) => {
  // Run the category-strip redirect before auth — fires for signed-out users too.
  if (request.nextUrl.pathname === "/discover") {
    const category = request.nextUrl.searchParams.get("category");
    if (category && STRIPPED_CATEGORY_SLUGS.has(category)) {
      const url = request.nextUrl.clone();
      url.searchParams.delete("category");
      return NextResponse.redirect(url, 308);
    }
  }

  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|ico|png|jpg|jpeg|gif|svg|ttf|woff2?|csv|txt)).*)",
    "/(api|trpc)(.*)",
  ],
};
