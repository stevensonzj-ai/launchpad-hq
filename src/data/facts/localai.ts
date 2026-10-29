import type { ToolFacts } from "./types";

/**
 * LocalAI: first fact file, stale-facts batch 1 (catalog audit 17),
 * 2026-10-29. Free MIT software with no paid plans, read twice on localai.io
 * and the mudler/LocalAI repository.
 */
export default {
  slug: "localai",
  lifecycle: "active",
  company: {
    value: "Open source (created by Ettore Di Giacinto, maintained by the LocalAI team)",
    note: "README: \"MIT - Author Ettore Di Giacinto\"; \"Created by Ettore Di Giacinto and maintained by the LocalAI team\". No company.",
    sourceUrl: "https://github.com/mudler/LocalAI",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  freeTier: {
    value: {
      available: true,
      summary: "Free and open source (MIT). No paid plans; you run it on your own hardware, and a GPU is optional.",
    },
    note: "localai.io: \"Open source · MIT\"; \"Every feature ships a CPU path first\"; \"A GPU makes it faster but is not required.\" Sponsorship links only.",
    sourceUrl: "https://localai.io/",
    sourceKind: "product-page",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    verifiedBy: "claude-recheck",
    verifiedAt: "2026-10-29",
    status: "verified",
  },
  features: {
    value: [
      "OpenAI-, Anthropic-, Ollama- and ElevenLabs-compatible APIs on your own machine.",
      "Swappable engines, including llama.cpp, vLLM, SGLang and MLX.",
      "Text, voice, vision, image, video and transcription models.",
      "A built-in agent with MCP, plugins and skills.",
    ],
    sourceUrl: "https://github.com/mudler/LocalAI",
    checkedAt: "2026-10-29",
    gatheredBy: "research-analyst",
    status: "unverified",
  },
  changelog: [
    {
      date: "2026-10-29",
      field: "freeTier",
      summary:
        "First fact file: free and MIT-licensed, no paid plans (matches the catalog).",
    },
  ],
} satisfies ToolFacts;
