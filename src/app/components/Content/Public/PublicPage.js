'use client'

import { Box, Button, Center, Container, Divider, Icon, Stack, Tag, Text } from "@chakra-ui/react"
import Card from "../../UI/Card"

export default function PublicPage({ data }) {
    // const { user } = useSupabase();
    let user = true;

    return (
        <Container maxW="container.xl">
            <Box>
                <Stack direction="row" justify="space-between">
                    <Box>
                        <Text fontSize="md" color="whiteAlpha.600"><Tag colorScheme="green" textTransform="capitalize">{data.status}</Tag> ${data.price} </Text>
                        
                        <Text fontSize="xl" color="whiteAlpha.800">{data.address}</Text>
                    </Box>

                    {user && <Button w="fit-content" mt="3" variant="solid" size="sm" bg="green.500" colorScheme="green" borderWidth="thin" color="whiteAlpha.800">Submit Offer</Button>}
                </Stack>

                {!user && <SignIn />}

                {user && <></>}

                {/* {user && <TransactionCard data={data} />} */}
            </Box>
        </Container>
    )
}

const TransactionCard = ({ data }) => {

    return (
        <>
            <></>
        </>
    )
}

// const TransactionCard = ({ data }) => {

//     return (
//         <Card mt="10" w="fit-content">
//                 {/* <Box w={["full", "full", "full", "50%"]}>
//                     <Map address={data.address} />
//                 </Box> */}

//                 <Box flexDirection="column" display="flex" justifyContent="center" alignItems="center" w={["full", "full", "full", "50%"]}>
//                     <Box>
//                         <Center mb="2">
//                             <Icon fontSize="xl" textAlign="center" as={LuUser2} />
//                         </Center>
//                         <Text textAlign="center">{data.listing_agent}</Text>
//                     </Box>

//                     <Divider my="5" />

//                     <Stack direction="row" justify="space-between" w="full">

//                         <Box w="fit-content" mx="auto">
//                             <Text textAlign="center" color="whiteAlpha.700" fontSize="sm">Offers</Text>
//                             <Text textAlign="center" color="whiteAlpha.800" fontSize="xl">0</Text>

//                             <Button w="fit-content" mt="3" variant="solid" size="xs" bg="green.500" colorScheme="green" borderWidth="thin" color="whiteAlpha.800">View all</Button>

//                         </Box>

//                         <Box w="fit-content" mx="auto">
//                             <Text textAlign="center" color="whiteAlpha.700" fontSize="sm">Offers in the last 30 days</Text>
//                             <Text textAlign="center" color="whiteAlpha.800" fontSize="xl">0</Text>

//                             <Center>
//                                 <Button w="fit-content" mt="3" variant="solid" size="xs" bg="green.500" colorScheme="green" borderWidth="thin" color="whiteAlpha.800">View all</Button>
//                             </Center>
//                         </Box>

//                     </Stack>
//                 </Box>
            
//         </Card>
//     )
// }

const SignIn = () => {
    return (
        <Card display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt="10" p="10">
            <Text color="whiteAlpha.800" fontSize="lg">Please sign in to view this transaction</Text>
            <Button w="fit-content" mt="5" variant="solid" size="sm" bg="green.500" colorScheme="green" borderWidth="thin" color="whiteAlpha.800">Sign In</Button>
        </Card>
    )
}

const Map = (address) => {
    
    return (
        <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.6753634436504!2d-87.4006749235223!3d41.4028559950349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8811fab77150a427%3A0x571adfe2a4581a9d!2s${encodeURIComponent(address)}!5e0!3m2!1sen!2sus!4v1696613405289!5m2!1sen!2sus`} width="100%" height="350" style={{ border: 0, borderRadius: 5 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    )
}