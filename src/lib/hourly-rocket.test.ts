import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SponsoredSpotlight } from "../components/sponsors/sponsored-spotlight";
import { ROCKET_DEMO_PLACEMENT } from "../data/sponsors/rocket-demo";
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
  ROCKET_MIN_SETTLE_PX,
  ROCKET_PHASE,
  ROCKET_APPROACH_PITCH_MS,
  rocketPoseAt,
  rocketDetachAt,
  rocketImageLandingTarget,
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
  it("marks only the sponsor image as the landing target for regular and demo cards", () => {
    for (const badge of [undefined, "Sponsored — demo"]) {
      const html = renderToStaticMarkup(createElement(SponsoredSpotlight, { placement: ROCKET_DEMO_PLACEMENT, badge }));
      const markedTags = html.match(/<[^>]*data-hourly-rocket-target[^>]*>/g) ?? [];
      assert.equal(markedTags.length, 1);
      assert.match(markedTags[0], /^<img\s/);
      assert.ok(markedTags[0].includes(`src="${ROCKET_DEMO_PLACEMENT.logoUrl}"`));
    }
  });
  for (const viewport of [{ width: 1280, height: 800 }, { width: 390, height: 844 }]) {
    it(`lands at the sponsor image top-center after a stationary hover and vertical drop (${viewport.width}px)`, () => {
      const home = { x: 32, y: 32 };
      const image = { left: 36, top: 400, width: 160, height: 84 };
      const target = rocketImageLandingTarget(image, viewport);
      assert.deepEqual(target, { x: 116, y: 400 });
      assert.ok(target);
      const plan = createRocketFlightPlan(home, { x: target.x - home.x, y: target.y - home.y }, viewport);
      const hover = rocketPoseAt(plan, ROCKET_PHASE.approachEnd);
      const endHover = rocketPoseAt(plan, ROCKET_PHASE.hoverEnd);
      assert.equal(hover.x + home.x, target.x);
      assert.ok(hover.y + home.y <= target.y - ROCKET_MIN_SETTLE_PX);
      assert.equal(endHover.y, hover.y);
      let previousY = hover.y;
      for (let i = 0; i <= 100; i++) {
        const pose = rocketPoseAt(plan, ROCKET_PHASE.hoverEnd + (1 - ROCKET_PHASE.hoverEnd) * i / 100);
        assert.equal(pose.x + home.x, target.x, "drop must remain centered over image");
        assert.ok(pose.y >= previousY);
        previousY = pose.y;
      }
      const final = rocketPoseAt(plan, 1);
      assert.deepEqual({ x: final.x + home.x, y: final.y + home.y }, target);
      assert.equal(plan.returnsHome, false);
    });
  }
  it("rejects missing, hidden, offscreen or unsafe image targets so flight can return home", () => {
    const viewport = { width: 390, height: 844 };
    for (const rect of [null,
      { left: 36, top: 400, width: 0, height: 84 },
      { left: 36, top: 900, width: 160, height: 84 },
      { left: -200, top: 400, width: 160, height: 84 },
      { left: 36, top: -20, width: 160, height: 84 },
      { left: 36, top: 100, width: 160, height: 84 },
    ]) assert.equal(rocketImageLandingTarget(rect, viewport), null);
    const homePlan = createRocketFlightPlan({x:32,y:32}, {x:0,y:0}, viewport);
    assert.equal(homePlan.returnsHome, true);
  });
  it("detaches at the exact logo center without thrust and ignites before joining the flight", () => {
    const plan = createRocketFlightPlan({x:32,y:32},{x:0,y:0},{width:390,height:844});
    const start = rocketDetachAt(plan,0);
    assert.equal(start.x,0);
    assert.equal(start.y,0);
    assert.equal(start.artwork,0);
    assert.equal(start.ignition,0);
    assert.equal(rocketDetachAt(plan,0.6).ignition,0);
    let previous = start;
    for(let i=1;i<=200;i++) {
      const pose=rocketDetachAt(plan,i/200);
      assert.ok(pose.y>=previous.y,"gravity drop must not reverse before ignition");
      assert.ok(Math.hypot(pose.x-previous.x,pose.y-previous.y)<3);
      assert.ok(Math.abs(shortestAngleDelta(previous.angle, pose.angle)) < 1, "detachment pitch must ease");
      previous=pose;
    }
    const flight = rocketPoseAt(plan,0);
    assert.ok(Math.hypot(previous.x-flight.x,previous.y-flight.y)<0.001);
    assert.ok(Math.abs(previous.angle-flight.angle)<0.001);
    assert.equal(previous.scale,1);
    assert.equal(previous.ignition,1);
    assert.equal(previous.artwork,1);
  });
  it("allows time for braking and a deliberate descent", () => {
    assert.equal(HOURLY_ROCKET_FLIGHT_MS, 9500);
  });
  for (const [label, home, target, viewport] of [
    ["desktop home", { x: 272, y: 30 }, { x: 0, y: 0 }, { width: 1280, height: 800 }],
    ["phone home", { x: 28, y: 24 }, { x: 0, y: 0 }, { width: 390, height: 844 }],
    ["desktop sponsor", { x: 48, y: 28 }, { x: 520, y: 360 }, { width: 1280, height: 800 }],
    ["phone sponsor", { x: 28, y: 24 }, { x: 160, y: 420 }, { width: 390, height: 844 }],
    ["right sponsor", { x: 72, y: 40 }, { x: 900, y: 380 }, { width: 1080, height: 920 }],
    ["short viewport", { x: 28, y: 24 }, { x: 0, y: 0 }, { width: 568, height: 320 }],
  ] as const) {
    it(`${label}: stays on screen, cruises nose-first, leans through approach, descends vertically`, () => {
      const plan = createRocketFlightPlan(home, target, viewport);
      let previous = rocketPoseAt(plan, 0);
      for (let i = 1; i <= 1900; i++) {
        const t = i / 1900, pose = rocketPoseAt(plan, t);
        assertCraftInside(home, pose, viewport);
        const dx = pose.x - previous.x, dy = pose.y - previous.y;
        const step = Math.hypot(dx, dy);
        assert.ok(step < 10, `position discontinuity: ${step}`);
        assert.ok(Math.abs(shortestAngleDelta(previous.angle, pose.angle)) < 2, "attitude discontinuity on any flight leg");
        const next = rocketPoseAt(plan, Math.min(1, t + 1 / 1900));
        const horizontalTravel = next.x - previous.x;
        if (Math.abs(horizontalTravel) > 0.02) {
          const noseX = Math.sin((pose.angle + HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG) * Math.PI / 180);
          assert.equal(Math.sign(noseX), Math.sign(horizontalTravel), `heading must lean into horizontal travel at ${t}`);
        }
        if (t < ROCKET_PHASE.loopEnd && step > 0.01) {
          const error = Math.abs(shortestAngleDelta(pose.angle + HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG, headingDeg(dx, dy)));
          assert.ok(error < 3, `nose alignment error ${error} at ${t}`);
        }
        if (t >= ROCKET_PHASE.loopEnd && t < ROCKET_PHASE.approachEnd) {
          assert.ok(Math.abs(shortestAngleDelta(previous.angle, pose.angle)) < 2,
            `approach pitch must ease, not snap: ${t}`);
          if (t >= ROCKET_PHASE.loopEnd + ROCKET_APPROACH_PITCH_MS / HOURLY_ROCKET_FLIGHT_MS) {
            const lean = shortestAngleDelta(0, pose.angle + HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG);
            assert.ok(Math.abs(lean) <= 20.001, "landing lean stays within 20 degrees");
            if (Math.abs(dx) > 0.01) {
              assert.equal(Math.sign(lean), Math.sign(dx), "lean follows sideways travel");
              assert.ok(Math.abs(lean) > 0.1, "must not freeze upright while translating");
            }
          }
        }
        if (t >= ROCKET_PHASE.approachEnd) {
          assert.ok(Math.abs(pose.angle + HOURLY_ROCKET_SPRITE_NOSE_OFFSET_DEG) < 0.001);
          assert.ok(Math.abs(pose.x - plan.land.x) < 0.001, "no sideways drift in hover/descent");
          assert.ok(dy >= -0.001, "landing must descend tail-first");
        }
        previous = pose;
      }
      assert.ok(plan.land.y - plan.hover.y >= ROCKET_MIN_SETTLE_PX);
      assert.deepEqual({ x: previous.x, y: previous.y }, plan.land);
      assert.equal(previous.plume.opacity, 0);
      assert.equal(previous.plume.scaleY, 0);
      const hover = rocketPoseAt(plan, ROCKET_PHASE.hoverEnd);
      assert.equal(hover.phase, "hover");
      assert.ok(Math.hypot(hover.x - plan.hover.x, hover.y - plan.hover.y) < 0.001);
    });
  }
  it("throttles and flickers during flight without negative exhaust dimensions", () => {
    const plan = createRocketFlightPlan({ x: 48, y: 28 }, { x: 0, y: 0 }, { width: 1280, height: 800 });
    const scales = new Set<number>();
    for (let i = 0; i <= 1000; i++) {
      const plume = rocketPoseAt(plan, i / 1000).plume;
      assert.ok(plume.opacity >= 0 && plume.opacity <= 1);
      assert.ok(plume.scaleY >= 0 && plume.scaleY <= 1.6);
      scales.add(plume.scaleY);
    }
    assert.ok(scales.size > 900);
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
