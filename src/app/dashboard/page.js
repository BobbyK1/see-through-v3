import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import DashboardContent from "../components/Content/Dashboard/DashboardPage";
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Dashboard - See Through"
}

async function GetProfile(id, supabase) {
    const { data: profile, error } = await supabase.from('profiles').select("*").eq('id', id);

    if (error) throw new Error(`Error Code For Support: ${error.code}`);

    return profile[0];
}

async function GetActiveTransactionsCount(id, supabase) {
    const { data, count, error } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })
        .filter('user_id', "eq", id)

    if (error) throw new Error(`Error Code For Support: ${error.code}`);

    return count;
}

export default async function Page({  }) {
     

    const supabase = createServerComponentClient({ cookies });

    const { data } = await supabase.auth.getUser();

    const profile = await GetProfile(data.user.id, supabase);
    const activeTransactionCount = await GetActiveTransactionsCount(data.user.id, supabase)

    return (
        <DashboardContent data={profile} activeTransactionCount={activeTransactionCount} />
    )
}