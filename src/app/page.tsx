import Link from 'next/link'
import React from 'react'
import { getDailyShlok } from '../components/DailyShlok'

export default function Home() {
  const shlok = getDailyShlok()

  return (
    <section className="animate-fade-in space-y-8 md:space-y-20 pt-0 pb-6 md:pb-12 -mt-6">
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <div className="w-screen relative left-1/2 -translate-x-1/2 bg-cover bg-center bg-no-repeat min-h-screen home-hero"
          style={{ backgroundImage: "url('/krishanhomeimg.jpeg')" }}>
          <div className="absolute inset-0 bg-black/40 z-0 home-hero-overlay"></div>

          {/* Hero Section - Responsive Alignment */}
          <div className="flex items-center justify-center md:justify-start min-h-screen relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 md:space-y-8 text-center md:text-left px-4 md:px-0 w-full max-w-3xl md:ml-12">
          <h2 className="hero-title divine-serif leading-[1.1] md:leading-tight animate-fade-in">
            Seek Guidance <br />
            from <span className="gold-text italic">Krishna</span>
          </h2>
          <p className="text-base md:text-xl text-slate-300 max-w-lg mx-auto lg:mx-0 leading-relaxed opacity-80 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Ask anything, anytime. <br className="hidden md:block" />
            Receive divine wisdom from the Bhagavad Gita through AI.
          </p>
          <div className="pt-4 flex justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link href="/chat" className="btn-gold inline-block px-10 py-4 text-base md:text-lg shadow-[0_0_50px_rgba(212,175,55,0.3)]">
              <span>🛞</span> Start Conversation
            </Link>
          </div>
        </div>
          </div>
        </div>
      </div>

      {/* Today's Shloka Card - Responsive Layout */}
      <div className="glass-card p-6 md:p-12 relative overflow-hidden group hero-border">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/[0.03] blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#D4AF37]/[0.06] transition-colors duration-700"></div>
        
        <div className="flex flex-col lg:flex-row justify-between gap-12 items-stretch relative z-10">
          <div className="space-y-8 flex-1">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
                <span className="text-lg">📖</span>
              </div>
              <h3 className="text-[10px] font-black gold-text tracking-[0.4em] uppercase">Today's Shloka</h3>
            </div>
            
            <div className="space-y-6">
              <p className="text-2xl md:text-4xl font-bold divine-serif leading-[1.4] tracking-tight text-white whitespace-pre-line group-hover:text-[#D4AF37] transition-colors duration-500">
                {shlok.sanskrit}
              </p>
              <div className="space-y-4 opacity-90 border-l border-[#D4AF37]/30 pl-8 py-2">
                <p className="text-base md:text-xl font-light italic text-slate-300 leading-relaxed">
                  "{shlok.hindi}"
                </p>
                <p className="text-sm md:text-base font-light text-slate-500 italic opacity-60">
                  {shlok.english}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-72 shrink-0">
             <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 text-center h-full flex flex-col justify-center backdrop-blur-xl group-hover:border-[#D4AF37]/20 transition-all duration-500">
                <div className="mb-6">
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-500 block mb-2">Bhagavad Gita</span>
                  <span className="text-lg font-bold text-white divine-serif block">Adhyaya {shlok.chapter}, Verse {shlok.verse}</span>
                </div>
                <Link href={`/gita/chapter/${shlok.chapter}`} className="w-full py-4 bg-[#D4AF37] hover:scale-105 active:scale-95 text-black transition-all rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                  Read Adhyaya <span>→</span>
                </Link>
             </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
      </div>

      {/* Feature Grid - Responsive 2x2 or 4x1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-24">
        {[
          { title: "AI Chat", sub: "Talk to Krishna", icon: "💬", href: "/chat" },
          { title: "Explore", sub: "Gita Chapters", icon: "📖", href: "/chapter" },
          { title: "Meditation", sub: "Inner Peace", icon: "🪷", href: "/meditation" },
          { title: "Wisdom", sub: "Daily Insights", icon: "📅", href: "/shlokas" }
        ].map((item, idx) => (
          <Link key={idx} href={item.href} className="glass-card p-8 flex flex-col items-center text-center group feature-card">
            <div className="feature-icon-box mb-6 group-hover:scale-110 group-hover:border-[#D4AF37] transition-all duration-500">
              {item.icon}
            </div>
            <h4 className="text-lg md:text-xl font-bold divine-serif mb-2 group-hover:gold-text transition-colors">{item.title}</h4>
            <p className="text-[10px] text-slate-500 font-black tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">{item.sub}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
