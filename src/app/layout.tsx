import './globals.css'
import React from 'react'
import Link from 'next/link'
import { ReactNode } from 'react'
import BottomNav from '../components/BottomNav'
import ServiceWorkerRegistrar from '../components/ServiceWorkerRegistrar'

export const metadata = {
  title: 'Krishna AI – Divine Bhagavad Gita Guide',
  description: 'Experience the wisdom of the Bhagavad Gita with Krishna AI. Divine, fast, and spiritual.',
}

import Header from '../components/Header'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-divine-gold selection:text-black">
        <Header />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pt-24">
          <main className="pb-32 md:pb-20">{children}</main>
        </div>


        <BottomNav />
        <ServiceWorkerRegistrar />
      </body>
    </html>
  )
}



