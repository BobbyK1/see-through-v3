import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, useToast } from "@chakra-ui/react"
import { Suspense } from "react"
import { redirect } from "next/navigation"
import Loading from "./dashboard/loading"
import HomePage from "./components/Content/Home/HomePage"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import Link from "next/link"

export const dynamic = 'force-dynamic';

export default async function Page() {
	const supabase = createServerComponentClient({ cookies })
	const { data: { user } } = await supabase.auth.getUser();

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
								<Text color="whiteAlpha.700">You're signed in!</Text>
								<Link href="/dashboard">
									<Button  variant="solid" size="sm" w="full" mt="5" bg="green.500" colorScheme="green" borderWidth="thin" borderColor="green.400" color="whiteAlpha.800">Continue to dashboard</Button>
								</Link>
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