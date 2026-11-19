import Link from "next/link";
import { PlatformCard } from "@/components/platforms/platform-card";
import {
  matchingWorkflowForGoals,
  tutorialLinkForPlatform,
  workflowFeaturingPlatform,
  type QuizLink,
} from "@/lib/quiz-links";
import type { MatchReason } from "@/lib/recommendations-score";

export type QuizMatchRec = {
  id: string;
  slug: string;
  name: string;
  company: string | null;
  primaryUse: string | null;
  costTier: string;
  difficultyLevel: string;
  category: { name: string; slug: string };
  freeTierFeatures: string | null;
  hasMobileApp?: boolean;
  mobileWebFriendly?: boolean;
  /** Internal ordering score. Never shown: it is a raw sum, not a percentage. */
  matchScore: number;
  aboveDifficulty?: boolean;
  matchReasons?: MatchReason[];
  /** Hand-set default pick (src/data/quiz-defaults.ts). */
  defaultPick?: boolean;
  /** One plain sentence for a default pick. */
  why?: string | null;
};

/** The tutorial and workflow links shown in a match card's footer. */
export function matchCardLinks(slug: string): QuizLink[] {
  const tutorial = tutorialLinkForPlatform(slug);
  const workflow = workflowFeaturingPlatform(slug);
  const links: QuizLink[] = [];
  if (tutorial) links.push(tutorial);
  if (workflow) links.push({ href: workflow.href, label: `Workflow: ${workflow.label}` });
  return links;
}

/**
 * One match card. The "why" sentence, reason chips and links render inside
 * the card (PlatformCard props), so nothing sits between or below cards and
 * every card in a row stretches to the same height. The card is the grid
 * item itself; the Best first pick spans the row via `className`.
 */
function MatchCard({
  rec,
  featured,
  favoriteIds,
  isSignedIn,
}: {
  rec: QuizMatchRec;
  featured?: boolean;
  favoriteIds?: Set<string>;
  isSignedIn?: boolean;
}) {
  return (
    <PlatformCard
      className={featured ? "sm:col-span-2 lg:col-span-3" : undefined}
      slug={rec.slug}
      name={rec.name}
      company={rec.company}
      primaryUse={rec.primaryUse}
      costTier={rec.costTier}
      difficultyLevel={rec.difficultyLevel}
      category={rec.category}
      freeTierFeatures={rec.freeTierFeatures}
      hasMobileApp={rec.hasMobileApp}
      mobileWebFriendly={rec.mobileWebFriendly}
      aboveDifficulty={rec.aboveDifficulty}
      isFavorited={favoriteIds?.has(rec.id)}
      isSignedIn={isSignedIn}
      why={rec.why}
      matchReasons={rec.matchReasons}
      extraLinks={matchCardLinks(rec.slug)}
    />
  );
}

export function QuizMatchSections({
  recs,
  goals,
  favoriteIds,
  isSignedIn,
}: {
  recs: QuizMatchRec[];
  goals: string[];
  favoriteIds?: Set<string>;
  isSignedIn?: boolean;
}) {
  const comfortable = recs.filter((r) => !r.aboveDifficulty);
  const best = comfortable[0] ?? recs[0];
  const alsoGood = comfortable.filter((r) => r.id !== best?.id);
  const advanced = recs.filter((r) => r.aboveDifficulty && r.id !== best?.id);
  const goalWorkflow = matchingWorkflowForGoals(goals);

  return (
    <div className="space-y-10">
      {goalWorkflow && (
        <p className="text-sm text-gray-400">
          Matching workflow:{" "}
          <Link href={goalWorkflow.href} className="text-orange-400 hover:underline">
            {goalWorkflow.label}
          </Link>
        </p>
      )}

      {best && (
        <section>
          <h2 className="text-xl font-semibold text-white">Best first pick</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MatchCard
              rec={best}
              featured
              favoriteIds={favoriteIds}
              isSignedIn={isSignedIn}
            />
          </div>
        </section>
      )}

      {alsoGood.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-white">Also good</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {alsoGood.map((p) => (
              <MatchCard
                key={p.id}
                rec={p}
                favoriteIds={favoriteIds}
                isSignedIn={isSignedIn}
              />
            ))}
          </div>
        </section>
      )}

      {advanced.length > 0 && (
        <section>
          {/* One label, not "Advanced Advanced": this section holds tools above
              the level chosen in the quiz, which may be intermediate, not advanced. */}
          <h2 className="text-xl font-semibold text-white">Above your selected level</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {advanced.map((p) => (
              <MatchCard
                key={p.id}
                rec={p}
                favoriteIds={favoriteIds}
                isSignedIn={isSignedIn}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
