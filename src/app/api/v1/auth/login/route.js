import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request) {
	const requestUrl = new URL(request.url)
	const body = await request.json()
	const email = body.email;
	const password = body.password;
	const cookieStore = cookies();
	const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

	console.log(requestUrl)

	
	const { data, error} = await supabase.auth.signInWithPassword({
		email: email,
		password: password
	})

	if (error) {
		NextResponse.error(error);
		throw new Error(error);
	}

	return NextResponse.redirect(`${process.env.URL}/dashboard`)
}