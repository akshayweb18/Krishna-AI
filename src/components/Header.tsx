"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', icon: '🏠', href: '/' },
    { name: 'Chat', icon: '💬', href: '/chat' },
    { name: 'Chapter', icon: '📖', href: '/chapter' },
    { name: 'Meditation', icon: '🧘', href: '/meditation' },
    { name: 'Profile', icon: '👤', href: '/profile' },
  ]

  return (
    <>
      <header className={`top-nav ${scrolled ? 'py-3 bg-black/90 border-divine-gold/30' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-divine-glass border border-divine-gold rounded-xl flex items-center justify-center text-xl shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:scale-110 transition-transform duration-300">
              🪶
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="divine-serif text-xl font-black tracking-tight leading-none text-divine-gold">Krishna AI</span>
              <span className="text-[9px] font-medium tracking-[0.2em] uppercase opacity-60">Your Guide. Your Friend.</span>
            </div>
          </Link>
          
          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex top-nav-links">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="top-nav-link group relative px-2"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                <span className="group-hover:text-divine-gold transition-colors">{item.name}</span>
                <motion.div 
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-divine-gold rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
             <div className="hidden sm:block text-[10px] font-bold tracking-widest uppercase opacity-40 mr-4">Divine Wisdom Awaits</div>
             
             {/* Hamburger Button (Mobile Only) */}
             <button
               onClick={() => setIsOpen(!isOpen)}
               className="lg:hidden w-14 h-14 bg-divine-glass rounded-xl flex items-center justify-center transition-all active:scale-90"
               aria-label="Toggle Menu"
             >
               <span className="sr-only">Toggle Menu</span>
               {isOpen ? (
                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                   <path d="M6 6L18 18" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                   <path d="M6 18L18 6" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
               ) : (
                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                   <path d="M3 7H21" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                   <path d="M3 12H21" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                   <path d="M3 17H21" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
               )}
             </button>

             <div className="hidden lg:flex w-10 h-10 bg-divine-glass border border-divine-border rounded-xl items-center justify-center text-lg hover:border-divine-gold/40 transition-colors cursor-pointer">
               👤
             </div>
          </div>
        </div>
      </header>

      {/* Side Drawer Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110] lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-black/95 border-l border-divine-gold/20 shadow-2xl z-[120] lg:hidden overflow-y-auto"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex flex-col">
                    <span className="divine-serif text-2xl font-black text-divine-gold">Menu</span>
                    <span className="text-[10px] tracking-widest uppercase opacity-40">Sacred Navigation</span>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <nav className="flex flex-col gap-3">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link 
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 hover:bg-divine-gold/10 transition-all border border-transparent hover:border-divine-gold/20 group"
                      >
                        <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                        <div className="flex flex-col">
                          <span className="font-bold text-lg text-divine-text group-hover:text-divine-gold transition-colors">{item.name}</span>
                          <span className="text-[10px] text-divine-muted uppercase tracking-widest">Explore Path</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                
                <div className="mt-auto pt-8 border-t border-divine-border/30">
                  <div className="glass-card p-6 text-center bg-divine-gold/5 border-divine-gold/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-divine-gold/50 to-transparent" />
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-divine-gold mb-2">Divine Quote</p>
                    <p className="text-xs italic opacity-80 text-divine-text">"Set thy heart upon thy work, but never on its reward."</p>
                  </div>
                  <p className="mt-8 text-[9px] font-bold tracking-[0.3em] uppercase opacity-30 text-center">Bhagavad Gita AI v1.0</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
