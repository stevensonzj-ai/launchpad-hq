"use client";

import { useEffect } from "react";
import { captureIfEligible, hasUtmParams } from "@/lib/attribution/first-touch";

async function fetchAllowed(): Promise<boolean> {
  const res = await fetch("/api/attribution/eligibility", { cache: "no-store", credentials: "omit" });
  if (!res.ok) return false;
  const body = (await res.json()) as { allowed?: unknown };
  return body.allowed === true;
}

/**
 * Records the visitor's first landing (UTM tags + pathname) in localStorage,
 * once, for 12 months. Renders nothing. It does nothing on Do Not Track or
 * Global Privacy Control, and only asks the server for a country check when the
 * URL actually carries UTM tags, so normal page views make no extra request.
 */
export function FirstTouchCapture() {
  useEffect(() => {
    try {
      if (!hasUtmParams(window.location.search)) return;
      const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
      void captureIfEligible(window.localStorage, window.location, nav, fetchAllowed).catch(() => {});
    } catch {
      // localStorage unavailable: skip.
    }
  }, []);
  return null;
}
