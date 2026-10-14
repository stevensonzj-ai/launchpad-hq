import type { ToolFacts } from "./types";

export default {
  slug: "grok-bot",
  lifecycle: "active",
  verdict: {
    value:
      "xAI desktop and mobile agent product, distinct from the Grok chat app.",
    sourceUrl: "https://x.ai/bot",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "cto",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["macOS", "Windows", "Linux", "iPhone/iPad", "Android"],
    sourceUrl: "https://docs.x.ai/grok-bot",
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
      summary:
        "macOS download is https://x.ai/bot#download. No Grok Bot iOS listing; do not use the Grok chat App Store or Play links.",
    },
  ],
} satisfies ToolFacts;
