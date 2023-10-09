'use client'

import { Box, Button, Divider, Grid, GridItem, Select, SimpleGrid, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../UI/Card";
import { Link } from "@chakra-ui/next-js";
import { useSideContent } from "@/app/context/useSideContent";
import { useEffect } from "react";

export default function DashboardContent({ data, activeTransactionCount }) {
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
                        <Tasks />
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

const Tasks = () => {

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
			

			<Box borderRadius="5" borderWidth="thin" borderColor={useColorModeValue("none", "#2e2e2e")} mt="5" h="275" overflow="auto">
				<Box w="fit-content" mx="auto" mt="10">
					<Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>No tasks yet...</Text>
				</Box>
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