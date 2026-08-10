import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PortalNav from '@/components/portal/PortalNav'
import KycForm from '@/components/portal/KycForm'
import type { Artist, KycVerification } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function KycPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/portal/login')

  const { data: artist } = await supabase
    .from('artists')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: kyc } = await supabase
    .from('kyc_verifications')
    .select('*')
    .eq('artist_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)

  const kycRecord = kyc?.[0] as KycVerification | undefined

  return (
    <>
      <PortalNav artistName={artist?.stage_name || artist?.full_legal_name || user.email || 'Artist'} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <KycForm
          artist={artist as Artist}
          kyc={kycRecord}
        />
      </div>
    </>
  )
}
