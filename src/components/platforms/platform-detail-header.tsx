import { ExternalLink } from "lucide-react";
import { OutboundLink } from "@/components/analytics/outbound-link";
import { FavoriteButton } from "@/components/platforms/favorite-button";
import { PlatformLogo } from "@/components/platforms/platform-logo";
import { AffiliateDisclosure } from "@/components/sponsors/affiliate-disclosure";
import type { AffiliateLink } from "@/data/affiliates";

type PlatformDetailHeaderProps = {
  slug: string;
  name: string;
  company?: string | null;
  logoUrl?: string | null;
  officialHref?: string;
  /**
   * When set, the "Open" button uses the affiliate link (rel="sponsored")
   * and the disclosure renders under the header. Display only.
   */
  affiliate?: AffiliateLink;
  isFavorited: boolean;
  isSignedIn: boolean;
  /**
   * The overview page's <h1> is the platform name. The guide page passes
   * "p" so its <h1> can be the tutorial title instead.
   */
  nameAs?: "h1" | "p";
};

export function PlatformDetailHeader({
  slug,
  name,
  company,
  logoUrl,
  officialHref,
  affiliate,
  isFavorited,
  isSignedIn,
  nameAs: NameTag = "h1",
}: PlatformDetailHeaderProps) {
  const ctaHref = affiliate?.href ?? officialHref;
  return (
    <div className="mb-6">
      <div className="lp-stars relative isolate flex flex-col justify-between gap-5 py-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <PlatformLogo slug={slug} name={name} logoUrl={logoUrl} large />
          <div className="min-w-0">
            <NameTag className="text-4xl font-bold tracking-tight text-amber-50 sm:text-5xl">{name}</NameTag>
            {company && <p className="mt-2 text-sm text-gray-300">by {company}</p>}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <FavoriteButton
            slug={slug}
            initialFavorited={isFavorited}
            isSignedIn={isSignedIn}
            variant="labeled"
          />
          {ctaHref && (
            <OutboundLink
              href={ctaHref}
              platform={slug}
              surface="platform_cta"
              target="_blank"
              rel={affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
              className="lp-button"
            >
              Open {name} <ExternalLink className="h-4 w-4 shrink-0" />
            </OutboundLink>
          )}
        </div>
      </div>
      {affiliate && <AffiliateDisclosure name={name} affiliate={affiliate} className="mt-1 sm:text-right" />}
    </div>
  );
}
