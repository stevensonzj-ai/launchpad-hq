import Image from "next/image";

/** Decorative art stays separate from the real, accessible card content. */
export function LaunchpadArt({ kind }: { kind: "writing" | "images" | "research" | "automation" | "guide" }) {
  return <Image src={`/images/launchpad/${kind}.jpg`} alt="" fill sizes={kind === "guide" ? "(max-width: 1200px) 95vw, 1100px" : "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"} className="object-cover" />;
}
