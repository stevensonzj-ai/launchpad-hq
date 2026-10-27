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
      summary: "Paraphrase up to 125 words and summarize up to 1,200 words per input, with the Standard and Fluency paraphrasing modes and a limited number of AI Chat queries a day.",
    },
    note: "Help Center, as of 2026-10-26 (article updated 2026-10-14). The summarizer FAQ (https://help.quillbot.com/hc/en-us/articles/35700052994071) also gives 1,200 words per input on Free and 6,000 on Premium; an older 600-word table is no longer in the article.",
    sourceUrl: "https://help.quillbot.com/hc/en-us/articles/360058341753-What-s-the-difference-between-a-free-and-a-premium-account",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
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
    note: "Browser-verified 2026-10-14. On 2026-10-26 the RA could not confirm it on a vendor page that renders prices to a fetch: quillbot.com/premium is bot-protected, and the Help Center says the price depends on your region without giving figures. Monthly-billed price unpublished. No derived monthly figure.",
    sourceUrl: "https://quillbot.com/premium",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    status: "unverified",
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
      date: "2026-10-26",
      field: "freeTier",
      summary: "RA: free paraphrasing is 125 words (was 100) and summarizing 1,200 words per input (the 600-word conflict is resolved). Premium price marked unverified: it is not confirmed on a non-blog official page today.",
    },
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "RA: company is “QuillBot, a Learneo Inc. business”. iOS canonical App Store URL; id6738683741 as macos. Company, free limits, Premium $8.33/mo billed annually, platforms, and Play URL are browser-verified 2026-10-14.",
    },
  ],
} satisfies ToolFacts;
