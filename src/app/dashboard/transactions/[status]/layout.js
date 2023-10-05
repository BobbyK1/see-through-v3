'use client'

import TransactionDrawer from "@/app/components/Content/Transactions/TransactionsDrawer";
import { useSideContent } from "@/app/context/useSideContent";
import { Link } from "@chakra-ui/next-js";
import { Button, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


export default function Layout({ children }) {
    const { updateContent, updateTitle } = useSideContent();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        updateContent(<SidebarContent onOpen={onOpen} />);
        updateTitle("Transactions")
    }, [])

    return (
        <>
            {children}

            <TransactionDrawer isOpen={isOpen} onClose={onClose} />
        </>
    )
}

const SidebarContent = ({ onOpen }) => {
    const router = usePathname();

    const SideButton = ({ children, tab, href, ...props }) => {
        let active = router.includes(tab);

        return (
            <Link href={href}>
                <Button size="sm" bg={active ? useColorModeValue("blackAlpha.200", "whiteAlpha.50") : "transparent"} color={active ? useColorModeValue("blackAlpha.700", "whiteAlpha.700") : useColorModeValue("blackAlpha.500", "whiteAlpha.300")}  px="2" variant="unstyled" w="full" _hover={{ textDecor: "underline", color: useColorModeValue("blackAlpha.700", "whiteAlpha.700") }} textAlign="left" {...props}>
                    {children}
                
                </Button>
            </Link>
        )
    }
    
    return (
        <>
            <Button size="sm" w="full" mb="5" color={useColorModeValue("white", "whiteAlpha.800")} onClick={onOpen} mt="2" colorScheme="green" bgColor="green.600">Create Transaction</Button>

            <Text fontSize="sm" color="#707070" mb="3" mt="5">Status</Text>

            <ul>
                <SideButton tab="active" href="/dashboard/transactions/active">Active</SideButton>
                <SideButton tab="under-contract" href="/dashboard/transactions/under-contract">Under Contract</SideButton>
                <SideButton tab="pending" href="/dashboard/transactions/pending">Pending</SideButton>
                <SideButton tab="closed" href="/dashboard/transactions/closed">Closed</SideButton>   
                <SideButton tab="draft" href="/dashboard/transactions/draft">Draft</SideButton>         
            </ul>
        </>
    )
}