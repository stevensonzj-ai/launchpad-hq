import { ExternalLink, Globe, Smartphone } from "lucide-react";

type PlatformMobileSectionProps = {
  name: string;
  hasMobileApp: boolean;
  iosAppUrl: string | null;
  androidAppUrl: string | null;
  mobileWebFriendly: boolean;
  platformType: string[];
};

function hasPwa(platformType: string[]) {
  return platformType.some((t) => t.toLowerCase().includes("pwa"));
}

export function PlatformMobileSection({
  name,
  hasMobileApp,
  iosAppUrl,
  androidAppUrl,
  mobileWebFriendly,
  platformType,
}: PlatformMobileSectionProps) {
  const pwa = hasPwa(platformType);
  const showStoreLinks = hasMobileApp && (iosAppUrl || androidAppUrl);

  return (
    <section className="rounded-lg border border-gray-800 bg-gray-900 p-6">
      <div className="mb-4 flex items-center gap-2">
        <Smartphone className="h-5 w-5 text-orange-400" />
        <h2 className="text-lg font-semibold text-white">Mobile access</h2>
      </div>
      <p className="mb-4 text-sm text-gray-400">
        How to use <span className="text-gray-300">{name}</span> on phones and tablets.
      </p>

      {showStoreLinks && (
        <div className="mb-4 flex flex-wrap gap-3">
          {iosAppUrl && (
            <a
              href={iosAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-gray-600 hover:bg-gray-900"
            >
              <span className="text-[13px] font-semibold">App Store</span>
              <span className="text-xs text-gray-500">iOS</span>
              <ExternalLink className="h-3.5 w-3.5 text-gray-500" />
            </a>
          )}
          {androidAppUrl && (
            <a
              href={androidAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-gray-600 hover:bg-gray-900"
            >
              <span className="text-[13px] font-semibold">Google Play</span>
              <span className="text-xs text-gray-500">Android</span>
              <ExternalLink className="h-3.5 w-3.5 text-gray-500" />
            </a>
          )}
        </div>
      )}

      {hasMobileApp && !iosAppUrl && !androidAppUrl && (
        <p className="mb-4 text-sm text-amber-200/90">
          Listed as having a mobile app; store links are not on file yet.
        </p>
      )}

      <ul className="space-y-2 text-sm text-gray-300">
        {mobileWebFriendly && (
          <li className="flex gap-2">
            <Glob className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
            <span>
              <span className="font-medium text-white">Mobile web:</span> Works in a mobile browser (responsive or
              dedicated mobile site).
            </span>
          </li>
        )}
        {pwa && (
          <li className="flex gap-2">
            <Glob className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
            <span>
              <span className="font-medium text-white">PWA:</span> Can often be installed to your home screen like an
              app (browser-dependent).
            </span>
          </li>
        )}
        {!mobileWebFriendly && (
          <li className="text-gray-500">
            Not optimized for mobile browsers (e.g. desktop-first or CLI). Use a desktop when possible.
          </li>
        )}
      </ul>
    </section>
  );
}
