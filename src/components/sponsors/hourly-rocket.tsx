"use client";
import { useEffect, useRef, useState } from "react";
import { chicagoHourKey, clamp01, smoothStep, HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG, createRocketFlightPlan, decideHourlyRocketLaunch, HOURLY_ROCKET_CRAFT, HOURLY_ROCKET_FLIGHT_MS, readLastPlayedHourKey, rocketPoseAt, writeLastPlayedHourKey, type RocketFlightPlan, } from "@/lib/hourly-rocket";
export const HOURLY_ROCKET_HOME = "hourly-rocket-home";
export const HOURLY_ROCKET_TARGET = "hourly-rocket-target";
const CRAFT_W = HOURLY_ROCKET_CRAFT.width;
const CRAFT_H = HOURLY_ROCKET_CRAFT.height;
function prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function pointOf(el: Element | null): {
    x: number;
    y: number;
} | null {
    if (!el)
        return null;
    const rect = el.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.28 };
}
export function HourlyRocket({ hasSponsorTarget }: {
    hasSponsorTarget: boolean;
}) {
    const [home, setHome] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const craftRef = useRef<HTMLDivElement | null>(null);
    const plumeRef = useRef<HTMLImageElement | null>(null);
    const smokeRef = useRef<HTMLDivElement | null>(null);
    const previewLaunchedRef = useRef(false);
    const planRef = useRef<RocketFlightPlan | null>(null);
    const rafRef = useRef<number>(0);
    useEffect(() => {
        if (prefersReducedMotion())
            return;
        const tryLaunch = () => {
            if (prefersReducedMotion())
                return;
            if (planRef.current)
                return;
            const search = window.location.search;
            const now = new Date();
            const decision = decideHourlyRocketLaunch({
                now,
                lastPlayedHourKey: readLastPlayedHourKey(window.localStorage),
                search,
            });
            if (!decision.launch)
                return;
            if (!decision.persistHourKey && previewLaunchedRef.current)
                return;
            const nextHome = pointOf(document.querySelector(`[data-${HOURLY_ROCKET_HOME}]`));
            if (!nextHome)
                return;
            const target = hasSponsorTarget
                ? pointOf(document.querySelector(`[data-${HOURLY_ROCKET_TARGET}]`))
                : null;
            if (decision.persistHourKey) {
                writeLastPlayedHourKey(window.localStorage, chicagoHourKey(now));
            }
            else {
                previewLaunchedRef.current = true;
            }
            // An off-screen card is not a visible landing pad. Return to the logo instead.
            const visibleTarget = target && target.y > 140 && target.y < window.innerHeight - 80 ? target : null;
            planRef.current = createRocketFlightPlan(nextHome, visibleTarget ? { x: visibleTarget.x - nextHome.x, y: visibleTarget.y - nextHome.y } : { x: 0, y: 0 }, { width: window.innerWidth, height: window.innerHeight });
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
        if (!home || !planRef.current)
            return;
        if (prefersReducedMotion())
            return;
        const logo = document.querySelector<SVGElement>(`[data-${HOURLY_ROCKET_HOME}]`);
        const previousOpacity = logo?.style.opacity ?? "";
        const started = performance.now();
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const finish = () => {
            window.cancelAnimationFrame(rafRef.current);
            if (logo)
                logo.style.opacity = previousOpacity;
            planRef.current = null;
            setHome(null);
        };
        const onVisibility = () => { if (document.hidden)
            finish(); };
        // Cancel rather than leave a stale pad after a resize or a page scroll.
        window.addEventListener("resize", finish);
        window.addEventListener("scroll", finish, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);
        motion.addEventListener("change", finish);
        const tick = (now: number) => {
            const plan = planRef.current;
            const craft = craftRef.current;
            const plume = plumeRef.current;
            if (!plan || !craft || !plume)
                return;
            const elapsed = now - started;
            const t = Math.min(1, elapsed / HOURLY_ROCKET_FLIGHT_MS);
            const pose = rocketPoseAt(plan, t);
            const reveal = smoothStep(elapsed / 350);
            const restore = smoothStep((elapsed - HOURLY_ROCKET_FLIGHT_MS - 300) / 850);
            const x = plan.returnsHome ? pose.x * (1 - restore) : pose.x;
            const y = plan.returnsHome ? pose.y * (1 - restore) : pose.y;
            const scale = (0.35 + 0.65 * reveal) * (1 - 0.7 * restore);
            craft.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${pose.angle}deg) scale(${scale})`;
            craft.style.opacity = String(reveal * (1 - restore));
            if (logo)
                logo.style.opacity = String(plan.returnsHome ? 1 - reveal * (1 - restore) : 1 - reveal + reveal * smoothStep(t / 0.2));
            plume.style.opacity = String(pose.plume.opacity);
            // Stretch along the painted engine axis, not the diagonal image's Y axis.
            const offset = HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG;
            plume.style.transform = `rotate(${offset}deg) scaleY(${pose.plume.scaleY}) rotate(${-offset}deg)`;
            if (smokeRef.current)
                smokeRef.current.style.transform = `translate3d(${plan.land.x}px, ${plan.land.y + 12}px, 0)`;
            const smokeTime = (elapsed - HOURLY_ROCKET_FLIGHT_MS * 0.90) / 1000;
            smokeRef.current?.querySelectorAll<HTMLElement>("[data-smoke]").forEach((puff, i) => {
                const age = smokeTime - (i % 6) * 0.09;
                const life = clamp01(age / 1.65);
                const side = i % 2 === 0 ? -1 : 1;
                puff.style.opacity = String(age > 0 ? Math.sin(Math.PI * life) * 0.25 : 0);
                puff.style.transform = `translate3d(${side * life * (45 + i * 4)}px, ${-life * (9 + i % 4 * 6)}px, 0) scale(${0.25 + life * 2.2})`;
            });
            if (elapsed < HOURLY_ROCKET_FLIGHT_MS + 1800) {
                rafRef.current = window.requestAnimationFrame(tick);
                return;
            }
            finish();
        };
        rafRef.current = window.requestAnimationFrame(tick);
        return () => {
            window.cancelAnimationFrame(rafRef.current);
            if (logo)
                logo.style.opacity = previousOpacity;
            window.removeEventListener("resize", finish);
            window.removeEventListener("scroll", finish);
            document.removeEventListener("visibilitychange", onVisibility);
            motion.removeEventListener("change", finish);
        };
    }, [home]);
    if (!home)
        return null;
    return (<div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      <div ref={smokeRef} className="absolute" style={{ left: home.x, top: home.y }}>
        {Array.from({ length: 12 }, (_, i) => (<span key={i} data-smoke className="absolute rounded-full bg-gray-300 blur-md" style={{ width: 24 + i % 3 * 8, height: 16 + i % 3 * 6, marginLeft: -12, opacity: 0, willChange: "transform, opacity" }}/>))}
      </div>
      <div ref={craftRef} className="absolute" style={{
            left: home.x,
            top: home.y,
            width: CRAFT_W,
            height: CRAFT_H,
            marginLeft: -CRAFT_W / 2,
            marginTop: -CRAFT_H / 2,
            transform: "translate3d(0, 0, 0) rotate(0deg)",
            opacity: 0,
            willChange: "transform, opacity",
        }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- overlay sprite, not a content image */}
        <img ref={plumeRef} src="/images/launchpad/hourly-rocket-plume.webp" alt="" width={CRAFT_W} height={CRAFT_H} className="absolute inset-0 h-full w-full object-contain" style={{ transformOrigin: "52% 38%", opacity: 1, transform: "scaleY(1)" }}/>
        {/* eslint-disable-next-line @next/next/no-img-element -- overlay sprite, not a content image */}
        <img src="/images/launchpad/hourly-rocket-body.webp" alt="" width={CRAFT_W} height={CRAFT_H} className="absolute inset-0 h-full w-full object-contain"/>
      </div>
    </div>);
}
