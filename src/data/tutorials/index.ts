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
