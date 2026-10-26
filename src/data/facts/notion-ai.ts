import type { ToolFacts } from "./types";

const NOTION_PRICING_URL = "https://www.notion.com/pricing";

export default {
  slug: "notion-ai",
  lifecycle: "active",
  company: {
    value: "Notion Labs, Inc.",
    note: "Copyright line on notion.com/pricing (as of 2026-10-26).",
    sourceUrl: NOTION_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  freeTier: {
    value: {
      available: true,
      summary:
        "Free for individuals: a trial of Notion AI, unlimited pages and blocks for one person (limited for 2+ members), file uploads up to 5 MB, 7 days of page history and up to 10 guests.",
    },
    sourceUrl: NOTION_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "seat/month", limits: "Trial of Notion AI" },
      { name: "Plus", price: "$10", period: "seat/month", limits: "Trial of Notion AI" },
      {
        name: "Business",
        price: "$20",
        period: "seat/month",
        limits: "Notion Agent and AI Meeting Notes included; 1,500 Standard and 500 Select Notion credits per seat a month",
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        period: "",
        limits: "Zero data retention with Notion's LLM providers",
      },
    ],
    note: "USD, as of 2026-10-26. Prices are as the page renders them with its default \"Pay yearly\" toggle selected (\"Save up to 20% with yearly\"). The pay-monthly prices are not in the page's rendered text, so they are not recorded here.",
    sourceUrl: NOTION_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  features: {
    value: [
      "Notion AI runs on Notion credits: Free and Plus get a limited trial, and Business includes 1,500 Standard credits (Notion Agent on Auto, AI Meeting Notes, Database Autofill) and 500 Select credits (work where you pick the model, plus Custom Agents you own) per seat a month, per the plan comparison (as of 2026-10-26).",
      "Admins can buy extra Notion credits to cover additional AI usage, per the pricing page (as of 2026-10-26).",
      "Notion's pricing FAQ says Notion AI will not use your data to train its models unless you opt in, and that AI subprocessors are contractually barred from training on customer data.",
    ],
    sourceUrl: NOTION_PRICING_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary: "New fact file: Free, Plus, Business and Enterprise from notion.com/pricing, with each plan's Notion AI access and monthly Notion credits.",
    },
  ],
} satisfies ToolFacts;
