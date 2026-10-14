import type { ToolFacts, ToolPlan } from "./types";

export type PlatformFactFields = {
  description: string | null;
  currentPricing: string | null;
  freeTierFeatures: string | null;
  usageLimits?: string | null;
  platformType: string[];
  hasMobileApp: boolean;
  iosAppUrl: string | null;
  androidAppUrl: string | null;
  macosAppUrl?: string | null;
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

export type OverlayPlatform<T extends PlatformFactFields> = T & {
  macosAppUrl: string | null;
  usageLimits: string | null;
};

export function overlayPlatformWithFacts<T extends PlatformFactFields>(
  platform: T,
  facts: ToolFacts | undefined,
): OverlayPlatform<T> {
  const next: OverlayPlatform<T> = {
    ...platform,
    macosAppUrl: platform.macosAppUrl ?? null,
    usageLimits: platform.usageLimits ?? null,
  };

  if (!facts) return next;

  if (facts.verdict) {
    next.description = facts.verdict.value;
  }
  if (facts.freeTier) {
    next.freeTierFeatures = facts.freeTier.value.summary;
    next.usageLimits = null;
  }
  if (facts.plans) {
    next.currentPricing = formatPlans(facts.plans.value);
  }
  if (facts.platforms) {
    next.platformType = facts.platforms.value;
  }
  if (facts.apps) {
    const apps = facts.apps.value;
    next.iosAppUrl = apps.ios ?? null;
    next.androidAppUrl = apps.android ?? null;
    next.macosAppUrl = apps.macos ?? null;
    next.hasMobileApp = Boolean(apps.ios || apps.android);
  }

  return next;
}
