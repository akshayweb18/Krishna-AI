'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Verse = { 
  number: string; 
  sanskrit: string; 
  meaning: string; 
  chapter: number 
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Verse[]>([])
  const [chapterFilter, setChapterFilter] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    let mounted = true
    async function run() {
      if (!query.trim()) {
        setResults([])
        return
      }

      setIsSearching(true)
      try {
        // Fetch all chapters data
        // Note: For a larger app, this should be a proper search API
        // For now, we'll mimic the search logic
        const chaptersToFetch = Array.from({ length: 18 }, (_, i) => i + 1)
        const allVerses: Verse[] = []
        
        const fetchPromises = chaptersToFetch.map(async (id) => {
          try {
            const res = await import(`../../../data/chapters/chapter_${id}.json`)
            const data = res.default
            data.shlokas.forEach((s: any) => {
              allVerses.push({ ...s, chapter: id })
            })
          } catch (e) {
            console.error(`Error loading chapter ${id}`, e)
          }
        })

        await Promise.all(fetchPromises)

        if (!mounted) return

        const q = query.toLowerCase()
        const filtered = allVerses.filter((v) => {
          const inChapter = chapterFilter ? String(v.chapter) === chapterFilter : true
          return inChapter && (
            v.sanskrit.toLowerCase().includes(q) || 
            v.meaning.toLowerCase().includes(q) ||
            v.number.includes(q)
          )
        })
        
        setResults(filtered.slice(0, 50)) // Limit to 50 for performance
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setIsSearching(false)
      }
    }

    const debounce = setTimeout(run, 300)
    return () => {
      mounted = false
      clearTimeout(debounce)
    }
  }, [query, chapterFilter])

  return (
    <main className="min-h-screen bg-[#0A0E1A] text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-black pb-24">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/[0.03] blur-[120px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-24">
        <header className="mb-16 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 animate-fade-in">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Universal Search</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white divine-serif animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Search <span className="gold-text italic">Verses</span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-400 font-light leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Find specific shlokas across all 18 chapters of the Bhagavad Gita using keywords or verse numbers.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative flex-1 w-full">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Sanskrit shlokas or meanings..."
                className="w-full rounded-[20px] border border-white/10 bg-white/[0.02] px-6 py-4 text-white placeholder:text-slate-600 outline-none backdrop-blur-md transition focus:border-[#D4AF37]/40 focus:bg-white/[0.04]"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#D4AF37]/40">
                {isSearching ? (
                  <div className="w-5 h-5 border-2 border-[#D4AF37]/40 border-t-[#D4AF37] rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                )}
              </div>
            </div>

            <div className="w-full md:w-48 relative">
              <input
                type="number"
                min="1"
                max="18"
                value={chapterFilter}
                onChange={(e) => setChapterFilter(e.target.value)}
                placeholder="Chapter 1-18"
                className="w-full rounded-[20px] border border-white/10 bg-white/[0.02] px-6 py-4 text-white placeholder:text-slate-600 outline-none backdrop-blur-md transition focus:border-[#D4AF37]/40"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-600 uppercase">Adhyaya</span>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {results.length > 0 ? (
              results.map((r, i) => (
                <motion.div
                  key={`${r.chapter}-${r.number}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  layout
                >
                  <Link 
                    href={`/gita/chapter/${r.chapter}`}
                    className="group block p-6 md:p-8 rounded-[32px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-[#D4AF37]/20 transition-all duration-500"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Adhyaya {r.chapter}</span>
                        <div className="w-1 h-1 rounded-full bg-white/10"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Verse {r.number}</span>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:text-[#D4AF37] transition-colors">Read Full Chapter →</span>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="divine-serif text-xl md:text-2xl font-bold bg-gradient-to-r from-[#F5E0A0] to-[#D4AF37] bg-clip-text text-transparent group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.2)] transition-all">
                        {r.sanskrit}
                      </p>
                      <p className="text-slate-400 font-light italic line-clamp-2 text-sm md:text-base opacity-70 group-hover:opacity-100 transition-opacity">
                        {r.meaning}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : query && !isSearching ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <div className="text-4xl mb-4 opacity-10">ॐ</div>
                <p className="text-slate-500 font-light tracking-widest uppercase text-xs">No verses found matching your search</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
