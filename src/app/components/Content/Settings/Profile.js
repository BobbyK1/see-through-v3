'use client'

import { Avatar, Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Icon, Input, SimpleGrid, Stack, Text, Textarea, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Card from "../../UI/Card";
import SmallButton from "../../UI/Button";

const Profile = ({ profile }) => {
    const [bio, setBio] = useState("");
    const {onOpen, isOpen, onClose} = useDisclosure();

    return (
        <>
            <Text fontSize="lg" fontWeight="bold" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")}>Account Settings</Text>

            <Card mt="7" px="10" py="7">
                <Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>Your Public Profile</Text>
                <Stack direction="row" justify="space-between" mt="10" alignItems="center">
                    <Box>
                        <Stack direction="row" alignItems="center">
                            <Avatar name={`${profile.first_name} ${profile.last_name}`} color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} bg={useColorModeValue("blackAlpha.200", "#1e1e1e")} size="lg" />
                            <Box>
                                <Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>{profile.first_name} {profile.last_name}</Text>
                                <Text fontSize="sm" color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}>Broker Agent</Text>
                                <Text fontSize="sm" color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}>NIRA</Text>
                            </Box>
                        </Stack>
                    </Box>

                    <SmallButton size="sm" borderColor={useColorModeValue("blackAlpha.200", "#3e3e3e")}>Edit</SmallButton>
                </Stack>

                <Box mt="10" w="full">
                    <Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>Bio</Text>
                    <Textarea color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} maxLength={1000} resize="none" h="40" mt="4" onChange={(e) => setBio(e.target.value)} borderColor={useColorModeValue("blackAlpha.500", "#3e3e3e")} />
                    <Box w="fit-content" ml="auto">
                        <Text as="span" fontSize="xs" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>{bio.length}/1000</Text>
                    </Box>
                </Box>

                <Divider my="5" borderColor={useColorModeValue("blackAlpha.400", "#3e3e3e")} />

                <Box w="full">
                    <SimpleGrid columns="2" alignItems="center">
                        <Box>
                            <Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>Brokerage Information</Text>
                            <SimpleGrid columns="2" mt="10" spacing="5">
                                <FormControl>
                                    <FormLabel color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} fontSize="sm">Brokerage Name</FormLabel>
                                    <Input type="text" borderColor={useColorModeValue("blackAlpha.500", "#3e3e3e")} variant="outline" bg={useColorModeValue("white", "#2a2929")} isDisabled defaultValue="Haven Realty Homes" />
                                </FormControl>

                                <Box />

                                <FormControl>
                                    <FormLabel color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} fontSize="sm">Street Address</FormLabel>
                                    <Input type="text" borderColor={useColorModeValue("blackAlpha.500", "#3e3e3e")} variant="outline" bg={useColorModeValue("white", "#2a2929")} isDisabled defaultValue="8430 Wicker Ave."/>
                                </FormControl>

                                <FormControl>
                                    <FormLabel color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} fontSize="sm">City</FormLabel>
                                    <Input type="text" borderColor={useColorModeValue("blackAlpha.500", "#3e3e3e")} variant="outline" bg={useColorModeValue("white", "#2a2929")} isDisabled defaultValue="St. John"/>
                                </FormControl>

                                <FormControl>
                                    <FormLabel color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} fontSize="sm">State</FormLabel>
                                    <Input type="text" borderColor={useColorModeValue("blackAlpha.500", "#3e3e3e")} variant="outline" bg={useColorModeValue("white", "#2a2929")} isDisabled defaultValue="IN" />
                                </FormControl>

                                <FormControl>
                                    <FormLabel color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")} fontSize="sm">Zip</FormLabel>
                                    <Input type="text" borderColor={useColorModeValue("blackAlpha.500", "#3e3e3e")} variant="outline" bg={useColorModeValue("white", "#2a2929")} isDisabled defaultValue="46373" />
                                </FormControl>
                            </SimpleGrid>
                        </Box>
                        <SmallButton borderColor={useColorModeValue("blackAlpha.200", "#3e3e3e")} size="sm" w="fit-content" ml="auto">Edit</SmallButton>
                    </SimpleGrid>
                </Box>

                <Divider my="5" borderColor={useColorModeValue("blackAlpha.400", "#3e3e3e")} />

                <Box>
                    <Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>License Information</Text>

                    <SimpleGrid columns="5" mt="10" spacing="4">

                        <Box minH="40" onClick={onOpen} p="5" borderColor={useColorModeValue("none", "#3e3e3e")} borderWidth="thin" borderRadius="5" transition="0.2s ease" _hover={{ cursor: "pointer", bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200") }}>

                            <Stack minH="40" direction="column" alignItems="center" w="fit-content" mx="auto" justifyContent="center">
                                <Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>License #: RB20000800</Text>
                                <Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>Indiana</Text>
                            </Stack>

                        </Box>

                        <Box minH="40" onClick={onOpen} p="5" borderColor={useColorModeValue("none", "#3e3e3e")} borderWidth="thin" borderRadius="5" transition="0.2s ease" _hover={{ cursor: "pointer", bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200") }}>

                            <Stack minH="40" direction="row" alignItems="center" w="fit-content" mx="auto" alignSelf="center">
                                <Icon as={AiOutlinePlus} />
                                <Text fontSize="md" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>Add License</Text>
                            </Stack>

                        </Box>
                    </SimpleGrid>
                </Box>
                
            </Card>    

            <AddLicenseDrawer isOpen={isOpen} onClose={onClose} />    
        </>
    )
}

const AddLicenseDrawer = ({ isOpen, onClose }) => {

    return (
        <Drawer size="lg" isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bgColor={useColorModeValue("#f8f9fa", "#1c1c1c")} color={useColorModeValue("blackAlpha.800", "whitesmoke")}>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Box display="flex" flexDir="row" alignItems="center">
                        <Text mr="2">Add License</Text>
                    </Box>
                </DrawerHeader>
                <Divider borderColor="#2e2e2e" h="0.5" />
                <DrawerBody p="0">
                    <Box mt="5" px="5">
                        <Stack direction="row" justify="space-between" alignItems="center">
                            <Text color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>Licnese Number</Text>
                            <Input w="80" type="text" borderColor={useColorModeValue("blackAlpha.500", "#3e3e3e")} bg={useColorModeValue("white", "#2a2929")} />
                        </Stack>

                        <Stack direction="row" justify="space-between" alignItems="center" mt="10">
                            <Text color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>State of Licensure</Text>
                            <Input w="80" type="text" borderColor={useColorModeValue("blackAlpha.500", "#3e3e3e")} bg={useColorModeValue("white", "#2a2929")} />
                        </Stack>
                    </Box>
                </DrawerBody>
                <DrawerFooter>
                    <Button mr="2" variant="solid" size="sm"  borderColor={useColorModeValue("blackAlpha.200", "#3e3e3e")} borderWidth="thin" p="3" onClick={onClose}>Close</Button>
                    <Button variant="solid" size="sm" bgColor="green.500" borderColor={useColorModeValue("", "green.800")} borderWidth="thin" colorScheme="green" p="3">Submit</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default Profile;