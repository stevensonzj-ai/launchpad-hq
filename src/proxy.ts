import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { markdownRewriteTarget, RSC_REQUEST_HEADERS } from "@/lib/markdown/negotiate";
import { PROTECTED_ROUTE_PATTERNS } from "@/lib/protected-routes";

/**
 * Browse-first: everything is public except the few pages that need a
 * signed-in user (see src/lib/protected-routes.ts). Unknown addresses fall
 * through to the 404 page instead of sign-in.
 *
 * /.well-known is not listed here. It is excluded from the matcher below, so
 * this function never runs for the OpenAI apps domain file.
 */
const isProtectedRoute = createRouteMatcher(PROTECTED_ROUTE_PATTERNS);

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

const clerk = clerkMiddleware(async (auth, request) => {
  // Run the category-strip redirect before auth — fires for signed-out users too.
  if (request.nextUrl.pathname === "/discover") {
    const category = request.nextUrl.searchParams.get("category");
    if (category && STRIPPED_CATEGORY_SLUGS.has(category)) {
      const url = request.nextUrl.clone();
      url.searchParams.delete("category");
      return NextResponse.redirect(url, 308);
    }
  }

  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

/**
 * Markdown negotiation runs first and, when it applies, returns before Clerk:
 * only GET/HEAD, never RSC or prefetch requests, only when Accept names
 * text/markdown and prefers it to text/html, and only for pages with a
 * Markdown version (or certain 404s). The rewrite target is a separate
 * internal path (/md/...), so the CDN never stores Markdown under the HTML
 * page's cache entry. Everything else goes to Clerk exactly as before.
 */
export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const target = markdownRewriteTarget({
    method: request.method,
    pathname: request.nextUrl.pathname,
    accept: request.headers.get("accept"),
    isRscRequest: RSC_REQUEST_HEADERS.some((name) => request.headers.has(name)),
  });
  if (target) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.rewrite(url);
  }
  return clerk(request, event);
}

export const config = {
  matcher: [
    // `\\.well-known/` is the OpenAI apps domain file. It has no skipped
    // extension, so without this the proxy would run on it and Clerk could
    // attach auth headers. Same treatment as the public JSON feed under data/.
    "/((?!_next|data/|\\.well-known/|[^?]*\\.(?:html?|css|js(?!on)|ico|png|jpg|jpeg|gif|svg|webp|avif|ttf|woff2?|csv|txt|xml)).*)",
    "/(api|trpc)(.*)",
  ],
};
