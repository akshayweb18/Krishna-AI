import Link from 'next/link'
import React from 'react'

export default function BottomNav() {
  return (
    <nav className="bottom-nav-mobile lg:hidden">
      {[
        { name: 'Home', icon: '🏠', active: true },
        { name: 'Chat', icon: '💬' },
        { name: 'Chapter', icon: '📖' },
        { name: 'Meditation', icon: '🧘' },
        { name: 'Profile', icon: '👤' },
      ].map((item) => (
        <Link 
          key={item.name} 
          href={item.name === 'Home' ? '/' : `/${item.name.toLowerCase()}`}
          className={`bottom-nav-link ${item.active ? 'active' : ''}`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="font-medium">{item.name}</span>
        </Link>
      ))}
    </nav>
  )
}
