'use client'

import { Box, Button, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Account from "./Account";
import Profile from "./Profile";
import Users from "./Users";
import { useSideContent } from "@/app/context/useSideContent";


export default function SettingsContent() {
    const [currentTab, setCurrentTab] = useState("account");
    const { updateContent, updateTitle } = useSideContent();

    const content = {
        "account": <Account />,
        "profile": <Profile />,
        "assistants": <Users />
    }

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

    const SideButton = ({ children, tab, ...props }) => {
        let active = currentTab === tab ? true : false;

        return <Button size="sm" bg={active ? useColorModeValue("blackAlpha.200", "whiteAlpha.50") : "transparent"} color={active ? useColorModeValue("blackAlpha.700", "whiteAlpha.700") : useColorModeValue("blackAlpha.500", "whiteAlpha.300")}  px="2" variant="unstyled" w="full" _hover={{ textDecor: "underline", color: useColorModeValue("blackAlpha.700", "whiteAlpha.700") }} textAlign="left" {...props}>{children}</Button>
    }
    
    return (
        <>

            <ul>
                <SideButton tab="account" onClick={() => {setCurrentTab("account")}}>Account</SideButton>
                <SideButton tab="profile" onClick={() => setCurrentTab("profile")}>Profile</SideButton>
                <SideButton tab="assistants" onClick={() => setCurrentTab("assistants")}>Assistants</SideButton>
                <SideButton tab="notifications" onClick={() => setCurrentTab("notifications")}>Notifications</SideButton>          
            </ul>
        </>
    )
}