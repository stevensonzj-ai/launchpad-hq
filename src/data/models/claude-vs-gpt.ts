/**
 * /models/compare/claude-vs-gpt: which versions sit side by side. Shared by
 * the page and /data/v1/models/compare/claude-vs-gpt.json.
 */
export const CLAUDE_VS_GPT_PATH = "/models/compare/claude-vs-gpt";

export const CLAUDE_VS_GPT = {
  slug: "claude-vs-gpt",
  title: "Claude vs GPT models",
  description:
    "Flagship and budget Claude and GPT versions, from official Anthropic and OpenAI docs. Consumer plans are not the same as API list prices.",
  families: { claude: "claude", gpt: "gpt" },
  rows: [
    { label: "Flagship (API default / hardest work)", claudeId: "claude-opus-5-5", gptId: "gpt-6-astra" },
    { label: "Budget (cheap, fast, high volume)", claudeId: "claude-haiku-5-5", gptId: "gpt-6-luna" },
  ],
} as const;
