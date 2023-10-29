'use client'

import { Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import Card from "../../UI/Card";
import { useEffect, useState } from "react";

const SignIn = () => {
    const [url, setUrl] = useState('');

    useEffect(() => {
        return setUrl(encodeURIComponent(window.location.href));
    }, [])

    return (
        <Card display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt="10" p="10">
            <Text color="whiteAlpha.800" fontSize="lg">Please sign in to view this transaction</Text>

            <Link href={`/?continue=${url}`}>
                <Button w="fit-content" mt="5" variant="solid" size="sm" bg="green.500" colorScheme="green" borderWidth="thin" color="whiteAlpha.800">Sign In</Button>
            </Link>
        </Card>
    )
}

export default SignIn;