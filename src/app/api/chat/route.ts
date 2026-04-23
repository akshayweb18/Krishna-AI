import { NextResponse } from 'next/server'
import krishnaSystem from '../../../lib/krishnaSystem'

type IncomingMessage = { role?: string; content: string }

function getApiKey() {
  return process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || process.env.GEMINI_API_KEY || process.env.GEMINI_KEY || null
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  // Accept either { messages: [...] } or { prompt: '...' }
  const incoming: IncomingMessage[] = Array.isArray(body?.messages)
    ? body.messages
    : body?.prompt
      ? [{ role: 'user', content: String(body.prompt) }]
      : []

  const messages = [krishnaSystem as any, ...incoming]

  const API_KEY = getApiKey()
  const model = process.env.OPENAI_MODEL || process.env.GEMINI_MODEL || 'gpt-4o-mini'
  const stream = body?.stream !== false // default true

  if (API_KEY) {
    // Prefer streaming responses for better UX
    try {
      const payload: any = { model, messages, temperature: 0.2 }
      if (stream) payload.stream = true

      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(payload),
      })

      if (!resp.ok) {
        const text = await resp.text()
        return NextResponse.json({ error: 'Upstream API error', detail: text }, { status: 502 })
      }

      // If streaming, pipe the upstream body directly to the client
      if (stream && resp.body) {
        return new Response(resp.body, {
          headers: {
            'Content-Type': 'text/event-stream; charset=utf-8',
          },
        })
      }

      const data = await resp.json()
      const aiMessage = data?.choices?.[0]?.message ?? null
      return NextResponse.json({ message: aiMessage, raw: data })
    } catch (e: any) {
      return NextResponse.json({ error: 'AI request failed', detail: String(e) }, { status: 502 })
    }
  }

  // Fallback persona reply when no API key provided
  const lastUser = incoming.length ? incoming[incoming.length - 1].content : ''
  const hindi = lastUser ? `शांत रहें और स्पष्ट रहें। (${lastUser.slice(0, 80)})` : 'नमस्ते — कैसे मदद करूँ?'
  const english = lastUser ? `Stay calm and be clear. (${lastUser.slice(0, 80)})` : 'Hello — how can I help?'
  const shloka = 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।'
  const shlokaTrans = 'Your right is to perform your duty, not to the fruits thereof.'

  return NextResponse.json({
    message: {
      role: 'assistant',
      content: `${hindi}\n\n${english}\n\n${shloka}\n${shlokaTrans}`,
    },
    note: 'No API key configured — returned persona fallback',
  })
}

export async function GET() {
  return NextResponse.json({ message: 'Chat API ready — POST { messages:[{role,content}] } or { prompt } (stream=true by default)' })
}
