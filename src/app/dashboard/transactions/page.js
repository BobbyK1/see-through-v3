import { prisma } from "@/app/Prisma";
import TransactionsPage from "@/app/components/Content/Transactions/TransactionsPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

async function GetTransactions(uid) {
    const transactions = await prisma.transactions.findMany({ 
        where: {
            user_id: uid,
        }
    })

    return transactions;
}

export default async function Page() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
        redirect('/')
    }

    const transactions = await GetTransactions(data.user.id);

    return (
        <TransactionsPage transactions={transactions} />
    )
}