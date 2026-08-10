import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artist Portal | Spec Craft Media',
  description: 'Secure artist portal for contract management, KYC verification, and e-signatures.',
  robots: 'noindex, nofollow',
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[var(--dark)]">
      {children}
    </div>
  )
}
