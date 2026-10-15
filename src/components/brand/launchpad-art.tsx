import Image from "next/image";
import { FileText, Search, Zap, Workflow, Database, Mail, Sparkles } from "lucide-react";

/** Decorative art stays separate from the real, accessible card content. */
export function LaunchpadArt({ kind }: { kind: "writing" | "images" | "research" | "automation" | "guide" }) {
  if (kind === "writing" || kind === "images" || kind === "guide") {
    return <Image src={`/images/launchpad/${kind}.jpg`} alt="" fill sizes={kind === "guide" ? "(max-width: 1200px) 95vw, 1100px" : "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"} className="object-cover" />;
  }
  return (
    <div aria-hidden="true" className={`lp-art lp-art-${kind}`}>
      <div className="lp-art-orbit" />
      <span className="lp-art-node lp-node-one">{kind === "research" ? <FileText /> : <Mail />}</span>
      <span className="lp-art-node lp-node-two">{kind === "research" ? <Database /> : <Workflow />}</span>
      <span className="lp-art-node lp-node-three">{kind === "research" ? <Sparkles /> : <Database />}</span>
      <span className="lp-art-node lp-node-main">{kind === "research" ? <Search /> : <Zap />}</span>
      <span className="lp-art-dot lp-dot-one" /><span className="lp-art-dot lp-dot-two" />
    </div>
  );
}
