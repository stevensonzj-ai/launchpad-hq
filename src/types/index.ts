export type CostTier = "FREE" | "FREEMIUM" | "PAID" | "ENTERPRISE";
export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
export type PrivacyLevel = "LOW" | "MEDIUM" | "HIGH" | "MAXIMUM";

export interface PlatformFilters {
  category?: string;
  costTier?: CostTier;
  difficulty?: Difficulty;
  privacy?: PrivacyLevel;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}

export interface OnboardingSurvey {
  goals: string[];
  budget: string;
  experienceLevel: string;
  industries: string[];
  teamSize: string;
  priorities: string[];
}
