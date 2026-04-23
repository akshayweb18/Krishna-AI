import Link from 'next/link'
import gita from '../../lib/gita.json'

export const dynamic = 'force-static'

export default function GitaIndex() {
  return (
    <section>
      <h2 className="text-lg font-semibold text-[#b7791f]">Bhagavad Gita — Chapters</h2>
      <ul className="mt-4 space-y-2">
        {gita.chapters.map((c) => (
          <li key={c.id} className="p-3 border rounded-sm">
            <Link href={`/gita/chapter/${c.id}`} className="block">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Chapter {c.id}: {c.name}</div>
                  <div className="text-sm text-slate-600">{c.subtitle}</div>
                </div>
                <div className="text-sm text-saffron">Read</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
