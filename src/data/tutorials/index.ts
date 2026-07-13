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

const byPlatformSlug: Record<string, PlatformTutorialData> = {
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
