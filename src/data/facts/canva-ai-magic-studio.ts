import type { ToolFacts } from "./types";

// https://www.canva.com/magic/ redirects here; Canva now brands the AI suite "Canva AI".
const CANVA_AI_URL = "https://www.canva.com/canva-ai/";
const CANVA_AI_PASS_URL = "https://www.canva.com/help/ai-pass/";

/**
 * canva.com/pricing renders its plan cards in JavaScript and other plan pages
 * returned 403 on 2026-10-26, so no Canva plan prices are recorded here.
 */
export default {
  slug: "canva-ai-magic-studio",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary:
        "Canva AI is available to everyone: a range of AI tools works on Canva's Free plan, and paid plans add more usage and more advanced features. The page does not state free usage limits.",
    },
    sourceUrl: CANVA_AI_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  features: {
    value: [
      "AI Pass is an optional monthly add-on for Canva Pro, Teams, Business and Nonprofits plans, priced at USD $100 per person per month (as of 2026-10-26).",
      "AI Pass gives Canva Pro, Teams and Nonprofits subscribers 40x more AI, and Canva Business subscribers 20x more AI.",
      "AI Pass is not available on Canva Free, Education or Enterprise, on free trials or prepaid plans, or on subscriptions managed through the Apple App Store or Google Play.",
    ],
    sourceUrl: CANVA_AI_PASS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "freeTier",
      summary: "First fact file: Canva AI free-plan availability (canva.com/canva-ai) and the AI Pass add-on (Canva Help Center). Plan prices not captured: the pricing page is JavaScript-rendered.",
    },
  ],
} satisfies ToolFacts;
