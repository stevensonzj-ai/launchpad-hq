import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { markdownRewriteTarget, RSC_REQUEST_HEADERS } from "@/lib/markdown/negotiate";

/** Browse-first: most routes stay public; only gated areas require auth. */
const isPublicRoute = createRouteMatcher([
  "/",
  "/discover(.*)",
  "/platform(.*)",
  "/tutorials(.*)",
  "/workflows(.*)",
  "/models(.*)",
  "/compare(.*)",
  "/alternatives(.*)",
  "/quiz(.*)",
  "/for-you(.*)",
  "/pricing(.*)",
  "/privacy(.*)",
  "/terms(.*)",
  "/how-we-make-money(.*)",
  "/sponsor-guidelines(.*)",
  "/advertise(.*)",
  "/ai-of-the-week(.*)",
  "/connector(.*)",
  "/about(.*)",
  "/contact(.*)",
  "/support(.*)",
  "/developers(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api(.*)",
  "/sitemap.xml",
  "/robots.txt",
  "/llms.txt",
  "/llms-full.txt",
  // Read-only MCP connector: anonymous by design (no auth in v0.1).
  // Without this, auth.protect() would block signed-out MCP clients.
  "/mcp",
  // Public JSON feed. Also excluded from the matcher below, so Clerk never
  // adds cookies or private cache headers to it.
  "/data(.*)",
  // Markdown versions of public pages (src/app/md). Normally reached by the
  // Accept: text/markdown rewrite below, which skips Clerk; listed so a
  // direct request is not sent to sign-in.
  "/md(.*)",
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

  if (!isPublicRoute(request)) {
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
    "/((?!_next|data/|[^?]*\\.(?:html?|css|js(?!on)|ico|png|jpg|jpeg|gif|svg|webp|avif|ttf|woff2?|csv|txt|xml)).*)",
    "/(api|trpc)(.*)",
  ],
};
