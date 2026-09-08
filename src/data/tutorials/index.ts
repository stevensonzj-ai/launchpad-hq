import type { PlatformTutorialData } from "./types";
import { chatgptTutorial } from "./chatgpt-getting-started";
import { ollamaTutorial } from "./ollama-getting-started";
import { zapierTutorial } from "./zapier-getting-started";
import { midjourneyTutorial } from "./midjourney-getting-started";
import { githubCopilotTutorial } from "./github-copilot-getting-started";
import { otterTutorial } from "./otter-getting-started";
import { sunoTutorial } from "./suno-getting-started";
import { runwayTutorial } from "./runway-getting-started";
import { elevenlabsTutorial } from "./elevenlabs-getting-started";
import { cursorTutorial } from "./cursor-getting-started";
import { openaiApiTutorial } from "./openai-api-getting-started";
import { lovableTutorial } from "./lovable-getting-started";
import { perplexityTutorial } from "./perplexity-getting-started";
import { notebooklmTutorial } from "./notebooklm-getting-started";
import { adobeFireflyTutorial } from "./adobe-firefly-getting-started";
import { canvaAiTutorial } from "./canva-ai-getting-started";
import { heygenTutorial } from "./heygen-getting-started";
import { copyAiTutorial } from "./copy-ai-getting-started";
import { notionAiTutorial } from "./notion-ai-getting-started";
import { claudeTutorial } from "./claude-getting-started";
import { geminiTutorial } from "./gemini-getting-started";
import { anthropicApiTutorial } from "./anthropic-api-getting-started";
import { huggingFaceTutorial } from "./hugging-face-getting-started";
import { lmStudioTutorial } from "./lm-studio-getting-started";
import { makeTutorial } from "./make-getting-started";
import { grammarlyTutorial } from "./grammarly-getting-started";
import { descriptTutorial } from "./descript-getting-started";
import { elicitTutorial } from "./elicit-getting-started";
import { acrobatAiTutorial } from "./acrobat-ai-getting-started";
import { grokTutorial } from "./grok-getting-started";
import { ideogramTutorial } from "./ideogram-getting-started";
import { n8nTutorial } from "./n8n-getting-started";
import { tldvTutorial } from "./tldv-getting-started";
import { janTutorial } from "./jan-getting-started";
import { microsoftCopilotTutorial } from "./microsoft-copilot-getting-started";
import { mistralAiLeChatTutorial } from "./mistral-ai-le-chat-getting-started";
import { leonardoAiTutorial } from "./leonardo-ai-getting-started";
import { fluxTutorial } from "./flux-getting-started";
import { recraftTutorial } from "./recraft-getting-started";
import { googleVeo31Tutorial } from "./google-veo-3-1-getting-started";
import { synthesiaTutorial } from "./synthesia-getting-started";
import { pikaTutorial } from "./pika-getting-started";
import { udioTutorial } from "./udio-getting-started";
import { claudeCodeTutorial } from "./claude-code-getting-started";
import { openWebuiTutorial } from "./open-webui-getting-started";
import { groqTutorial } from "./groq-getting-started";
import { gumloopTutorial } from "./gumloop-getting-started";
import { slackAiTutorial } from "./slack-ai-getting-started";
import { windsurfTutorial } from "./windsurf-getting-started";
import { amazonBedrockTutorial } from "./amazon-bedrock-getting-started";
import { assemblyaiTutorial } from "./assemblyai-getting-started";
import { azureOpenaiServiceTutorial } from "./azure-openai-service-getting-started";
import { clarifaiTutorial } from "./clarifai-getting-started";
import { deepgramTutorial } from "./deepgram-getting-started";
import { fireworksAiTutorial } from "./fireworks-ai-getting-started";
import { googleVertexAiTutorial } from "./google-vertex-ai-getting-started";
import { pineconeTutorial } from "./pinecone-getting-started";
import { replicateTutorial } from "./replicate-getting-started";
import { scaleAiTutorial } from "./scale-ai-getting-started";
import { togetherAiTutorial } from "./together-ai-getting-started";
import { aiderTutorial } from "./aider-getting-started";
import { amazonQDeveloperTutorial } from "./amazon-q-developer-getting-started";
import { boltNewTutorial } from "./bolt-new-getting-started";
import { geminiCliTutorial } from "./gemini-cli-getting-started";
import { googleAntigravityTutorial } from "./google-antigravity-getting-started";
import { kiroTutorial } from "./kiro-getting-started";
import { openaiCodexCliTutorial } from "./openai-codex-cli-getting-started";
import { replitAgentTutorial } from "./replit-agent-getting-started";
import { tabnineTutorial } from "./tabnine-getting-started";

const byPlatformSlug: Record<string, PlatformTutorialData> = {
  [amazonBedrockTutorial.platformSlug]: amazonBedrockTutorial,
  [assemblyaiTutorial.platformSlug]: assemblyaiTutorial,
  [azureOpenaiServiceTutorial.platformSlug]: azureOpenaiServiceTutorial,
  [clarifaiTutorial.platformSlug]: clarifaiTutorial,
  [deepgramTutorial.platformSlug]: deepgramTutorial,
  [fireworksAiTutorial.platformSlug]: fireworksAiTutorial,
  [googleVertexAiTutorial.platformSlug]: googleVertexAiTutorial,
  [pineconeTutorial.platformSlug]: pineconeTutorial,
  [replicateTutorial.platformSlug]: replicateTutorial,
  [scaleAiTutorial.platformSlug]: scaleAiTutorial,
  [togetherAiTutorial.platformSlug]: togetherAiTutorial,
  [aiderTutorial.platformSlug]: aiderTutorial,
  [amazonQDeveloperTutorial.platformSlug]: amazonQDeveloperTutorial,
  [boltNewTutorial.platformSlug]: boltNewTutorial,
  [geminiCliTutorial.platformSlug]: geminiCliTutorial,
  [googleAntigravityTutorial.platformSlug]: googleAntigravityTutorial,
  [kiroTutorial.platformSlug]: kiroTutorial,
  [openaiCodexCliTutorial.platformSlug]: openaiCodexCliTutorial,
  [replitAgentTutorial.platformSlug]: replitAgentTutorial,
  [tabnineTutorial.platformSlug]: tabnineTutorial,
  [microsoftCopilotTutorial.platformSlug]: microsoftCopilotTutorial,
  [mistralAiLeChatTutorial.platformSlug]: mistralAiLeChatTutorial,
  [leonardoAiTutorial.platformSlug]: leonardoAiTutorial,
  [fluxTutorial.platformSlug]: fluxTutorial,
  [recraftTutorial.platformSlug]: recraftTutorial,
  [googleVeo31Tutorial.platformSlug]: googleVeo31Tutorial,
  [synthesiaTutorial.platformSlug]: synthesiaTutorial,
  [pikaTutorial.platformSlug]: pikaTutorial,
  [udioTutorial.platformSlug]: udioTutorial,
  [claudeCodeTutorial.platformSlug]: claudeCodeTutorial,
  [openWebuiTutorial.platformSlug]: openWebuiTutorial,
  [groqTutorial.platformSlug]: groqTutorial,
  [gumloopTutorial.platformSlug]: gumloopTutorial,
  [slackAiTutorial.platformSlug]: slackAiTutorial,
  [windsurfTutorial.platformSlug]: windsurfTutorial,
  [grokTutorial.platformSlug]: grokTutorial,
  [ideogramTutorial.platformSlug]: ideogramTutorial,
  [n8nTutorial.platformSlug]: n8nTutorial,
  [tldvTutorial.platformSlug]: tldvTutorial,
  [janTutorial.platformSlug]: janTutorial,
  [chatgptTutorial.platformSlug]: chatgptTutorial,
  [ollamaTutorial.platformSlug]: ollamaTutorial,
  [zapierTutorial.platformSlug]: zapierTutorial,
  [midjourneyTutorial.platformSlug]: midjourneyTutorial,
  [githubCopilotTutorial.platformSlug]: githubCopilotTutorial,
  [otterTutorial.platformSlug]: otterTutorial,
  [sunoTutorial.platformSlug]: sunoTutorial,
  [runwayTutorial.platformSlug]: runwayTutorial,
  [elevenlabsTutorial.platformSlug]: elevenlabsTutorial,
  [cursorTutorial.platformSlug]: cursorTutorial,
  [openaiApiTutorial.platformSlug]: openaiApiTutorial,
  [lovableTutorial.platformSlug]: lovableTutorial,
  [perplexityTutorial.platformSlug]: perplexityTutorial,
  [notebooklmTutorial.platformSlug]: notebooklmTutorial,
  [adobeFireflyTutorial.platformSlug]: adobeFireflyTutorial,
  [canvaAiTutorial.platformSlug]: canvaAiTutorial,
  [heygenTutorial.platformSlug]: heygenTutorial,
  [copyAiTutorial.platformSlug]: copyAiTutorial,
  [notionAiTutorial.platformSlug]: notionAiTutorial,
  [claudeTutorial.platformSlug]: claudeTutorial,
  [geminiTutorial.platformSlug]: geminiTutorial,
  [anthropicApiTutorial.platformSlug]: anthropicApiTutorial,
  [huggingFaceTutorial.platformSlug]: huggingFaceTutorial,
  [lmStudioTutorial.platformSlug]: lmStudioTutorial,
  [makeTutorial.platformSlug]: makeTutorial,
  [grammarlyTutorial.platformSlug]: grammarlyTutorial,
  [descriptTutorial.platformSlug]: descriptTutorial,
  [elicitTutorial.platformSlug]: elicitTutorial,
  [acrobatAiTutorial.platformSlug]: acrobatAiTutorial,
};

export function getStaticTutorialForPlatform(platformSlug: string): PlatformTutorialData | undefined {
  return byPlatformSlug[platformSlug];
}

export type {
  AccessTier,
  TutorialArchetype,
  CapabilityTriad,
  StarterAction,
  SetupGuidance,
  PlatformTutorialData,
} from "./types";
