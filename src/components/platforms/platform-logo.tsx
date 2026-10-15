"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import catalogLogos from "@/lib/platform-logo-assets.json";
import logoPlates from "@/lib/platform-logo-plates.json";

// Local copies of official vendor assets; provenance is recorded in the handoff.
const logos: Record<string, string> = {
  ...catalogLogos,
  claude: "claude-mark.png",
  "claude-code": "claude-mark.png",
  "perplexity-ai": "perplexity.svg",
  "perplexity-comet": "perplexity.svg",
  "canva-ai-magic-studio": "canva.ico",
  "canva-magic-studio": "canva.ico",
  ollama: "ollama.png",
  "runway-for-education": catalogLogos.runway,
};

export function PlatformLogo({ slug, name, logoUrl, large = false }: { slug: string; name: string; logoUrl?: string | null; large?: boolean }) {
  const asset = logos[slug];
  const src = asset ? `/images/platforms/${asset}` : logoUrl?.startsWith("https://") ? logoUrl : undefined;
  const [failedSrc, setFailedSrc] = useState<string>();
  const showLogo = src && src !== failedSrc;
  const lightPlate = Boolean(asset && logoPlates[asset as keyof typeof logoPlates] === "light");
  return (
    <span aria-hidden="true" className={cn("relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl", large ? "h-16 w-16 sm:h-20 sm:w-20" : "h-12 w-12", showLogo ? (lightPlate ? "bg-[#f4f1ea] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]" : "bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]") : "bg-gray-800 text-xl font-semibold text-gray-300")}>
      {showLogo ? <Image src={src} alt="" width={large ? 64 : 40} height={large ? 64 : 40} unoptimized onError={() => setFailedSrc(src)} className={cn("object-contain", large ? "h-12 w-12 sm:h-14 sm:w-14" : "h-8 w-8")} /> : name.slice(0, 1).toUpperCase()}
    </span>
  );
}
