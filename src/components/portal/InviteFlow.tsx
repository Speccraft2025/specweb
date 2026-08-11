'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, ChevronDown, Loader2 } from 'lucide-react'

type Step = 'contract' | 'signup' | 'kyc' | 'done'

const CONTRACT_TEXT = `ARTIST MANAGEMENT & RECORDING AGREEMENT

Version 2.3 — Spec Craft Media Ltd

This Artist Management & Recording Agreement ("Agreement") is entered into between
Spec Craft Media Ltd, a company incorporated in Kenya ("Company"), and the artist
identified at the end of this Agreement ("Artist").

1. APPOINTMENT & EXCLUSIVITY
The Artist exclusively appoints the Company as their sole and exclusive personal
manager, agent, and record label for the Territory during the Term. The Artist
shall not appoint any other person or entity to perform similar services without
prior written consent from the Company.

2. TERM
The initial term of this Agreement is three (3) years from the Effective Date,
with two (2) automatic renewal options of one (1) year each, unless terminated in
writing by either party with ninety (90) days' notice prior to the end of any term.

3. SERVICES — COMPANY OBLIGATIONS
The Company agrees to:
(a) Provide professional recording studio time, production, mixing, and mastering;
(b) Develop and execute marketing and promotional strategies;
(c) Arrange and manage distribution of the Artist's music across digital platforms;
(d) Seek sync licensing, brand deals, and collaboration opportunities;
(e) Provide artist development coaching, media training, and brand strategy;
(f) Manage tour bookings, live performance logistics, and contract negotiations.

4. REVENUE & ROYALTIES
(a) Recording Advances: Any advances paid by the Company are recoupable against
the Artist's share of royalties before net royalties are paid to the Artist.
(b) Net Revenue Split: After recoupment of all Company expenses, net revenue shall
be split 60% to the Artist and 40% to the Company, unless otherwise stated in
Schedule A.
(c) Streaming Royalties: The Company shall account to the Artist quarterly for all
streaming royalties received net of distribution fees.
(d) Sync Licensing: Sync fees shall be split 50/50 between Artist and Company
after deduction of third-party licensing agent fees.

5. INTELLECTUAL PROPERTY
(a) Masters: All master recordings created during the Term shall be owned jointly
by the Company and the Artist, with the Company holding exclusive licensing rights
during the Term.
(b) Publishing: The Artist retains 100% of their publishing rights unless a
separate co-publishing agreement is executed in writing.
(c) Artist Name & Likeness: The Company may use the Artist's approved name,
image, and likeness for promotional purposes during the Term.

6. ARTIST OBLIGATIONS
The Artist agrees to:
(a) Be available for scheduled recording, promotional, and performance activities
with reasonable notice;
(b) Maintain professional conduct and uphold the reputation of Spec Craft Media;
(c) Not release recordings independently or through third parties without written
consent from the Company;
(d) Promptly notify the Company of any offers, inquiries, or opportunities related
to their music career.

7. INDEPENDENT LEGAL ADVICE (ILA)
The Artist acknowledges that they have been advised to seek Independent Legal
Advice before signing this Agreement, that they have had a reasonable opportunity
to do so, and that they either have obtained such advice or have freely chosen to
waive that right. By proceeding, the Artist confirms they fully understand the
terms herein.

8. TERMINATION
Either party may terminate this Agreement for material breach upon thirty (30)
days' written notice if the breach is not cured within that period. Upon
termination, all unrecouped advances remain due and payable to the Company.
The Company retains the right to exploit master recordings created during the Term
for a period of five (5) years post-termination.

9. GOVERNING LAW & DISPUTE RESOLUTION
This Agreement is governed by the laws of Kenya. Any disputes shall first be
submitted to mediation; if unresolved, to binding arbitration in Nairobi under
the Nairobi Centre for International Arbitration rules.

10. ENTIRE AGREEMENT
This Agreement, together with any attached Schedules, constitutes the entire
agreement between the parties and supersedes all prior negotiations, representations,
and understandings. Amendments must be in writing and signed by both parties.

By completing the onboarding process below, the Artist electronically agrees to
all terms of this Agreement and confirms the accuracy of all information provided.`

export default function InviteFlow({
  token,
  prefillEmail,
  prefillName,
}: {
  token: string
  prefillEmail?: string | null
  prefillName?: string | null
}) {
  const [step, setStep] = useState<Step>('contract')
  const [scrolledToBottom, setScrolledToBottom] = useState(false)
  const [ilaAcknowledged, setIlaAcknowledged] = useState(false)
  const contractRef = useRef<HTMLDivElement>(null)

  // Signup fields
  const [fullName, setFullName] = useState(prefillName || '')
  const [email, setEmail] = useState(prefillEmail || '')
  const [password, setPassword] = useState('')
  const [signupError, setSignupError] = useState('')
  const [signingUp, setSigningUp] = useState(false)

  // KYC fields
  const [stageName, setStageName] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [nationality, setNationality] = useState('Kenyan')
  const [address, setAddress] = useState('')
  const [docType, setDocType] = useState<'national_id' | 'passport'>('national_id')
  const [idNumber, setIdNumber] = useState('')
  const [kycError, setKycError] = useState('')
  const [submittingKyc, setSubmittingKyc] = useState(false)

  function handleContractScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 40) {
      setScrolledToBottom(true)
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setSignupError('')
    setSigningUp(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

    if (error) {
      setSignupError(error.message)
      setSigningUp(false)
      return
    }

    // Mark invite used
    await fetch('/api/invite/use', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })

    setStep('kyc')
    setSigningUp(false)
  }

  async function handleKyc(e: React.FormEvent) {
    e.preventDefault()
    setKycError('')
    setSubmittingKyc(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setKycError('Session expired — please refresh.'); setSubmittingKyc(false); return }

    // Update artist profile
    await supabase.from('artists').update({
      stage_name: stageName || null,
      phone: phone || null,
      date_of_birth: dob || null,
      nationality,
      residential_address: address || null,
      ...(docType === 'national_id' ? { national_id_number: idNumber } : { passport_number: idNumber }),
    }).eq('id', user.id)

    // Create KYC record
    const { error: kycErr } = await supabase.from('kyc_verifications').insert({
      artist_id: user.id,
      document_type: docType,
      status: 'submitted',
    })

    if (kycErr) { setKycError(kycErr.message); setSubmittingKyc(false); return }

    // Create draft contract for admin to countersign
    await supabase.from('contracts').insert({
      artist_id: user.id,
      version: '2.3',
      status: 'signed',
      signed_at: new Date().toISOString(),
    })

    setStep('done')
    setSubmittingKyc(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#FFB000] text-xs font-bold tracking-[0.3em] uppercase mb-2">Spec Craft Media Ltd</p>
          <h1 className="text-2xl font-black text-white">Artist Onboarding</h1>
          <p className="text-white/40 text-sm mt-1">You've been invited to join the roster.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {(['contract', 'signup', 'kyc', 'done'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step === s ? 'bg-[#FFB000] text-black' :
                (['contract', 'signup', 'kyc', 'done'].indexOf(step) > i) ? 'bg-[#FFB000]/20 text-[#FFB000]' :
                'bg-white/5 text-white/20'
              }`}>
                {(['contract', 'signup', 'kyc', 'done'].indexOf(step) > i) ? <CheckCircle size={14} /> : i + 1}
              </div>
              {i < 3 && <div className={`w-8 h-px transition-colors ${(['contract', 'signup', 'kyc', 'done'].indexOf(step) > i) ? 'bg-[#FFB000]/40' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>

        {/* ── Step 1: Contract ── */}
        {step === 'contract' && (
          <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-white/8">
              <h2 className="text-base font-bold text-white">Artist Management & Recording Agreement</h2>
              <p className="text-xs text-white/40 mt-1">Read the full agreement below before proceeding.</p>
            </div>

            <div
              ref={contractRef}
              onScroll={handleContractScroll}
              className="h-80 overflow-y-auto px-6 py-5 text-xs text-white/55 leading-relaxed whitespace-pre-wrap font-mono"
            >
              {CONTRACT_TEXT}
              <div className="h-8" />
            </div>

            {!scrolledToBottom && (
              <div className="flex items-center justify-center gap-2 py-3 border-t border-white/8 text-white/30 text-xs">
                <ChevronDown size={14} className="animate-bounce" />
                Scroll to read the full agreement
              </div>
            )}

            {scrolledToBottom && (
              <div className="px-6 py-5 border-t border-white/8 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ilaAcknowledged}
                    onChange={e => setIlaAcknowledged(e.target.checked)}
                    className="mt-0.5 accent-[#FFB000]"
                  />
                  <span className="text-xs text-white/60 leading-relaxed">
                    I confirm that I have read and understood this Agreement in full. I have been advised
                    to seek Independent Legal Advice and have either done so or freely waive that right.
                    I agree to be bound by all terms above.
                  </span>
                </label>
                <button
                  disabled={!ilaAcknowledged}
                  onClick={() => setStep('signup')}
                  className="w-full py-3 rounded-xl bg-[#FFB000] text-black font-bold text-sm hover:bg-[#FFC933] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  I Agree — Continue to Sign Up
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Step 2: Sign Up ── */}
        {step === 'signup' && (
          <div className="bg-[#111] border border-white/8 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-1">Create Your Account</h2>
            <p className="text-xs text-white/40 mb-6">This gives you access to your artist portal.</p>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 mb-1">Full Legal Name *</label>
                <input
                  required value={fullName} onChange={e => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFB000] transition-colors"
                  placeholder="As it appears on your ID"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Email Address *</label>
                <input
                  required type="email" value={email} onChange={e => setEmail(e.target.value)}
                  disabled={!!prefillEmail}
                  className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFB000] transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Password *</label>
                <input
                  required type="password" value={password} onChange={e => setPassword(e.target.value)}
                  minLength={8}
                  className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFB000] transition-colors"
                  placeholder="At least 8 characters"
                />
              </div>
              {signupError && <p className="text-red-400 text-xs">{signupError}</p>}
              <button
                type="submit" disabled={signingUp}
                className="w-full py-3 rounded-xl bg-[#FFB000] text-black font-bold text-sm hover:bg-[#FFC933] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {signingUp && <Loader2 size={14} className="animate-spin" />}
                {signingUp ? 'Creating account…' : 'Create Account & Continue'}
              </button>
            </form>
          </div>
        )}

        {/* ── Step 3: KYC ── */}
        {step === 'kyc' && (
          <div className="bg-[#111] border border-white/8 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-1">Identity Verification</h2>
            <p className="text-xs text-white/40 mb-6">Required to complete your artist registration.</p>

            <form onSubmit={handleKyc} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1">Stage Name</label>
                  <input value={stageName} onChange={e => setStageName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFB000] transition-colors"
                    placeholder="Optional" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Phone Number</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFB000] transition-colors"
                    placeholder="+254 7XX XXX XXX" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Date of Birth *</label>
                  <input required type="date" value={dob} onChange={e => setDob(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFB000] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Nationality *</label>
                  <input required value={nationality} onChange={e => setNationality(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFB000] transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Residential Address *</label>
                <input required value={address} onChange={e => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFB000] transition-colors"
                  placeholder="Street, City, County" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1">Document Type *</label>
                  <select value={docType} onChange={e => setDocType(e.target.value as 'national_id' | 'passport')}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFB000] transition-colors">
                    <option value="national_id">National ID</option>
                    <option value="passport">Passport</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">
                    {docType === 'national_id' ? 'ID Number' : 'Passport Number'} *
                  </label>
                  <input required value={idNumber} onChange={e => setIdNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFB000] transition-colors" />
                </div>
              </div>
              {kycError && <p className="text-red-400 text-xs">{kycError}</p>}
              <button type="submit" disabled={submittingKyc}
                className="w-full py-3 rounded-xl bg-[#FFB000] text-black font-bold text-sm hover:bg-[#FFC933] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {submittingKyc && <Loader2 size={14} className="animate-spin" />}
                {submittingKyc ? 'Submitting…' : 'Submit & Complete Registration'}
              </button>
            </form>
          </div>
        )}

        {/* ── Step 4: Done ── */}
        {step === 'done' && (
          <div className="bg-[#111] border border-white/8 rounded-2xl p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FFB000]/10 border border-[#FFB000]/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={28} className="text-[#FFB000]" />
            </div>
            <h2 className="text-xl font-black text-white mb-2">You're on the waitlist!</h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto mb-8">
              Your registration and KYC have been submitted. Spec Craft Media will review
              your details and countersign your agreement. You'll receive an email once
              your account is activated.
            </p>
            <a
              href="/portal/dashboard"
              className="inline-block px-8 py-3 rounded-full bg-[#FFB000] text-black font-bold text-sm hover:bg-[#FFC933] transition-colors"
            >
              Go to My Portal
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
