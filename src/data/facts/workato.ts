import type { ToolFacts } from "./types";

/**
 * Workato: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on workato.com/pricing. All editions are
 * quote-only, now organised around MCP and agents. A free-trial sign-up
 * exists; its length is not stated. Cost tier stays ENTERPRISE.
 */
export default {
  slug: "workato",
  lifecycle: "active",
  company: {
    value: "Workato",
    sourceUrl: "https://www.workato.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: false,
      summary: "No free plan. A \"Start for free\" trial sign-up is offered; its length is not stated.",
    },
    sourceUrl: "https://www.workato.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  plans: {
    value: [
      {
        name: "Standard",
        price: "Get a quote",
        period: "",
        limits: "1 Standard Workbot, 1 concurrency",
      },
      {
        name: "Business MCP",
        price: "Get a quote",
        period: "",
        limits: "Pre-built MCP servers, AI/MCP Gateway, API platform; 10 Enterprise Workbots, 3 on-prem agents",
      },
      {
        name: "Enterprise MCP",
        price: "Get a quote",
        period: "",
        limits: "Data pipelines, event streams; unlimited Enterprise Workbots, 10 on-prem agents, 15 concurrency",
      },
      {
        name: "Workato ONE",
        price: "Get a quote",
        period: "",
        limits: "Agent Studio, knowledge base, Workato GO; 30 on-prem agents, 30 concurrency",
      },
    ],
    note: "No prices published, as of 2026-10-29. Edition fee plus a usage component tracked by capability (workflows, API management, event streams).",
    sourceUrl: "https://www.workato.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Editions are restructured around MCP and agents: Standard, Business MCP, Enterprise MCP and Workato ONE.",
    ],
    sourceUrl: "https://www.workato.com/pricing",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "plans",
      summary: "First fact file: four quote-only editions (Standard, Business MCP, Enterprise MCP, Workato ONE). Replaces \"based on recipes, connectors, and task volume\".",
    },
  ],
} satisfies ToolFacts;
