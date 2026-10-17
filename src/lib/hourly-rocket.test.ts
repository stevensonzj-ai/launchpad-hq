import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  chicagoHourKey,
  decideHourlyRocketLaunch,
  createRocketFlightPlan,
  HOURLY_ROCKET_FLIGHT_MS,
  HOURLY_ROCKET_STORAGE_KEY,
  isChicagoTopOfHour,
  isRocketDemo,
  isRocketPreview,
  readLastPlayedHourKey,
  ROCKET_PHASE,
  rocketPoseAt,
  shortestAngleDelta,
  shouldLaunchHourlyRocket,
  writeLastPlayedHourKey,
} from "./hourly-rocket";

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
    const inset = 8;
    for (let i = 0; i <= 80; i++) {
      const pose = rocketPoseAt(plan, i / 80);
      assert.ok(home.x + pose.x >= inset - 0.5);
      assert.ok(home.y + pose.y >= inset - 0.5);
      assert.ok(home.x + pose.x <= viewport.width - inset + 0.5);
      assert.ok(home.y + pose.y <= viewport.height - inset + 0.5);
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
    assert.ok(Math.abs(land.angle) < 1);
    assert.ok(land.plume.opacity < 0.05);
  });

  it("scales the oval to a phone viewport and stays on screen", () => {
    const phoneHome = { x: 28, y: 24 };
    const phone = { width: 390, height: 844 };
    const plan = createRocketFlightPlan(phoneHome, { x: 160, y: 420 }, phone);
    const inset = 8;
    for (let i = 0; i <= 60; i++) {
      const pose = rocketPoseAt(plan, i / 60);
      assert.ok(phoneHome.x + pose.x >= inset - 0.5);
      assert.ok(phoneHome.y + pose.y >= inset - 0.5);
      assert.ok(phoneHome.x + pose.x <= phone.width - inset + 0.5);
      assert.ok(phoneHome.y + pose.y <= phone.height - inset + 0.5);
    }
  });

  it("loops and lands back at header home when there is no booking target", () => {
    const plan = createRocketFlightPlan(home, { x: 0, y: 0 }, viewport);
    const land = rocketPoseAt(plan, 1);
    assert.ok(Math.abs(plan.land.x) < 1);
    assert.ok(Math.abs(plan.land.y) < 1);
    assert.ok(plan.hover.y < plan.land.y);
    assert.ok(Math.abs(land.x) < 1);
    assert.ok(Math.abs(land.y) < 1);
  });
});
