import type { ToolFacts } from "./types";

export default {
  slug: "speechify",
  lifecycle: "active",
  company: {
    value: "Speechify Inc",
    note: "Footer: © Speechify Inc 2026",
    sourceUrl: "https://speechify.com/pricing/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Speeds up to 1.5x, 10 robotic-sounding voices, text-to-speech features only.",
    },
    sourceUrl: "https://speechify.com/pricing/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Premium",
        price: "$29",
        period: "Month",
        limits: "Prices shown per month, billed monthly",
      },
    ],
    note: "USD. Yearly toggle says SAVE 60%; yearly dollar price unpublished. Per user unpublished.",
    sourceUrl: "https://speechify.com/pricing/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: [
      "iPhone & iPad",
      "Android",
      "Chrome extension",
      "Edge extension",
      "Web App",
      "Mac App",
      "Windows",
    ],
    sourceUrl: "https://speechify.com/pricing/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/speechify-text-to-speech-audio/id1209815023",
      android: "https://play.google.com/store/apps/details?id=com.cliffweitzman.speechify2",
    },
    sourceUrl: "https://speechify.com/pricing/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Premium $29/Month billed monthly. Yearly dollar price unpublished.",
    },
  ],
} satisfies ToolFacts;
