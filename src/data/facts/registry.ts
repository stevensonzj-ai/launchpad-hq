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
import evenupFacts from "./evenup";
import fathomFacts from "./fathom";
import firecrawlFacts from "./firecrawl";
import firefliesAiFacts from "./fireflies-ai";
import freepikAiFacts from "./freepik-ai";
import gammaFacts from "./gamma";
import gensparkFacts from "./genspark";
import granolaFacts from "./granola";
import grokFacts from "./grok";
import grokBotFacts from "./grok-bot";
import hedraFacts from "./hedra";
import higgsfieldFacts from "./higgsfield";
import invideoAiFacts from "./invideo-ai";
import jasperFacts from "./jasper";
import jenniAiFacts from "./jenni-ai";
import jetbrainsAiFacts from "./jetbrains-ai";
import kimiFacts from "./kimi";
import klingAiFacts from "./kling-ai";
import kreaFacts from "./krea";
import krispFacts from "./krisp";
import legoraFacts from "./legora";
import lindyAiFacts from "./lindy-ai";
import magicschoolFacts from "./magicschool";
import metaAiFacts from "./meta-ai";
import napkinAiFacts from "./napkin-ai";
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
import sora2Facts from "./sora-2";
import playHtFacts from "./play-ht";
import relayAppFacts from "./relay-app";
import kakaoBrainKarloFacts from "./kakao-brain-karlo";
import googleAntigravityFacts from "./google-antigravity";
import runwayForEducationFacts from "./runway-for-education";
import tabnineFacts from "./tabnine";
import windsurfFacts from "./windsurf";
import notebooklmFacts from "./notebooklm";
import surferSeoFacts from "./surfer-seo";
import wonderDynamicsWonderStudioFacts from "./wonder-dynamics-wonder-studio";
import unriddleFacts from "./unriddle";
import kiraSystemsFacts from "./kira-systems";
import casetextCocounselFacts from "./casetext-cocounsel";
import lexisPlusAiFacts from "./lexis-plus-ai";
import alephAlphaLuminousFacts from "./aleph-alpha-luminous";
// Guide prices pass, 2026-10-25.
import inworldAiFacts from "./inworld-ai";
import readAiFacts from "./read-ai";
import n8nFacts from "./n8n";
import mistralVibeFacts from "./mistral-vibe";
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
  [evenupFacts.slug]: evenupFacts,
  [fathomFacts.slug]: fathomFacts,
  [firecrawlFacts.slug]: firecrawlFacts,
  [firefliesAiFacts.slug]: firefliesAiFacts,
  [freepikAiFacts.slug]: freepikAiFacts,
  [gammaFacts.slug]: gammaFacts,
  [gensparkFacts.slug]: gensparkFacts,
  [granolaFacts.slug]: granolaFacts,
  [grokFacts.slug]: grokFacts,
  [grokBotFacts.slug]: grokBotFacts,
  [hedraFacts.slug]: hedraFacts,
  [higgsfieldFacts.slug]: higgsfieldFacts,
  [invideoAiFacts.slug]: invideoAiFacts,
  [jasperFacts.slug]: jasperFacts,
  [jenniAiFacts.slug]: jenniAiFacts,
  [jetbrainsAiFacts.slug]: jetbrainsAiFacts,
  [kimiFacts.slug]: kimiFacts,
  [klingAiFacts.slug]: klingAiFacts,
  [kreaFacts.slug]: kreaFacts,
  [krispFacts.slug]: krispFacts,
  [legoraFacts.slug]: legoraFacts,
  [lindyAiFacts.slug]: lindyAiFacts,
  [magicschoolFacts.slug]: magicschoolFacts,
  [metaAiFacts.slug]: metaAiFacts,
  [napkinAiFacts.slug]: napkinAiFacts,
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
  // Catalog accuracy cleanup, 2026-10-20: status / rename / URL fixes.
  [sora2Facts.slug]: sora2Facts,
  [playHtFacts.slug]: playHtFacts,
  [relayAppFacts.slug]: relayAppFacts,
  [kakaoBrainKarloFacts.slug]: kakaoBrainKarloFacts,
  [googleAntigravityFacts.slug]: googleAntigravityFacts,
  [runwayForEducationFacts.slug]: runwayForEducationFacts,
  [tabnineFacts.slug]: tabnineFacts,
  [windsurfFacts.slug]: windsurfFacts,
  [notebooklmFacts.slug]: notebooklmFacts,
  [surferSeoFacts.slug]: surferSeoFacts,
  [wonderDynamicsWonderStudioFacts.slug]: wonderDynamicsWonderStudioFacts,
  [unriddleFacts.slug]: unriddleFacts,
  [kiraSystemsFacts.slug]: kiraSystemsFacts,
  [casetextCocounselFacts.slug]: casetextCocounselFacts,
  [lexisPlusAiFacts.slug]: lexisPlusAiFacts,
  [alephAlphaLuminousFacts.slug]: alephAlphaLuminousFacts,
  // Guide prices pass, 2026-10-25: catalog homes for prices guides cite, and the Le Chat -> Vibe rename.
  [inworldAiFacts.slug]: inworldAiFacts,
  [readAiFacts.slug]: readAiFacts,
  [n8nFacts.slug]: n8nFacts,
  [mistralVibeFacts.slug]: mistralVibeFacts,
};

export function getToolFacts(slug: string): ToolFacts | undefined {
  return REGISTERED_TOOL_FACTS[slug];
}

export function listRegisteredToolFacts(): ToolFacts[] {
  return Object.values(REGISTERED_TOOL_FACTS);
}
