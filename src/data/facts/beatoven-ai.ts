import type { ToolFacts } from "./types";

/**
 * Beatoven.ai: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * The pricing page returns 404 (the site's own menu links to it). Both
 * readers saw the homepage line "Pay per track or subscribe for
 * additional download minutes", so the row's FREE tier is wrong; it
 * moves to FREEMIUM. One reader read plan data from the homepage's
 * structured data (Free: 5 generations; Creator $6 / 15 min, Visionary
 * $10 / 30 min, $20 / 60 min of downloads a month), so plans and the
 * free tier stay unverified (Browser-check list).
 */
export default {
  slug: "beatoven-ai",
  lifecycle: "active",
  company: {
    value: "Beatoven Private Limited",
    sourceUrl: "https://www.beatoven.ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "5 free generations to start; downloads are bought per track or as monthly download minutes.",
    },
    note: "One reader, from the homepage's structured data; the pricing page returns 404.",
    sourceUrl: "https://www.beatoven.ai/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  features: {
    value: [
      "Downloads are paid: \"Pay per track or subscribe for additional download minutes.\"",
      "Downloaded tracks come with a royalty-free, perpetual, non-exclusive licence; Beatoven keeps ownership of the tracks.",
      "An API is offered (create a key from the API page); no API prices are published.",
    ],
    sourceUrl: "https://www.beatoven.ai/",
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
      summary: "First fact file: downloads are paid per track or by monthly minutes (FREE -> FREEMIUM); pricing page 404.",
    },
  ],
} satisfies ToolFacts;
