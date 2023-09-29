'use client'

import { useSupabase } from "@/app/context/SupabaseProvider";
import { Box, Button, Center, Checkbox, CheckboxIcon, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, InputGroup, InputRightAddon, InputRightElement, Spinner, Stack, Text, Tooltip, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function TransactionDrawer({ isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const { user } = useSupabase();
    const toast = useToast();
    const [unique, setUnique] = useState(null);
    const [uniqueLoading, setUniqueLoading] = useState(false);

    const [formData, setFormData] = useState({
        mlsId: '',
        address: '',
        price: '',
        listingAgent: '',
        coListingAgent: '',
        userId: user?.id
    })
    

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const router = useRouter();

    const submitTransaction = async () => {
        setLoading(true);

        await fetch('/api/v1/database/createTransaction', {
            method: "post",
            body: JSON.stringify(formData)
        })
        .then(data => data.json())
        .then(data => {
            toast({
                title: "Transaction successfully created!",
                status: "success",
                variant: "subtle",
                position: "bottom-right",
                duration: 5000
            })
            router.refresh();
            router.push(`/dashboard/transactions/${data.id}`)
        })
        .catch(error => {
            console.log(error)

            setLoading(false);
        })
    }

    const checkMlsId = async (e) => {
        setUniqueLoading(true);

        if (e.length > 0) {
            await fetch('/api/v1/database/checkMlsIdFieldUnique', {
                method: "POST",
                body: JSON.stringify({
                    mlsId: e
                })
            })
            .then(data => data.json())
            .then(data => {
                if (data.unique) {
                    setUnique(true);
                } else {
                    setUnique(false);
                }
            })
        } else {
            setUnique(null);
        }
        

        setUniqueLoading(false);
    }

    return (
        <Drawer size="lg" isOpen={isOpen} onClose={onClose} onOverlayClick={() => router.replace('/dashboard/transactions')}>
            <DrawerOverlay />
            <DrawerContent bgColor="#1c1c1c" color="whitesmoke">
                <DrawerCloseButton />
                <DrawerHeader>
                    <Box display="flex" flexDir="row" alignItems="center">
                        <Text mr="2">Create Transaction</Text>
                        <Text as="code" bgColor="#2e2e2e" fontSize="md" h="fit-content" px="4" borderRadius="5">Draft</Text>
                    </Box>
                </DrawerHeader>
                <Divider borderColor="#2e2e2e" h="0.5" />
                <DrawerBody p="0">
                    {loading ? 
                        <Box w="full" mt="20">
                            <Center flexDir="column">
                                <Spinner size="lg" color="green.500" />
                                <Text fontSize="xl" mt="5" fontWeight="bold">Loading...</Text>
                                <Text fontSize="md" color="whiteAlpha.600">We are creating your transaction</Text>
                            </Center>
                        </Box> 
                        :  
                        <Box>
                            <Box mt="5" px="5">                    
                                <Stack direction="row" justify="space-between" alignItems="center">
                                    <Text color="whiteAlpha.700">MLS ID</Text>
                                    <Box>
                                        <Input name="mlsId" isInvalid={unique === false}  onBlur={(e) => checkMlsId(e.target.value)} onChange={handleChange} w="80" type="text" borderColor={unique ? "green.500" : "#3e3e3e"} bgColor="#2a2929" />
                                        {unique === false && <Text fontSize="sm" mt="1" color="red.500">MLS ID already in use.</Text>}
                                    </Box>
                                </Stack>

                                <Stack direction="row" justify="space-between" alignItems="center" mt="10">
                                    <Text color="whiteAlpha.700">Address</Text>
                                    <Input name="address" onChange={handleChange} w="80" type="text" borderColor="#3e3e3e" bgColor="#2a2929" />
                                </Stack>
                            </Box>

                            <Divider borderColor="#2e2e2e" h="0.5" mt="5" />

                            <Box mt="5" px="5">
                                <Stack direction="row" justify="space-between" alignItems="center">
                                    <Text color="whiteAlpha.700">Price</Text>
                                    <Input name="price" onChange={handleChange} w="80" type="text" borderColor="#3e3e3e" bgColor="#2a2929" />
                                </Stack>
                            </Box>

                            <Divider borderColor="#2e2e2e" h="0.5" mt="5" />

                            <Box mt="5" px="5">
                                <Stack direction="row" justify="space-between" alignItems="center">
                                    <Text color="whiteAlpha.700">Listing Agent</Text>
                                    <Input name="listingAgent" onChange={handleChange} w="80" type="text" borderColor="#3e3e3e" bgColor="#2a2929" defaultValue="" />
                                </Stack>

                                <Stack direction="row" justify="space-between" alignItems="center" mt="10">
                                    <Text color="whiteAlpha.700">Co. Listing Agent</Text>
                                    <Input name="coListingAgent" onChange={handleChange} w="80" type="text" borderColor="#3e3e3e" bgColor="#2a2929" />
                                </Stack>
                            </Box>

                            <Divider borderColor="#2e2e2e" h="0.5" mt="5" />

                            <Box w="fit-content" ml="auto" mt="5" px="5">
                                <Consent />
                            </Box>
                        </Box>
                    }
                </DrawerBody>
                <DrawerFooter>
                    <Button mr="2" variant="solid" size="sm" bgColor="#2e2e2e" borderColor="#3e3e3e" borderWidth="thin" colorScheme="whiteAlpha" p="3" onClick={onClose}>Close</Button>
                    <Button isDisabled={loading || formData.address.length === 0 || formData.mlsId.length === 0 || formData.price.length === 0 || formData.listingAgent.length === 0} variant="solid" size="sm" bgColor="green.500" borderColor="green.800" borderWidth="thin" colorScheme="green" p="3" onClick={submitTransaction}>Submit</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

const ListingAgentInfo = () => {

    return (
        <>
            
        </>
    )
}

const PricingInfo = () => {

    return (
        <>
            <Stack direction="row" justify="space-between" alignItems="center">
                <Text color="whiteAlpha.700">Price</Text>
                <Input w="80" type="text" borderColor="#3e3e3e" bgColor="#2a2929" />
            </Stack>
        </>
    )
}

function Consent() {
    return (
        <>
            <Checkbox colorScheme="green" color="whiteAlpha.700" borderColor="#3e3e3e">I certify that this listing is approved by my local Realtor Association.</Checkbox>
            <Checkbox colorScheme="green" color="whiteAlpha.700" borderColor="#3e3e3e">I have permission to disclose the amount of offers on this transaction.</Checkbox>
        </>
    )
}