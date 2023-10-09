import Account from "@/app/components/Content/Settings/Account";
import protectPage from "@/app/utils/protectPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'

async function GetAccount(supabase, id) {
    const { data: profiles, error } = await supabase.from('profiles').select('*').eq('id', id);

    if (error) throw new Error(error);

    return profiles;
}

export default async function Page() {
    await protectPage();

    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    const account = await GetAccount(supabase, user.id);
    
    return (
        <Account account={account} />
    )
}