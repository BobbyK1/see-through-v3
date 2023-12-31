'use client'

import { Link } from "@chakra-ui/next-js";
import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react"

export default function HomePage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const params = useSearchParams();

    const signIn = async () => {
		setLoading(true);
        setError('');

		await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/auth/login`, {
			method: "POST",
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
            .then(data => data.json())
            .then(data => {
                router.refresh();

                if (data.success === false) {
                    setLoading(false);
                    return setError('Incorrect email or password.')
                }

                switch(data.role) {
                    case 'agent':
                        if (params.has('continue')) {
                            return router.push(params.get('continue'))
                        } else {
                            return router.push('/dashboard')
                        }
                    case 'guest_agent':
                        if (params.has('continue')) {
                            return router.push(params.get('continue'))
                        } else {
                            return router.push('/public')
                        }
                    case 'client': 
                        if (params.has('continue')) {
                            return router.push(params.get('continue'));
                        } else {
                            return router.push('/client');
                        }
                    default:
                        return;
                }
            })

		setLoading(false);
	}


    return (
        <>
            <Box w="full" maxW="lg">
                <Text color="whiteAlpha.700">Sign In</Text>
                <FormControl mt="5">
                    <FormLabel>Email</FormLabel>
                    <Input borderColor="#3e3e3e" bg="#2e2e2e" color="whiteAlpha.800" onChange={(e) => setEmail(e.target.value)} />
                </FormControl>

                <FormControl mt="5">
                    <FormLabel>Password</FormLabel>
                    <Input borderColor="#3e3e3e" bg="#2e2e2e" color="whiteAlpha.800" onChange={(e) => setPassword(e.target.value)} type="password" />
                </FormControl>

                <Button isDisabled={password.length === 0} isLoading={loading} onClick={signIn} variant="solid" size="sm" w="full" mt="5" bg="green.500" colorScheme="green" borderWidth="thin" borderColor="green.400" color="whiteAlpha.800">Sign In</Button>
                {error && <Alert mt="3" borderRadius="5" status="error"><AlertIcon /> {error}</Alert>}

                <Box h="0.5" borderColor="whiteAlpha.500" borderWidth="thin" w="full" my="7">
                    <Text mt="-3.5" p="0.5" px="2" mx="auto" bgColor="#1e1e1e" w="fit-content" color="whiteAlpha.700">Or</Text>
                </Box>

                <Link href="/create-account">
                    <Button variant="solid" size="sm" w="full" bg="whiteAlpha.100" borderColor="#3e3e3e" colorScheme="white" borderWidth="thin" color="whiteAlpha.800">Create Account</Button>
                </Link>
            </Box>
        </>
    )
}