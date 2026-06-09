'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        setError('Invalid credentials')
        return
      }

      router.push('/admin')
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-border bg-cream p-10"
      >
        <div className="mb-8 text-center">
          <span className="font-serif text-2xl tracking-wide text-charcoal">
            Admin<span className="text-gold">.</span>
          </span>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-400">
            Sign in
          </p>
        </div>

        {error && (
          <p className="mb-4 border border-warm/30 bg-warm/5 px-4 py-2 text-xs text-warm">
            {error}
          </p>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-charcoal/75">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 w-full border-b border-border bg-transparent py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-gold"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-charcoal/75">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full border-b border-border bg-transparent py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-gold"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-charcoal bg-charcoal py-3 text-xs uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-gold hover:border-gold disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  )
}
