import { test } from "node:test";
import assert from "node:assert/strict";
import type Stripe from "stripe";
import { processStripeEvent, type StripeRefs, type WebhookDeps } from "@/lib/stripe-webhook";

/** Fake deps over a fixed set of LaunchPad users; records every write. */
function fakeDeps(users: { id: string; customerId?: string; subscriptionId?: string }[]) {
  const writes: string[] = [];
  const deps: WebhookDeps = {
    async findUserId({ userId, customerId, subscriptionId }: StripeRefs) {
      const match =
        users.find((u) => userId && u.id === userId) ??
        users.find((u) => customerId && u.customerId === customerId) ??
        users.find((u) => subscriptionId && u.subscriptionId === subscriptionId);
      return match?.id ?? null;
    },
    async applySubscriptionState(userId, sub) {
      writes.push(`apply:${userId}:${sub.id}`);
    },
    async markPaymentFailed(userId) {
      writes.push(`failed:${userId}`);
    },
    async retrieveSubscription(id) {
      writes.push(`retrieve:${id}`);
      return { id, status: "active", metadata: {}, customer: "cus_lp" } as unknown as Stripe.Subscription;
    },
  };
  return { deps, writes };
}

function event(type: string, object: Record<string, unknown>): Stripe.Event {
  return { id: "evt_1", type, data: { object } } as unknown as Stripe.Event;
}

const LAUNCHPAD_USERS = [{ id: "user_lp", customerId: "cus_lp", subscriptionId: "sub_lp" }];

test("unknown customer: subscription update from another product is a no-op", async () => {
  const { deps, writes } = fakeDeps(LAUNCHPAD_USERS);
  const outcome = await processStripeEvent(
    event("customer.subscription.updated", {
      id: "sub_other",
      status: "active",
      customer: "cus_other",
      // Another product's own user id: must not be trusted on its own.
      metadata: { userId: "camerata_user_42" },
    }),
    deps,
  );
  assert.deepEqual(outcome, { handled: false, reason: "not-a-launchpad-event" });
  assert.deepEqual(writes, []);
});

test("unknown customer: foreign checkout session is ignored before any Stripe call", async () => {
  const { deps, writes } = fakeDeps(LAUNCHPAD_USERS);
  const outcome = await processStripeEvent(
    event("checkout.session.completed", {
      mode: "subscription",
      subscription: "sub_other",
      customer: "cus_other",
      metadata: {},
    }),
    deps,
  );
  assert.deepEqual(outcome, { handled: false, reason: "not-a-launchpad-event" });
  assert.deepEqual(writes, []);
});

test("unknown customer: foreign failed invoice is a no-op", async () => {
  const { deps, writes } = fakeDeps(LAUNCHPAD_USERS);
  const outcome = await processStripeEvent(
    event("invoice.payment_failed", { customer: "cus_other" }),
    deps,
  );
  assert.deepEqual(outcome, { handled: false, reason: "not-a-launchpad-event" });
  assert.deepEqual(writes, []);
});

test("known customer: LaunchPad events still apply", async () => {
  const { deps, writes } = fakeDeps(LAUNCHPAD_USERS);
  assert.deepEqual(
    await processStripeEvent(
      event("customer.subscription.deleted", { id: "sub_lp", status: "canceled", customer: "cus_lp", metadata: {} }),
      deps,
    ),
    { handled: true, userId: "user_lp" },
  );
  assert.deepEqual(
    await processStripeEvent(
      event("checkout.session.completed", { mode: "subscription", subscription: "sub_lp", customer: "cus_lp", metadata: { userId: "user_lp" } }),
      deps,
    ),
    { handled: true, userId: "user_lp" },
  );
  assert.deepEqual(
    await processStripeEvent(event("invoice.payment_failed", { customer: { id: "cus_lp" } }), deps),
    { handled: true, userId: "user_lp" },
  );
  assert.deepEqual(writes, ["apply:user_lp:sub_lp", "retrieve:sub_lp", "apply:user_lp:sub_lp", "failed:user_lp"]);
});

test("unhandled event types are ignored", async () => {
  const { deps, writes } = fakeDeps(LAUNCHPAD_USERS);
  const outcome = await processStripeEvent(event("invoice.paid", { customer: "cus_lp" }), deps);
  assert.deepEqual(outcome, { handled: false, reason: "unhandled-event-type" });
  assert.deepEqual(writes, []);
});

test("flag off: a validly signed event gets 200 with no side effects", async () => {
  process.env.STRIPE_SECRET_KEY = "sk_test_unit_only";
  process.env.STRIPE_WEBHOOK_SECRET = "whsec_unit_only";
  // No DATABASE_URL: any Prisma call would throw, surfacing as a 500.
  const { default: StripeCtor } = await import("stripe");
  const { PRO_PLAN_ENABLED } = await import("@/lib/site");
  const { POST } = await import("@/app/api/stripe/webhook/route");
  assert.equal(PRO_PLAN_ENABLED, false, "this test covers the flag-off state");

  const payload = JSON.stringify({
    id: "evt_flag_off",
    object: "event",
    type: "customer.subscription.updated",
    data: { object: { id: "sub_lp", object: "subscription", status: "active", customer: "cus_lp", metadata: { userId: "user_lp" } } },
  });
  const signature = new StripeCtor("sk_test_unit_only").webhooks.generateTestHeaderString({
    payload,
    secret: "whsec_unit_only",
  });
  const { NextRequest } = await import("next/server");
  const response = await POST(
    new NextRequest("http://localhost:3000/api/stripe/webhook", {
      method: "POST",
      body: payload,
      headers: { "stripe-signature": signature, "content-type": "application/json" },
    }),
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { received: true, ignored: "pro-plan-disabled" });
});
