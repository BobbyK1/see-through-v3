import { Box } from "@chakra-ui/react";
import ViewWrapper from "../components/Layout/ViewWrapper";

export default async function Layout({ children }) {

    return (
        <Box display="flex" minH="full" flexDirection="column" bgColor="#1c1c1c">
            <Box style={{ height: "calc(100vh - 0px)", maxHeight: "calc(100vh - 0px)" }}>
                <Box display="flex" h="full">
                    <ViewWrapper>
                        {children} 
                    </ViewWrapper>
                </Box>
            </Box>
        </Box>  
    )
}