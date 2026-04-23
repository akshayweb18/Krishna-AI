"use client"
import { useMemo, useState } from 'react'
import Link from 'next/link'

export default function ChapterSidebar({ chapters = [] }) {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return chapters
    return chapters.filter((c) => {
      return String(c.id).includes(term) || (c.name && c.name.toLowerCase().includes(term))
    })
  }, [q, chapters])

  return (
    <div className="card">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter chapters..."
        className="w-full mb-3 input"
        aria-label="Filter chapters"
      />

      <ul className="space-y-1 max-h-72 overflow-auto">
        {filtered.map((c) => (
          <li key={c.id}>
            <Link href={`/gita/chapter/${c.id}`} className="block py-2 text-sm hover:bg-opacity-80 rounded px-2">
              <span className="font-semibold text-saffron mr-2">Chapter {c.id}:</span>
              <span className="truncate">{c.name || '—'}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
