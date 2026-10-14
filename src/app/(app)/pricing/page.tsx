import { redirect } from "next/navigation";
import { PRO_PLAN_ENABLED } from "@/lib/site";
import { PricingCheckout } from "@/components/pricing/pricing-checkout";

export default function PricingPage() {
  if (!PRO_PLAN_ENABLED) {
    redirect("/how-we-make-money");
  }
  return <PricingCheckout />;
}
