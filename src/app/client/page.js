import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function Page() {
    const supabase = createServerComponentClient({ cookies });

    const { data: auth } = await supabase.auth.getUser();

    const { data: transactions, error } = await supabase.from('transactions').select("*").contains('assigned_clients', [auth.user.id])


    // const { data: transactions, error } = await supabase.from('transactions')

    return (
        <>

        </>
    )
}