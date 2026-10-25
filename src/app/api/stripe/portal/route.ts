import { NextResponse } from "next/server";
import { getOrCreateDbUser } from "@/lib/auth-db";
import { getStripe } from "@/lib/stripe";
import { PRO_PLAN_ENABLED } from "@/lib/site";
import { getAppBaseUrl } from "@/lib/app-url";
import { apiError, methodsNotAllowed } from "@/lib/api-error";

export async function POST() {
  if (!PRO_PLAN_ENABLED) {
    return apiError("not_found", { message: "Not found" });
  }

  const user = await getOrCreateDbUser();
  if (!user?.stripeCustomerId) {
    return apiError("bad_request", { message: "No billing account" });
  }

  const origin = getAppBaseUrl();
  const stripe = getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${origin}/pricing`,
  });

  return NextResponse.json({ url: session.url });
}

export const { GET, PUT, PATCH, DELETE } = methodsNotAllowed(["POST"]);
