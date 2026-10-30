import type { ToolFacts } from "./types";

const PRICING_URL = "https://elevenlabs.io/pricing";

/**
 * ElevenLabs: first fact file, catalog audit 23 (2026-10-30), read on
 * elevenlabs.io/pricing that day (plan cards, compare table and FAQ). The
 * page also shows first-month offers on Starter and Creator with conflicting
 * end-date banners, so no promotional price is recorded here.
 */
export default {
  slug: "elevenlabs",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "10,000 credits a month; text to speech, speech to text, sound effects, voice design, music and image; 3 Studio projects. No commercial license (it starts on Starter); credits do not roll over on Free.",
    },
    sourceUrl: PRICING_URL,
    checkedAt: "2026-10-30",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "10,000 credits/month; 3 Studio projects" },
      { name: "Starter", price: "$6", period: "month", limits: "30,000 credits/month; commercial license; instant voice cloning; 20 Studio projects" },
      { name: "Creator", price: "$22", period: "month", limits: "121,000 credits/month; professional voice cloning; extra credits" },
      { name: "Pro", price: "$99", period: "month", limits: "600,000 credits/month; 44.1kHz PCM output via API" },
      { name: "Scale", price: "$299", period: "month", limits: "1,800,000 credits/month; 3 workspace seats" },
      { name: "Business", price: "$990", period: "month", limits: "6,000,000 credits/month; 10 workspace seats" },
      { name: "Enterprise", price: "Custom", period: "", limits: "Custom credits and seats" },
    ],
    note: "USD, monthly billing, excluding taxes. Annual billing is 10 months' price for 12 (FAQ): $5, $18.33, $82.50, $249.17 and $825 a month for Starter, Creator, Pro, Scale and Business. Paid credits roll over for up to two months. First-month offers shown on Starter and Creator are not recorded (their end date is unclear on the page).",
    sourceUrl: PRICING_URL,
    checkedAt: "2026-10-30",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-30",
      field: "plans",
      summary: "First fact file: Free $0 (10k credits), Starter $6, Creator $22, Pro $99, Scale $299, Business $990, Enterprise custom; annual = 10 months. Replaces the row's expired first-month promo text.",
    },
  ],
} satisfies ToolFacts;
