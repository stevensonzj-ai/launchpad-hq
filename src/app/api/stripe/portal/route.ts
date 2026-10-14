import { NextRequest, NextResponse } from "next/server";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { getStripe } from "@/lib/stripe";
import { PRO_PLAN_ENABLED } from "@/lib/site";

export async function POST(request: NextRequest) {
  if (!PRO_PLAN_ENABLED) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const user = await getOrCreateDbUser();
  if (!user?.stripeCustomerId) {
    return NextResponse.json({ error: "No billing account" }, { status: 400 });
  }

  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const stripe = getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${origin}/pricing`,
  });

  return NextResponse.json({ url: session.url });
}
