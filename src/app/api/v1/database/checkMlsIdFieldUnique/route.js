import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

/**
 * Handle MLS ID uniqueness verification
 *
 * @param {Request} request - The HTTP request object.
 * @returns {Response} - A JSON response indicating whether a record with a specific 'mls_id' exists in the 'transactions' table.
 */

export async function POST(request) {
    const body = await request.json();
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
        return NextResponse.error('Authentication required!')
    }

    const { data, error } = await supabase.from('transactions').select('mls_id').eq('mls_id', body.mlsId);

    if (error) {
        NextResponse.error(error.message);
        throw new Error(error.message);
    }

    if (data.length === 0) {
        return NextResponse.json({
            unique: true
        })
    } else {
        return NextResponse.json({
            unique: false
        })
    }
    
}