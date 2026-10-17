import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  chicagoHourKey,
  decideHourlyRocketLaunch,
  HOURLY_ROCKET_FLIGHT_MS,
  HOURLY_ROCKET_LOOP_SAMPLES,
  HOURLY_ROCKET_STORAGE_KEY,
  isChicagoTopOfHour,
  isRocketDemo,
  isRocketPreview,
  readLastPlayedHourKey,
  rocketLoopFlight,
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
  it("uses a 7.5s shared duration", () => {
    assert.equal(HOURLY_ROCKET_FLIGHT_MS, 7500);
  });

  it("samples one continuous oval circuit inside the viewport", () => {
    const home = { x: 48, y: 28 };
    const viewport = { width: 1280, height: 800 };
    const inset = 8;
    const path = rocketLoopFlight(home, { x: 520, y: 360 }, viewport);

    assert.equal(path.loop.length, HOURLY_ROCKET_LOOP_SAMPLES + 1);
    const cx = viewport.width / 2 - home.x;
    const cy = viewport.height / 2 - home.y;
    let signed = 0;
    for (let i = 1; i < path.loop.length; i++) {
      const a0 = Math.atan2(path.loop[i - 1].y - cy, path.loop[i - 1].x - cx);
      const a1 = Math.atan2(path.loop[i].y - cy, path.loop[i].x - cx);
      let d = a1 - a0;
      if (d > Math.PI) d -= Math.PI * 2;
      if (d < -Math.PI) d += Math.PI * 2;
      signed += d;
      assert.ok(Math.abs(d) < 0.6, "loop steps stay small and curved");
    }
    assert.ok(Math.abs(signed) > Math.PI * 1.85, "one long circuit, not a short arc");
    assert.ok(Math.abs(signed) < Math.PI * 2.15, "exactly one oval, not a double loop");

    for (const point of [...path.loop, path.takeoff, path.approach, path.hover, path.land]) {
      assert.ok(home.x + point.x >= inset - 0.01);
      assert.ok(home.y + point.y >= inset - 0.01);
      assert.ok(home.x + point.x <= viewport.width - inset + 0.01);
      assert.ok(home.y + point.y <= viewport.height - inset + 0.01);
    }
  });

  it("overshoots above the pad after approaching from below, then lands on the pad", () => {
    const home = { x: 48, y: 28 };
    const path = rocketLoopFlight(home, { x: 400, y: 380 }, { width: 1280, height: 800 });
    assert.ok(Math.abs(path.hover.x - path.land.x) < 2);
    assert.ok(path.hover.y < path.land.y);
    assert.ok(path.approach.y > path.hover.y);
    assert.ok(path.approach.y >= path.land.y - 8);
    const hoverFrame = path.frames.find((frame) => frame.pct === 82);
    const lingerFrame = path.frames.find((frame) => frame.pct === 86);
    const settleFrame = path.frames.find((frame) => frame.pct === 100);
    assert.ok(hoverFrame && lingerFrame && settleFrame);
    assert.equal(hoverFrame.y, lingerFrame.y);
    assert.equal(hoverFrame.rotate, 0);
    assert.equal(settleFrame.x, path.land.x);
    assert.equal(settleFrame.y, path.land.y);
  });

  it("scales the oval to a phone viewport and stays on screen", () => {
    const home = { x: 28, y: 24 };
    const viewport = { width: 390, height: 844 };
    const inset = 8;
    const path = rocketLoopFlight(home, { x: 160, y: 420 }, viewport);
    for (const point of [...path.loop, path.takeoff, path.approach, path.hover, path.land]) {
      assert.ok(home.x + point.x >= inset - 0.01);
      assert.ok(home.y + point.y >= inset - 0.01);
      assert.ok(home.x + point.x <= viewport.width - inset + 0.01);
      assert.ok(home.y + point.y <= viewport.height - inset + 0.01);
    }
  });

  it("loops and lands back at header home when there is no booking target", () => {
    const home = { x: 48, y: 28 };
    const path = rocketLoopFlight(home, { x: 0, y: 0 }, { width: 1280, height: 800 });
    assert.ok(Math.abs(path.land.x) < 1);
    assert.ok(Math.abs(path.land.y) < 1);
    assert.ok(path.hover.y < path.land.y, "hover still sits above header home");
    assert.ok(path.takeoff.y < path.land.y);
  });
});
