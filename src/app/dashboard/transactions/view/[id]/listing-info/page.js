import ListingInfo from "@/app/components/Content/Transactions/Tabs/LisingInfo";
import SmallButton from "@/app/components/UI/Button";
import Card from "@/app/components/UI/Card";
import { Box, Button, Divider, Flex, Grid, GridItem, Icon, Stack, Tag, Text } from "@chakra-ui/react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineDollar, AiOutlineUser, AiOutlineUserSwitch } from "react-icons/ai";

export const dynamic = 'force-dynamic';

async function GetTransaction(query, supabase) {
    let { data: transactions, error } = await supabase.from('transactions').select('*').eq('id', query); 

    if (error) throw new Error(`Error Code For Support: ${error.code}`);

    return transactions[0];
}

async function GetTasks(query, supabase) {
    const { data: tasks, error} = await supabase.from('tasks').select("*").eq('transaction_id', query);
    
    if (error) throw new Error(error.message);

    return tasks
}

export default async function Page({ params }) {
    "use server"
    const supabase = createServerComponentClient({ cookies });
    const query = await params;

    const transaction = await GetTransaction(query.id, supabase);
    const tasks = await GetTasks(query.id, supabase);
    
    return (
        <>
            <Stack direction="row" justify="space-between">
                <Box>
                    <Stack direction="row" spacing="2">
                        <Tag colorScheme="green" textTransform="capitalize">{transaction.status}</Tag>
                        <Tag colorScheme="gray">MLS ID: {transaction.mls_id}</Tag>
                    </Stack>
                    <Text fontSize="lg" fontWeight="bold" mt="2" color="whiteAlpha.800">{transaction.address}</Text>
                </Box>

            </Stack>

            <Grid mt="10" w="full" templateColumns='repeat(10, 1fr)' gap="3">
                <GridItem colSpan="5">
                    <Card minH="full" p="5">
                        <Text color="whiteAlpha.700">Assigned Clients</Text>

                        <Divider my="2" borderColor="#2e2e2e" />

                        <Flex direction="column" justifyContent="center" alignItems="center" h="32">
                            <Text color="whiteAlpha.800">No clients assigned yet...</Text>

                            <Link href={`/dashboard/transactions/view/${transaction.id}/assigned-clients`}>
                                <Button variant="ghost" size="sm" color="whiteAlpha.800" mt="5">Assign Clients</Button>
                            </Link>
                        </Flex>
                    </Card>
                </GridItem>
                
                <GridItem colSpan="2">
                    <Card p="5" minH="full" >
                        <Text fontSize="md" color="whiteAlpha.700">Offers</Text>

                        <Divider my="2" borderColor="#2e2e2e" />

                        <Flex direction="column" h="32" justifyContent="center" alignItems="center">
                            <Text textAlign="center" my="3" fontSize="2xl" color="whiteAlpha.800">{transaction.num_of_offers}</Text>

                        
                            <Link href={`/dashboard/transactions/view/${transaction.id}/offers`}>
                                <Button variant="ghost" size="sm" color="whiteAlpha.800">View All</Button>
                            </Link>
                        </Flex>
                    </Card>
                </GridItem>

                <GridItem colSpan="3">
                    <Card p="5">
                       <Text color="whiteAlpha.700">General Info</Text>

                       <Divider my="2" borderColor="#2e2e2e" />

                        <Stack direction="column" justify="space-between" color="whiteAlpha.800">
                            <Stack my="1" direction="row" justifyContent="space-between">
                                <Icon as={<AiOutlineDollar />} fontSize="2xl" />
                                <Text>${transaction.price}</Text>
                            </Stack>

                            <Stack my="3" direction="row" justifyContent="space-between">
                                <Icon as={<AiOutlineUser />} fontSize="2xl" />
                                <Text>{transaction.listing_agent}</Text>
                            </Stack>

                            <Stack my="3" direction="row" justifyContent="space-between">
                                <Icon as={AiOutlineUserSwitch} fontSize="2xl" />
                                <Text>{transaction.co_listing_agent ? transaction.co_listing_agent : "N/a"}</Text>
                            </Stack>
                       </Stack>
                    </Card>
                </GridItem>
                <GridItem colSpan="10">
                    <Card p="5" minH={96}>
                        <Stack direction="row" justify="space-between">
                            <Text color="whiteAlpha.700">Tasks</Text>
                            
                            <SmallButton bgColor="green.500" borderColor="green.600" color="whiteAlpha.800" colorScheme="green">Add Task</SmallButton>
                        </Stack>

                        <Divider my="5" borderColor="#2e2e2e" />

                        <Box h="72" overflowY="auto">
                            {tasks
                                .slice() // Create a copy of the tasks array to avoid mutating the original
                                .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
                                .map(task => {
                                    return (
                                        <Fade in={true}>
                                            <Grid key={task.id} templateColumns="repeat(12, 1fr)" bg="#2e2e2e" minH="14" mb="1.5" borderRadius="5" w="full" p="4" shadow="sm" alignItems="center">
                                                <GridItem colSpan="5">
                                                    <Flex direction="row">
                                                        <Icon as={<AiOutlineClockCircle />} fontSize="2xl" color="whiteAlpha.800" />
                                                        <Tooltip label={task.title}>
                                                            <Text ml="5" noOfLines="1" color="whiteAlpha.800">{task.title}</Text>
                                                        </Tooltip>
                                                    </Flex>
                                                </GridItem>
                                                <GridItem colSpan="3">
                                                    <Flex direction="row">
                                                        <Icon as={<AiOutlineCalendar />} fontSize="xl" color="whiteAlpha.700" />
                                                        <Text ml="5" color="whiteAlpha.700">{task.due_date}</Text>
                                                    </Flex>
                                                </GridItem>
                                                <GridItem colSpan="4" display="flex" justifyContent="flex-end" alignItems="center">
                                                    <Button isLoading={taskLoading[task.id]} variant="ghost" _hover={{ color: "whiteAlpha.800" }} color="whiteAlpha.700" size="sm" onClick={() => handleMarkComplete(task.id)}>Mark As Complete</Button>
                                                </GridItem>
                                            </Grid>
                                        </Fade>
                                    )
                                })}
                        </Box>
                    </Card>
                </GridItem>
            </Grid>
        </>
    )
}