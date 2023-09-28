import { Box } from "@chakra-ui/react";

// Wraps main content for layout

export default function MainWrapper({ children, ...props }) {

    return (
        <Box px="5" py="2" {...props}>
            {children}
        </Box>
    )
}