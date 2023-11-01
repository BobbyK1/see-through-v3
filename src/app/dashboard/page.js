import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"
import { Box, Button, Flex, Grid, GridItem, Select, SimpleGrid, Stack, Text, Tooltip } from "@chakra-ui/react";
import Card from "../components/UI/Card";
import Link from "next/link";
import { ClearSideContent } from "../utils/ClearSideContent";
import { DueDate, Task } from "../components/UI/Icons";

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

async function GetTodayTask(id, supabase) {
    const { data: tasks, error } = await supabase.from('tasks').select('transaction_id,title,due_date').eq('user_id', id);

    if (error) throw new Error(error.message);
	console.log(tasks)
    return tasks;
}

export default async function Page({  }) {
    const supabase = createServerComponentClient({ cookies });

    const { data } = await supabase.auth.getUser();

    const profile = await GetName(data.user.id, supabase);
    const activeTransactionCount = await GetActiveTransactionsCount(data.user.id, supabase)
    const todayTasks = await GetTodayTask(data.user.id, supabase);

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
                            <Tasks todayTasks={todayTasks} />
                        </Card>
                    </GridItem>
                </Grid>
            </Box>
        </>
    )
}

const Tasks = ({ todayTasks }) => {

	return (
		<>
			<Stack direction="row" justify="space-between" alignItems="center">
				<Text fontSize="lg" fontWeight="bold" color="whiteAlpha.700">Tasks</Text>

				<Select defaultValue="today" w="fit-content" size="sm">
					<option value="today">Today</option>
					<option value="upcoming">Upcoming</option>
					<option value="overdue">Overdue</option>
				</Select>
			</Stack>
			

			<Box borderRadius="5" borderWidth="thin" borderColor="#2e2e2e" mt="5" p="2" h="275" overflowX="auto">
				{todayTasks.length === 0 ?
					<Box w="fit-content" mx="auto" mt="10">
						<Text fontSize="md" color="whiteAlpha.700">No tasks yet...</Text>
					</Box>
				: todayTasks
					.slice() // Create a copy of the tasks array to avoid mutating the original
					.sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
					.map(task => {
						const formattedDueDate = new Date(task.due_date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
						});
						return (
								<Grid key={task.id} templateColumns="repeat(12, 1fr)" bg="#2e2e2e" minH="14" mb="1.5" borderRadius="5" w="full" p="4" shadow="sm" alignItems="center">
									<GridItem colSpan="4">
										<Flex alignItems="center" direction="row">
											<Task />
											<Tooltip label={task.title}>
												<Text ml="5" noOfLines="1" color="whiteAlpha.800">{task.title}</Text>
											</Tooltip>
										</Flex>
									</GridItem>
									<GridItem colSpan="4">
										<Flex alignItems="center" direction="row">
											<DueDate />
											<Text ml="5" color="whiteAlpha.700">{formattedDueDate}</Text>
										</Flex>
									</GridItem>
									<GridItem colSpan="4" display="flex" justifyContent="flex-end" alignItems="center">
										<Link href={`/dashboard/transactions/view/${task.transaction_id}/listing-info`}>
											<Button variant="ghost" _hover={{ color: "whiteAlpha.800" }} color="whiteAlpha.700" size="sm">View</Button>
										</Link>
									</GridItem>
								</Grid>
							)
						})}
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