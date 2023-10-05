'use client'

import Card from "@/app/components/UI/Card";
import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function Page() {
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