"use client"
import Link from 'next/link'

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bottom-nav lg:hidden">
      <div className="max-w-4xl mx-auto px-4 flex justify-between items-center h-14">
        <Link href="/" className="text-center w-1/4 text-sm">Home</Link>
        <Link href="/gita" className="text-center w-1/4 text-sm">Chapters</Link>
        <Link href="/search" className="text-center w-1/4 text-sm">Search</Link>
        <Link href="/chat" className="text-center w-1/4 text-sm">Chat</Link>
      </div>
    </nav>
  )
}
