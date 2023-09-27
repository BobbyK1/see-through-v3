import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import DashboardContent from "../components/Content/Dashboard/DashboardPage";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
const { PrismaClient } = require("@prisma/client");

export const dynamic = 'force-dynamic';

async function GetProfile(id) {
    const prisma = new PrismaClient();

    const profile = prisma.profiles.findUnique({ where: { id: id } })

    return profile;
}

export default async function Page() {
    const supabase = createServerComponentClient({ cookies });
    const { data: activeSession } = await supabase.auth.getSession();

    if (!activeSession.session) {
        return redirect('/')
    }

    const { data } = await supabase.auth.getUser();
    // const profile = await GetProfile(data?.user.id);

    return (
        <DashboardContent data={data.user} />
    )
}