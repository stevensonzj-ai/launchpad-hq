type GoalKind = "writing" | "images" | "research" | "automation";

/** A small family of mission badges: ink, a picture, a compass, and a circuit. */
export function GoalEmblem({ kind }: { kind: GoalKind }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-11 w-11 shrink-0 overflow-visible" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 2 43 13v22L24 46 5 35V13Z" fill="currentColor" fillOpacity=".07" strokeOpacity=".45" />
      <path d="m24 6 15 9v18l-15 9-15-9V15Z" strokeOpacity=".15" />
      {kind === "writing" && <>
        <path d="M17 30c1-9 8-18 18-19-1 10-7 18-17 20M16 34l13-17M21 27l7-1M25 22l1-6" fill="currentColor" fillOpacity=".12" />
        <path d="M13 33h10l2 5H11Z" fill="currentColor" fillOpacity=".35" />
        <path d="m34 29 1.2 2.8L38 33l-2.8 1.2L34 37l-1.2-2.8L30 33l2.8-1.2Z" strokeWidth="1" />
      </>}
      {kind === "images" && <>
        <rect x="12" y="15" width="23" height="21" rx="3" fill="currentColor" fillOpacity=".12" transform="rotate(-7 24 25)" />
        <path d="m13 31 7-8 6 6 4-4 5 6M18 19h.01" />
        <circle cx="29" cy="21" r="2.5" fill="currentColor" fillOpacity=".5" stroke="none" />
        <path d="m35 9 1.3 3.7L40 14l-3.7 1.3L35 19l-1.3-3.7L30 14l3.7-1.3Z" fill="currentColor" fillOpacity=".35" strokeWidth="1" />
      </>}
      {kind === "research" && <>
        <circle cx="24" cy="24" r="11" strokeOpacity=".65" />
        <ellipse cx="24" cy="24" rx="17" ry="6" transform="rotate(-32 24 24)" strokeOpacity=".4" />
        <path d="m28 15-1 12-11 6 5-12Z" fill="currentColor" fillOpacity=".3" />
        <path d="m28 15-7 6 6 6Z" fill="currentColor" fillOpacity=".5" />
        <circle cx="38" cy="16" r="2" fill="currentColor" stroke="none" />
      </>}
      {kind === "automation" && <>
        <path d="M16 15h15a5 5 0 0 1 5 5v10M32 34H17a5 5 0 0 1-5-5V19" strokeOpacity=".65" />
        <rect x="11" y="11" width="8" height="8" rx="2" fill="currentColor" fillOpacity=".2" />
        <rect x="30" y="30" width="8" height="8" rx="2" fill="currentColor" fillOpacity=".2" />
        <path d="m26 17-8 10h6l-2 6 9-11h-7Z" fill="currentColor" fillOpacity=".5" strokeWidth="1" />
        <path d="m33 13 3 2-3 2M15 32l-3 2 3 2" />
      </>}
    </svg>
  );
}
