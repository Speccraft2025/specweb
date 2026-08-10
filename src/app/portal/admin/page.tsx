import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import PortalNav from '@/components/portal/PortalNav'
import AdminDashboard from '@/components/portal/AdminDashboard'

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

  return (
    <>
      <PortalNav artistName="Admin" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard
          artists={artists || []}
          contracts={contracts || []}
          kycRecords={kycRecords || []}
          signatures={signatures || []}
        />
      </div>
    </>
  )
}
