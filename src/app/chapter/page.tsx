'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import gita from '../../lib/gita.json'

const tabs = ['All Chapters', 'Favorites', 'Recent']

export default function ChapterPage() {
  const [activeTab, setActiveTab] = useState('All Chapters')
  const [query, setQuery] = useState('')

  const chapters = useMemo(() => {
    const term = query.trim().toLowerCase()
    let filtered = gita.chapters

    if (activeTab === 'Favorites') {
      filtered = gita.chapters.filter((chapter) => chapter.id % 2 === 0)
    } else if (activeTab === 'Recent') {
      filtered = gita.chapters.slice(-5).reverse()
    }

    if (!term) return filtered

    return filtered.filter((chapter) => {
      return (
        String(chapter.id).includes(term) ||
        chapter.name.toLowerCase().includes(term) ||
        (chapter.subtitle && chapter.subtitle.toLowerCase().includes(term))
      )
    })
  }, [activeTab, query])

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]/75">Explore Chapters</p>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">Explore Chapters</h1>
              <p className="max-w-2xl text-sm text-slate-400">Find the right chapter, see verse counts, and navigate with a clean golden UI.</p>
            </div>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#121217]/90 text-[#d4af37] shadow-[0_12px_40px_rgba(212,175,55,0.16)] transition hover:border-[#d4af37]/50"
              aria-label="Filter"
            >
              ⚡
            </button>
          </div>

          <div className="relative">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search shloka, chapter..."
              className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 outline-none shadow-[0_16px_60px_rgba(0,0,0,0.3)] transition focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/15"
            />
          </div>

          <div className="flex flex-wrap gap-3 rounded-3xl border border-white/10 bg-white/5 p-2 shadow-[0_15px_40px_rgba(0,0,0,0.18)]">
            {tabs.map((tab) => {
              const active = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? 'bg-linear-to-r from-[#fbbf24] via-[#d4af37] to-[#fcd34d] text-slate-950 shadow-[0_12px_30px_rgba(212,175,55,0.2)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-4">
          {chapters.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-sm text-slate-400">
              No chapters found. Try a different search term or tab.
            </div>
          ) : (
            chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/gita/chapter/${chapter.id}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-5 sm:p-6 transition hover:-translate-y-1 hover:border-[#d4af37] hover:shadow-[0_24px_70px_rgba(212,175,55,0.18)]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-[#d4af37]/8 via-transparent to-[#f59e0b]/8 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[#d4af37]/20 bg-[#111214]/95 shadow-[inset_0_0_18px_rgba(255,255,255,0.04)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#1f1c12] via-[#2e2410] to-[#3f2f14] text-2xl text-[#fbbf24] shadow-md">
                      ॐ
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-xs uppercase tracking-[0.32em] text-[#d4af37]/75">Chapter {chapter.id}</div>
                    <h2 className="mt-2 text-lg font-semibold text-white">{chapter.name}</h2>
                    <p className="mt-1 text-sm text-slate-400">{chapter.subtitle}</p>
                  </div>

                  <div className="ml-auto flex flex-col items-end gap-1 text-right">
                    <span className="text-sm font-semibold text-[#f5e0a0]">{chapter.verses?.length ?? 0} Verses</span>
                    <span className="text-2xl text-slate-400 transition group-hover:text-[#d4af37]">→</span>
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
