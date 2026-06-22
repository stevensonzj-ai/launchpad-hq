export type AccessTier = 'FREE' | 'PREMIUM';
export type TutorialArchetype = 'prompts' | 'recipes' | 'pick-and-setup';

export type CapabilityTriad = { bestAt: string[]; okayAt: string[]; avoid: string[] };
export type StarterAction = { title: string; whatItDoes?: string; whyHere: string; tweak?: string; prompt?: string };
export type SetupGuidance = { officialSource: string; body: string[]; vendorDocsUrl?: string };

export type PlatformTutorialData = {
  slug: string;
  platformSlug: string;
  title: string;
  tagline: string;
  archetype: TutorialArchetype;
  lastReviewedAt: string;   // ISO date
  changelogUrl?: string;
  accessTier: AccessTier;
  howItWorks: string;
  whatItIs: string[];
  beforeYouStart: string[];
  gettingSetUpSafely?: SetupGuidance;
  security: string[];
  triad: CapabilityTriad;
  starterActions: StarterAction[];
  pitfalls: string[];
  whereToNext: string[];
};
