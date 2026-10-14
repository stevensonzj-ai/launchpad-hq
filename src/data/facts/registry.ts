import apolloIoFacts from "./apollo-io";
import capcutFacts from "./capcut";
import chatgptFacts from "./chatgpt";
import deepseekFacts from "./deepseek";
import freepikAiFacts from "./freepik-ai";
import grokFacts from "./grok";
import grokBotFacts from "./grok-bot";
import openaiApiFacts from "./openai-api";
import qwenFacts from "./qwen";
import vapiFacts from "./vapi";
import warpFacts from "./warp";
import type { ToolFacts } from "./types";

export const REGISTERED_TOOL_FACTS: Record<string, ToolFacts> = {
  [apolloIoFacts.slug]: apolloIoFacts,
  [capcutFacts.slug]: capcutFacts,
  [chatgptFacts.slug]: chatgptFacts,
  [deepseekFacts.slug]: deepseekFacts,
  [freepikAiFacts.slug]: freepikAiFacts,
  [grokFacts.slug]: grokFacts,
  [grokBotFacts.slug]: grokBotFacts,
  [openaiApiFacts.slug]: openaiApiFacts,
  [qwenFacts.slug]: qwenFacts,
  [vapiFacts.slug]: vapiFacts,
  [warpFacts.slug]: warpFacts,
};

export function getToolFacts(slug: string): ToolFacts | undefined {
  return REGISTERED_TOOL_FACTS[slug];
}

export function listRegisteredToolFacts(): ToolFacts[] {
  return Object.values(REGISTERED_TOOL_FACTS);
}
