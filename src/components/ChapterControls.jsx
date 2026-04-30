"use client"
import { useEffect, useState } from 'react'

export default function ChapterControls() {
  const [size, setSize] = useState(() => {
    try { return localStorage.getItem('verseSize') || 'base' } catch { return 'base' }
  })

  const [showSanskrit, setShowSanskrit] = useState(() => {
    try { return localStorage.getItem('showSanskrit') !== 'false' } catch { return true }
  })
  const [showHindi, setShowHindi] = useState(() => {
    try { return localStorage.getItem('showHindi') !== 'false' } catch { return true }
  })
  const [showEnglish, setShowEnglish] = useState(() => {
    try { return localStorage.getItem('showEnglish') !== 'false' } catch { return true }
  })

  useEffect(() => {
    try { localStorage.setItem('verseSize', size) } catch {}
    document.documentElement.style.setProperty('--verse-font-size', size === 'sm' ? '0.85rem' : size === 'lg' ? '1.15rem' : '1rem')
  }, [size])

  useEffect(() => {
    try { localStorage.setItem('showSanskrit', String(showSanskrit)) } catch {}
    try { localStorage.setItem('showHindi', String(showHindi)) } catch {}
    try { localStorage.setItem('showEnglish', String(showEnglish)) } catch {}
    document.documentElement.dataset.showSanskrit = showSanskrit ? 'true' : 'false'
    document.documentElement.dataset.showHindi = showHindi ? 'true' : 'false'
    document.documentElement.dataset.showEnglish = showEnglish ? 'true' : 'false'
  }, [showSanskrit, showHindi, showEnglish])

  return (
    <div className="inline-flex items-center gap-6 p-4 px-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <ControlButton active={size === 'sm'} onClick={() => setSize('sm')} label="A-" />
        <ControlButton active={size === 'base'} onClick={() => setSize('base')} label="A" />
        <ControlButton active={size === 'lg'} onClick={() => setSize('lg')} label="A+" />
      </div>

      <div className="w-[1px] h-4 bg-white/10"></div>

      <div className="flex items-center gap-4">
        <Toggle label="SAN" active={showSanskrit} onClick={() => setShowSanskrit(!showSanskrit)} />
        <Toggle label="HIN" active={showHindi} onClick={() => setShowHindi(!showHindi)} />
        <Toggle label="ENG" active={showEnglish} onClick={() => setShowEnglish(!showEnglish)} />
      </div>
    </div>
  )
}

function ControlButton({ active, onClick, label }) {
  return (
    <button 
      onClick={onClick}
      className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${
        active ? 'bg-[#D4AF37] text-black' : 'text-slate-500 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  )
}

function Toggle({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`text-[9px] font-black tracking-widest transition-all ${
        active ? 'text-[#D4AF37]' : 'text-slate-700 hover:text-slate-500'
      }`}
    >
      {label}
    </button>
  )
}
