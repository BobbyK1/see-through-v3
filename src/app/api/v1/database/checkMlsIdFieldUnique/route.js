import { prisma } from "@/app/Prisma";
import { NextResponse } from "next/server";


export async function POST(request) {
    const body = await request.json();

    try {
        const unique = await prisma.transactions.count({ 
            where: {
                mls_id: body.mlsId
            }
        })

        if (unique === 0) {
            return NextResponse.json({
                unique: true
            })
        } else {
            return NextResponse.json({
                unique: false
            })
        }
    } catch (error) {
        return NextResponse.error(error);
    }
    
}