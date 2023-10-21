import Profile from "@/app/components/Content/Settings/Profile";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function GetProfile(supabase, id) {
    const { data: profile, error } = await supabase.from('profiles').select("*").eq("id", id)

    if (error) throw new Error(`Error Code For Support: ${error.code}`);

    return profile[0];
}

export default async function Page() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getUser();

    const profile = await GetProfile(supabase, data.user.id)

    return (
        <Profile profile={profile} />
    )
}