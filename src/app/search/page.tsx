"use client"
import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar'

type V = { id: number; sanskrit: string; hindi: string; english: string; chapter: number }

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<V[]>([])
  const [chapterFilter, setChapterFilter] = useState('')

  useEffect(() => {
    let mounted = true
    async function run() {
      const res = await fetch('/api/gita')
      const data = await res.json()
      const all: V[] = []
      data.chapters.forEach((c: any) => c.verses.forEach((v: any) => all.push({ ...v, chapter: c.id })))
      if (!mounted) return
      if (!query) {
        setResults([])
        return
      }
      const q = query.toLowerCase()
      const filtered = all.filter((v) => {
        const inChapter = chapterFilter ? String(v.chapter) === chapterFilter : true
        return inChapter && (v.sanskrit.toLowerCase().includes(q) || v.hindi.toLowerCase().includes(q) || v.english.toLowerCase().includes(q))
      })
      setResults(filtered.slice(0, 200))
    }
    run()
    return () => { mounted = false }
  }, [query, chapterFilter])

  return (
    <section>
      <h2 className="text-lg font-semibold text-[#b7791f]">Search Verses</h2>
      <SearchBar value={query} onChange={setQuery} />

      <div className="mt-3 flex gap-2">
        <input
          className="input"
          placeholder="Filter by chapter (1-18)"
          value={chapterFilter}
          onChange={(e) => setChapterFilter(e.target.value)}
        />
      </div>

      <div className="mt-4 space-y-3">
        {results.map((r) => (
          <article key={`${r.chapter}-${r.id}`} className="p-3 border rounded">
            <div className="text-sm text-slate-500">Chapter {r.chapter}</div>
            <p className="font-serif">{r.sanskrit}</p>
            <p className="text-sm text-slate-700">{r.english}</p>
          </article>
        ))}
        {results.length === 0 && query && <div className="text-sm text-slate-500">No results</div>}
      </div>
    </section>
  )
}
