import type { ToolFacts } from "./types";

export default {
  slug: "higgsfield",
  lifecycle: "active",
  company: {
    value: "Higgsfield, Inc.",
    note: "© 2026 Higgsfield, Inc.",
    sourceUrl: "https://higgsfield.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Limited use",
    },
    note: "Recheck 2026-11-14: higgsfield.ai/pricing HTML had no plan prices, so this line was not reconfirmed.",
    sourceUrl: "https://higgsfield.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Starter",
        price: "$19",
        period: "month",
        limits: "Annual; page says no difference vs monthly",
      },
      {
        name: "Plus",
        price: "$47",
        period: "month",
        limits: "Annual; from $59 monthly",
      },
      {
        name: "Ultra",
        price: "$99",
        period: "month",
        limits: "Annual; from $129 monthly",
      },
      {
        name: "Teams",
        price: "From $65",
        period: "seat/month",
        limits: "",
      },
    ],
    note: "/pricing is empty to WebFetch and curl, so all plan prices are browser-verified 2026-10-14: Starter $19, Plus $47/$59, Ultra $99/$129, Teams from $65. Recheck 2026-11-14: higgsfield.ai/pricing HTML had no dollar amounts, so these prices were not reconfirmed.",
    sourceUrl: "https://higgsfield.ai/pricing",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  models: {
    value: [
      "Higgsfield Soul family",
      "Genjutsu",
      "Katana",
      "Popcorn",
      "Canvas",
      "Cinema Studio 4.0",
      "Supercomputer agent (powered by GPT-6 Astra, third-party)",
      "Seedance (third-party)",
      "Kling (third-party)",
      "Nano Banana (third-party)",
      "Wan (third-party)",
      "Veo 3.1 (third-party)",
    ],
    note: "Re-read 2026-11-26. The getting-started help article (dateModified 2026-09-14) still names Sora 2. https://higgsfield.ai/blog/5-Best-AI-Video-Models-2026-Tested-Compared says Sora 2 is retired after OpenAI ended the API on 2026-09-24, so Sora 2 is omitted here. The other names were not each re-confirmed on 2026-11-26.",
    sourceUrl: "https://higgsfield.ai/creator-hub/help-center/getting-started/what-is-higgsfield",
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  usageLimits: {
    value: {
      creditsExpire:
        "Subscription credits expire at renewal (monthly: each paid renewal; annual: every 30 days). Credit Pack, Auto-Refill and Boost credits expire 90 days from purchase. Promo credits expire on the date shown when issued.",
      rollover:
        "Subscription credits do not roll over. If you cancel, purchased credits stay available on the free plan until their validity period ends.",
    },
    sourceUrl: "https://higgsfield.ai/creator-hub/help-center/credits-and-usage/how-credits-work",
    checkedAt: "2026-10-17",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-17",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-26",
      field: "models",
      summary:
        "Guide refresh: Sora 2 removed from the models list. The 14 September 2026 help article still names it. A later Higgsfield article says it is retired after the Sora API ended on 2026-09-24.",
    },
    {
      date: "2026-10-14",
      field: "plans",
      summary:
        "RA: all plan prices browser-verified 2026-10-14 (/pricing empty to fetch). Third-party models labeled as such.",
    },
  ],
} satisfies ToolFacts;
