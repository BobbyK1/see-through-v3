import protectPage from "@/app/utils/protectPage"

export const dynamic = 'force-dynamic'

export default async function Page({ params }) {
    await protectPage();

    return (
        <>Nothing yet...</>
    )
}