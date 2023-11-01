import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, IconButton, Stack, Text } from "@chakra-ui/react";
import ViewWrapper from "../components/Layout/ViewWrapper";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { AuthButtonSkeleton } from "../components/Content/Public/skeletons";
import { AiOutlineUser } from "react-icons/ai";
import Search from "../components/UI/Search";
import MobileNav from "../components/Content/Public/MobileNav";

export const dynamic = "force-dynamic";

export default async function Layout({ children }) {
    const supabase = createServerComponentClient({ cookies })

    const { data: user } = await supabase.auth.getUser();

    return (
        <Box display="flex" minH="full" flexDirection="column" bgColor="#1c1c1c">
            <Box style={{ height: "calc(100vh - 0px)", maxHeight: "calc(100vh - 0px)" }}>
                <Box display="flex" h="full">
                    <ViewWrapper>
                        <Box display={["none", "none", "none", "inline-block"]}>
                            <DesktopNav user={user} />
                        </Box>

                        <Box display={["inline-block", "inline-block", "inline-block", "none"]}>
                            <MobileNav />
                        </Box>
                        
                        {children} 
                    </ViewWrapper>
                </Box>
            </Box>
        </Box>  
    )
}

const DesktopNav = ({ user }) => {

    return (
        <Stack mb="5" direction="row" maxH="14" minH="14" px="5" borderBottomWidth="thin" borderColor="#2e2e2e" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing="5" alignItems="center">
                <Text mr="5" color="green.500" fontWeight="bold" fontSize="lg">See Through</Text>

                <Link href="/public">Home</Link>
                <Link href="public/offers">Offers</Link>
            </Stack> 
            <Suspense fallback={<AuthButtonSkeleton />}>
                {user ? 
                    <>
                        <Stack direction="row" spacing="2">
                            <Box w="96">
                                <Search />
                            </Box>
                            
                            <Box>
                                <IconButton size="sm" icon={<AiOutlineUser />} variant="solid" w="full" bg="whiteAlpha.100" colorScheme="gray" borderWidth="thin" color="whiteAlpha.800" />
                            </Box>
                        </Stack>
                    </>

                    :   
                    <>
                        <Stack direction="row" alignItems="center" spacing="2">
                            <Link href="/create-account">
                                <Button variant="solid" size="xs" w="full" bg="whiteAlpha.100" colorScheme="gray" borderWidth="thin" color="whiteAlpha.800">Create Account</Button>
                            </Link>
                            <Link href="/">
                                <Button variant="solid" size="xs" w="full" bg="green.500" colorScheme="green" borderWidth="thin" color="whiteAlpha.800">Sign In</Button>
                            </Link>
                        </Stack>
                    </>
                }
            </Suspense>
        </Stack>
    )
}