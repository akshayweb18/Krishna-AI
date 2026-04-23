import gita from '../lib/gita.json'

export function getDailyShlok() {
  const day = Math.floor(Date.now() / 86400000)
  // pick a verse deterministically by day
  const chapterIndex = day % gita.chapters.length
  const chapter = gita.chapters[chapterIndex]
  const verse = chapter.verses[day % chapter.verses.length]
  return verse
}

export default function DailyShlok() {
  const v = getDailyShlok()
  return (
    <div>
      <p className="font-medium">{v.sanskrit}</p>
      <p className="text-sm text-slate-600">{v.english}</p>
    </div>
  )
}
