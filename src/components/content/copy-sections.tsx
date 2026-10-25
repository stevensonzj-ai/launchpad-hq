import Link from "next/link";
import type { CopyLink, CopySection } from "@/lib/site-copy";

/** In-app pages use Link; feed files, llms.txt and other non-page URLs use a plain anchor. */
function CopyAnchor({ link }: { link: CopyLink }) {
  const className = "text-orange-400 hover:underline";
  const isPage = link.href.startsWith("/") && !/\.(json|txt|xml)$/.test(link.href);
  return isPage ? (
    <Link href={link.href} className={className}>{link.label}</Link>
  ) : (
    <a href={link.href} className={className}>{link.label}</a>
  );
}

/** Renders the shared page copy in src/lib/site-copy.ts (the Markdown versions read the same copy). */
export function CopySections({ sections }: { sections: CopySection[] }) {
  return (
    <div className="mt-10 space-y-10">
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-xl font-semibold text-white">{section.heading}</h2>
          {section.paragraphs.map((p) =>
            p.includes("\n") ? (
              <pre key={p} className="mt-3 overflow-x-auto rounded-md border border-gray-800 bg-gray-900 p-3 text-xs text-gray-200">{p}</pre>
            ) : (
              <p key={p} className="mt-2 text-sm text-gray-400">{p}</p>
            ),
          )}
          {section.bullets?.length ? (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-400">
              {section.bullets.map((b) => <li key={b} className="break-words">{b}</li>)}
            </ul>
          ) : null}
          {section.links?.length ? (
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {section.links.map((l) => <li key={l.href}><CopyAnchor link={l} /></li>)}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
