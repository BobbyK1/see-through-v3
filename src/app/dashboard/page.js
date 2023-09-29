import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import DashboardContent from "../components/Content/Dashboard/DashboardPage";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { prisma } from "../Prisma";
const { PrismaClient } = require("@prisma/client");

export const dynamic = 'force-dynamic';

async function GetProfile(id) {
    const profile = await prisma.profiles.findUnique({ 
        where: { 
            id: id 
        },
        select: {
            id: true,
            first_name: true,
        }
    })

    return profile;
}

async function GetActiveTransactions(id) {
    const activeTransactionCount = await prisma.transactions.count({
        where: {
            user_id: id,
            status: "active"
        }
    })

    return activeTransactionCount;
}

export default async function Page() {
    const supabase = createServerComponentClient({ cookies });
    const { data: activeSession } = await supabase.auth.getSession();

    if (!activeSession.session) {
        return redirect('/')
    }

    const { data } = await supabase.auth.getUser();

    const profile = await GetProfile(data.user.id);
    const activeTransactionCount = await GetActiveTransactions(data.user.id)

    return (
        <DashboardContent data={profile} activeTransactionCount={activeTransactionCount} />
    )
}