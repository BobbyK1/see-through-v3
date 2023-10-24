import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'

/**
 * Handle HTTP POST requests to create a new offer in the 'offers' table and bucket.
 *
 * @param {Request} request - The HTTP request object.
 * @returns {Response} - A JSON response indicating the ID of the newly created transaction or an error response.
 */

export async function POST(request) {
    const supabase = createServerComponentClient({ cookies });

    // Check if request is authenticated
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) {
        return NextResponse.error('Authentication required!')
    }

    const { data: user } = await supabase.auth.getUser();
    const id = user.user.id;

    // Set up form data
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
        return NextResponse.json({ success: false });
    }

    // Upload pdf
    const { data: data, error } = await supabase.storage.from('offers').upload(`${formData.get('id')}/${id}/${file.name}`, file, {
        cacheControl: 3600,
        upsert: true
    })

    if (error) {
        NextResponse.error(error.message);
        throw new Error(error.message);
    }

    // Create 'offers' table row
    const { data: offer, offerTableError } = await supabase.from('offers').insert([
        {
            user_id: id,
            transaction_id: formData.get('id'),
            offer_url: data.path
        }
    ])

    if (offerTableError) {
        NextResponse.error(error.message);
        throw new Error(error.message);
    }    

    return NextResponse.json({ success: true });
}