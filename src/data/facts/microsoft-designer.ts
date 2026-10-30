import type { ToolFacts } from "./types";

/**
 * Microsoft Designer: first fact file, stale-facts batch 2 (catalog audit
 * 18), 2026-10-29. Read twice on Microsoft Support. Designer's AI use is now
 * metered by monthly AI credits shared across Microsoft 365 and Windows
 * apps, not the row's daily boosts. Microsoft 365 plans get more
 * image-generation usage. The free allowance was not on any page either
 * reader could open (microsoft.com/microsoft-365/microsoft-designer blocked
 * automated requests), so no freeTier fact is recorded (Browser-check list).
 * The row moves from FREE to FREEMIUM.
 *
 * The Research Analyst's browser check the same day (the Designer page on
 * microsoft.com, marked PARTIAL) confirmed Designer is still free "with
 * monthly credits", 1 credit per AI interaction, refreshed monthly, and that
 * boosts are gone. The free credit count is not stated, and the page does
 * not say a Microsoft account is required. Personal, Family or Premium give
 * "up to 4X more credits". Catalog audit 19 applies this to the row.
 */
export default {
  slug: "microsoft-designer",
  lifecycle: "active",
  company: {
    value: "Microsoft",
    sourceUrl: "https://designer.microsoft.com/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free, with a fresh set of AI credits at the start of each month; each AI action uses 1 credit. The number of free credits is not stated.",
    },
    note: "Browser check, 2026-10-29: \"Create with Designer for free\", \"with monthly credits\"; \"You will receive a fresh set of credits at the start of each month, and 1 credit will be deducted … each time you interact with Copilot … or Designer's AI features.\" Boosts are gone: \"every image is now automatically boosted.\" Microsoft 365 Personal, Family or Premium give \"up to 4X more credits\" (Personal $9.99/mo).",
    sourceUrl: "https://www.microsoft.com/en-us/microsoft-365/microsoft-designer",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "AI use in Designer counts against monthly AI credits shared across Microsoft 365 and Windows apps (Copilot, Designer, Photos, Paint, Notepad, Word, Excel).",
      "Microsoft 365 Personal and Family get \"Standard usage\" for image generation; Microsoft 365 Premium and Pro get \"Extensive usage\".",
    ],
    note: "Article last updated October 2026. Usage is given as levels, not numbers.",
    sourceUrl: "https://support.microsoft.com/en-us/office/understanding-ai-credits-68530f1a-4459-4d02-9818-8233c1f673b8",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "features",
      summary: "First fact file: AI use metered by monthly Microsoft 365 AI credits; more usage on Microsoft 365 plans. Replaces \"15 boosts/day\".",
    },
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "Browser check: still free with monthly credits (1 per AI action; count not stated); paid Microsoft 365 plans up to 4x more; boosts gone.",
    },
  ],
} satisfies ToolFacts;
