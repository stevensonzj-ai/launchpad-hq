import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Launchpad HQ",
  description: "How Launchpad HQ collects, uses, and shares information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <section>
        <h2>Who we are</h2>
        <p>
          Launchpad HQ is operated by Lakeside Innovation Labs LLC, organised in{" "}
          <strong>[State — Zach review]</strong>. Postal address:{" "}
          <strong>[Mailing address — Zach review]</strong>. EU representative:{" "}
          <strong>[EU representative — Zach review]</strong>. Contact:{" "}
          <a href="mailto:launchpadhq.admin@gmail.com">launchpadhq.admin@gmail.com</a>.
        </p>
        <p>
          This site is a free directory of AI tools. You can browse without an account. You
          may optionally create an account. There is no paid user subscription.{" "}
          <strong>
            [Zach review] Stripe may be used later as the payment processor for sponsor
            invoices, not for visitor billing.
          </strong>{" "}
          See our <Link href="/terms">Terms of Use</Link>.
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <p>We only collect what the product actually uses today:</p>
        <ul>
          <li>
            <strong>Account (Clerk).</strong> Sign-in and sign-up run through Clerk. Clerk
            stores your account (email, name or username, profile image, sign-in method, and
            sessions) and sets its own authentication cookies.{" "}
            <strong>
              [Zach review] Which social logins are turned on (for example Google or GitHub)
              is a Clerk dashboard setting, not something this site hard-codes.
            </strong>
          </li>
          <li>
            <strong>Our database (Neon Postgres).</strong> When you have an account we copy
            your Clerk user id, email, name, and avatar URL into our User record. We also
            store whether onboarding is complete. Historical plan and Stripe id columns may
            still exist in the database from an unused subscription experiment; they are
            not used to gate features. If you fill
            in preferences or the quiz, we store those answers (goals, budget, experience,
            industries, team size, priorities, quiz answers, and when the quiz was
            completed). We store saved tools (favourites) and tutorial progress. If you
            post reviews, prompts, discussions, or replies, we store that content and show
            it publicly with your author name. Votes and ratings, and reports (with a
            reason), are also stored. We found no IP-address column in our schema.
          </li>
          <li>
            <strong>Payments (Stripe).</strong>{" "}
            <strong>
              [Zach review] Stripe is intended as the future processor for sponsor invoices.
              Visitor card details are not collected for a site subscription.
            </strong>
          </li>
          <li>
            <strong>Errors (Sentry).</strong> We send error and performance data to Sentry.
            The app is configured with <code>sendDefaultPii: false</code> and{" "}
            <code>tracesSampleRate: 1</code> (performance traces on every request). Session
            replay is not configured. Sentry may still receive technical data (browser, URL,
            error details). Its servers can see the request IP;{" "}
            <strong>
              [Zach review] whether Sentry is set not to store IP addresses is a Sentry
              project setting, not something we can read from this codebase.
            </strong>
          </li>
          <li>
            <strong>Traffic and performance (Vercel Analytics and Speed Insights).</strong>{" "}
            The site loads Vercel Analytics and Speed Insights. Vercel’s public docs
            describe Web Analytics as cookieless. Claims that Speed Insights is not tied
            to an individual visitor or IP, and that analytics data is aggregated or
            hashed, are <strong>unverified</strong> against our own processing.
          </li>
          <li>
            <strong>Hosting logs.</strong> The site is hosted on Vercel. Vercel server logs
            include IP addresses by default. The database is hosted on Neon.
          </li>
          <li>
            <strong>Browser storage.</strong> For signed-out quiz takers we store answers in{" "}
            <code>sessionStorage</code> under the key <code>launchpad_quiz_pending</code>.
            That stash is cleared after save, or when the tab closes. We found no
            first-party <code>localStorage</code> and no first-party cookies besides Clerk’s
            (and Stripe’s on Stripe checkout pages).{" "}
            <strong>
              [Zach review] We do not show a cookie banner; confirm that this is acceptable
              for the jurisdictions you intend to serve.
            </strong>
          </li>
          <li>
            <strong>Email (Resend).</strong> When someone posts a discussion, reply, or
            prompt, we can send a moderation notice to admins. The post content is included
            in that admin email. There is no marketing email or newsletter sign-up in the
            product today. If we add a newsletter later, it will be opt-in.
          </li>
        </ul>
        <p>
          We do not use ad networks. We do not sell your personal information. We found no
          third-party embeds (no iframes, YouTube, Google Tag Manager, or ad scripts).
          Links to other sites leave Launchpad HQ.
        </p>
      </section>

      <section>
        <h2>Why we use it</h2>
        <p>
          We use this information to run accounts, save your favourites and quiz answers,
          fix bugs, understand traffic at an aggregate level, and moderate public posts.
        </p>
      </section>

      <section>
        <h2>Who we share with</h2>
        <p>
          We share data with service providers that run parts of the product: Clerk
          (authentication), Neon (database), Vercel (hosting, analytics, and speed
          insights), Stripe{" "}
          <strong>
            [Zach review] (intended for future sponsor invoices, not visitor
            subscriptions)
          </strong>
          , Sentry (errors), and Resend (transactional
          moderation email). We do not sell personal information and we do not run ads.
        </p>
      </section>

      <section>
        <h2>Public content</h2>
        <p>
          Reviews, prompts, discussions, and replies are shown publicly with the author.
          Do not post other people’s personal data, or anything you are not willing to see
          on the open web.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          <strong>
            [Zach review] We have not set documented retention periods in code. Propose and
            confirm how long account records, quiz answers, logs, and Sentry events are
            kept.
          </strong>{" "}
          Until then: account and preference data stay while the account exists.
          Favourites, progress, preferences, reviews, votes, ratings, and reports are
          deleted if the user record is deleted (cascade). Prompts, discussions, and
          replies are kept, with the author field set to null. Quiz answers in the
          browser last only for the tab session.
        </p>
      </section>

      <section>
        <h2>Your choices and rights</h2>
        <p>
          You can browse without an account. You can stop using the site at any time.
        </p>
        <p>
          There is no self-serve account-deletion button in the product.{" "}
          <strong>
            [Zach review] Email{" "}
            <a href="mailto:launchpadhq.admin@gmail.com">launchpadhq.admin@gmail.com</a> to
            ask us to delete your account. Confirm this process and typical timing.
          </strong>
        </p>
        <p>
          <strong>
            [Zach review] GDPR / UK GDPR: if you are in the EEA or UK, confirm the legal
            bases, international-transfer wording, and the rights we should list (access,
            correction, deletion, restriction, portability, objection, complaint to a
            supervisory authority).
          </strong>
        </p>
        <p>
          <strong>
            [Zach review] CCPA / CPRA: if you are a California resident, confirm the
            categories, “do not sell or share” statement, and the rights we should list
            (know, delete, correct, opt-out of sale/share, non-discrimination). We do not
            sell personal information; confirm whether any analytics hashing should be
            treated as a “share.”
          </strong>
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          <strong>
            [Zach review] Confirm the minimum age (for example 13, 16, or 18) and whether
            the service is directed at children. Until you confirm, we do not knowingly
            collect personal information from children.
          </strong>
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          We use established providers (Clerk, Neon, Vercel, and —{" "}
          <strong>[Zach review]</strong> Stripe for future sponsor invoices) and do not
          collect visitor card numbers for a site plan.{" "}
          <strong>
            [Zach review] No method of transmission or storage is perfectly secure.
          </strong>{" "}
          Tell us at{" "}
          <a href="mailto:launchpadhq.admin@gmail.com">launchpadhq.admin@gmail.com</a> if
          you think something has gone wrong.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update this policy. The “Last updated” date at the top will change.{" "}
          <strong>
            [Zach review] Continued use after an update means you accept the new policy.
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
