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
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              '--duration': `${3 + Math.random() * 5}s`
            } as any}
          />
        ))}
      </div>

      <section className="animate-fade-in space-y-16 md:space-y-32 pt-0 pb-16 md:pb-24">
        {/* Hero Section - Clean Full Width */}
        <div className="relative w-full overflow-hidden -mt-20">
          <div className="w-full bg-cover bg-center bg-no-repeat min-h-[90vh] md:min-h-screen home-hero"
            style={{ backgroundImage: "url('/bhagwan.png')" }}>
            <div className="absolute inset-0 bg-black/40 z-0 home-hero-overlay"></div>

            {/* Centered Hero Content with its own padding */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 min-h-[90vh] md:min-h-screen flex items-center justify-center md:justify-start relative z-10">
              <div className="space-y-6 md:space-y-8 text-center md:text-left w-full max-w-4xl">
                <h1 className="hero-title divine-serif leading-[1.1] md:leading-tight animate-fade-in text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                  Seek Guidance <br />
                  from <span className="gold-text italic">Krishna</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-lg mx-auto md:mx-0 leading-relaxed opacity-90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  Ask anything, anytime. <br className="hidden md:block" />
                  Receive divine wisdom from the Bhagavad Gita through AI.
                </p>
                <div className="pt-4 flex justify-center md:justify-start animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <Link href="/gita" className="btn-gold inline-flex px-8 md:px-12 py-4 md:py-5 text-base md:text-lg shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-transform">
                    <span>🛞</span> Explore The Gita
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Consistent Container for ALL other sections */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 md:space-y-32">

          {/* Sacred Statistics Bar */}


          {/* Topic Guidance Section - Mystical Oracles */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
              <div className="max-w-xl text-center lg:text-left space-y-4">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold divine-serif text-white leading-tight">Divine <span className="gold-text italic">Oracles</span></h3>
                <p className="text-slate-400 font-light leading-relaxed text-base md:text-lg">Seek clarity in times of confusion. These sacred paths guide you to the specific wisdom you need right now.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
                {[
                  { label: "Inner Peace", icon: "🕉️", q: "peace", color: "from-blue-500/20" },
                  { label: "My Dharma", icon: "⚖️", q: "duty", color: "from-orange-500/20" },
                  { label: "Overcoming Fear", icon: "🛡️", q: "fear", color: "from-red-500/20" },
                  { label: "Life's Purpose", icon: "✨", q: "purpose", color: "from-purple-500/20" }
                ].map((topic, i) => (
                  <Link
                    key={i}
                    href={`/search?q=${encodeURIComponent(topic.q)}`}
                    className={`group relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-[32px] md:rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-500 overflow-hidden min-w-[140px] md:min-w-[180px] h-full shadow-lg`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <span className="text-3xl md:text-4xl mb-4 group-hover:scale-110 transition-transform duration-500 z-10">{topic.icon}</span>
                    <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors z-10 text-center">{topic.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Today's Shloka Card */}
          <div className="glass-card p-8 md:p-16 relative overflow-hidden group hero-border">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/[0.05] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#D4AF37]/[0.08] transition-colors duration-1000"></div>

            <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-20 items-stretch relative z-10">
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
                  <p className="text-2xl md:text-4xl lg:text-4xl font-bold divine-serif leading-[1.4] tracking-tight text-white whitespace-pre-line group-hover:text-[#D4AF37] transition-colors duration-700">
                    {shlok.sanskrit}
                  </p>
                  <div className="space-y-6 border-l-2 border-[#D4AF37]/30 pl-6 md:pl-10 py-2">
                    <p className="text-lg md:text-xl font-light italic text-slate-200 leading-relaxed max-w-3xl">
                      "{shlok.hindi}"
                    </p>
                    <p className="text-sm md:text-base font-light text-slate-500 italic opacity-80 leading-relaxed">
                      {shlok.english}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-80 shrink-0">
                <div className="bg-white/[0.03] border border-white/10 rounded-[32px] md:rounded-[48px] p-8 md:p-12 text-center h-full flex flex-col justify-center backdrop-blur-3xl group-hover:border-[#D4AF37]/30 transition-all duration-700 shadow-2xl">
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
            <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-60"></div>
          </div>

          {/* Gallery of Virtues Section */}
          <div className="py-12 space-y-16">
            <div className="text-center space-y-6">
              <h3 className="text-4xl md:text-6xl font-bold divine-serif text-white">Divine <span className="gold-text italic">Virtues</span></h3>
              <p className="text-slate-400 font-light max-w-2xl mx-auto leading-relaxed text-base md:text-lg">The qualities of a steady mind, as described by Krishna.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { title: "Shanti", sub: "Inner Peace", desc: "The tranquility that remains undisturbed amidst the storms of life.", icon: "🕊️" },
                { title: "Satya", sub: "Absolute Truth", desc: "Aligning thoughts, words, and actions with the eternal reality.", icon: "💎" },
                { title: "Dharma", sub: "Righteous Duty", desc: "Acting in harmony with the universal law for the greater good.", icon: "⚖️" },
                { title: "Ahinsa", sub: "Non-Violence", desc: "Reverence for all life through kindness in thought and deed.", icon: "🌿" }
              ].map((virtue, i) => (
                <div key={i} className="virtue-card p-10 rounded-[32px] md:rounded-[40px] text-center space-y-6 shadow-md hover:shadow-xl">
                  <span className="text-4xl block transform group-hover:scale-110 transition-transform">{virtue.icon}</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { title: "Karma Yoga", sub: "Selfless Action", desc: "The yoga of service. Finding perfection by performing every action as an offering without ego or attachment.", color: "#F59E0B", icon: "☸️" },
                { title: "Bhakti Yoga", sub: "Devoted Love", desc: "The yoga of devotion. Dissolving the boundaries of self through unconditional love and faith in the Divine.", color: "#EC4899", icon: "❤️" },
                { title: "Jnana Yoga", sub: "Deep Wisdom", desc: "The yoga of knowledge. Distinguishing the eternal soul from the temporary body through intense inquiry.", color: "#3B82F6", icon: "👁️" },
                { title: "Dhyana Yoga", sub: "Internal Silence", desc: "The yoga of meditation. Retracting the senses and steadying the mind to witness the light of the Atman.", color: "#A855F7", icon: "🧘" }
              ].map((pillar, i) => (
                <div key={i} className="group relative flex flex-col h-full p-8 md:p-10 rounded-[32px] md:rounded-[48px] bg-white/[0.02] border border-white/5 transition-all duration-700 hover:translate-y-[-12px] hover:bg-white/[0.04] hover:border-[#D4AF37]/30 shadow-lg">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[32px] md:rounded-[48px] pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${pillar.color}15 0%, transparent 70%)`, boxShadow: `0 20px 80px ${pillar.color}08` }}></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-8 md:mb-10 w-16 md:w-20 h-16 md:h-20 rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-3xl md:text-4xl group-hover:scale-110 group-hover:border-[#D4AF37]/40 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.1)] transition-all duration-700">{pillar.icon}</div>
                    <div className="flex-1 space-y-4">
                      <h4 className="text-2xl font-bold divine-serif text-white group-hover:text-[#D4AF37] transition-colors">{pillar.title}</h4>
                      <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500">{pillar.sub}</p>
                      <p className="text-sm text-slate-400 font-light leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{pillar.desc}</p>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pb-12">
            {[
              { title: "Search", sub: "Find Verses", icon: "🔍", href: "/search" },
              { title: "Explore", sub: "Gita Chapters", icon: "📖", href: "/gita" },
              { title: "Meditation", sub: "Inner Peace", icon: "🪷", href: "/meditation" },
              { title: "Wisdom", sub: "Daily Insights", icon: "📅", href: "/shlokas" }
            ].map((item, idx) => (
              <Link key={idx} href={item.href} className="glass-card p-6 md:p-10 flex flex-col items-center text-center group feature-card hover:border-[#D4AF37]/40 shadow-md">
                <div className="feature-icon-box w-16 md:w-20 h-16 md:h-20 mb-6 md:mb-8 group-hover:scale-110 group-hover:border-[#D4AF37] transition-all duration-700 shadow-xl">
                  {item.icon}
                </div>
                <h4 className="text-lg md:text-2xl font-bold divine-serif mb-2 group-hover:gold-text transition-colors">{item.title}</h4>
                <p className="text-[9px] md:text-[10px] text-slate-500 font-black tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">{item.sub}</p>
              </Link>
            ))}
          </div>

          {/* Divine Journey Section - Starlit Path */}
          <div className="pb-24 relative">
            <div className="relative py-20 md:py-32 px-8 md:px-24 rounded-[48px] md:rounded-[96px] bg-[#0A0E1A] border border-[#D4AF37]/10 group shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden">

              {/* Background Atmospheric Layers */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.05] via-transparent to-[#7C3AED]/[0.05] opacity-60"></div>
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#D4AF37]/[0.03] blur-[150px] rounded-full group-hover:bg-[#D4AF37]/[0.06] transition-colors duration-1000"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#7C3AED]/[0.03] blur-[150px] rounded-full"></div>
              </div>

              <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-16 xl:gap-24 items-center">
                {/* Left Content - The Call */}
                <div className="xl:col-span-4 space-y-10 text-center xl:text-left">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mx-auto xl:mx-0">
                      <div className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_12px_#D4AF37] animate-pulse"></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Sacred Evolution</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold divine-serif text-white leading-tight">
                      Begin Your <br />
                      <span className="gold-text italic">Spiritual</span> Awakening
                    </h3>
                  </div>

                  <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed max-w-lg mx-auto xl:mx-0">
                    Krishna AI is your digital companion on the road to self-realization. Experience the Bhagavad Gita's wisdom through modern innovation.
                  </p>

                  <div className="pt-4 flex flex-col md:flex-row items-center gap-8 justify-center xl:justify-start">
                    <Link href="/gita" className="btn-gold px-12 py-5 text-base shadow-[0_25px_60px_rgba(212,175,55,0.2)] hover:shadow-[0_30px_80px_rgba(212,175,55,0.4)] transition-all duration-500">
                      Walk the Path
                    </Link>
                  </div>
                </div>

                {/* Right Content - The Steps */}
                <div className="xl:col-span-8 relative">
                  {/* The Connecting Path Line (Desktop Only) */}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent hidden md:block -translate-y-12"></div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 relative z-10">
                    {[
                      { step: "01", title: "Commune", desc: "Share thoughts and receive personalized Gita shlokas.", icon: "✨", color: "from-blue-500/20" },
                      { step: "02", title: "Meditate", desc: "Deepen focus through curated spiritual sessions.", icon: "🪷", color: "from-purple-500/20" },
                      { step: "03", title: "Ascend", desc: "Apply divine wisdom to transform your life daily.", icon: "☀️", color: "from-orange-500/20" }
                    ].map((item, i) => (
                      <div key={i} className="group/item relative flex flex-col h-full">
                        <div className="absolute -top-4 -right-2 w-12 h-12 bg-[#0A0E1A] border border-white/10 rounded-full flex items-center justify-center text-2xl z-20 shadow-2xl group-hover/item:border-[#D4AF37]/50 group-hover/item:scale-110 transition-all duration-500">
                          {item.icon}
                        </div>

                        <div className="flex-1 p-8 rounded-[32px] md:rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-700 hover:bg-white/[0.04] backdrop-blur-3xl shadow-xl flex flex-col space-y-5">
                          <span className="text-5xl font-serif text-[#D4AF37]/10 group-hover/item:text-[#D4AF37]/30 transition-colors leading-none">
                            {item.step}
                          </span>
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold divine-serif text-white group-hover/item:text-[#D4AF37] transition-colors leading-tight">
                              {item.title}
                            </h4>
                            <p className="text-[13px] text-slate-500 font-light leading-relaxed group-hover/item:text-slate-400 transition-colors">
                              {item.desc}
                            </p>
                          </div>
                          <div className={`w-10 h-[1.5px] bg-gradient-to-r ${item.color} to-transparent rounded-full opacity-40 group-hover/item:opacity-100 transition-opacity duration-700`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Universal Message Section */}
          <div className="py-20 text-center max-w-4xl mx-auto space-y-12 animate-fade-in px-6">
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
            <p className="text-2xl sm:text-3xl md:text-5xl font-bold divine-serif text-white leading-tight italic opacity-90">
              "Whenever there is a decline in righteousness, O Arjuna, I manifest Myself."
            </p>
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-[1em] text-[#D4AF37]">Shloka 4.7</span>
              <p className="text-slate-600 text-xs uppercase tracking-[0.5em]">The Promise of Divine Protection</p>
            </div>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"></div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
