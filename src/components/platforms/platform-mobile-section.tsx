import { ExternalLink, Globe, Smartphone } from "lucide-react";
import { OutboundLink } from "@/components/analytics/outbound-link";
import { FactCite } from "@/components/platforms/fact-cite";
import type { Fact, ToolApps } from "@/data/facts/types";

type PlatformMobileSectionProps = {
  slug: string;
  name: string;
  iosAppUrl: string | null;
  androidAppUrl: string | null;
  macosAppUrl?: string | null;
  windowsAppUrl?: string | null;
  linuxAppUrl?: string | null;
  mobileWebFriendly: boolean;
  platformType: string[];
  appsFact?: Fact<ToolApps>;
};

function hasPwa(platformType: string[]) {
  return platformType.some((t) => t.toLowerCase().includes("pwa"));
}

type StoreButton = { href: string; label: string; hint?: string };

export function PlatformMobileSection({
  slug,
  name,
  iosAppUrl,
  androidAppUrl,
  macosAppUrl,
  windowsAppUrl,
  linuxAppUrl,
  mobileWebFriendly,
  platformType,
  appsFact,
}: PlatformMobileSectionProps) {
  const pwa = hasPwa(platformType);
  const buttons: StoreButton[] = [];
  if (macosAppUrl) buttons.push({ href: macosAppUrl, label: "Download for macOS" });
  if (windowsAppUrl) buttons.push({ href: windowsAppUrl, label: "Download for Windows" });
  if (linuxAppUrl) buttons.push({ href: linuxAppUrl, label: "Download for Linux" });
  if (iosAppUrl) buttons.push({ href: iosAppUrl, label: "App Store", hint: "iOS" });
  if (androidAppUrl) buttons.push({ href: androidAppUrl, label: "Google Play", hint: "Android" });

  if (buttons.length === 0 && !mobileWebFriendly && !pwa) {
    return null;
  }

  return (
    <section className="lp-overview-panel">
      <div className="mb-4 flex items-center gap-2">
        <Smartphone className="h-5 w-5 text-orange-400" aria-hidden />
        <h2 className="text-lg font-semibold text-white">Get it</h2>
        <FactCite fact={appsFact} />
      </div>
      <p className="mb-4 text-sm text-gray-400">
        How to use <span className="text-gray-300">{name}</span>
        {buttons.some((b) => /macOS|Windows|Linux/.test(b.label))
          ? " on desktop and mobile."
          : " on phones and tablets."}
      </p>

      {buttons.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-3">
          {buttons.map((button) => (
            <OutboundLink
              key={button.href}
              href={button.href}
              platform={slug}
              surface="platform_mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-gray-600 hover:bg-gray-900"
            >
              <span className="text-[13px] font-semibold">{button.label}</span>
              {button.hint && <span className="text-xs text-gray-400">{button.hint}</span>}
              <ExternalLink className="h-3.5 w-3.5 text-gray-500" aria-hidden />
            </OutboundLink>
          ))}
        </div>
      )}

      <ul className="space-y-2 text-sm text-gray-300">
        {mobileWebFriendly && (
          <li className="flex gap-2">
            <Globe className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden />
            <span>
              <span className="font-medium text-white">Mobile web:</span> Works in a mobile browser (responsive or
              dedicated mobile site).
            </span>
          </li>
        )}
        {pwa && (
          <li className="flex gap-2">
            <Globe className="mt-0.5 h-4 w-4 shrink-0 text-green-400" aria-hidden />
            <span>
              <span className="font-medium text-white">PWA:</span> Can often be installed to your home screen like an
              app (browser-dependent).
            </span>
          </li>
        )}
        {!mobileWebFriendly && buttons.length === 0 && (
          <li className="text-gray-400">
            Not optimized for mobile browsers (e.g. desktop-first or CLI). Use a desktop when possible.
          </li>
        )}
      </ul>
    </section>
  );
}
