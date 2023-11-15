import { Box, Text } from "@chakra-ui/react";

// Wraps sub navbar for layout
// Set through useSideContent hook

export default function ColumnWrapper({ title, links, content, ...props }) {

    return (
        <Box minW="64" maxW="64" display="flex" flexDir="column" h="full" borderRightWidth="thin" borderColor="#2e2e2e">
                <Box maxH="14" minH="14" px="5" display="flex" alignItems="center" borderBottomWidth="thin" borderColor="#2e2e2e">
                    <Text fontSize="md" fontWeight="semibold" color="whiteAlpha.800">{title}</Text>
                </Box>
            <Box px="5" py="3">
                {/* <Input size="sm" mt="2" borderRadius="5" _placeholder={{ color: "whiteAlpha.500" }} placeholder="Address, agent, or MLS ID" borderColor="#2e2e2e" /> */}

                {content}
            </Box>
        </Box>
    )
}