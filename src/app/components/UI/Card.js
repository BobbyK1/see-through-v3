import { Box, useColorModeValue } from "@chakra-ui/react";

export default function Card({ children, ...props }) {

    return (
        <Box p="2" borderWidth="thin" bgColor="#232323" borderColor="#2e2e2e" borderRadius="5" shadow="md" {...props}>
            {children}
        </Box>
    )
}