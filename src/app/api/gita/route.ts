import gita from '../../../lib/gita.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(gita)
}
