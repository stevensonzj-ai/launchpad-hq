import type { PlatformTutorialData } from "./chatgpt-getting-started";
import { chatgptTutorial } from "./chatgpt-getting-started";

const byPlatformSlug: Record<string, PlatformTutorialData> = {
  [chatgptTutorial.platformSlug]: chatgptTutorial,
};

export function getStaticTutorialForPlatform(platformSlug: string): PlatformTutorialData | undefined {
  return byPlatformSlug[platformSlug];
}

export type { PlatformTutorialData, TutorialSection } from "./chatgpt-getting-started";
