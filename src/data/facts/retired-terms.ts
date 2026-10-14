export const RETIRED_TERMS: { id: string; pattern: RegExp; example: string }[] = [
  { id: "gpt-4o-mini", pattern: /gpt-4o\s*mini/i, example: "GPT-4o mini" },
  { id: "gpt-4o", pattern: /gpt-4o\b/i, example: "GPT-4o" },
  { id: "gpt-4", pattern: /gpt-4\b/i, example: "GPT-4" },
  { id: "gpt-3.5", pattern: /gpt-3\.5\b/i, example: "GPT-3.5" },
  { id: "claude-2", pattern: /claude\s*2\b/i, example: "Claude 2" },
  { id: "claude-3", pattern: /claude\s*3\b/i, example: "Claude 3" },
  { id: "bard", pattern: /\bbard\b/i, example: "Bard" },
  { id: "gemini-1", pattern: /gemini\s+1(\.\d+)?\b/i, example: "Gemini 1.x" },
  { id: "x-premium-plus", pattern: /x\s*premium\s*\+/i, example: "X Premium+" },
];
