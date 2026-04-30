'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import chaptersOverview from '../../data/chapters-overview.json'
import React from 'react'

const tabs = ['All Chapters', 'Favorites', 'Recent']

export default function ChapterPage() {
  const [activeTab, setActiveTab] = useState('All Chapters')
  const [query, setQuery] = useState('')

  const chapters = useMemo(() => {
    const term = query.trim().toLowerCase()
    let filtered = chaptersOverview

    if (activeTab === 'Favorites') {
      // Dummy logic for now, or use localStorage
      filtered = chaptersOverview.filter((chapter) => chapter.number % 2 === 0)
    } else if (activeTab === 'Recent') {
      filtered = chaptersOverview.slice(-5).reverse()
    }

    if (!term) return filtered

    return filtered.filter((chapter) => {
      return (
        String(chapter.number).includes(term) ||
        chapter.title.toLowerCase().includes(term) ||
        (chapter.description && chapter.description.toLowerCase().includes(term))
      )
    })
  }, [activeTab, query])

  return (
    <main className="min-h-screen bg-[#0C0A1F]/60 backdrop-blur-[1px] hardware-accelerated text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-black pb-24">
      {/* Background Atmosphere is now global in layout.tsx */}

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10 lg:py-24">
        <header className="mb-16 space-y-8 text-center md:text-left">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 animate-fade-in">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">The Eternal Wisdom</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white divine-serif animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Explore <span className="gold-text italic">Adhyayas</span>
            </h1>
            <p className="max-w-2xl text-lg text-slate-400 font-light leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Discover the 18 chapters of the Bhagavad Gita. Filter by favorites, search for specific shlokas, or browse the entire collection.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative flex-1 w-full">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search chapter title or description..."
                className="w-full rounded-[20px] border border-white/10 bg-white/[0.02] px-6 py-4 text-white placeholder:text-slate-600 outline-none backdrop-blur-md transition focus:border-[#D4AF37]/40 focus:bg-white/[0.04]"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#D4AF37]/40">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>

            <div className="flex gap-2 p-1.5 rounded-[20px] bg-white/[0.03] border border-white/10 backdrop-blur-md w-full md:w-auto">
              {tabs.map((tab) => {
                const active = activeTab === tab
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 md:flex-none rounded-[14px] px-6 py-2.5 text-xs font-black uppercase tracking-widest transition duration-300 ${active
                      ? 'bg-[#D4AF37] text-black shadow-[0_10px_25px_rgba(212,175,55,0.2)]'
                      : 'text-slate-500 hover:text-white'
                      }`}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {chapters.length === 0 ? (
            <div className="col-span-full rounded-[32px] border border-white/5 bg-white/[0.01] p-20 text-center">
              <div className="text-4xl mb-4 opacity-20">ॐ</div>
              <p className="text-slate-500 font-light tracking-wide">No chapters found matching your search.</p>
            </div>
          ) : (
            chapters.map((chapter) => (
              <Link
                key={chapter.number}
                href={`/gita/chapter/${chapter.number}`}
                className="group relative overflow-hidden rounded-[32px] border border-white/5 bg-white/[0.01] p-8 transition-all duration-500 hover:bg-white/[0.03] hover:border-[#D4AF37]/30 hover:translate-y-[-4px]"
              >
                <div className="relative flex items-center gap-6">
                  <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] border border-white/10 bg-white/5 group-hover:border-[#D4AF37]/40 transition-colors">
                    <div className="text-2xl font-serif text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors">
                      {chapter.number}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors">
                      Chapter {chapter.number}
                    </div>
                    <h2 className="mt-1 text-2xl font-bold text-white divine-serif group-hover:gold-text transition-colors ">
                      {chapter.title}
                    </h2>
                    <p className="mt-2 text-sm text-slate-400 font-light line-clamp-2 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">
                      {chapter.description}
                    </p>
                  </div>

                  <div className="ml-auto hidden sm:flex flex-col items-end gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]/40">
                      {chapter.verses} Verses
                    </span>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-white/5 group-hover:border-[#D4AF37]/30 group-hover:translate-x-1 transition-all">
                      <span className="text-xs">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
