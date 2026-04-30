import Link from 'next/link'
import React from 'react'
import { getDailyShlok } from '../components/DailyShlok'
import Footer from '../components/Footer'

export default function Home() {
  const shlok = getDailyShlok()

  return (
    <>
      {/* Celestial Stardust Background */}
      <div className="stardust-container">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              '--duration': `${2 + Math.random() * 4}s`
            } as any}
          />
        ))}
      </div>

      <section className="animate-fade-in space-y-12 md:space-y-32 pt-0 pb-12 md:pb-24 -mt-6">
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
                  <Link href="/gita" className="btn-gold inline-block px-10 py-4 text-base md:text-lg shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                    <span>🛞</span> Explore The Gita
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Statistics Bar */}
        <div className="relative -mt-32 z-20 px-4">
          <div className="max-w-4xl mx-auto glass-card py-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center bg-white/[0.02] border-[#D4AF37]/20">
            {[
              { label: "Chapters", value: "18", sub: "Adhyayas" },
              { label: "Verses", value: "700", sub: "Shlokas" },
              { label: "Wisdom", value: "∞", sub: "Infinite" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1 group relative">
                <div className="absolute inset-0 stat-glow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <span className="text-4xl md:text-5xl font-serif text-white block mb-1">{stat.value}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Topic Guidance Section - Mystical Oracles */}
        <div className="py-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-12">
            <div className="max-w-md text-center md:text-left">
              <h3 className="text-3xl md:text-5xl font-bold divine-serif text-white mb-4">Divine <span className="gold-text italic">Oracles</span></h3>
              <p className="text-slate-400 font-light leading-relaxed">Seek clarity in times of confusion. These sacred paths guide you to the specific wisdom you need right now.</p>
            </div>
            <div className="grid grid-cols-2 md:flex flex-wrap gap-4 w-full md:w-auto">
              {[
                { label: "Inner Peace", icon: "🕉️", q: "peace", color: "from-blue-500/20" },
                { label: "My Dharma", icon: "⚖️", q: "duty", color: "from-orange-500/20" },
                { label: "Overcoming Fear", icon: "🛡️", q: "fear", color: "from-red-500/20" },
                { label: "Life's Purpose", icon: "✨", q: "purpose", color: "from-purple-500/20" }
              ].map((topic, i) => (
                <Link
                  key={i}
                  href={`/search?q=${encodeURIComponent(topic.q)}`}
                  className={`group relative flex flex-col items-center justify-center p-8 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-500 overflow-hidden flex-1 min-w-[160px] md:min-w-[180px]`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500 z-10">{topic.icon}</span>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors z-10">{topic.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Shloka Card */}
        <div className="glass-card p-8 md:p-16 relative overflow-hidden group hero-border">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/[0.05] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#D4AF37]/[0.08] transition-colors duration-1000"></div>

          <div className="flex flex-col lg:flex-row justify-between gap-16 items-stretch relative z-10">
            <div className="space-y-10 flex-1">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                  <span className="text-2xl">📖</span>
                </div>
                <div>
                  <h3 className="text-[11px] font-black gold-text tracking-[0.5em] uppercase">Today's Shloka</h3>
                  <p className="text-slate-500 text-xs mt-1 uppercase tracking-widest">Timeless Wisdom for You</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-3xl md:text-5xl font-bold divine-serif leading-[1.3] tracking-tight text-white whitespace-pre-line group-hover:text-[#D4AF37] transition-colors duration-700">
                  {shlok.sanskrit}
                </p>
                <div className="space-y-6 border-l-2 border-[#D4AF37]/30 pl-10 py-2">
                  <p className="text-xl md:text-2xl font-light italic text-slate-200 leading-relaxed max-w-3xl">
                    "{shlok.hindi}"
                  </p>
                  <p className="text-base md:text-lg font-light text-slate-500 italic opacity-80 leading-relaxed">
                    {shlok.english}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white/[0.03] border border-white/10 rounded-[48px] p-10 text-center h-full flex flex-col justify-center backdrop-blur-3xl group-hover:border-[#D4AF37]/30 transition-all duration-700 shadow-2xl">
                <div className="mb-10">
                  <span className="text-[11px] font-black tracking-[0.5em] uppercase text-slate-500 block mb-4">The Bhagavad Gita</span>
                  <div className="w-12 h-[1px] bg-[#D4AF37]/30 mx-auto mb-6"></div>
                  <span className="text-2xl font-bold text-white divine-serif block leading-tight">Adhyaya {shlok.chapter}<br /><span className="text-lg opacity-60">Verse {shlok.verse}</span></span>
                </div>
                <Link href={`/gita/chapter/${shlok.chapter}`} className="w-full py-5 bg-[#D4AF37] hover:bg-[#F5E0A0] hover:scale-105 active:scale-95 text-black transition-all rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(212,175,55,0.3)]">
                  Read Adhyaya <span>→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-60"></div>
        </div>

        {/* Gallery of Virtues Section */}
        <div className="py-12 space-y-16">
          <div className="text-center space-y-6">
            <h3 className="text-4xl md:text-6xl font-bold divine-serif text-white">Divine <span className="gold-text italic">Virtues</span></h3>
            <p className="text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">The qualities of a steady mind, as described by Krishna.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Shanti", sub: "Inner Peace", desc: "The tranquility that remains undisturbed amidst the storms of life.", icon: "🕊️" },
              { title: "Satya", sub: "Absolute Truth", desc: "Aligning thoughts, words, and actions with the eternal reality.", icon: "💎" },
              { title: "Dharma", sub: "Righteous Duty", desc: "Acting in harmony with the universal law for the greater good.", icon: "⚖️" },
              { title: "Ahinsa", sub: "Non-Violence", desc: "Reverence for all life through kindness in thought and deed.", icon: "🌿" }
            ].map((virtue, i) => (
              <div key={i} className="virtue-card p-10 rounded-[40px] text-center space-y-6">
                <span className="text-4xl block">{virtue.icon}</span>
                <div>
                  <h4 className="text-2xl font-bold divine-serif text-white mb-1">{virtue.title}</h4>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-4">{virtue.sub}</p>
                </div>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{virtue.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Eternal Pillars Section - Sacred Monoliths */}
        <div className="py-12 space-y-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h3 className="text-4xl md:text-6xl font-bold divine-serif text-white leading-tight">
              Four <span className="gold-text italic">Pillars</span> of Transformation
            </h3>
            <p className="text-slate-400 font-light leading-relaxed text-lg">
              The Bhagavad Gita offers four universal paths to reach the ultimate truth. Choose the one that resonates with your soul.
            </p>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Karma Yoga", sub: "Selfless Action", desc: "The yoga of service. Finding perfection by performing every action as an offering without ego or attachment.", color: "#F59E0B", icon: "☸️" },
              { title: "Bhakti Yoga", sub: "Devoted Love", desc: "The yoga of devotion. Dissolving the boundaries of self through unconditional love and faith in the Divine.", color: "#EC4899", icon: "❤️" },
              { title: "Jnana Yoga", sub: "Deep Wisdom", desc: "The yoga of knowledge. Distinguishing the eternal soul from the temporary body through intense inquiry.", color: "#3B82F6", icon: "👁️" },
              { title: "Dhyana Yoga", sub: "Internal Silence", desc: "The yoga of meditation. Retracting the senses and steadying the mind to witness the light of the Atman.", color: "#A855F7", icon: "🧘" }
            ].map((pillar, i) => (
              <div key={i} className="group relative flex flex-col h-full p-10 rounded-[48px] bg-white/[0.02] border border-white/5 transition-all duration-700 hover:translate-y-[-12px] hover:bg-white/[0.04] hover:border-[#D4AF37]/30">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[48px] pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${pillar.color}15 0%, transparent 70%)`, boxShadow: `0 20px 80px ${pillar.color}08` }}></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-10 w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-4xl group-hover:scale-110 group-hover:border-[#D4AF37]/40 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.1)] transition-all duration-700">{pillar.icon}</div>
                  <div className="flex-1 space-y-4">
                    <h4 className="text-2xl font-bold divine-serif text-white group-hover:text-[#D4AF37] transition-colors">{pillar.title}</h4>
                    <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500">{pillar.sub}</p>
                    <p className="text-sm text-slate-400 font-light leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{pillar.desc}</p>
                  </div>
                  <div className="mt-10 pt-6 border-t border-white/5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors">Path of the Seeker</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {[
            { title: "Search", sub: "Find Verses", icon: "🔍", href: "/search" },
            { title: "Explore", sub: "Gita Chapters", icon: "📖", href: "/gita" },
            { title: "Meditation", sub: "Inner Peace", icon: "🪷", href: "/meditation" },
            { title: "Wisdom", sub: "Daily Insights", icon: "📅", href: "/shlokas" }
          ].map((item, idx) => (
            <Link key={idx} href={item.href} className="glass-card p-10 flex flex-col items-center text-center group feature-card hover:border-[#D4AF37]/40">
              <div className="feature-icon-box w-20 h-20 mb-8 group-hover:scale-110 group-hover:border-[#D4AF37] transition-all duration-700 shadow-xl">
                {item.icon}
              </div>
              <h4 className="text-xl md:text-2xl font-bold divine-serif mb-3 group-hover:gold-text transition-colors">{item.title}</h4>
              <p className="text-[10px] text-slate-500 font-black tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">{item.sub}</p>
            </Link>
          ))}
        </div>

        {/* Divine Journey Section - Starlit Path */}
        <div className="relative py-24 px-8 md:px-20 rounded-[80px] bg-[#0C0A1F] border border-white/5 overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.03] via-transparent to-[#A855F7]/[0.03] opacity-50"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/[0.05] blur-[150px] rounded-full group-hover:bg-[#D4AF37]/[0.08] transition-colors duration-1000"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5 space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 shadow-inner mx-auto lg:mx-0">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]"></div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">The Seeker's Path</span>
              </div>
              <h3 className="text-4xl md:text-7xl font-bold divine-serif text-white leading-[1.1]">
                Begin Your <span className="gold-text italic">Spiritual</span> Awakening
              </h3>
              <p className="text-xl text-slate-400 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                Krishna AI is more than a tool—it's a digital companion on your journey to self-realization. Experience the Gita like never before.
              </p>
              <div className="pt-6 flex flex-col md:flex-row items-center gap-8 justify-center lg:justify-start">
                <Link href="/gita" className="btn-gold px-16 py-6 text-lg shadow-[0_20px_60px_rgba(212,175,55,0.3)] hover:shadow-[0_25px_80px_rgba(212,175,55,0.5)] transition-all">
                  Start Your Path
                </Link>
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-600 mb-1">Available 24/7</span>
                  <span className="text-sm text-slate-400 font-light italic">Your companion in silence</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { step: "01", title: "Commune", desc: "Share your deepest thoughts and receive personalized Gita shlokas.", icon: "✨" },
                { step: "02", title: "Meditate", desc: "Deepen your understanding through curated spiritual sessions.", icon: "🪷" },
                { step: "03", title: "Ascend", desc: "Watch your perspective shift as you apply divine wisdom daily.", icon: "☀️" }
              ].map((item, i) => (
                <div key={i} className="relative group/item p-10 rounded-[56px] bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-[#D4AF37]/20 transition-all duration-700 shadow-xl">
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#0C0A1F] border border-white/10 rounded-full flex items-center justify-center text-3xl z-20 group-hover/item:border-[#D4AF37]/40 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                    {item.icon}
                  </div>
                  <span className="text-6xl font-serif text-[#D4AF37]/10 block mb-10 group-hover/item:text-[#D4AF37]/40 transition-colors">{item.step}</span>
                  <h4 className="text-2xl font-bold divine-serif text-white mb-6">{item.title}</h4>
                  <p className="text-base text-slate-500 font-light leading-relaxed group-hover/item:text-slate-300 transition-colors">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Universal Message Section */}
        <div className="py-24 text-center max-w-4xl mx-auto space-y-12 animate-fade-in">
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
          <p className="text-3xl md:text-5xl font-bold divine-serif text-white leading-tight italic opacity-90">
            "Whenever there is a decline in righteousness, O Arjuna, I manifest Myself."
          </p>
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase tracking-[1em] text-[#D4AF37]">Shloka 4.7</span>
            <p className="text-slate-600 text-xs uppercase tracking-[0.5em]">The Promise of Divine Protection</p>
          </div>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
