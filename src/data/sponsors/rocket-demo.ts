import type { SponsorPlacement } from "./types";

/**
 * Preview-only Discover landing target for `?rocket=demo`.
 * Not a live booking. Never import into PLACEMENTS.
 */
export const ROCKET_DEMO_PLACEMENT: SponsorPlacement = {
  id: "rocket-demo-not-live",
  slot: "discover",
  startDate: "2020-01-01",
  endDate: "2099-12-31",
  sponsorName: "Demo Sponsor",
  logoUrl: "/images/launchpad/discover-rocket.jpg",
  headline: "Demo spotlight — not a real booking",
  blurb: "Preview landing target only. Not a live sponsor.",
  ctaUrl: "https://example.com",
  ctaLabel: "Example link",
};
