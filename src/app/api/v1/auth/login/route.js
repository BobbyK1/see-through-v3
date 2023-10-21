import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request) {
	const body = await request.json()
	const email = body.email;
	const password = body.password;
	const cookieStore = cookies();
	const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
	
	const { data: { user, error } } = await supabase.auth.signInWithPassword({
		email: email,
		password: password
	})

	if (error) {
		NextResponse.error(error);
		throw new Error(error);
	}

	
	let { data: profiles, errorTwo } = await supabase.from('profiles').select('role').eq('id', user.id);

	if (errorTwo) {
		NextResponse.error(errorTwo);
		throw new Error(errorTwo);
	}

	return NextResponse.json({
		role: profiles[0].role
	})
}