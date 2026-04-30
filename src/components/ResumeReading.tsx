'use client'

import React, { useState, useEffect } from 'react'

export default function ResumeReading({ chapterId }: { chapterId: number }) {
  const [lastRead, setLastRead] = useState<string | null>(null)

  const checkLastRead = () => {
    const stored = localStorage.getItem('gita-last-read')
    if (stored && stored.startsWith(`${chapterId}.`)) {
      setLastRead(stored)
    } else {
      setLastRead(null)
    }
  }

  useEffect(() => {
    checkLastRead()
    window.addEventListener('last-read-updated', checkLastRead)
    return () => window.removeEventListener('last-read-updated', checkLastRead)
  }, [chapterId])

  if (!lastRead) return null

  const scrollToLastRead = () => {
    const element = document.getElementById(`shloka-${lastRead}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="fixed bottom-24 right-6 md:right-12 z-[100] animate-fade-in">
      <button
        onClick={scrollToLastRead}
        className="group flex items-center gap-3 px-6 py-3 rounded-full bg-[#D4AF37] text-black shadow-[0_15px_40px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all"
      >
        <span className="text-xl">🔖</span>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Resume Reading</span>
          <span className="text-xs font-bold font-serif">Verse {lastRead}</span>
        </div>
      </button>
    </div>
  )
}
