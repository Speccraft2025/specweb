'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Artist, KycVerification } from '@/lib/types'
import {
  ShieldCheck,
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Camera,
  CreditCard,
  User,
} from 'lucide-react'

type Step = 'info' | 'documents' | 'selfie' | 'review'

export default function KycForm({
  artist,
  kyc,
}: {
  artist: Artist
  kyc?: KycVerification
}) {
  const [step, setStep] = useState<Step>('info')
  const [documentType, setDocumentType] = useState<'national_id' | 'passport'>(
    kyc?.document_type || 'national_id'
  )
  const [formData, setFormData] = useState({
    full_legal_name: artist.full_legal_name || '',
    date_of_birth: artist.date_of_birth || '',
    nationality: artist.nationality || 'Kenyan',
    national_id_number: artist.national_id_number || '',
    passport_number: artist.passport_number || '',
    residential_address: artist.residential_address || '',
    phone: artist.phone || '',
    stage_name: artist.stage_name || '',
  })
  const [frontFile, setFrontFile] = useState<File | null>(null)
  const [backFile, setBackFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(kyc?.status === 'submitted' || kyc?.status === 'approved')

  if (kyc?.status === 'approved') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-400/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">KYC Verified</h2>
        <p className="text-[var(--text-muted)]">
          Your identity has been verified. You&apos;re all set.
        </p>
      </div>
    )
  }

  if (kyc?.status === 'submitted' || submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-blue-400/10 flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Under Review</h2>
        <p className="text-[var(--text-muted)]">
          Your KYC documents are being reviewed. You&apos;ll be notified once verification is complete.
        </p>
      </div>
    )
  }

  if (kyc?.status === 'rejected') {
    return (
      <div className="space-y-6">
        <div className="bg-red-400/10 border border-red-400/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-medium">Verification Rejected</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {kyc.rejection_reason || 'Please resubmit your documents.'}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => { setSubmitted(false); setStep('info') }}
          className="w-full py-3 bg-[var(--gold)] text-black font-semibold rounded-lg hover:bg-[var(--gold-dim)] transition-colors"
        >
          Resubmit KYC
        </button>
      </div>
    )
  }

  async function handleSubmit() {
    setSubmitting(true)
    const supabase = createClient()

    await supabase
      .from('artists')
      .update({
        full_legal_name: formData.full_legal_name,
        stage_name: formData.stage_name || null,
        date_of_birth: formData.date_of_birth || null,
        nationality: formData.nationality,
        national_id_number: documentType === 'national_id' ? formData.national_id_number : null,
        passport_number: documentType === 'passport' ? formData.passport_number : null,
        residential_address: formData.residential_address || null,
        phone: formData.phone || null,
      })
      .eq('id', artist.id)

    let frontUrl: string | null = null
    let backUrl: string | null = null
    let selfieUrl: string | null = null

    if (frontFile) {
      const { data } = await supabase.storage
        .from('kyc-documents')
        .upload(`${artist.id}/${Date.now()}-front.${frontFile.name.split('.').pop()}`, frontFile)
      if (data) frontUrl = data.path
    }
    if (backFile) {
      const { data } = await supabase.storage
        .from('kyc-documents')
        .upload(`${artist.id}/${Date.now()}-back.${backFile.name.split('.').pop()}`, backFile)
      if (data) backUrl = data.path
    }
    if (selfieFile) {
      const { data } = await supabase.storage
        .from('kyc-documents')
        .upload(`${artist.id}/${Date.now()}-selfie.${selfieFile.name.split('.').pop()}`, selfieFile)
      if (data) selfieUrl = data.path
    }

    await supabase.from('kyc_verifications').insert({
      artist_id: artist.id,
      document_type: documentType,
      document_front_url: frontUrl,
      document_back_url: backUrl,
      selfie_url: selfieUrl,
      status: 'submitted',
    })

    setSubmitting(false)
    setSubmitted(true)
  }

  const steps: { key: Step; label: string; icon: typeof User }[] = [
    { key: 'info', label: 'Personal Info', icon: User },
    { key: 'documents', label: 'Documents', icon: CreditCard },
    { key: 'selfie', label: 'Selfie', icon: Camera },
    { key: 'review', label: 'Review', icon: ShieldCheck },
  ]

  const currentIndex = steps.findIndex((s) => s.key === step)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">KYC Verification</h1>
        <p className="text-[var(--text-muted)] mt-1">
          Verify your identity to complete your onboarding.
        </p>
      </div>

      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => {
          const Icon = s.icon
          const isActive = i === currentIndex
          const isDone = i < currentIndex
          return (
            <div key={s.key} className="flex items-center gap-2 flex-1">
              <button
                onClick={() => i <= currentIndex && setStep(s.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors w-full ${
                  isActive ? 'bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20' :
                  isDone ? 'bg-green-400/10 text-green-400' :
                  'bg-[var(--dark-3)] text-[var(--text-muted)]'
                }`}
              >
                {isDone ? <CheckCircle className="w-3.5 h-3.5 shrink-0" /> : <Icon className="w-3.5 h-3.5 shrink-0" />}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            </div>
          )
        })}
      </div>

      <div className="bg-[var(--dark-3)] border border-[var(--gray)] rounded-xl p-6">
        {step === 'info' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1.5">Full Legal Name *</label>
                <input
                  type="text"
                  value={formData.full_legal_name}
                  onChange={(e) => setFormData({ ...formData, full_legal_name: e.target.value })}
                  required
                  className="w-full px-3 py-2.5 bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg text-white placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1.5">Stage Name</label>
                <input
                  type="text"
                  value={formData.stage_name}
                  onChange={(e) => setFormData({ ...formData, stage_name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg text-white placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1.5">Nationality</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1.5">Phone / WhatsApp</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+254..."
                  className="w-full px-3 py-2.5 bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg text-white placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1.5">Residential Address</label>
                <input
                  type="text"
                  value={formData.residential_address}
                  onChange={(e) => setFormData({ ...formData, residential_address: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
                />
              </div>
            </div>
            <button
              onClick={() => setStep('documents')}
              disabled={!formData.full_legal_name}
              className="w-full py-3 bg-[var(--gold)] text-black font-semibold rounded-lg hover:bg-[var(--gold-dim)] transition-colors disabled:opacity-30 mt-4"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'documents' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Identity Document</h2>

            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setDocumentType('national_id')}
                className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  documentType === 'national_id'
                    ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]'
                    : 'border-[var(--gray)] text-[var(--text-muted)]'
                }`}
              >
                National ID
              </button>
              <button
                onClick={() => setDocumentType('passport')}
                className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-colors ${
                  documentType === 'passport'
                    ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]'
                    : 'border-[var(--gray)] text-[var(--text-muted)]'
                }`}
              >
                Passport
              </button>
            </div>

            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1.5">
                {documentType === 'national_id' ? 'National ID Number' : 'Passport Number'} *
              </label>
              <input
                type="text"
                value={documentType === 'national_id' ? formData.national_id_number : formData.passport_number}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [documentType === 'national_id' ? 'national_id_number' : 'passport_number']: e.target.value,
                  })
                }
                required
                className="w-full px-3 py-2.5 bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg text-white focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>

            <FileUpload
              label={`${documentType === 'national_id' ? 'ID' : 'Passport'} Front`}
              file={frontFile}
              onFileChange={setFrontFile}
            />
            {documentType === 'national_id' && (
              <FileUpload
                label="ID Back"
                file={backFile}
                onFileChange={setBackFile}
              />
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setStep('info')}
                className="flex-1 py-3 border border-[var(--gray)] text-[var(--text-muted)] rounded-lg hover:text-white transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('selfie')}
                disabled={!frontFile || !(documentType === 'national_id' ? formData.national_id_number : formData.passport_number)}
                className="flex-1 py-3 bg-[var(--gold)] text-black font-semibold rounded-lg hover:bg-[var(--gold-dim)] transition-colors disabled:opacity-30"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 'selfie' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Selfie Verification</h2>
            <p className="text-sm text-[var(--text-muted)]">
              Take a clear photo of yourself holding your {documentType === 'national_id' ? 'ID' : 'passport'} next to your face.
            </p>
            <FileUpload
              label="Selfie with ID"
              file={selfieFile}
              onFileChange={setSelfieFile}
              accept="image/*"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setStep('documents')}
                className="flex-1 py-3 border border-[var(--gray)] text-[var(--text-muted)] rounded-lg hover:text-white transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('review')}
                disabled={!selfieFile}
                className="flex-1 py-3 bg-[var(--gold)] text-black font-semibold rounded-lg hover:bg-[var(--gold-dim)] transition-colors disabled:opacity-30"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 'review' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Review & Submit</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-[var(--gray)]/30">
                <span className="text-[var(--text-muted)]">Full Name</span>
                <span className="text-white">{formData.full_legal_name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--gray)]/30">
                <span className="text-[var(--text-muted)]">Stage Name</span>
                <span className="text-white">{formData.stage_name || '—'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--gray)]/30">
                <span className="text-[var(--text-muted)]">Document Type</span>
                <span className="text-white">{documentType === 'national_id' ? 'National ID' : 'Passport'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--gray)]/30">
                <span className="text-[var(--text-muted)]">Document Number</span>
                <span className="text-white">
                  {documentType === 'national_id' ? formData.national_id_number : formData.passport_number}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--gray)]/30">
                <span className="text-[var(--text-muted)]">Documents</span>
                <span className="text-green-400">
                  {[frontFile, backFile, selfieFile].filter(Boolean).length} file(s) ready
                </span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep('selfie')}
                className="flex-1 py-3 border border-[var(--gray)] text-[var(--text-muted)] rounded-lg hover:text-white transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 py-3 bg-[var(--gold)] text-black font-semibold rounded-lg hover:bg-[var(--gold-dim)] transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit for Verification'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function FileUpload({
  label,
  file,
  onFileChange,
  accept = 'image/*,.pdf',
}: {
  label: string
  file: File | null
  onFileChange: (file: File | null) => void
  accept?: string
}) {
  return (
    <div>
      <label className="block text-sm text-[var(--text-muted)] mb-1.5">{label} *</label>
      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[var(--gray)] rounded-lg cursor-pointer hover:border-[var(--gold)]/50 transition-colors bg-[var(--dark-2)]">
        {file ? (
          <div className="text-center">
            <CheckCircle className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <p className="text-sm text-white">{file.name}</p>
            <p className="text-xs text-[var(--text-muted)]">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-5 h-5 text-[var(--text-muted)] mx-auto mb-1" />
            <p className="text-sm text-[var(--text-muted)]">Click to upload</p>
            <p className="text-xs text-[var(--text-muted)]/50">JPG, PNG or PDF</p>
          </div>
        )}
        <input
          type="file"
          accept={accept}
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          className="hidden"
        />
      </label>
    </div>
  )
}
