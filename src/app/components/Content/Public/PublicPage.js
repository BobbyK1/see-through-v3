'use client'

import { Box, Button, Center, Container, Divider, Flex, Grid, GridItem, Icon, Spinner, Stack, Tag, Text, useDisclosure } from "@chakra-ui/react"
import Card from "../../UI/Card"
import { useSupabase } from "@/app/context/SupabaseProvider";
import { Link } from "@chakra-ui/next-js";
import { useEffect, useState } from "react";
import SubmitOfferModal from "./SubmitModal";
import ViewOfferModal from "./ViewOfferModal";

export default function PublicPage({ data, offer }) {
    const { user, authLoading } = useSupabase();
    const [url, setUrl] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        return setUrl(encodeURIComponent(window.location.href));
    }, [])

    return (
        <Container maxW="container.xl">
            <Box>
                <Stack direction="row" justify="space-between">
                    <Box>
                        <Text fontSize="md" color="whiteAlpha.600"><Tag colorScheme="green" textTransform="capitalize">{data.status}</Tag> ${data.price} </Text>
                        
                        <Text fontSize="xl" color="whiteAlpha.800">{data.address}</Text>
                    </Box>

                    {user && offer ? <Button onClick={onOpen} w="fit-content" mt="3" variant="solid" size="sm" bg="green.500" colorScheme="green" borderWidth="thin" color="whiteAlpha.800">View Offer</Button> : <Button onClick={onOpen} w="fit-content" mt="3" variant="solid" size="sm" bg="green.500" colorScheme="green" borderWidth="thin" color="whiteAlpha.800">Submit Offer</Button>}
                </Stack>

                {authLoading ? <Center mt="10"><Spinner color="green.500" /></Center> : !user ? <SignIn url={url} /> : <TransactionCard data={data} />}
            </Box>
            {offer ? <ViewOfferModal isOpen={isOpen} onClose={onClose} offer={offer} /> : <SubmitOfferModal onClose={onClose} isOpen={isOpen} />}
        </Container>
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

const SignIn = ({ url }) => {
    return (
        <Card display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt="10" p="10">
            <Text color="whiteAlpha.800" fontSize="lg">Please sign in to view this transaction</Text>

            <Link href={`/?continue=${encodeURIComponent(url)}`}>
                <Button w="fit-content" mt="5" variant="solid" size="sm" bg="green.500" colorScheme="green" borderWidth="thin" color="whiteAlpha.800">Sign In</Button>
            </Link>
        </Card>
    )
}

const Map = (address) => {
    
    return (
        <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.6753634436504!2d-87.4006749235223!3d41.4028559950349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8811fab77150a427%3A0x571adfe2a4581a9d!2s${encodeURIComponent(address)}!5e0!3m2!1sen!2sus!4v1696613405289!5m2!1sen!2sus`} width="100%" height="350" style={{ border: 0, borderRadius: 5 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    )
}