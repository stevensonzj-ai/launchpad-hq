import type { ReactNode } from "react";
import { USER_POSTED_LINK_REL } from "@/lib/community-pages";

/** An anchor whose href came from a user post. */
export function UserPostedLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel={USER_POSTED_LINK_REL} className={className}>
      {children}
    </a>
  );
}
