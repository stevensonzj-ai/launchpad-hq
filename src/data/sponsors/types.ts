/**
 * Static sponsor placement contract. No database, no schema.
 *
 * Asset specs (use as-is):
 * - logo: 256×256 min, ≤200 KB
 * - spotlight image: 1200×630, ≤500 KB
 * - AI of the Week hero: 1600×900, ≤800 KB
 * Copy limits (use as-is):
 * - headline ≤90 chars
 * - blurb ≤200 chars
 * - AotW feature 150–400 words
 * - ≤3 bullets of ≤80 chars each
 * - one https CTA
 */

export const SPONSOR_COPY_LIMITS = {
  headlineMax: 90,
  blurbMax: 200,
  featureBodyMinWords: 150,
  featureBodyMaxWords: 400,
  maxBullets: 3,
  bulletMax: 80,
} as const;

export const SPONSOR_SLOTS = ["discover", "ai-of-the-week"] as const;
export type SponsorSlot = (typeof SPONSOR_SLOTS)[number];

export type SponsorPlacement = {
  id: string;
  slot: SponsorSlot;
  /** Unused for Discover Spotlight (page-top banner). Kept optional for older rows. */
  categorySlug?: string;
  /** Inclusive window, calendar dates in America/Chicago (YYYY-MM-DD). */
  startDate: string;
  endDate: string;
  sponsorName: string;
  logoUrl: string;
  spotlightImageUrl?: string;
  heroImageUrl?: string;
  headline: string;
  blurb: string;
  ctaUrl: string;
  ctaLabel: string;
  bullets?: string[];
  /** AI of the Week long-form feature (150–400 words). */
  featureBody?: string;
  /** Editorial box; never written by the sponsor. */
  honestTake?: string;
};
