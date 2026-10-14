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
          Launchpad HQ is operated by Lakeside Innovation Labs LLC, a Texas limited
          liability company. Contact:{" "}
          <a href="mailto:launchpadhq.admin@gmail.com">launchpadhq.admin@gmail.com</a>.
        </p>
        <p>
          This site is a free directory of AI tools. You can browse without an account. You
          may optionally create an account. There is no paid user subscription. Stripe is
          used only for sponsor invoices. See our <Link href="/terms">Terms of Use</Link>.
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <p>We only collect what the product actually uses today:</p>
        <ul>
          <li>
            <strong>Account (Clerk).</strong> Sign-in and sign-up run through Clerk. Clerk
            stores your account (email, name or username, profile image, sign-in method, and
            sessions) and sets its own essential authentication cookies. Clerk may offer
            additional sign-in methods (for example Google or GitHub) as configured in our
            Clerk dashboard.
          </li>
          <li>
            <strong>Our database (Neon Postgres).</strong> When you have an account we copy
            your Clerk user id, email, name, and avatar URL into our User record. We also
            store whether onboarding is complete. Historical plan and Stripe id columns may
            still exist in the database from an unused subscription experiment; they are
            not used to gate features. If you fill in preferences or the quiz, we store
            those answers (goals, budget, experience, industries, team size, priorities,
            quiz answers, and when the quiz was completed). We store saved tools
            (favourites) and tutorial progress. If you post reviews, prompts, discussions,
            or replies, we store that content and show it publicly with your author name.
            Votes and ratings, and reports (with a reason), are also stored. We found no
            IP-address column in our schema.
          </li>
          <li>
            <strong>Payments (Stripe).</strong> Stripe is used only for sponsor invoices.
            Visitor card details are not collected for a site subscription.
          </li>
          <li>
            <strong>Errors (Sentry).</strong> We send error and performance data to Sentry.
            The app is configured with <code>sendDefaultPii: false</code> and{" "}
            <code>tracesSampleRate: 1</code> (performance traces on every request). Session
            replay is not configured. Sentry may still receive technical data (browser, URL,
            error details). Its servers can see the request IP; whether Sentry stores those
            IP addresses is a Sentry project setting.
          </li>
          <li>
            <strong>Traffic and performance (Vercel Analytics and Speed Insights).</strong>{" "}
            The site loads Vercel Analytics and Speed Insights. Vercel Analytics is
            cookieless. Claims that Speed Insights is not tied to an individual visitor or
            IP, and that analytics data is aggregated or hashed, are unverified against our
            own processing.
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
            essential authentication cookies (and Stripe’s on Stripe checkout pages used
            only for sponsor invoices). We do not show a cookie banner.
          </li>
          <li>
            <strong>Email (Resend).</strong> When someone posts a discussion, reply, or
            prompt, we can send a moderation notice to admins. The post content is included
            in that admin email. There is no marketing email or newsletter sign-up in the
            product today. If we add a newsletter later, it will be opt-in.
          </li>
        </ul>
        <p>
          We do not use ad networks. We do not sell or share personal information. We found
          no third-party embeds (no iframes, YouTube, Google Tag Manager, or ad scripts).
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
          insights), Stripe (used only for sponsor invoices), Sentry (errors), and Resend
          (transactional moderation email). We do not sell or share personal information
          and we do not run ads.
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
          Account data is kept while the account exists and is deleted within 30 days of a
          deletion request. Logs and Sentry events are kept about 90 days. Favourites,
          progress, preferences, reviews, votes, ratings, and reports are deleted if the
          user record is deleted (cascade). Prompts, discussions, and replies are kept,
          with the author field set to null (anonymized). Quiz answers in the browser last
          only for the tab session.
        </p>
      </section>

      <section>
        <h2>Your choices and rights</h2>
        <p>
          You can browse without an account. You can stop using the site at any time.
        </p>
        <p>
          There is no self-serve account-deletion button in the product. Email{" "}
          <a href="mailto:launchpadhq.admin@gmail.com">launchpadhq.admin@gmail.com</a> to
          ask us to delete your account. We handle deletion requests within 30 days.
        </p>
        <p>
          If you are in the EEA or UK, we process personal data as needed to provide the
          service you request (contract), to operate and secure the site (legitimate
          interests), and where you have given consent. Providers may process data in the
          United States and other countries; we rely on those providers’ transfer
          safeguards. You have the right to access, correct, delete, restrict, or port
          your personal data, to object to processing, and to lodge a complaint with a
          supervisory authority.
        </p>
        <p>
          If you are a California resident, you have the right to know, delete, and
          correct personal information, to opt out of sale or sharing, and to
          non-discrimination for exercising these rights. We do not sell or share personal
          information as those terms are used in the CCPA/CPRA. To exercise these rights,
          email{" "}
          <a href="mailto:launchpadhq.admin@gmail.com">launchpadhq.admin@gmail.com</a>.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          You must be at least 13 years old to use Launchpad HQ. The site is not directed
          at children. We do not knowingly collect personal information from children
          under 13. If you believe we have, contact us and we will delete it.
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          We use established providers (Clerk, Neon, Vercel, and Stripe — used only for
          sponsor invoices) and do not collect visitor card numbers for a site plan. No
          method of transmission or storage is perfectly secure. Tell us at{" "}
          <a href="mailto:launchpadhq.admin@gmail.com">launchpadhq.admin@gmail.com</a> if
          you think something has gone wrong.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update this policy. The “Last updated” date at the top will change.
          Continued use after an update means you accept the new policy.
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
