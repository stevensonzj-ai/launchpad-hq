import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
  chicagoHourKey,
  craftPad,
  decideHourlyRocketLaunch,
  createRocketFlightPlan,
  HOURLY_ROCKET_CRAFT,
  HOURLY_ROCKET_FLIGHT_MS,
  HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG,
  headingDeg,
  HOURLY_ROCKET_STORAGE_KEY,
  isChicagoTopOfHour,
  isRocketDemo,
  isRocketPreview,
  readLastPlayedHourKey,
  LANDING_ATTITUDE_START,
  ROCKET_MIN_SETTLE_PX,
  ROCKET_PHASE,
  rocketPoseAt,
  shortestAngleDelta,
  shouldLaunchHourlyRocket,
  writeLastPlayedHourKey,
} from "./hourly-rocket";

const PAD = craftPad(HOURLY_ROCKET_CRAFT);

function assertCraftInside(
  home: { x: number; y: number },
  pose: { x: number; y: number },
  viewport: { width: number; height: number },
) {
  const x = home.x + pose.x;
  const y = home.y + pose.y;
  assert.ok(x >= PAD - 0.5, `x ${x} < pad ${PAD}`);
  assert.ok(y >= PAD - 0.5, `y ${y} < pad ${PAD}`);
  assert.ok(x <= viewport.width - PAD + 0.5, `x ${x} > ${viewport.width - PAD}`);
  assert.ok(y <= viewport.height - PAD + 0.5, `y ${y} > ${viewport.height - PAD}`);
}

describe("hourly rocket timing (US Central)", () => {
  it("treats the first seconds of a Chicago hour as top-of-hour", () => {
    // 2026-10-17 12:00:00 CDT = 17:00:00 UTC
    const top = new Date("2026-10-17T17:00:00.000Z");
    const still = new Date("2026-10-17T17:00:09.000Z");
    const late = new Date("2026-10-17T17:00:10.000Z");
    const previous = new Date("2026-10-17T16:59:59.000Z");
    assert.equal(isChicagoTopOfHour(top), true);
    assert.equal(isChicagoTopOfHour(still), true);
    assert.equal(isChicagoTopOfHour(late), false);
    assert.equal(isChicagoTopOfHour(previous), false);
    assert.equal(chicagoHourKey(top), "2026-10-17T12");
    assert.equal(chicagoHourKey(previous), "2026-10-17T11");
  });

  it("uses Central Standard Time after the fall-back", () => {
    // 2026-11-01 12:00:00 CST = 18:00:00 UTC
    const top = new Date("2026-11-01T18:00:00.000Z");
    assert.equal(isChicagoTopOfHour(top), true);
    assert.equal(chicagoHourKey(top), "2026-11-01T12");
  });
});

describe("hourly rocket once-per-hour storage", () => {
  it("launches once per Chicago hour and persists the hour key", () => {
    const memory: Record<string, string> = {};
    const storage = {
      getItem(key: string) {
        return memory[key] ?? null;
      },
      setItem(key: string, value: string) {
        memory[key] = value;
      },
    };

    const now = new Date("2026-10-17T17:00:02.000Z");
    const hourKey = chicagoHourKey(now);
    assert.equal(shouldLaunchHourlyRocket(now, readLastPlayedHourKey(storage)), true);
    writeLastPlayedHourKey(storage, hourKey);
    assert.equal(shouldLaunchHourlyRocket(now, readLastPlayedHourKey(storage)), false);

    const nextHour = new Date("2026-10-17T18:00:02.000Z");
    assert.equal(shouldLaunchHourlyRocket(nextHour, readLastPlayedHourKey(storage)), true);
  });

  it("does not launch away from the top of the hour even with empty storage", () => {
    const mid = new Date("2026-10-17T17:30:00.000Z");
    assert.equal(shouldLaunchHourlyRocket(mid, null), false);
  });
});

describe("hourly rocket preview query", () => {
  it("treats only rocket=1 as a preview trigger", () => {
    assert.equal(isRocketPreview("?rocket=1"), true);
    assert.equal(isRocketPreview("rocket=1"), true);
    assert.equal(isRocketPreview("?q=tools&rocket=1"), true);
    assert.equal(isRocketPreview(""), false);
    assert.equal(isRocketPreview("?rocket=true"), false);
    assert.equal(isRocketPreview("?rocket=0"), false);
    assert.equal(isRocketPreview("?rocket=demo"), false);
    assert.equal(isRocketDemo("?rocket=demo"), true);
    assert.equal(isRocketDemo("rocket=demo"), true);
    assert.equal(isRocketDemo("?rocket=1"), false);
    assert.equal(isRocketDemo(""), false);
  });

  it("launches on ?rocket=demo ignoring hour and storage and does not mark storage", () => {
    const memory: Record<string, string> = {
      [HOURLY_ROCKET_STORAGE_KEY]: "2026-10-17T12",
    };
    const storage = {
      getItem(key: string) {
        return memory[key] ?? null;
      },
      setItem(key: string, value: string) {
        memory[key] = value;
      },
    };
    const midHour = new Date("2026-10-17T17:30:00.000Z");
    const decision = decideHourlyRocketLaunch({
      now: midHour,
      lastPlayedHourKey: readLastPlayedHourKey(storage),
      search: "?rocket=demo",
    });
    assert.deepEqual(decision, { launch: true, persistHourKey: false });
    if (decision.persistHourKey) {
      writeLastPlayedHourKey(storage, chicagoHourKey(midHour));
    }
    assert.equal(memory[HOURLY_ROCKET_STORAGE_KEY], "2026-10-17T12");
  });

  it("launches on ?rocket=1 ignoring hour and storage and does not mark storage", () => {
    const memory: Record<string, string> = {
      [HOURLY_ROCKET_STORAGE_KEY]: "2026-10-17T12",
    };
    const storage = {
      getItem(key: string) {
        return memory[key] ?? null;
      },
      setItem(key: string, value: string) {
        memory[key] = value;
      },
    };
    const midHour = new Date("2026-10-17T17:30:00.000Z");
    const last = readLastPlayedHourKey(storage);
    const decision = decideHourlyRocketLaunch({
      now: midHour,
      lastPlayedHourKey: last,
      search: "?rocket=1",
    });
    assert.deepEqual(decision, { launch: true, persistHourKey: false });
    assert.equal(decision.persistHourKey, false);
    if (decision.persistHourKey) {
      writeLastPlayedHourKey(storage, chicagoHourKey(midHour));
    }
    assert.equal(memory[HOURLY_ROCKET_STORAGE_KEY], "2026-10-17T12");
  });

  it("keeps normal gating when the preview param is absent", () => {
    const mid = new Date("2026-10-17T17:30:00.000Z");
    const top = new Date("2026-10-17T17:00:02.000Z");
    assert.deepEqual(
      decideHourlyRocketLaunch({
        now: mid,
        lastPlayedHourKey: null,
        search: "?q=writing",
      }),
      { launch: false, persistHourKey: false },
    );
    assert.deepEqual(
      decideHourlyRocketLaunch({
        now: top,
        lastPlayedHourKey: null,
        search: "",
      }),
      { launch: true, persistHourKey: true },
    );
    assert.deepEqual(
      decideHourlyRocketLaunch({
        now: top,
        lastPlayedHourKey: chicagoHourKey(top),
        search: "",
      }),
      { launch: false, persistHourKey: false },
    );
  });
});

describe("hourly rocket flight path", () => {
  const home = { x: 48, y: 28 };
  const viewport = { width: 1280, height: 800 };

  it("uses a 7.5s shared duration", () => {
    assert.equal(HOURLY_ROCKET_FLIGHT_MS, 7500);
  });

  it("keeps one oval circuit and stays inside the viewport", () => {
    const plan = createRocketFlightPlan(home, { x: 520, y: 360 }, viewport);
    assert.ok(plan.sweep > Math.PI * 1.15);
    assert.ok(plan.sweep < Math.PI * 2.16);
    for (let i = 0; i <= 80; i++) {
      assertCraftInside(home, rocketPoseAt(plan, i / 80), viewport);
    }
  });

  it("is C0/C1: fine steps stay small and headings do not flip", () => {
    const plan = createRocketFlightPlan(home, { x: 400, y: 380 }, viewport);
    let maxStep = 0;
    let maxAngle = 0;
    let prev = rocketPoseAt(plan, 0);
    for (let i = 1; i <= 400; i++) {
      const pose = rocketPoseAt(plan, i / 400);
      const step = Math.hypot(pose.x - prev.x, pose.y - prev.y);
      const turn = Math.abs(shortestAngleDelta(prev.angle, pose.angle));
      if (step > maxStep) maxStep = step;
      if (turn > maxAngle) maxAngle = turn;
      prev = pose;
    }
    assert.ok(maxStep < 28, `position step ${maxStep}px`);
    assert.ok(maxAngle < 18, `heading step ${maxAngle}deg`);
  });

  it("starts descent from the hover point the approach actually reached", () => {
    const plan = createRocketFlightPlan(home, { x: 400, y: 380 }, viewport);
    const hover = rocketPoseAt(plan, ROCKET_PHASE.hoverEnd);
    const descentStart = rocketPoseAt(plan, ROCKET_PHASE.hoverEnd + 1e-6);
    const land = rocketPoseAt(plan, 1);
    assert.equal(hover.phase, "hover");
    assert.equal(rocketPoseAt(plan, ROCKET_PHASE.hoverEnd - 1e-4).phase, "hover");
    assert.ok(Math.abs(hover.x - plan.hover.x) < 1);
    assert.ok(Math.abs(hover.y - plan.hover.y) < 1);
    assert.ok(Math.abs(descentStart.x - hover.x) < 0.6);
    assert.ok(Math.abs(descentStart.y - hover.y) < 0.6);
    assert.ok(plan.hover.y < plan.land.y);
    assert.ok(plan.approach.y > plan.hover.y);
    assert.ok(Math.abs(land.x - plan.land.x) < 1);
    assert.ok(Math.abs(land.y - plan.land.y) < 1);
    assert.ok(
      Math.abs(land.angle + HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG) < 1,
      `land render ${land.angle} should be nose-up (−offset)`,
    );
    assert.ok(land.plume.opacity < 0.05);
  });

  it("scales the oval to a phone viewport and stays on screen", () => {
    const phoneHome = { x: 28, y: 24 };
    const phone = { width: 390, height: 844 };
    const plan = createRocketFlightPlan(phoneHome, { x: 160, y: 420 }, phone);
    for (let i = 0; i <= 60; i++) {
      assertCraftInside(phoneHome, rocketPoseAt(plan, i / 60), phone);
    }
  });

  it("loops and lands back at header home when there is no booking target", () => {
    const plan = createRocketFlightPlan(home, { x: 0, y: 0 }, viewport);
    const land = rocketPoseAt(plan, 1);
    assert.ok(Math.abs(home.x + plan.land.x - Math.max(PAD, home.x)) < 1);
    assert.ok(Math.abs(home.y + plan.land.y - Math.max(PAD, home.y)) < 1);
    assert.ok(Math.hypot(plan.hover.x - plan.land.x, plan.hover.y - plan.land.y) >= ROCKET_MIN_SETTLE_PX);
    assert.ok(Math.abs(land.x - plan.land.x) < 1);
    assert.ok(Math.abs(land.y - plan.land.y) < 1);
  });

  for (const [label, headerHome, view] of [
    ["desktop", { x: 272, y: 30 }, { width: 1280, height: 800 }],
    ["phone", { x: 272, y: 30 }, { width: 390, height: 844 }],
  ] as const) {
    it(`keeps the full craft on screen for header-home ${label} and shows a visible settle`, () => {
      const plan = createRocketFlightPlan(headerHome, { x: 0, y: 0 }, view);
      const hover = rocketPoseAt(plan, ROCKET_PHASE.hoverEnd);
      const land = rocketPoseAt(plan, 1);
      const settle = Math.hypot(hover.x - land.x, hover.y - land.y);

      assertCraftInside(headerHome, hover, view);
      assertCraftInside(headerHome, land, view);
      assert.ok(settle >= ROCKET_MIN_SETTLE_PX, `settle ${settle}px`);

      const stepMs = 50;
      for (let ms = 0; ms <= HOURLY_ROCKET_FLIGHT_MS; ms += stepMs) {
        assertCraftInside(headerHome, rocketPoseAt(plan, ms / HOURLY_ROCKET_FLIGHT_MS), view);
      }
    });
  }

  /**
   * Nose vs finite-difference travel. 25° when moving, on takeoff / loop /
   * mid-approach. The loop-exit hermite (first 22% of approach) and the
   * landing-attitude blend are excluded: the nose is rate-limited there so it
   * does not snap, then pitches up for hover.
   */
  const HEADING_ALIGN_DEG = 25;
  const HEADING_MIN_STEP_PX = 2.5;
  const HEADING_SNAP_DEG = 36;

  function assertHeadingTracksPath(
    home: { x: number; y: number },
    land: { x: number; y: number },
    view: { width: number; height: number },
    label: string,
  ) {
    const plan = createRocketFlightPlan(home, land, view);
    const stepMs = 25;
    let prev = rocketPoseAt(plan, 0);
    let maxTurn = 0;
    for (let ms = stepMs; ms <= HOURLY_ROCKET_FLIGHT_MS; ms += stepMs) {
      const pose = rocketPoseAt(plan, ms / HOURLY_ROCKET_FLIGHT_MS);
      const dx = pose.x - prev.x;
      const dy = pose.y - prev.y;
      const step = Math.hypot(dx, dy);
      const turn = Math.abs(shortestAngleDelta(prev.angle, pose.angle));
      if (turn > maxTurn) maxTurn = turn;
      const midT = (ms - stepMs / 2) / HOURLY_ROCKET_FLIGHT_MS;
      const approachS =
        midT < ROCKET_PHASE.loopEnd
          ? 0
          : (midT - ROCKET_PHASE.loopEnd) /
            (ROCKET_PHASE.approachEnd - ROCKET_PHASE.loopEnd);
      const flying =
        midT < ROCKET_PHASE.loopEnd ||
        (midT < ROCKET_PHASE.approachEnd &&
          approachS >= 0.22 &&
          approachS < LANDING_ATTITUDE_START);
      if (flying && step >= HEADING_MIN_STEP_PX) {
        const travel = headingDeg(dx, dy);
        const renderedNose = pose.angle + HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG;
        const err = Math.abs(shortestAngleDelta(renderedNose, travel));
        assert.ok(
          err < HEADING_ALIGN_DEG,
          `${label} t=${ms}ms rendered nose ${renderedNose.toFixed(1)} vs travel ${travel.toFixed(1)} (err ${err.toFixed(1)}°)`,
        );
      }
      if (midT >= ROCKET_PHASE.approachEnd) {
        assert.ok(
          Math.abs(pose.angle + HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG) < 1,
          `${label} hover/land should render nose-up; angle ${pose.angle}`,
        );
      }
      prev = pose;
    }
    assert.ok(maxTurn < HEADING_SNAP_DEG, `${label} heading step ${maxTurn}deg`);
  }

  it("points the nose along travel for header-home and sponsor-target flights", () => {
    assertHeadingTracksPath({ x: 272, y: 30 }, { x: 0, y: 0 }, viewport, "header-home");
    assertHeadingTracksPath(home, { x: 400, y: 380 }, viewport, "sponsor-target");
    assertHeadingTracksPath(
      { x: 72, y: 40 },
      { x: 0, y: 0 },
      { width: 1080, height: 920 },
      "narrow-home",
    );
  });
});

describe("hourly rocket public sprites bypass Clerk matcher", () => {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  const componentPath = path.join(repoRoot, "src/components/sponsors/hourly-rocket.tsx");
  const proxyPath = path.join(repoRoot, "src/proxy.ts");

  function spritePathsFromComponent(source: string): string[] {
    const paths = [...source.matchAll(/src=["'](\/images\/[^"']+)["']/g)].map((m) => m[1]);
    assert.ok(paths.length > 0, "hourly-rocket.tsx must reference at least one /images sprite");
    return paths;
  }

  function matcherExtensionsFromProxy(source: string): Set<string> {
    const start = source.indexOf("\\\\.(?:");
    assert.ok(start >= 0, "src/proxy.ts matcher must contain a static-extension exclusion group");
    const innerStart = start + "\\\\.(?:".length;
    let depth = 1;
    let i = innerStart;
    while (i < source.length && depth > 0) {
      if (source[i] === "(") depth += 1;
      else if (source[i] === ")") depth -= 1;
      if (depth > 0) i += 1;
    }
    assert.ok(depth === 0, "src/proxy.ts matcher extension group must be balanced");
    const inner = source.slice(innerStart, i);
    const tokens = inner
      .split("|")
      .map((token) => token.replace(/\(\?!on\)/g, "").replace(/[?\\]/g, ""))
      .filter(Boolean);
    assert.ok(tokens.includes("png"), "parsed matcher extensions should include known png token");
    return new Set(tokens);
  }

  it("ships both referenced sprite files under public/", () => {
    const source = readFileSync(componentPath, "utf8");
    const spritePaths = spritePathsFromComponent(source);
    assert.ok(
      spritePaths.includes("/images/launchpad/hourly-rocket-body.webp"),
      "body sprite path must stay referenced",
    );
    assert.ok(
      spritePaths.includes("/images/launchpad/hourly-rocket-plume.webp"),
      "plume sprite path must stay referenced",
    );
    for (const spritePath of spritePaths) {
      const onDisk = path.join(repoRoot, "public", spritePath.replace(/^\//, ""));
      assert.equal(existsSync(onDisk), true, `missing public asset: ${spritePath}`);
    }
  });

  it("excludes every hourly-rocket asset extension in the Clerk matcher", () => {
    const componentSource = readFileSync(componentPath, "utf8");
    const proxySource = readFileSync(proxyPath, "utf8");
    const spritePaths = spritePathsFromComponent(componentSource);
    const extensions = matcherExtensionsFromProxy(proxySource);

    assert.ok(extensions.has("webp"), "matcher exclusion group must include webp");
    assert.ok(extensions.has("avif"), "matcher exclusion group must include avif");

    for (const spritePath of spritePaths) {
      const ext = path.extname(spritePath).replace(/^\./, "").toLowerCase();
      assert.ok(ext, `sprite path must have an extension: ${spritePath}`);
      assert.ok(
        extensions.has(ext),
        `src/proxy.ts matcher must exclude .${ext} (referenced by ${spritePath}); parsed=${[...extensions].join(",")}`,
      );
    }
  });
});
