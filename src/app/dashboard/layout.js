'use client'

import { Box, useColorModeValue } from "@chakra-ui/react";
import Sidebar from "../components/Nav/SideNav";
import ViewWrapper from "../components/Layout/ViewWrapper";
import Header from "../components/Nav/Header";
import MainWrapper from "../components/Layout/MainWrapper";
import ColumnWrapper from "../components/Layout/ColumnWrapper";
import { useSideContent } from "../context/useSideContent";
import Loading from "./loading";
import { Suspense, useEffect } from "react";


export default function DashboardLayout({ children }) {
    const { sideContent, title, clearSideContent } = useSideContent();

    useEffect(() => {
        clearSideContent
    }, [])

    return (
        <Box display="flex" minH="full" flexDirection="column" bgColor={useColorModeValue("#f8f9fa", "#1c1c1c")}>
            <Box style={{ height: "calc(100vh - 0px)", maxHeight: "calc(100vh - 0px)" }}>
                <Box display="flex" h="full">
                    <Sidebar />
                    {sideContent && <ColumnWrapper content={sideContent} title={title} />}
                    <ViewWrapper>
                        <Header />
                        <MainWrapper>
                            <Suspense fallback={<Loading />}>
                                {children}
                            </Suspense>
                        </MainWrapper>
                    </ViewWrapper>
                </Box>
            </Box>
        </Box>
    )

}