"use client"
import React, { useEffect, useRef, useState } from 'react'

export default function ChatStreamClient() {
  const [messages, setMessages] = useState<string[]>([])
  const esRef = useRef<EventSource | null>(null)

  function startStream(prompt: string) {
    if (esRef.current) {
      esRef.current.close()
      esRef.current = null
    }

    // Use GET EventSource to /api/chat/stream?prompt=...
    const url = `/api/chat/stream?prompt=${encodeURIComponent(prompt)}`
    const es = new EventSource(url)
    esRef.current = es

    es.onmessage = (e) => {
      // Each event contains chunked text data
      const txt = e.data
      setMessages((m) => [...m, txt])
    }

    es.onerror = (err) => {
      console.error('EventSource error', err)
      es.close()
      esRef.current = null
    }
  }

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => startStream('I feel anxious about an interview')} className="btn">
          Start Example Stream
        </button>
      </div>
      <div className="space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="p-3 bg-white/5 rounded">{m}</div>
        ))}
      </div>
    </div>
  )
}
