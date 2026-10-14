import { redirect } from "next/navigation";

/**
 * Rate-card copy lives on /advertise (v2). This path redirects so we do not
 * keep two copies of the guidelines.
 */
export default function SponsorGuidelinesPage() {
  redirect("/advertise");
}
