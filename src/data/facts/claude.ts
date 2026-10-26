import type { ToolFacts } from "./types";

export default {
  slug: "claude",
  lifecycle: "active",
  features: {
    value: [
      "Auto mode becomes the default for new sessions in most Claude apps on Pro, Max and Team plans: Anthropic's 2026-10-22 update says it rolls out the following week (stated plan, as of 2026-10-26). In auto mode a classifier reviews each action, so safe ones go ahead without an approval prompt and risky ones are blocked. It stays opt-in on Claude Enterprise for now.",
    ],
    sourceUrl: "https://claude.com/resources/articles/auto-mode-default-in-claude-code",
    checkedAt: "2026-10-26",
    gatheredBy: "claude",
    verifiedBy: "claude",
    verifiedAt: "2026-10-26",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-26",
      field: "features",
      summary: "Added the auto-mode default rollout for Claude apps on Pro, Max and Team (Anthropic update dated 2026-10-22).",
    },
  ],
} satisfies ToolFacts;
