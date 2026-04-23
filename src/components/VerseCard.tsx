import React from 'react'

type Verse = {
  id: number
  sanskrit: string
  hindi: string
  english: string
}

export default function VerseCard({ verse }: { verse: Verse }) {
  return (
    <article className="divine-card group p-8 md:p-12 overflow-visible">
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-divine-glass border border-divine-gold-soft rounded-full flex items-center justify-center text-xs font-black shadow-lg z-20 group-hover:scale-110 transition-transform">
        {verse.id}
      </div>
      
      <div className="space-y-10 relative z-10">
        <div className="text-center space-y-6">
          <p className="divine-serif text-3xl md:text-5xl font-black leading-[1.3] text-divine-purple tracking-tight">
            {verse.sanskrit}
          </p>
          <div className="flex justify-center items-center gap-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-divine-gold"></div>
            <span className="text-2xl opacity-20">🕉️</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-divine-gold"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
          <div className="space-y-4">
            <span className="text-[9px] font-black tracking-[0.3em] uppercase opacity-40">Hindi Anuvad</span>
            <p className="text-lg text-divine-muted leading-relaxed font-serif italic border-l border-divine-gold-soft pl-6">
              {verse.hindi}
            </p>
          </div>
          <div className="space-y-4">
            <span className="text-[9px] font-black tracking-[0.3em] uppercase opacity-40">English Translation</span>
            <p className="text-lg text-divine-muted leading-relaxed font-light">
              {verse.english}
            </p>
          </div>
        </div>
      </div>

      {/* Ornate Corner Elements */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-divine-gold-soft opacity-20 group-hover:opacity-100 transition-opacity rounded-tr-3xl"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-divine-gold-soft opacity-20 group-hover:opacity-100 transition-opacity rounded-bl-3xl"></div>
    </article>
  )
}


