import type Stripe from "stripe";

/**
 * Stripe webhook event handling, separated from the route so it can be tested
 * without a database or network.
 *
 * The Stripe account is shared with another product, so every event must be
 * identified as LaunchPad's before anything is written: a LaunchPad User row
 * must match by metadata.userId, Stripe customer ID, or subscription ID.
 * Anything else is acknowledged (200) and ignored, rather than letting a
 * missing row throw and send Stripe into a retry loop.
 */

export type StripeRefs = {
  userId?: string | null;
  customerId?: string | null;
  subscriptionId?: string | null;
};

export type WebhookDeps = {
  /** Returns the LaunchPad User id matching any of the refs, or null. */
  findUserId(refs: StripeRefs): Promise<string | null>;
  applySubscriptionState(userId: string, sub: Stripe.Subscription): Promise<void>;
  markPaymentFailed(userId: string): Promise<void>;
  retrieveSubscription(id: string): Promise<Stripe.Subscription>;
};

export type WebhookOutcome =
  | { handled: true; userId: string }
  | { handled: false; reason: "unhandled-event-type" | "not-a-launchpad-event" };

function idOf(ref: string | { id: string } | null | undefined): string | null {
  if (!ref) return null;
  return typeof ref === "string" ? ref : ref.id;
}

export async function processStripeEvent(
  event: Stripe.Event,
  deps: WebhookDeps,
): Promise<WebhookOutcome> {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const subscriptionId = idOf(session.subscription);
      if (session.mode !== "subscription" || !subscriptionId) {
        return { handled: false, reason: "unhandled-event-type" };
      }
      // Identify before calling Stripe, so foreign sessions cost nothing.
      const userId = await deps.findUserId({
        userId: session.metadata?.userId,
        customerId: idOf(session.customer),
        subscriptionId,
      });
      if (!userId) return { handled: false, reason: "not-a-launchpad-event" };
      const sub = await deps.retrieveSubscription(subscriptionId);
      await deps.applySubscriptionState(userId, sub);
      return { handled: true, userId };
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = await deps.findUserId({
        userId: sub.metadata?.userId,
        customerId: idOf(sub.customer),
        subscriptionId: sub.id,
      });
      if (!userId) return { handled: false, reason: "not-a-launchpad-event" };
      await deps.applySubscriptionState(userId, sub);
      return { handled: true, userId };
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = idOf(invoice.customer);
      const userId = customerId ? await deps.findUserId({ customerId }) : null;
      if (!userId) return { handled: false, reason: "not-a-launchpad-event" };
      await deps.markPaymentFailed(userId);
      return { handled: true, userId };
    }
    default:
      return { handled: false, reason: "unhandled-event-type" };
  }
}
