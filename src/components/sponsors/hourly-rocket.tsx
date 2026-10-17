"use client";

import { useEffect, useRef, useState } from "react";
import {
  chicagoHourKey,
  createRocketFlightPlan,
  decideHourlyRocketLaunch,
  HOURLY_ROCKET_CRAFT,
  HOURLY_ROCKET_FLIGHT_MS,
  readLastPlayedHourKey,
  rocketPoseAt,
  writeLastPlayedHourKey,
  type RocketFlightPlan,
} from "@/lib/hourly-rocket";

export const HOURLY_ROCKET_HOME = "hourly-rocket-home";
export const HOURLY_ROCKET_TARGET = "hourly-rocket-target";

const CRAFT_W = HOURLY_ROCKET_CRAFT.width;
const CRAFT_H = HOURLY_ROCKET_CRAFT.height;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pointOf(el: Element | null): { x: number; y: number } | null {
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.28 };
}

export function HourlyRocket({ hasSponsorTarget }: { hasSponsorTarget: boolean }) {
  const [home, setHome] = useState<{ x: number; y: number } | null>(null);
  const craftRef = useRef<HTMLDivElement | null>(null);
  const plumeRef = useRef<HTMLImageElement | null>(null);
  const previewLaunchedRef = useRef(false);
  const planRef = useRef<RocketFlightPlan | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const tryLaunch = () => {
      if (prefersReducedMotion()) return;
      if (planRef.current) return;
      const search = window.location.search;
      const now = new Date();
      const decision = decideHourlyRocketLaunch({
        now,
        lastPlayedHourKey: readLastPlayedHourKey(window.localStorage),
        search,
      });
      if (!decision.launch) return;
      if (!decision.persistHourKey && previewLaunchedRef.current) return;

      const nextHome = pointOf(document.querySelector(`[data-${HOURLY_ROCKET_HOME}]`));
      if (!nextHome) return;

      const target = hasSponsorTarget
        ? pointOf(document.querySelector(`[data-${HOURLY_ROCKET_TARGET}]`))
        : null;

      if (decision.persistHourKey) {
        writeLastPlayedHourKey(window.localStorage, chicagoHourKey(now));
      } else {
        previewLaunchedRef.current = true;
      }

      planRef.current = createRocketFlightPlan(
        nextHome,
        target ? { x: target.x - nextHome.x, y: target.y - nextHome.y } : { x: 0, y: 0 },
        { width: window.innerWidth, height: window.innerHeight },
      );
      setHome(nextHome);
    };

    tryLaunch();
    const id = window.setInterval(tryLaunch, 1000);
    return () => {
      window.clearInterval(id);
      window.cancelAnimationFrame(rafRef.current);
      planRef.current = null;
    };
  }, [hasSponsorTarget]);

  useEffect(() => {
    if (!home || !planRef.current) return;
    if (prefersReducedMotion()) return;

    const started = performance.now();
    const tick = (now: number) => {
      const plan = planRef.current;
      const craft = craftRef.current;
      const plume = plumeRef.current;
      if (!plan || !craft || !plume) return;
      const t = Math.min(1, (now - started) / HOURLY_ROCKET_FLIGHT_MS);
      const pose = rocketPoseAt(plan, t);
      craft.style.transform = `translate3d(${pose.x}px, ${pose.y}px, 0) rotate(${pose.angle}deg)`;
      plume.style.opacity = String(pose.plume.opacity);
      plume.style.transform = `scaleY(${pose.plume.scaleY})`;
      if (t < 1) {
        rafRef.current = window.requestAnimationFrame(tick);
        return;
      }
      planRef.current = null;
      setHome(null);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafRef.current);
  }, [home]);

  if (!home) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      <div
        ref={craftRef}
        className="absolute"
        style={{
          left: home.x,
          top: home.y,
          width: CRAFT_W,
          height: CRAFT_H,
          marginLeft: -CRAFT_W / 2,
          marginTop: -CRAFT_H / 2,
          transform: "translate3d(0, 0, 0) rotate(0deg)",
          willChange: "transform",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- overlay sprite, not a content image */}
        <img
          ref={plumeRef}
          src="/images/launchpad/hourly-rocket-plume.webp"
          alt=""
          width={CRAFT_W}
          height={CRAFT_H}
          className="absolute inset-0 h-full w-full object-contain"
          style={{ transformOrigin: "52% 38%", opacity: 1, transform: "scaleY(1)" }}
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
