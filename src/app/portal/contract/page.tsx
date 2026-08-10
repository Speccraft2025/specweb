import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PortalNav from '@/components/portal/PortalNav'
import ContractViewer from '@/components/portal/ContractViewer'
import type { Artist, Contract, Signature, ScheduleAMaster } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function ContractPage() {
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

  const contract = contracts?.[0] as Contract | undefined

  let signatures: Signature[] = []
  let scheduleA: ScheduleAMaster[] = []

  if (contract) {
    const { data: sigs } = await supabase
      .from('signatures')
      .select('*')
      .eq('contract_id', contract.id)

    const { data: masters } = await supabase
      .from('schedule_a_masters')
      .select('*')
      .eq('contract_id', contract.id)
      .order('track_number', { ascending: true })

    signatures = (sigs || []) as Signature[]
    scheduleA = (masters || []) as ScheduleAMaster[]
  }

  if (contract && contract.status === 'sent') {
    await supabase
      .from('contracts')
      .update({ status: 'viewed', viewed_at: new Date().toISOString() })
      .eq('id', contract.id)
    contract.status = 'viewed'
  }

  return (
    <>
      <PortalNav artistName={artist?.stage_name || artist?.full_legal_name || user.email || 'Artist'} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ContractViewer
          artist={artist as Artist}
          contract={contract}
          signatures={signatures}
          scheduleA={scheduleA}
        />
      </div>
    </>
  )
}
