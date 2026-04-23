"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { PlatformTutorials } from "@/components/tutorials/platform-tutorials";
import { PlatformDiscussions } from "@/components/discussions/platform-discussions";
import { PlatformPrompts } from "@/components/prompts/platform-prompts";

export type PlatformDetailTab = "overview" | "tutorials" | "discussions" | "prompts";

const TABS: { id: PlatformDetailTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "tutorials", label: "Tutorials" },
  { id: "discussions", label: "Discussions" },
  { id: "prompts", label: "Prompts" },
];

type PlatformDetailTabsProps = {
  platformName: string;
  platformSlug: string;
  children: ReactNode;
};

export function PlatformDetailTabs({ platformName, platformSlug, children }: PlatformDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<PlatformDetailTab>("overview");

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-4 py-3 text-[15px] font-medium transition-colors ${
              activeTab === tab.id
                ? "border-orange-500 text-white"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
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
