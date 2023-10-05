import Users from "@/app/components/Content/Settings/Users";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Page(request) {
    const supabase = createServerComponentClient({ cookies });

    return (
        <Users />
    )
}