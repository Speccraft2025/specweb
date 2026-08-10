import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PortalNav from '@/components/portal/PortalNav'
import DashboardContent from '@/components/portal/DashboardContent'
import type { Artist, Contract, KycVerification } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/portal/login')

  const { data: artist } = await supabase
    .from('artists')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: contracts } = await supabase
    .from('contracts')
    .select('*')
    .eq('artist_id', user.id)
    .order('created_at', { ascending: false })

  const { data: kyc } = await supabase
    .from('kyc_verifications')
    .select('*')
    .eq('artist_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)

  const contract = contracts?.[0] as Contract | undefined
  const kycRecord = kyc?.[0] as KycVerification | undefined

  return (
    <>
      <PortalNav artistName={artist?.stage_name || artist?.full_legal_name || user.email || 'Artist'} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardContent
          artist={artist as Artist}
          contract={contract}
          kyc={kycRecord}
        />
      </div>
    </>
  )
}
