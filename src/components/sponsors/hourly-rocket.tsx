"use client";

import { useEffect, useRef, useState } from "react";
import {
  chicagoHourKey,
  decideHourlyRocketLaunch,
  readLastPlayedHourKey,
  writeLastPlayedHourKey,
} from "@/lib/hourly-rocket";

export const HOURLY_ROCKET_HOME = "hourly-rocket-home";
export const HOURLY_ROCKET_TARGET = "hourly-rocket-target";

const FLIGHT_MS = 3800;
const CRAFT_W = 56;
const CRAFT_H = 80;

type Flight = {
  left: number;
  top: number;
  animationName: "lp-rocket-land" | "lp-rocket-home-loop";
  endX: number;
  endY: number;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pointOf(el: Element | null): { x: number; y: number } | null {
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.28 };
}

export function HourlyRocket({ hasSponsorTarget }: { hasSponsorTarget: boolean }) {
  const [flight, setFlight] = useState<Flight | null>(null);
  const previewLaunchedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const tryLaunch = () => {
      if (prefersReducedMotion()) return;
      const search = window.location.search;
      const now = new Date();
      const decision = decideHourlyRocketLaunch({
        now,
        lastPlayedHourKey: readLastPlayedHourKey(window.localStorage),
        search,
      });
      if (!decision.launch) return;
      if (!decision.persistHourKey && previewLaunchedRef.current) return;

      const home = pointOf(document.querySelector(`[data-${HOURLY_ROCKET_HOME}]`));
      if (!home) return;

      const target = hasSponsorTarget
        ? pointOf(document.querySelector(`[data-${HOURLY_ROCKET_TARGET}]`))
        : null;

      if (decision.persistHourKey) {
        writeLastPlayedHourKey(window.localStorage, chicagoHourKey(now));
      } else {
        previewLaunchedRef.current = true;
      }

      if (target) {
        setFlight({
          left: home.x,
          top: home.y,
          animationName: "lp-rocket-land",
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
      <div
        className="absolute"
        style={{
          left: flight.left,
          top: flight.top,
          width: CRAFT_W,
          height: CRAFT_H,
          marginLeft: -CRAFT_W / 2,
          marginTop: -CRAFT_H / 2,
          animation: `${flight.animationName} ${FLIGHT_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          ["--rocket-dx" as string]: `${flight.endX}px`,
          ["--rocket-dy" as string]: `${flight.endY}px`,
        }}
      >
        {/* Plume is a separate cutout of the same art, stacked on the body canvas.
            scaleY/opacity flicker the plume only; body stays still relative to the craft. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- overlay sprite, not a content image */}
        <img
          src="/images/launchpad/hourly-rocket-plume.webp"
          alt=""
          width={CRAFT_W}
          height={CRAFT_H}
          className="absolute inset-0 h-full w-full object-contain"
          style={{
            transformOrigin: "52% 38%",
            animation: `lp-rocket-plume ${FLIGHT_MS}ms linear forwards`,
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- overlay sprite, not a content image */}
        <img
          src="/images/launchpad/hourly-rocket-body.webp"
          alt=""
          width={CRAFT_W}
          height={CRAFT_H}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
