'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type Shloka = {
  number: string
  sanskrit: string
  meaning: string
}

export default function VerseCard({ verse }: { verse: Shloka }) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const lastRead = localStorage.getItem('gita-last-read')
    if (lastRead === verse.number) {
      setIsBookmarked(true)
    }
  }, [verse.number])

  const toggleBookmark = () => {
    if (isBookmarked) {
      localStorage.removeItem('gita-last-read')
      setIsBookmarked(false)
    } else {
      localStorage.setItem('gita-last-read', verse.number)
      setIsBookmarked(true)
      // Dispatch a custom event to notify other components (like a 'Jump to Last Read' button)
      window.dispatchEvent(new Event('last-read-updated'))
    }
  }

  if (!verse.sanskrit && !verse.meaning) return null

  // Extract verse number for display (e.g., "1.1" -> "1")
  const verseId = verse.number.split('.').pop()

  return (
    <motion.article
      id={`shloka-${verse.number}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative space-y-8 group p-8 md:p-12 rounded-[40px] transition-all duration-700 shadow-2xl border ${isBookmarked
          ? 'bg-[#D4AF37]/[0.05] border-[#D4AF37]/40 shadow-[#D4AF37]/10'
          : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-[#D4AF37]/30'
        }`}
    >
      {/* Decorative Verse Number Badge */}
      <div className={`absolute -top-4 -left-4 w-14 h-14 flex items-center justify-center rounded-2xl border font-serif text-lg shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10 group-hover:scale-110 transition-transform duration-500 ${isBookmarked ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-[#0A0E1A] text-[#D4AF37] border-[#D4AF37]/40'
        }`}>
        {verseId}
      </div>

      {/* Bookmark / Last Read Button */}
      <button
        onClick={toggleBookmark}
        className={`absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center rounded-xl border transition-all duration-300 z-10 ${isBookmarked
            ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
            : 'bg-white/5 text-slate-500 border-white/10 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]'
          }`}
        title={isBookmarked ? "Last Read" : "Mark as Last Read"}
      >
        <span className="text-xl">{isBookmarked ? '🔖' : '🔖'}</span>
      </button>

      {/* Sanskrit Verse Container */}
      <div className="text-center space-y-8 pt-4">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.3em] shadow-inner transition-colors ${isBookmarked ? 'bg-[#D4AF37]/20 border-[#D4AF37]/30 text-[#D4AF37]' : 'bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37]'
          }`}>
          <span className={`w-1.5 h-1.5 rounded-full bg-[#D4AF37] ${isBookmarked ? 'animate-none' : 'animate-pulse'}`}></span>
          Shloka {verse.number} {isBookmarked && "(Last Read)"}
        </div>

        <div className="relative">
          {/* Decorative Quote Mark */}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl text-[#D4AF37]/5 divine-serif select-none">"</span>

          <p className={`divine-serif text-2xl md:text-4xl font-bold leading-[1.8] tracking-wide whitespace-pre-line px-4 md:px-12 bg-gradient-to-b from-[#F5E0A0] via-[#D4AF37] to-[#B7950B] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(212,175,55,0.15)]`}>
            {verse.sanskrit}
          </p>
        </div>
      </div>

      {/* Premium Divider */}
      <div className="flex justify-center items-center gap-6 py-4">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>
        <div className="relative">
          <div className={`w-2.5 h-2.5 rotate-45 border transition-colors ${isBookmarked ? 'border-[#D4AF37] bg-[#D4AF37]' : 'border-[#D4AF37]/60 bg-[#D4AF37]/20'}`}></div>
          <div className="absolute inset-0 w-2.5 h-2.5 rotate-45 bg-[#D4AF37] animate-ping opacity-20"></div>
        </div>
        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent via-[#D4AF37]/40 to-transparent"></div>
      </div>

      {/* Translation/Meaning Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/80">The Meaning</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
        </div>

        <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light italic text-center px-4 md:px-16 opacity-90 group-hover:opacity-100 transition-opacity duration-500 selection:bg-[#D4AF37]/20">
          {verse.meaning}
        </p>
      </div>

      {/* Subtle Interactive Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#D4AF37]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
    </motion.article>
  )
}
