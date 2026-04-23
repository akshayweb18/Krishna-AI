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
          <h2 className="hero-title divine-serif leading-[1.1] md:leading-tight">
            Seek Guidance <br />
            from <span className="gold-text">Krishna</span>
          </h2>
          <p className="text-base md:text-xl text-divine-muted max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Ask anything, anytime. <br className="hidden md:block" />
            Receive divine wisdom from the Bhagavad Gita.
          </p>
          <div className="pt-4 flex justify-center lg:justify-start">
            <Link href="/chat" className="btn-gold inline-block px-10 py-4 text-base md:text-lg">
              <span>🛞</span> Start Conversation
            </Link>
          </div>
        </div>

            {/* Right hero visual removed per request */}
          </div>
        </div>
      </div>

      {/* Today's Shloka Card - Responsive Layout */}
      <div className="glass-card p-6 md:p-10 relative overflow-hidden group hero-border">
        <div className="flex flex-col lg:flex-row justify-between gap-8 items-stretch relative z-10">
          <div className="space-y-5 flex-1">
            <div className="flex items-center gap-3">
              <span className="text-lg">📖</span>
              <h3 className="text-sm font-bold gold-text divine-serif tracking-[0.2em] uppercase">Today's Shloka</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-xl md:text-3xl font-black divine-serif leading-relaxed tracking-tight">
                {shlok.sanskrit}
              </p>
              <div className="space-y-3 opacity-90">
                <p className="text-sm md:text-base font-serif italic text-divine-muted border-l border-divine-gold-soft pl-4">
                  {shlok.hindi}
                </p>
                <p className="text-sm md:text-base font-light text-divine-muted border-l border-divine-border pl-4">
                  {shlok.english}
                </p>
              </div>
            </div>

            <div className="pt-2 hidden sm:block">
              <p className="text-sm text-divine-muted leading-relaxed max-w-2xl font-light italic opacity-60">
                "Perform your duty without attachment to results..."
              </p>
            </div>
          </div>

          <div className="w-full lg:w-64">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 text-center h-full flex flex-col justify-center">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40 block mb-2">Bhagavad Gita</span>
                <span className="text-xs md:text-sm font-bold block mb-4">Chapter 2, Verse 47</span>
                <Link href="/chapter" className="w-full py-3 bg-divine-gold/10 hover:bg-divine-gold/20 text-divine-gold transition-colors rounded-xl text-[10px] font-black uppercase tracking-widest">
                  Read More <span>→</span>
                </Link>
             </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-divine-saffron rounded-full opacity-50"></div>
      </div>

      {/* Feature Grid - Responsive 2x2 or 4x1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pb-12">
        {[
          { title: "AI Chat", sub: "Talk to Krishna", icon: "💬" },
          { title: "Explore", sub: "Read & Learn", icon: "📖" },
          { title: "Meditation", sub: "Inner Peace", icon: "🪷" },
          { title: "Wisdom", sub: "Daily Quotes", icon: "📅" }
        ].map((item, idx) => (
          <Link key={idx} href="#" className="glass-card p-6 md:p-8 flex flex-col items-center text-center group feature-card">
            <div className="feature-icon-box group-hover:border-divine-gold transition-all duration-300">
              {item.icon}
            </div>
            <h4 className="text-base md:text-xl font-bold divine-serif mb-1">{item.title}</h4>
            <p className="text-[9px] md:text-xs text-divine-muted font-medium tracking-wide uppercase opacity-60">{item.sub}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}





