'use server'
import { Link } from "@chakra-ui/next-js";
import { Box, Button, IconButton, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
// import Search from "../UI/Search";


export default async function Header({ children, title, rightButtons, ...props }) {

    return (
        <Stack mb="5" direction="row" maxH="14" minH="14" px="5" borderBottomWidth="thin" borderColor={useColorModeValue("#e6e8eb", "#2e2e2e")} justifyContent="space-between" alignItems="center" {...props}>
            <Stack direction="row" spacing="5" alignItems="center">
                <Text mr="5" color="green.500" fontWeight="bold" fontSize="lg">See Through</Text>

                <Link href="/" color="whiteAlpha.800">Home</Link>
                <Link href="/" color="whiteAlpha.800">Offers</Link>
            </Stack>

            <Stack direction="row" spacing="2">
                        <>
                            <Box w="96">
                                {/* <Search /> */}
                            </Box>
                        
                            <Box>
                                <IconButton size="sm" icon={<AiOutlineUser />} variant="solid" w="full" bg="whiteAlpha.100" colorScheme="gray" borderWidth="thin" color="whiteAlpha.800" />
                            </Box> 
                        </>
                    
                    <>
                        <Link href="/">
                            <Button variant="solid" size="xs" w="full" bg="whiteAlpha.100" colorScheme="gray" borderWidth="thin" color="whiteAlpha.800">Create Account</Button>
                        </Link>
                        <Link href="/">
                            <Button variant="solid" size="xs" w="full" bg="green.500" colorScheme="green" borderWidth="thin" color="whiteAlpha.800">Sign In</Button>
                        </Link>
                    </>

                {/* <Link href="/dashboard/notifications">
                    <Tooltip placement="bottom" label="Notifications">
                        <IconButton color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} my="1" fontSize="xl" variant="ghost" icon={<AiOutlineBell />} />
                    </Tooltip>
                </Link> */}
                
                {/* <ProfileMenu /> */}
            </Stack>
        </Stack>
    )
}

// const ProfileMenu = () => {
//     const { colorMode, setColorMode } = useColorMode();
//     const { signOut } = useSupabase();

//     return (
//         <Menu>
//             <Tooltip placement="bottom" label="Profile">
//                 <MenuButton color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} as={IconButton} my="1" fontSize="xl" variant="ghost"  icon={<AiOutlineUser />} />
//             </Tooltip>

//             <MenuList borderColor={useColorModeValue("blackAlpha.400", "#3e3e3e")} bg={useColorModeValue("white", "#2e2e2e")}>
//                 <Link href="/dashboard/settings/profile">
//                     <MenuItem _hover={{ bg: useColorModeValue("blackAlpha.100", "#3e3e3e") }} bg={useColorModeValue("white", "#2e2e2e")}>Profile</MenuItem>
//                 </Link>

//                 <MenuDivider />

//                 <MenuOptionGroup value={colorMode} title="Appearance" type="radio">
//                     <MenuItemOption onClick={() => setColorMode("dark")} value="dark" _hover={{ bg: useColorModeValue("blackAlpha.100", "#3e3e3e") }} bg={useColorModeValue("white", "#2e2e2e")}>Dark</MenuItemOption>
//                     <MenuItemOption onClick={() => setColorMode("light")} value="light" _hover={{ bg: useColorModeValue("blackAlpha.100", "#3e3e3e") }} bg={useColorModeValue("white", "#2e2e2e")}>Light</MenuItemOption>
//                 </MenuOptionGroup>

//                 <MenuDivider />

//                 <MenuItem as="button" onClick={signOut} _hover={{ bg: useColorModeValue("blackAlpha.100", "#3e3e3e") }} bg={useColorModeValue("white", "#2e2e2e")}>Log Out</MenuItem>
//             </MenuList>
//         </Menu>
//     )
// }