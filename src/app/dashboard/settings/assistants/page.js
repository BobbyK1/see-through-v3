import Users from "@/app/components/Content/Settings/Users";
import protectPage from "@/app/utils/protectPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic'

export default async function Page(request) {
    await protectPage();

    const supabase = createServerComponentClient({ cookies });

    return (
        <Users />
    )
}