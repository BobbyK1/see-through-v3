import { redirect } from "next/navigation"

export default async function Page({ params }) {
    return redirect(`/dashboard/transactions/view/${await params.id}/listing-info`);
}