'use client'

import SmallButton from "@/app/components/UI/Button";
import Card from "@/app/components/UI/Card";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, Center, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Fade, Flex, Grid, GridItem, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Stack, Tag, Text, Tooltip, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineDollar, AiOutlineUser, AiOutlineUserSwitch } from "react-icons/ai";


export default function ListingInfo ({ data, tasks }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const params = useParams();
    const router = useRouter();
    const toast = useToast();

    const [loading, setLoading] = useState(false);
    const [taskLoading, setTaskLoading] = useState({});

    const [formData, setFormData] = useState({
        transaction_id: params.id,
        due_date: '',
        title: ''
    })

    const handleMarkComplete = async (id) => {
        setTaskLoading({
            ...taskLoading,
            [id]: true,
        });
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/database/deleteTask`, {
                method: "POST",
                body: JSON.stringify({
                    id: id
                })
            });
    
            if (response.ok) {
                router.refresh();
                toast({
                    title: "Task Completed!",
                    duration: 3500,
                    status: "success",
                    position: 'bottom-right'
                });
            } else {
                throw new Error("Task completion failed.");
            }
        } catch (error) {
            console.error(error);
            setTaskLoading({
                ...taskLoading,
                [id]: false
            })
        } finally {
            setTaskLoading({
                ...taskLoading,
                [id]: true,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const submitTask = async () => {
        setLoading(true);

        await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/database/createTask`, {
            method: "POST",
            body: JSON.stringify(formData)
        })
        .then(data => data.json())
        .then(data => {
            if (data.success) {
                router.refresh();
                toast({
                    title: "Task Created!",
                    duration: 3500,
                    status: "success",
                    position: 'bottom-right'
                })

                onClose();
            }
        })
        .catch(error => {
            console.log(error);
        })

        setFormData({
            transaction_id: params.id,
            due_date: '',
            title: ''
        })
    }

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
                
                <GridItem colSpan="2">
                    <Card p="5" minH="full" >
                        <Text fontSize="md" color="whiteAlpha.700">Offers</Text>

                        <Divider my="2" borderColor="#2e2e2e" />

                        <Flex direction="column" h="32" justifyContent="center" alignItems="center">
                            <Text textAlign="center" my="3" fontSize="2xl" color="whiteAlpha.800">{data.num_of_offers}</Text>

                        
                            <Link href={`/dashboard/transactions/view/${data.id}/offers`}>
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
                <GridItem colSpan="10">
                    <Card p="5" minH={96}>
                        <Stack direction="row" justify="space-between">
                            <Text color="whiteAlpha.700">Tasks</Text>
                            
                            <SmallButton bgColor="green.500" borderColor="green.600" color="whiteAlpha.800" colorScheme="green" onClick={onOpen}>Add Task</SmallButton>
                        </Stack>

                        <Divider my="5" borderColor="#2e2e2e" />

                        <Box h="72" overflowY="auto">
                            {tasks
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
                                                <GridItem colSpan="5">
                                                    <Flex direction="row">
                                                        <Icon as={AiOutlineClockCircle} fontSize="2xl" color="whiteAlpha.800" />
                                                        <Tooltip label={task.title}>
                                                            <Text ml="5" noOfLines="1" color="whiteAlpha.800">{task.title}</Text>
                                                        </Tooltip>
                                                    </Flex>
                                                </GridItem>
                                                <GridItem colSpan="3">
                                                    <Flex direction="row">
                                                        <Icon as={AiOutlineCalendar} fontSize="xl" color="whiteAlpha.700" />
                                                        <Text ml="5" color="whiteAlpha.700">{formattedDueDate}</Text>
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

            <Drawer size="md" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />

                <DrawerContent bg="#1c1c1c">
                    <DrawerCloseButton />

                    <DrawerHeader>Add Task</DrawerHeader>

                    <DrawerBody>
                        <Box>
                            {loading ? 
                                <Box w="full" mt="20">
                                    <Center flexDir="column">
                                        <Spinner size="lg" color="green.500" />
                                        <Text fontSize="xl" mt="5" fontWeight="bold">Loading...</Text>
                                        <Text fontSize="md" color="whiteAlpha.600">We are creating your task</Text>
                                    </Center>
                                </Box>  
                                :
                                <Box mt="5" px="5">                    
                                    <Stack direction="row" justify="space-between" alignItems="center">
                                        <Text color="whiteAlpha.700">Title</Text>
                                        <Box>
                                            <Input name="title" onChange={handleChange} w="80" type="text" bgColor="#2a2929" />
                                        </Box>
                                    </Stack>

                                    <Stack direction="row" justify="space-between" alignItems="center" mt="10">
                                        <Text color="whiteAlpha.700">Due Date</Text>
                                        <Input name="due_date" onChange={e => setFormData({...formData, due_date: e.target.value})} w="80" type="date" borderColor="#3e3e3e" bgColor="#2a2929" />
                                    </Stack>
                                </Box>
                            }
                        </Box>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button mr="2" variant="solid" size="sm" bgColor="#2e2e2e" borderColor="#3e3e3e" borderWidth="thin" colorScheme="whiteAlpha" p="3" onClick={onClose}>Close</Button>
                        <Button isDisabled={loading || formData.title.length === 0} variant="solid" size="sm" bgColor="green.500" borderColor="green.800" borderWidth="thin" colorScheme="green" p="3" onClick={submitTask}>Submit</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}