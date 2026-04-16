import { NextRequest, NextResponse } from "next/server";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  const user = await getOrCreateDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) {
    return NextResponse.json(
      { error: "Subscription is not configured (STRIPE_PRICE_ID)" },
      { status: 503 },
    );
  }

  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

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
