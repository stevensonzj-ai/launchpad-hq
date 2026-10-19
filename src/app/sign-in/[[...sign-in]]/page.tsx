import { SignIn } from "@clerk/nextjs";
import { privatePageMetadata } from "@/lib/seo-metadata";

export const metadata = privatePageMetadata({
  title: "Sign in | Launchpad HQ",
  description: "Sign in to save matches, favourite platforms, and post to Launchpad HQ.",
  path: "/sign-in",
});

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 py-12">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-gray-900 border border-gray-800 shadow-xl",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "border-gray-700 text-white",
            formButtonPrimary: "bg-orange-500 hover:bg-orange-600",
            footerActionLink: "text-orange-400 hover:text-orange-300",
          },
        }}
      />
    </div>
  );
}
