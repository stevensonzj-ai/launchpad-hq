import { UserProfile } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-white">Account</h1>
      <div className="flex justify-center">
        <UserProfile
          path="/account"
          routing="path"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-gray-900 border border-gray-800 shadow-xl",
              navbar: "bg-gray-900",
              navbarButton: "text-gray-300",
            },
          }}
        />
      </div>
    </div>
  );
}
