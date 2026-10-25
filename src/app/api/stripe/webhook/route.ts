import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { PRO_PLAN_ENABLED } from "@/lib/site";
import { processStripeEvent, type StripeRefs, type WebhookDeps } from "@/lib/stripe-webhook";
import { apiError, methodsNotAllowed } from "@/lib/api-error";

export const dynamic = "force-dynamic";

/** Stripe API returns unix timestamps; SDK typings occasionally omit fields on `Subscription`. */
function subscriptionPeriodDates(sub: Stripe.Subscription): {
  periodEnd: Date | null;
  trialEnd: Date | null;
} {
  const o = sub as unknown as Record<string, unknown>;
  const cpe = o["current_period_end"];
  const te = o["trial_end"];
  const periodEnd =
    typeof cpe === "number" && cpe > 0 ? new Date(cpe * 1000) : null;
  const trialEnd =
    typeof te === "number" && te > 0 ? new Date(te * 1000) : null;
  return { periodEnd, trialEnd };
}

/** Match order: metadata.userId, then Stripe customer, then subscription. */
async function findUserId({ userId, customerId, subscriptionId }: StripeRefs) {
  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
    if (user) return user.id;
  }
  if (customerId) {
    const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId }, select: { id: true } });
    if (user) return user.id;
  }
  if (subscriptionId) {
    const user = await prisma.user.findFirst({ where: { stripeSubscriptionId: subscriptionId }, select: { id: true } });
    if (user) return user.id;
  }
  return null;
}

const deps: WebhookDeps = {
  findUserId,
  async applySubscriptionState(userId, sub) {
    const status = sub.status;
    const { periodEnd, trialEnd } = subscriptionPeriodDates(sub);
    const isPro = status === "active" || status === "trialing";
    await prisma.user.update({
      where: { id: userId },
      data: {
        stripeSubscriptionId: sub.id,
        stripeSubscriptionStatus: status,
        trialEndsAt: trialEnd,
        planExpiresAt: isPro ? periodEnd : null,
        plan: isPro ? "PRO" : "FREE",
      },
    });
  },
  async markPaymentFailed(userId) {
    await prisma.user.update({
      where: { id: userId },
      data: { stripeSubscriptionStatus: "past_due", plan: "FREE" },
    });
  },
  retrieveSubscription: (id) => getStripe().subscriptions.retrieve(id),
};

export async function POST(request: NextRequest) {
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!whSecret) {
    return apiError("unavailable", { message: "Webhook not configured" });
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return apiError("bad_request", { message: "Missing signature" });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, sig, whSecret);
  } catch {
    return apiError("bad_request", { message: "Invalid signature" });
  }

  // Pro is switched off: acknowledge so Stripe stops retrying, change nothing.
  if (!PRO_PLAN_ENABLED) {
    return NextResponse.json({ received: true, ignored: "pro-plan-disabled" });
  }

  try {
    const outcome = await processStripeEvent(event, deps);
    if (!outcome.handled) {
      return NextResponse.json({ received: true, ignored: outcome.reason });
    }
  } catch (e) {
    console.error("Stripe webhook handler error", e);
    return apiError("internal_error", { message: "The webhook handler failed; Stripe will retry." });
  }

  return NextResponse.json({ received: true });
}

export const { GET, PUT, PATCH, DELETE } = methodsNotAllowed(["POST"]);
