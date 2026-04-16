import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

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

export default clerkMiddleware(async (auth, request) => {
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
