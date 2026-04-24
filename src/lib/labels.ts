/**
 * Display labels for Prisma enum values.
 *
 * The database stores enum values as SCREAMING_SNAKE (standard Prisma);
 * the UI needs human-readable strings. Consolidated here so every render
 * site formats them the same way — previously each site did its own
 * `.toLowerCase()`, which produced "freemium" / "beginner" etc. and
 * collided visually with title-case strings elsewhere on the page.
 */

/** Display labels for the CostTier Prisma enum. */
export const COST_TIER_LABEL: Record<string, string> = {
  FREE: "Free",
  FREEMIUM: "Freemium",
  PAID: "Paid",
  ENTERPRISE: "Enterprise",
};

/** Display labels for the Difficulty Prisma enum. */
export const DIFFICULTY_LABEL: Record<string, string> = {
  BEGINNER: "Beginner-friendly",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert",
};

/** Display labels for the PrivacyLevel Prisma enum. */
export const PRIVACY_LEVEL_LABEL: Record<string, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  MAXIMUM: "Maximum",
};

/** Tooltip copy for the CostTier Prisma enum — explains what each tier means. */
export const COST_TIER_TOOLTIP: Record<string, string> = {
  FREE: "Completely free to use with no credit card required.",
  FREEMIUM: "Free tier available with limits; paid plans unlock more.",
  PAID: "Requires a paid subscription or one-time purchase.",
  ENTERPRISE: "Custom pricing, typically for teams or companies.",
};
