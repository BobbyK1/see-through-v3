'use client'

import { Box, useColorModeValue } from "@chakra-ui/react";
import { Suspense } from "react";
import Loading from "./loading";
import ViewWrapper from "../components/Layout/ViewWrapper";
import Header from "../components/Public/Header";

export default function Layout({ children }) {

    return (
        <Box display="flex" minH="full" flexDirection="column" bgColor={useColorModeValue("#f8f9fa", "#1c1c1c")}>
            <Box style={{ height: "calc(100vh - 0px)", maxHeight: "calc(100vh - 0px)" }}>
                <Box display="flex" h="full">
                    <ViewWrapper>
                        <Header />
                        <Suspense fallback={<Loading />}>
                            {children}  
                        </Suspense>
                    </ViewWrapper>
                </Box>
            </Box>
        </Box>  
    )
}