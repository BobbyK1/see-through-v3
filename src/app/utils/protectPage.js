import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function protectPage() {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return redirect('/');
    }

    let { data: profiles, error } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();

    if (error) {
        throw new Error(error.message)
    }

    if (profiles.role !== "agent") {
        redirect('/')
    }

    return;
}