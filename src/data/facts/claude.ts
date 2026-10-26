import type { ToolFacts } from "./types";

export default {
  slug: "claude",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary:
        "Chat on web, desktop and mobile; search the web, create files and run code; memory across conversations; connect apps and tools; Artifacts; Claude Design, Slides and Docs; up to 5 Projects.",
    },
    note: "Usage limits reset on a rolling five-hour window, per the pricing FAQ (as of 2026-10-26).",
    sourceUrl: "https://claude.com/pricing",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "" },
      {
        name: "Pro",
        price: "$17",
        period: "month",
        limits: "With annual subscription ($200 billed up front); $20 if billed monthly",
      },
      {
        name: "Max",
        price: "From $100",
        period: "month",
        limits: "Choose 5x or 20x more usage than Pro; billed monthly",
      },
      {
        name: "Team Standard seat",
        price: "$20",
        period: "seat/month",
        limits: "Billed annually; $25 if billed monthly. Teams of 2 to 150",
      },
      {
        name: "Team Premium seat",
        price: "$100",
        period: "seat/month",
        limits: "Billed annually; $125 if billed monthly. 5x more usage than standard seats",
      },
      {
        name: "Enterprise",
        price: "$20",
        period: "seat/month",
        limits: "Billed annually, 20 seat minimum, plus usage at API rates",
      },
    ],
    note: "USD, as of 2026-10-26. Prices exclude applicable tax, per the page.",
    sourceUrl: "https://claude.com/pricing",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    status: "unverified",
  },
  features: {
    value: [
      "Auto mode becomes the default for new sessions in most Claude apps on Pro, Max and Team plans: Anthropic's 2026-10-22 update says it rolls out the following week (stated plan, as of 2026-10-26). In auto mode a classifier reviews each action, so safe ones go ahead without an approval prompt and risky ones are blocked. It stays opt-in on Claude Enterprise for now.",
    ],
    sourceUrl: "https://claude.com/resources/articles/auto-mode-default-in-claude-code",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary: "Added the Free plan's contents and official plan prices (Pro, Max, Team seats, Enterprise) from claude.com/pricing.",
    },
    {
      date: "2026-10-26",
      field: "features",
      summary: "Added the auto-mode default rollout for Claude apps on Pro, Max and Team (Anthropic update dated 2026-10-22).",
    },
  ],
} satisfies ToolFacts;
