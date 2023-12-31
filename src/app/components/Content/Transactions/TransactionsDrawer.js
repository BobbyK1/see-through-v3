'use client'

import { useSupabase } from "@/app/context/SupabaseProvider";
import { Box, Button, Center, Checkbox, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Select, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function TransactionDrawer({ isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const { user } = useSupabase();
    const toast = useToast();
    const [unique, setUnique] = useState(null);
    const [uniqueLoading, setUniqueLoading] = useState(false);

    const [formData, setFormData] = useState({
        status: 'draft',
        mls_id: '',
        address: '',
        price: '',
        listing_agent: '',
        co_listing_agent: '',
        user_id: user?.id,
        listing_approved_by_mls: false,
        consent_to_share_offer_amount: false
    })
    

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        console.log(formData)
    }

    const router = useRouter();

    const submitTransaction = async () => {
        setLoading(true);
    
        try {
            const response1 = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/database/createTransaction`, {
                method: "post",
                body: JSON.stringify(formData)
            });
    
            if (!response1.ok) {
                throw new Error(`HTTP error! Status: ${response1.status}`);
            }
    
            const data = await response1.json();
    
            const response2 = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/search/syncTransactionToAloglia`, {
                method: "POST",
                body: JSON.stringify({
                    id: data.id,
                    address: formData.address,
                    listing_agent: formData.listing_agent,
                    mls_id: formData.mls_id,
                    status: formData.status
                })
            });
    
            if (!response2.ok) {
                throw new Error(`HTTP error! Status: ${response2.status}`);
            }
    
            toast({
                title: "Transaction successfully created!",
                status: "success",
                variant: "subtle",
                position: "bottom-right",
                duration: 5000
            });
    
            router.refresh();
            router.push(`${process.env.NEXT_PUBLIC_URL}/dashboard/transactions/view/${data.id}/listing-info`);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    

    const checkMlsId = async (e) => {
        setUniqueLoading(true);
        setUnique(null)

        if (e.length > 0) {
            await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/database/checkMlsIdFieldUnique`, {
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
        

        return setUniqueLoading(false);
    }

    return (
        <Drawer size="lg" isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bgColor="#1c1c1c" color="whitesmoke">
                <DrawerCloseButton />
                <DrawerHeader>
                    <Text mr="2">Create Transaction</Text>
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
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Text color="whiteAlpha.700">Status</Text>
                                    <Select name="status" onChange={handleChange} variant="filled" defaultValue="draft" w="80" borderColor="#3e3e3e" bgColor="#2a2929" borderWidth="thin">
                                        <option value="draft">Draft</option>
                                        <option value="active">Active</option>
                                        <option value="under-contract">Under Contract</option>
                                        <option value="pending">Pending</option>
                                        <option value="closed">Closed</option>
                                    </Select>
                                </Stack>

                                <Divider borderColor="#2e2e2e" h="0.5" my="5" />

                                <Stack direction="row" justify="space-between" alignItems="center">
                                    <Text color="whiteAlpha.700">MLS ID</Text>
                                    <Box>
                                        <Input name="mls_id" isInvalid={unique === false}  onBlur={(e) => checkMlsId(e.target.value)} onChange={handleChange} w="80" type="text" borderColor={unique ? "green.500" : "#3e3e3e"} bgColor="#2a2929" />
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
                                    <Input name="listing_agent" onChange={handleChange} w="80" type="text" borderColor="#3e3e3e" bgColor="#2a2929" defaultValue="" />
                                </Stack>

                                <Stack direction="row" justify="space-between" alignItems="center" mt="10">
                                    <Text color="whiteAlpha.700">Co. Listing Agent</Text>
                                    <Input name="co_listing_agent" onChange={handleChange} w="80" type="text" borderColor="#3e3e3e" bgColor="#2a2929" />
                                </Stack>
                            </Box>

                            <Divider borderColor="#2e2e2e" h="0.5" mt="5" />

                            <Box w="fit-content" ml="auto" mt="5" px="5">
                                <Box w="fit-content" ml="auto">
                                    <Checkbox name="listing_approved_by_mls" onChange={() => setFormData({
                                        ...formData,
                                        "listing_approved_by_mls": !formData.listing_approved_by_mls
                                    })} mb="2" colorScheme="green" color="whiteAlpha.700" borderColor="#3e3e3e">I certify that this listing is approved by my local Realtor Association.</Checkbox>
                                    <Checkbox name="consent_to_share_offer_amount" onChange={() => setFormData({
                                        ...formData,
                                        "consent_to_share_offer_amount": !formData.consent_to_share_offer_amount
                                    })} colorScheme="green" color="whiteAlpha.700" borderColor="#3e3e3e">I have permission to disclose the amount of offers on this transaction.</Checkbox>
                                </Box>
                            </Box>
                        </Box>
                    }
                </DrawerBody>
                <DrawerFooter>
                    <Button color="whiteAlpha.800" mr="2" variant="solid" size="sm" bgColor="#2e2e2e" borderColor="#3e3e3e" borderWidth="thin" colorScheme="whiteAlpha" p="3" onClick={onClose}>Close</Button>
                    <Button color="whiteAlpha.800" isDisabled={loading || formData.address.length === 0 || formData.mls_id.length === 0 || formData.price.length === 0 || formData.listing_agent.length === 0} variant="solid" size="sm" bgColor="green.500" borderColor="green.800" borderWidth="thin" colorScheme="green" p="3" onClick={submitTransaction}>Submit</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}