'use client'

import { Box, Button, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useSideContent } from "@/app/context/useSideContent";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/router";


export default function SettingsContent() {
    const [currentTab, setCurrentTab] = useState("");
    const { updateContent, updateTitle } = useSideContent();

    useEffect(() => {
        updateContent(<SidebarContent title="Settings" setCurrentTab={setCurrentTab} currentTab={currentTab} />);
        updateTitle("Settings")
    }, [currentTab])

    return (
        <>            
            <Box maxW="80vw" mx="auto">
                {content[currentTab]}
            </Box>
        </>
    )
}

const SidebarContent = ({ currentTab, setCurrentTab }) => {
    const router = useRouter();

    const SideButton = ({ children, tab, ...props }) => {
        let active = router.asPath.includes(tab)

        return (
            <Button size="sm" bg={active ? useColorModeValue("blackAlpha.200", "whiteAlpha.50") : "transparent"} color={active ? useColorModeValue("blackAlpha.700", "whiteAlpha.700") : useColorModeValue("blackAlpha.500", "whiteAlpha.300")}  px="2" variant="unstyled" w="full" _hover={{ textDecor: "underline", color: useColorModeValue("blackAlpha.700", "whiteAlpha.700") }} textAlign="left" {...props}>
                <Link href={href}>
                    {children}
                </Link>
            </Button>
        )
    }
    
    return (
        <>

            <ul>
                <SideButton tab="account" href="/dashboard/settings/account">Account</SideButton>
                <SideButton tab="profile" href="/dashboard/settings/profile">Profile</SideButton>
                <SideButton tab="assistants" href="/dashboard/settings/assistants">Assistants</SideButton>
                <SideButton tab="notifications" href="/dashboard/settings/notifications">Notifications</SideButton>          
            </ul>
        </>
    )
}