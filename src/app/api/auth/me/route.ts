import { NextResponse } from 'next/server'
import { getTokenFromCookies, verifyToken } from '@/lib/auth'

export async function GET() {
  const token = await getTokenFromCookies()
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
  return NextResponse.json({ authenticated: true })
}
