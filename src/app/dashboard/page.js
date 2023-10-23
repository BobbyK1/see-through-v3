import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import DashboardContent from "../components/Content/Dashboard/DashboardPage";
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Dashboard - See Through"
}

async function GetName(id, supabase) {
    const { data: profile, error } = await supabase.from('profiles').select("first_name").eq('id', id);

    if (error) throw new Error(error.message);

    return profile[0];
}

async function GetActiveTransactionsCount(id, supabase) {
    const { data, count, error } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })
        .filter('user_id', "eq", id)

    if (error) throw new Error(error.message);

    return count;
}

async function GetTodayTask(id, supabase) {
    const { data: tasks, error } = await supabase.from('tasks').select('transaction_id,title,due_date').eq('user_id', id).eq('due_date', new Date().toISOString().split('T')[0]);

    if (error) throw new Error(error.message);

    return tasks;
}

export default async function Page({  }) {
    const supabase = createServerComponentClient({ cookies });

    const { data } = await supabase.auth.getUser();

    const profile = await GetName(data.user.id, supabase);
    const activeTransactionCount = await GetActiveTransactionsCount(data.user.id, supabase)
    const todayTasks = await GetTodayTask(data.user.id, supabase);

    return (
        <DashboardContent data={profile} activeTransactionCount={activeTransactionCount} todayTasks={todayTasks} />
    )
}