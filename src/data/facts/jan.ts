import type { ToolFacts } from "./types";

/**
 * Jan: first fact file, stale-facts batch 1 (catalog audit 17), 2026-10-29.
 * Free Apache 2.0 desktop app from Menlo Research, read twice on jan.ai and
 * the janhq/jan repository. jan.ai has no pricing page (/pricing is a 404).
 */
export default {
  slug: "jan",
  lifecycle: "active",
  company: {
    value: "Menlo Research",
    note: "jan.ai: \"Built with ♡ by Menlo Research.\"",
    sourceUrl: "https://jan.ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free and open source (Apache 2.0). Runs models on your own computer; cloud providers can be connected with your own keys.",
    },
    note: "jan.ai: \"Free & Open source\". Repository licence: Apache 2.0.",
    sourceUrl: "https://jan.ai/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  privacy: {
    value: { policyUrl: "https://jan.ai/privacy" },
    note: "\"Your data (e.g., conversation history, usage logs) are stored locally and never leave your computer.\" With remote APIs, the provider's policy applies. Read once.",
    sourceUrl: "https://jan.ai/privacy",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "company",
      summary:
        "First fact file: free Apache 2.0 app; maker is Menlo Research (the catalog said \"Open Source (Apache 2.0)\").",
    },
  ],
} satisfies ToolFacts;
