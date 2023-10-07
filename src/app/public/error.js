'use client' // Error components must be Client Components
 
import { Button, Center, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <Center flexDirection="column" w="full" pt="20vh">
        <Heading as="h1" fontSize="7xl" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>:(</Heading>
        <Heading mt="5" as="h2" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>Something went wrong!</Heading>
        <Text mt="5" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>Error code: {error.digest}</Text>
        <Text fontSize="sm" mt="2" color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}>Application trace: {window.location.pathname}</Text>
        <Text fontSize="xs" mt="2" color="blue.500">Still encountering this error? Click here.</Text>
        <Button
            mt="5"
            onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
            }
        >
            Try again
        </Button>
        </Center>
  )
}