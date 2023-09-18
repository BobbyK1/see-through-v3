'use client'

import { Button, useColorModeValue } from "@chakra-ui/react";

export default function SmallButton({ children, ...props }) {
    return <Button variant="solid" size="xs" bgColor={useColorModeValue("", "#2e2e2e")} borderColor={useColorModeValue("none", "#3e3e3e")} borderWidth="thin" {...props}>{children}</Button>
}