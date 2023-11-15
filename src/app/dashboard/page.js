import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
import { Box, Button, Flex, Grid, GridItem, Select, SimpleGrid, Stack, Text, Tooltip } from "@chakra-ui/react";
import Card from "../components/UI/Card";
import Link from "next/link";
import { ClearSideContent } from "../utils/ClearSideContent";
import { DueDate, Task } from "../components/UI/Icons";
import Tasks from "../components/Content/Dashboard/Tasks";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Dashboard - See Through"
}

async function GetName(id, supabase) {
    const { data: profile, error } = await supabase.from('profiles').select("first_name").eq('id', id);

    if (error) throw new Error(error.message);

    return profile[0];
}

async function GetActiveTransactionsCount(id, supabase) {
    const { data, count, error } = await supabase
        .from('transactions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', id)

    if (error) throw new Error(error.message);

    return count;
}

export default async function Page({  }) {
    const supabase = createServerComponentClient({ cookies });

    const { data } = await supabase.auth.getUser();

    const profile = await GetName(data.user.id, supabase);
    const activeTransactionCount = await GetActiveTransactionsCount(data.user.id, supabase)

    return (
        <>
            <ClearSideContent />
            
            <Box maxW="full" px="10">
                <Grid templateColumns="repeat(12, 1fr)" gap="5">
                    <GridItem colSpan={[12, 12, 12, 12, 8]}>
                        <Stats firstName={profile.first_name} activeTransactionCount={activeTransactionCount} />
                    </GridItem>

                    <GridItem colSpan={[12, 12, 12, 12, 4]}>
                        <Card h="full" p="10">
                            <Tasks />
                        </Card>
                    </GridItem>
                </Grid>
            </Box>
        </>
    )
}

const Stats = ({ firstName, activeTransactionCount }) => {
	return (
		<Card p="10" h="full">
			<Stack direction="row" justify="space-between">
				<Box>
					<Text fontSize="lg" fontWeight="bold" color="whiteAlpha.700">Welcome back, {firstName}.</Text>
					<Text fontSize="sm" color="whiteAlpha.600">See what's going on today.</Text>
				</Box>
			</Stack>

			<SimpleGrid columns={[1, 2, 2, 4]} mt="20" spacing="3">
				<Box p="5" h="fit-content" borderColor="#2e2e2e" borderWidth="thin" borderRadius="5">
					<Text fontSize="md" color="whiteAlpha.700" textAlign="center">Active Transactions</Text>
					<Text fontSize="2xl" my="3" color="whiteAlpha.800" textAlign="center">{activeTransactionCount}</Text>
					<Box mx="auto" w="fit-content">
						<Link href="/dashboard/transactions">
							<Button size="xs" variant="ghost" color="whiteAlpha.800">View All</Button>
						</Link>
					</Box>
				</Box>

				<Box p="5" borderColor="#2e2e2e" borderWidth="thin" borderRadius="5">
					<Text fontSize="md" color="whiteAlpha.700" textAlign="center">New Offers</Text>
					<Text fontSize="2xl" my="3" color="whiteAlpha.800" textAlign="center">0</Text>
					<Box mx="auto" w="fit-content">
						<Button size="xs" variant="ghost" color="whiteAlpha.800">View All</Button>
					</Box>
				</Box>

				<Box p="5" borderColor="#2e2e2e" borderWidth="thin" borderRadius="5">
					<Text fontSize="md" color="whiteAlpha.700" textAlign="center">Active Transactions</Text>
					<Text fontSize="2xl" my="3" color="whiteAlpha.800" textAlign="center">0</Text>
					<Box mx="auto" w="fit-content">
						<Button size="xs" variant="ghost" color="whiteAlpha.800">View All</Button>
					</Box>
				</Box>

				<Box p="5" borderColor="#2e2e2e" borderWidth="thin" borderRadius="5">
					<Text fontSize="md" color="whiteAlpha.700" textAlign="center">Active Transactions</Text>
					<Text fontSize="2xl" my="3" color="whiteAlpha.800" textAlign="center">0</Text>
					<Box mx="auto" w="fit-content">
						<Button size="xs" variant="ghost" color="whiteAlpha.800">View All</Button>
					</Box>
				</Box>
			</SimpleGrid>
		</Card>
	)
}