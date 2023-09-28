import TransactionsPage from "@/app/components/Content/Transactions/TransactionsPage";
import { PrismaClient } from "@prisma/client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function GetTransactions(uid) {
    const prisma = new PrismaClient();

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

    const transactions = await GetTransactions(data.user.id);

    return (
        <TransactionsPage transactions={transactions} />
    )
}