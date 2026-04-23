import { NextResponse } from 'next/server'
import krishnaSystem from '../../../../lib/krishnaSystem'

// Simple in-memory rate limiter (best-effort; not suitable for multi-instance production)
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 minute
const RATE_LIMIT_MAX = 60 // max requests per window per IP
const ipMap: Map<string, number[]> = new Map()

function isRateLimited(ip: string) {
  const now = Date.now()
  const arr = ipMap.get(ip) || []
  const filtered = arr.filter((t) => t > now - RATE_LIMIT_WINDOW_MS)
  filtered.push(now)
  ipMap.set(ip, filtered)
  return filtered.length > RATE_LIMIT_MAX
}

function getClientIp(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real
  try {
    // @ts-ignore
    if (req.socket && req.socket.remoteAddress) return req.socket.remoteAddress
  } catch (e) {}
  return 'unknown'
}

export async function GET(req: Request) {
  const ip = getClientIp(req)
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  const url = new URL(req.url)
  const prompt = url.searchParams.get('prompt') || ''
  const model = process.env.GEMINI_MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini'
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_KEY || process.env.OPENAI_KEY
  const geminiUrl = process.env.GEMINI_API_URL || ''

  if (!prompt) {
    return NextResponse.json({ error: 'missing_prompt' }, { status: 400 })
  }

  // Prepare messages payload
  const messages = [krishnaSystem as any, { role: 'user', content: prompt }]

  if (!apiKey) {
    // Fallback SSE: simple persona reply
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encodeSSE({ type: 'message', data: `शांत रहें और स्पष्ट रहें।\n\nStay calm and be clear.` }))
        controller.close()
      },
    })
    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
    })
  }

  try {
    // Choose upstream: prefer Gemini if GEMINI_API_URL is set
    if (geminiUrl) {
      // Gemini REST API streaming expectation: send {model, messages, stream:true}
      const upstream = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model: process.env.GEMINI_MODEL || 'gemini-1.5-flash', messages, stream: true }),
      })

      if (!upstream.ok || !upstream.body) {
        const txt = await upstream.text().catch(() => '')
        return NextResponse.json({ error: 'upstream_error', detail: txt }, { status: 502 })
      }

      // Pipe upstream stream to client as SSE. We transform chunks to SSE 'data:' frames.
      const stream = upstream.body.pipeThrough(new TransformStream({
        transform(chunk, controller) {
          const text = typeof chunk === 'string' ? chunk : new TextDecoder().decode(chunk)
          // normalize and emit as SSE data messages (may already be SSE)
          for (const line of text.split(/\r?\n/)) {
            if (!line) continue
            controller.enqueue(encodeSSE({ type: 'message', data: line }))
          }
        },
      }))

      return new Response(stream, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
      })
    }

    // Fallback to OpenAI Chat Completions streaming
    const openaiResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, messages, temperature: 0.2, stream: true }),
    })

    if (!openaiResp.ok || !openaiResp.body) {
      const txt = await openaiResp.text().catch(() => '')
      return NextResponse.json({ error: 'upstream_error', detail: txt }, { status: 502 })
    }

    // Pass through OpenAI's event stream as-is (text/event-stream)
    return new Response(openaiResp.body, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
    })
  } catch (e: any) {
    return NextResponse.json({ error: 'internal_error', detail: String(e) }, { status: 500 })
  }
}

function encodeSSE(event: { type?: string; data: string }) {
  const id = ''
  const lines = event.data.split(/\r?\n/).map((l) => `data: ${l}`).join('\n')
  return new TextEncoder().encode(`${lines}\n\n`)
}
