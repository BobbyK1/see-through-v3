import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../UI/Card";

const Account = () => {
    return (
        <>
            <Text fontSize="lg" fontWeight="bold" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")}>Account Settings</Text>

            <Card mt="7" px="10" py="7">
                <Stack direction="row" w="full">
                    <Text fontSize="md" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")}>General Info</Text>

                    <Box>
                    
                    </Box>
                </Stack>
            </Card>
        </>
    )
}

export default Account;