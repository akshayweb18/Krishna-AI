import './globals.css'
import React from 'react'
import { ReactNode } from 'react'
import { Inter, Playfair_Display, Cinzel } from 'next/font/google'
import BottomNav from '../components/BottomNav'
import ServiceWorkerRegistrar from '../components/ServiceWorkerRegistrar'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', display: 'swap' })

export const metadata = {
  title: 'Krishna AI – Divine Bhagavad Gita Guide',
  description: 'Experience the wisdom of the Bhagavad Gita with Krishna AI. Divine, fast, and spiritual.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cinzel.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-[#D4AF37] selection:text-black flex flex-col min-h-screen bg-[#05070A] text-slate-100 font-sans">
        {/* Persistent Global Background Atmosphere - More Vibrant & Divine */}
        <div className="fixed inset-0 pointer-events-none hardware-accelerated overflow-hidden z-0">
          {/* Indigo/Amethyst Glow */}
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#4F46E5]/[0.08] blur-[150px] rounded-full" />
          {/* Royal Saffron Glow */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/[0.05] blur-[150px] rounded-full" />
          {/* Subtle Center Depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-[#1E1235]/20 to-transparent" />
        </div>
        
        <Header />
        
        {/* Main wrapper */}
        <div className="flex-1 w-full relative z-10 pt-20">
          <main className="w-full">
            {children}
          </main>
        </div>
        
        <BottomNav />
        <ServiceWorkerRegistrar />
      </body>
    </html>
  )
}
