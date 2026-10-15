"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import catalogLogos from "@/lib/platform-logo-assets.json";

// Local copies of official vendor assets; provenance is recorded in the handoff.
const logos: Record<string, string> = {
  ...catalogLogos,
  claude: "claude.png",
  "claude-code": "claude.png",
  "anthropic-api": "anthropic.ico",
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
  return (
    <span aria-hidden="true" className={cn("relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10", large ? "h-16 w-16 sm:h-20 sm:w-20" : "h-12 w-12", showLogo ? "bg-white" : "bg-gray-800 text-xl font-semibold text-gray-300")}>
      {showLogo ? <Image src={src} alt="" width={large ? 64 : 40} height={large ? 64 : 40} unoptimized onError={() => setFailedSrc(src)} className={cn("object-contain", large ? "h-14 w-14" : "h-9 w-9")} /> : name.slice(0, 1).toUpperCase()}
    </span>
  );
}
