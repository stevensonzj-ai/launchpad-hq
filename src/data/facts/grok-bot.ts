import type { ToolFacts } from "./types";

export default {
  slug: "grok-bot",
  lifecycle: "active",
  verdict: {
    value:
      "xAI's Grok Bot, a separate product from the Grok chat app, with desktop and mobile apps.",
    sourceUrl: "https://x.ai/bot",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["macOS", "Windows", "Linux", "iPhone", "iPad", "Android"],
    note: 'The desktop app runs on macOS (Apple silicon and Intel), Windows (x64 and Arm64), and Linux (x64 and Arm64), and the mobile app runs on iPhone, iPad, and Android.',
    sourceUrl: "https://docs.x.ai/grok-bot",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apps: {
    value: {
      macos: "https://x.ai/bot#download",
    },
    sourceUrl: "https://x.ai/bot#download",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  plans: {
    value: [
      { name: "X Premium", price: "$30", period: "month", limits: "$300/year; includes Grok Bot" },
      { name: "X Super", price: "$100", period: "month", limits: "$1,000/year" },
      { name: "X Ultra", price: "$200", period: "month", limits: "$2,000/year" },
    ],
    note: "USD. No standalone price; not included on X Plus ($8/month). Team seats at the same prices. As of 2026-10-30.",
    sourceUrl: "https://docs.x.ai/x-subscription/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://docs.x.ai/x-subscription/pricing and price facts added with source and date." },
    {
      date: "2026-10-14",
      field: "apps",
      summary: "macOS download is https://x.ai/bot#download.",
    },
  ],
} satisfies ToolFacts;
