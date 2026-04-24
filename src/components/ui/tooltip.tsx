import { useId } from "react";
import { cn } from "@/lib/utils";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Tailwind-only hover tooltip. No dependency, no collision detection.
 *
 * Position: below the anchor via `top-full mt-2`, center-aligned via
 * `-translate-x-1/2`. `w-max max-w-[220px]` so short copy stays one line
 * and long copy wraps instead of overflowing narrow cards.
 *
 * Interaction: sighted users get the tooltip on hover via
 * `group-hover:opacity-100`. `group-focus-within` is retained so this
 * component reveals correctly when it wraps an interactive child (a
 * button or link); for non-interactive anchors (e.g. informational pills
 * that are just <span>s) nothing receives focus, so keyboard and
 * screen-reader users reach the tooltip only via best-effort
 * aria-describedby announcement in browse mode. That support is not
 * reliable across all ATs — if we need a guaranteed keyboard/SR path
 * later we'd add a focusable info-icon affordance or a glossary.
 *
 * Content-empty guard: when `content` is falsy we render the children
 * without the tooltip machinery, so a missing entry in a lookup map
 * doesn't produce a blank floating panel.
 */
export function Tooltip({ content, children, className }: TooltipProps) {
  const id = useId();
  if (!content) return <>{children}</>;
  return (
    <span className={cn("group relative inline-flex", className)}>
      <span aria-describedby={id}>{children}</span>
      <span
        role="tooltip"
        id={id}
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max max-w-[220px] -translate-x-1/2 rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1.5 text-xs font-normal text-gray-200 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {content}
      </span>
    </span>
  );
}
