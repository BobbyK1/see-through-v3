'use client'

import { useSideContent } from "@/app/context/useSideContent";
import { useEffect } from "react";
import Search from "../../UI/Search";


export default function SubmissionPage() {
    const { updateTitle, updateContent } = useSideContent();

    useEffect(() => {
        updateContent(<SidebarContent />)
        updateTitle("Submit Offer")
    }, [])

    return (
        <></>
    )
}

const SidebarContent = () => {

    return (
        <>
            <Search />
        </>
    )
}