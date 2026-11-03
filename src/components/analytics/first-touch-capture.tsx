"use client";

import { useEffect } from "react";
import { captureFirstTouch } from "@/lib/attribution/first-touch";

/** Records the visitor's first landing (UTM tags + pathname) in localStorage, once. Renders nothing. */
export function FirstTouchCapture() {
  useEffect(() => {
    try {
      const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
      captureFirstTouch(window.localStorage, window.location, nav);
    } catch {
      // localStorage unavailable: skip.
    }
  }, []);
  return null;
}
