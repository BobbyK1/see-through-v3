'use client'

import { redirect } from "next/navigation";
import { useEffect } from "react";


export default function Page() {

    useEffect(() => {
        return redirect('/dashboard/settings/account');
    }, [])
}