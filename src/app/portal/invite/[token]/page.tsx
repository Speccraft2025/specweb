import { createAdminClient } from '@/lib/supabase/admin'
import InviteFlow from '@/components/portal/InviteFlow'

export const dynamic = 'force-dynamic'

export default async function InvitePage({ params }: { params: { token: string } }) {
  const admin = createAdminClient()

  const { data: invite } = await admin
    .from('artist_invites')
    .select('*')
    .eq('token', params.token)
    .single()

  if (!invite || invite.status !== 'pending' || new Date(invite.expires_at) < new Date()) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✕</span>
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Invalid Invite</h1>
          <p className="text-white/40 text-sm">
            This invite link is invalid, has already been used, or has expired.
            Contact Spec Craft Media to request a new one.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <InviteFlow token={params.token} prefillEmail={invite.email} prefillName={invite.name} />
    </main>
  )
}
