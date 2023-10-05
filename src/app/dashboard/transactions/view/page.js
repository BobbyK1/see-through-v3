import { redirect } from "next/navigation";


export default function Page() {
    return redirect('/dashboard/transactions/active');
}