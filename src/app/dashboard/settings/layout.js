'use client'

import { useSideContent } from "@/app/context/useSideContent";
import { Link } from "@chakra-ui/next-js";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


export default function SettingsLayout({ children }) {
    const { updateContent, updateTitle, clearSideContent } = useSideContent();

    useEffect(() => {
        clearSideContent();
        updateContent(<SidebarContent title="Settings" />);
        updateTitle("Settings")
    }, [])

    return (
        <>
            {children}
        </>
    )
}

const SidebarContent = () => {
    const router = usePathname();

    const SideButton = ({ children, tab, href, ...props }) => {
        let active = router.includes(tab);

        return (
            <Link w="full" textDecor="none" href={href}>
                <Button size="sm" bg={active ? useColorModeValue("blackAlpha.200", "whiteAlpha.50") : "transparent"} color={active ? useColorModeValue("blackAlpha.700", "whiteAlpha.800") : useColorModeValue("blackAlpha.500", "whiteAlpha.500")}  px="2" variant="unstyled" w="full" _hover={{ textDecor: "underline", color: useColorModeValue("blackAlpha.700", "whiteAlpha.700") }} textAlign="left" {...props}>
                    {children}
                </Button>
            </Link>
        )
    }
    
    return (
        <>

            <ul>
                <SideButton tab="account" href="/dashboard/settings/account">Account</SideButton>
                <SideButton tab="profile" href="/dashboard/settings/profile">Profile</SideButton>
                {/* <SideButton tab="assistants" href="/dashboard/settings/assistants">Assistants</SideButton> */}
                <SideButton tab="notifications" href="/dashboard/settings/notifications">Notifications</SideButton>          
            </ul>
        </>
    )
}