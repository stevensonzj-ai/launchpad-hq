import type { ReactNode } from "react";
import Link from "next/link";
import { PlatformDiscussions } from "@/components/discussions/platform-discussions";
import { PlatformPrompts } from "@/components/prompts/platform-prompts";
import { tutorialGuidePath } from "@/data/tutorials";
import { resolvePlatformTab } from "@/lib/platform-display";

export type PlatformDetailTab = "overview" | "tutorials" | "discussions" | "prompts";

type TabCountKey = "tutorials" | "discussions" | "prompts";

export type PlatformDetailTabCounts = Partial<Record<TabCountKey, number>>;

/**
 * The platform section tab bar. Shared by /platform/[slug] (overview,
 * discussions, prompts via ?tab=) and /platform/[slug]/guide, which is the
 * tutorial's own indexable page rather than a ?tab= view.
 */
export function PlatformTabNav({
  platformSlug,
  activeTab,
  counts,
}: {
  platformSlug: string;
  activeTab: PlatformDetailTab;
  counts?: PlatformDetailTabCounts;
}) {
  const hasTutorial = (counts?.tutorials ?? 0) > 0;

  const tabs: { id: PlatformDetailTab; label: string; href: string; count?: number }[] = [
    { id: "overview", label: "Overview", href: `/platform/${platformSlug}` },
  ];
  if (hasTutorial) {
    tabs.push({
      id: "tutorials",
      label: "Getting started",
      href: tutorialGuidePath(platformSlug),
      count: counts?.tutorials,
    });
  }
  tabs.push(
    {
      id: "discussions",
      label: "Discussions",
      href: `/platform/${platformSlug}?tab=discussions`,
      count: counts?.discussions,
    },
    {
      id: "prompts",
      label: "Prompts",
      href: `/platform/${platformSlug}?tab=prompts`,
      count: counts?.prompts,
    },
  );

  return (
    <nav className="mb-8 flex flex-wrap gap-1 border-b border-gray-800" aria-label="Platform sections">
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 border-b-2 px-2 py-3 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
              active
                ? "border-orange-500 text-white"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span className={`ml-1.5 text-sm ${active ? "text-white/60" : "text-gray-500"}`}>
                ({tab.count})
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

type PlatformDetailTabsProps = {
  platformName: string;
  platformSlug: string;
  children: ReactNode;
  counts?: PlatformDetailTabCounts;
  initialTab?: string;
};

export function PlatformDetailTabs({
  platformName,
  platformSlug,
  children,
  counts,
  initialTab,
}: PlatformDetailTabsProps) {
  const activeTab = resolvePlatformTab(initialTab);

  return (
    <>
      <PlatformTabNav platformSlug={platformSlug} activeTab={activeTab} counts={counts} />

      {activeTab === "overview" && children}
      {activeTab === "discussions" && (
        <PlatformDiscussions
          platformName={platformName}
          platformSlug={platformSlug}
          approvedCount={counts?.discussions}
        />
      )}
      {activeTab === "prompts" && (
        <PlatformPrompts platformName={platformName} platformSlug={platformSlug} approvedCount={counts?.prompts} />
      )}
    </>
  );
}
