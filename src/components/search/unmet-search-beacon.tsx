"use client";

import { useEffect } from "react";
import { getUnmetTracker } from "@/lib/search/unmet-client";

/**
 * Discover's hook into the aggregate unmet-search log (docs/unmet-searches.md).
 * Renders nothing. Given the search text and how many tools the page found, it
 * hands them to the shared tracker, which sends one beacon only when the count
 * is 2 or fewer and the visitor is eligible. A click on a tool card inside a
 * [data-unmet-results] area counts as a result click.
 */
export function UnmetSearchBeacon({ query, resultCount }: { query: string; resultCount: number }) {
  useEffect(() => {
    try {
      getUnmetTracker().observe(query, resultCount);
      const onClick = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (target.closest('[data-unmet-results] a[href^="/platform/"]')) getUnmetTracker().click(query);
      };
      document.addEventListener("click", onClick);
      return () => document.removeEventListener("click", onClick);
    } catch {
      // Logging is optional.
    }
  }, [query, resultCount]);
  return null;
}
