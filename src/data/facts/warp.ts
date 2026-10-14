import type { ToolFacts } from "./types";

export default {
  slug: "warp",
  lifecycle: "active",
  company: {
    value: "Warp",
    sourceUrl: "https://www.warp.dev/download",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Terminal; pay-as-you-go or bring-your-own AI; limited cloud agents",
    },
    sourceUrl: "https://www.warp.dev/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Free",
        price: "$0",
        period: "month",
        limits: "Terminal; pay-as-you-go or bring-your-own AI; limited cloud agents",
      },
      {
        name: "Build",
        price: "$20",
        period: "month",
        limits: "Includes $20 of agent usage",
      },
      {
        name: "Max",
        price: "$200",
        period: "month",
        limits: "Includes $200 of usage",
      },
      {
        name: "Business",
        price: "$50",
        period: "user",
        limits: "Up to 25 seats",
      },
    ],
    sourceUrl: "https://www.warp.dev/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["macOS 10.14+", "Windows 10/11 (x64, ARM64)", "Linux (deb/rpm/Arch/AppImage)"],
    sourceUrl: "https://www.warp.dev/download",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary: "Recorded Free, Build, Max, and Business list prices.",
    },
  ],
} satisfies ToolFacts;
