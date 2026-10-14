import Link from "next/link";
import { PlatformCard } from "@/components/platforms/platform-card";
import {
  matchingWorkflowForGoals,
  tutorialLinkForPlatform,
  workflowFeaturingPlatform,
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
  matchScore: number;
  aboveDifficulty?: boolean;
  matchReasons?: MatchReason[];
};

function ReasonChips({ reasons }: { reasons?: MatchReason[] }) {
  if (!reasons?.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {reasons.map((reason) => (
        <span
          key={reason}
          className="rounded-full border border-gray-700 bg-gray-900 px-2 py-0.5 text-[11px] text-gray-300"
        >
          {reason}
        </span>
      ))}
    </div>
  );
}

function CardLinks({ slug }: { slug: string }) {
  const tutorial = tutorialLinkForPlatform(slug);
  const workflow = workflowFeaturingPlatform(slug);
  if (!tutorial && !workflow) return null;
  return (
    <p className="mt-2 text-xs text-gray-500">
      {tutorial && (
        <Link href={tutorial.href} className="text-orange-400 hover:underline">
          {tutorial.label}
        </Link>
      )}
      {tutorial && workflow && <span className="mx-1.5 text-gray-600">·</span>}
      {workflow && (
        <Link href={workflow.href} className="text-orange-400 hover:underline">
          Workflow: {workflow.label}
        </Link>
      )}
    </p>
  );
}

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
    <div className={featured ? "sm:col-span-2 lg:col-span-3" : undefined}>
      <PlatformCard
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
        matchScore={rec.matchScore}
        aboveDifficulty={rec.aboveDifficulty}
        isFavorited={favoriteIds?.has(rec.id)}
        isSignedIn={isSignedIn}
      />
      <ReasonChips reasons={rec.matchReasons} />
      <CardLinks slug={rec.slug} />
    </div>
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
          <h2 className="text-xl font-semibold text-white">
            Advanced{" "}
            <span className="ml-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
              Advanced
            </span>
          </h2>
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
