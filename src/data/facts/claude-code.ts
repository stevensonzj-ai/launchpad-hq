import type { ToolFacts } from "./types";

export default {
  slug: "claude-code",
  lifecycle: "active",
  features: {
    value: [
      "Auto mode is the default for new Claude Code sessions on Pro, Max and Team plans. Anthropic announced the switch on 2026-08-07 for new sessions starting 2026-08-14. A classifier reviews each tool call: safe actions go ahead, risky ones (irreversible, destructive or aimed outside your environment) are blocked. Shift+Tab in the CLI, or the mode menu in the desktop app, switches modes.",
      "Auto mode stays opt-in for Claude Enterprise, the Claude API and cloud platforms for now (as of 2026-10-26).",
    ],
    sourceUrl: "https://claude.com/resources/articles/auto-mode-default-in-claude-code",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "features",
      summary: "Added the auto-mode default (new sessions on Pro, Max and Team from 2026-08-14) from Anthropic's article.",
    },
  ],
} satisfies ToolFacts;
