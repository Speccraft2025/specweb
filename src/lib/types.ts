export interface Artist {
  id: string
  full_legal_name: string
  stage_name: string | null
  email: string
  phone: string | null
  national_id_number: string | null
  passport_number: string | null
  nationality: string
  residential_address: string | null
  date_of_birth: string | null
  created_at: string
  updated_at: string
}

export interface KycVerification {
  id: string
  artist_id: string
  document_type: 'national_id' | 'passport'
  document_front_url: string | null
  document_back_url: string | null
  selfie_url: string | null
  status: 'pending' | 'submitted' | 'approved' | 'rejected'
  rejection_reason: string | null
  reviewed_at: string | null
  submitted_at: string
  created_at: string
}

export interface Contract {
  id: string
  artist_id: string
  version: string
  status: 'draft' | 'sent' | 'viewed' | 'signed' | 'countersigned' | 'active' | 'terminated'
  effective_date: string | null
  sent_at: string | null
  viewed_at: string | null
  signed_at: string | null
  countersigned_at: string | null
  created_at: string
  updated_at: string
}

export interface Signature {
  id: string
  contract_id: string
  signer_type: 'artist' | 'company'
  signer_name: string
  signer_title: string | null
  signature_data: string
  ip_address: string | null
  user_agent: string | null
  signed_at: string
}

export interface ScheduleAMaster {
  id: string
  contract_id: string
  track_number: number
  song_title: string
  isrc_code: string | null
  dsp_release_date: string | null
  current_status: string | null
  historical_expenses_kes: number
  created_at: string
}

export interface IlaAcknowledgment {
  id: string
  contract_id: string
  artist_id: string
  acknowledged_at: string
  ip_address: string | null
}
