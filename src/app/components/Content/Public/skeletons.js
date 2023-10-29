import { Box, Container, Grid, GridItem, Skeleton, Stack } from "@chakra-ui/react"


export const MainCardSkeleton = () => {
    return (
        <>
            <Stack direction="row" justify="space-between">
                <Stack direction="row" spacing="3">
                    <Skeleton w="24" h="8" />
                    <Skeleton w="36" h="8" />
                </Stack>

                <Skeleton w="44" h="8" />
            </Stack>

            <Grid mt="10" templateColumns="repeat(12, 1fr)" gap="3">
                <GridItem colSpan="6">
                    <Skeleton w="full" h="52" />
                </GridItem>

                <GridItem colSpan="3">
                    <Skeleton w="full" h="52" />
                </GridItem>

                <GridItem colSpan="3">
                    <Skeleton w="full" h="52" />
                </GridItem>
            </Grid>
        </>
    )
}

export const AuthButtonSkeleton = () => {
    return (
        <Stack direction="row" alignItems="center" spacing="2">
            <Skeleton w="16" h="8" />
            <Skeleton w="10" h="8" />
        </Stack>
    )
}