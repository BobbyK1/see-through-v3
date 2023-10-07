import SubmissionPage from "@/app/components/Content/Submit/SubmissionPage";
import protectPage from "@/app/utils/protectPage";

export const dynamic = 'force-dynamic'

export default async function Page() {
    await protectPage();

    return <SubmissionPage />
}