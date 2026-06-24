import type { PlatformTutorialData } from "./types";
import { chatgptTutorial } from "./chatgpt-getting-started";
import { ollamaTutorial } from "./ollama-getting-started";

const byPlatformSlug: Record<string, PlatformTutorialData> = {
  [chatgptTutorial.platformSlug]: chatgptTutorial,
  [ollamaTutorial.platformSlug]: ollamaTutorial,
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
