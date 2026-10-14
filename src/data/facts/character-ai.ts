import type { ToolFacts } from "./types";

export default {
  slug: "character-ai",
  lifecycle: "active",
  company: {
    value: "Character Technologies Inc. dba Character.ai",
    note: "Menlo Park, CA.",
    sourceUrl: "https://character.ai/about",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary:
        "Ads, Limited daily features, slow mode, basic memory, 15 pins. No numeric limits published.",
    },
    sourceUrl: "https://character.ai/subscribe",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "c.ai+",
        price: "$94.99",
        period: "year",
        limits: "Struck-through $119.88, save 21%",
      },
    ],
    sourceUrl: "https://character.ai/subscribe",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Web", "iPhone", "Android"],
    sourceUrl: "https://character.ai/about",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/character-ai-ai-powered-chat/id1671705818",
      android: "https://play.google.com/store/apps/details?id=ai.character.app",
    },
    sourceUrl: "https://character.ai/about",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "c.ai+ is $94.99/yr. No monthly price was published on the subscribe page.",
    },
  ],
} satisfies ToolFacts;
