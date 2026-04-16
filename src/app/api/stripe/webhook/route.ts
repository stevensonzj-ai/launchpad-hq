import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

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

async function applySubscriptionState(userId: string, sub: Stripe.Subscription) {
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
}

async function syncSubscription(sub: Stripe.Subscription) {
  const metaUserId = sub.metadata?.userId;
  if (metaUserId) {
    await applySubscriptionState(metaUserId, sub);
    return;
  }

  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer?.id;
  if (!customerId) return;

  const user = await prisma.user.findFirst({
    where: { OR: [{ stripeCustomerId: customerId }, { stripeSubscriptionId: sub.id }] },
  });
  if (user) {
    await applySubscriptionState(user.id, sub);
  }
}

export async function POST(request: NextRequest) {
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!whSecret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const body = await request.text();
  const headerList = await headers();
  const sig = headerList.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, sig, whSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "subscription" && session.subscription) {
          const stripe = getStripe();
          const sub = await stripe.subscriptions.retrieve(session.subscription as string);
          const uid = session.metadata?.userId || sub.metadata?.userId;
          if (uid) {
            await applySubscriptionState(uid, sub);
          } else {
            await syncSubscription(sub);
          }
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await syncSubscription(sub);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId =
          typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
        if (customerId) {
          await prisma.user.updateMany({
            where: { stripeCustomerId: customerId },
            data: {
              stripeSubscriptionStatus: "past_due",
              plan: "FREE",
            },
          });
        }
        break;
      }
      default:
        break;
    }
  } catch (e) {
    console.error("Stripe webhook handler error", e);
    return NextResponse.json({ received: true, error: "handler" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
