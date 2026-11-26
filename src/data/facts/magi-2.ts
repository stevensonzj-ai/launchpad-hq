import type { ToolFacts } from "./types";

const HOME_URL = "https://sand.ai/";
const POST_URL = "https://sand.ai/blog/magi-2/";
const PRICING_URL = "https://platform.sand.ai/docs/model-pricing/";
const BILLING_URL = "https://platform.sand.ai/docs/credits/";

/**
 * MAGI-2 (new catalog row, 2026-11-26).
 * Gathered 2026-11-26 from Sand AI's research post, homepage, model pricing
 * page, and balance-and-billing page.
 *
 * The only stated price is the API rate in `apiPricing`. No consumer plan
 * price was on those pages.
 */
export default {
  slug: "magi-2",
  lifecycle: "active",
  officialUrl: {
    value: HOME_URL,
    note: "sand.ai introduces MAGI-2. magi.sand.ai redirects to sand.ai. A playground page exists at https://platform.sand.ai/app/playground/. The homepage also links to https://vidmuse.ai/en/magi-2, which was not readable on 2026-11-26.",
    sourceUrl: HOME_URL,
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  company: {
    value: "Sand AI",
    note: "The privacy policy at https://sand.ai/privacy-policy/ names SandAI Pte. Limited and stamps Last Updated as April 21st, without a year. A privacy rating was not recorded from that policy.",
    sourceUrl: HOME_URL,
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "The model pricing page does not state a free tier. It lists magi-2 at 1080p for 0.08 USD per second.",
    },
    note: "Model pricing page, read 2026-11-26. No consumer plan price was on that page.",
    sourceUrl: PRICING_URL,
    sourceKind: "plans-page",
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  apiPricing: {
    value:
      "Model magi-2 at 1080p is 0.08 USD per second. The pricing page does not state an end date. It says top-up is not supported for the time being. The balance and billing page describes opening Top up and paying online.",
    note: `Both ${PRICING_URL} and ${BILLING_URL} were read on 2026-11-26. They disagree about top-up.`,
    sourceUrl: PRICING_URL,
    sourceKind: "plans-page",
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  platforms: {
    value: ["Web (sand.ai)", "API (Sand AI Platform, model id magi-2)", "Playground (platform.sand.ai/app/playground/)"],
    note: "The playground page title was readable on 2026-11-26. The page body is a client shell, so what the playground can generate was not confirmed from the HTML.",
    sourceUrl: "https://platform.sand.ai/app/playground/",
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  features: {
    value: [
      "Video model. The November 24, 2026 research post says 480 billion total parameters and about 28 billion active parameters. The scaling section also says 28 billion active.",
      "The post says MAGI-2 generates up to 30 seconds of 1080p, 25 fps video with native audio.",
      "The post says open-source releases will follow. That is a promise, not a release.",
      "The model pricing page lists magi-2 at 1080p for 0.08 USD per second, states no end date and no free tier, and says top-up is not supported for the time being. The balance and billing page describes opening Top up and paying online.",
    ],
    note: "Research post, homepage, pricing page, and balance-and-billing page, all read 2026-11-26.",
    sourceUrl: POST_URL,
    sourceKind: "announcement",
    checkedAt: "2026-11-26",
    gatheredBy: "cursor",
    verifiedBy: "cursor-recheck",
    verifiedAt: "2026-11-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-11-26",
      field: "apiPricing",
      summary:
        "First fact file (new catalog row). API rate 0.08 USD per second at 1080p. No free tier stated. Open-sourcing is promised, not done. The pricing page says top-up is not supported yet, and the billing page describes a top-up flow.",
    },
  ],
} satisfies ToolFacts;
