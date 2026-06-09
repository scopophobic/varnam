import { NextResponse } from 'next/server'
import { getTokenFromCookies, verifyToken } from '@/lib/auth'
import { getMessages } from '@/lib/db'

export async function GET() {
  const token = await getTokenFromCookies()
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const messages = getMessages()
  return NextResponse.json(messages)
}
