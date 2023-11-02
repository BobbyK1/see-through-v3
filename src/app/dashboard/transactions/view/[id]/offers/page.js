import Card from "@/app/components/UI/Card";
import { Offer } from "@/app/components/UI/Icons";
import { Center, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers';
import Link from "next/link";

export const dynamic = 'force-dynamic'

async function GetOffers(supabase, id) {
    const { data: offers, error } = await supabase.from('offers').select("*").eq("transaction_id", id);

    if (error) throw new Error(error.message);

    return offers;
}

export default async function Page({ params }) {
    const supabase = createServerComponentClient({ cookies });
    
    const offers = await GetOffers(supabase, params.id)

    return (
        <>
            <Tabs mx="auto" colorScheme="green" p="0">
                <TabList>
                    <Tab>Not Viewed</Tab>
                    <Tab>Viewed</Tab>
                    <Tab>All</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel p="0" pt="5">
                        <Grid templateColumns="repeat(12, 1fr)">
                            {offers.map(offer => {
                                const formattedDateTime = new Date(offer.created_at).toLocaleString();;
                                const [date, time] = formattedDateTime.split(', ');

                                return (
                                    <GridItem colSpan="3">
                                        <Link href="/">
                                            <Card transition="0.1s ease" _hover={{ cursor: "pointer", bgColor: "#2e2e2e" }} p="5">
                                                <Text textAlign="center" fontSize="sm" color="whiteAlpha.700">Not Viewed</Text>
                                                <Center my="3">
                                                    <Offer color="green.500" fontSize="4xl" />
                                                </Center>
                                                <Text fontSize="sm" color="whiteAlpha.700" textAlign="center">Submitted by Bobby Karamacoski</Text>
                                                <Text fontSize="sm" mt="2" color="whiteAlpha.700" textAlign="center">{date} at {time}</Text>
                                            </Card>
                                        </Link>
                                    </GridItem>
                                )
                            })}
                        </Grid>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            
        </>
    )
}