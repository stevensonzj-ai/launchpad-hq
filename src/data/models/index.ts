import type { PlatformModelFamily } from "./types";
import { anthropicClaude } from "./anthropic-claude";
import { openaiGpt } from "./openai-gpt";
import { googleGemini } from "./google-gemini";
import { xaiGrok } from "./xai-grok";
import { mistral } from "./mistral";
import { metaLlama } from "./meta-llama";
import { metaMuse } from "./meta-muse";
import { deepseek } from "./deepseek";
import { alibabaQwen } from "./alibaba-qwen";

export type { PlatformModelFamily, ModelVersion } from "./types";

const families: PlatformModelFamily[] = [
  anthropicClaude,
  openaiGpt,
  googleGemini,
  xaiGrok,
  mistral,
  metaLlama,
  metaMuse,
  deepseek,
  alibabaQwen,
];

const byFamilySlug: Record<string, PlatformModelFamily> = Object.fromEntries(
  families.map((family) => [family.familySlug, family]),
);

const byPlatformSlug: Record<string, PlatformModelFamily> = {};
for (const family of families) {
  for (const slug of family.platformSlugs) {
    byPlatformSlug[slug] = family;
  }
}

export function listModelFamilies(): PlatformModelFamily[] {
  return families;
}

export function getModelFamilyBySlug(familySlug: string): PlatformModelFamily | undefined {
  return byFamilySlug[familySlug];
}

export function getModelFamilyForPlatform(platformSlug: string): PlatformModelFamily | undefined {
  return byPlatformSlug[platformSlug];
}

export function listModelFamilySlugs(): string[] {
  return families.map((family) => family.familySlug);
}
