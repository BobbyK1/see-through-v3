'use client'

import SmallButton from "@/app/components/UI/Button";
import { Box, Button, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Spinner, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";


const AddTaskDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const params = useParams();
    const router = useRouter();
    const toast = useToast();

    const [formData, setFormData] = useState({
        transaction_id: params.id,
        due_date: '',
        title: ''
    })
    const [loading, setLoading] = useState(false);

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
                    position: 'bottom-right',
                    variant: "subtle"
                })
                onClose();
                setLoading(false);
               
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
            <SmallButton onClick={onOpen} bgColor="green.500" borderColor="green.600" color="whiteAlpha.800" colorScheme="green">Add Task</SmallButton>

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

export default AddTaskDrawer;