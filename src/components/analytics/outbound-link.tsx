"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export type OutboundEventName = "platform_clickout" | "sponsor_clickout";

/** Hostname only — no path, query string, or credentials. */
export function destinationHost(href: string): string {
  try {
    return new URL(href).hostname;
  } catch {
    return "";
  }
}

export function outboundEventProperties(
  href: string,
  platform: string,
  surface: string,
) {
  return {
    platform,
    surface,
    destination_host: destinationHost(href),
  };
}

type OutboundLinkProps = {
  href: string;
  platform: string;
  surface: string;
  eventName?: OutboundEventName;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function OutboundLink({
  href,
  platform,
  surface,
  eventName = "platform_clickout",
  children,
  onClick,
  ...rest
}: OutboundLinkProps) {
  return (
    <a
      href={href}
      onClick={(event) => {
        track(eventName, outboundEventProperties(href, platform, surface));
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
