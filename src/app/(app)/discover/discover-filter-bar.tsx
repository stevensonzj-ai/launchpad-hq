"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  buildDiscoverQuery,
  COST_FILTERS,
  DIFFICULTY_FILTERS,
  MOBILE_FILTERS,
  SORT_FILTERS,
} from "@/lib/discover-filters";

/**
 * Compact filter control bar for the Discover page.
 *
 * This is the ONLY interactive/client piece of Discover — the server page
 * parses and guards the URL params; this bar only *emits* URLs. It re-uses
 * buildDiscoverQuery and the shared option lists so it can never drift from the
 * server's contract. On change it merges the single changed field into the
 * current params, builds the URL, and navigates with scroll preserved.
 */

type FilterField = "category" | "cost" | "difficulty" | "mobile" | "sort";

type CurrentFilters = {
  category: string;
  cost: string;
  difficulty: string;
  mobile: string;
  sort: string;
};

type DiscoverFilterBarProps = {
  categories: { slug: string; name: string; count: number }[];
  current: CurrentFilters;
};

// Closed-trigger styling mirrors the dark-theme chips it replaces
// (bg-gray-800, subtle border). appearance-none hides the native chevron so we
// can draw our own; the OS-rendered open list is deliberately left alone.
//
// [color-scheme:dark] pins the native popup, scrollbar, and focus ring to a
// dark rendering deterministically — without it the browser infers the scheme
// from the OS, so a light-mode OS paints a light dropdown against our dark UI.
// Scoped to these selects rather than :root so it stays within the control bar.
//
// truncate (overflow-hidden text-ellipsis whitespace-nowrap) lets a long
// category name render "AI Coding & Devel…" instead of a hard mid-word clip.
// It's inert on the short-label selects, and degrades to a plain clip (today's
// behavior) on any engine that doesn't honor text-overflow on a native select.
const triggerClass = cn(
  "w-full appearance-none cursor-pointer truncate rounded-md border border-gray-700 [color-scheme:dark]",
  "bg-gray-800 py-2 pl-3 pr-9 text-sm text-gray-200",
  "transition-colors hover:border-gray-600 hover:text-white",
  "focus:border-orange-500/60 focus:outline-none focus:ring-1 focus:ring-orange-500/40",
);

function FilterSelect({
  label,
  value,
  onChange,
  children,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={triggerClass}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}

export function DiscoverFilterBar({ categories, current }: DiscoverFilterBarProps) {
  const router = useRouter();

  function update(field: FilterField, value: string) {
    const next = { ...current, [field]: value };
    const url =
      "/discover" +
      buildDiscoverQuery({
        category: next.category || undefined,
        cost: next.cost || undefined,
        difficulty: next.difficulty || undefined,
        mobile: next.mobile || undefined,
        sort: next.sort || undefined,
      });
    router.push(url, { scroll: false });
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <FilterSelect
        label="Filter by category"
        value={current.category}
        onChange={(v) => update("category", v)}
        className="min-w-[11rem] flex-1 sm:max-w-[16rem]"
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name} ({cat.count})
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        label="Filter by cost"
        value={current.cost}
        onChange={(v) => update("cost", v)}
      >
        <option value="">All costs</option>
        {COST_FILTERS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        label="Filter by skill level"
        value={current.difficulty}
        onChange={(v) => update("difficulty", v)}
      >
        <option value="">All levels</option>
        {DIFFICULTY_FILTERS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </FilterSelect>

      <FilterSelect
        label="Filter by app availability"
        value={current.mobile}
        onChange={(v) => update("mobile", v)}
      >
        <option value="">Any access</option>
        {MOBILE_FILTERS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </FilterSelect>

      {/* sm:ml-auto — right-aligned on the filter row at desktop, but flush-left
          on mobile where it wraps to its own row (ml-auto would strand it right). */}
      <div className="flex items-center gap-2 sm:ml-auto">
        <span className="text-xs uppercase tracking-wide text-gray-500">Sort</span>
        <FilterSelect
          label="Sort platforms"
          value={current.sort}
          onChange={(v) => update("sort", v)}
        >
          {SORT_FILTERS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </FilterSelect>
      </div>
    </div>
  );
}
