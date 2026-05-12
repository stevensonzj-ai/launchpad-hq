import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { getPlatformCount, getCategoryCount, roundDownToTen } from "@/lib/platforms"
import { BackToTop } from "@/components/layout/back-to-top"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export async function generateMetadata(): Promise<Metadata> {
  const [platformCount, categoryCount] = await Promise.all([getPlatformCount(), getCategoryCount()])
  const count = roundDownToTen(platformCount)
  return {
    title: "Launchpad HQ - Your AI Mission Control",
    description: `Your AI mission control center. ${count}+ vetted tools across ${categoryCount} categories.`,
  }
}

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ""

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col bg-gray-950 text-white">
          {children}
          <BackToTop />
        </body>
      </html>
    </ClerkProvider>
  )
}
