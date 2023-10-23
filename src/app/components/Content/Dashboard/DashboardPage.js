'use client'

import { Box, Button, Divider, Fade, Flex, Grid, GridItem, Icon, Select, SimpleGrid, Stack, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import Card from "../../UI/Card";
import { Link } from "@chakra-ui/next-js";
import { useSideContent } from "@/app/context/useSideContent";
import { useEffect } from "react";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";

export default function DashboardContent({ data, activeTransactionCount, todayTasks }) {
	const { clearSideContent } = useSideContent();

	useEffect(() => {
		clearSideContent();
	}, [])

    return (
        <Box maxW="full" px="10">
            <Grid templateColumns="repeat(12, 1fr)" gap="5">
                <GridItem colSpan={[12, 12, 12, 12, 8]}>
                    <Stats firstName={data.first_name} activeTransactionCount={activeTransactionCount} />
                </GridItem>

				

                <GridItem colSpan={[12, 12, 12, 12, 4]}>
                    <Card p="10" h="400">
                        <Tasks todayTasks={todayTasks} />
                    </Card>
                </GridItem>
            </Grid>

            <Grid templateColumns="repeat(12, 1fr)" gap="5" mt="10">
                <GridItem colSpan={[12, 12, 12, 12, 4]}>
                    <Text fontSize="xl" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")}>What's New?</Text>

                    <Divider mt="2" borderColor="#3e3e3e" />
                </GridItem>

                <GridItem colSpan={[12, 12, 12, 12, 4]}>

                </GridItem>

                <GridItem colSpan={[12, 12, 12, 12, 4]}>
                    <Card p="10" h="400">
                        
                    </Card>
                </GridItem>
            </Grid>
        </Box>
    )
}

const Tasks = ({ todayTasks }) => {

	return (
		<>
			<Stack direction="row" justify="space-between" alignItems="center">
				<Text fontSize="lg" fontWeight="bold" color={useColorModeValue("blackAlpha.800", "whiteAlpha.700")}>Tasks</Text>

				<Select defaultValue="today" w="fit-content" size="sm">
					<option value="today">Today</option>
					<option value="upcoming">Upcoming</option>
					<option value="overdue">Overdue</option>
				</Select>
			</Stack>
			

			<Box borderRadius="5" borderWidth="thin" borderColor={useColorModeValue("none", "#2e2e2e")} mt="5" p="2" h="275" overflowX="auto">
				{todayTasks.length === 0 ?
					<Box w="fit-content" mx="auto" mt="10">
						<Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>No tasks yet...</Text>
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
						<Fade in={true}>
							<Grid key={task.id} templateColumns="repeat(12, 1fr)" bg="#2e2e2e" minH="14" mb="1.5" borderRadius="5" w="full" p="4" shadow="sm" alignItems="center">
								<GridItem colSpan="4">
									<Flex alignItems="center" direction="row">
										<Icon as={AiOutlineClockCircle} fontSize="2xl" color="whiteAlpha.800" />
										<Tooltip label={task.title}>
											<Text ml="5" noOfLines="1" color="whiteAlpha.800">{task.title}</Text>
										</Tooltip>
									</Flex>
								</GridItem>
								<GridItem colSpan="4">
									<Flex alignItems="center" direction="row">
										<Icon as={AiOutlineCalendar} fontSize="xl" color="whiteAlpha.700" />
										<Text ml="5" color="whiteAlpha.700">{formattedDueDate}</Text>
									</Flex>
								</GridItem>
								<GridItem colSpan="4" display="flex" justifyContent="flex-end" alignItems="center">
									<Link href={`/dashboard/transactions/view/${task.transaction_id}/listing-info`}>
										<Button variant="ghost" _hover={{ color: "whiteAlpha.800" }} color="whiteAlpha.700" size="sm">View</Button>
									</Link>
								</GridItem>
							</Grid>
						</Fade>
					)
				})}
			</Box>
		</>
	)
}

const Stats = ({ firstName, activeTransactionCount }) => {
	return (
		<Card p="10" h="fit-content">
			<Stack direction="row" justify="space-between">
				<Box>
					<Text fontSize="lg" fontWeight="bold" color={useColorModeValue("blackAlpha.800", "whiteAlpha.700")}>Welcome back, {firstName}.</Text>
					<Text fontSize="sm" color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}>See what's going on today.</Text>
				</Box>
			</Stack>

			<SimpleGrid columns={[1, 2, 2, 4]} mt="20" spacing="3">
				<Box p="5" h="fit-content" borderColor={useColorModeValue("none", "#2e2e2e")} borderWidth="thin" borderRadius="5">
					<Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} textAlign="center">Active Transactions</Text>
					<Text fontSize="2xl" my="3" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")} textAlign="center">{activeTransactionCount}</Text>
					<Box mx="auto" w="fit-content">
						<Link href="/dashboard/transactions">
							<Button size="xs" variant="ghost" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")}>View All</Button>
						</Link>
					</Box>
				</Box>

				<Box p="5" borderColor={useColorModeValue("none", "#2e2e2e")} borderWidth="thin" borderRadius="5">
					<Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} textAlign="center">New Offers</Text>
					<Text fontSize="2xl" my="3" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")} textAlign="center">0</Text>
					<Box mx="auto" w="fit-content">
						<Button size="xs" variant="ghost" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")}>View All</Button>
					</Box>
				</Box>

				<Box p="5" borderColor={useColorModeValue("none", "#2e2e2e")} borderWidth="thin" borderRadius="5">
					<Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} textAlign="center">Active Transactions</Text>
					<Text fontSize="2xl" my="3" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")} textAlign="center">0</Text>
					<Box mx="auto" w="fit-content">
						<Button size="xs" variant="ghost" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")}>View All</Button>
					</Box>
				</Box>

				<Box p="5" borderColor={useColorModeValue("none", "#2e2e2e")} borderWidth="thin" borderRadius="5">
					<Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} textAlign="center">Active Transactions</Text>
					<Text fontSize="2xl" my="3" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")} textAlign="center">0</Text>
					<Box mx="auto" w="fit-content">
						<Button size="xs" variant="ghost" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")}>View All</Button>
					</Box>
				</Box>
			</SimpleGrid>
		</Card>
	)
}