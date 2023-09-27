'use client'

import { useSideContent } from "@/app/context/useSideContent"
import { Center, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from "@chakra-ui/react"
import { useEffect } from "react";

export default function NotificationPage() {
    const { clearSideContent } = useSideContent();

    useEffect(() => {
        clearSideContent();
    }, [])

    return (
        <Container maxW="container.xl">
            <Text fontSize="lg" fontWeight="bold" color={useColorModeValue("blackAlpha.700", "whiteAlpha.800")}>Notifications</Text>  

            <Center mt="10">
                <Text fontSize="xl" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>No new notifications...</Text>
            </Center>
        </Container>
    )
}