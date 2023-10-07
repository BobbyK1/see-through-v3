import protectPage from "@/app/utils/protectPage";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function Page() {
    await protectPage();

    return redirect('/dashboard/transactions/active');
}