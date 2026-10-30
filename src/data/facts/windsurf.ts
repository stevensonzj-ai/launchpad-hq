import type { ToolFacts } from "./types";

/**
 * Windsurf: renamed Devin Desktop by Cognition (blog post dated 2026-06-02). windsurf.com redirects to devin.ai/desktop.
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "windsurf",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Cognition renamed Windsurf to Devin Desktop in June 2026. Existing users get the change as a routine update, and Cognition says plans, pricing and extensions stay the same.",
      formerName: "Windsurf",
      whatToDo: "Nothing to do. Our getting-started guide still uses the Windsurf name in places.",
    },
    sourceUrl: "https://devin.ai/blog/windsurf-is-now-devin-desktop",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  displayName: {
    value: "Devin Desktop",
    sourceUrl: "https://devin.ai/blog/windsurf-is-now-devin-desktop",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  officialUrl: {
    value: "https://devin.ai/desktop",
    sourceUrl: "https://devin.ai/blog/windsurf-is-now-devin-desktop",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  plans: {
    value: [
      { name: "Free", price: "$0", period: "month", limits: "Light agent quota; unlimited inline edits and Tab completions" },
      { name: "Pro", price: "$20", period: "month", limits: "" },
      { name: "Max", price: "$200", period: "month", limits: "" },
      { name: "Teams", price: "$80", period: "month", limits: "Team plan, plus $40/month per full seat" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ],
    note: "USD. windsurf.com/pricing redirects to devin.ai/pricing (Windsurf is now Devin Desktop). As of 2026-10-30.",
    sourceUrl: "https://devin.ai/pricing",
    sourceKind: "plans-page",
    checkedAt: "2026-10-30",
    gatheredBy: "claude-sonnet",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-30",
    status: "verified",
  },
  changelog: [
    { date: "2026-10-30", field: "plans", summary: "Source-verification batch (audit 25): plans read on https://devin.ai/pricing and price facts added with source and date." },
    {
      date: "2026-10-20",
      field: "displayName",
      summary: "Windsurf renamed Devin Desktop; official link now devin.ai/desktop.",
    },
  ],
} satisfies ToolFacts;
