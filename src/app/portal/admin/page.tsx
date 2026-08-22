import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import PortalNav from '@/components/portal/PortalNav'
import AdminDashboard from '@/components/portal/AdminDashboard'
import type { KycVerification } from '@/lib/types'

export const dynamic = 'force-dynamic'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'jayzelisaac@gmail.com').split(',').map(e => e.trim().toLowerCase())

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/portal/login')
  if (!ADMIN_EMAILS.includes(user.email?.toLowerCase() || '')) redirect('/portal/dashboard')

  const admin = createAdminClient()

  const { data: artists } = await admin
    .from('artists')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: contracts } = await admin
    .from('contracts')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: kycRecords } = await admin
    .from('kyc_verifications')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: signatures } = await admin
    .from('signatures')
    .select('*')
    .order('signed_at', { ascending: false })

  const kycRecordsWithUrls = await Promise.all(
    ((kycRecords || []) as KycVerification[]).map(async (record) => {
      async function signPath(path: string | null | undefined) {
        if (!path) return null
        const { data, error } = await admin.storage
          .from('kyc-documents')
          .createSignedUrl(path, 60 * 60)

        if (error) return null
        return data.signedUrl
      }

      return {
        ...record,
        document_front_signed_url: await signPath(record.document_front_url),
        document_back_signed_url: await signPath(record.document_back_url),
        selfie_signed_url: await signPath(record.selfie_url),
      }
    })
  )

  return (
    <>
      <PortalNav artistName="Admin" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard
          artists={artists || []}
          contracts={contracts || []}
          kycRecords={kycRecordsWithUrls}
          signatures={signatures || []}
        />
      </div>
    </>
  )
}
