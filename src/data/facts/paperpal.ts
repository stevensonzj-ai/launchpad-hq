import type { ToolFacts } from "./types";

/**
 * Paperpal: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. The pricing page fills in prices in the browser. One reader
 * read the plan limits from the page's embedded data (Free: 200 grammar
 * edits a month, 5 a day of paraphrase and other tools, chat with 5 files a
 * month; paid Prime and Pro, billed monthly or annually); the second reader
 * could not render the page. So no free-tier or plan facts are recorded
 * and the row's pricing text is left as it is. On the Browser-check list.
 */
export default {
  slug: "paperpal",
  lifecycle: "active",
  privacy: {
    value: { trainsOnData: false },
    note: "paperpal.com/llms-full.txt: \"never storing or using your work to train its AI models\" (read once; the privacy-policy URL tried returned 404).",
    sourceUrl: "https://paperpal.com/llms-full.txt",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "privacy",
      summary:
        "First fact file: privacy note only (unverified); free-plan limits and Prime / Pro prices need a browser check.",
    },
  ],
} satisfies ToolFacts;
