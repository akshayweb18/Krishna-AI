import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Scaffold only — no AI calls here yet.
  return NextResponse.json({ message: 'Not implemented' }, { status: 501 })
}

export async function GET() {
  return NextResponse.json({ message: 'Chat API scaffold' })
}
