import Link from "next/link";

import { entryDisclosureText, type AffiliateLink } from "@/data/affiliates";

export function AffiliateDisclosure({
  name,
  affiliate,
  className = "",
}: {
  name: string;
  affiliate: AffiliateLink;
  className?: string;
}) {
  return (
    <div className={`text-xs text-gray-500 ${className}`}>
      <p>
        {entryDisclosureText(name, affiliate)}{" "}
        <Link href="/how-we-make-money" className="text-orange-400 underline-offset-2 hover:underline">
          How we make money
        </Link>
      </p>
      {affiliate.promoCode && (
        <p className="mt-1">
          Reader code: <code className="text-gray-300">{affiliate.promoCode.code}</code>.{" "}
          {affiliate.promoCode.note}
        </p>
      )}
    </div>
  );
}
