import { Box, Button, Container, Divider, Flex, Grid, GridItem, IconButton, Spinner, Stack, Tag, Text } from "@chakra-ui/react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import { Suspense } from "react";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { AuthButtonSkeleton, MainCardSkeleton } from "@/app/components/Content/Public/skeletons";
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

export default async function Page({ params }) {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser();

    const transaction = await GetTransaction(params.id, supabase, user);

    if (user) { var offer = await GetOffer(params.id, supabase, user); }
    
    return (
        <>
            <Stack mb="5" direction="row" maxH="14" minH="14" px="5" borderBottomWidth="thin" borderColor="#2e2e2e" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing="5" alignItems="center">
                    <Text mr="5" color="green.500" fontWeight="bold" fontSize="lg">See Through</Text>

                    <Link href="/">Home</Link>
                    <Link href="/">Offers</Link>
                </Stack> 
                <Suspense fallback={<AuthButtonSkeleton />}>
                    {user ? 
                        <>
                            <Box w="96">

                            </Box>
                            
                            <Box>
                                <IconButton size="sm" icon={<AiOutlineUser />} variant="solid" w="full" bg="whiteAlpha.100" colorScheme="gray" borderWidth="thin" color="whiteAlpha.800" />
                            </Box>
                        </>

                        :   
                        <>
                            <Stack direction="row" alignItems="center" spacing="2">
                                <Link href="/create-account">
                                    <Button variant="solid" size="xs" w="full" bg="whiteAlpha.100" colorScheme="gray" borderWidth="thin" color="whiteAlpha.800">Create Account</Button>
                                </Link>
                                <Link href="/">
                                    <Button variant="solid" size="xs" w="full" bg="green.500" colorScheme="green" borderWidth="thin" color="whiteAlpha.800">Sign In</Button>
                                </Link>
                            </Stack>
                        </>
                    }
                </Suspense>
            </Stack>
            <Container maxW="container.xl">
                <Suspense fallback={<MainCardSkeleton />}>
                    <Box>
                        <Stack direction="row" justify="space-between">
                            <Box>
                                <Text fontSize="md" color="whiteAlpha.600"><Tag colorScheme="green" textTransform="capitalize">{transaction.status}</Tag> ${transaction.price}</Text>
                            
                                <Text fontSize="xl" color="whiteAlpha.800">{transaction.address}</Text>
                            </Box>

                            <Box display={user ? "block" : "none"}>
                                {offer ? <ViewOfferModal offer={offer} /> : <SubmitOfferModal />}
                            </Box>                        
                        </Stack>
                    </Box>
                    {user ? <TransactionCard data={transaction} /> : <SignIn /> }
                </Suspense>
            </Container>
        </>
    )
}

const TransactionCard = ({ data }) => {

    return (
        <>
            <Grid mt="10" w="full" templateColumns='repeat(12, 1fr)' gap="3">
                <GridItem colSpan="6">
                    <Card p="5" minH="full">
                        <Text color="whiteAlpha.700">General Info</Text>

                        <Divider my="2" borderColor="#2e2e2e" />                            
                    </Card>
                </GridItem>
                
                <GridItem colSpan="3">
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

