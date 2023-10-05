'use client'

import { useSideContent } from "@/app/context/useSideContent";
import { Box, IconButton, Tooltip, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineFolderOpen, AiOutlineHome, AiOutlineQuestionCircle, AiOutlineSearch, AiOutlineSend, AiOutlineSetting } from 'react-icons/ai';

export default function Sidebar() {
    const { clearSideContent } = useSideContent();

    const links = [
        {
            icon: <AiOutlineSearch />,
            title: "",
            link: "/dashboard",
            placement: "top",
        },
        {
            icon: <AiOutlineHome />,
            title: "Home",
            link: "/dashboard",
            placement: "top",
            onClick: clearSideContent
        },
        {
            icon: <AiOutlineFolderOpen />,
            title: "View All Transactions",
            link: "/dashboard/transactions/active",
            placement: "top",
        },
        {
            icon: <AiOutlineSend />,
            title: "Submit Offer",
            link: "/dashboard/submit",
            placement: "top",
        },
        {
            icon: <AiOutlineQuestionCircle />,
            title: "Help",
            link: "",
            placement: "bottom",
        },
        {
            icon: <AiOutlineSetting />,
            title: "Settings",
            link: "/dashboard/settings/account",
            placement: "bottom"
        }
    ]

    return (
        <Box>
            <Box h="full" display="flex" w="14" flexDirection="column" justifyContent="space-between" overflow="hidden" p="2" borderRightWidth="thin" borderColor={useColorModeValue("#e6e8eb", "#2e2e2e")}>
                <ul>
                    {links.map(link => {
                        if (link.placement === "top") {
                            return (
                                <>
                                    <Tooltip key={link.link} placement="right-end" label={link.title}>
                                        <Link href={link.link}>
                                            <IconButton onClick={link.onClick} my="2" fontSize="xl" variant="ghost" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} icon={link.icon} />
                                        </Link>
                                    </Tooltip>
                                </>
                            )
                        }
                    })}
                    {/* <IconButton fontSize="xl" color="cyan.700" variant="ghost" icon={<AiOutlineSearch />} />
                    
                    <Tooltip placement="right-end" label="Home">
                        <Link href="/dashboard">
                            <IconButton my="2" fontSize="xl" variant="ghost" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} icon={<AiOutlineHome />} />
                        </Link>
                    </Tooltip>

                    <Box w="full" h="0.5" bgColor={useColorModeValue("#e6e8eb", "#2e2e2e")} />

                    <Tooltip placement="right-end" label="View All Transactions">
                        <Link href="/dashboard/transactions">
                            <IconButton my="2" fontSize="xl" variant="ghost" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} icon={<AiOutlineFolderOpen />} />
                        </Link>
                    </Tooltip> */}

                    {/* <Tooltip placement="right-end" label="Create Transaction">
                        <Link href="/dashboard/transactions?createTransaction=true">
                            <IconButton  my="1" fontSize="xl" variant="ghost" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} icon={<AiOutlineFileAdd />} />
                        </Link>
                    </Tooltip> */}

                    {/* <Box w="full" h="0.5" bgColor={useColorModeValue("#e6e8eb", "#2e2e2e")} />

                    <Tooltip placement="right-end" label="Submit Offer">
                        <Link href="/dashboard/submit">
                            <IconButton my="2" fontSize="xl" variant="ghost" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} icon={<AiOutlineSend />} />
                        </Link>
                    </Tooltip> */}
                </ul>

                <ul>
                    {links.map(link => {
                        if (link.placement === "bottom") {
                            return (
                                <>
                                    <Tooltip key={link.link} placement="right-end" label={link.title}>
                                        <Link href={link.link}>
                                            <IconButton my="2" fontSize="xl" variant="ghost" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} icon={link.icon} />
                                        </Link>
                                    </Tooltip>
                                </>
                            )
                        }
                    })}
                    {/* <Tooltip placement="right-start" label="Help">
                        <IconButton my="1" fontSize="xl" variant="ghost" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} icon={<AiOutlineQuestionCircle />} />
                    </Tooltip>

                    <Tooltip placement="right-end" label="Settings">
                        <Link href="/dashboard/settings">
                            <IconButton my="2" fontSize="xl" variant="ghost" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} icon={<AiOutlineSetting />} />
                        </Link>
                    </Tooltip> */}
                </ul>
            </Box>
        </Box>
    )
}