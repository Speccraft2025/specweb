import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'jayzelisaac@gmail.com')
  .split(',').map(e => e.trim().toLowerCase())

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() || '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { email, name } = await req.json()
  const admin = createAdminClient()

  const { data: invite, error } = await admin
    .from('artist_invites')
    .insert({ email: email || null, name: name || null, created_by: user.id })
    .select('token')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const baseUrl = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || ''
  return NextResponse.json({ url: `${baseUrl}/portal/invite/${invite.token}` })
}
