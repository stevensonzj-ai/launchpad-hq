"use client";

import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import {
  chicagoHourKey,
  readLastPlayedHourKey,
  shouldLaunchHourlyRocket,
  writeLastPlayedHourKey,
} from "@/lib/hourly-rocket";

export const HOURLY_ROCKET_HOME = "hourly-rocket-home";
export const HOURLY_ROCKET_TARGET = "hourly-rocket-target";

const FLIGHT_MS = 3600;

type Flight = {
  left: number;
  top: number;
  animationName: "lp-rocket-to-banner" | "lp-rocket-home-loop";
  endX: number;
  endY: number;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pointOf(el: Element | null): { x: number; y: number } | null {
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

export function HourlyRocket({ hasSponsorTarget }: { hasSponsorTarget: boolean }) {
  const [flight, setFlight] = useState<Flight | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const tryLaunch = () => {
      if (prefersReducedMotion()) return;
      const now = new Date();
      const last = readLastPlayedHourKey(window.localStorage);
      if (!shouldLaunchHourlyRocket(now, last)) return;

      const home = pointOf(document.querySelector(`[data-${HOURLY_ROCKET_HOME}]`));
      if (!home) return;

      const target = hasSponsorTarget
        ? pointOf(document.querySelector(`[data-${HOURLY_ROCKET_TARGET}]`))
        : null;

      writeLastPlayedHourKey(window.localStorage, chicagoHourKey(now));

      if (target) {
        setFlight({
          left: home.x,
          top: home.y,
          animationName: "lp-rocket-to-banner",
          endX: target.x - home.x,
          endY: target.y - home.y,
        });
      } else {
        setFlight({
          left: home.x,
          top: home.y,
          animationName: "lp-rocket-home-loop",
          endX: 0,
          endY: 0,
        });
      }
    };

    tryLaunch();
    const id = window.setInterval(tryLaunch, 1000);
    return () => window.clearInterval(id);
  }, [hasSponsorTarget]);

  useEffect(() => {
    if (!flight) return;
    const id = window.setTimeout(() => setFlight(null), FLIGHT_MS);
    return () => window.clearTimeout(id);
  }, [flight]);

  if (!flight) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      <Rocket
        className="absolute h-7 w-7 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.55)]"
        style={{
          left: flight.left,
          top: flight.top,
          marginLeft: -14,
          marginTop: -14,
          animation: `${flight.animationName} ${FLIGHT_MS}ms ease-in-out forwards`,
          ["--rocket-dx" as string]: `${flight.endX}px`,
          ["--rocket-dy" as string]: `${flight.endY}px`,
        }}
      />
    </div>
  );
}
