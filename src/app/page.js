import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, useToast } from "@chakra-ui/react"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import Loading from "./dashboard/loading"
import HomePage from "./components/Content/Home/HomePage"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import Link from "next/link"
import LogoutButton from "./components/Content/Home/LogoutButton"

export const dynamic = 'force-dynamic';

async function GetName(supabase) {
	const { data } = await supabase.from('profiles').select('full_name');

	return data[0].full_name;
}

export default async function Page() {
	const supabase = createServerComponentClient({ cookies })
	const { data: { user } } = await supabase.auth.getUser();

	const name = await GetName(supabase);

	const SignOut = async () => {
		return await supabase.auth.signOut();
	}

	return (
		<Flex w="full" h="100vh" bg="#1c1c1c">

			<Flex w="70%" h="100%" justifyContent="center" alignItems="center">
				<Heading fontSize="6xl" color="green.500" as="h1">See Through</Heading>
			</Flex>
			<Flex flexDirection="column" px="20" w="30%" h="100%" justifyContent="center" alignItems="center" bg="#1e1e1e">
				<Suspense fallback={<Loading />}>
					{user ? 
						<>
							<Box w="full">
								<Text color="whiteAlpha.700">Welcome back, {name}!</Text>
								<Link href="/dashboard">
									<Button  variant="solid" size="sm" w="full" mt="5" bg="green.500" colorScheme="green" borderWidth="thin" borderColor="green.400">Continue To Dashboard</Button>
								</Link>

								<Box h="0.5" borderColor="whiteAlpha.500" borderWidth="thin" w="full" my="7">
									<Text mt="-3.5" p="0.5" px="2" mx="auto" bgColor="#1e1e1e" w="fit-content" color="whiteAlpha.700">Or</Text>
								</Box>

								<LogoutButton />
							</Box>
						</>
						:
						<>
							<HomePage />
						</>
					}
				</Suspense>
			</Flex>

			
			
		</Flex>
	)
}