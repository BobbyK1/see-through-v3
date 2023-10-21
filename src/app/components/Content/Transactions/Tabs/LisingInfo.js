'use client'

import SmallButton from "@/app/components/UI/Button";
import Card from "@/app/components/UI/Card";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, Center, Divider, Flex, Grid, GridItem, Icon, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineDollar, AiOutlineUser, AiOutlineUserSwitch } from "react-icons/ai";


export default function ListingInfo ({ data }) {

    return (
        <>
            <Stack direction="row" justify="space-between">
                <Box>
                    <Stack direction="row" spacing="2">
                        <Tag colorScheme="green" textTransform="capitalize">{data.status}</Tag>
                        <Tag colorScheme="gray">MLS ID: {data.mls_id}</Tag>
                    </Stack>
                    <Text fontSize="lg" fontWeight="bold" mt="2" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")}>{data.address}</Text>
                </Box>

            </Stack>

            <Grid mt="10" w="full" templateColumns='repeat(10, 1fr)' gap="3">
                <GridItem colSpan="5">
                    <Card p="5">
                       <Text color="whiteAlpha.700">General Info</Text>

                       <Divider my="2" borderColor="#2e2e2e" />

                        <Stack direction="column" justify="space-between" color="whiteAlpha.800">
                            <Stack my="1" direction="row" justifyContent="space-between">
                                <Icon as={AiOutlineDollar} fontSize="2xl" />
                                <Text>${data.price}</Text>
                            </Stack>

                            <Stack my="3" direction="row" justifyContent="space-between">
                                <Icon as={AiOutlineUser} fontSize="2xl" />
                                <Text>{data.listing_agent}</Text>
                            </Stack>

                            <Stack my="3" direction="row" justifyContent="space-between">
                                <Icon as={AiOutlineUserSwitch} fontSize="2xl" />
                                <Text>{data.co_listing_agent ? data.co_listing_agent : "N/a"}</Text>
                            </Stack>
                       </Stack>
                    </Card>
                </GridItem>
                
                <GridItem colSpan="2">
                    <Card p="5" minH="full" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Text textAlign="center" fontSize="md" color="whiteAlpha.700">Offers</Text>
                        <Text textAlign="center" my="3" fontSize="2xl" color="whiteAlpha.800">{data.num_of_offers}</Text>

                        <Center>
                            <Link href={`/dashboard/transactions/view/${data.id}/offers`}>
                                <Button variant="ghost" size="sm" color="whiteAlpha.800">View All</Button>
                            </Link>
                        </Center>
                    </Card>
                </GridItem>

                <GridItem colSpan="3">
                    <Card minH="full" p="5">
                        <Text color="whiteAlpha.700">Assigned Clients</Text>

                        <Divider my="2" borderColor="#2e2e2e" />

                        <Flex direction="column" justifyContent="center" alignItems="center" h="32">
                            <Text color="whiteAlpha.800">No clients assigned yet...</Text>

                            <Link href={`/dashboard/transactions/view/${data.id}/assigned-clients`} mt="5">
                                <Button variant="ghost" size="sm" color="whiteAlpha.800">Assign Clients</Button>
                            </Link>
                        </Flex>
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
                            {Array(4).fill(0).map(() => {
                                return (
                                    <Grid templateColumns="repeat(12, 1fr)" bg="#2e2e2e" minH="14" mb="1.5" borderRadius="5" w="full" p="4" shadow="sm" alignItems="center">
                                        <GridItem colSpan="5">
                                            <Flex direction="row">
                                                <Icon as={AiOutlineClockCircle} fontSize="2xl" color="whiteAlpha.800" />
                                                <Text ml="5" color="whiteAlpha.800">{Math.random()}</Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan="3">
                                            <Flex direction="row">
                                                <Icon as={AiOutlineCalendar} fontSize="xl" color="whiteAlpha.700" />
                                                <Text ml="5" color="whiteAlpha.700">10/21/2023</Text>
                                            </Flex>
                                        </GridItem>
                                        <GridItem colSpan="4" display="flex" justifyContent="flex-end" alignItems="center">
                                            <Button variant="ghost" _hover={{ color: "whiteAlpha.800" }} color="whiteAlpha.700" size="sm">Mark As Complete</Button>
                                        </GridItem>
                                    </Grid>

                                )
                            })}
                        </Box>

                        
                    </Card>
                </GridItem>
            </Grid>
        </>
    )
}

