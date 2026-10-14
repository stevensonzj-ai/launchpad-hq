import { Info } from "lucide-react";
import { factCiteTitle } from "@/lib/platform-display";
import type { Fact } from "@/data/facts/types";

export function FactCite({
  fact,
}: {
  fact?: Pick<Fact<unknown>, "sourceUrl" | "checkedAt" | "status"> | null;
}) {
  if (!fact?.sourceUrl && !fact?.checkedAt) return null;
  const title = factCiteTitle(fact);
  return (
    <span
      title={title}
      aria-label={title.replace(/\n/g, ". ")}
      className="ml-1 inline-flex align-middle text-gray-500"
    >
      <Info className="h-3.5 w-3.5" aria-hidden />
    </span>
  );
}
