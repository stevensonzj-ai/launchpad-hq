import type { ToolFacts } from "./types";

export default {
  slug: "meta-ai",
  lifecycle: "active",
  company: {
    value: "Meta",
    sourceUrl: "https://ai.meta.com/meta-ai/assistant/",
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
        "Meta AI is free to use for everyday use. Meta is testing usage limits, and a subscription is available for more.",
    },
    sourceUrl: "https://ai.meta.com/meta-ai/assistant/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["iOS", "Android", "Web", "Desktop", "AI glasses", "Mac (Beta)"],
    note: "Official copy: iOS and Android, web, desktop, AI glasses, and your favorite apps, plus Download for Mac (Beta).",
    sourceUrl: "https://ai.meta.com/meta-ai/assistant/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/app/id1558240027",
      android: "https://play.google.com/store/apps/details?id=com.facebook.stella",
    },
    sourceUrl: "https://ai.meta.com/meta-ai/assistant/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: ["Muse Spark", "Muse Spark Open"],
    note: "Muse Spark Open is Meta's downloadable open-weight model (also via hosted APIs) — it is not a model of the consumer Meta AI assistant app.",
    sourceUrl: "https://research.meta.ai/blog/muse-spark-open/",
    checkedAt: "2026-10-17",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-17",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-17",
      field: "models",
      summary:
        "Added Muse Spark Open as a distinct listing from Muse Spark. Muse Spark Open is Meta's downloadable open-weight model (also via hosted APIs) — it is not a model of the consumer Meta AI assistant app.",
    },
    {
      date: "2026-10-14",
      field: "models",
      summary:
        "Model row is Muse Spark only. Kept main Meta AI store links. Added FAQ free-tier wording from the assistant page.",
    },
  ],
} satisfies ToolFacts;
