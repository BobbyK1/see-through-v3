'use client'

import { Box } from "@chakra-ui/react";
import Sidebar from "../components/Nav/SideNav";
import ViewWrapper from "../components/Layout/ViewWrapper";
import Header from "../components/Nav/Header";
import MainWrapper from "../components/Layout/MainWrapper";
import ColumnWrapper from "../components/Layout/ColumnWrapper";
import { useSideContent } from "../context/useSideContent";
import Loading from "./loading";
import { Suspense } from "react";
import { DashboardAuthProvider } from "../providers/DashboardAuthProvider";


export default function DashboardLayout({ children }) {
    const { sideContent, title } = useSideContent();

    return (
        <Box display="flex" minH="full" flexDirection="column" bgColor="#1c1c1c">
            <Box style={{ height: "calc(100vh - 0px)", maxHeight: "calc(100vh - 0px)" }}>
                <Box display="flex" h="full">
                    <Sidebar />
                    {sideContent && <ColumnWrapper content={sideContent} title={title} />}
                    <ViewWrapper>
                        <Header />
                        <MainWrapper>
                            <DashboardAuthProvider>
                                <Suspense fallback={<Loading />}>
                                    {children}
                                </Suspense>
                            </DashboardAuthProvider>
                        </MainWrapper>
                    </ViewWrapper>
                </Box>
            </Box>
        </Box>   
    )

}