import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
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
