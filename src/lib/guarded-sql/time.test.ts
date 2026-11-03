import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatChicagoTimestamp } from "./time";
import { parseEndpointId } from "./endpoint";

describe("formatChicagoTimestamp", () => {
  it("uses -06:00 in standard time (after DST ends)", () => {
    assert.equal(formatChicagoTimestamp(new Date("2026-11-03T16:20:00Z")), "2026-11-03T10:20:00-06:00");
  });
  it("uses -05:00 in daylight time", () => {
    assert.equal(formatChicagoTimestamp(new Date("2026-07-01T17:00:05Z")), "2026-07-01T12:00:05-05:00");
  });
  it("handles the DST boundaries", () => {
    // 2026-11-01 06:59:59Z is still CDT; 07:00:00Z is CST.
    assert.equal(formatChicagoTimestamp(new Date("2026-11-01T06:59:59Z")), "2026-11-01T01:59:59-05:00");
    assert.equal(formatChicagoTimestamp(new Date("2026-11-01T07:00:00Z")), "2026-11-01T01:00:00-06:00");
  });
  it("drops sub-second precision and keeps midnight as 00", () => {
    assert.equal(formatChicagoTimestamp(new Date("2026-01-15T06:00:00.999Z")), "2026-01-15T00:00:00-06:00");
  });
});

describe("parseEndpointId", () => {
  it("returns the first label, minus -pooler", () => {
    assert.equal(parseEndpointId("postgresql://u:p@ep-fake-prod-test000-pooler.us-east-2.aws.neon.tech/db"), "ep-fake-prod-test000");
    assert.equal(parseEndpointId("postgresql://u:p@ep-abc-123.c-2.us-east-2.aws.neon.tech/db?sslmode=require"), "ep-abc-123");
  });
  it("returns null for junk", () => {
    assert.equal(parseEndpointId("not a url"), null);
  });
});
