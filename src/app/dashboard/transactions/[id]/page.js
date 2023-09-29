import { prisma } from "@/app/Prisma";
import ViewTransaction from "@/app/components/Content/Transactions/ViewTransaction";

export const dynamic = 'force-dynamic';

async function getTransaction(id) {
    const transaction = prisma.transactions.findUnique({ where: { id: id } });

    return transaction;
}

export default async function Page({ params }) {
    const query = await params;
    const transaction = await getTransaction(query.id);

    return (
        <ViewTransaction data={transaction} params={params} />
    )
}