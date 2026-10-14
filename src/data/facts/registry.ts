import anthropicApiFacts from "./anthropic-api";
import apolloIoFacts from "./apollo-io";
import briskTeachingFacts from "./brisk-teaching";
import capcutFacts from "./capcut";
import captionsFacts from "./captions";
import characterAiFacts from "./character-ai";
import chatgptFacts from "./chatgpt";
import clayFacts from "./clay";
import cleoFacts from "./cleo";
import comfyuiFacts from "./comfyui";
import deepseekFacts from "./deepseek";
import deeplFacts from "./deepl";
import doximityGptFacts from "./doximity-gpt";
import fathomFacts from "./fathom";
import firecrawlFacts from "./firecrawl";
import firefliesAiFacts from "./fireflies-ai";
import freepikAiFacts from "./freepik-ai";
import grokFacts from "./grok";
import grokBotFacts from "./grok-bot";
import hedraFacts from "./hedra";
import higgsfieldFacts from "./higgsfield";
import jenniAiFacts from "./jenni-ai";
import jetbrainsAiFacts from "./jetbrains-ai";
import kimiFacts from "./kimi";
import klingAiFacts from "./kling-ai";
import kreaFacts from "./krea";
import krispFacts from "./krisp";
import metaAiFacts from "./meta-ai";
import monarchFacts from "./monarch";
import openaiApiFacts from "./openai-api";
import openrouterFacts from "./openrouter";
import perplexityCometFacts from "./perplexity-comet";
import quillbotFacts from "./quillbot";
import qwenFacts from "./qwen";
import retellAiFacts from "./retell-ai";
import sarvamAiFacts from "./sarvam-ai";
import speechifyFacts from "./speechify";
import vapiFacts from "./vapi";
import veedFacts from "./veed";
import warpFacts from "./warp";
import wisprFlowFacts from "./wispr-flow";
import writesonicChatsonicFacts from "./writesonic-chatsonic";
import type { ToolFacts } from "./types";

export const REGISTERED_TOOL_FACTS: Record<string, ToolFacts> = {
  [anthropicApiFacts.slug]: anthropicApiFacts,
  [apolloIoFacts.slug]: apolloIoFacts,
  [briskTeachingFacts.slug]: briskTeachingFacts,
  [capcutFacts.slug]: capcutFacts,
  [captionsFacts.slug]: captionsFacts,
  [characterAiFacts.slug]: characterAiFacts,
  [chatgptFacts.slug]: chatgptFacts,
  [clayFacts.slug]: clayFacts,
  [cleoFacts.slug]: cleoFacts,
  [comfyuiFacts.slug]: comfyuiFacts,
  [deepseekFacts.slug]: deepseekFacts,
  [deeplFacts.slug]: deeplFacts,
  [doximityGptFacts.slug]: doximityGptFacts,
  [fathomFacts.slug]: fathomFacts,
  [firecrawlFacts.slug]: firecrawlFacts,
  [firefliesAiFacts.slug]: firefliesAiFacts,
  [freepikAiFacts.slug]: freepikAiFacts,
  [grokFacts.slug]: grokFacts,
  [grokBotFacts.slug]: grokBotFacts,
  [hedraFacts.slug]: hedraFacts,
  [higgsfieldFacts.slug]: higgsfieldFacts,
  [jenniAiFacts.slug]: jenniAiFacts,
  [jetbrainsAiFacts.slug]: jetbrainsAiFacts,
  [kimiFacts.slug]: kimiFacts,
  [klingAiFacts.slug]: klingAiFacts,
  [kreaFacts.slug]: kreaFacts,
  [krispFacts.slug]: krispFacts,
  [metaAiFacts.slug]: metaAiFacts,
  [monarchFacts.slug]: monarchFacts,
  [openaiApiFacts.slug]: openaiApiFacts,
  [openrouterFacts.slug]: openrouterFacts,
  [perplexityCometFacts.slug]: perplexityCometFacts,
  [quillbotFacts.slug]: quillbotFacts,
  [qwenFacts.slug]: qwenFacts,
  [retellAiFacts.slug]: retellAiFacts,
  [sarvamAiFacts.slug]: sarvamAiFacts,
  [speechifyFacts.slug]: speechifyFacts,
  [vapiFacts.slug]: vapiFacts,
  [veedFacts.slug]: veedFacts,
  [warpFacts.slug]: warpFacts,
  [wisprFlowFacts.slug]: wisprFlowFacts,
  [writesonicChatsonicFacts.slug]: writesonicChatsonicFacts,
};

export function getToolFacts(slug: string): ToolFacts | undefined {
  return REGISTERED_TOOL_FACTS[slug];
}

export function listRegisteredToolFacts(): ToolFacts[] {
  return Object.values(REGISTERED_TOOL_FACTS);
}
