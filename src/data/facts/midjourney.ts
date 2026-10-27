import type { ToolFacts } from "./types";

const MJ_PLANS_URL = "https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans";
const MJ_FREE_TRIALS_URL = "https://docs.midjourney.com/hc/en-us/articles/27870399340173-Free-Trials";

/**
 * Midjourney, checked by the RA on Midjourney's own docs on 2026-10-26
 * (mcp-stress-factcheck-2026-10-26.md, item 4 and follow-up 6). Midjourney
 * itself runs on the web (midjourney.com) and Discord; the separate niji
 * journey app (iOS and Android, made with Spellbrush) is anime-only.
 */
export default {
  slug: "midjourney",
  lifecycle: "active",
  freeTier: {
    value: {
      available: false,
      summary:
        "No free plan, and no free trial on the website or Discord. A limited trial exists only in the separate niji journey mobile app.",
    },
    sourceUrl: MJ_FREE_TRIALS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Basic", price: "$10", period: "month", limits: "Or $96/year ($8/month); 3.3 hours of Fast GPU time a month; no Relax mode" },
      { name: "Standard", price: "$30", period: "month", limits: "Or $288/year ($24/month); 15 Fast hours a month; unlimited images in Relax mode" },
      { name: "Pro", price: "$60", period: "month", limits: "Or $576/year ($48/month); 30 Fast hours a month; unlimited images and SD video in Relax mode; Stealth mode" },
      { name: "Mega", price: "$120", period: "month", limits: "Or $1,152/year ($96/month); 60 Fast hours a month; unlimited images and SD video in Relax mode; Stealth mode" },
    ],
    note: "USD, as of 2026-10-26. Annual billing is 20% off. Extra Fast GPU time is $4/hour. Companies with more than $1M gross revenue a year must use Pro or Mega.",
    sourceUrl: MJ_PLANS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  platforms: {
    value: ["Web", "Discord"],
    note: "No Midjourney-branded mobile app (Apple App Store and Google Play, 2026-10-26); the niji journey app is a separate anime-style product.",
    sourceUrl: MJ_FREE_TRIALS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  features: {
    value: [
      "Midjourney makes images and video; Pro and Mega include unlimited SD video generation in Relax mode.",
      "Every plan includes Fast GPU time; Standard and above add unlimited image generation in Relax mode.",
    ],
    sourceUrl: MJ_PLANS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary:
        "First fact file: Basic $10, Standard $30, Pro $60, Mega $120 a month with annual prices and GPU hours; no free plan; web and Discord only; video generation.",
    },
  ],
} satisfies ToolFacts;
