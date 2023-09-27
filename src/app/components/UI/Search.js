'use client'

import { Button, Input, InputGroup, InputLeftAddon, Select, useColorModeValue } from "@chakra-ui/react";

export default function Search({ ...props }) {

    return (
        <InputGroup>
            {/* <InputLeftAddon bg={useColorModeValue("blackAlpha.50", "#2a2929")} px="0" borderColor={useColorModeValue("blackAlpha.400", "#3e3e3e")} children={<SearchTypeSelect />} /> */}
            <Input size="sm" bg={useColorModeValue("blackAlpha.50", "#2a2929")} w="full"  borderColor={useColorModeValue("blackAlpha.400", "#3e3e3e")} placeholder="Search by address or MLS ID..." _placeholder={{ color: useColorModeValue("blackAlpha.700", "whiteAlpha.700")}} {...props}  />
        </InputGroup>
    )
}

const SearchTypeSelect = () => {

    return (
        <Select size="sm" defaultValue="option1" border="none" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>
            <option bg="#2a2929" value='option1'>Active Listings</option>
            <option value='option2'>Your Transactions</option>
        </Select>
    )
}