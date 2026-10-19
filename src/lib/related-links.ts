import { getStaticTutorialForPlatform, listRegisteredTutorials } from "@/data/tutorials";
import { getModelFamilyForPlatform } from "@/data/models";
import { WORKFLOWS } from "@/data/workflows";
import type { WorkflowTemplate } from "@/data/workflows";
import type { SponsorPlacement } from "@/data/sponsors";
import { PLACEMENTS } from "@/data/sponsors";

export const RELATED_PLATFORM_MIN = 3;
export const RELATED_PLATFORM_MAX = 5;

export type RelatedPlatformCandidate = {
  slug: string;
  name: string;
  categorySlug: string;
};

export function workflowPlatformSlugs(workflow: WorkflowTemplate): string[] {
  const slugs = new Set<string>();
  for (const tier of Object.values(workflow.tiers)) {
    for (const tool of tier.tools) {
      if (tool.slug) slugs.add(tool.slug);
    }
    for (const step of tier.steps ?? []) {
      if (step.toolSlug) slugs.add(step.toolSlug);
    }
  }
  return [...slugs];
}

export function workflowToolDisplayName(workflow: WorkflowTemplate, slug: string): string {
  for (const tier of Object.values(workflow.tiers)) {
    const tool = tier.tools.find((item) => item.slug === slug);
    if (tool?.name) return tool.name;
    const step = tier.steps?.find((item) => item.toolSlug === slug);
    if (step?.name) return step.name;
  }
  return slug;
}

export function workflowsMentioningPlatform(platformSlug: string): Array<{
  slug: string;
  title: string;
}> {
  return WORKFLOWS.filter((workflow) => workflowPlatformSlugs(workflow).includes(platformSlug)).map(
    (workflow) => ({ slug: workflow.slug, title: workflow.title }),
  );
}

export function sponsorExcludedSlugs(
  candidates: RelatedPlatformCandidate[],
  placements: readonly SponsorPlacement[] = PLACEMENTS,
): string[] {
  const names = new Set(placements.map((placement) => placement.sponsorName.trim().toLowerCase()));
  return candidates
    .filter((candidate) => names.has(candidate.name.trim().toLowerCase()))
    .map((candidate) => candidate.slug);
}

export function pickRelatedPlatforms(
  currentSlug: string,
  categorySlug: string,
  candidates: RelatedPlatformCandidate[],
  options?: { limit?: number; excludeSlugs?: Iterable<string> },
): RelatedPlatformCandidate[] {
  const limit = Math.min(
    RELATED_PLATFORM_MAX,
    Math.max(1, options?.limit ?? RELATED_PLATFORM_MAX),
  );
  const excluded = new Set([currentSlug, ...(options?.excludeSlugs ?? [])]);
  return candidates
    .filter(
      (candidate) =>
        candidate.slug !== currentSlug &&
        candidate.categorySlug === categorySlug &&
        !excluded.has(candidate.slug),
    )
    .slice(0, limit);
}

export function relatedCatalogLinksForPlatform(input: {
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  related: RelatedPlatformCandidate[];
}): Array<{ href: string; label: string; group: string }> {
  const links: Array<{ href: string; label: string; group: string }> = [];
  for (const related of input.related) {
    links.push({
      href: `/platform/${related.slug}`,
      label: related.name,
      group: `Related in ${input.categoryName}`,
    });
  }
  const tutorial = getStaticTutorialForPlatform(input.slug);
  if (tutorial) {
    links.push({
      href: `/platform/${input.slug}?tab=tutorials`,
      label: tutorial.title,
      group: "Tutorials",
    });
  }
  for (const workflow of workflowsMentioningPlatform(input.slug)) {
    links.push({
      href: `/workflows/${workflow.slug}`,
      label: workflow.title,
      group: "Workflows",
    });
  }
  const family = getModelFamilyForPlatform(input.slug);
  if (family) {
    links.push({
      href: `/models/${family.familySlug}`,
      label: `${family.displayName} models`,
      group: "Models",
    });
  }
  return links;
}

export function tutorialIndexLinks(): Array<{ href: string; label: string }> {
  return listRegisteredTutorials()
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((tutorial) => ({
      href: `/platform/${tutorial.platformSlug}?tab=tutorials`,
      label: tutorial.title,
    }));
}
