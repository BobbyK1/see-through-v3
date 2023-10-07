'use client'

import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function HomePage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const signIn = async () => {
		setLoading(true);

		await fetch('/api/v1/auth/login', {
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password
			})
		}).then(() => {
            router.refresh();
            router.push('/dashboard');
        })
        .catch(error => {
            console.log(error)
        })

		setLoading(false);
	}


    return (
        <>
            <Box w="full">
                <Text color="whiteAlpha.700">Sign In</Text>
                <FormControl mt="5">
                    <FormLabel>Email</FormLabel>
                    <Input onChange={(e) => setEmail(e.target.value)} />
                </FormControl>

                <FormControl mt="5">
                    <FormLabel>Password</FormLabel>
                    <Input onChange={(e) => setPassword(e.target.value)} type="password" />
                </FormControl>

                <Button isDisabled={password.length === 0} isLoading={loading} onClick={signIn} variant="solid" size="sm" w="full" mt="5" bg="green.500" colorScheme="green" borderWidth="thin" borderColor="green.400" color="whiteAlpha.800">Sign In</Button>

                <Box h="0.5" borderColor="whiteAlpha.500" borderWidth="thin" w="full" my="7">
                    <Text mt="-3.5" p="0.5" px="2" mx="auto" bgColor="#1e1e1e" w="fit-content" color="whiteAlpha.700">Or</Text>
                </Box>

                <Button variant="solid" size="sm" w="full" bg="whiteAlpha.100" colorScheme="gray" borderWidth="thin" color="whiteAlpha.800">Create Account</Button>
            </Box>
            <Text fontSize="xs" color="whiteAlpha.700" position="absolute" bottom="5">Copyright Uplift 2023</Text>
        </>
    )
}