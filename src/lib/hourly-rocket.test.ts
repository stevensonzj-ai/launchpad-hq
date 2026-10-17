import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  chicagoHourKey,
  decideHourlyRocketLaunch,
  HOURLY_ROCKET_CRAFT,
  HOURLY_ROCKET_FLIGHT_MS,
  HOURLY_ROCKET_STORAGE_KEY,
  isChicagoTopOfHour,
  isRocketDemo,
  isRocketPreview,
  readLastPlayedHourKey,
  rocketHoverOffset,
  rocketTourOffsets,
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
  it("uses a 6.5s shared duration", () => {
    assert.equal(HOURLY_ROCKET_FLIGHT_MS, 6500);
  });

  it("clamps cruise waypoints so the craft stays inside the viewport", () => {
    const home = { x: 48, y: 28 };
    const mobile = rocketTourOffsets(home, { width: 375, height: 720 });
    const desktop = rocketTourOffsets(home, { width: 1280, height: 800 });
    const pad = Math.max(HOURLY_ROCKET_CRAFT.width, HOURLY_ROCKET_CRAFT.height) / 2 + 10;

    for (const tour of [mobile, desktop]) {
      for (const [x, y] of [
        [tour.x1, tour.y1],
        [tour.x2, tour.y2],
        [tour.x3, tour.y3],
      ] as const) {
        const absX = home.x + x;
        const absY = home.y + y;
        assert.ok(absX >= pad);
        assert.ok(absY >= pad);
        assert.ok(absX <= (tour === mobile ? 375 : 1280) - pad + 0.01);
        assert.ok(absY <= (tour === mobile ? 720 : 800) - pad + 0.01);
      }
    }
    assert.ok(desktop.x1 > mobile.x1);
    assert.ok(desktop.x1 > desktop.x2);
  });

  it("keeps the pre-descent hover inside the viewport", () => {
    const home = { x: 48, y: 28 };
    const hover = rocketHoverOffset(home, { x: 20, y: 40 }, { width: 375, height: 720 });
    assert.ok(home.y + hover.y >= 50);
    assert.ok(home.x + hover.x >= 50);
  });
});
