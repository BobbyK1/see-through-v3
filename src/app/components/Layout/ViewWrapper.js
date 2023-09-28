import { Box } from "@chakra-ui/react";

// Wraps everything to the right of the side navbar for layout

export default function ViewWrapper({ children }) {

    return (
        <Box as="main" display="flex" flex="1" flexDir="column" overflowX="hidden">
            {children}
        </Box>
    )
}