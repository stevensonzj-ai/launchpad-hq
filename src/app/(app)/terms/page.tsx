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
          Launchpad HQ, a Texas limited liability company. Contact:{" "}
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
          paid user subscription. Stripe is used only for sponsor invoices.
        </p>
        <p>
          The catalog is information only. It is not professional, legal, medical, or
          financial advice. Tool descriptions, features, and prices can be wrong or out of
          date. Always check the vendor’s own site before you buy or rely on a tool.
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
          You must be at least 13 years old to use Launchpad HQ. The site is not directed
          at children.
        </p>
      </section>

      <section>
        <h2>Community rules</h2>
        <p>
          If you post reviews, prompts, discussions, or replies: no spam, nothing illegal,
          no harassment, and no other people’s personal data. We moderate submissions.
          New prompts, discussions, and replies start as pending and are only shown
          publicly once approved. We may remove content or suspend accounts for breaches
          of these terms.
        </p>
      </section>

      <section>
        <h2>Your content</h2>
        <p>
          You keep whatever rights you already have in what you post. You grant us a
          worldwide, non-exclusive, royalty-free license to host, display, and moderate
          that content so we can operate the directory. After an account is deleted, public
          posts stay up in anonymized form (the author field is set to null). Favourites,
          progress, preferences, reviews, votes, ratings, and reports are deleted with the
          account.
        </p>
        <p>
          Copyright complaints under the DMCA should be sent to{" "}
          <a href="mailto:launchpadhq.admin@gmail.com">launchpadhq.admin@gmail.com</a>.
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
          The service is provided “as is,” without warranties of accuracy, fitness, or
          uninterrupted availability, to the fullest extent permitted by law.
        </p>
        <p>
          Our total liability for claims arising out of these terms or the service is
          capped at the greater of the fees you paid us in the prior 12 months or $100.
          We are not liable for indirect, incidental, or lost-profit damages.
        </p>
      </section>

      <section>
        <h2>Termination</h2>
        <p>
          We may remove content or suspend or close an account for breaches of these
          terms, including illegal posts. After an account is closed, public prompts,
          discussions, and replies stay up in anonymized form. You may ask us by email at{" "}
          <a href="mailto:launchpadhq.admin@gmail.com">launchpadhq.admin@gmail.com</a> to
          delete an account; there is no self-serve delete button. We handle deletion
          requests within 30 days.
        </p>
      </section>

      <section>
        <h2>Governing law and disputes</h2>
        <p>
          These terms are governed by the laws of the State of Texas, without regard to
          conflict-of-law rules. Venue for disputes is in the state or federal courts
          located in Dallas County, Texas.
        </p>
        <p>
          These terms do not require arbitration and do not include a class-action waiver.
        </p>
      </section>

      <section>
        <h2>Changes to these terms</h2>
        <p>
          We may update these terms. The “Last updated” date at the top will change.
          Continued use after an update means you accept the new terms.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Lakeside Innovation Labs LLC
          <br />
          <a href="mailto:launchpadhq.admin@gmail.com">launchpadhq.admin@gmail.com</a>
        </p>
      </section>
    </LegalPage>
  );
}
