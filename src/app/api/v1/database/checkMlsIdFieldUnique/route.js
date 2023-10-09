import { prisma } from "@/app/Prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    const body = await request.json();
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase.from('transactions').select('mls_id').eq('mls_id', body.mlsId);

    if (error) {
        NextResponse.error(error.message);
        throw new Error(error.message);
    }

    if (data.length === 0) {
        return NextResponse.json({
            unique: true
        })
    } else {
        return NextResponse.json({
            unique: false
        })
    }
    
}