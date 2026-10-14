import apolloIoFacts from "./apollo-io";
import capcutFacts from "./capcut";
import captionsFacts from "./captions";
import characterAiFacts from "./character-ai";
import chatgptFacts from "./chatgpt";
import comfyuiFacts from "./comfyui";
import deepseekFacts from "./deepseek";
import deeplFacts from "./deepl";
import doximityGptFacts from "./doximity-gpt";
import firefliesAiFacts from "./fireflies-ai";
import freepikAiFacts from "./freepik-ai";
import grokFacts from "./grok";
import grokBotFacts from "./grok-bot";
import hedraFacts from "./hedra";
import higgsfieldFacts from "./higgsfield";
import jenniAiFacts from "./jenni-ai";
import jetbrainsAiFacts from "./jetbrains-ai";
import metaAiFacts from "./meta-ai";
import openaiApiFacts from "./openai-api";
import qwenFacts from "./qwen";
import retellAiFacts from "./retell-ai";
import vapiFacts from "./vapi";
import warpFacts from "./warp";
import type { ToolFacts } from "./types";

export const REGISTERED_TOOL_FACTS: Record<string, ToolFacts> = {
  [apolloIoFacts.slug]: apolloIoFacts,
  [capcutFacts.slug]: capcutFacts,
  [captionsFacts.slug]: captionsFacts,
  [characterAiFacts.slug]: characterAiFacts,
  [chatgptFacts.slug]: chatgptFacts,
  [comfyuiFacts.slug]: comfyuiFacts,
  [deepseekFacts.slug]: deepseekFacts,
  [deeplFacts.slug]: deeplFacts,
  [doximityGptFacts.slug]: doximityGptFacts,
  [firefliesAiFacts.slug]: firefliesAiFacts,
  [freepikAiFacts.slug]: freepikAiFacts,
  [grokFacts.slug]: grokFacts,
  [grokBotFacts.slug]: grokBotFacts,
  [hedraFacts.slug]: hedraFacts,
  [higgsfieldFacts.slug]: higgsfieldFacts,
  [jenniAiFacts.slug]: jenniAiFacts,
  [jetbrainsAiFacts.slug]: jetbrainsAiFacts,
  [metaAiFacts.slug]: metaAiFacts,
  [openaiApiFacts.slug]: openaiApiFacts,
  [qwenFacts.slug]: qwenFacts,
  [retellAiFacts.slug]: retellAiFacts,
  [vapiFacts.slug]: vapiFacts,
  [warpFacts.slug]: warpFacts,
};

export function getToolFacts(slug: string): ToolFacts | undefined {
  return REGISTERED_TOOL_FACTS[slug];
}

export function listRegisteredToolFacts(): ToolFacts[] {
  return Object.values(REGISTERED_TOOL_FACTS);
}
