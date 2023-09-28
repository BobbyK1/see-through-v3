'use client'

import { useSideContent } from "@/app/context/useSideContent";
import { Button, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "../../UI/Card";


export default function ViewTransaction({ data }) {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState('listingInfo');
    const { updateTitle, updateContent } = useSideContent();

    useEffect(() => {
        updateContent(<SidebarContent setCurrentTab={setCurrentTab} currentTab={currentTab} router={router} />)
        updateTitle("Transaction");
    }, [currentTab])

    const content = {
        "listingInfo": <ListingInfo address={data.address} />,
        "offers": <Offers />,
        "assignedClients": "assignedClients",
        "settings": "settings",
        "tasks": "tasks"
    }

    return (
        <>
            {content[currentTab]}
        </>
    )
}

const ListingInfo = ({ address }) => {

    return (
        <>
            <Text fontSize="lg" fontWeight="bold" mt="5" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")}>{address}</Text>

            <Card mt="7" px="10" py="7">
                
            </Card>    
        </>
    )
}

const Offers = () => {

    return (
        <>
            <Text fontSize="lg" fontWeight="bold" mt="5" color="whiteAlpha.800">Offers</Text>

            
            <Text color="whiteAlpha.700" mt="10">No Offers Yet...</Text>
        </>
    )
}

const SidebarContent = ({ currentTab, setCurrentTab, router }) => {

    const SideButton = ({ children, tab, ...props }) => {
        let active = currentTab === tab ? true : false;

        return <Button size="sm" bg={active ? useColorModeValue("blackAlpha.200", "whiteAlpha.50") : "transparent"} color={active ? useColorModeValue("blackAlpha.700", "whiteAlpha.700") : useColorModeValue("blackAlpha.500", "whiteAlpha.300")} fontSize="sm"  px="2" variant="unstyled" w="full" _hover={{ textDecor: "underline", color: useColorModeValue("blackAlpha.700", "whiteAlpha.700") }} textAlign="left" {...props}>{children}</Button>
    }
    
    return (
        <>
            <Button mr="5" size="sm" w="full" mt="2" onClick={() => router.push('/dashboard/transactions')}>Back</Button>

            <Text fontSize="sm" color="#707070" mb="3" mt="5">Transaction</Text>

            <ul>
                <SideButton tab="listingInfo" onClick={() => setCurrentTab("listingInfo")}>Listing Information</SideButton>
                <SideButton tab="tasks" onClick={() => setCurrentTab("tasks")}>Tasks</SideButton>
                <SideButton tab="offers" onClick={() => setCurrentTab("offers")}>Offers <Tag size="sm" ml="2" colorScheme="green">New</Tag></SideButton>
                <SideButton tab="assignedClients" onClick={() => setCurrentTab("assignedClients")}>Assigned Clients</SideButton>
                <SideButton tab="settings" onClick={() => setCurrentTab("settings")}>Settings</SideButton>            
            </ul>
        </>
    )
}