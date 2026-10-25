import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import { catalogRedirects } from "./src/lib/catalog-redirects";
import { compareRedirects } from "./src/data/compare/pages";
import { HTML_VARY_WITH_ACCEPT, MARKDOWN_VARY_SOURCES } from "./src/lib/markdown/negotiate";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  async headers() {
    // Pages with a Markdown version (src/lib/markdown/negotiate.ts): tell
    // shared caches the response depends on Accept. The value repeats the
    // Vary Next sets on app pages, so whichever header wins on the platform
    // the RSC variants stay keyed; Markdown itself is a separate /md route.
    return MARKDOWN_VARY_SOURCES.map((source) => ({
      source,
      headers: [{ key: "Vary", value: HTML_VARY_WITH_ACCEPT }],
    }));
  },
  async redirects() {
    return [
      // 1-to-1 rename: fix the truncated "Softwar" slug from the original import.
      // Safe to handle in next.config.ts because the matched value differs from
      // the destination value, so the redirect doesn't re-match itself.
      {
        source: "/discover",
        has: [{ type: "query", key: "category", value: "ai-plugins-for-business-softwar" }],
        destination: "/discover?category=ai-plugins-business-software",
        permanent: true,
      },
      // Treat-as-1-to-1: Browser Extensions & Productivi → Meetings & Notes
      // (best-fit; 3 of 5 platforms went there). Safe here for the same reason.
      {
        source: "/discover",
        has: [{ type: "query", key: "category", value: "browser-extensions-productivi" }],
        destination: "/discover?category=meetings-notes",
        permanent: true,
      },
      // The two 1-to-many split cases (`industry-specific-ai`,
      // `audio-music-voice-ai`) are handled in src/proxy.ts middleware instead.
      // next.config.ts redirects() passes `has`-matched query params through
      // to the destination, so stripping the filter here would infinite-loop.
      // See Next.js issue #24949.

      // Duplicate catalog rows and retired guides (301, not 308).
      // Data and rationale: src/lib/catalog-redirects.ts.
      ...catalogRedirects(),

      // /compare/<b>-vs-<a> -> alphabetical /compare/<a>-vs-<b> (301).
      // Data: src/data/compare/pages.ts.
      ...compareRedirects(),
    ];
  },
};

export default withSentryConfig(nextConfig, {
 // For all available options, see:
 // https://www.npmjs.com/package/@sentry/webpack-plugin#options

 org: "launchpad-hq",

 project: "javascript-nextjs",

 // Only print logs for uploading source maps in CI
 silent: !process.env.CI,

 // For all available options, see:
 // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

 // Upload a larger set of source maps for prettier stack traces (increases build time)
 widenClientFileUpload: true,

 // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
 // This can increase your server load as well as your hosting bill.
 // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
 // side errors will fail.
 // tunnelRoute: "/monitoring",

 webpack: {
   // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
   // See the following for more information:
   // https://docs.sentry.io/product/crons/
   // https://vercel.com/docs/cron-jobs
   automaticVercelMonitors: true,

   // Tree-shaking options for reducing bundle size
   treeshake: {
     // Automatically tree-shake Sentry logger statements to reduce bundle size
     removeDebugLogging: true,
   },
 },
});
