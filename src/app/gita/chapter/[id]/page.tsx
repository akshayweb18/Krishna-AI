import React from 'react'
import chaptersOverview from '../../../../data/chapters-overview.json'
import VerseCard from '../../../../components/VerseCard'
import ResumeReading from '../../../../components/ResumeReading'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return chaptersOverview.map((c) => ({ id: String(c.number) }))
}

// Helper to load chapter data
async function getChapterData(id: number) {
  try {
    const chapter = await import(`../../../../data/chapters/chapter_${id}.json`)
    return chapter.default
  } catch (e) {
    return null
  }
}

export default async function ChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params
  const id = Number(rawId)

  if (!rawId || Number.isNaN(id)) notFound()

  const overview = chaptersOverview.find((c) => c.number === id)
  if (!overview) notFound()

  const chapterData = await getChapterData(id)
  if (!chapterData) notFound()

  return (
    <main className="min-h-screen bg-[#0A0E1A] text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/[0.02] blur-[120px] rounded-full" />
      </div>

      {/* Floating Resume Button */}
      <ResumeReading chapterId={id} />

      <div className="relative w-full mx-auto py-8 md:py-16 px-4 md:px-12 lg:px-20">

        <nav className="mb-12 flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/gita" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-[#D4AF37] transition-all">
            <span className="w-6 h-6 flex items-center justify-center rounded-full border border-white/5 group-hover:border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/10">←</span>
            Back to Gita
          </Link>

          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
            {id} of 18
          </div>
        </nav>

        <header className="text-center space-y-6 mb-16 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/[0.03] border border-white/10 shadow-2xl backdrop-blur-md mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Adhyaya {id}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white divine-serif mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {chapterData.chapterTitle}
          </h1>

          <p className="text-lg md:text-xl text-slate-400 font-light italic max-w-2xl mx-auto leading-relaxed opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {chapterData.description}
          </p>
        </header>

        <section className="space-y-12 w-full">
          {chapterData.shlokas.map((s: any, idx: number) => (
            <div key={idx} className="w-full max-w-6xl mx-auto">
              <VerseCard verse={s} />
            </div>
          ))}
        </section>

        <footer className="mt-32 pt-16 border-t border-white/5 text-center pb-24 max-w-7xl mx-auto">
          <div className="space-y-12">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[1.2em] text-slate-600">Iti Shrimad Bhagavad Gita</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white/40 divine-serif">The Song of God</h3>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link href="/gita" className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-white/10 transition-all">
                All Chapters
              </Link>
              {id < 18 && (
                <Link href={`/gita/chapter/${id + 1}`} className="px-10 py-4 rounded-full bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                  Next Adhyaya
                </Link>
              )}
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
