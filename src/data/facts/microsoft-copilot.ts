import type { ToolFacts } from "./types";

// https://www.microsoft.com/en-us/microsoft-copilot/for-individuals redirects here.
const COPILOT_INDIVIDUALS_URL = "https://www.microsoft.com/en-us/copilot/solutions/individuals";

export default {
  slug: "microsoft-copilot",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary:
        "Copilot has a free tier: the paid Microsoft 365 plans are described as giving higher Copilot usage than free. The page does not list the free limits.",
    },
    sourceUrl: COPILOT_INDIVIDUALS_URL,
    sourceKind: "plans-page",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Microsoft 365 Personal",
        price: "$9.99",
        period: "month",
        limits: "Or $99.99/year; 1 person; 60 AI credits a month for Copilot in Microsoft 365 apps and image creation; Voice 30 min/day, Vision 10 min/day",
      },
      {
        name: "Microsoft 365 Family",
        price: "$12.99",
        period: "month",
        limits: "Or $129.99/year; 1 to 6 people; 60 AI credits a month, for the subscription owner only; Voice 30 min/day, Vision 10 min/day",
      },
      {
        name: "Microsoft 365 Premium",
        price: "$19.99",
        period: "month",
        limits: "Or $199.99/year; extensive usage beyond standard credit limits; Agents 25 tasks a month; Researcher and Analyst; Voice 60 min/day, Vision 15 min/day",
      },
      {
        name: "Microsoft 365 Pro",
        price: "$99.99",
        period: "month",
        limits: "Monthly billing only; highest Copilot usage; 5 TB storage",
      },
    ],
    note: "USD, US page, as of 2026-10-26. Personal, Family and Premium show \"Try free for 1 month\". AI credits and daily Voice and Vision limits are from Microsoft Support (https://support.microsoft.com/en-us/Microsoft-365-Copilot/ai-credits-and-limits-for-microsoft-365-subscriptions, last updated July 2026), checked by the RA on 2026-10-26.",
    sourceUrl: COPILOT_INDIVIDUALS_URL,
    sourceKind: "plans-page",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  features: {
    value: [
      "Microsoft 365 Premium includes extensive Copilot usage limits for advanced features, image creation and chat, and Microsoft 365 Pro has the highest usage limits.",
      "Microsoft 365 Personal and the plans above it include the Word, Excel, PowerPoint and Outlook desktop apps with Copilot.",
      "The page lists Researcher (find and synthesize information) and Analyst (analyze data) among Copilot's features.",
      "Copilot Pro is not among the plans for individuals on this page; Microsoft 365 Premium is the plan with extensive Copilot usage (as of 2026-10-26).",
    ],
    sourceUrl: COPILOT_INDIVIDUALS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary: "RA: added AI credits (60 a month on Personal and Family, owner only; extensive on Premium), Premium's Agents and Researcher/Analyst, and daily Voice and Vision limits. Copilot Pro is no longer a listed plan.",
    },
    {
      date: "2026-10-26",
      field: "plans",
      summary: "First fact file: Microsoft 365 Personal, Family, Premium and Pro prices (Pro $99.99/month, monthly billing only) from Microsoft's Copilot for individuals page.",
    },
  ],
} satisfies ToolFacts;
