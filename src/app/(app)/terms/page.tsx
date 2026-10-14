import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use | Launchpad HQ",
  description: "Terms for using Launchpad HQ.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <section>
        <h2>Who we are</h2>
        <p>
          These terms are between you and Lakeside Innovation Labs LLC (“we”), operator of
          Launchpad HQ. We are organised in <strong>[State — Zach review]</strong>. Postal
          address: <strong>[Mailing address — Zach review]</strong>. Registered agent:{" "}
          <strong>[Registered agent — Zach review]</strong>. Contact:{" "}
          <a href="mailto:launchpadhq.admin@gmail.com">launchpadhq.admin@gmail.com</a>.
        </p>
        <p>
          Our <Link href="/privacy">Privacy Policy</Link> explains what information we
          collect.
        </p>
      </section>

      <section>
        <h2>What the service is</h2>
        <p>
          Launchpad HQ is a free directory of AI tools, plus optional account features
          (saving quiz results, favourites, posting prompts and discussions). There is no
          paid user subscription.{" "}
          <strong>
            [Zach review] Stripe may be used later to invoice sponsors; it is not used to
            bill visitors.
          </strong>
        </p>
        <p>
          <strong>
            [Zach review] The catalog is information only. It is not professional, legal,
            medical, or financial advice.
          </strong>{" "}
          Tool descriptions, features, and prices can be wrong or out of date. Always check
          the vendor’s own site before you buy or rely on a tool.
        </p>
      </section>

      <section>
        <h2>Accounts</h2>
        <p>
          You do not need an account to browse. If you create one, give accurate
          information and keep it to one person per account. Authentication is handled by
          Clerk.
        </p>
        <p>
          <strong>
            [Zach review] Minimum age: confirm who may create an account (for example 13+
            with guardian consent, or 18+).
          </strong>
        </p>
      </section>

      <section>
        <h2>Community rules</h2>
        <p>
          If you post reviews, prompts, discussions, or replies: no spam, nothing illegal,
          no harassment, and no other people’s personal data. We moderate submissions.
          New prompts, discussions, and replies start as pending and are only shown
          publicly once approved.{" "}
          <strong>
            [Zach review] We may refuse, hide, or remove content.
          </strong>
        </p>
      </section>

      <section>
        <h2>Your content</h2>
        <p>
          You keep whatever rights you already have in what you post.{" "}
          <strong>
            [Zach review] Licence: confirm the licence users grant us to host, display,
            and moderate that content (worldwide, non-exclusive, royalty-free, to operate
            the directory — and whether we may keep anonymised copies after account
            deletion). In our database, deleting a user keeps prompts, discussions, and
            replies with the author set to null; favourites, progress, preferences,
            reviews, votes, ratings, and reports are deleted.
          </strong>
        </p>
        <p>
          <strong>
            [Zach review] DMCA / takedown: confirm that copyright complaints should go to{" "}
            <a href="mailto:launchpadhq.admin@gmail.com">launchpadhq.admin@gmail.com</a>{" "}
            and whether a designated agent is required.
          </strong>
        </p>
      </section>

      <section>
        <h2>Sponsored content and independence</h2>
        <p>
          Platform pages link straight to the vendor’s website. We found no affiliate-link
          code in this product. Affiliate links may be used in future and will be
          disclosed. Paid placements are labelled “Sponsored” and use{" "}
          <code>rel=&quot;sponsored&quot;</code>. They are kept separate from rankings, the quiz,
          and workflows.
        </p>
      </section>

      <section>
        <h2>Third-party tools are not ours</h2>
        <p>
          Tools in the directory are other companies’ products. Their terms, privacy
          practices, pricing, and quality are theirs. Leaving Launchpad HQ for a vendor
          site is your choice and their rules apply there. We do not embed third-party
          video or ad scripts on this site.
        </p>
      </section>

      <section>
        <h2>Disclaimers and liability</h2>
        <p>
          <strong>
            [Zach review] Disclaimers: the service is provided “as is,” without warranties
            of accuracy, fitness, or uninterrupted availability. Confirm the exact
            warranty disclaimer you want.
          </strong>
        </p>
        <p>
          <strong>
            [Zach review] Liability limits: confirm a cap (for example, fees paid in the
            prior 12 months, or $0 for free users) and which damages are excluded
            (indirect, incidental, lost profits). This is not legal advice and is a
            placeholder until counsel reviews it.
          </strong>
        </p>
      </section>

      <section>
        <h2>Termination</h2>
        <p>
          <strong>
            [Zach review] Confirm when we may suspend or close an account (for example,
            breach of these terms, illegal posts) and what happens to public
            posts after closure. Users may ask us by email to delete an account; there is
            no self-serve delete button.
          </strong>
        </p>
      </section>

      <section>
        <h2>Governing law and disputes</h2>
        <p>
          <strong>
            [Zach review] Governing law / state: name the US state whose law applies, and
            the venue for disputes.
          </strong>
        </p>
        <p>
          <strong>
            [Zach review] Arbitration / class-action waiver: decide whether disputes go to
            binding individual arbitration and whether class actions are waived. Do not
            treat this paragraph as in force until you confirm.
          </strong>
        </p>
      </section>

      <section>
        <h2>Changes to these terms</h2>
        <p>
          We may update these terms. The “Last updated” date at the top will change.{" "}
          <strong>
            [Zach review] Continued use after an update means you accept the new terms.
          </strong>
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Lakeside Innovation Labs LLC
          <br />
          <strong>[Mailing address — Zach review]</strong>
          <br />
          <a href="mailto:launchpadhq.admin@gmail.com">launchpadhq.admin@gmail.com</a>
        </p>
      </section>
    </LegalPage>
  );
}
