"use client";

import { useEffect, useRef, useState } from "react";
import {
  chicagoHourKey,
  decideHourlyRocketLaunch,
  HOURLY_ROCKET_CRAFT,
  HOURLY_ROCKET_FLIGHT_MS,
  readLastPlayedHourKey,
  rocketHoverOffset,
  rocketTourOffsets,
  writeLastPlayedHourKey,
} from "@/lib/hourly-rocket";

export const HOURLY_ROCKET_HOME = "hourly-rocket-home";
export const HOURLY_ROCKET_TARGET = "hourly-rocket-target";

const CRAFT_W = HOURLY_ROCKET_CRAFT.width;
const CRAFT_H = HOURLY_ROCKET_CRAFT.height;

type Flight = {
  left: number;
  top: number;
  endX: number;
  endY: number;
  hoverX: number;
  hoverY: number;
  tour: ReturnType<typeof rocketTourOffsets>;
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

      const viewport = { width: window.innerWidth, height: window.innerHeight };
      const tour = rocketTourOffsets(home, viewport);
      const end = target
        ? { x: target.x - home.x, y: target.y - home.y }
        : { x: 0, y: 0 };
      const hover = rocketHoverOffset(home, end, viewport);

      setFlight({
        left: home.x,
        top: home.y,
        endX: end.x,
        endY: end.y,
        hoverX: hover.x,
        hoverY: hover.y,
        tour,
      });
    };

    tryLaunch();
    const id = window.setInterval(tryLaunch, 1000);
    return () => window.clearInterval(id);
  }, [hasSponsorTarget]);

  useEffect(() => {
    if (!flight) return;
    const id = window.setTimeout(() => setFlight(null), HOURLY_ROCKET_FLIGHT_MS);
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
          animation: `lp-rocket-land ${HOURLY_ROCKET_FLIGHT_MS}ms cubic-bezier(0.42, 0, 0.58, 1) forwards`,
          ["--rocket-dx" as string]: `${flight.endX}px`,
          ["--rocket-dy" as string]: `${flight.endY}px`,
          ["--hover-x" as string]: `${flight.hoverX}px`,
          ["--hover-y" as string]: `${flight.hoverY}px`,
          ["--tour-x1" as string]: `${flight.tour.x1}px`,
          ["--tour-y1" as string]: `${flight.tour.y1}px`,
          ["--tour-x2" as string]: `${flight.tour.x2}px`,
          ["--tour-y2" as string]: `${flight.tour.y2}px`,
          ["--tour-x3" as string]: `${flight.tour.x3}px`,
          ["--tour-y3" as string]: `${flight.tour.y3}px`,
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
            animation: `lp-rocket-plume ${HOURLY_ROCKET_FLIGHT_MS}ms ease-in-out forwards`,
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
