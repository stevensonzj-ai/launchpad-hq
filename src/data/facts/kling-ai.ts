import type { ToolFacts } from "./types";

export default {
  slug: "kling-ai",
  lifecycle: "active",
  company: {
    value: "kling.ai",
    note: "Footer: © 2024-2026 kling.ai All rights reserved. A legal entity is not named. klingai.com redirects to kling.ai.",
    sourceUrl: "https://kling.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  platforms: {
    value: ["Web", "API"],
    note: "Navigation lists Download (OS list unpublished) and an API. Membership plans, prices, free credits, and store links unpublished (membership page did not render).",
    sourceUrl: "https://kling.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  models: {
    value: ["Kling 4.0 (in-house, video)", "Kling Image 3.0 (in-house)"],
    sourceUrl: "https://kling.ai/",
    checkedAt: "2026-10-14",
    gatheredBy: "research-analyst",
    verifiedBy: "ra",
    verifiedAt: "2026-10-14",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-14",
      field: "models",
      summary: "Kling 4.0 and Kling Image 3.0 only. No membership prices.",
    },
  ],
} satisfies ToolFacts;
