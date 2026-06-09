import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production'
const COOKIE_NAME = 'varnam_admin_token'

export function generateToken(): string {
  return jwt.sign({ role: 'admin', ts: Date.now() }, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function getTokenFromCookies(): Promise<string | null> {
  try {
    const store = await cookies()
    return store.get(COOKIE_NAME)?.value ?? null
  } catch {
    return null
  }
}

export function validateCredentials(username: string, password: string): boolean {
  const envUser = process.env.ADMIN_USERNAME || 'admin'
  const envPass = process.env.ADMIN_PASSWORD || 'admin'
  return username === envUser && password === envPass
}

export { COOKIE_NAME }
