'use client'

import Link from 'next/link'
import { FileText, ShieldCheck, CheckCircle, Clock, AlertCircle, ArrowRight } from 'lucide-react'
import type { Artist, Contract, KycVerification } from '@/lib/types'

function StatusBadge({ status, type }: { status: string; type: 'contract' | 'kyc' }) {
  const configs: Record<string, { color: string; bg: string; label: string }> = {
    draft: { color: 'text-gray-400', bg: 'bg-gray-400/10', label: 'Draft' },
    sent: { color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Sent' },
    viewed: { color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Viewed' },
    signed: { color: 'text-[var(--gold)]', bg: 'bg-[var(--gold)]/10', label: 'Signed' },
    countersigned: { color: 'text-green-400', bg: 'bg-green-400/10', label: 'Countersigned' },
    active: { color: 'text-green-400', bg: 'bg-green-400/10', label: 'Active' },
    terminated: { color: 'text-red-400', bg: 'bg-red-400/10', label: 'Terminated' },
    pending: { color: 'text-gray-400', bg: 'bg-gray-400/10', label: 'Pending' },
    submitted: { color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Under Review' },
    approved: { color: 'text-green-400', bg: 'bg-green-400/10', label: 'Approved' },
    rejected: { color: 'text-red-400', bg: 'bg-red-400/10', label: 'Rejected' },
  }

  const config = configs[status] || configs.pending
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color} ${config.bg}`}>
      {status === 'active' || status === 'approved' ? <CheckCircle className="w-3 h-3" /> :
       status === 'rejected' || status === 'terminated' ? <AlertCircle className="w-3 h-3" /> :
       <Clock className="w-3 h-3" />}
      {config.label}
    </span>
  )
}

export default function DashboardContent({
  artist,
  contract,
  kyc,
}: {
  artist: Artist
  contract?: Contract
  kyc?: KycVerification
}) {
  const greeting = artist?.stage_name
    ? `Welcome, ${artist.stage_name}`
    : artist?.full_legal_name
    ? `Welcome, ${artist.full_legal_name}`
    : 'Welcome'

  const steps = [
    {
      number: 1,
      title: 'Review Contract',
      description: 'Read through the Artist Recording, Distribution & Management Agreement carefully.',
      status: contract?.status === 'signed' || contract?.status === 'countersigned' || contract?.status === 'active' ? 'complete' : contract ? 'active' : 'pending',
      href: '/portal/contract',
      icon: FileText,
    },
    {
      number: 2,
      title: 'Complete KYC',
      description: 'Verify your identity with a valid national ID or passport.',
      status: kyc?.status === 'approved' ? 'complete' : kyc?.status === 'submitted' ? 'active' : 'pending',
      href: '/portal/kyc',
      icon: ShieldCheck,
    },
    {
      number: 3,
      title: 'Sign Agreement',
      description: 'Electronically sign the agreement once you\'ve reviewed everything.',
      status: contract?.status === 'signed' || contract?.status === 'countersigned' || contract?.status === 'active' ? 'complete' : 'pending',
      href: '/portal/contract',
      icon: CheckCircle,
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{greeting}</h1>
        <p className="text-[var(--text-muted)] mt-1">
          Complete the steps below to finalize your partnership with Spec Craft Media.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="bg-[var(--dark-3)] border border-[var(--gray)] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[var(--text-muted)]">Contract Status</h3>
            <StatusBadge status={contract?.status || 'draft'} type="contract" />
          </div>
          <p className="text-white font-semibold">
            {contract ? `Agreement V${contract.version}` : 'No contract assigned yet'}
          </p>
          {contract && (
            <Link
              href="/portal/contract"
              className="inline-flex items-center gap-1 text-[var(--gold)] text-sm mt-3 hover:underline"
            >
              View contract <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        <div className="bg-[var(--dark-3)] border border-[var(--gray)] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[var(--text-muted)]">KYC Verification</h3>
            <StatusBadge status={kyc?.status || 'pending'} type="kyc" />
          </div>
          <p className="text-white font-semibold">
            {kyc?.status === 'approved' ? 'Identity verified' :
             kyc?.status === 'submitted' ? 'Under review' :
             kyc?.status === 'rejected' ? 'Needs resubmission' :
             'Not started'}
          </p>
          <Link
            href="/portal/kyc"
            className="inline-flex items-center gap-1 text-[var(--gold)] text-sm mt-3 hover:underline"
          >
            {kyc?.status === 'approved' ? 'View details' : 'Complete KYC'} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="bg-[var(--dark-3)] border border-[var(--gray)] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Onboarding Steps</h2>
        <div className="space-y-4">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <Link
                key={step.number}
                href={step.href}
                className="flex items-start gap-4 p-4 rounded-lg border border-[var(--gray)] hover:border-[var(--gold)]/30 transition-colors group"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  step.status === 'complete' ? 'bg-green-400/10' :
                  step.status === 'active' ? 'bg-[var(--gold)]/10' :
                  'bg-[var(--gray)]'
                }`}>
                  {step.status === 'complete' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Icon className={`w-5 h-5 ${step.status === 'active' ? 'text-[var(--gold)]' : 'text-[var(--text-muted)]'}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium group-hover:text-[var(--gold)] transition-colors">
                      Step {step.number}: {step.title}
                    </h3>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm mt-0.5">{step.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--gold)] shrink-0 mt-2 transition-colors" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
