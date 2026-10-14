"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — fail quietly.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Prompt copied" : "Copy prompt"}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-gray-700 bg-gray-800/80 px-2.5 py-1 text-xs font-semibold text-gray-300 transition-colors hover:border-orange-500/50 hover:text-orange-300"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-400" aria-hidden />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden />
      )}
      {copied ? "Copied" : "Copy prompt"}
    </button>
  );
}
