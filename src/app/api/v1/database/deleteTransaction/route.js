import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'

/**
 * Handle HTTP POST requests to delete a transaction in the 'transactions' table.
 *
 * @param {Request} request - The HTTP request object.
 * @returns {Response} - A JSON response indicating the ID of the deleted transaction or an error response.
 */

export async function POST(request) {
    const body = await request.json();
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase.from('transactions').delete().eq('id', body.id);

    if (error) throw new Error(error.message);

    return NextResponse.json({
        id: data.id
    })
}