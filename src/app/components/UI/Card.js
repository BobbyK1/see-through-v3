import { Box, useColorModeValue } from "@chakra-ui/react";

export default function Card({ children, ...props }) {

    return (
        <Box p="2" borderWidth="thin" bgColor={useColorModeValue("#f8f9fa", "#232323")} borderColor={useColorModeValue("#dcdcdc", "#2e2e2e")} borderRadius="5" shadow="md" {...props}>
            {children}
        </Box>
    )
}