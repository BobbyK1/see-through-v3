// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import algoliasearch from "algoliasearch";

// export const dynamic = 'force-dynamic';

// export async function POST({ request }) {
//     try {
//         const cookieStore = cookies();
//         const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
//         const body = await request.json();

//         console.log("accessed");

//         const { data: session } = await supabase.auth.getSession();

//         if (!session) {
//             return NextResponse.error('Authentication required!');
//         }

//         const { data: user } = await supabase.auth.getUser();

//         const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);
//         const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME);

//         const record = {
//             objectID: body.id,
//             address: body.address,
//             mls_id: body.mls_id,
//             listing_agent: body.listing_agent,
//             user_id: user.id,
//             status: body.status
//         }

//         const data = await index.saveObject(record, {
//             autoGenerateObjectIDIfNotExist: true,
//         });

//         console.log(data);

//         if (data.objectID) {
//             return NextResponse.json({ success: true });
//         } else {
//             return NextResponse.error('Failed to save object to Algolia');
//         }
//     } catch (error) {
//         console.error(error);
//         return NextResponse.error(error);
//     }
// }


import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import algoliasearch from 'algoliasearch';

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

    const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY)
    const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME);

    const record = {
        objectID: body.id,
        status: body.status,
        address: body.address,
        mls_id: body.mls_id,
        listing_agent: body.listing_agent,
        owner_id: id,
    }

    index.saveObject(record, {
        autoGenerateObjectIDIfNotExist: true,
    })
    .then(() => {
        return NextResponse.json({ success: true })
    })
    .catch(error => {
        NextResponse.error(error);
        throw new Error(error);
    })

    return NextResponse.json({ success: true });
}