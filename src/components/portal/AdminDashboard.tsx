'use client'

import { useState } from 'react'
import type { Artist, Contract, KycVerification, Signature } from '@/lib/types'
import {
  Users,
  FileText,
  ShieldCheck,
  BarChart3,
  Plus,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  PenTool,
  AlertCircle,
} from 'lucide-react'

type Tab = 'overview' | 'artists' | 'contracts' | 'kyc'

export default function AdminDashboard({
  artists,
  contracts,
  kycRecords,
  signatures,
}: {
  artists: Artist[]
  contracts: Contract[]
  kycRecords: KycVerification[]
  signatures: Signature[]
}) {
  const [tab, setTab] = useState<Tab>('overview')

  const tabs: { key: Tab; label: string; icon: typeof Users }[] = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'artists', label: 'Artists', icon: Users },
    { key: 'contracts', label: 'Contracts', icon: FileText },
    { key: 'kyc', label: 'KYC Review', icon: ShieldCheck },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-[var(--text-muted)] mt-1">Manage artists, contracts, and KYC verifications.</p>
      </div>

      <div className="flex gap-1 mb-8 bg-[var(--dark-3)] p-1 rounded-xl border border-[var(--gray)]">
        {tabs.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex-1 justify-center ${
                tab === t.key
                  ? 'bg-[var(--gold)] text-black'
                  : 'text-[var(--text-muted)] hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          )
        })}
      </div>

      {tab === 'overview' && (
        <OverviewTab artists={artists} contracts={contracts} kycRecords={kycRecords} signatures={signatures} />
      )}
      {tab === 'artists' && (
        <ArtistsTab artists={artists} contracts={contracts} />
      )}
      {tab === 'contracts' && (
        <ContractsTab artists={artists} contracts={contracts} signatures={signatures} />
      )}
      {tab === 'kyc' && (
        <KycTab artists={artists} kycRecords={kycRecords} />
      )}
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number | string; icon: typeof Users; color: string }) {
  return (
    <div className="bg-[var(--dark-3)] border border-[var(--gray)] rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-[var(--text-muted)]">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}

function OverviewTab({ artists, contracts, kycRecords, signatures }: {
  artists: Artist[]; contracts: Contract[]; kycRecords: KycVerification[]; signatures: Signature[]
}) {
  const pendingKyc = kycRecords.filter(k => k.status === 'submitted').length
  const signedContracts = contracts.filter(c => c.status === 'signed' || c.status === 'countersigned' || c.status === 'active').length
  const pendingContracts = contracts.filter(c => c.status === 'sent' || c.status === 'viewed').length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Artists" value={artists.length} icon={Users} color="bg-blue-400/10 text-blue-400" />
        <StatCard label="Active Contracts" value={signedContracts} icon={FileText} color="bg-green-400/10 text-green-400" />
        <StatCard label="Pending Contracts" value={pendingContracts} icon={Clock} color="bg-yellow-400/10 text-yellow-400" />
        <StatCard label="KYC Pending" value={pendingKyc} icon={ShieldCheck} color="bg-purple-400/10 text-purple-400" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[var(--dark-3)] border border-[var(--gray)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Recent Artists</h3>
          {artists.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">No artists yet.</p>
          ) : (
            <div className="space-y-3">
              {artists.slice(0, 5).map((a) => (
                <div key={a.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-white">{a.full_legal_name || 'Unnamed'}</p>
                    <p className="text-xs text-[var(--text-muted)]">{a.email}</p>
                  </div>
                  {a.stage_name && (
                    <span className="text-xs text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded-full">{a.stage_name}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-[var(--dark-3)] border border-[var(--gray)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Recent Signatures</h3>
          {signatures.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">No signatures yet.</p>
          ) : (
            <div className="space-y-3">
              {signatures.slice(0, 5).map((s) => (
                <div key={s.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-white">{s.signer_name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{s.signer_type}</p>
                  </div>
                  <span className="text-xs text-[var(--text-muted)]">
                    {new Date(s.signed_at).toLocaleDateString('en-KE')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ArtistsTab({ artists, contracts }: { artists: Artist[]; contracts: Contract[] }) {
  const [showCreate, setShowCreate] = useState(false)
  const [creating, setCreating] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({ email: '', password: '', full_legal_name: '', stage_name: '' })

  async function handleCreate() {
    if (!form.email || !form.password || !form.full_legal_name) return
    setCreating(true)
    setMessage('')

    const res = await fetch('/api/admin/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create_artist', ...form }),
    })

    const data = await res.json()
    if (res.ok) {
      setMessage(`Artist created: ${data.user.email}`)
      setForm({ email: '', password: '', full_legal_name: '', stage_name: '' })
      setTimeout(() => window.location.reload(), 1500)
    } else {
      setMessage(`Error: ${data.error}`)
    }
    setCreating(false)
  }

  function getContractStatus(artistId: string) {
    const c = contracts.find(c => c.artist_id === artistId)
    if (!c) return null
    return c.status
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Artists ({artists.length})</h2>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--gold)] text-black text-sm font-semibold rounded-lg hover:bg-[var(--gold-dim)] transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Artist
        </button>
      </div>

      {showCreate && (
        <div className="bg-[var(--dark-3)] border border-[var(--gold)]/20 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white">Create Artist Account</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1">Full Legal Name *</label>
              <input
                type="text"
                value={form.full_legal_name}
                onChange={(e) => setForm({ ...form, full_legal_name: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg text-white text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1">Stage Name</label>
              <input
                type="text"
                value={form.stage_name}
                onChange={(e) => setForm({ ...form, stage_name: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg text-white text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg text-white text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1">Password *</label>
              <input
                type="text"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg text-white text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
          </div>
          {message && (
            <p className={`text-sm ${message.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>
          )}
          <button
            onClick={handleCreate}
            disabled={creating || !form.email || !form.password || !form.full_legal_name}
            className="px-6 py-2 bg-[var(--gold)] text-black text-sm font-semibold rounded-lg hover:bg-[var(--gold-dim)] transition-colors disabled:opacity-30"
          >
            {creating ? 'Creating...' : 'Create Account'}
          </button>
        </div>
      )}

      <div className="bg-[var(--dark-3)] border border-[var(--gray)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--gray)]">
                <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Artist</th>
                <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Email</th>
                <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Contract</th>
                <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Joined</th>
              </tr>
            </thead>
            <tbody>
              {artists.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-[var(--text-muted)]">No artists yet. Create one above.</td></tr>
              ) : (
                artists.map((a) => {
                  const status = getContractStatus(a.id)
                  return (
                    <tr key={a.id} className="border-b border-[var(--gray)]/30 hover:bg-[var(--dark-2)] transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-white font-medium">{a.full_legal_name || 'Unnamed'}</p>
                          {a.stage_name && <p className="text-xs text-[var(--gold)]">{a.stage_name}</p>}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[var(--text-muted)]">{a.email}</td>
                      <td className="py-3 px-4">
                        <ContractStatusBadge status={status} />
                      </td>
                      <td className="py-3 px-4 text-[var(--text-muted)]">
                        {new Date(a.created_at).toLocaleDateString('en-KE')}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ContractsTab({ artists, contracts, signatures }: { artists: Artist[]; contracts: Contract[]; signatures: Signature[] }) {
  const [showSend, setShowSend] = useState(false)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedArtist, setSelectedArtist] = useState('')
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0])

  const artistsWithoutContract = artists.filter(a => !contracts.some(c => c.artist_id === a.id))

  async function handleSend() {
    if (!selectedArtist) return
    setSending(true)
    setMessage('')

    const res = await fetch('/api/admin/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create_contract', artist_id: selectedArtist, effective_date: effectiveDate }),
    })

    const data = await res.json()
    if (res.ok) {
      setMessage('Contract sent successfully')
      setSelectedArtist('')
      setTimeout(() => window.location.reload(), 1500)
    } else {
      setMessage(`Error: ${data.error}`)
    }
    setSending(false)
  }

  function getArtistName(artistId: string) {
    const a = artists.find(a => a.id === artistId)
    return a?.stage_name || a?.full_legal_name || 'Unknown'
  }

  function getArtistSig(contractId: string) {
    return signatures.find(s => s.contract_id === contractId && s.signer_type === 'artist')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Contracts ({contracts.length})</h2>
        <button
          onClick={() => setShowSend(!showSend)}
          disabled={artistsWithoutContract.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--gold)] text-black text-sm font-semibold rounded-lg hover:bg-[var(--gold-dim)] transition-colors disabled:opacity-30"
        >
          <Send className="w-4 h-4" />
          Send Contract
        </button>
      </div>

      {showSend && (
        <div className="bg-[var(--dark-3)] border border-[var(--gold)]/20 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white">Send Contract to Artist</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1">Select Artist *</label>
              <select
                value={selectedArtist}
                onChange={(e) => setSelectedArtist(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg text-white text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
              >
                <option value="">Choose an artist...</option>
                {artistsWithoutContract.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.full_legal_name} {a.stage_name ? `(${a.stage_name})` : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1">Effective Date</label>
              <input
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg text-white text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>
          </div>
          {message && (
            <p className={`text-sm ${message.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>
          )}
          <button
            onClick={handleSend}
            disabled={sending || !selectedArtist}
            className="px-6 py-2 bg-[var(--gold)] text-black text-sm font-semibold rounded-lg hover:bg-[var(--gold-dim)] transition-colors disabled:opacity-30"
          >
            {sending ? 'Sending...' : 'Send Contract'}
          </button>
        </div>
      )}

      <div className="bg-[var(--dark-3)] border border-[var(--gray)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--gray)]">
                <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Artist</th>
                <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Version</th>
                <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Status</th>
                <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Effective Date</th>
                <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Signed</th>
              </tr>
            </thead>
            <tbody>
              {contracts.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-[var(--text-muted)]">No contracts yet.</td></tr>
              ) : (
                contracts.map((c) => {
                  const sig = getArtistSig(c.id)
                  return (
                    <tr key={c.id} className="border-b border-[var(--gray)]/30 hover:bg-[var(--dark-2)] transition-colors">
                      <td className="py-3 px-4 text-white font-medium">{getArtistName(c.artist_id)}</td>
                      <td className="py-3 px-4 text-[var(--text-muted)]">v{c.version}</td>
                      <td className="py-3 px-4"><ContractStatusBadge status={c.status} /></td>
                      <td className="py-3 px-4 text-[var(--text-muted)]">{c.effective_date || '—'}</td>
                      <td className="py-3 px-4">
                        {sig ? (
                          <span className="text-xs text-green-400">{new Date(sig.signed_at).toLocaleDateString('en-KE')}</span>
                        ) : (
                          <span className="text-xs text-[var(--text-muted)]">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function KycTab({ artists, kycRecords }: { artists: Artist[]; kycRecords: KycVerification[] }) {
  const [processing, setProcessing] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  function getArtistName(artistId: string) {
    const a = artists.find(a => a.id === artistId)
    return a?.stage_name || a?.full_legal_name || 'Unknown'
  }

  async function handleReview(kycId: string, action: 'approve' | 'reject', reason?: string) {
    setProcessing(kycId)
    setMessage('')

    const res = await fetch('/api/admin/setup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'review_kyc', kyc_id: kycId, decision: action, rejection_reason: reason }),
    })

    const data = await res.json()
    if (res.ok) {
      setMessage(`KYC ${action === 'approve' ? 'approved' : 'rejected'} successfully`)
      setTimeout(() => window.location.reload(), 1500)
    } else {
      setMessage(`Error: ${data.error}`)
    }
    setProcessing(null)
  }

  const pending = kycRecords.filter(k => k.status === 'submitted')
  const reviewed = kycRecords.filter(k => k.status !== 'submitted' && k.status !== 'pending')

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white">KYC Verifications</h2>

      {pending.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-[var(--gold)]">Pending Review ({pending.length})</h3>
          {pending.map((k) => (
            <div key={k.id} className="bg-[var(--dark-3)] border border-[var(--gold)]/20 rounded-xl p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white font-medium">{getArtistName(k.artist_id)}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Submitted {new Date(k.submitted_at).toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-400/10 text-yellow-400">Pending Review</span>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                <div className="bg-[var(--dark-2)] rounded-lg p-3">
                  <p className="text-xs text-[var(--text-muted)] mb-1">Document Type</p>
                  <p className="text-white">{k.document_type === 'national_id' ? 'National ID' : 'Passport'}</p>
                </div>
                <div className="bg-[var(--dark-2)] rounded-lg p-3">
                  <p className="text-xs text-[var(--text-muted)] mb-1">Front</p>
                  <p className="text-white">{k.document_front_url ? 'Uploaded' : 'Missing'}</p>
                </div>
                <div className="bg-[var(--dark-2)] rounded-lg p-3">
                  <p className="text-xs text-[var(--text-muted)] mb-1">Selfie</p>
                  <p className="text-white">{k.selfie_url ? 'Uploaded' : 'Missing'}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleReview(k.id, 'approve')}
                  disabled={processing === k.id}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 text-sm font-medium rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => {
                    const reason = prompt('Rejection reason:')
                    if (reason) handleReview(k.id, 'reject', reason)
                  }}
                  disabled={processing === k.id}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {message && (
        <p className={`text-sm ${message.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>
      )}

      <div className="bg-[var(--dark-3)] border border-[var(--gray)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--gray)]">
                <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Artist</th>
                <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Document</th>
                <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Status</th>
                <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {kycRecords.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-[var(--text-muted)]">No KYC submissions yet.</td></tr>
              ) : (
                kycRecords.map((k) => (
                  <tr key={k.id} className="border-b border-[var(--gray)]/30 hover:bg-[var(--dark-2)] transition-colors">
                    <td className="py-3 px-4 text-white">{getArtistName(k.artist_id)}</td>
                    <td className="py-3 px-4 text-[var(--text-muted)]">{k.document_type === 'national_id' ? 'National ID' : 'Passport'}</td>
                    <td className="py-3 px-4"><KycStatusBadge status={k.status} /></td>
                    <td className="py-3 px-4 text-[var(--text-muted)]">{new Date(k.submitted_at).toLocaleDateString('en-KE')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ContractStatusBadge({ status }: { status: string | null }) {
  if (!status) return <span className="text-xs px-2 py-1 rounded-full bg-[var(--dark-2)] text-[var(--text-muted)]">No contract</span>

  const styles: Record<string, { bg: string; text: string; icon: typeof Clock }> = {
    draft: { bg: 'bg-gray-400/10', text: 'text-gray-400', icon: FileText },
    sent: { bg: 'bg-blue-400/10', text: 'text-blue-400', icon: Send },
    viewed: { bg: 'bg-purple-400/10', text: 'text-purple-400', icon: Eye },
    signed: { bg: 'bg-green-400/10', text: 'text-green-400', icon: PenTool },
    countersigned: { bg: 'bg-green-400/10', text: 'text-green-400', icon: CheckCircle },
    active: { bg: 'bg-green-400/10', text: 'text-green-400', icon: CheckCircle },
    terminated: { bg: 'bg-red-400/10', text: 'text-red-400', icon: XCircle },
  }

  const s = styles[status] || styles.draft
  const Icon = s.icon

  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${s.bg} ${s.text}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

function KycStatusBadge({ status }: { status: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    pending: { bg: 'bg-gray-400/10', text: 'text-gray-400' },
    submitted: { bg: 'bg-yellow-400/10', text: 'text-yellow-400' },
    approved: { bg: 'bg-green-400/10', text: 'text-green-400' },
    rejected: { bg: 'bg-red-400/10', text: 'text-red-400' },
  }

  const s = styles[status] || styles.pending

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${s.bg} ${s.text}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
