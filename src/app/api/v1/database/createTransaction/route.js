import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'

/**
 * Handle HTTP POST requests to create a new transaction in the 'transactions' table.
 *
 * @param {Request} request - The HTTP request object.
 * @returns {Response} - A JSON response indicating the ID of the newly created transaction or an error response.
 */

export async function POST(request) {
    const body = await request.json();
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
        return NextResponse.error('Authentication required!')
    }

    const { data: user } = await supabase.auth.getUser();
    const id = user.user.id;

    const { data, error } = await supabase.from('transactions').insert([
        {
            address: body.address,
            mls_id: body.mls_id,
            price: body.price,
            listing_agent: body.listing_agent,
            co_listing_agent: body.co_listing_agent,
            user_id: id,
            status: body.status,
            listing_approved_by_mls: body.listing_approved_by_mls,
            consent_to_share_offer_amount: body.consent_to_share_offer_amount
        }
    ]).select('id');

    if (error) {
        NextResponse.error(error.message);
        throw new Error(error.message);
    }

    return NextResponse.json({ id: data[0].id });
}