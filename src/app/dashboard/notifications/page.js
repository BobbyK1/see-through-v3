import NotificationPage from "@/app/components/Content/Notifications/NotificationPage";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic'

export default async function Page() {
     
    
    const supabase = createServerComponentClient({ cookies });
    const { data: activeSession } = await supabase.auth.getSession();

    if (!activeSession.session) {
        return redirect('/', "push");
    }

    return <NotificationPage />
}