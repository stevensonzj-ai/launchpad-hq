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
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  plans: {
    value: [
      {
        name: "Microsoft 365 Personal",
        price: "$9.99",
        period: "month",
        limits: "Or $99.99/year; 1 person; higher Copilot usage than free",
      },
      {
        name: "Microsoft 365 Family",
        price: "$12.99",
        period: "month",
        limits: "Or $129.99/year; 1 to 6 people, AI for the subscription owner only",
      },
      {
        name: "Microsoft 365 Premium",
        price: "$19.99",
        period: "month",
        limits: "Or $199.99/year; extensive Copilot usage",
      },
      {
        name: "Microsoft 365 Pro",
        price: "$99.99",
        period: "month",
        limits: "Monthly billing only; highest Copilot usage; 5 TB storage",
      },
    ],
    note: "USD, US page, as of 2026-10-26. Personal, Family and Premium show \"Try free for 1 month\".",
    sourceUrl: COPILOT_INDIVIDUALS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  features: {
    value: [
      "Microsoft 365 Premium includes extensive Copilot usage limits for advanced features, image creation and chat, and Microsoft 365 Pro has the highest usage limits.",
      "Microsoft 365 Personal and the plans above it include the Word, Excel, PowerPoint and Outlook desktop apps with Copilot.",
      "The page lists Researcher (find and synthesize information) and Analyst (analyze data) among Copilot's features.",
    ],
    sourceUrl: COPILOT_INDIVIDUALS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary: "First fact file: Microsoft 365 Personal, Family, Premium and Pro prices (Pro $99.99/month, monthly billing only) from Microsoft's Copilot for individuals page.",
    },
  ],
} satisfies ToolFacts;
