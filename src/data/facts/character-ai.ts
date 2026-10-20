import type { ToolFacts } from "./types";

export default {
  slug: "character-ai",
  lifecycle: "active",
  status: {
    value: {
      headline:
        "On October 12, 2026, Character.AI announced a voluntary Chapter 11 process to run a court-supervised sale of the company. It says the platform remains up and running, and that it will be wound down if no buyer keeps it operating.",
      whatToDo:
        "Character.AI says you can export your data or delete your account in the app or on the website.",
    },
    sourceUrl: "https://blog.character.ai/an-update-on-character-ai/",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  company: {
    value: "Character Technologies Inc. dba Character.ai",
    note: "Menlo Park, CA.",
    sourceUrl: "https://character.ai/about",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
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
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "c.ai+",
        price: "$94.99/yr",
        period: "",
        limits: "",
      },
    ],
    sourceUrl: "https://character.ai/subscribe",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Web", "iPhone", "Android"],
    sourceUrl: "https://character.ai/about",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/character-ai-ai-powered-chat/id1671705818",
      android: "https://play.google.com/store/apps/details?id=ai.character.app",
    },
    sourceUrl: "https://character.ai/about",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-20",
      field: "status",
      summary: "Added dated note on the Chapter 11 sale process (company blog, 2026-10-12).",
    },
    {
      date: "2026-10-14",
      field: "plans",
      summary: "c.ai+ is $94.99/yr only. Removed the struck-through $119.88 / save 21% note.",
    },
  ],
} satisfies ToolFacts;
