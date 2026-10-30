import type { ToolFacts } from "./types";

/**
 * Bloomberg GPT / Terminal AI: first fact file, stale-facts batch 3 (catalog audit 19),
 * 2026-10-29. Read twice, blind, on the vendor's own pages.
 * Every www.bloomberg.com page returned 403 to both readers. One reader
 * read professional.bloomberg.com, which shows the AI features under the
 * name "Bloomberg AI" (ASKB, AI summaries) and no Terminal price; the
 * other could not read any Bloomberg page. Everything below is therefore
 * unverified and the row is left as it is (Browser-check list).
 */
export default {
  slug: "bloomberg-gpt-terminal-ai",
  lifecycle: "active",
  company: {
    value: "Bloomberg Finance L.P.",
    note: "Footer: \"2026 Bloomberg Finance L.P.\" (one reader).",
    sourceUrl: "https://professional.bloomberg.com/products/bloomberg-terminal/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  features: {
    value: [
      "The Terminal's AI features are marketed as \"Bloomberg AI\", including ASKB, a conversational interface, and AI summaries of news and company documents.",
      "No Terminal price is published on the product page; it offers a demo request.",
    ],
    note: "One reader only; the second reader got 403 on every Bloomberg page.",
    sourceUrl: "https://professional.bloomberg.com/products/bloomberg-terminal/ai/",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "features",
      summary: "First fact file: Bloomberg's pages blocked automated reads; AI features (Bloomberg AI, ASKB) seen by one reader only.",
    },
  ],
} satisfies ToolFacts;
