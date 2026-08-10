'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'login' | 'magic'>('login')
  const [magicSent, setMagicSent] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()

    if (mode === 'magic') {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) {
        setError(error.message)
      } else {
        setMagicSent(true)
      }
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      window.location.href = '/portal/dashboard'
    }
    setLoading(false)
  }

  if (magicSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--gold)]/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[var(--gold)]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Check your email</h2>
          <p className="text-[var(--text-muted)] mb-6">
            We sent a login link to <span className="text-white">{email}</span>. Click the link to access your portal.
          </p>
          <button
            onClick={() => { setMagicSent(false); setEmail('') }}
            className="text-[var(--gold)] hover:underline text-sm"
          >
            Use a different email
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to website
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded bg-[var(--gold)] flex items-center justify-center">
              <span className="text-black font-bold text-sm">SC</span>
            </div>
            <span className="text-white font-semibold">Spec Craft Media</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-6">Artist Portal</h1>
          <p className="text-[var(--text-muted)] mt-2">
            Sign in to view your contract, complete KYC, and manage your partnership.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-[var(--text-muted)] mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-[var(--dark-3)] border border-[var(--gray)] rounded-lg text-white placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
          </div>

          {mode === 'login' && (
            <div>
              <label htmlFor="password" className="block text-sm text-[var(--text-muted)] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Your password"
                  className="w-full pl-10 pr-12 py-3 bg-[var(--dark-3)] border border-[var(--gray)] rounded-lg text-white placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-400 text-sm bg-red-400/10 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--gold)] text-black font-semibold rounded-lg hover:bg-[var(--gold-dim)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : mode === 'magic' ? 'Send magic link' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === 'login' ? 'magic' : 'login')}
            className="text-[var(--gold)] hover:underline text-sm"
          >
            {mode === 'login' ? 'Sign in with magic link instead' : 'Sign in with password instead'}
          </button>
        </div>

        <p className="text-[var(--text-muted)] text-xs text-center mt-8">
          This portal is for invited Spec Craft Media artists only.
          Contact management if you need access.
        </p>
      </div>
    </div>
  )
}
