'use client'

import { useSideContent } from "@/app/context/useSideContent";
import { Link } from "@chakra-ui/next-js";
import { Button, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


export default function Layout({ children, params }) {
    const { updateContent, updateTitle } = useSideContent();

    useEffect(() => {
        updateContent(<SidebarContent params={params} />);
        updateTitle("Transaction")
    }, [])

    return (
        <>
            {children}
        </>
    )
}

const SidebarContent = ({ params }) => {
    const router = usePathname();

    

    const SideButton = ({ children, tab, ...props }) => {
        let active = router.includes(tab);

        return (
            <Link href={`/dashboard/transactions/view/${params.id}/${tab}`}>
                <Button size="sm" bg={active ? useColorModeValue("blackAlpha.200", "whiteAlpha.50") : "transparent"} color={active ? useColorModeValue("blackAlpha.700", "whiteAlpha.800") : useColorModeValue("blackAlpha.500", "whiteAlpha.500")} fontSize="sm"  px="2" variant="unstyled" w="full" _hover={{ textDecor: "underline", color: useColorModeValue("blackAlpha.700", "whiteAlpha.700") }} textAlign="left" {...props}>{children}</Button>
            </Link>
        ) 
    }
    
    return (
        <>
            <Link href="/dashboard/transactions/active">
                <Button mr="5" size="sm" w="full" mt="2">Back</Button>
            </Link>

            <Text fontSize="sm" color="#707070" mb="3" mt="5">Transaction</Text>

            <ul>
                <SideButton tab="listing-info">Listing Information</SideButton>
                <SideButton tab="tasks">Tasks</SideButton>
                <SideButton tab="offers">Offers <Tag size="sm" ml="2" colorScheme="green">New</Tag></SideButton>
                <SideButton tab="assigned-clients">Assigned Clients</SideButton>
                <SideButton tab="settings">Settings</SideButton>            
            </ul>
        </>
    )
}