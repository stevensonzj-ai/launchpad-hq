import type { ToolFacts } from "./types";

/**
 * Udio: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * Since its partnership with Universal Music Group (2025-10-29), Udio
 * has disabled downloads of audio, video and stems and is in a
 * "transition period" before a new platform; a Warner Music Group deal
 * followed in November 2025. Free use is 10 credits a day (up to 100 a
 * month); Standard has up to 2,400 credits a month and Pro up to 6,000.
 * Plan prices render only in a browser (the help centre gives only an
 * annual Standard example, $96 + tax in the US), so no plans fact is
 * recorded (Browser-check list); the credit amounts are under features.
 */
export default {
  slug: "udio",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free: 10 credits a day, with a monthly limit of 100; credits do not roll over. Downloads are disabled for all users.",
    },
    sourceUrl: "https://help.udio.com/en/articles/10739134-credits-and-credit-limits",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "On 2025-10-29 Udio announced a partnership with Universal Music Group; downloads from the platform became unavailable and Udio entered a transition period.",
      "Downloading of audio, video and stems is disabled (help centre, updated 2026-02-17).",
      "Udio says a reimagined platform, where artists set permissions for what can be created, is coming; no launch date is given.",
    ],
    note: "The download and credit entries are from Udio's help centre (help.udio.com/en/articles/12683565-changes-associated-with-the-universal-music-group-umg-partnership, updated 2026-02-17).",
    sourceUrl: "https://www.udio.com/blog/a-new-era",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "features",
      summary: "First fact file: downloads disabled since the UMG deal (2025-10-29); free 10 credits/day; Standard 2,400 and Pro 6,000 credits/mo.",
    },
  ],
} satisfies ToolFacts;
