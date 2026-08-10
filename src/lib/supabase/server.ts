import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

function sanitize(val: string): string {
  return val.replace(/[^\x20-\x7E]/g, '').trim()
}

export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Missing Supabase environment variables. Copy .env.local.example to .env.local and fill in your project credentials.'
    )
  }

  const cookieStore = await cookies()

  return createServerClient(sanitize(url), sanitize(key), {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Called from Server Component — ignore
        }
      },
    },
  })
}
