import authenticGita from '../data/gita-prabodhini-authentic.json'

export function getDailyShlok() {
  const day = Math.floor(Date.now() / 86400000)
  // pick a verse deterministically by day from the authentic collection
  const verseIndex = day % authenticGita.verses.length
  const verse = authenticGita.verses[verseIndex]
  
  return {
    sanskrit: verse.sanskrit,
    hindi: verse.anuvad_hindi,
    english: verse.english_translation,
    chapter: verse.chapter,
    verse: verse.verse
  }
}

export default function DailyShlok() {
  const v = getDailyShlok()
  return (
    <div className="space-y-4">
      <div className="text-center md:text-left">
        <p className="divine-serif text-xl md:text-3xl font-bold leading-relaxed mb-6 bg-gradient-to-b from-[#F5E0A0] via-[#D4AF37] to-[#B7950B] bg-clip-text text-transparent drop-shadow-sm whitespace-pre-line">
          {v.sanskrit}
        </p>
        <div className="space-y-3 opacity-90 border-l-2 border-[#D4AF37]/30 pl-6 py-2">
          <p className="text-sm md:text-lg font-light italic text-slate-300">
            "{v.hindi}"
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#D4AF37]"></div>
            <p className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
              Adhyaya {v.chapter}, Verse {v.verse}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
