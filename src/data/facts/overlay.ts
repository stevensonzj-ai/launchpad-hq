import type { ToolFacts, ToolPlan } from "./types";

export type PlatformFactFields = {
  description: string | null;
  currentPricing: string | null;
  freeTierFeatures: string | null;
  platformType: string[];
  hasMobileApp: boolean;
  iosAppUrl: string | null;
  androidAppUrl: string | null;
};

export function formatPlans(plans: ToolPlan[]): string {
  return plans
    .map((plan) => {
      const period = plan.period ? `/${plan.period}` : "";
      const limits = plan.limits ? ` (${plan.limits})` : "";
      return `${plan.name}: ${plan.price}${period}${limits}`;
    })
    .join("; ");
}

export function overlayPlatformWithFacts<T extends PlatformFactFields>(
  platform: T,
  facts: ToolFacts | undefined,
): T {
  if (!facts) return platform;

  const next = { ...platform };

  if (facts.verdict) {
    next.description = facts.verdict.value;
  }
  if (facts.freeTier) {
    next.freeTierFeatures = facts.freeTier.value.summary;
  }
  if (facts.plans) {
    next.currentPricing = formatPlans(facts.plans.value);
  }
  if (facts.platforms) {
    next.platformType = facts.platforms.value;
  }
  if (facts.apps) {
    const apps = facts.apps.value;
    if (apps.ios) next.iosAppUrl = apps.ios;
    if (apps.android) next.androidAppUrl = apps.android;
    if (apps.ios || apps.android) next.hasMobileApp = true;
  }

  return next;
}
