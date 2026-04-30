'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#0C0A1F]/60 text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-black flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-[1px]">
      {/* Background Atmosphere is now global in layout.tsx */}

      <div className="relative pt-4 z-10 text-center space-y-8 max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-[40px] bg-white/[0.03] border border-white/10 flex items-center justify-center text-5xl md:text-6xl shadow-2xl backdrop-blur-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            👤
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-[#D4AF37] text-black flex items-center justify-center text-xs shadow-xl">
            🪶
          </div>
        </motion.div>

        <header className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white divine-serif animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Divine <span className="gold-text italic">Identity</span>
          </h1>
          <p className="text-lg text-slate-400 font-light leading-relaxed animate-fade-in max-w-md mx-auto" style={{ animationDelay: '0.2s' }}>
            Your personal spiritual journey is being prepared. Soon you will be able to track your reading progress, favorite shlokas, and chat history.
          </p>
        </header>

        <div className="pt-12 grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {[
            { label: 'Verses Read', val: '0' },
            { label: 'Chapters Com.', val: '0' },
            { label: 'Favorites', val: '0' },
            { label: 'Journey Days', val: '1' }
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-[24px] bg-white/[0.02] border border-white/5 backdrop-blur-xl text-center">
              <div className="text-2xl font-bold text-white divine-serif mb-1">{stat.val}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="pt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Coming Soon</span>
          </div>
        </div>
      </div>
    </main>
  )
}
