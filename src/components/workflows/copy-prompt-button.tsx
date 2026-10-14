"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const COPY_ERROR = "Couldn’t copy. Select the prompt and copy it manually.";

export function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setError(false);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
      setError(true);
    }
  }

  const liveMessage = copied ? "Prompt copied" : error ? COPY_ERROR : "";

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Prompt copied" : error ? COPY_ERROR : "Copy prompt"}
        className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors ${
          error
            ? "border-red-500/50 bg-red-950/40 text-red-300 hover:border-red-400/70"
            : "border-gray-700 bg-gray-800/80 text-gray-300 hover:border-orange-500/50 hover:text-orange-300"
        }`}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-400" aria-hidden />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden />
        )}
        {copied ? "Copied" : error ? "Copy failed" : "Copy prompt"}
      </button>
      <p className="sr-only" aria-live="polite">
        {liveMessage}
      </p>
      {error ? (
        <p className="max-w-[16rem] text-right text-[11px] leading-snug text-red-300">{COPY_ERROR}</p>
      ) : null}
    </div>
  );
}
