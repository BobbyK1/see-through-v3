'use client'

import { Alert, AlertIcon, Box, Button, Input, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { useAuthContext } from "@/app/context/AuthContextProvider";

export default function HomePage() {
    const [email, setEmail] = useState('');
    const { signIn, authLoading, linkSent } = useAuthContext();



    return (
        <Box w="full" h="100vh" bgColor={useColorModeValue("#f8f9fa", "#1c1c1c")}>
            <Box w="fit-content" mx="auto">
                <Input onChange={(e) => setEmail(e.target.value)} mt="10" size="md" bg={useColorModeValue("blackAlpha.50", "#2a2929")} w="full"  borderColor={useColorModeValue("blackAlpha.400", "#3e3e3e")} placeholder="Get magic link with email" _placeholder={{ color: useColorModeValue("blackAlpha.700", "whiteAlpha.700")}} />
                
                <Button isLoading={authLoading} onClick={() => signIn(email)} mt="5" w="full">Login</Button>
                {linkSent && <Alert status="success" mt="3" borderRadius="5"><AlertIcon /> A login link has been sent to your inbox!</Alert>}
            </Box>
        </Box>
    )
}