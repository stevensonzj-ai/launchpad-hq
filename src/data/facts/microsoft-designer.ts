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
  ],
} satisfies ToolFacts;
