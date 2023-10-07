import Account from "@/app/components/Content/Settings/Account";
import protectPage from "@/app/utils/protectPage";

export const dynamic = 'force-dynamic'

export default async function Page() {
    await protectPage();
    
    return (
        <Account />
    )
}