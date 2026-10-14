import type { ToolFacts } from "./types";

export default {
  slug: "grok-bot",
  lifecycle: "active",
  verdict: {
    value:
      "xAI's Grok Bot, a separate product from the Grok chat app. macOS download at x.ai/bot.",
    sourceUrl: "https://x.ai/bot",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cto",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["macOS"],
    sourceUrl: "https://x.ai/bot#download",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cto",
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
    verifiedBy: "cto",
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
