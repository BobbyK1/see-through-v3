import PublicPage from "@/app/components/Content/Public/PublicPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

async function GetTransaction(id, supabase, user) {
    if (user) {
        var { data: transactions, error } = await supabase.from('transactions').select('id,price,address,listing_agent,co_listing_agent,mls_id,status,num_of_offers').eq('id', id);
    } else {
        var { data: transactions, error } = await supabase.from('transactions').select('id,price,address,listing_agent,co_listing_agent,mls_id,status').eq('id', id);
    }
    
    if (error) throw new Error(error.message);

    return transactions[0];
}

export default async function Page({ params }) {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser();
    const transaction = await GetTransaction(params.id, supabase, user);
    
    return <PublicPage data={transaction} />
}