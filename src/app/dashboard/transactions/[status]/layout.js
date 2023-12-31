'use client'

import TransactionDrawer from "@/app/components/Content/Transactions/TransactionsDrawer";
import { useSideContent } from "@/app/context/useSideContent";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, ButtonGroup, IconButton, Input, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import Loading from "./loading";
import { AiOutlineFileAdd } from "react-icons/ai";


export default function Layout({ children }) {
    const { updateContent, updateTitle } = useSideContent();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        updateContent(<SidebarContent onOpen={onOpen} />);
        updateTitle("Transactions")
    }, [])

    return (
        <>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>

            <TransactionDrawer isOpen={isOpen} onClose={onClose} />
        </>
    )
}

const SidebarContent = ({ onOpen }) => {
    const path = usePathname();
    const router = useRouter();

    const SideButton = ({ children, tab, href, ...props }) => {
        let active = path.includes(tab);

        return (
            <Link href={href}>
                <Button size="sm" bg={active ? "whiteAlpha.50" : "transparent"} color={active ? "whiteAlpha.800" : "whiteAlpha.500"}  px="2" variant="unstyled" w="full" _hover={{ textDecor: "underline", color: "whiteAlpha.700" }} textAlign="left" {...props}>
                    {children}
                </Button>
            </Link>
        )
    }
    
    return (
        <>
            <Box>
                <Stack direction="row" spacing="2">
                    <IconButton title="Create Transaction" colorScheme="gray" bg="#2e2e2e" color="whiteAlpha.800" _hover={{ bg: "#3e3e3e" }} icon={<AiOutlineFileAdd />} onClick={onOpen} />
                    <Input borderColor="#3e3e3e" bgColor="#2a2929" _placeholder={{ color: "whiteAlpha.400" }} color="whiteAlpha.800" placeholder="Search..." />
                </Stack>
                <ButtonGroup isAttached w="full" variant="solid">
                    
                </ButtonGroup>
            </Box>

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