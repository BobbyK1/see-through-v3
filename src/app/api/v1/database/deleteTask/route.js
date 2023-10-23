import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'

/**
 * Handle HTTP POST requests to delete a task in the 'tasks' table.
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

    const { data, error } = await supabase.from('tasks').delete().eq('id', body.id)

    if (error) {
        NextResponse.error(error.message);
        throw new Error(error.message);
    }

    return NextResponse.json({ success: true });
}