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
    document.documentElement.style.setProperty('--verse-font-size', size === 'sm' ? '0.95rem' : size === 'lg' ? '1.125rem' : '1rem')
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
    <div className="flex items-center gap-4 mb-4 flex-wrap">
      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-600 dark:text-gray-300">Text size:</div>
        <button className={`px-2 py-1 rounded ${size==='sm' ? 'bg-gray-200 dark:bg-gray-800' : ''}`} onClick={() => setSize('sm')}>A-</button>
        <button className={`px-2 py-1 rounded ${size==='base' ? 'bg-gray-200 dark:bg-gray-800' : ''}`} onClick={() => setSize('base')}>A</button>
        <button className={`px-2 py-1 rounded ${size==='lg' ? 'bg-gray-200 dark:bg-gray-800' : ''}`} onClick={() => setSize('lg')}>A+</button>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-600 dark:text-gray-300">Show:</div>
        <label className="flex items-center gap-1 text-sm">
          <input type="checkbox" checked={showSanskrit} onChange={() => setShowSanskrit(s => !s)} /> Sanskrit
        </label>
        <label className="flex items-center gap-1 text-sm">
          <input type="checkbox" checked={showHindi} onChange={() => setShowHindi(s => !s)} /> Hindi
        </label>
        <label className="flex items-center gap-1 text-sm">
          <input type="checkbox" checked={showEnglish} onChange={() => setShowEnglish(s => !s)} /> English
        </label>
      </div>
    </div>
  )
}
