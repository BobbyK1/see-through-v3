import { Box, Button, Center, Container, Divider, Flex, Grid, GridItem, Heading, Stack, Tag, Text } from "@chakra-ui/react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import { Suspense } from "react";
import Link from "next/link";
import { MainCardSkeleton } from "@/app/components/Content/Public/skeletons";
import Card from "@/app/components/UI/Card";
import SignIn from "@/app/components/Content/Public/SignIn";
import SubmitOfferModal from "@/app/components/Content/Public/SubmitModal";
import ViewOfferModal from "@/app/components/Content/Public/ViewOfferModal";

export const dynamic = 'force-dynamic';

async function GetTransaction(id, supabase, user) {
    if (user) {
        var { data: transactions, error } = await supabase.from('transactions').select('id,price,address,listing_agent,co_listing_agent,mls_id,status,num_of_offers').eq('id', id);
    } else {
        var { data: transactions, error } = await supabase.from('transactions').select('id,price,address,listing_agent,co_listing_agent,mls_id,status').eq('id', id);
    }
    
    if (error) throw new Error(error.message);

    if (transactions.length === 0) {
        return null
    }

    return transactions[0];
}

async function GetOffer(id, supabase, user) {
    const { data, error } = await supabase.from('offers').select('*').eq('submitting_agent_id', user.id).eq('transaction_id', id)

    if (error) throw new Error(error.message);
    
    if (data.length > 0) {
        return data[0];
    } else {
        return null
    }
}

async function GetRole(supabase, user) {
    const { data, error } = await supabase.from('profiles').select('role').eq('id', user);

    if (error) throw new Error(error.message);

    return data[0];
}

export default async function Page({ params }) {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser();

    const transaction = await GetTransaction(params.id, supabase, user);

    if (user) { 
        var offer = await GetOffer(params.id, supabase, user); 
        var role = await GetRole(supabase, user.id);
    }
    
    return (
        <>
            <Container maxW="container.xl">
                <Suspense fallback={<MainCardSkeleton />}>
                    {transaction !== null ? 
                        <>
                            <Box>
                                <Stack direction={["column", "column", "row", "row"]} justify="space-between">
                                    <Box>
                                        <Text fontSize="md" color="whiteAlpha.600"><Tag colorScheme="green" textTransform="capitalize">{transaction.status}</Tag> ${transaction.price}</Text>
                                    
                                        <Text fontSize="xl" color="whiteAlpha.800">{transaction.address}</Text>
                                    </Box>

                                    <Box display={user ? "block" : "none"}>
                                        {offer ? <ViewOfferModal offer={offer} /> : <SubmitOfferModal />}
                                    </Box>                        
                                </Stack>
                            </Box>
                            {user && (role.role === 'agent' || role.role === 'guest_agent') ? <TransactionCard data={transaction} /> : <SignIn /> }
                        </>
                    :
                        <>
                            <Center flexDirection="column" mt="20">
                                <Heading as="h1" fontSize="8xl" color="whiteAlpha.700">404</Heading>
                                <Text mt="5" color="whiteAlpha.700">The transaction you're trying to view does not exist.</Text>
                                <Link href="/public">
                                    <Button size="sm" colorScheme="gray" mt="5">Return Home</Button>
                                </Link>
                            </Center>
                        </>
                    }
                    
                </Suspense>
            </Container>
        </>
    )
}

const TransactionCard = ({ data }) => {

    return (
        <>
            <Grid mt="10" w="full" templateColumns='repeat(12, 1fr)' gap="3">
                <GridItem colSpan={[ 12, 12, 12, 6 ]}>
                    <Card p="5" minH="full">
                        <Text color="whiteAlpha.700">General Info</Text>

                        <Divider my="2" borderColor="#2e2e2e" />                            
                    </Card>
                </GridItem>
                
                <GridItem colSpan={[ 12, 12, 12, 3 ]}>
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

                <GridItem colSpan={[ 12, 12, 12, 3 ]}>
                    <Card minH="full" p="5">
                        <Text color="whiteAlpha.700">Offers (Last 30 days)</Text>

                        <Divider my="2" borderColor="#2e2e2e" />

                        <Flex direction="column" h="32" justifyContent="center" alignItems="center">
                            <Text textAlign="center" my="3" fontSize="2xl" color="whiteAlpha.800">{data.num_of_offers}</Text>

                        
                            <Link href={`/dashboard/transactions/view/${data.id}/offers`}>
                                <Button variant="ghost" size="sm" color="whiteAlpha.800">View All</Button>
                            </Link>
                        </Flex>
                    </Card>
                </GridItem>
            </Grid>
        </>
    )
}

