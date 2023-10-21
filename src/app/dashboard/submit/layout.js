'use client'

import { useSideContent } from "@/app/context/useSideContent"
import { useEffect } from "react";

export default function Layout({ children }) {
    const { clearSideContent } = useSideContent();

    useEffect(() => {
        return clearSideContent();
    }, [])

    return <>{children}</>
}