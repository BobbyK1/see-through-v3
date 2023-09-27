'use client'

import { Center, Spinner } from "@chakra-ui/react"

export default function LoadingSpinner() {
    return (
        <Center>
            <Spinner size="xl" />
        </Center>
    )
}