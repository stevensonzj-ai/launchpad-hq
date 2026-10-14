import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 py-12">
      <SignUp
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
      <p className="mt-6 max-w-sm text-center text-xs text-gray-600">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="hover:text-orange-400">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="hover:text-orange-400">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
