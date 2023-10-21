import { prisma } from '@/app/Prisma';
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Handle HTTP POST requests to delete a transaction in the 'transactions' table.
 *
 * @param {Request} request - The HTTP request object.
 * @returns {Response} - A JSON response indicating the ID of the deleted transaction or an error response.
 */

export async function POST(request) {
    const body = await request.json();

    try {
        const createdTransaction = await prisma.transactions.delete({ where: { id: body.id }});

        return NextResponse.json({ id: createdTransaction.id })
    } catch (error) {
        const errorMessage = 'An error occurred while deleting the transaction.';
        const errorResponse = { error: errorMessage };

        return NextResponse.json(errorResponse, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}