'use client'

import { Box, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, Stack, Text, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import Search from "../../UI/Search";

const MobileNav = ({ user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>

            <Stack mb="5" direction="row" w="full" maxH="14" minH="14" px="5" borderBottomWidth="thin" borderColor="#2e2e2e" justifyContent="space-between" alignItems="center">
                
                    <Text mr="5" color="green.500" fontWeight="bold" fontSize="lg">See Through</Text>

                    <IconButton onClick={onOpen} colorScheme="gray" icon={<AiOutlineMenu />} />
            </Stack>
            

            <Drawer isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />

                <DrawerContent bg="#1c1c1c">
                    <DrawerCloseButton />

                    <DrawerHeader />

                    <DrawerBody>
                        <Link onClick={onClose} href="/client">
                            <Box p="3" w="full">
                                <Text color="whiteAlpha.800">Home</Text>
                            </Box>
                        </Link>

                        <Divider my="2" borderColor="#3e3e3e" />

                        <Link onClick={onClose} href="/client/transactions">
                            <Box p="3" w="full">
                                <Text color="whiteAlpha.800">Transactions</Text>
                            </Box>
                        </Link>

                        <Divider my="2" borderColor="#3e3e3e" />

                        <Link onClick={onClose} href="/client/profile">
                            <Box p="3" w="full">
                                <Text color="whiteAlpha.800">Profile</Text>
                            </Box>
                        </Link>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default MobileNav;