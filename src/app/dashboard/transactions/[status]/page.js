import TransactionsPage from "@/app/components/Content/Transactions/TransactionsPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    const GetTransactions = async () => {
        let { data: transactions, error } = await supabase.from('transactions').select('*').range(0, 11).filter('status', 'eq', params.status);

        if (error) throw new Error(`Error Code For Support: ${error.code}`);

        return transactions;
    }

    const transactions = await GetTransactions(user.id);

    return (
        <TransactionsPage transactions={transactions} />
    )
}