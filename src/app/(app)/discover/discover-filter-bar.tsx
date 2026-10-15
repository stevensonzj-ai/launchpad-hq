"use client";

import type { ReactNode } from "react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, LayoutGrid, PenLine, ImageIcon, BookOpen, Workflow } from "lucide-react";
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
  q: string;
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
  const [isPending, startTransition] = useTransition();

  function update(field: FilterField, value: string) {
    const next = { ...current, [field]: value };
    const url =
      "/discover" +
      buildDiscoverQuery({
        q: next.q || undefined,
        category: next.category || undefined,
        cost: next.cost || undefined,
        difficulty: next.difficulty || undefined,
        mobile: next.mobile || undefined,
        sort: next.sort || undefined,
      });
    startTransition(() => router.push(url, { scroll: false }));
  }

  return (
    <fieldset disabled={isPending} aria-label="Search and filter tools" aria-busy={isPending} className="mb-5 min-w-0 disabled:opacity-70">
      <form action="/discover" className="relative mb-5 flex items-center gap-2 rounded-xl border border-gray-600/80 bg-gray-900/80 p-2 sm:p-2.5">
        <Search className="ml-2 h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
        <input key={current.q} name="q" defaultValue={current.q} maxLength={120} type="search" aria-label="Search tools or tasks" placeholder="Search tools or something you want to do" className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none" />
        {Object.entries(current).filter(([key, value]) => key !== "q" && value && !(key === "sort" && value === "popular")).map(([key, value]) => <input key={key} type="hidden" name={key} value={value} />)}
        <button type="submit" className="min-h-11 rounded-lg bg-gray-800 px-3 text-sm font-medium text-gray-200 hover:bg-gray-700">Search</button>
      </form>
      <div className="mb-5 flex flex-wrap gap-2 border-b border-gray-800 pb-5" aria-label="Quick categories">
        {[
          { value: "", label: "All tools", icon: LayoutGrid, color: "text-orange-200", surface: "bg-orange-400/10" },
          { value: "text-conversational-ai", label: "Writing", icon: PenLine, color: "text-purple-300", surface: "bg-purple-400/15" },
          { value: "image-generation-editing", label: "Images", icon: ImageIcon, color: "text-rose-300", surface: "bg-rose-400/15" },
          { value: "research-academic-tools", label: "Research", icon: BookOpen, color: "text-cyan-300", surface: "bg-cyan-400/15" },
          { value: "workflow-automation", label: "Automation", icon: Workflow, color: "text-emerald-300", surface: "bg-emerald-400/15" },
        ].map((item) => {
          const selected = current.category === item.value;
          return <button key={item.value} type="button" aria-pressed={selected} onClick={() => update("category", item.value)} className={cn("group relative isolate inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current", item.color, selected ? "border-current shadow-[inset_0_1px_0_rgb(255_255_255_/_0.12)]" : "border-transparent hover:border-current/60")}>
            <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 transition-opacity", item.surface, selected ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
            <item.icon aria-hidden="true" className="h-5 w-5 shrink-0" />{item.label}
          </button>;
        })}
      </div>
      <div className="grid grid-cols-2 items-center gap-3 sm:flex sm:flex-wrap sm:gap-2">
      <FilterSelect
        label="Filter by category"
        value={current.category}
        onChange={(v) => update("category", v)}
        className="min-w-0 sm:w-56"
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
      <div className="col-span-2 flex items-center gap-2 sm:ml-auto">
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
    </fieldset>
  );
}
