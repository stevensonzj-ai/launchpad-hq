import type { ToolFacts } from "./types";

export default {
  slug: "meta-ai",
  lifecycle: "active",
  company: {
    value: "Meta",
    sourceUrl: "https://ai.meta.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["iOS", "Android", "Web", "Desktop", "AI glasses", "Mac (Beta)"],
    note: "Official copy: iOS and Android, web, desktop, AI glasses, and your favorite apps, plus Download for Mac (Beta).",
    sourceUrl: "https://ai.meta.com/meta-ai/assistant/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/app/id1558240027",
      android: "https://play.google.com/store/apps/details?id=com.facebook.stella",
    },
    sourceUrl: "https://ai.meta.com/meta-ai/assistant/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  models: {
    value: ["Muse Wonder", "Muse Spark 1.3", "Muse Image"],
    label: "Muse family",
    note: "Muse Wonder is labelled LATEST MODEL, announced Oct 12, 2026.",
    sourceUrl: "https://ai.meta.com/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "models",
      summary: "Latest model is Muse Wonder. Store links are the main Meta AI app, not Muse from Meta.",
    },
  ],
} satisfies ToolFacts;
