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

export default nextConfig;
