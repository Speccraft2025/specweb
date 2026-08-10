'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/contract', label: 'Contract', icon: FileText },
  { href: '/portal/kyc', label: 'KYC Verification', icon: ShieldCheck },
]

export default function PortalNav({ artistName }: { artistName: string }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/portal/login'
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--dark-2)] border-b border-[var(--gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/portal/dashboard" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[var(--gold)] flex items-center justify-center">
                  <span className="text-black font-bold text-sm">SC</span>
                </div>
                <span className="text-white font-semibold hidden sm:block">Artist Portal</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-[var(--gold)]/10 text-[var(--gold)]'
                        : 'text-[var(--text-muted)] hover:text-white hover:bg-[var(--dark-3)]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--text-muted)] hidden sm:block">
                {artistName}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--text-muted)] hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:block">Sign out</span>
              </button>
              <button
                className="md:hidden text-[var(--text-muted)]"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-[var(--gray)] bg-[var(--dark-2)]">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                      isActive
                        ? 'bg-[var(--gold)]/10 text-[var(--gold)]'
                        : 'text-[var(--text-muted)]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  )
}
