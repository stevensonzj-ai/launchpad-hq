import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { getPlatformCount, getCategoryCount, roundDownToTen } from "@/lib/platforms"
import { DEFAULT_OG_IMAGE, SITE_IS_PUBLIC, SITE_URL } from "@/lib/site"
import { BackToTop } from "@/components/layout/back-to-top"
import { Footer } from "@/components/layout/footer"

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
    metadataBase: new URL(SITE_URL),
    title: "Launchpad HQ - Your AI Mission Control",
    description: `Your AI mission control center. ${count}+ vetted tools across ${categoryCount} categories.`,
    // Defaults for pages without their own openGraph (publicPageMetadata sets the same).
    openGraph: { type: "website", siteName: "Launchpad HQ", images: [DEFAULT_OG_IMAGE] },
    ...(!SITE_IS_PUBLIC ? { robots: { index: false, follow: false } } : {}),
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
          <Footer />
          <BackToTop />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  )
}
