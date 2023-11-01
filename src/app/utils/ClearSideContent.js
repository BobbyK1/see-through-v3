'use client'

import { useEffect } from "react"
import { useSideContent } from "../context/useSideContent"

export const ClearSideContent = () => {
    const { clearSideContent } = useSideContent();

    useEffect(() => {
        return clearSideContent();
    }, [])
}