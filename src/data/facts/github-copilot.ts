import type { ToolFacts } from "./types";

const COPILOT_IDE_INSTALL_URL =
  "https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/set-up-copilot/install-copilot-extension";
const COPILOT_PLANS_URL = "https://github.com/features/copilot/plans";

/**
 * GitHub Copilot: where it runs, checked by the RA on GitHub Docs on
 * 2026-10-26 (mcp-stress-factcheck-2026-10-26.md, follow-up 4b). Individual
 * plan prices and AI Credits owner-checked on the plans page on 2026-10-26.
 * Each paid plan's "Total GitHub AI Credits" a month = base credits (equal to
 * the plan price) + a flex allotment that GitHub says may change over time.
 * Business and Enterprise were not checked, so they are not listed.
 */
export default {
  slug: "github-copilot",
  lifecycle: "active",
  freeTier: {
    value: {
      available: true,
      summary: "Free plan, $0: limited chat and agent usage and 2,000 inline suggestions a month.",
    },
    sourceUrl: COPILOT_PLANS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "owner",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "", limits: "Limited chat and agent usage; 2,000 inline suggestions a month" },
      {
        name: "Pro",
        price: "$10",
        period: "month",
        limits: "$15 total AI credits/month ($10 base + $5 flex; flex may change over time)",
      },
      {
        name: "Pro+",
        price: "$39",
        period: "month",
        limits: "$70 total AI credits/month ($39 base + $31 flex; flex may change over time)",
      },
      {
        name: "Max",
        price: "$100",
        period: "month",
        limits: "$200 total AI credits/month ($100 base + a flex allotment GitHub does not itemize; flex may change over time)",
      },
    ],
    note: "Individual plans, USD, as of 2026-10-26. 1 AI credit = $0.01. On paid plans, code completions and next-edit suggestions do not use AI credits. Business and Enterprise were not checked in this pass.",
    sourceUrl: COPILOT_PLANS_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "owner",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  platforms: {
    value: ["Visual Studio Code", "Visual Studio", "JetBrains IDEs", "Eclipse", "Xcode", "Vim/Neovim", "Azure Data Studio"],
    note: "GitHub Docs \"Installing the GitHub Copilot extension in your environment\" has setup tabs for each of these editors (as of 2026-10-26).",
    sourceUrl: COPILOT_IDE_INSTALL_URL,
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "ra",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "plans",
      summary:
        "Owner check of the plans page: Free $0, Pro $10, Pro+ $39, Max $100 a month. Total AI credits a month are $15 / $70 / $200, each the plan price in base credits plus a flex allotment ($5 / $31 / not itemized) that may change.",
    },
    {
      date: "2026-10-26",
      field: "platforms",
      summary: "First fact file: Copilot's editor extensions (VS Code, Visual Studio, JetBrains IDEs, Eclipse, Xcode, Vim/Neovim, Azure Data Studio).",
    },
  ],
} satisfies ToolFacts;
