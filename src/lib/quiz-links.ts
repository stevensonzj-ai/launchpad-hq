import { getStaticTutorialForPlatform } from "@/data/tutorials";
import { WORKFLOWS, getWorkflowBySlug } from "@/data/workflows";

/** First matching workflow template for a quiz goal. */
const GOAL_WORKFLOW_SLUG: Record<string, string> = {
  content_creation: "blog-post-generator",
  coding: "code-writing",
  research: "content-research",
  image_generation: "image-generation",
  video: "video-editing",
  audio: "voice-clone",
  automation: "meeting-intelligence",
  business: "customer-support",
  education: "content-research",
  data_analysis: "content-research",
};

export type QuizLink = { href: string; label: string };

export function matchingWorkflowForGoals(goals: string[]): QuizLink | null {
  for (const goal of goals) {
    const slug = GOAL_WORKFLOW_SLUG[goal];
    if (!slug) continue;
    const wf = getWorkflowBySlug(slug);
    if (wf) return { href: `/workflows/${wf.slug}`, label: wf.title };
  }
  return null;
}

export function workflowFeaturingPlatform(platformSlug: string): QuizLink | null {
  for (const wf of WORKFLOWS) {
    const tools = [
      ...wf.tiers.optimal.tools,
      ...wf.tiers.hybrid.tools,
      ...wf.tiers.budget.tools,
    ];
    if (tools.some((t) => t.slug === platformSlug)) {
      return { href: `/workflows/${wf.slug}`, label: wf.title };
    }
  }
  return null;
}

/** Tutorials render on the platform detail page (Tutorials tab). */
export function tutorialLinkForPlatform(platformSlug: string): QuizLink | null {
  const tutorial = getStaticTutorialForPlatform(platformSlug);
  if (!tutorial) return null;
  return {
    href: `/platform/${platformSlug}?tab=tutorials`,
    label: "Getting-started tutorial",
  };
}
