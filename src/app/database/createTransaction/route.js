import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request) {
    const body = await request.json();
    const prisma = new PrismaClient();

    try {
        const createdTransaction = await prisma.transactions.create({
            data: {
                address: body.address,
                mls_id: body.mlsId,
                price: body.price,
                listing_agent: body.listingAgent,
                co_listing_agent: body.coListingAgent,
                user_id: body.userId
            }
        })

        return NextResponse.json({ id: createdTransaction.id })
    } catch (error) {
        const errorMessage = 'An error occurred while creating the transaction.';
        const errorResponse = { error: errorMessage };

        return NextResponse.json(errorResponse, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}