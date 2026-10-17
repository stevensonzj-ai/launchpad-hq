import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getSponsorCalendar, mondayOnOrBefore } from "./calendar";
import { PLACEMENTS } from "./placements";
import type { SponsorPlacement } from "./types";

describe("sponsor calendar derivation", () => {
  it("starts on the Monday of the current Chicago week and is all open when empty", () => {
    assert.equal(PLACEMENTS.length, 0);
    assert.equal(mondayOnOrBefore("2026-10-17"), "2026-10-12");
    const weeks = getSponsorCalendar(new Date("2026-10-17T17:00:00Z"), [], 8);
    assert.equal(weeks.length, 8);
    assert.equal(weeks[0].weekStart, "2026-10-12");
    assert.equal(weeks[1].weekStart, "2026-10-19");
    for (const week of weeks) {
      assert.equal(week.slots["discover-spotlight"], "open");
      assert.equal(week.slots["ai-of-the-week"], "open");
    }
  });

  it("marks a week booked from placements.ts, not a hand-edited list", () => {
    const booked: SponsorPlacement = {
      id: "cal-test",
      slot: "discover",
      startDate: "2026-10-19",
      endDate: "2026-10-25",
      sponsorName: "Test",
      logoUrl: "https://example.invalid/logo.png",
      headline: "H",
      blurb: "B",
      ctaUrl: "https://example.invalid/cta",
      ctaLabel: "Go",
    };
    const weeks = getSponsorCalendar(new Date("2026-10-17T17:00:00Z"), [booked], 3);
    assert.equal(weeks[0].slots["discover-spotlight"], "open");
    assert.equal(weeks[1].slots["discover-spotlight"], "booked");
    assert.equal(weeks[1].slots["ai-of-the-week"], "open");
  });
});
