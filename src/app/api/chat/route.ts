import { NextResponse } from 'next/server'
import krishnaSystem from '../../../lib/krishnaSystem'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const incoming = Array.isArray(body?.messages) ? body.messages : []
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ 
        message: { 
          role: 'assistant', 
          content: "Pranam! I am in deep meditation (Missing GEMINI_API_KEY). Please add it to your environment to begin our conversation." 
        } 
      })
    }

    const contents = incoming
      .filter((m: any) => m.role !== 'system')
      .map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }))

    if (contents.length > 0 && contents[0].role === 'model') {
      contents.unshift({ role: 'user', parts: [{ text: "Pranam, Krishna." }] })
    }

    const MODELS = ["gemini-2.0-flash", "gemini-2.0-pro", "gemini-1.5-flash"]

    const callGemini = async (modelName: string) => {
      try {
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            contents,
            system_instruction: {
              parts: [{ text: krishnaSystem.content }]
            }
          })
        })
        return resp
      } catch (e) {
        return null
      }
    }

    let finalResp = null
    for (const modelName of MODELS) {
      const resp = await callGemini(modelName)
      if (resp && resp.ok) {
        finalResp = resp
        break
      }
      if (resp && resp.status !== 404) {
        finalResp = resp
        break
      }
    }

    if (!finalResp) {
      return NextResponse.json({ error: 'Connection failed', detail: 'Could not connect to any Gemini models' }, { status: 503 })
    }

    if (!finalResp.ok) {
      const err = await finalResp.json().catch(() => ({ error: { message: 'Unknown error' } }))
      return NextResponse.json({ 
        error: 'Gemini API Error', 
        detail: err?.error?.message || JSON.stringify(err) 
      }, { status: finalResp.status })
    }

    const data = await finalResp.json()
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Forgive me, but I am unable to respond."
    
    return NextResponse.json({ 
      message: { role: 'assistant', content: aiText } 
    })

  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error', detail: error.message }, { status: 500 })
  }
}
