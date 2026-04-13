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
      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              activeTab === tab.id
                ? "bg-orange-500 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
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
      {activeTab === "discussions" && <PlatformDiscussions platformName={platformName} />}
      {activeTab === "prompts" && <PlatformPrompts platformName={platformName} />}
    </>
  );
}
