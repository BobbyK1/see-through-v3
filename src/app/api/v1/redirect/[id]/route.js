import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    const requestUrl = new URL(request.url);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
        const redirectUrl = `${requestUrl.origin}/dashboard/transactions/${params.id}`;
        resolve(NextResponse.redirect(redirectUrl));
        }, 1500); // 2.5 seconds in milliseconds
    });
}