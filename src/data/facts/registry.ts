import chatgptFacts from "./chatgpt";
import grokFacts from "./grok";
import grokBotFacts from "./grok-bot";
import openaiApiFacts from "./openai-api";
import type { ToolFacts } from "./types";

export const REGISTERED_TOOL_FACTS: Record<string, ToolFacts> = {
  [chatgptFacts.slug]: chatgptFacts,
  [grokFacts.slug]: grokFacts,
  [grokBotFacts.slug]: grokBotFacts,
  [openaiApiFacts.slug]: openaiApiFacts,
};

export function getToolFacts(slug: string): ToolFacts | undefined {
  return REGISTERED_TOOL_FACTS[slug];
}

export function listRegisteredToolFacts(): ToolFacts[] {
  return Object.values(REGISTERED_TOOL_FACTS);
}
