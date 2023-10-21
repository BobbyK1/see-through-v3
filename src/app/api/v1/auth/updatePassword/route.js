import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  const requestUrl = new URL(request.url)
  const body = request.json();
  const supabase = createRouteHandlerClient({ cookies })

    const { data, error } = await supabase.auth.updateUser({
        password: body.password
    })

    if (error) {
        NextResponse.error(error);
        throw new Error(error);
    }

    return NextResponse.json(data)
}