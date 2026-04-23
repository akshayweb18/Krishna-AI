import React from 'react'
import gita from '../../../../lib/gita.json'
import VerseCard from '../../../../components/VerseCard'
import ChapterControlsClient from '../../../../components/ChapterControlsClient'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return gita.chapters.map((c) => ({ id: String(c.id) }))
}

export default function ChapterPage({ params }: { params?: { id?: string | string[] } }) {
  // `params.id` can be undefined, a string or a string[] depending on the route.
  const idParam = params?.id
  const raw = Array.isArray(idParam) ? idParam[0] : idParam
  const id = Number(raw)
  if (!raw || Number.isNaN(id)) return <div>Not found</div>
  const chapter = gita.chapters.find((c) => c.id === id)
  if (!chapter) return <div>Not found</div>

  return (
    <section>
      <header className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#b7791f]">Chapter {chapter.id}: {chapter.name}</h2>
        {chapter.subtitle && <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">{chapter.subtitle}</p>}
        <ChapterControlsClient />
      </header>

      <div className="space-y-4">
        {chapter.verses.map((v) => (
          <article key={v.id} className="p-4 border rounded bg-white dark:bg-gray-900">
            {v.sanskrit ? <p className="verse-sanskrit font-serif text-lg leading-relaxed" style={{ fontSize: 'var(--verse-font-size, 1rem)' }}>{v.sanskrit}</p> : null}
            {v.hindi ? <p className="verse-hindi text-sm text-slate-800 dark:text-slate-200 mt-2" style={{ fontSize: 'calc(var(--verse-font-size,1rem) * 0.98)' }}>{v.hindi}</p> : null}
            {v.english ? <p className="verse-english text-sm text-slate-600 dark:text-slate-400 mt-2 italic" style={{ fontSize: 'calc(var(--verse-font-size,1rem) * 0.95)' }}>{v.english}</p> : null}
          </article>
        ))}
      </div>
    </section>
  )
}
