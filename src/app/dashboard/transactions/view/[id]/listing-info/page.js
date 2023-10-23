import ListingInfo from "@/app/components/Content/Transactions/Tabs/LisingInfo";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

async function GetTransaction(query, supabase) {
    let { data: transactions, error } = await supabase.from('transactions').select('*').eq('id', query); 

    if (error) throw new Error(`Error Code For Support: ${error.code}`);

    return transactions;
}

async function GetTasks(query, supabase) {
    const { data: tasks, error} = await supabase.from('tasks').select("*").eq('transaction_id', query);
    if (error) throw new Error(error.message);

    return tasks
}

export default async function Page({ params }) {
    const supabase = createServerComponentClient({ cookies });
    const query = await params;

    const transaction = await GetTransaction(query.id, supabase);

    const tasks = await GetTasks(query.id, supabase);
    
    return <ListingInfo data={transaction[0]} tasks={tasks} />
}