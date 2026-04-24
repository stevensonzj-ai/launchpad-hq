"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { PlatformTutorials } from "@/components/tutorials/platform-tutorials";
import { PlatformDiscussions } from "@/components/discussions/platform-discussions";
import { PlatformPrompts } from "@/components/prompts/platform-prompts";

export type PlatformDetailTab = "overview" | "tutorials" | "discussions" | "prompts";

type TabCountKey = "tutorials" | "discussions" | "prompts";

export type PlatformDetailTabCounts = Partial<Record<TabCountKey, number>>;

const TABS: { id: PlatformDetailTab; label: string; countKey?: TabCountKey }[] = [
  { id: "overview", label: "Overview" },
  { id: "tutorials", label: "Tutorials", countKey: "tutorials" },
  { id: "discussions", label: "Discussions", countKey: "discussions" },
  { id: "prompts", label: "Prompts", countKey: "prompts" },
];

type PlatformDetailTabsProps = {
  platformName: string;
  platformSlug: string;
  children: ReactNode;
  counts?: PlatformDetailTabCounts;
};

export function PlatformDetailTabs({ platformName, platformSlug, children, counts }: PlatformDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<PlatformDetailTab>("overview");

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-1">
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          const count = tab.countKey ? counts?.[tab.countKey] : undefined;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-3 text-[15px] font-medium transition-colors ${
                active
                  ? "border-orange-500 text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
              {count !== undefined && count > 0 && (
                <span className={`ml-1.5 text-sm ${active ? "text-white/60" : "text-gray-500"}`}>
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeTab === "overview" && children}
      {activeTab === "tutorials" && (
        <PlatformTutorials platformName={platformName} platformSlug={platformSlug} />
      )}
      {activeTab === "discussions" && (
        <PlatformDiscussions platformName={platformName} platformSlug={platformSlug} />
      )}
      {activeTab === "prompts" && (
        <PlatformPrompts platformName={platformName} platformSlug={platformSlug} />
      )}
    </>
  );
}
