import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'jayzelisaac@gmail.com').split(',').map(e => e.trim().toLowerCase())

async function isAuthorized(request: Request): Promise<boolean> {
  const authHeader = request.headers.get('authorization')
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (serviceKey && authHeader === `Bearer ${serviceKey}`) return true

  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user && ADMIN_EMAILS.includes(user.email?.toLowerCase() || '')) return true
  } catch {
    // cookie auth not available
  }

  return false
}

export async function POST(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { action } = body

  const supabase = createAdminClient()

  if (action === 'create_artist') {
    const { email, password, full_legal_name, stage_name } = body

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: full_legal_name },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (stage_name && authData.user) {
      await supabase
        .from('artists')
        .update({ stage_name })
        .eq('id', authData.user.id)
    }

    return NextResponse.json({ user: authData.user })
  }

  if (action === 'create_contract') {
    const { artist_id, effective_date, status } = body

    const { data, error } = await supabase
      .from('contracts')
      .insert({
        artist_id,
        version: '2.3',
        status: status || 'sent',
        effective_date: effective_date || new Date().toISOString().split('T')[0],
        sent_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ contract: data })
  }

  if (action === 'review_kyc') {
    const { kyc_id, decision, rejection_reason } = body

    const updateData: Record<string, unknown> = {
      status: decision === 'approve' ? 'approved' : 'rejected',
      reviewed_at: new Date().toISOString(),
    }

    if (decision === 'reject' && rejection_reason) {
      updateData.rejection_reason = rejection_reason
    }

    const { error } = await supabase
      .from('kyc_verifications')
      .update(updateData)
      .eq('id', kyc_id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  }

  if (action === 'list_artists') {
    const { data, error } = await supabase
      .from('artists')
      .select('id, full_legal_name, stage_name, email, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ artists: data })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
