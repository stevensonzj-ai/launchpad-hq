import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";

import { publicPageMetadata } from "@/lib/seo-metadata";
import { DAILY_POST_LIMIT } from "@/lib/request-limits";

export const metadata: Metadata = publicPageMetadata({
  title: "Terms of Use | Launchpad HQ",
  description:
    "Terms for using Launchpad HQ: the website, the AI assistant connector, the data feed, accounts, community posts and affiliate links.",
  path: "/terms",
});

const CONTACT_EMAIL = "zach@launchpadhq.io";

function ContactLink() {
  return <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" lastUpdated="30 October 2026">
      <section>
        <h2>Who we are</h2>
        <p>
          These terms are between you and Lakeside Innovation Labs LLC (&ldquo;we&rdquo;), a
          Texas limited liability company that runs Launchpad HQ. By using the website, the
          AI assistant connector or the data feed, you agree to these terms. Contact:{" "}
          <ContactLink />.
        </p>
        <p>
          Our <Link href="/privacy">Privacy Policy</Link> explains what information we collect
          and how long we keep it.
        </p>
      </section>

      <section>
        <h2>What the service is</h2>
        <p>
          Launchpad HQ is a free directory of AI tools. It has three parts:
        </p>
        <ul>
          <li>the website at launchpadhq.io, with optional accounts for saving quiz results
            and favourites and for posting prompts and discussions;</li>
          <li>
            the <Link href="/connector">AI assistant connector</Link>, a read-only MCP server
            your AI assistant can use to search and compare the catalog, with no sign-in; and
          </li>
          <li>a read-only JSON data feed of the same catalog facts.</li>
        </ul>
        <p>
          There is no paid user subscription. Stripe is used only for sponsor invoices. The
          connector and the feed can&apos;t change anything on your accounts or ours.
        </p>
      </section>

      <section>
        <h2>Information is provided as is</h2>
        <p>
          The catalog is general information about other companies&apos; products. It is not
          professional, legal, medical or financial advice. We date and source facts where we
          can, but descriptions, features, limits and prices can be wrong or out of date.
        </p>
        <p>
          Prices and plans change often. Always check the vendor&apos;s own website before you
          buy, subscribe or rely on a tool. Answers your AI assistant gives using the
          connector are written by that assistant, not by us, and may summarize or misstate
          our data.
        </p>
      </section>

      <section>
        <h2>Affiliate links and sponsorship</h2>
        <p>
          This applies to the website only. Most platform pages link straight to the
          vendor&apos;s website. A few use an affiliate link instead: the vendor pays us a
          commission if you sign up through it, the link uses{" "}
          <code>rel=&quot;sponsored&quot;</code>, and the page says so next to the button.
          Paid placements are labelled &ldquo;Sponsored&rdquo;.
        </p>
        <p>
          Affiliate deals and sponsorship never change rankings, the quiz, workflows,
          comparisons or what we say about a tool. The connector and the data feed contain no
          affiliate links and no sponsored placements: they always give the vendor&apos;s own
          website, and connector results are marked <code>sponsored: false</code>. See{" "}
          <Link href="/how-we-make-money">How we make money</Link>.
        </p>
      </section>

      <section>
        <h2>Acceptable use and rate limits</h2>
        <p>You may use Launchpad HQ, the connector and the feed for any lawful purpose. Don&apos;t:</p>
        <ul>
          <li>try to break, overload or get around the security of the service;</li>
          <li>send automated traffic heavy enough to slow it down for others;</li>
          <li>use the service to build spam, scams or anything illegal; or</li>
          <li>pretend to be Launchpad HQ or suggest we endorse your product.</li>
        </ul>
        <p>
          To keep the service fast and available for everyone, we limit how many requests one
          address or account can make in a given period. If you go over a limit you may get a
          &ldquo;too many requests&rdquo; error; wait and try again. We may change limits at
          any time and may block traffic that looks abusive. If you republish data from the
          feed or the connector, credit Launchpad HQ and link to the tool&apos;s page.
        </p>
      </section>

      <section>
        <h2>Accounts</h2>
        <p>
          You do not need an account to browse or to use the connector. If you create one,
          give accurate information and keep it to one person per account. Sign-in is
          handled by Clerk.
        </p>
        <p>
          You must be at least 13 years old to use Launchpad HQ. The site is not directed at
          children.
        </p>
      </section>

      <section>
        <h2>Community posting rules</h2>
        <p>If you post prompts, discussions, replies or reviews:</p>
        <ul>
          <li>no spam, self-promotion without disclosure, or anything illegal;</li>
          <li>no harassment or hate;</li>
          <li>no one else&apos;s personal data; and</li>
          <li>post only content you have the right to share.</li>
        </ul>
        <p>
          New prompts, discussions and replies start as pending and are shown publicly only
          after a moderator approves them. Each account can post up to {DAILY_POST_LIMIT}{" "}
          prompts, discussions and replies in total in any 24 hours. We may decline or remove
          content, and suspend or close accounts, that break these rules.
        </p>
      </section>

      <section>
        <h2>Your content</h2>
        <p>
          You keep whatever rights you already have in what you post. You grant us a
          worldwide, non-exclusive, royalty-free license to host, display and moderate that
          content so we can run the directory. After an account is deleted, public posts stay
          up in anonymized form (the author field is set to null). Favourites, progress,
          preferences, reviews, votes, ratings and reports are deleted with the account.
        </p>
        <p>
          Copyright complaints under the DMCA should be sent to <ContactLink />.
        </p>
      </section>

      <section>
        <h2>Third-party tools are not ours</h2>
        <p>
          Tools in the directory are other companies&apos; products. Their terms, privacy
          practices, pricing and quality are theirs. Leaving Launchpad HQ for a vendor site is
          your choice, and their rules apply there. Your AI assistant is also a third-party
          product with its own terms.
        </p>
      </section>

      <section>
        <h2>No warranty</h2>
        <p>
          The website, the connector and the feed are provided &ldquo;as is&rdquo; and
          &ldquo;as available&rdquo;, without warranties of any kind, including accuracy,
          completeness, fitness for a particular purpose, non-infringement or uninterrupted
          availability, to the fullest extent permitted by law. We may change, suspend or
          stop any part of the service at any time.
        </p>
      </section>

      <section>
        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, we are not liable for indirect, incidental,
          special, consequential or lost-profit damages, or for decisions you make based on
          catalog information. Our total liability for any claim arising out of these terms
          or the service is capped at the greater of the fees you paid us in the prior 12
          months or $100.
        </p>
      </section>

      <section>
        <h2>Termination</h2>
        <p>
          We may remove content or suspend or close an account for breaches of these terms.
          You may ask us by email at <ContactLink /> to delete an account; there is no
          self-serve delete button. We handle deletion requests within 30 days.
        </p>
      </section>

      <section>
        <h2>Governing law and disputes</h2>
        <p>
          These terms are governed by the laws of the State of Texas, without regard to
          conflict-of-law rules. Venue for disputes is in the state or federal courts located
          in Dallas County, Texas. These terms do not require arbitration and do not include
          a class-action waiver.
        </p>
      </section>

      <section>
        <h2>Changes to these terms</h2>
        <p>
          We may update these terms. The &ldquo;Last updated&rdquo; date at the top will
          change. Continued use after an update means you accept the new terms.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Lakeside Innovation Labs LLC
          <br />
          <ContactLink />
        </p>
      </section>
    </LegalPage>
  );
}
