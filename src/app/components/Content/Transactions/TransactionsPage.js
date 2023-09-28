'use client'

import Card from "@/app/components/UI/Card";
import TransactionDrawer from "@/app/components/UI/TransactionsDrawer";
import { useSideContent } from "@/app/context/useSideContent";
// import Search from "@/components/ui/Search";
import { Box, Button, Divider, SimpleGrid, Stack, Tag, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function TransactionsPage({ transactions }) {
    const {isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { updateContent, updateTitle } = useSideContent();

    const [currentTab, setCurrentTab] = useState("active");

    useEffect(() => {
        updateContent(<SidebarContent setCurrentTab={setCurrentTab} currentTab={currentTab} onOpen={onOpen} />)
        updateTitle("Transactions")
    }, [currentTab])

    return (
        <>
            <SimpleGrid spacing="3" w="full" columns={[1, 1, 1, 1, 2, 3, 4]}>
                <CurrentStatusCards transactions={transactions} router={router} currentTab={currentTab} />                        
            </SimpleGrid>

            <TransactionDrawer isOpen={searchParams.get('createTransaction') === "true" || isOpen} onClose={onClose} />
        </>
    )
}



const SidebarContent = ({ currentTab, setCurrentTab, onOpen }) => {

    const SideButton = ({ children, status, ...props }) => {
        let active = currentTab === status ? true : false;

        return <Button size="sm" bg={active ? useColorModeValue("blackAlpha.200", "whiteAlpha.50") : "transparent"} color={active ? useColorModeValue("blackAlpha.700", "whiteAlpha.700") : useColorModeValue("blackAlpha.500", "whiteAlpha.300")}  px="2" variant="unstyled" w="full" _hover={{ textDecor: "underline", color: useColorModeValue("blackAlpha.700", "whiteAlpha.700") }} textAlign="left" {...props}>{children}</Button>
    }
    
    return (
        <>
            <Button size="sm" w="full" mb="5" color={useColorModeValue("white", "whiteAlpha.800")} onClick={onOpen} mt="2" colorScheme="green" bgColor="green.600">Create Transaction</Button>

            <Text fontSize="sm" color="#707070" mb="3" mt="5">Status</Text>

            <ul>
                <SideButton status="active" onClick={() => setCurrentTab("active")}>Active</SideButton>
                <SideButton status="under contract" onClick={() => setCurrentTab("under contract")}>Under Contract</SideButton>
                <SideButton status="pending" onClick={() => setCurrentTab("pending")}>Pending</SideButton>
                <SideButton status="closed" onClick={() => setCurrentTab("closed")}>Closed</SideButton>   
                <SideButton status="draft" onClick={() => setCurrentTab("draft")}>Draft</SideButton>             
            </ul>
        </>
    )
}

const CurrentStatusCards = ({ router, currentTab, transactions }) => {

    return (
        <> 
        {transactions.map(transaction => {
            return (
                <Card maxW="550" p="0">
                    <Box p="3">
                        <Text fontSize="sm" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>{transaction.mls_id} <Tag ml="3" size="sm" variant="outline" colorScheme="green" textTransform="capitalize">{currentTab}</Tag></Text>
                    </Box>
                    <Divider borderColor={useColorModeValue("blackAlpha.400", "#3e3e3e")} />

                    <Box p="3" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>
                        <Stack justify="space-between" direction="row" alignItems="center">
                            <Box>
                                <Text fontSize="sm" color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}>${transaction.price}</Text>
                                <Text fontSize="md">{transaction.address}</Text>
                            </Box>
                            <Box>
                                <Text>Offers</Text>
                                <Text textAlign="right">0</Text>
                            </Box>
                        </Stack>
                    </Box>

                    <Divider borderColor={useColorModeValue("blackAlpha.400", "#3e3e3e")} />

                    <Box onClick={() => router.push(`/dashboard/transactions/${transaction.id}`)} transition="0.2s ease" _hover={{ bgColor: useColorModeValue("blackAlpha.100", "#3f3e3e"), cursor: "pointer" }} p="2" color={useColorModeValue("blackAlpha.800", "whiteAlpha.700")} textAlign="center">
                        View
                    </Box>
                </Card>
            )
        })}

        </>
    )
}