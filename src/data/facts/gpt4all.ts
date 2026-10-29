import type { ToolFacts } from "./types";

/**
 * GPT4All: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Free MIT desktop app from Nomic, read twice. gpt4all.io
 * redirects to nomic.ai/gpt4all. Development has slowed: the newest
 * release is v3.10.0 (2025-02-25) and the last commit 2025-05-27, about 17
 * months ago, close to the 18-month inactivity bar in CLAUDE.md.
 */
export default {
  slug: "gpt4all",
  lifecycle: "active",
  officialUrl: {
    value: "https://www.nomic.ai/gpt4all",
    note: "gpt4all.io redirects here.",
    sourceUrl: "https://www.nomic.ai/gpt4all",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  company: {
    value: "Nomic AI",
    sourceUrl: "https://www.nomic.ai/gpt4all",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Open source under the MIT licence. Runs on your own computer, with no cloud required.",
    },
    note: "Repository licence: MIT. nomic.ai/gpt4all: \"no data leaves your machine\"; \"right on your device—no cloud required\". Nomic's separate paid plans are a different product.",
    sourceUrl: "https://github.com/nomic-ai/gpt4all",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "Local chat on Windows (x64 and ARM), macOS and Ubuntu.",
      "LocalDocs: chat with a folder of your own files.",
      "Newest release v3.10.0 (2025-02-25); last commit 2025-05-27.",
    ],
    sourceUrl: "https://github.com/nomic-ai/gpt4all",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "officialUrl",
      summary:
        "First fact file: free MIT app from Nomic; website now nomic.ai/gpt4all; newest release February 2025.",
    },
  ],
} satisfies ToolFacts;
