import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  isFreeDisplayPlan,
  normalizePlans,
  paidStartingPrice,
  parsePricingProse,
  startingPriceLabel,
  type DisplayPlan,
} from "./pricing";

const plan = (price: string, name = "Plan", period = ""): DisplayPlan => ({ name, price, period, limits: "" });

describe("isFreeDisplayPlan", () => {
  it("does not treat sub-dollar prices as free", () => {
    for (const price of ["$0.01", "$0.048/image", "$0.04/M", "$0.5", "US$0.01 per credit", "€0.20", "£0.9/min"]) {
      assert.equal(isFreeDisplayPlan(plan(price)), false, price);
    }
  });

  it("treats zero prices and Free as free", () => {
    for (const price of ["$0", "$0/month", "$0.00", "Free", "free tier", "US$0", "€0"]) {
      assert.equal(isFreeDisplayPlan(plan(price)), true, price);
    }
    assert.equal(isFreeDisplayPlan(plan("", "Free")), true);
  });
});

describe("starting price for catalog-only prose", () => {
  it("never calls a usage-priced row Free", () => {
    for (const prose of ["US$0.01 per credit, pay as you go", "API: ~$0.048/image", "Together API $0.04/M tokens"]) {
      assert.notEqual(startingPriceLabel(parsePricingProse(prose)), "Free", prose);
    }
    assert.equal(startingPriceLabel(parsePricingProse("US$0.01 per credit")), "$0.01");
  });

  it("ranks sub-dollar paid amounts numerically", () => {
    const plans = [plan("$0.5", "B"), plan("$0.04/M", "A"), plan("$20", "C", "month")];
    assert.equal(paidStartingPrice(plans), "$0.04/M");
    assert.equal(startingPriceLabel([plan("Free", "Free"), ...plans]), "Free, from $0.04/M");
  });
});

describe("normalizePlans", () => {
  it("returns the table's rows with amount, currency, period and the page's starting price", () => {
    const rows: DisplayPlan[] = [
      { name: "Free", price: "$0", period: "month", limits: "10 a day" },
      { name: "Plus", price: "$8", period: "month", limits: "" },
      { name: "Team", price: "$25/user/month", period: "", limits: "" },
      { name: "API", price: "$0.048/image", period: "", limits: "" },
      { name: "Enterprise", price: "Custom", period: "", limits: "" },
    ];
    const out = normalizePlans(rows);
    assert.deepEqual(out.plans[0], {
      name: "Free",
      price_text: "$0/month",
      amount: 0,
      currency: "USD",
      period: null,
      limits: "10 a day",
      is_free: true,
    });
    assert.deepEqual(
      out.plans.slice(1).map((p) => [p.amount, p.currency, p.period, p.is_free]),
      [
        [8, "USD", "month", false],
        [25, "USD", "seat_month", false],
        [0.048, "USD", "usage", false],
        [null, null, null, false],
      ],
    );
    assert.equal(out.starting_price, startingPriceLabel(rows));
    assert.equal(out.lowest_paid?.name, "API");
  });

  it("reads euro and pound prices", () => {
    const out = normalizePlans([plan("€9", "Pro", "month"), plan("£90", "Pro yearly", "year")]);
    assert.deepEqual(out.plans.map((p) => [p.currency, p.period]), [
      ["EUR", "month"],
      ["GBP", "year"],
    ]);
  });

  it("leaves day-based billing without a period instead of calling it usage", () => {
    const out = normalizePlans([plan("$13", "Teal+ 7-day", "7 days"), plan("$29", "Teal+ 30-day", "30 days")]);
    assert.deepEqual(out.plans.map((p) => [p.amount, p.period]), [
      [13, null],
      [29, null],
    ]);
  });
});
