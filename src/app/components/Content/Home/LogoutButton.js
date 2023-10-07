'use client'

import { useSupabase } from "@/app/context/SupabaseProvider"
import { Button } from "@chakra-ui/react";

export default function LogoutButton() {
    const { signOut, authLoading } = useSupabase();

    return (
        <Button isLoading={authLoading} onClick={signOut} variant="solid" size="sm" w="full" bg="whiteAlpha.100" colorScheme="gray" borderWidth="thin">Log Out</Button>
    )
}