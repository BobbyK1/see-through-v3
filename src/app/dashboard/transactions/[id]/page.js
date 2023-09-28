import ViewTransaction from "@/app/components/Content/Transactions/ViewTransaction";
import { PrismaClient } from "@prisma/client";
import {  } from "next/navigation"

async function getTransaction(id) {
    const prisma = new PrismaClient();

    const transaction = prisma.transactions.findUnique({ where: { id: id } });

    return transaction;
}

export default async function Page({ params }) {
    const query = await params;
    const transaction = await getTransaction(query.id);

    console.log(transaction)

    return (
        <ViewTransaction data={transaction} />
    )
}