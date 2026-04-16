"use client"

import { UserButton, useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { useState } from "react"
import { Search, Menu, X, Rocket } from "lucide-react"

export function Header() {
  const { isSignedIn, isLoaded } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<
    { id: string; slug: string; name: string; company: string | null }[]
  >([])

  async function handleSearch(q: string) {
    setSearchQuery(q)
    if (q.length < 2) {
      setSearchResults([])
      return
    }
    try {
      const res = await fetch("/api/search?q=" + encodeURIComponent(q))
      const data = await res.json()
      setSearchResults(data.results || [])
    } catch {
      setSearchResults([])
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <Rocket className="h-6 w-6 text-orange-400" />
          Launchpad<span className="text-orange-400">HQ</span>
        </Link>

        <div className="relative mx-4 hidden flex-1 max-w-md md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search AI tools..."
            className="w-full rounded-lg border border-gray-700 bg-gray-900 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 rounded-lg border border-gray-700 bg-gray-900 py-2 shadow-xl">
              {searchResults.map((r) => (
                <Link
                  key={r.id}
                  href={"/platform/" + r.slug}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  onClick={() => {
                    setSearchQuery("")
                    setSearchResults([])
                  }}
                >
                  <span className="font-medium text-white">{r.name}</span>
                  {r.company && (
                    <span className="ml-2 text-gray-500">by {r.company}</span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        <nav className="hidden items-center gap-4 md:flex">
          <Link href="/discover" className="text-sm text-gray-400 hover:text-white">
            Discover
          </Link>
          <Link href="/workflows" className="text-sm text-gray-400 hover:text-white">
            Workflows
          </Link>
          <Link href="/quiz" className="text-sm text-gray-400 hover:text-white">
            Quiz
          </Link>
          <Link href="/for-you" className="text-sm text-gray-400 hover:text-white">
            For you
          </Link>
          <Link href="/pricing" className="text-sm text-gray-400 hover:text-white">
            Pricing
          </Link>
          {isLoaded && !isSignedIn && (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
              >
                Sign In
              </Link>
              <Link href="/sign-up" className="text-sm text-gray-400 hover:text-white">
                Sign Up
              </Link>
            </>
          )}
          {isLoaded && isSignedIn && (
            <>
              <Link href="/account" className="text-sm text-gray-400 hover:text-white">
                Account
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                    userButtonPopoverCard: "bg-gray-900 border border-gray-800",
                  },
                }}
              />
            </>
          )}
        </nav>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-800 px-4 pb-4 pt-2 md:hidden">
          <Link href="/discover" className="block py-2 text-gray-300" onClick={() => setMobileOpen(false)}>
            Discover
          </Link>
          <Link href="/workflows" className="block py-2 text-gray-300" onClick={() => setMobileOpen(false)}>
            Workflows
          </Link>
          <Link href="/quiz" className="block py-2 text-gray-300" onClick={() => setMobileOpen(false)}>
            Quiz
          </Link>
          <Link href="/for-you" className="block py-2 text-gray-300" onClick={() => setMobileOpen(false)}>
            For you
          </Link>
          <Link href="/pricing" className="block py-2 text-gray-300" onClick={() => setMobileOpen(false)}>
            Pricing
          </Link>
          {isLoaded && !isSignedIn && (
            <>
              <Link href="/sign-in" className="block py-2 text-gray-300" onClick={() => setMobileOpen(false)}>
                Sign In
              </Link>
              <Link href="/sign-up" className="block py-2 text-gray-300" onClick={() => setMobileOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
          {isLoaded && isSignedIn && (
            <>
              <Link href="/account" className="block py-2 text-gray-300" onClick={() => setMobileOpen(false)}>
                Account
              </Link>
              <div className="flex items-center gap-2 py-2">
                <span className="text-sm text-gray-500">Signed in</span>
                <UserButton />
              </div>
            </>
          )}
        </div>
      )}
    </header>
  )
}
