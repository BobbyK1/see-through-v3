'use client'

import { Input, InputGroup } from "@chakra-ui/react";

export default function Search({ ...props }) {

    return (
        <InputGroup>
            {/* <InputLeftAddon bg={useColorModeValue("blackAlpha.50", "#2a2929")} px="0" borderColor={useColorModeValue("blackAlpha.400", "#3e3e3e")} children={<SearchTypeSelect />} /> */}
            <Input size="sm" bg="#2a2929" w="full"  borderColor="#3e3e3e" placeholder="Search by address or MLS ID..." _placeholder={{ color: "whiteAlpha.700" }} {...props}  />
        </InputGroup>
    )
}