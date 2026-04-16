import Link from "next/link";

export const metadata = {
  title: "Subscription | Launchpad HQ",
};

export default async function PricingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  await searchParams;
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-white">You&apos;re all set</h1>
      <p className="mt-4 text-gray-400">
        Thanks for subscribing. Your trial or billing is managed securely in Stripe.
      </p>
      <Link
        href="/for-you"
        className="mt-8 inline-block rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
      >
        Go to For you
      </Link>
    </div>
  );
}
