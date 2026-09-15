import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: birthDetails } = await supabase
          .from('user_birth_details')
          .select('id')
          .eq('user_id', user.id)
          .single()

        if (birthDetails) {
          return NextResponse.redirect(new URL('/consultation', requestUrl.origin))
        }
      }

      return NextResponse.redirect(new URL('/intake', requestUrl.origin))
    }
  }

  return NextResponse.redirect(new URL('/login', requestUrl.origin))
}
