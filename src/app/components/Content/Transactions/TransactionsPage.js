'use client'

import Card from "@/app/components/UI/Card";
// import Search from "@/components/ui/Search";
import { Box, Center, Divider, SimpleGrid, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { redirect, useRouter, useSearchParams,  } from "next/navigation";
import { useEffect } from "react";


export default function TransactionsPage({ transactions }) {
    const router = useRouter();
    const search = useSearchParams();   

    return (
        <>
            {transactions.length === 0 ? 
                <Center h="75vh">
                    <Text fontSize="lg" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>Nothing here yet...</Text>
                </Center>
            :  
                <SimpleGrid spacing="3" w="full" columns={[1, 1, 1, 1, 2, 3, 4]}>
                    <CurrentStatusCards transactions={transactions} router={router} />                        
                </SimpleGrid>
            }
        </>
    )
}

const CurrentStatusCards = ({ router, transactions }) => {

    return (
        <> 
        {transactions.map(transaction => {
            return (
                <Card key={transaction.mls_id} maxW="1000" p="0">
                    <Box p="3">
                        <Text fontSize="sm" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>{transaction.mls_id} <Tag ml="3" size="sm" variant="outline" colorScheme="green" textTransform="capitalize">{transaction.status}</Tag></Text>
                    </Box>
                    <Divider borderColor={useColorModeValue("blackAlpha.400", "#3e3e3e")} />

                    <Box p="3" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>
                        <Stack justify="space-between" direction="row" alignItems="center">
                            <Box>
                                <Text fontSize="sm" color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}>${transaction.price}</Text>
                                <Text fontSize="lg" noOfLines="1">{transaction.address}</Text>
                            </Box>
                            {/* <Box>
                                <Text>Offers</Text>
                                <Text textAlign="right">{transaction.num_of_offers}</Text>
                            </Box> */}
                        </Stack>
                    </Box>


                    <Box onClick={() => router.push(`${process.env.NEXT_PUBLIC_URL}/dashboard/transactions/view/${transaction.id}/listing-info`)} transition="0.2s ease" _hover={{ bgColor: useColorModeValue("blackAlpha.100", "#3f3e3e"), cursor: "pointer" }} p="2" color={useColorModeValue("blackAlpha.800", "whiteAlpha.700")} textAlign="center">
                        View
                    </Box>
                </Card>
            )
        })}

        </>
    )
}