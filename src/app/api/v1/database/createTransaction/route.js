import { prisma } from '@/app/Prisma';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server'
import { cookies, headers } from 'next/headers';

export const dynamic = 'force-dynamic'

export async function POST(request) {
    const body = await request.json();
    const supabase = createServerComponentClient({ cookies });
    const { data: user } = await supabase.auth.getUser();
    const id = user.user.id;

    console.log(request.ip)

    try {
        const { data, error } = await supabase
            .from('transactions')
            .insert([
                {
                    address: body.address,
                    mls_id: body.mlsId,
                    price: body.price,
                    listing_agent: body.listingAgent,
                    co_listing_agent: body.coListingAgent,
                    user_id: id,
                    status: "active"
                }   
            ])
            .select("id");

        if (error) throw new Error(error);

        return NextResponse.json({ id: data[0].id })
    } catch (error) {
        const errorMessage = 'An error occurred while creating the transaction.';
        const errorResponse = { error: errorMessage };

        return NextResponse.json(errorResponse, { status: 500 });
    }
}