import { NextResponse } from "next/server";
import { getOrCreateDbUser, noDbUserResponse } from "@/lib/auth-db";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { PRO_PLAN_ENABLED } from "@/lib/site";
import { getAppBaseUrl } from "@/lib/app-url";
import { apiError, methodsNotAllowed } from "@/lib/api-error";

export async function POST() {
  if (!PRO_PLAN_ENABLED) {
    return apiError("not_found", { message: "Not found" });
  }

  const user = await getOrCreateDbUser();
  if (!user) {
    return noDbUserResponse();
  }

  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) {
    return apiError("unavailable", { message: "Subscriptions are not available right now." });
  }

  const origin = getAppBaseUrl();

  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const stripe = getStripe();
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user.id, clerkId: user.clerkId },
    });
    customerId = customer.id;
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing`,
    subscription_data: {
      trial_period_days: 7,
      metadata: { userId: user.id },
    },
    metadata: { userId: user.id },
  });

  return NextResponse.json({ url: session.url });
}

export const { GET, PUT, PATCH, DELETE } = methodsNotAllowed(["POST"]);
