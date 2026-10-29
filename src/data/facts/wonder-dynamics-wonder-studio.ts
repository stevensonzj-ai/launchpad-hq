import type { ToolFacts } from "./types";

/**
 * Wonder Studio: now Autodesk Flow Studio (Autodesk product page says formerly Wonder Studio).
 * Catalog accuracy cleanup, 2026-10-20 (docs/planning/2026-10-autonomous-business/
 * claude-handoffs/2026-10-20-catalog-cleanup-brief.md). Sources re-fetched that day.
 */
export default {
  slug: "wonder-dynamics-wonder-studio",
  lifecycle: "renamed",
  status: {
    value: {
      headline: "Autodesk now sells Wonder Studio as Autodesk Flow Studio. Autodesk's product page describes Flow Studio as formerly Wonder Studio.",
      formerName: "Wonder Studio",
      whatToDo: "Use the Autodesk Flow Studio site to sign in. Our getting-started guide still uses the Wonder Studio name in places.",
    },
    sourceUrl: "https://www.autodesk.com/products/flow-studio/overview",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  displayName: {
    value: "Autodesk Flow Studio",
    sourceUrl: "https://www.autodesk.com/products/flow-studio/overview",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  company: {
    value: "Autodesk",
    sourceUrl: "https://www.autodesk.com/products/flow-studio/overview",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  officialUrl: {
    value: "https://www.autodesk.com/products/flow-studio/overview",
    sourceUrl: "https://www.autodesk.com/products/flow-studio/overview",
    checkedAt: "2026-10-20",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-20",
    status: "verified",
  },
  features: {
    value: [
      "August 2026: added a Canvas for chaining image, video, audio and text generation steps, and a 3D Editor for laying out scenes.",
      "The Canvas calls third-party models, including Kling, MiniMax, Seedance and Veo video models, ElevenLabs voice models, and Claude, Gemini and GPT text models.",
      "August 2026: introduced \"more granular pricing controls per model and configuration.\"",
      "September 2026: 3D assets can be exported to Autodesk Fusion; Text, Audio and Panorama nodes added to the Canvas.",
    ],
    sourceUrl: "https://help.wonderdynamics.com/release-notes/",
    checkedAt: "2026-10-29",
    gatheredBy: "claude-subagent",
    verifiedBy: "claude",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "features",
      summary: "Added Canvas, 3D Editor and third-party model support from the official release notes.",
    },
    {
      date: "2026-10-20",
      field: "displayName",
      summary: "Wonder Studio is now Autodesk Flow Studio; official link updated.",
    },
  ],
} satisfies ToolFacts;
