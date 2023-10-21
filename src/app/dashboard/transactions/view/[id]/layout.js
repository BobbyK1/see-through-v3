'use client'

import { useSideContent } from "@/app/context/useSideContent";
import Loading from "./loading";
import { Link } from "@chakra-ui/next-js";
import { Button, ButtonGroup, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Tag, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineDown, AiOutlineEdit, AiOutlineLink } from "react-icons/ai";
import LinkModal from "@/app/components/Content/Transactions/View/LinkModal";
import PreviewModal from "@/app/components/Content/Transactions/View/PreviewModal";


export default function Layout({ children, params }) {
    const { updateContent, updateTitle } = useSideContent();
    const { onOpen, onClose, isOpen } = useDisclosure();

    useEffect(() => {
        updateContent(<SidebarContent params={params} onOpen={onOpen} />);
        updateTitle("Transaction")
    }, [])

    return (
        <>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>

        </>
    )
}

const SidebarContent = ({ params, onOpen }) => {
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
            <Stack direction="row" w="full" justify="space-between">
                <Link href="/dashboard/transactions/active">
                    <IconButton title="Back to transactions" icon={<AiOutlineArrowLeft />} />
                </Link>

                <ButtonGroup isAttached w="full" variant="solid">
                    <LinkButton params={params} />
                    <IconButton title="Edit Listing Info" icon={<AiOutlineEdit />} />

                    <Menu>
                        <MenuButton fontSize="sm" as={Button} rightIcon={<AiOutlineDown />}>
                            More
                        </MenuButton>
                        <MenuList bg="#2e2e2e">
                            <PreviewButton params={params} />
                        </MenuList>
                    </Menu>
                    
                </ButtonGroup>

            </Stack>

            <Text fontSize="sm" color="#707070" mb="3" mt="5">Transaction</Text>

            <ul>
                <SideButton tab="listing-info">Listing Information</SideButton>
                <SideButton tab="offers">Offers <Tag size="sm" ml="2" colorScheme="green">New</Tag></SideButton>
                <SideButton tab="assigned-clients">Assigned Clients</SideButton>
                <SideButton tab="settings">Settings</SideButton>            
            </ul>

            
        </>
    )
}

const PreviewButton = ({ params }) => {
    const { onOpen, onClose, isOpen } = useDisclosure();

    return (
        <>
            <MenuItem bg="#2e2e2e" _hover={{ bg: "#3e3e3e" }} onClick={onOpen}>Preview Public Page</MenuItem>

            <PreviewModal id={params.id} isOpen={isOpen} onClose={onClose} />
        </>
    )
}

const LinkButton = ({ params }) => {
    const { onOpen, onClose, isOpen } = useDisclosure();

    return (
        <>
            <IconButton title="Get sharable link" onClick={onOpen} icon={<AiOutlineLink />} />

            <LinkModal id={params.id} isOpen={isOpen} onClose={onClose} />
        </>
    )
}