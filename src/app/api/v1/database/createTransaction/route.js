import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server'
import { cookies, headers } from 'next/headers';

export const dynamic = 'force-dynamic'

/**
 * Handle HTTP POST requests to create a new transaction in the 'transactions' table.
 *
 * @param {Request} request - The HTTP request object.
 * @returns {Response} - A JSON response indicating the ID of the newly created transaction or an error response.
 */

export async function POST(request) {
    const body = await request.json();
    const supabase = createServerComponentClient({ cookies });

    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
        return NextResponse.error('Authentication required!')
    }

    const { data: user } = await supabase.auth.getUser();
    const id = user.user.id;

    const { data, error } = await supabase.from('transactions').insert([
        {
            address: body.address,
            mls_id: body.mlsId,
            price: body.price,
            listing_agent: body.listingAgent,
            co_listing_agent: body.coListingAgent,
            user_id: id,
            status: "active"
        }
    ]).select('id');

    if (error) {
        NextResponse.error(error.message);
        throw new Error(error.message);
    }

    return NextResponse.json({ id: data[0].id });
}