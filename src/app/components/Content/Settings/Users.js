'use client'

import { Avatar, Box, IconButton, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react"
import { AiOutlinePlus } from "react-icons/ai"


export default function Users() {

    return (
        <>
            <Box>
                <Stack direction="row" justify="space-between" alignItems="center">
                    <Box>
                        <Text fontSize="lg" fontWeight="bold" color={useColorModeValue("blackAlpha.700", "whiteAlpha.800")}>Assistant Users</Text>

                        <Text fontSize="md" color={useColorModeValue("blackAlpha.600", "whiteAlpha.700")}>Maximum of 2</Text>
                    </Box>
                </Stack>
                

                <TableContainer mt="10">
                    <Table variant="unstyled">
                        <Thead color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>
                            <Tr borderWidth="thin" borderColor={useColorModeValue("none", "#2e2e2e")} borderTopRightRadius="10" borderTopLeftRadius="10" bgColor={useColorModeValue("blackAlpha.200", "#2a2929")}>
                                <Th>User</Th>
                                <Th>Email</Th>
                            </Tr>
                        </Thead>
                        <Tbody>

                            <Tr>
                                <Td>
                                    <Stack direction="row" alignItems="center">
                                        <Avatar bgColor={useColorModeValue("blackAlpha.200", "#2a2929")} color={useColorModeValue("blackAlpha.700", "whitesmoke")} name="Jane Doe" />
                                        <Box>
                                            <Text fontSize="sm">Jane Doe</Text>
                                        </Box>
                                    </Stack>
                                </Td>
                                <Td>
                                    <Text fontSize="sm" color="whiteAlpha.700">jane.doe@havenrealtyhomes.com</Text>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
                <Box w="fit-content" mx="auto" mt="5">
                    <IconButton rounded="full" colorScheme="green" icon={<AiOutlinePlus />} />
                </Box>
            </Box>
        </>
    )
}