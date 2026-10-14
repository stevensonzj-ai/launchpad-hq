import type { ToolFacts } from "./types";

export default {
  slug: "quillbot",
  lifecycle: "active",
  company: {
    value: "Quillbot, a Learneo, Inc. business",
    note: "Footer: Quillbot, a Learneo, Inc. business © Learneo, Inc. 2026. Browser-verified 2026-10-14.",
    sourceUrl: "https://quillbot.com/premium",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Paraphrase up to 100 words, summarize up to 1,200 words.",
    },
    note: "Browser-verified 2026-10-14. FAQ also states Premium works on up to 10 devices; limits may vary across platforms.",
    sourceUrl: "https://quillbot.com/premium",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Premium",
        price: "$8.33/mo",
        period: "billed annually",
        limits: "",
      },
    ],
    note: "Browser-verified 2026-10-14. Monthly-billed price unpublished. Team price not shown. No derived monthly figure.",
    sourceUrl: "https://quillbot.com/premium",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  platforms: {
    value: ["Chrome", "Edge", "Safari", "Android", "iOS", "Windows", "macOS", "Word"],
    note: "Browser-verified 2026-10-14.",
    sourceUrl: "https://quillbot.com/premium",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/id6463116243",
      android: "https://play.google.com/store/apps/details?id=com.quillbot.mobile",
    },
    note: "Browser-verified 2026-10-14. iOS keyboard listing id6463116243. Safari App Store listing: https://apps.apple.com/us/app/id6738683741. Microsoft Store listing unpublished here (not App Store or Play).",
    sourceUrl: "https://quillbot.com/premium",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "pending",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "Browser-verified: Premium $8.33/mo billed annually. Free paraphrase 100 words / summarize 1,200 words. Direct App Store and Play URLs only.",
    },
  ],
} satisfies ToolFacts;
