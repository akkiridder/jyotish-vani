import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://igtckiwrualjebqocqne.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_1y6w8GLFDcQu9OMsGV__og_LgVA-5wR'

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
