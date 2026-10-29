import type { ToolFacts } from "./types";

/**
 * Semantic Scholar: first fact file, stale-facts batch 2 (catalog audit 18),
 * 2026-10-29. Read twice on semanticscholar.org. Free, built by Ai2. The row
 * had the API limits backwards: unauthenticated calls share a 1,000
 * requests-per-second pool across all users; an API key starts at 1 request
 * per second. Privacy policy not read.
 */
export default {
  slug: "semantic-scholar",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.semanticscholar.org",
    sourceUrl: "https://www.semanticscholar.org/product/api",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  company: {
    value: "Ai2 (Allen Institute for AI)",
    note: "\"a Research and Product Development team within Ai2\"; the API page: \"Proudly built by Ai2\".",
    sourceUrl: "https://www.semanticscholar.org/about",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free research tool. Most API endpoints need no key, sharing a pool of 1,000 requests per second across all unauthenticated users; an API key starts at 1 request per second on all endpoints.",
    },
    sourceUrl: "https://www.semanticscholar.org/product/api",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary: "First fact file: free; API limits corrected (shared 1,000 req/s unauthenticated pool; keys start at 1 req/s).",
    },
  ],
} satisfies ToolFacts;
