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
  changelog: [
    {
      date: "2026-10-14",
      field: "apps",
      summary: "macOS download is https://x.ai/bot#download.",
    },
  ],
} satisfies ToolFacts;
