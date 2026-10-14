import type { ToolFacts } from "./types";

export default {
  slug: "quillbot",
  lifecycle: "active",
  company: {
    value: "QuillBot, a Learneo Inc. business",
    note: "Browser-verified 2026-10-14 on quillbot.com/premium. App Store seller string is exactly “QuillBot, a Learneo Inc. business” (no comma after Learneo).",
    sourceUrl: "https://quillbot.com/premium",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
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
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
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
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Chrome", "Edge", "Safari", "Android", "iOS", "Windows", "macOS", "Word"],
    note: "Browser-verified 2026-10-14.",
    sourceUrl: "https://quillbot.com/premium",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  apps: {
    value: {
      ios: "https://apps.apple.com/us/app/quillbot-ai-writing-keyboard/id6463116243",
      macos: "https://apps.apple.com/us/app/id6738683741",
      android: "https://play.google.com/store/apps/details?id=com.quillbot.mobile",
    },
    note: "iOS is the main iPhone app (id6463116243). id6738683741 is Mac-only (macos). Play URL browser-verified 2026-10-14.",
    sourceUrl: "https://quillbot.com/premium",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "RA: company is “QuillBot, a Learneo Inc. business”. iOS canonical App Store URL; id6738683741 as macos. Company, free limits, Premium $8.33/mo billed annually, platforms, and Play URL are browser-verified 2026-10-14.",
    },
  ],
} satisfies ToolFacts;
