import { NextResponse } from 'next/server'
import krishnaSystem from '../../../../lib/krishnaSystem'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const prompt = url.searchParams.get('prompt') || ''
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  
  if (!prompt) return NextResponse.json({ error: 'missing_prompt' }, { status: 400 })
  if (!GEMINI_API_KEY) return NextResponse.json({ error: 'missing_key' }, { status: 401 })

  const MODELS = ["gemini-2.0-flash", "gemini-1.5-flash"]

  try {
    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ]

    let finalResp = null
    for (const modelName of MODELS) {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:streamGenerateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contents,
          system_instruction: {
            parts: [{ text: krishnaSystem.content }]
          }
        })
      })
      
      if (resp.ok) {
        finalResp = resp
        break
      }
      if (resp.status !== 404) {
        finalResp = resp
        break
      }
    }

    if (!finalResp || !finalResp.ok || !finalResp.body) {
      const err = await finalResp?.text() || 'Failed to connect to Gemini'
      return NextResponse.json({ error: 'upstream_error', detail: err }, { status: 502 })
    }

    return new Response(finalResp.body, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (e: any) {
    return NextResponse.json({ error: 'internal_error', detail: String(e) }, { status: 500 })
  }
}
