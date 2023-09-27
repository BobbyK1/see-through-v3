import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request) {
    const requestUrl = new URL(request.url)
    const body = await request.json();
    const prisma = new PrismaClient();

    await prisma.transactions.create({
        data: {
            address: body.address,
            mls_id: body.mlsId,
            price: body.price,
            listing_agent: body.listingAgent,
            co_listing_agent: body.coListingAgent,
            user_id: body.userId
        }
    })
    .then((data) => {
        
    })
    .catch(error => {
        return NextResponse.error(error);
    })

    return NextResponse.redirect(`${requestUrl.origin}`)
}