"use client";

import { useEffect, useRef, useState } from "react";
import {
  chicagoHourKey, clamp01, smoothStep, createRocketFlightPlan,
  decideHourlyRocketLaunch, HOURLY_ROCKET_CRAFT, HOURLY_ROCKET_FLIGHT_MS,
  HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG, ROCKET_DETACH_MS, ROCKET_AFTERLAND_MS,
  readLastPlayedHourKey, rocketDetachAt, rocketPoseAt, rocketImageLandingTarget, writeLastPlayedHourKey,
  type RocketFlightPlan,
} from "@/lib/hourly-rocket";

export const HOURLY_ROCKET_HOME = "hourly-rocket-home";
export const HOURLY_ROCKET_TARGET = "hourly-rocket-target";
const CRAFT_W = HOURLY_ROCKET_CRAFT.width;
const CRAFT_H = HOURLY_ROCKET_CRAFT.height;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pointOf(el: Element | null, verticalAnchor = 0.5) {
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height * verticalAnchor };
}

export function HourlyRocket({ hasSponsorTarget }: { hasSponsorTarget: boolean }) {
  const [home, setHome] = useState<{ x: number; y: number } | null>(null);
  const craftRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const plumeRef = useRef<HTMLImageElement | null>(null);
  const glowRef = useRef<HTMLImageElement | null>(null);
  const smokeRef = useRef<HTMLDivElement | null>(null);
  const previewLaunchedRef = useRef(false);
  const planRef = useRef<RocketFlightPlan | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tryLaunch = () => {
      if (prefersReducedMotion() || document.hidden || planRef.current) return;
      let storage: Storage | null = null;
      try { storage = window.localStorage; } catch { /* Storage may be blocked. */ }
      const now = new Date();
      const decision = decideHourlyRocketLaunch({
        now, lastPlayedHourKey: readLastPlayedHourKey(storage), search: window.location.search,
      });
      if (!decision.launch || (!decision.persistHourKey && previewLaunchedRef.current)) return;
      const nextHome = pointOf(document.querySelector(`[data-${HOURLY_ROCKET_HOME}]`));
      if (!nextHome) return;
      const viewport = { width: window.innerWidth, height: window.innerHeight };
      const image = hasSponsorTarget
        ? document.querySelector<HTMLImageElement>(`img[data-${HOURLY_ROCKET_TARGET}]`) : null;
      const visibleTarget = image?.complete && image.naturalWidth > 0 && image.getClientRects().length > 0
        ? rocketImageLandingTarget(image.getBoundingClientRect(), viewport) : null;
      planRef.current = createRocketFlightPlan(
        nextHome,
        visibleTarget ? { x: visibleTarget.x - nextHome.x, y: visibleTarget.y - nextHome.y } : { x: 0, y: 0 },
        viewport,
      );
      if (decision.persistHourKey) writeLastPlayedHourKey(storage, chicagoHourKey(now));
      else previewLaunchedRef.current = true;
      setHome(nextHome);
    };
    // Defer until mount commits; Strict Mode probes must not consume the launch.
    const launchFrame = window.requestAnimationFrame(tryLaunch);
    const id = window.setInterval(tryLaunch, 1000);
    return () => {
      window.cancelAnimationFrame(launchFrame);
      window.clearInterval(id);
      window.cancelAnimationFrame(rafRef.current);
      planRef.current = null;
    };
  }, [hasSponsorTarget]);

  useEffect(() => {
    if (!home || !planRef.current || prefersReducedMotion()) return;
    const logo = document.querySelector<SVGElement>(`[data-${HOURLY_ROCKET_HOME}]`);
    const previousOpacity = logo?.style.opacity ?? "";
    const icon = iconRef.current;
    // Copy the exact rendered icon, including its paths and dimensions, so there
    // is no substitution or positional jump at the instant of detachment.
    if (logo && icon) {
      const copy = logo.cloneNode(true) as SVGElement;
      copy.removeAttribute(`data-${HOURLY_ROCKET_HOME}`);
      copy.style.opacity = "1";
      icon.replaceChildren(copy);
    }
    const started = performance.now();
    const initialViewport = { width: window.innerWidth, height: window.innerHeight };
    let fade: Animation | null = null;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const puffs = smokeRef.current?.querySelectorAll<HTMLElement>("[data-smoke]");
    const finish = () => {
      window.cancelAnimationFrame(rafRef.current);
      if (logo) logo.style.opacity = previousOpacity;
      planRef.current = null;
      setHome(null);
    };
    const fadeOut = () => {
      if (fade) return;
      window.cancelAnimationFrame(rafRef.current);
      if (!overlayRef.current) { finish(); return; }
      fade = overlayRef.current.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200, easing: "ease-out", fill: "forwards",
      });
      fade.onfinish = finish;
    };
    const onResize = () => {
      // Safari's collapsing address bar changes the viewport height mid-flight.
      // Compare with launch dimensions so repeated small changes cannot accumulate.
      if (Math.abs(window.innerWidth - initialViewport.width) > 100 ||
          Math.abs(window.innerHeight - initialViewport.height) > 100) fadeOut();
    };
    const onVisibility = () => { if (document.hidden) finish(); };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", fadeOut, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", finish);

    const tick = (now: number) => {
      const plan = planRef.current;
      const craft = craftRef.current;
      const plume = plumeRef.current;
      if (!plan || !craft || !plume) return;
      const elapsed = now - started;
      const flightElapsed = elapsed - ROCKET_DETACH_MS;
      const t = clamp01(flightElapsed / HOURLY_ROCKET_FLIGHT_MS);
      const pose = rocketPoseAt(plan, t);
      const detach = rocketDetachAt(plan, elapsed / ROCKET_DETACH_MS);
      const dropping = flightElapsed < 0;
      const restore = smoothStep((flightElapsed - HOURLY_ROCKET_FLIGHT_MS - 500) / 1000);
      const x = dropping ? detach.x : plan.returnsHome ? pose.x * (1 - restore) : pose.x;
      const y = dropping ? detach.y : plan.returnsHome ? pose.y * (1 - restore) : pose.y;
      const scale = dropping ? detach.scale : 1 - 0.58 * restore;
      const angle = dropping ? detach.angle : pose.angle;
      craft.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg) scale(${scale})`;
      craft.style.opacity = String(detach.artwork * (1 - restore));
      if (icon) {
        icon.style.opacity = String(1 - detach.artwork);
        icon.style.transform = `translate3d(${detach.x}px, ${detach.y}px, 0) rotate(${detach.angle + HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG - 45}deg)`;
      }
      if (logo) logo.style.opacity = String(plan.returnsHome ? restore : smoothStep(t / 0.2));
      // Stretch along the painted engine axis, not the diagonal image's Y axis.
      const offset = HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG;
      const ignition = dropping ? detach.ignition : 1;
      const length = pose.plume.scaleY * ignition;
      plume.style.opacity = String(pose.plume.opacity * ignition);
      plume.style.transform = `rotate(${offset}deg) scaleY(${length}) rotate(${-offset}deg)`;
      if (glowRef.current) {
        glowRef.current.style.opacity = String(pose.plume.opacity * ignition * 0.65);
        glowRef.current.style.transform = `rotate(${offset}deg) scale(1.4, ${length * 1.12}) rotate(${-offset}deg)`;
      }
      if (smokeRef.current) smokeRef.current.style.transform = `translate3d(${plan.land.x}px, ${plan.land.y + 20}px, 0)`;
      const smokeTime = (flightElapsed - HOURLY_ROCKET_FLIGHT_MS * 0.89) / 1000;
      puffs?.forEach((puff, i) => {
        const age = smokeTime - Math.floor(i / 2) * 0.07;
        const life = clamp01(age / 2.2);
        const side = i % 2 === 0 ? -1 : 1;
        const spread = 65 + (i % 7) * 13;
        puff.style.willChange = life > 0 && life < 1 ? "transform, opacity" : "auto";
        puff.style.opacity = String(age > 0 ? Math.sin(Math.PI * life) * (0.42 + i % 3 * 0.06) : 0);
        puff.style.transform = `translate3d(${side * life * spread}px, ${-life * (12 + i % 5 * 6)}px, 0) scale(${0.4 + life * 2.3})`;
      });
      if (flightElapsed < HOURLY_ROCKET_FLIGHT_MS + ROCKET_AFTERLAND_MS) rafRef.current = window.requestAnimationFrame(tick);
      else finish();
    };
    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafRef.current);
      if (fade) { fade.onfinish = null; fade.cancel(); }
      if (logo) logo.style.opacity = previousOpacity;
      icon?.replaceChildren();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", fadeOut);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", finish);
    };
  }, [home]);

  if (!home) return null;
  return (
    <div ref={overlayRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div ref={smokeRef} className="absolute" style={{ left: home.x, top: home.y }}>
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} data-smoke className="absolute rounded-full text-gray-300" style={{
            width: 28 + i % 4 * 10, height: 22 + i % 3 * 8, marginLeft: -18,
            background: "radial-gradient(ellipse, currentColor 15%, transparent 70%)",
            opacity: 0,
          }} />
        ))}
      </div>
      <div ref={iconRef} className="absolute" style={{ left: home.x, top: home.y, width: 24, height: 24, marginLeft: -12, marginTop: -12, opacity: 0 }} />
      <div ref={craftRef} className="absolute" style={{
        left: home.x, top: home.y, width: CRAFT_W, height: CRAFT_H,
        // Anchor the visible body, not the middle of the canvas (which includes exhaust).
        marginLeft: -CRAFT_W * 0.64, marginTop: -CRAFT_H * 0.30,
        transformOrigin: "64% 30%", opacity: 0, willChange: "transform, opacity",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative engine glow */}
        <img ref={glowRef} src="/images/launchpad/hourly-rocket-plume.webp" alt="" width={CRAFT_W} height={CRAFT_H} className="absolute inset-0 h-full w-full object-contain blur-sm" style={{ transformOrigin: "52% 38%", opacity: 0, willChange: "transform" }} />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative engine sprite */}
        <img ref={plumeRef} src="/images/launchpad/hourly-rocket-plume.webp" alt="" width={CRAFT_W} height={CRAFT_H} className="absolute inset-0 h-full w-full object-contain" style={{ transformOrigin: "52% 38%", opacity: 0 }} />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative flight sprite */}
        <img src="/images/launchpad/hourly-rocket-body.webp" alt="" width={CRAFT_W} height={CRAFT_H} className="absolute inset-0 h-full w-full object-contain" />
      </div>
    </div>
  );
}
