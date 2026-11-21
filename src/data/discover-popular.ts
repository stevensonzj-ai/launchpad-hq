/**
 * Discover's "Popular" order: these tools first, in this order; every other
 * tool follows by name (src/lib/discover-filters.ts, sortDiscoverCatalog).
 *
 * Editorial order approved by Zach 2026-11-12, to be replaced by
 * outbound-click data. Not a sponsor surface: nothing here may be bought,
 * and no affiliate slug (src/data/affiliates.ts) belongs in it.
 */
export const DISCOVER_POPULAR_SLUGS: readonly string[] = [
  "chatgpt",
  "claude",
  "gemini",
  "microsoft-copilot",
  "perplexity-ai",
  "gemini-notebook",
  "canva-ai-magic-studio",
  "grammarly",
  "meta-ai",
  "grok",
  "midjourney",
  "adobe-firefly",
  "capcut",
  "elevenlabs",
  "suno",
  "notion-ai",
  "zapier",
  "otter-ai",
  "gamma",
  "cursor",
  "github-copilot",
  "lovable",
  "replit-agent",
  "runway",
  "heygen",
  "deepl",
  "quillbot",
  "duolingo-max",
  "khan-academy-khanmigo",
  "ollama",
];
