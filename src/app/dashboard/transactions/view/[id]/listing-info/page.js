import ListingInfo from "@/app/components/Content/Transactions/Tabs/LisingInfo";
import protectPage from "@/app/utils/protectPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

async function GetTransaction(query, supabase) {
    let { data: transactions, error } = await supabase.from('transactions').select('*').eq('id', query); 

    if (error) throw new Error(`Error Code For Support: ${error.code}`);

    return transactions;
}
export default async function Page({ params }) {
    const supabase = createServerComponentClient({ cookies });

    await protectPage();

    const query = await params;

    const transaction = await GetTransaction(query.id, supabase);
    
    return <ListingInfo data={transaction[0]} />
}