"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import {
  alreadySent,
  analyticsProperties,
  buildSignupPayload,
  markSent,
  privacySignalOn,
  readLiveFirstTouch,
} from "@/lib/attribution/first-touch";

/**
 * Sends the stored first touch to the server once, right after signup
 * (rendered on the onboarding page). Renders nothing, and does nothing when no
 * first touch was captured, e.g. Do Not Track was on.
 */
export function SignupAttribution() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const store = window.localStorage;
        if (alreadySent(store)) return;
        const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
        if (privacySignalOn(nav)) return;
        const touch = readLiveFirstTouch(store);
        if (!touch) return;
        const payload = buildSignupPayload(touch, "onboarding");
        const res = await fetch("/api/attribution/first-touch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        });
        if (cancelled || !res.ok) return;
        markSent(store);
        track("signup_attribution", analyticsProperties(payload));
      } catch {
        // Attribution is best-effort and must never affect onboarding.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
