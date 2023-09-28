import { Box, Center, Spinner, Text, useColorModeValue } from "@chakra-ui/react"


export default function LoadingPage() {

    return (
        <Box w="full" h="100vh" bgColor={useColorModeValue("#f8f9fa", "#1c1c1c")}>
            <Center pt="20" flexDirection="column">
                <Text fontSize="3xl" color={useColorModeValue("blackAlpha.800", "whiteAlpha.700")}>Getting things ready...</Text>
                <Spinner mt="5" color="green.600" size="xl" />
            </Center>
        </Box>
    )
}