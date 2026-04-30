import Link from 'next/link'
import chaptersOverview from '../../data/chapters-overview.json'
import React from 'react'

export const dynamic = 'force-static'

export default function GitaIndex() {
  return (
    <main className="min-h-screen bg-[#0A0E1A] text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-black">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/[0.05] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/[0.03] blur-[150px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto py-12 md:py-24 px-6">
        <header className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-4 animate-fade-in">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Shrimad Bhagavad Gita</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white divine-serif animate-fade-in" style={{ animationDelay: '0.1s' }}>
            The Eighteen <span className="gold-text italic">Adhyayas</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed opacity-80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Explore the timeless wisdom of the Gita, chapter by chapter. Each verse is a step towards self-realization and inner peace.
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mx-auto mt-10"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {chaptersOverview.map((chapter) => (
            <Link 
              key={chapter.number} 
              href={`/gita/chapter/${chapter.number}`}
              className="group relative overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/5 p-8 transition-all duration-500 hover:bg-white/[0.04] hover:border-[#D4AF37]/30 hover:translate-y-[-4px]"
            >
              {/* Card Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl font-serif text-[#D4AF37]/20 group-hover:text-[#D4AF37]/40 transition-colors">
                    {String(chapter.number).padStart(2, '0')}
                  </span>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-[#D4AF37] transition-colors">
                    {chapter.verses} Verses
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-bold text-white divine-serif group-hover:text-[#D4AF37] transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed line-clamp-3 opacity-70 group-hover:opacity-100 transition-opacity">
                    {chapter.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#D4AF37] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                  Read Chapter <span>→</span>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-[#D4AF37]/20 group-hover:bg-[#D4AF37]/60 transition-all"></div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-32 text-center opacity-40 hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-500">Om Shanti Shanti Shanti</p>
        </footer>
      </div>
    </main>
  )
}
