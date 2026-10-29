import type { ToolFacts } from "./types";

/**
 * Gemini Enterprise Agent Platform, formerly Vertex AI. Google's release
 * notes for 2026-04-22 say "Vertex AI is now part of Gemini Enterprise Agent
 * Platform"; cloud.google.com/vertex-ai now redirects to the product page.
 * Slug moved from google-vertex-ai (301 in src/lib/catalog-redirects.ts; DB
 * row renamed by scripts/update-catalog-audit-15.ts). Guide PR D, 2026-10-29.
 */
export default {
  slug: "gemini-enterprise-agent-platform",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Google renamed Vertex AI to Gemini Enterprise Agent Platform on April 22, 2026, according to its release notes.",
      formerName: "Vertex AI",
      whatToDo: "Nothing to do. Old Vertex AI links redirect to the new product page, and Google publishes a table mapping each old feature name to its new one.",
      additionalSources: ["https://docs.cloud.google.com/gemini-enterprise-agent-platform/vertex-ai-name-changes"],
    },
    sourceUrl: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes",
    checkedAt: "2026-10-29",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  displayName: {
    value: "Gemini Enterprise Agent Platform",
    sourceUrl: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/vertex-ai-name-changes",
    checkedAt: "2026-10-29",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  officialUrl: {
    value: "https://cloud.google.com/products/gemini-enterprise-agent-platform",
    sourceUrl: "https://cloud.google.com/products/gemini-enterprise-agent-platform",
    checkedAt: "2026-10-29",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "displayName",
      summary: "Vertex AI renamed Gemini Enterprise Agent Platform. Slug moved from google-vertex-ai to gemini-enterprise-agent-platform.",
    },
  ],
} satisfies ToolFacts;
