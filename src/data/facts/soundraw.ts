import type { ToolFacts } from "./types";

/**
 * Soundraw: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * The pricing page lists only paid plans (Creator, Artist Starter,
 * Artist Pro, Artist Unlimited, Enterprise); the homepage says you can
 * try it free, and commercial use is on paid plans. The row moves from
 * FREEMIUM to PAID. Each plan shows two prices next to an annual /
 * monthly toggle ("up to 67% off with Annual") without saying which is
 * which, so both are recorded as shown.
 */
export default {
  slug: "soundraw",
  lifecycle: "active",
  freeTier: {
    value: {
      available: false,
      summary: "No free plan listed; you can try it free, and commercial use is on paid plans.",
    },
    sourceUrl: "https://soundraw.io/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Creator",
        price: "$16.99 or $11.04",
        period: "month",
        limits: "Billing view unlabelled; unlimited downloads; MP3 only",
      },
      {
        name: "Artist Starter",
        price: "$29.99 or $19.49",
        period: "month",
        limits: "Billing view unlabelled; 10 downloads a month; MP3",
      },
      {
        name: "Artist Pro",
        price: "$35.99 or $23.39",
        period: "month",
        limits: "Billing view unlabelled; 20 downloads a month; MP3, WAV and stems",
      },
      {
        name: "Artist Unlimited",
        price: "$50 or $32.50",
        period: "month",
        limits: "Billing view unlabelled; unlimited downloads; MP3, WAV and stems",
      },
      {
        name: "Enterprise",
        price: "On request",
        period: "",
        limits: "Companies of 10+ employees",
      },
    ],
    note: "USD, as of 2026-10-29. \"Get up to 67% off with Annual\"; the page does not label which price is annual.",
    sourceUrl: "https://soundraw.io/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: paid plans only (FREEMIUM -> PAID); Creator, three Artist tiers and Enterprise; stems only from Artist Pro.",
    },
  ],
} satisfies ToolFacts;
