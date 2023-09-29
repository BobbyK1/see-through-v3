import Card from "@/app/components/UI/Card";
import { Text, useColorModeValue } from "@chakra-ui/react";


export default function ListingInfo ({ address }) {

    return (
        <>
            <Text fontSize="lg" fontWeight="bold" mt="5" color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")}>{address}</Text>

            <Card mt="7" px="10" py="7">
                
            </Card>    
        </>
    )
}

