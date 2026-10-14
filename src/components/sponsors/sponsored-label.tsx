export function SponsoredLabel({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-orange-200 ring-1 ring-orange-500/40 ${className}`}
    >
      Sponsored
    </span>
  );
}
