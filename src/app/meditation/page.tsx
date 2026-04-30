'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const MODES = [
  { 
    id: 'zen', 
    name: 'Zen', 
    icon: '🌬️', 
    description: 'Box breathing.',
    color: '#37D4AF', 
    glow: 'rgba(55, 212, 175, 0.2)',
    phases: [
      { name: 'Inhale', duration: 4000, scale: 1.4, opacity: 0.6 },
      { name: 'Hold', duration: 4000, scale: 1.4, opacity: 0.4 },
      { name: 'Exhale', duration: 4000, scale: 1.0, opacity: 0.6 },
      { name: 'Rest', duration: 4000, scale: 1.0, opacity: 0.2 },
    ]
  },
  { 
    id: 'om', 
    name: 'Om', 
    icon: '🕉️', 
    description: 'Deep calm.',
    color: '#D4AF37', 
    glow: 'rgba(212, 175, 55, 0.2)',
    phases: [
      { name: 'Inhale', duration: 4000, scale: 1.4, opacity: 0.6 },
      { name: 'Deep Hold', duration: 7000, scale: 1.4, opacity: 0.4 },
      { name: 'Long Exhale', duration: 8000, scale: 1.0, opacity: 0.6 },
    ]
  },
  { 
    id: 'light', 
    name: 'Light', 
    icon: '🕯️', 
    description: 'Energy flow.',
    color: '#D43737', 
    glow: 'rgba(212, 55, 55, 0.2)',
    phases: [
      { name: 'Quick Inhale', duration: 2500, scale: 1.3, opacity: 0.7 },
      { name: 'Brief Hold', duration: 1500, scale: 1.3, opacity: 0.5 },
      { name: 'Active Exhale', duration: 2500, scale: 1.0, opacity: 0.7 },
    ]
  },
]

export default function MeditationPage() {
  const [view, setView] = useState<'setup' | 'meditating' | 'summary'>('setup')
  const [activeMode, setActiveMode] = useState(MODES[1])
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [timer, setTimer] = useState(0)
  const [phaseProgress, setPhaseProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const currentPhase = activeMode.phases[phaseIndex]

  useEffect(() => {
    let phaseTimer: NodeJS.Timeout
    let progressInterval: NodeJS.Timeout

    if (view === 'meditating') {
      const startTime = Date.now()
      const duration = activeMode.phases[phaseIndex].duration

      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min((elapsed / duration) * 100, 100)
        setPhaseProgress(progress)
      }, 16)

      phaseTimer = setTimeout(() => {
        setPhaseIndex((prev) => (prev + 1) % activeMode.phases.length)
        setPhaseProgress(0)
      }, duration)
    }

    return () => {
      clearTimeout(phaseTimer)
      clearInterval(progressInterval)
    }
  }, [view, phaseIndex, activeMode])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (view === 'meditating') {
      interval = setInterval(() => setTimer((t) => t + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [view])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const particles = useMemo(() => {
    if (!mounted) return []
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 10 + 15,
    }))
  }, [mounted])

  const finishSession = () => {
    setView('summary')
  }

  const resetSession = () => {
    setTimer(0)
    setPhaseIndex(0)
    setPhaseProgress(0)
    setView('setup')
  }

  return (
    <main className="fixed inset-0 bg-[#0C0A1F]/80 text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-black overflow-hidden flex flex-col z-[50] backdrop-blur-[2px]">
      {/* Background Atmosphere - Specialized for Meditation */}
      <div className="fixed inset-0 pointer-events-none hardware-accelerated overflow-hidden z-0">
        <motion.div 
          animate={{ backgroundColor: view === 'meditating' ? activeMode.glow : 'rgba(0,0,0,0)' }}
          className="absolute inset-0 transition-colors duration-1000"
        />

        {mounted && particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-white rounded-full opacity-10 hardware-accelerated"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ 
              y: [0, -100, 0], 
              opacity: [0.02, 0.1, 0.02],
              scale: view === 'meditating' && currentPhase.name.includes('Inhale') ? [1, 2, 1] : 1
            }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* Header - Unified with Chat Page */}
      <header className="relative z-30 px-6 py-6 border-b border-white/5 backdrop-blur-xl bg-black/20 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
            <span className="text-sm">←</span>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white divine-serif">Meditation</h1>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Divine Stillness</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Shrimad Bhagavad Gita</span>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 relative z-20 flex items-center justify-center overflow-hidden py-10">
        <AnimatePresence mode="wait">
          {view === 'setup' && (
            <motion.div 
              key="setup"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="text-center space-y-8 w-full max-w-4xl px-6"
            >
              <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white divine-serif">
                  Choose Your <span className="gold-text italic">Path</span>
                </h2>
                <p className="text-sm text-slate-400 font-light max-w-lg mx-auto opacity-80">
                  Select a technique to align your breath with the divine rhythm.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode)}
                    className={`flex-1 min-w-[130px] max-w-[160px] p-6 rounded-[24px] border transition-all duration-500 text-center group relative overflow-hidden ${
                      activeMode.id === mode.id 
                        ? 'bg-white/[0.05] border-white/20' 
                        : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                    }`}
                    style={{ borderColor: activeMode.id === mode.id ? `${mode.color}66` : '' }}
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{mode.icon}</div>
                    <h3 className="text-base font-bold text-white divine-serif mb-1" style={{ color: activeMode.id === mode.id ? mode.color : '' }}>{mode.name}</h3>
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{mode.description}</p>
                    {activeMode.id === mode.id && (
                      <motion.div layoutId="mode-dot" className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: mode.color }} />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => setView('meditating')}
                  className="px-14 py-4 rounded-full text-xs font-black uppercase tracking-[0.3em] transition-all shadow-2xl hover:scale-105 active:scale-95"
                  style={{ 
                    backgroundColor: activeMode.color, 
                    color: activeMode.id === 'light' ? '#fff' : '#000',
                    boxShadow: `0 15px 45px ${activeMode.glow}`
                  }}
                >
                  Enter Stillness
                </button>
              </div>
            </motion.div>
          )}

          {view === 'meditating' && (
            <motion.div 
              key="meditation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center space-y-12"
            >
              <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.4em] text-slate-600">
                <div className="text-center">
                  <span className="block mb-1">Elapsed</span>
                  <span className="text-white text-base font-bold divine-serif">{formatTime(timer)}</span>
                </div>
                <div className="text-center">
                  <span className="block mb-1">Mode</span>
                  <span className="text-base font-bold divine-serif" style={{ color: activeMode.color }}>{activeMode.name}</span>
                </div>
              </div>

              <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90 scale-[1.05]">
                  <circle cx="50%" cy="50%" r="48%" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <motion.circle
                    cx="50%"
                    cy="50%"
                    r="48%"
                    fill="none"
                    stroke={activeMode.color}
                    strokeWidth="3"
                    strokeDasharray="100 100"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 100 - phaseProgress }}
                    transition={{ duration: 0.1, ease: "linear" }}
                    className="opacity-40"
                  />
                </svg>

                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: currentPhase.scale * (1 + i * 0.1),
                      rotate: [0, 90, 180, 270, 360],
                      opacity: currentPhase.opacity / (i + 1.5)
                    }}
                    transition={{ 
                      scale: { duration: currentPhase.duration / 1000, ease: "easeInOut" },
                      rotate: { duration: 30 + i * 10, repeat: Infinity, ease: "linear" }
                    }}
                    className="absolute inset-0 rounded-[25%] border border-dashed"
                    style={{ borderColor: activeMode.color, opacity: 0.1 }}
                  />
                ))}

                <motion.div
                  animate={{
                    scale: currentPhase.scale,
                    boxShadow: `0 0 ${currentPhase.name.includes('Inhale') ? '160px' : '60px'} ${activeMode.glow}`,
                  }}
                  transition={{ duration: currentPhase.duration / 1000, ease: "easeInOut" }}
                  className="relative z-30 w-44 h-44 md:w-56 md:h-56 rounded-full bg-black/60 backdrop-blur-3xl border border-white/10 flex flex-col items-center justify-center shadow-2xl"
                >
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={currentPhase.name}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-2xl md:text-3xl font-bold divine-serif tracking-[0.2em] uppercase text-center px-4"
                      style={{ color: activeMode.color }}
                    >
                      {currentPhase.name}
                    </motion.h2>
                  </AnimatePresence>
                  
                  <div className="mt-5 flex gap-2">
                    {activeMode.phases.map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1.5 h-1.5 rounded-full transition-all duration-500" 
                        style={{ backgroundColor: i === phaseIndex ? activeMode.color : 'rgba(255,255,255,0.05)', scale: i === phaseIndex ? 1.5 : 1 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="text-center space-y-6">
                <p className="text-slate-400 text-sm italic font-light max-w-xs mx-auto animate-pulse opacity-60">
                   {activeMode.id === 'zen' && "Breath is the anchor of the soul."}
                   {activeMode.id === 'om' && "The universe resides within the sound."}
                   {activeMode.id === 'light' && "Your inner light guides the way."}
                </p>
                <button 
                  onClick={finishSession}
                  className="px-10 py-4 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 hover:bg-white/10 hover:text-white transition-all shadow-xl"
                >
                  End Session
                </button>
              </div>
            </motion.div>
          )}

          {view === 'summary' && (
            <motion.div 
              key="summary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-10 w-full max-w-md px-6"
            >
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto mb-6">
                   <span className="text-4xl">✨</span>
                </div>
                <h1 className="text-4xl font-bold divine-serif gold-text">Session Complete</h1>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  Your mind has found its center. Carry this peace with you.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-8 border-y border-white/5">
                <div className="text-center">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Time</span>
                  <span className="text-2xl font-bold text-white divine-serif">{formatTime(timer)}</span>
                </div>
                <div className="text-center">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">Technique</span>
                  <span className="text-2xl font-bold divine-serif" style={{ color: activeMode.color }}>{activeMode.name}</span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <button 
                  onClick={resetSession}
                  className="w-full py-5 rounded-full text-xs font-black uppercase tracking-[0.3em] bg-[#D4AF37] text-black shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  New Session
                </button>
                <Link href="/" className="block w-full py-5 rounded-full text-xs font-black uppercase tracking-[0.3em] bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
