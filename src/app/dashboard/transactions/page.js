import { redirect } from "next/navigation";

export default async function Page() {
    return redirect('/dashboard/transactions/active');
}