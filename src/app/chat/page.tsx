"use client"
import React, { useState } from 'react'

export default function ChatPage() {
  const [messages, setMessages] = useState([{ from: 'system', text: 'Krishna AI coming soon' }])
  const [value, setValue] = useState('')

  function send() {
    if (!value.trim()) return
    setMessages((m) => [...m, { from: 'user', text: value }, { from: 'krishna', text: 'Krishna AI coming soon' }])
    setValue('')
  }

  return (
    <section className="h-[calc(100vh-48px)] w-full overflow-hidden relative">
      {/* fixed full-viewport background (cover & fit) */}
      <div className="fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/krishanhomeimg.jpeg')" }} />
      {/* dark overlay */}
      <div className="fixed inset-0 bg-black/75 z-10" />

      <div className="relative z-20 h-full flex flex-col max-w-4xl mx-auto px-4 sm:px-6">
        <div className="pt-20"></div>
            <h2 className="text-lg font-semibold text-[#b7791f]">Krishna</h2>

        <div className="flex-1 mt-4 overflow-auto space-y-3 pb-32">
          {messages.map((m, i) => (
            <div key={i} className={`p-3 rounded ${m.from === 'user' ? 'bg-orange-50 self-end' : 'bg-white'}`}>
              <div className="text-sm">{m.text}</div>
            </div>
          ))}
        </div>

          <div className="fixed left-0 right-0 bottom-0 z-[9999] px-4 bg-gradient-to-t from-black/60 to-transparent pb-[calc(env(safe-area-inset-bottom,16px)+88px)] lg:pb-6">
            <div className="max-w-4xl mx-auto px-0 sm:px-6 pb-2">
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-xl p-3 border border-white/6">
              <input className="input flex-1 bg-transparent" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type your message..." />
              <button className="btn" onClick={send}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
