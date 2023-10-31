import TransactionsPage from "@/app/components/Content/Transactions/TransactionsPage";
import Card from "@/app/components/UI/Card";
import { Box, Center, Divider, SimpleGrid, Stack, Tag, Text } from "@chakra-ui/react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    const GetTransactions = async () => {
        let { data: transactions, error } = await supabase.from('transactions').select('*').range(0, 11).filter('status', 'eq', params.status).eq('user_id', user.id);

        if (error) throw new Error(`Error Code For Support: ${error.code}`);

        return transactions;
    }

    const transactions = await GetTransactions(user.id);

    return (
        <>
            {transactions.length === 0 ?
                <Center h="75vh">
                    <Text fontSize="lg" color="whiteAlpha.700">No transactions yet...</Text>
                </Center>
                :
                <SimpleGrid spacing="3" w="full" columns={[1, 1, 1, 1, 2, 3, 4]}>
                    <CurrentStatusCards transactions={transactions}/>                        
                </SimpleGrid>
            }
        </>
    )
}

const CurrentStatusCards = ({ transactions }) => {

    return (
        <> 
        {transactions.map(transaction => {
            return (
                <Card key={transaction.mls_id} maxW="1000" p="0">
                    <Box p="3">
                        <Text fontSize="sm" color="whiteAlpha.700">{transaction.mls_id} <Tag ml="3" size="sm" variant="outline" colorScheme="green" textTransform="capitalize">{transaction.status}</Tag></Text>
                    </Box>
                    <Divider borderColor="#3e3e3e" />

                    <Box p="3" color="whiteAlpha.700">
                        <Stack justify="space-between" direction="row" alignItems="center">
                            <Box>
                                <Text fontSize="sm" color="whiteAlpha.500">${transaction.price}</Text>
                                <Text fontSize="lg" noOfLines="1">{transaction.address}</Text>
                            </Box>
                        </Stack>
                    </Box>

                    <Link href={`/dashboard/transactions/view/${transaction.id}/listing-info`}>
                    <Box transition="0.2s ease" _hover={{ bgColor: "#3f3e3e", cursor: "pointer" }} p="2" color="whiteAlpha.700" textAlign="center">
                        
                            View
                        
                    </Box>
                    </Link>
                </Card>
            )
        })}

        </>
    )
}