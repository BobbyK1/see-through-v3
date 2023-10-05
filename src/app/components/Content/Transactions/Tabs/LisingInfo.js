'use client'

import Card from "@/app/components/UI/Card";
import { Text, useColorModeValue } from "@chakra-ui/react";


export default function ListingInfo ({ data }) {

    return (
        <>
            <Text fontSize="lg" fontWeight="bold" mt="5" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")}>{data.address}</Text>

            <Card mt="7" px="10" py="7">
                
            </Card>    
        </>
    )
}

