import type { PlatformTutorialData } from "./types";
import { chatgptTutorial } from "./chatgpt-getting-started";
import { ollamaTutorial } from "./ollama-getting-started";
import { zapierTutorial } from "./zapier-getting-started";
import { midjourneyTutorial } from "./midjourney-getting-started";

const byPlatformSlug: Record<string, PlatformTutorialData> = {
  [chatgptTutorial.platformSlug]: chatgptTutorial,
  [ollamaTutorial.platformSlug]: ollamaTutorial,
  [zapierTutorial.platformSlug]: zapierTutorial,
  [midjourneyTutorial.platformSlug]: midjourneyTutorial,
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
