import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { Suspense } from "react"
import Loading from "./dashboard/loading"
import HomePage from "./components/Content/Home/HomePage"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import Link from "next/link"
import LogoutButton from "./components/Content/Home/LogoutButton"

export const dynamic = 'force-dynamic';

async function GetProfile(supabase, id) {
	const { data } = await supabase.from('profiles').select('*').eq('id', id);

	return data[0];
}

export default async function Page() {
	const supabase = createServerComponentClient({ cookies })
	const { data: { user } } = await supabase.auth.getUser();

	let profile;

	if (user) {
		profile = await GetProfile(supabase, user.id);
	}
	
	return (
		<Flex w="full" h="100vh" bg="#1c1c1c">

			<Flex w={["0", "0", "0", "50%", "70%"]} display={["none", "none", "none", "flex"]} h="100%" justifyContent="center" alignItems="center">
				<Heading fontSize="6xl" color="green.500" as="h1">See Through</Heading>

				<Text fontSize="xs" color="whiteAlpha.700" position="absolute" bottom="5">© 2023, Uplift <Text as="span" mx="3">•</Text> Privacy <Text as="span" mx="3">•</Text> Terms <Text as="span" mx="3">•</Text> Support</Text>
			</Flex>
			<Flex flexDirection="column" px="14" w={["100%", "100%", "100%", "50%", "30%"]} h="100%" justifyContent="center" alignItems="center" bg="#1e1e1e">
				<Heading display={["inline-block", "inline-block", "inline-block", "none"]} position="absolute" top="10" fontSize="3xl" color="green.500" as="h1">See Through</Heading>
				<Suspense fallback={<Loading />}>
					{user ? 
						<>
							<Box w="full">
								<Text color="whiteAlpha.700">Welcome back, {profile.first_name}!</Text>

								<Link href={profile.role === "agent" ? '/dashboard' : '/public'}>
									<Button variant="solid" size="sm" w="full" mt="5" bg="green.500" colorScheme="green" borderWidth="thin" borderColor="green.400">Continue To Dashboard</Button>
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

					<Text display={["inline-block", "inline-block", "inline-block", "none"]} fontSize="xs" color="whiteAlpha.700" position="absolute" bottom="5">© 2023, Uplift   <Text as="span" mx="3">•</Text> About Us <Text as="span" mx="3">•</Text> Support <Text as="span" mx="3">•</Text> Forgot Password?</Text>
				</Suspense>
			</Flex>

			
			
		</Flex>
	)
}