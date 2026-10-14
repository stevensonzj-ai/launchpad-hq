import Link from "next/link";

export const SPONSOR_DISCLOSURE_TEXT =
  "Paid placement. Sponsors don't affect our rankings, quiz results or reviews.";

export function SponsorDisclosure({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-gray-500 ${className}`}>
      {SPONSOR_DISCLOSURE_TEXT}{" "}
      <Link href="/how-we-make-money" className="text-orange-400 underline-offset-2 hover:underline">
        How we make money
      </Link>
    </p>
  );
}
