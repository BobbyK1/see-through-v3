'use client'

import { Box, IconButton, Tooltip, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineFileAdd, AiOutlineFolderOpen, AiOutlineHome, AiOutlineQuestionCircle, AiOutlineSearch, AiOutlineSend, AiOutlineSetting, AiOutlineUser, AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai';

export default function Sidebar() {

    return (
        <Box>
            <Box h="full" display="flex" w="14" flexDirection="column" justifyContent="space-between" overflow="hidden" p="2" borderRightWidth="thin" borderColor={useColorModeValue("#e6e8eb", "#2e2e2e")}>
                <ul>
                    <IconButton fontSize="xl" color="cyan.700" variant="ghost" icon={<AiOutlineSearch />} />
                    
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
                    </Tooltip>

                    <Tooltip placement="right-end" label="Create Transaction">
                        <Link href="/dashboard/transactions?createTransaction=true">
                            <IconButton  my="1" fontSize="xl" variant="ghost" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} icon={<AiOutlineFileAdd />} />
                        </Link>
                    </Tooltip>

                    <Box w="full" h="0.5" bgColor={useColorModeValue("#e6e8eb", "#2e2e2e")} />

                    <Tooltip placement="right-end" label="Submit Offer">
                        <Link href="/dashboard/transactions/submit">
                            <IconButton my="2" fontSize="xl" variant="ghost" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} icon={<AiOutlineSend />} />
                        </Link>
                    </Tooltip>
                </ul>

                <ul>
                    <Tooltip placement="right-start" label="Help">
                        <IconButton my="1" fontSize="xl" variant="ghost" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} icon={<AiOutlineQuestionCircle />} />
                    </Tooltip>

                    <Tooltip placement="right-end" label="Settings">
                        <Link href="/dashboard/settings">
                            <IconButton my="2" fontSize="xl" variant="ghost" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} icon={<AiOutlineSetting />} />
                        </Link>
                    </Tooltip>
                </ul>
            </Box>
        </Box>
    )
}