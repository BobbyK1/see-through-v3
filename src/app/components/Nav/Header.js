import { useSupabase } from "@/app/context/SupabaseProvider";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Stack, Text, Tooltip, useColorMode } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import Search from "../ui/Search";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";


export default function Header({ children, title, rightButtons, ...props }) {

    return (
        <Stack mb="5" direction="row" maxH="14" minH="14" px="5" borderBottomWidth="thin" borderColor="#2e2e2e" justifyContent="space-between" alignItems="center" {...props}>
            {/* <Search maxW="96" /> */}
            <Box />
            <Stack direction="row" spacing="2">
                {/* <Button onClick={toggleColorMode}>Toggle</Button> */}

                <Link href="/dashboard/notifications">
                    <Tooltip placement="bottom" label="Notifications">
                        <IconButton color="whiteAlpha.700" my="1" fontSize="xl" variant="ghost" icon={<AiOutlineBell />} />
                    </Tooltip>
                </Link>
                
                <ProfileMenu />
            </Stack>
        </Stack>
    )
}

const ProfileMenu = () => {
    const { colorMode, setColorMode } = useColorMode();
    const { signOut } = useSupabase();

    return (
        <Menu>
            <Tooltip placement="bottom" label="Profile">
                <MenuButton color="whiteAlpha.700" as={IconButton} my="1" fontSize="xl" variant="ghost"  icon={<AiOutlineUser />} />
            </Tooltip>

            <MenuList borderColor="#3e3e3e" bg="#2e2e2e">
                <Link href="/dashboard/settings/profile">
                    <MenuItem _hover={{ bg: "#3e3e3e" }} bg="#2e2e2e">Profile</MenuItem>
                </Link>

                <MenuDivider />

                <MenuOptionGroup value={colorMode} title="Appearance" type="radio">
                    <MenuItemOption onClick={() => setColorMode("dark")} value="dark" _hover={{ bg: "#3e3e3e"}} bg="#2e2e2e">Dark</MenuItemOption>
                    <MenuItemOption onClick={() => setColorMode("light")} value="light" _hover={{ bg: "#3e3e3e" }} bg="#2e2e2e">Light</MenuItemOption>
                </MenuOptionGroup>

                <MenuDivider />

                <MenuItem as="button" onClick={signOut} _hover={{ bg: "#3e3e3e" }} bg="#2e2e2e">Log Out</MenuItem>
            </MenuList>
        </Menu>
    )
}