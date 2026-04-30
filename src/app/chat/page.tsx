'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Pranam! I am Krishna AI. How may I guide you on your path today?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Add a placeholder for the assistant response
    const assistantMessage: Message = { role: 'assistant', content: '' }
    setMessages(prev => [...prev, assistantMessage])

    try {
      const response = await fetch(`/api/chat/stream?prompt=${encodeURIComponent(input)}`)

      if (!response.ok) {
        throw new Error('Divine connection failed')
      }

      if (!response.body) return

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulatedResponse = ""
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        buffer += chunk

        // Gemini streaming JSON objects are often sent as a JSON array starting with '[' and ending with ']'
        // or as separate objects if parsed correctly.
        // For raw stream, we need to clean up commas and brackets.

        // Let's try a robust way to extract 'text' from the chunks
        const lines = buffer.split('\n')
        // Keep the last line in the buffer as it might be incomplete
        buffer = lines.pop() || ""

        for (const line of lines) {
          let cleanLine = line.trim()
          if (cleanLine.startsWith(',')) cleanLine = cleanLine.substring(1).trim()
          if (cleanLine.startsWith('[')) cleanLine = cleanLine.substring(1).trim()
          if (cleanLine.endsWith(']')) cleanLine = cleanLine.substring(0, cleanLine.length - 1).trim()
          if (!cleanLine) continue

          try {
            const json = JSON.parse(cleanLine)
            const text = json?.candidates?.[0]?.content?.parts?.[0]?.text
            if (text) {
              accumulatedResponse += text
              setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: accumulatedResponse
                }
                return updated
              })
            }
          } catch (e) {
            // Partial JSON, put it back in buffer
            buffer = cleanLine + buffer
          }
        }
      }
    } catch (error) {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'I am unable to connect to the divine consciousness at the moment. Please check your API key and try again soon.'
        }
        return updated
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="fixed inset-0 bg-[#0C0A1F]/90 text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-black overflow-hidden flex flex-col z-[50] backdrop-blur-sm">
      {/* Background Atmosphere is now global in layout.tsx */}

      {/* Header */}
      <header className="relative z-30 px-6 py-6 border-b border-white/5 backdrop-blur-xl bg-black/20 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
            <span className="text-sm">←</span>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-white divine-serif">Krishna AI</h1>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Divine Guidance Active</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Shrimad Bhagavad Gita</span>
        </div>
      </header>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto relative z-20 px-4 md:px-0 py-8 scrollbar-hide"
      >
        <div className="max-w-3xl mx-auto space-y-8 pb-10">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={m.content === '' ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`relative max-w-[85%] md:max-w-[75%] p-6 rounded-[32px] shadow-2xl ${m.role === 'user'
                  ? 'bg-[#D4AF37] text-black rounded-tr-none font-medium'
                  : 'bg-white/[0.03] border border-white/10 text-slate-100 rounded-tl-none backdrop-blur-xl'
                  }`}>
                  <p className={`text-sm md:text-base leading-relaxed whitespace-pre-line ${m.role === 'assistant' ? 'font-light' : ''}`}>
                    {m.content || (isLoading && i === messages.length - 1 ? '...' : '')}
                  </p>

                  {m.role === 'assistant' && (
                    <div className="absolute -left-2 top-0 w-1 h-8 bg-[#D4AF37] rounded-full opacity-50"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && messages[messages.length - 1].content === '' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white/[0.03] border border-white/10 p-6 rounded-[32px] rounded-tl-none flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="relative z-30 px-6 pt-2 pb-12 md:px-12 md:pt-4 md:pb-20 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A] to-transparent shrink-0">
        <div className="max-w-3xl mx-auto mb-4">
          <div className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask for guidance..."
              className="w-full bg-white/[0.02] border border-white/10 rounded-[24px] px-8 py-5 pr-16 outline-none focus:border-[#D4AF37]/40 focus:bg-white/[0.05] transition-all text-white placeholder:text-slate-600 shadow-2xl backdrop-blur-xl"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-[#D4AF37] text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100 shadow-[0_10px_25px_rgba(212,175,55,0.2)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
          <p className="text-center mt-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 opacity-50">
            Guided by the eternal wisdom of Shrimad Bhagavad Gita
          </p>
        </div>
      </div>
    </main>
  )
}
