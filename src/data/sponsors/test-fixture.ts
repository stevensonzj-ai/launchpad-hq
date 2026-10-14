import type { SponsorPlacement } from "./types";

/**
 * Clearly fake. Test-only. Never import this from app routes or PLACEMENTS.
 */
export const TEST_ONLY_EXAMPLE_PLACEMENT: SponsorPlacement = {
  id: "test-only-example-not-live",
  slot: "homepage",
  startDate: "2020-01-01",
  endDate: "2099-12-31",
  sponsorName: "Example Sponsor (TEST FIXTURE — NOT LIVE)",
  logoUrl: "https://example.invalid/logo.png",
  spotlightImageUrl: "https://example.invalid/spotlight.png",
  heroImageUrl: "https://example.invalid/hero.png",
  headline: "This is a fake test placement, not a real sponsor",
  blurb: "Used only by unit tests. If you see this on the site, a live import was wired incorrectly.",
  ctaUrl: "https://example.invalid/cta",
  ctaLabel: "Not a real offer",
  bullets: ["Fake bullet one", "Fake bullet two"],
  featureBody:
    "This paragraph exists so tests can exercise AI-of-the-Week rendering without booking a real sponsor. It is not a review, not a ranking, and not paid copy that should appear in production. ".repeat(
      8,
    ),
  honestTake:
    "Our honest take would go here on a real booking. This sentence is test-only.",
};
