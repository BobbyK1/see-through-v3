'use client'

import { Center, Spinner } from "@chakra-ui/react"

export default function LoadingSpinner() {
    return (
        <Center h="80vh">
            <Spinner size="lg" color="green.500" />
        </Center>
    )
}